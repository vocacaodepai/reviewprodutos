#!/usr/bin/env node
/**
 * Valida todos os artigos (ou os arquivos passados por argumento): schema, regras editoriais,
 * slugs duplicados e, com --images, as URLs de imagem (HTTP 200 + dimensões).
 * Uso: node scripts/validate-content.mjs [--images] [arquivo.md ...]
 */
import { listArticleFiles, validateArticleFile, slugFromPath, loadCategorias, loadAutores, ROOT } from './lib/content-schema.mjs';
import { validateImage } from './lib/amazon-images.mjs';
import { relative } from 'node:path';

const args = process.argv.slice(2);
const checkImages = args.includes('--images');
const files = args.filter((a) => a.endsWith('.md'));
const targets = files.length ? files : listArticleFiles();
const ctx = { categorias: loadCategorias(), autores: loadAutores() };
let failed = 0;
const slugs = new Map();
const asinTipo = new Map();

for (const f of targets) {
  const rel = relative(ROOT, f);
  let result;
  try { result = validateArticleFile(f, ctx); } catch (e) { console.log(`✗ ${rel}\n   - frontmatter inválido: ${e.message}`); failed++; continue; }
  const { errs, data } = result;
  const slug = slugFromPath(f);
  if (slugs.has(slug)) errs.push(`slug duplicado com ${relative(ROOT, slugs.get(slug))}`); else slugs.set(slug, f);
  if (data?.produtos && data.tipo) {
    const key = `${data.tipo}:${[...data.produtos.map((p) => p.asin)].sort().join(',')}`;
    if (asinTipo.has(key)) errs.push(`mesmo conjunto de ASINs e tipo que ${relative(ROOT, asinTipo.get(key))} (conteúdo duplicado?)`); else asinTipo.set(key, f);
  }
  if (checkImages && data?.imagem?.src) {
    const urls = new Set([data.imagem.src, ...(data.produtos ?? []).map((p) => p?.imagem?.src).filter(Boolean)]);
    for (const u of urls) {
      const v = await validateImage(u, { minSide: 150, minBytes: 2500 });
      if (!v.ok) errs.push(`imagem ${u}: ${v.reason}`);
    }
  }
  if (errs.length) { failed++; console.log(`✗ ${rel}`); for (const e of errs) console.log(`   - ${e}`); }
  else console.log(`✓ ${rel}`);
}
console.log(`\n${targets.length - failed}/${targets.length} artigos válidos`);
process.exit(failed ? 1 : 0);
