#!/usr/bin/env node
/**
 * Consulta a API de Afiliados da Shopee Brasil (GraphQL) para achar produtos reais e o link curto de afiliado.
 * Credenciais SÓ por variáveis de ambiente (SHOPEE_APP_ID e SHOPEE_SECRET); nunca grave no repositório.
 *
 * Uso:
 *   node scripts/shopee.mjs buscar "<palavra-chave>" [limite=10] [ordem=2]   # ordem: 1 relevância, 2 vendas, 3 preço (menor), 4 preço (maior), 5 comissão
 *   node scripts/shopee.mjs item <itemId> <shopId>                           # dados atuais de um anúncio
 * Saída: JSON (uma linha por produto) com nome, loja, tipo de loja, preço, nota, vendas, imagem e `link` (offerLink de afiliado).
 */
import { createHash } from 'node:crypto';

const ENDPOINT = 'https://open-api.affiliate.shopee.com.br/graphql';
const { SHOPEE_APP_ID: APP_ID, SHOPEE_SECRET: SECRET } = process.env;
if (!APP_ID || !SECRET) { console.error('Defina SHOPEE_APP_ID e SHOPEE_SECRET no ambiente (configuração do ambiente da Routine).'); process.exit(2); }

async function gql(query) {
  const payload = JSON.stringify({ query });
  const ts = Math.floor(Date.now() / 1000);
  const signature = createHash('sha256').update(`${APP_ID}${ts}${payload}${SECRET}`).digest('hex');
  const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `SHA256 Credential=${APP_ID}, Timestamp=${ts}, Signature=${signature}` }, body: payload });
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '));
  return json.data;
}

const FIELDS = 'itemId shopId productName shopName shopType price priceMin priceMax priceDiscountRate ratingStar sales imageUrl productLink offerLink commissionRate';
const TIPO_LOJA = { 1: 'Shopee Mall (loja oficial)', 2: 'Star', 4: 'Star+' };
const fmt = (n) => ({
  itemId: n.itemId, shopId: n.shopId, nome: n.productName, loja: n.shopName, tipoLoja: (n.shopType ?? []).map((t) => TIPO_LOJA[t] ?? `tipo ${t}`),
  preco: Number(n.price), precoMin: Number(n.priceMin), precoMax: Number(n.priceMax), desconto: n.priceDiscountRate, nota: Number(n.ratingStar), vendas: n.sales,
  imagem: n.imageUrl, pagina: n.productLink, link: n.offerLink, comissao: Number(n.commissionRate),
});

const [cmd, a, b, c] = process.argv.slice(2);
if (cmd === 'buscar' && a) {
  const kw = JSON.stringify(a); const limite = Number(b ?? 10); const ordem = Number(c ?? 2);
  const d = await gql(`{ productOfferV2(keyword: ${kw}, limit: ${limite}, sortType: ${ordem}) { nodes { ${FIELDS} } } }`);
  for (const n of d.productOfferV2.nodes) console.log(JSON.stringify(fmt(n)));
} else if (cmd === 'item' && a && b) {
  const d = await gql(`{ productOfferV2(itemId: ${Number(a)}, shopId: ${Number(b)}) { nodes { ${FIELDS} } } }`);
  const n = d.productOfferV2.nodes[0];
  console.log(JSON.stringify(n ? fmt(n) : { itemId: Number(a), erro: 'anúncio não encontrado ou sem oferta de afiliado' }));
} else { console.error('Uso: node scripts/shopee.mjs buscar "<palavra-chave>" [limite] [ordem] | item <itemId> <shopId>'); process.exit(1); }
