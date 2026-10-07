/**
 * Validação de artigos (espelho em JS do schema de src/content.config.ts) para uso em scripts/CI,
 * sem depender do build do Astro. Retorna lista de erros legíveis.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import matter from 'gray-matter';

export const ROOT = new URL('../../', import.meta.url).pathname;
export const ARTIGOS_DIR = join(ROOT, 'src/content/artigos');
export const SELOS = ['escolha-do-editor', 'melhor-custo-beneficio', 'melhor-premium', 'melhor-barato', 'melhor-para-iniciantes', 'melhor-compacto', 'melhor-para-familias', 'mais-vendido', 'melhor-desempenho', 'melhor-silencioso'];

export function loadCategorias() { return JSON.parse(readFileSync(join(ROOT, 'src/data/categorias.json'), 'utf8')); }
export function loadAutores() { return JSON.parse(readFileSync(join(ROOT, 'src/data/autores.json'), 'utf8')); }

export function listArticleFiles(dir = ARTIGOS_DIR) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) out.push(...listArticleFiles(p));
    else if (f.endsWith('.md')) out.push(p);
  }
  return out;
}

export function slugFromPath(p) {
  return relative(ARTIGOS_DIR, p).replace(/\.md$/, '').split('/').pop();
}

const isStr = (v, min = 0, max = Infinity) => typeof v === 'string' && v.trim().length >= min && v.trim().length <= max;
const isUrl = (v) => typeof v === 'string' && /^https?:\/\/[^\s"]+$/.test(v);
const isNum = (v, min, max) => typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;

export function validateImagem(img, path, errs) {
  if (!img || typeof img !== 'object') return errs.push(`${path}: imagem ausente`);
  if (!isUrl(img.src)) errs.push(`${path}.src: URL inválida`);
  if (!isStr(img.alt, 8, 160)) errs.push(`${path}.alt: alt text precisa ter 8-160 caracteres`);
  if (img.fonte !== undefined && !['amazon', 'fabricante', 'propria', 'api', 'outra'].includes(img.fonte)) errs.push(`${path}.fonte: amazon | fabricante | propria | api | outra`);
}

export function validateFrontmatter(data, { categorias = loadCategorias(), autores = loadAutores() } = {}) {
  const errs = [];
  if (!data || typeof data !== 'object') return ['frontmatter ausente'];
  if (!isStr(data.title, 20, 100)) errs.push('title: 20-100 caracteres');
  if (data.seoTitle !== undefined && !isStr(data.seoTitle, 1, 62)) errs.push('seoTitle: até 62 caracteres');
  if (!isStr(data.description, 100, 170)) errs.push('description: 100-170 caracteres');
  if (!['review', 'comparativo', 'lista'].includes(data.tipo)) errs.push('tipo: review | comparativo | lista');
  const cat = categorias.find((c) => c.id === data.categoria);
  if (!cat) errs.push(`categoria: "${data.categoria}" não existe`);
  else if (!cat.subcategorias.some((s) => s.slug === data.subcategoria)) errs.push(`subcategoria: "${data.subcategoria}" não existe em ${cat.id} (válidas: ${cat.subcategorias.map((s) => s.slug).join(', ')})`);
  if (data.tags !== undefined && !Array.isArray(data.tags)) errs.push('tags: lista de strings');
  if (!data.pubDate || isNaN(new Date(data.pubDate).getTime())) errs.push('pubDate: data inválida');
  if (data.updatedDate !== undefined && isNaN(new Date(data.updatedDate).getTime())) errs.push('updatedDate: data inválida');
  if (!data.autor) errs.push('autor: obrigatório (ex.: equipe)');
  else if (!autores.some((a) => a.id === data.autor)) errs.push(`autor: "${data.autor}" não existe`);
  validateImagem(data.imagem, 'imagem', errs);
  if (!data.funil || typeof data.funil !== 'object') errs.push('funil: objeto obrigatório');
  else {
    if (!['topo', 'meio', 'fundo'].includes(data.funil.estagio)) errs.push('funil.estagio: topo | meio | fundo');
    if (!Array.isArray(data.funil.palavrasChave) || data.funil.palavrasChave.length < 1 || data.funil.palavrasChave.length > 12) errs.push('funil.palavrasChave: 1-12 itens');
    if (data.funil.estagio === 'topo' && !isStr(data.funil.problema, 5)) errs.push('funil.problema: obrigatório para topo de funil');
  }
  if (!isStr(data.veredito, 120, 600)) errs.push('veredito: 120-600 caracteres');
  if (!Array.isArray(data.produtos) || data.produtos.length < 1) errs.push('produtos: lista com pelo menos 1 item');
  else {
    const n = data.produtos.length;
    if (data.tipo === 'review' && n !== 1) errs.push('review exige exatamente 1 produto');
    if (data.tipo === 'comparativo' && n !== 2) errs.push('comparativo exige exatamente 2 produtos');
    if (data.tipo === 'lista' && n < 3) errs.push('lista exige 3+ produtos');
    if (n > 12) errs.push('máximo 12 produtos');
    const asins = new Set();
    data.produtos.forEach((p, i) => {
      const path = `produtos[${i}]`;
      if (!isStr(p.nome, 3, 140)) errs.push(`${path}.nome: 3-140 caracteres`);
      if (!/^[A-Z0-9]{10}$/.test(p.asin ?? '')) errs.push(`${path}.asin: ASIN inválido`);
      if (asins.has(p.asin)) errs.push(`${path}.asin: duplicado no artigo`); asins.add(p.asin);
      if (p.url !== undefined && !isUrl(p.url)) errs.push(`${path}.url: URL inválida`);
      validateImagem(p.imagem, `${path}.imagem`, errs);
      if (!isNum(p.nota, 0, 10)) errs.push(`${path}.nota: número 0-10`);
      if (p.selo !== undefined && !SELOS.includes(p.selo)) errs.push(`${path}.selo: inválido (${SELOS.join(' | ')})`);
      if (!isStr(p.resumo, 20, 260)) errs.push(`${path}.resumo: 20-260 caracteres`);
      if (!Array.isArray(p.pros) || p.pros.length < 2 || p.pros.length > 8) errs.push(`${path}.pros: 2-8 itens`);
      if (!Array.isArray(p.contras) || p.contras.length < 1 || p.contras.length > 6) errs.push(`${path}.contras: 1-6 itens`);
      if (p.especificacoes !== undefined && (typeof p.especificacoes !== 'object' || Array.isArray(p.especificacoes))) errs.push(`${path}.especificacoes: objeto chave/valor`);
      else if (p.especificacoes) for (const [k, v] of Object.entries(p.especificacoes)) if (typeof v !== 'string') errs.push(`${path}.especificacoes.${k}: valor deve ser string (use aspas)`);
      if (p.faixaPreco !== undefined && !['$', '$$', '$$$', '$$$$'].includes(p.faixaPreco)) errs.push(`${path}.faixaPreco: $ | $$ | $$$ | $$$$`);
      if (p.linksAlternativos !== undefined) { if (!Array.isArray(p.linksAlternativos) || p.linksAlternativos.length > 3) errs.push(`${path}.linksAlternativos: lista de até 3`); else p.linksAlternativos.forEach((l, j) => { if (!isStr(l.loja, 2, 40) || !isUrl(l.url) || /amazon\.com\.br/.test(l.url)) errs.push(`${path}.linksAlternativos[${j}]: loja e url válidas (não Amazon)`); }); }
      if (p.voltagem !== undefined && !isStr(p.voltagem, 2, 20)) errs.push(`${path}.voltagem: texto curto (127V, 220V, Bivolt)`);
      if (p.variantes !== undefined) { if (!Array.isArray(p.variantes) || p.variantes.length > 4) errs.push(`${path}.variantes: lista de até 4`); else p.variantes.forEach((v, j) => { if (!isStr(v.rotulo, 2, 40) || !/^[A-Z0-9]{10}$/.test(v.asin ?? '')) errs.push(`${path}.variantes[${j}]: rotulo e asin válidos`); }); }
      if (p.notasCriterios) for (const [k, v] of Object.entries(p.notasCriterios)) if (!isNum(v, 0, 10)) errs.push(`${path}.notasCriterios.${k}: 0-10`);
      if (p.avaliacaoConsumidores) { const a = p.avaliacaoConsumidores; if (!isNum(a.media, 0, 5)) errs.push(`${path}.avaliacaoConsumidores.media: 0-5`); if (a.quantidade !== undefined && !Number.isInteger(a.quantidade)) errs.push(`${path}.avaliacaoConsumidores.quantidade: inteiro`); if (!isStr(a.fonte, 2) || /amazon/i.test(a.fonte)) errs.push(`${path}.avaliacaoConsumidores.fonte: obrigatória e não pode ser Amazon (estrelas da Amazon só via Creators API)`); }
    });
  }
  if (data.criterios !== undefined) {
    if (!Array.isArray(data.criterios)) errs.push('criterios: lista');
    else { const soma = data.criterios.reduce((s, c) => s + (c.peso ?? 0), 0); if (soma < 95 || soma > 105) errs.push(`criterios: soma dos pesos deve ser ~100 (atual ${soma})`); }
  }
  if (!Array.isArray(data.faq) || data.faq.length < 2 || data.faq.length > 10) errs.push('faq: 2-10 itens');
  else data.faq.forEach((f, i) => { if (!isStr(f.pergunta, 10)) errs.push(`faq[${i}].pergunta: mín. 10 caracteres`); if (!isStr(f.resposta, 40)) errs.push(`faq[${i}].resposta: mín. 40 caracteres`); });
  if (data.fontes !== undefined) { if (!Array.isArray(data.fontes)) errs.push('fontes: lista'); else data.fontes.forEach((f, i) => { if (!isStr(f.nome, 2) || !isUrl(f.url)) errs.push(`fontes[${i}]: nome e url obrigatórios`); }); }
  return errs;
}

/** Checagens de qualidade do corpo (Markdown). */
export function validateBody(body, data) {
  const errs = [];
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const min = data?.tipo === 'review' ? 900 : data?.tipo === 'comparativo' ? 1000 : 1200;
  if (words < min) errs.push(`corpo: ${words} palavras (mínimo ${min} para ${data?.tipo})`);
  if (words > 4500) errs.push(`corpo: ${words} palavras (máximo 4500)`);
  const h2 = (body.match(/^## /gm) || []).length;
  if (h2 < 4) errs.push(`corpo: apenas ${h2} seções H2 (mínimo 4)`);
  if (/^# /m.test(body)) errs.push('corpo: não use H1 (#) no corpo; o título vem do frontmatter');
  if (/\bR\$\s?\d/.test(body)) errs.push('corpo: não cite preços exatos (R$ ...); use faixas e o botão da loja');
  if (/https?:\/\/(www\.)?amazon\.com\.br\/[^\s)]+/.test(body)) errs.push('corpo: não coloque links da Amazon no texto; os botões de afiliado são gerados automaticamente');
  if (/\b(testamos|testei|nosso teste|em nossos testes)\b/i.test(body) && data && !data.testadoFisicamente) errs.push('corpo: afirma teste físico mas testadoFisicamente=false; reescreva como análise ou marque o teste');
  if (/\b(amzn\.to|bit\.ly|tinyurl)\b/i.test(body)) errs.push('corpo: não use encurtadores de link');
  if (/\b(\d[\d.,]*\s*(estrelas|avaliações)|avaliad[oa]s? (por|com)\s*\d|nota\s*\d[.,]\d\s*(na|da) amazon)\b/i.test(body)) errs.push('corpo: não cite notas/estrelas/quantidade de avaliações da Amazon (proibido sem a Creators API)');
  if (/\b(cupom|frete gr[áa]tis|menor pre[çc]o|\d+\s?% de desconto|em promo[çc][ãa]o|pre[çc]o promocional)\b/i.test(body)) errs.push('corpo: não prometa promoções, cupons, descontos ou frete (preço/disponibilidade só via API com data/hora)');
  if (/(segundo|conforme|de acordo com) (as )?avalia[çc][õo]es (da|na) amazon|clientes da amazon (dizem|relatam|elogiam|reclamam)/i.test(body)) errs.push('corpo: não parafraseie avaliações de clientes da Amazon; use fontes próprias/terceiros (Reclame Aqui, testes especializados)');
  if (/<(script|iframe|img)\b/i.test(body)) errs.push('corpo: HTML bruto não permitido');
  return errs;
}

export function parseArticle(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { data, body: content, raw };
}

export function validateArticleFile(filePath, ctx) {
  const { data, body } = parseArticle(filePath);
  const errs = [...validateFrontmatter(data, ctx), ...validateBody(body, data)];
  return { errs, data, body };
}
