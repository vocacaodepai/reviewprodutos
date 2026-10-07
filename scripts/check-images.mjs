#!/usr/bin/env node
/** Verifica todas as imagens dos artigos (atalho para validate-content --images). */
import { spawnSync } from 'node:child_process';
const r = spawnSync(process.execPath, ['scripts/validate-content.mjs', '--images', ...process.argv.slice(2)], { stdio: 'inherit' });
process.exit(r.status ?? 1);
