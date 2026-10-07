#!/usr/bin/env node
/**
 * Gerador automático de artigos do Review Produtos.
 *
 * Fluxo por artigo:
 *  1. Pega o próximo tema "pending" da fila (content/queue/topics.json).
 *  2. Pede ao Claude (com busca na web) um artigo completo seguindo docs/PADRAO-EDITORIAL.md,
 *     em Markdown com frontmatter YAML (produtos reais da Amazon.com.br com ASIN).
 *  3. Resolve imagens reais de cada ASIN (scripts/lib/amazon-images.mjs) e confere o título do produto.
 *  4. Valida (scripts/lib/content-schema.mjs). Se falhar, pede correção ao modelo (1 tentativa).
 *  5. Salva em src/content/artigos/<categoria>/<slug>.md e marca o tema como "published".
 *
 * Variáveis: ANTHROPIC_API_KEY (obrigatória), GENERATOR_MODEL (padrão claude-opus-5-5),
 *            GENERATOR_BATCH_SIZE (padrão 5), GENERATOR_DRY_RUN=1 (não grava), GENERATOR_TOPIC_ID=<id> (tema específico).
 * Uso: node scripts/generate-articles.mjs [--batch 5] [--topic <id>] [--dry-run]
 */
import Anthropic from '@anthropic-ai/sdk';
import matter from 'gray-matter';
import YAML from 'yaml';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, ARTIGOS_DIR, listArticleFiles, parseArticle, validateFrontmatter, validateBody, loadCategorias, loadAutores, slugFromPath } from './lib/content-schema.mjs';
import { resolveProductImage } from './lib/amazon-images.mjs';

// ---------- argumentos ----------
const argv = process.argv.slice(2);
const argVal = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined; };
const BATCH = Number(argVal('--batch') ?? process.env.GENERATOR_BATCH_SIZE ?? 5);
const ONLY_TOPIC = argVal('--topic') ?? process.env.GENERATOR_TOPIC_ID;
const DRY_RUN = argv.includes('--dry-run') || process.env.GENERATOR_DRY_RUN === '1';
const MODEL = process.env.GENERATOR_MODEL || 'claude-opus-5-5';
const QUEUE_PATH = join(ROOT, 'content/queue/topics.json');
const PADRAO_PATH = join(ROOT, 'docs/PADRAO-EDITORIAL.md');
const LOG_PATH = join(ROOT, 'content/queue/log.jsonl');

if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
  console.error('ANTHROPIC_API_KEY não definida. Veja .env.example e o README.');
  process.exit(2);
}

const client = new Anthropic({ maxRetries: 3, timeout: 15 * 60 * 1000 });
const categorias = loadCategorias();
const autores = loadAutores();
const today = new Date().toISOString().slice(0, 10);

// ---------- utilidades ----------
const slugify = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 90);
const log = (obj) => { const line = JSON.stringify({ ts: new Date().toISOString(), ...obj }); console.log(line); if (!DRY_RUN) { mkdirSync(join(ROOT, 'content/queue'), { recursive: true }); writeFileSync(LOG_PATH, line + '\n', { flag: 'a' }); } };
const similarity = (a, b) => { const A = new Set(slugify(a).split('-')), B = new Set(slugify(b).split('-')); const inter = [...A].filter((x) => B.has(x)).length; return inter / Math.max(1, Math.min(A.size, B.size)); };

function loadQueue() {
  if (!existsSync(QUEUE_PATH)) throw new Error(`Fila não encontrada: ${QUEUE_PATH}`);
  return JSON.parse(readFileSync(QUEUE_PATH, 'utf8'));
}
function saveQueue(q) { if (!DRY_RUN) writeFileSync(QUEUE_PATH, JSON.stringify(q, null, 2) + '\n'); }

function existingIndex() {
  const slugs = new Set(); const asinKeys = new Set(); const titles = [];
  for (const f of listArticleFiles()) {
    try { const { data } = parseArticle(f); slugs.add(slugFromPath(f)); titles.push(data.title); asinKeys.add(`${data.tipo}:${(data.produtos ?? []).map((p) => p.asin).sort().join(',')}`); } catch { /* ignora */ }
  }
  return { slugs, asinKeys, titles };
}

function pickTopics(queue, n) {
  const pend = queue.temas.filter((t) => t.status === 'pending' && (!ONLY_TOPIC || t.id === ONLY_TOPIC));
  pend.sort((a, b) => (a.prioridade ?? 3) - (b.prioridade ?? 3));
  // diversifica categorias dentro do lote
  const out = []; const usedCats = new Set();
  for (const t of pend) { if (out.length >= n) break; if (!usedCats.has(t.categoria) || pend.length < n * 2) { out.push(t); usedCats.add(t.categoria); } }
  for (const t of pend) { if (out.length >= n) break; if (!out.includes(t)) out.push(t); }
  return out;
}

// ---------- prompts ----------
const PADRAO = existsSync(PADRAO_PATH) ? readFileSync(PADRAO_PATH, 'utf8') : '(docs/PADRAO-EDITORIAL.md ausente)';
const SCHEMA_DOC = readFileSync(join(ROOT, 'src/content.config.ts'), 'utf8');
const EXEMPLO = (() => { const files = listArticleFiles(); return files.length ? readFileSync(files[0], 'utf8').slice(0, 9000) : ''; })();

const SYSTEM = `Você é redator(a)-chefe do Review Produtos (reviewprodutos.com.br), site brasileiro de reviews de produtos monetizado por afiliados da Amazon.com.br e AdSense. Você escreve em português do Brasil, com honestidade, utilidade e precisão factual. Hoje é ${today}.

Siga RIGOROSAMENTE o padrão editorial abaixo (formatos, estrutura, SEO de duplo funil, notas e selos, regras de afiliado e de imagens). Em seguida, o schema técnico do frontmatter (Zod) que o arquivo precisa satisfazer.

=== PADRÃO EDITORIAL ===
${PADRAO}

=== SCHEMA DO FRONTMATTER (src/content.config.ts) ===
${SCHEMA_DOC}

=== CATEGORIAS E SUBCATEGORIAS VÁLIDAS ===
${categorias.map((c) => `${c.id}: ${c.subcategorias.map((s) => s.slug).join(', ')}`).join('\n')}

=== AUTORES VÁLIDOS ===
${autores.map((a) => a.id).join(', ')}

REGRAS INEGOCIÁVEIS
- Produtos REAIS vendidos na Amazon.com.br, com ASIN real de 10 caracteres encontrado na busca (URLs amazon.com.br/.../dp/ASIN). Nunca invente ASIN. Se não encontrar ASIN para um produto, troque por outro que encontre.
- Nunca cite preços exatos em reais; use faixaPreco ($ a $$$$) e expressões como "faixa de entrada".
- Não coloque links da Amazon no corpo; os botões são gerados pelo site. Não use encurtadores.
- Não afirme teste físico (testadoFisicamente: false) — escreva como análise baseada em especificações, fontes especializadas e relatos públicos fora da Amazon, com transparência.
- PROIBIDO (Contrato do Programa de Associados BR): citar notas, estrelas ou quantidade de avaliações da Amazon; copiar ou parafrasear avaliações de clientes da Amazon; prometer promoção, cupom, desconto, frete grátis ou "menor preço". Para percepção de consumidores use Reclame Aqui, fóruns, YouTube e testes de veículos especializados, citando a fonte.
- Dados numéricos (potência, capacidade, bateria, avaliações) devem vir das buscas; quando incerto, use "aproximadamente" ou omita.
- Imagens: preencha imagem.src com qualquer URL plausível (será SUBSTITUÍDA automaticamente por uma imagem real validada a partir do ASIN); capriche no alt text descritivo.
- Saída: APENAS o arquivo Markdown completo entre as linhas =====ARTIGO-INICIO===== e =====ARTIGO-FIM=====, começando por "---" (frontmatter YAML válido, strings com caracteres especiais entre aspas duplas, especificações como strings) e seguido do corpo em Markdown (sem H1; use H2/H3). Nada fora dos marcadores.`;

function userPrompt(t) {
  return `TEMA DA FILA EDITORIAL
id: ${t.id}
tipo: ${t.tipo}  (review = 1 produto | comparativo = 2 | lista = 3 a 7)
categoria: ${t.categoria} / subcategoria: ${t.subcategoria}
estágio de funil: ${t.funil}
título sugerido: ${t.titulo_sugerido}
problema/dor do leitor: ${t.problema ?? '(não informado)'}
palavras-chave alvo: ${(t.palavras_chave ?? []).join('; ')}
produtos candidatos (confirme na Amazon.com.br; substitua se não existirem): ${(t.produtos_candidatos ?? []).join('; ') || '(pesquise os mais vendidos/mais bem avaliados)'}
${t.sazonal ? `gancho sazonal: ${t.sazonal}` : ''}

PASSOS
1. Pesquise na web (inclua "amazon.com.br" nas buscas) para confirmar os produtos, obter o ASIN (do URL /dp/ASIN), especificações, média e quantidade aproximada de avaliações, e os pontos recorrentes de elogio e reclamação dos consumidores. Faça buscas adicionais em fontes especializadas quando útil.
2. Escolha os produtos finais (quantidade conforme o tipo), defina critérios com pesos (soma 100), notas por critério e nota final (média ponderada, 1 casa decimal), selos conforme o padrão.
3. Escreva o artigo completo seguindo o template do tipo "${t.tipo}" do padrão editorial, atendendo ao duplo funil: o título/H1 e a introdução devem falar com quem busca "${t.titulo_sugerido}" e também com quem tem o problema "${t.problema ?? 'a necessidade por trás da busca'}".
4. Revise contra o checklist de qualidade do padrão antes de responder. Confirme: slug implícito pelo título, seoTitle ≤ 62 chars, description 120-165 chars, veredito 120-600 chars, FAQ 3-6 perguntas com respostas úteis, fontes com URLs reais que você viu, pubDate ${today}.

Responda somente com o arquivo entre os marcadores.`;
}

// ---------- chamada ao modelo ----------
async function runModel(messages) {
  const params = {
    model: MODEL,
    max_tokens: 64000,
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages,
    tools: [
      { type: 'web_search_20260209', name: 'web_search', max_uses: 14, user_location: { type: 'approximate', country: 'BR', timezone: 'America/Sao_Paulo' } },
      { type: 'web_fetch_20260209', name: 'web_fetch', max_uses: 6, max_content_tokens: 30000 },
    ],
    output_config: { effort: 'high' },
  };
  // Modelos da família 5.x podem recusar por política; o fallback do servidor continua a tarefa em outro modelo.
  const useBeta = /claude-(opus|sonnet|fable)-5/.test(MODEL);
  let content = []; let continuations = 0;
  while (true) {
    const stream = useBeta
      ? client.beta.messages.stream({ ...params, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' })
      : client.messages.stream(params);
    const msg = await stream.finalMessage();
    content = msg.content;
    if (msg.stop_reason === 'pause_turn' && continuations < 6) {
      continuations++;
      messages = [...messages, { role: 'assistant', content: msg.content }];
      continue;
    }
    if (msg.stop_reason === 'refusal') throw new Error(`Modelo recusou (${msg.stop_details?.category ?? 'sem categoria'}): ${msg.stop_details?.explanation ?? ''}`);
    if (msg.stop_reason === 'max_tokens') throw new Error('Resposta truncada (max_tokens)');
    return { text: content.filter((b) => b.type === 'text').map((b) => b.text).join('\n'), usage: msg.usage, messages: [...messages, { role: 'assistant', content: msg.content }] };
  }
}

function extractArticle(text) {
  const m = text.match(/=====ARTIGO-INICIO=====\s*([\s\S]*?)\s*=====ARTIGO-FIM=====/);
  let raw = (m ? m[1] : text).trim();
  raw = raw.replace(/^```(?:md|markdown|yaml)?\s*/i, '').replace(/```\s*$/, '').trim();
  if (!raw.startsWith('---')) throw new Error('Saída não começa com frontmatter (---)');
  return raw;
}

// ---------- processamento de um tema ----------
async function processTopic(t, index) {
  log({ evento: 'inicio', tema: t.id, titulo: t.titulo_sugerido });
  let { text, usage, messages } = await runModel([{ role: 'user', content: userPrompt(t) }]);
  let raw = extractArticle(text);
  let parsed = matter(raw);
  let errs = [...validateFrontmatter(parsed.data, { categorias, autores }), ...validateBody(parsed.content, parsed.data)].filter((e) => !/imagem.*src|imagem ausente/.test(e));

  if (errs.length) {
    log({ evento: 'correcao', tema: t.id, erros: errs });
    const fix = await runModel([...messages, { role: 'user', content: `O validador apontou os problemas abaixo. Corrija TODOS e devolva o arquivo completo novamente entre os marcadores (sem comentários):\n- ${errs.join('\n- ')}` }]);
    usage = fix.usage; raw = extractArticle(fix.text); parsed = matter(raw);
    errs = [...validateFrontmatter(parsed.data, { categorias, autores }), ...validateBody(parsed.content, parsed.data)].filter((e) => !/imagem.*src|imagem ausente/.test(e));
    if (errs.length) throw new Error(`Artigo inválido após correção: ${errs.join(' | ')}`);
  }

  // Imagens reais por ASIN + checagem de coerência do produto
  const data = parsed.data;
  const removidos = [];
  for (const p of data.produtos) {
    const img = await resolveProductImage(p.asin);
    if (!img) { removidos.push(p.nome); continue; }
    if (img.title && similarity(img.title, p.nome) < 0.2 && similarity(img.title, p.marca ?? '') < 0.5) log({ evento: 'aviso', tema: t.id, asin: p.asin, msg: `título na Amazon ("${img.title}") pouco parecido com "${p.nome}"` });
    p.imagem = { src: img.src, fonte: 'amazon', alt: p.imagem?.alt ?? `${p.nome}`, largura: img.width, altura: img.height };
    if (img.quality === 'baixa') p.imagem.credito = 'Imagem: Amazon.com.br (miniatura)';
    if (p.avaliacaoConsumidores && /amazon/i.test(p.avaliacaoConsumidores.fonte ?? '')) delete p.avaliacaoConsumidores; // nunca exibir notas da Amazon
  }
  if (removidos.length) throw new Error(`Sem imagem/ASIN inválido para: ${removidos.join(', ')}`);
  const hero = data.produtos.find((p) => p.selo === 'escolha-do-editor') ?? data.produtos[0];
  data.imagem = { ...hero.imagem, alt: data.imagem?.alt ?? hero.imagem.alt };
  data.pubDate = today; data.autor = data.autor ?? 'equipe'; data.testadoFisicamente = false; data.rascunho = false;

  // Dedup e slug
  const idx = existingIndex();
  const asinKey = `${data.tipo}:${data.produtos.map((p) => p.asin).sort().join(',')}`;
  if (idx.asinKeys.has(asinKey)) throw new Error('Já existe artigo do mesmo tipo com o mesmo conjunto de produtos');
  if (idx.titles.some((tt) => similarity(tt, data.title) > 0.85)) throw new Error('Título muito parecido com artigo existente');
  let slug = slugify(data.seoTitle ?? data.title).replace(/-(2026|2027)$/, '') || `artigo-${Date.now()}`;
  if (idx.slugs.has(slug)) slug = `${slug}-${data.produtos[0].asin.toLowerCase()}`;

  const finalErrs = [...validateFrontmatter(data, { categorias, autores }), ...validateBody(parsed.content, data)];
  if (finalErrs.length) throw new Error(`Inválido após imagens: ${finalErrs.join(' | ')}`);

  const out = `---\n${YAML.stringify(data, { lineWidth: 0 })}---\n\n${parsed.content.trim()}\n`;
  const dir = join(ARTIGOS_DIR, data.categoria); const file = join(dir, `${slug}.md`);
  if (!DRY_RUN) { mkdirSync(dir, { recursive: true }); writeFileSync(file, out); }
  log({ evento: 'publicado', tema: t.id, arquivo: `src/content/artigos/${data.categoria}/${slug}.md`, palavras: parsed.content.split(/\s+/).length, tokens: { in: usage?.input_tokens, out: usage?.output_tokens, cache: usage?.cache_read_input_tokens } });
  return { slug, categoria: data.categoria };
}

// ---------- main ----------
const queue = loadQueue();
const topics = pickTopics(queue, BATCH);
if (!topics.length) { console.log('Nenhum tema pendente na fila.'); process.exit(0); }
let ok = 0, fail = 0;
for (const [i, t] of topics.entries()) {
  t.status = 'in_progress'; saveQueue(queue);
  try {
    const r = await processTopic(t, i);
    t.status = 'published'; t.published_slug = r.slug; t.published_at = today; ok++;
  } catch (e) {
    t.status = (t.tentativas ?? 0) >= 1 ? 'skipped' : 'pending'; t.tentativas = (t.tentativas ?? 0) + 1; t.ultimo_erro = String(e.message).slice(0, 300); fail++;
    log({ evento: 'erro', tema: t.id, erro: e.message });
  }
  saveQueue(queue);
}
console.log(`\nConcluído: ${ok} publicados, ${fail} com erro.`);
process.exit(ok === 0 && fail > 0 ? 1 : 0);
