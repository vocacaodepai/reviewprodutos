#!/usr/bin/env node
/**
 * Uso: node scripts/find-image.mjs ASIN [ASIN...]
 * Imprime JSON (uma linha por ASIN) com a melhor imagem real validada do produto.
 */
import { resolveProductImage } from './lib/amazon-images.mjs';
const asins = process.argv.slice(2).map((s) => s.trim().toUpperCase()).filter(Boolean);
if (!asins.length) { console.error('Informe ao menos um ASIN'); process.exit(1); }
for (const asin of asins) {
  try {
    const r = await resolveProductImage(asin);
    console.log(JSON.stringify(r ?? { asin, src: null, error: 'imagem não encontrada' }));
  } catch (e) {
    console.log(JSON.stringify({ asin, src: null, error: e.message }));
  }
}
