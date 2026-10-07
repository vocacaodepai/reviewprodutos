#!/usr/bin/env node
/**
 * Atualiza um tema da fila editorial de forma atômica (releitura + gravação), para uso por redatores em paralelo.
 * Uso: node scripts/update-queue.mjs <id> <status> [published_slug] [--erro "mensagem"]
 *   status: pending | in_progress | published | skipped
 */
import { readFileSync, writeFileSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('../', import.meta.url).pathname;
const QUEUE = join(ROOT, 'content/queue/topics.json');
const [id, status, slugArg, ...rest] = process.argv.slice(2);
if (!id || !['pending', 'in_progress', 'published', 'skipped'].includes(status)) {
  console.error('Uso: node scripts/update-queue.mjs <id> <pending|in_progress|published|skipped> [published_slug] [--erro "msg"]');
  process.exit(1);
}
const erroIdx = rest.indexOf('--erro');
const erro = erroIdx >= 0 ? rest[erroIdx + 1] : undefined;
const slug = slugArg && slugArg !== '--erro' ? slugArg : undefined;

for (let attempt = 0; attempt < 5; attempt++) {
  const raw = readFileSync(QUEUE, 'utf8');
  const q = JSON.parse(raw);
  const t = q.temas.find((x) => x.id === id);
  if (!t) { console.error(`Tema não encontrado: ${id}`); process.exit(2); }
  t.status = status;
  if (slug) { t.published_slug = slug; t.published_at = new Date().toISOString().slice(0, 10); }
  if (erro) t.ultimo_erro = erro.slice(0, 300);
  const tmp = `${QUEUE}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(q, null, 2) + '\n');
  // se o arquivo mudou durante a edição, tenta de novo
  if (readFileSync(QUEUE, 'utf8') !== raw) { continue; }
  renameSync(tmp, QUEUE);
  console.log(`✓ ${id} → ${status}${slug ? ` (${slug})` : ''}`);
  process.exit(0);
}
console.error('Não foi possível gravar a fila após 5 tentativas (concorrência).');
process.exit(3);
