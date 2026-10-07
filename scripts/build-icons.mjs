/**
 * Gera favicon.ico, favicon.svg, ícones PNG (16-512), apple-touch-icon, ícone maskable,
 * avatar da equipe e imagem Open Graph padrão a partir do logo SVG.
 * Uso: node scripts/build-icons.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const OUT = 'public';
await mkdir(`${OUT}/icons`, { recursive: true });

const MARK = (bg = 'none', pad = 0) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${64 + pad * 2} ${64 + pad * 2}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse"><stop stop-color="#1F6F9F"/><stop offset="1" stop-color="#0B3C5D"/></linearGradient></defs>
  ${bg !== 'none' ? `<rect x="${-pad}" y="${-pad}" width="${64 + pad * 2}" height="${64 + pad * 2}" fill="${bg}"/>` : ''}
  <path d="M32 2.5c2.2 0 4.2 1.2 5.3 3.1l2.3 3.9 4.4-1.1c2.1-.5 4.4.1 5.9 1.7 1.6 1.6 2.2 3.8 1.7 5.9l-1.1 4.4 3.9 2.3c1.9 1.1 3.1 3.1 3.1 5.3s-1.2 4.2-3.1 5.3l-3.9 2.3 1.1 4.4c.5 2.1-.1 4.4-1.7 5.9-1.6 1.6-3.8 2.2-5.9 1.7l-4.4-1.1-2.3 3.9c-1.1 1.9-3.1 3.1-5.3 3.1s-4.2-1.2-5.3-3.1l-2.3-3.9-4.4 1.1c-2.1.5-4.4-.1-5.9-1.7-1.6-1.6-2.2-3.8-1.7-5.9l1.1-4.4-3.9-2.3C3.7 36.2 2.5 34.2 2.5 32s1.2-4.2 3.1-5.3l3.9-2.3-1.1-4.4c-.5-2.1.1-4.4 1.7-5.9 1.6-1.6 3.8-2.2 5.9-1.7l4.4 1.1 2.3-3.9C27.8 3.7 29.8 2.5 32 2.5Z" fill="url(#g)"/>
  <path d="M20.5 33.2l7.3 7.3L44 24.3" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M47.5 8.5l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="#FBBF24"/>
</svg>`;

// favicon.svg (fundo transparente)
await writeFile(`${OUT}/favicon.svg`, MARK().trim());

const png = async (svg, size, file) => {
  await sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toFile(file);
  console.log('✓', file);
};

for (const s of [16, 32, 48, 180, 192, 512]) await png(MARK(), s, `${OUT}/icons/icon-${s}.png`);
await png(MARK(), 180, `${OUT}/icons/apple-touch-icon.png`);
// maskable: fundo sólido + área segura (pad ~10%)
await png(MARK('#0B3C5D', 10), 512, `${OUT}/icons/icon-maskable-512.png`);

// favicon.ico multi-tamanho (16/32/48) — formato ICO com PNGs embutidos
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(Buffer.from(MARK())).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length; const entries = []; const datas = [];
pngs.forEach((buf, i) => { const e = Buffer.alloc(16); const s = sizes[i]; e.writeUInt8(s === 256 ? 0 : s, 0); e.writeUInt8(s === 256 ? 0 : s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(offset, 12); offset += buf.length; entries.push(e); datas.push(buf); });
await writeFile(`${OUT}/favicon.ico`, Buffer.concat([header, ...entries, ...datas]));
console.log('✓ public/favicon.ico');

// Avatar da equipe (círculo com o símbolo)
const AVATAR = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <circle cx="128" cy="128" r="128" fill="#EEF6FB"/>
  <g transform="translate(64 64) scale(2)">${MARK().replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
</svg>`;
await png(AVATAR, 256, `${OUT}/icons/avatar-equipe.png`);

// Open Graph padrão 1200x630
const OG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse"><stop stop-color="#082C45"/><stop offset="1" stop-color="#145A85"/></linearGradient>
    <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse"><stop stop-color="#7AB5D9"/><stop offset="1" stop-color="#4593C2"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="120" r="260" fill="#ffffff" opacity="0.04"/>
  <circle cx="160" cy="560" r="200" fill="#ffffff" opacity="0.04"/>
  <g transform="translate(90 150) scale(4.2)">
    <path d="M32 2.5c2.2 0 4.2 1.2 5.3 3.1l2.3 3.9 4.4-1.1c2.1-.5 4.4.1 5.9 1.7 1.6 1.6 2.2 3.8 1.7 5.9l-1.1 4.4 3.9 2.3c1.9 1.1 3.1 3.1 3.1 5.3s-1.2 4.2-3.1 5.3l-3.9 2.3 1.1 4.4c.5 2.1-.1 4.4-1.7 5.9-1.6 1.6-3.8 2.2-5.9 1.7l-4.4-1.1-2.3 3.9c-1.1 1.9-3.1 3.1-5.3 3.1s-4.2-1.2-5.3-3.1l-2.3-3.9-4.4 1.1c-2.1.5-4.4-.1-5.9-1.7-1.6-1.6-2.2-3.8-1.7-5.9l1.1-4.4-3.9-2.3C3.7 36.2 2.5 34.2 2.5 32s1.2-4.2 3.1-5.3l3.9-2.3-1.1-4.4c-.5-2.1.1-4.4 1.7-5.9 1.6-1.6 3.8-2.2 5.9-1.7l4.4 1.1 2.3-3.9C27.8 3.7 29.8 2.5 32 2.5Z" fill="#ffffff"/>
    <path d="M20.5 33.2l7.3 7.3L44 24.3" stroke="#0B3C5D" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M47.5 8.5l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="#FBBF24"/>
  </g>
  <text x="400" y="290" font-family="Sora, Inter, Arial, sans-serif" font-weight="800" font-size="92" fill="#ffffff" letter-spacing="-2">Review</text>
  <text x="400" y="380" font-family="Sora, Inter, Arial, sans-serif" font-weight="800" font-size="92" fill="#7AB5D9" letter-spacing="-2">Produtos</text>
  <text x="402" y="440" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="28" fill="#ffffff" opacity="0.85" letter-spacing="4">REVIEWS • COMPARATIVOS • GUIAS DE COMPRA</text>
  <text x="402" y="500" font-family="Inter, Arial, sans-serif" font-weight="500" font-size="26" fill="#ffffff" opacity="0.7">reviewprodutos.com.br</text>
</svg>`;
await sharp(Buffer.from(OG)).png({ compressionLevel: 9 }).toFile(`${OUT}/og-default.png`);
console.log('✓ public/og-default.png');
