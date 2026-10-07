#!/usr/bin/env node
/**
 * Reconcilia a fila editorial com os artigos já publicados: temas cujo título/palavras-chave ou conjunto de produtos
 * coincidem com um artigo existente são marcados como "published" (com published_slug) para evitar duplicatas.
 * Uso: node scripts/reconcile-queue.mjs [--dry-run] [--limiar 0.6]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, listArticleFiles, parseArticle, slugFromPath } from './lib/content-schema.mjs';

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const LIMIAR = Number(args[args.indexOf('--limiar') + 1] || 0.6);
const QUEUE = join(ROOT, 'content/queue/topics.json');

const STOP = new Set(['de', 'da', 'do', 'das', 'dos', 'para', 'em', 'e', 'ou', 'o', 'a', 'os', 'as', 'um', 'uma', 'com', 'sem', 'que', 'por', 'no', 'na', 'nos', 'nas', 'ao', 'melhor', 'melhores', 'modelos', 'opcoes', 'comprar', 'vale', 'pena', 'review', 'completo', 'bom', 'boa', 'qual', 'quais', 'mais', 'muito', '2026', 'ajudam', 'verdade', 'fazer']);
const tokens = (s) => new Set(String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)));
const jaccard = (a, b) => { const inter = [...a].filter((x) => b.has(x)).length; return inter / Math.max(1, new Set([...a, ...b]).size); };

const artigos = listArticleFiles().map((f) => { const { data } = parseArticle(f); return { slug: slugFromPath(f), data, toks: tokens(`${data.title} ${(data.funil?.palavrasChave ?? []).join(' ')} ${data.funil?.problema ?? ''}`), asins: new Set((data.produtos ?? []).map((p) => p.asin)) }; });
const q = JSON.parse(readFileSync(QUEUE, 'utf8'));
let n = 0;
for (const t of q.temas) {
  if (t.status !== 'pending') continue;
  const tt = tokens(`${t.titulo_sugerido} ${(t.palavras_chave ?? []).join(' ')} ${t.problema ?? ''}`);
  let best = null;
  for (const a of artigos) {
    if (a.data.tipo !== t.tipo && !(t.tipo === 'lista' && a.data.tipo === 'lista')) { /* tipos diferentes podem coexistir (review vs lista) */ }
    const sim = jaccard(tt, a.toks);
    const sameSub = a.data.categoria === t.categoria && a.data.subcategoria === t.subcategoria;
    const score = sim + (sameSub ? 0.15 : 0) + (a.data.tipo === t.tipo ? 0.1 : 0);
    if (!best || score > best.score) best = { a, score, sim };
  }
  if (best && best.score >= LIMIAR && best.a.data.tipo === t.tipo) {
    console.log(`${DRY ? '[dry] ' : ''}${t.id} → published (${best.a.slug}) score=${best.score.toFixed(2)}\n    "${t.titulo_sugerido}"\n    ≈ "${best.a.data.title}"`);
    if (!DRY) { t.status = 'published'; t.published_slug = best.a.slug; t.published_at = (best.a.data.pubDate instanceof Date ? best.a.data.pubDate : new Date(best.a.data.pubDate)).toISOString().slice(0, 10); t.observacao = 'reconciliado automaticamente com artigo existente'; }
    n++;
  }
}
if (!DRY) writeFileSync(QUEUE, JSON.stringify(q, null, 2) + '\n');
console.log(`\n${n} tema(s) reconciliado(s). Pendentes: ${q.temas.filter((t) => t.status === 'pending').length}`);
