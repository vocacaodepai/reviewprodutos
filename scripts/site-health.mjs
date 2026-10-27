#!/usr/bin/env node
/**
 * Revisão de erros e segurança do site (roda em toda rodada da rotina, depois do `npm run build`).
 * Uso: node scripts/site-health.mjs [--live]
 *   --live  também confere o site no ar (status, cabeçalhos de segurança, redirecionamento www → apex).
 * Sai com código 1 se houver ERRO; AVISO não bloqueia.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { spawnSync } from 'node:child_process';
import matter from 'gray-matter';

const ROOT = new URL('../', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const SITE = 'https://reviewprodutos.com.br';
const TAG = 'reviewprodutos-20';
const live = process.argv.includes('--live');

const erros = [];
const avisos = [];
const ok = [];

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// 1. Artigos: `relacionados` precisam apontar para artigos que existem.
const artigosDir = join(ROOT, 'src/content/artigos');
const artigos = walk(artigosDir).filter((f) => f.endsWith('.md'));
const slugs = new Set(artigos.map((f) => f.split('/').pop().replace(/\.md$/, '')));
for (const f of artigos) {
  const { data } = matter(readFileSync(f, 'utf8'));
  for (const r of data.relacionados ?? []) {
    if (!slugs.has(r)) erros.push(`relacionado inexistente "${r}" em ${f.replace(ROOT, '')}`);
  }
}
ok.push(`${artigos.length} artigos com relacionados conferidos`);

// 2. Build: links e recursos internos quebrados, links de afiliado e textos proibidos.
if (!existsSync(DIST)) {
  erros.push('dist/ não existe: rode `npm run build` antes');
} else {
  const html = walk(DIST).filter((f) => f.endsWith('.html'));
  const quebrados = new Map();
  let afiliados = 0;
  const proibidos = [
    [/como este conte[úu]do foi produzido/i, 'texto "Como este conteúdo foi produzido"'],
    [/\bver pre[çc]o\b|link de afiliado ·/i, 'botão "Ver preço" ou aviso de afiliado fora do rodapé (regra do dono)'],
    [/(apoio|ajuda|uso) de (IA|intelig[êe]ncia artificial)|(feito|gerado|produzido|escrito|criado) (com|por) (IA|intelig[êe]ncia artificial)/i, 'menção ao uso de IA no conteúdo'],
  ];
  for (const f of html) {
    const s = readFileSync(f, 'utf8');
    const pagina = f.replace(DIST, '') || '/';
    for (const m of s.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const url = m[1];
      if (url.startsWith('//')) continue;
      const alvo = join(DIST, decodeURIComponent(url));
      const existe = extname(url) ? existsSync(alvo) : existsSync(join(alvo, 'index.html')) || existsSync(alvo + '.html');
      if (!existe) quebrados.set(url, pagina);
    }
    for (const m of s.matchAll(/<a\b[^>]*href="(https?:\/\/(?:www\.)?amazon\.com\.br\/(?:dp|gp\/product)\/[^"]*)"[^>]*>/g)) {
      afiliados++;
      const tag = m[0];
      if (!m[1].includes(`tag=${TAG}`)) erros.push(`link Amazon sem tag ${TAG} em ${pagina}: ${m[1]}`);
      if (!/rel="[^"]*sponsored/.test(tag)) erros.push(`link Amazon sem rel="sponsored" em ${pagina}`);
    }
    for (const m of s.matchAll(/<a\b[^>]*href="(https?:\/\/s\.shopee\.com\.br\/[^"]*)"[^>]*>/g)) {
      afiliados++;
      if (!/rel="[^"]*sponsored/.test(m[0])) erros.push(`link Shopee sem rel="sponsored" em ${pagina}`);
    }
    const texto = s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    for (const [re, nome] of proibidos) {
      if (re.test(texto)) erros.push(`${nome} em ${pagina}`);
    }
  }
  for (const [url, pagina] of quebrados) erros.push(`link interno quebrado ${url} (em ${pagina})`);
  ok.push(`${html.length} páginas e ${afiliados} links de afiliado conferidos`);
  for (const f of ['sitemap-index.xml', 'robots.txt', 'rss.xml', 'pagefind/pagefind.js']) {
    if (!existsSync(join(DIST, f))) erros.push(`dist/${f} não foi gerado`);
  }
}

// 3. Segredos no repositório (arquivos versionados).
const padroes = [
  [/sk-ant-[A-Za-z0-9_-]{20,}/, 'chave da Anthropic'],
  [/AKIA[0-9A-Z]{16}/, 'chave da AWS'],
  [/gh[pousr]_[A-Za-z0-9]{30,}/, 'token do GitHub'],
  [/AIza[0-9A-Za-z_-]{35}/, 'chave do Google'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'chave privada'],
  [/xox[baprs]-[A-Za-z0-9-]{10,}/, 'token do Slack'],
];
const versionados = spawnSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' }).stdout.split('\n').filter(Boolean);
for (const f of versionados) {
  if (/\.(png|jpe?g|webp|gif|ico|woff2?|ttf|otf)$/i.test(f) || f === 'package-lock.json') continue;
  let s;
  try { s = readFileSync(join(ROOT, f), 'utf8'); } catch { continue; }
  for (const [re, nome] of padroes) if (re.test(s)) erros.push(`possível ${nome} versionado em ${f}`);
}
for (const f of ['.env', '.env.local', '.env.production']) if (versionados.includes(f)) erros.push(`${f} está versionado`);
ok.push(`${versionados.length} arquivos versionados varridos por segredos`);

// 4. Dependências com vulnerabilidade conhecida (só as de produção).
const audit = spawnSync('npm', ['audit', '--omit=dev', '--json'], { cwd: ROOT, encoding: 'utf8' });
try {
  const v = JSON.parse(audit.stdout).metadata?.vulnerabilities ?? {};
  const graves = (v.high ?? 0) + (v.critical ?? 0);
  if (graves) erros.push(`npm audit: ${v.critical ?? 0} crítica(s) e ${v.high ?? 0} alta(s) nas dependências de produção`);
  else if (v.moderate) avisos.push(`npm audit: ${v.moderate} vulnerabilidade(s) moderada(s)`);
  else ok.push('npm audit sem vulnerabilidades altas ou críticas');
} catch {
  avisos.push('npm audit não respondeu (sem rede?)');
}

// 5. Site no ar.
if (live) {
  const get = async (url, opts = {}) => fetch(url, { redirect: 'manual', headers: { 'user-agent': 'reviewprodutos-health/1.0' }, ...opts });
  try {
    for (const p of ['/', '/sitemap-index.xml', '/robots.txt', '/rss.xml', '/busca/']) {
      const r = await fetch(SITE + p, { headers: { 'user-agent': 'reviewprodutos-health/1.0' } });
      if (r.status !== 200) erros.push(`no ar: ${p} respondeu ${r.status}`);
    }
    const apex = await get(SITE + '/');
    if ([301, 302, 307, 308].includes(apex.status)) {
      avisos.push(`no ar: o domínio sem www redireciona para ${apex.headers.get('location')}; o domínio oficial é sem www (ajuste o domínio principal na Vercel)`);
    }
    const final = await fetch(SITE + '/', { headers: { 'user-agent': 'reviewprodutos-health/1.0' } });
    for (const k of ['x-content-type-options', 'x-frame-options', 'referrer-policy', 'strict-transport-security']) {
      if (!final.headers.get(k)) avisos.push(`no ar: cabeçalho ${k} ausente`);
    }
    const www = await get('https://www.reviewprodutos.com.br/');
    if (apex.status === 200 && (![301, 308].includes(www.status) || !(www.headers.get('location') ?? '').startsWith(SITE))) {
      avisos.push(`no ar: www não redireciona para o domínio sem www (status ${www.status})`);
    }
    const http = await get('http://reviewprodutos.com.br/');
    if (![301, 307, 308].includes(http.status)) avisos.push(`no ar: http:// não redireciona para https (status ${http.status})`);
    ok.push('site no ar conferido');
  } catch (e) {
    avisos.push(`no ar: não foi possível acessar o site (${e.message})`);
  }
}

for (const m of ok) console.log(`✓ ${m}`);
for (const m of avisos) console.log(`! AVISO: ${m}`);
for (const m of erros) console.log(`✗ ERRO: ${m}`);
console.log(`\n${erros.length} erro(s), ${avisos.length} aviso(s)`);
process.exit(erros.length ? 1 : 0);
