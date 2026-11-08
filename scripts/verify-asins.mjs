#!/usr/bin/env node
/**
 * Confirma os ASINs marcados com `asinVerificado: false` (política do meio-termo, ver docs/rotinas/lote.md).
 * Para cada produto não verificado, consulta a Amazon.com.br (sem burlar bloqueio). Se a página responder:
 *  - título bate com a marca/modelo do produto e há imagem real  -> confirmado;
 *  - título não bate -> DIVERGENTE (remover o botão ou corrigir o artigo);
 *  - Amazon bloqueou/não respondeu -> PENDENTE (tenta de novo na próxima rodada).
 * Uso: node scripts/verify-asins.mjs [--apply]
 *  --apply grava nos arquivos: asinVerificado removido (padrão true) e imagem real no lugar da neutra para os confirmados.
 * Saída: exit 1 se houver DIVERGENTE.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import matter from 'gray-matter';
import { listArticleFiles, slugFromPath } from './lib/content-schema.mjs';
import { resolveProductImage } from './lib/amazon-images.mjs';

const apply = process.argv.includes('--apply');
const norm = (s) => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ');
const tokensDe = (p) => {
  const base = [p.marca, p.modelo ?? p.nome].filter(Boolean).join(' ');
  return norm(base).split(' ').filter((t) => t.length > 1);
};
const bate = (titulo, p) => {
  const t = norm(titulo);
  const modelo = norm(p.modelo ?? '').replace(/ /g, '');
  if (modelo.length >= 3 && t.replace(/ /g, '').includes(modelo)) return true;
  const toks = tokensDe(p);
  return toks.length > 0 && toks.filter((k) => t.includes(k)).length / toks.length >= 0.8;
};

let divergentes = 0, pendentes = 0, confirmados = 0;
for (const f of listArticleFiles()) {
  const raw = readFileSync(f, 'utf8');
  if (!raw.includes('asinVerificado: false')) continue;
  const fm = matter(raw);
  let mudou = false;
  for (const p of fm.data.produtos ?? []) {
    if (p.asinVerificado !== false) continue;
    const slug = slugFromPath(f);
    const r = await resolveProductImage(p.asin, { allowLowRes: false }).catch(() => null);
    if (!r || !r.title || r.quality !== 'alta') { pendentes++; console.log(`PENDENTE   ${slug} ${p.asin} (Amazon não respondeu com título e imagem)`); continue; }
    if (!bate(r.title, p)) { divergentes++; console.log(`DIVERGENTE ${slug} ${p.asin}: título da Amazon "${r.title}" não bate com "${p.nome}"`); continue; }
    confirmados++; console.log(`CONFIRMADO ${slug} ${p.asin}: ${r.title}`);
    if (apply) {
      delete p.asinVerificado;
      p.imagem = { ...p.imagem, src: r.src, fonte: 'amazon' };
      mudou = true;
    }
  }
  if (mudou) writeFileSync(f, matter.stringify(fm.content, fm.data));
}
console.log(`\n${confirmados} confirmado(s), ${pendentes} pendente(s), ${divergentes} divergente(s)${apply ? ' (aplicado)' : ''}`);
process.exit(divergentes ? 1 : 0);
