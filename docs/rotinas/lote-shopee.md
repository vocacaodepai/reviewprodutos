# Rotina de lote da Shopee: 5 artigos por rodada

Mesma estrutura, volume e qualidade da rotina da Amazon (`docs/rotinas/lote.md`), mas com produtos vendidos na **Shopee Brasil**. Roda como uma segunda **Routine do Claude Code**, 4 vezes por dia (07:52, 10:52, 19:52 e 22:52 de Brasília, uma hora depois das rodadas da Amazon para nunca disputarem a `main`), 5 artigos por rodada, **20 por dia**. Mesma divisão de formatos da Amazon: rodadas das 07:52 e 19:52 com 3 comparativos + 2 reviews, as das 10:52 e 22:52 com 2 comparativos + 3 reviews. Sem listas.

Trabalhe sozinho até o fim, sem perguntar nada ao usuário.

## 0. Pré-requisito: credenciais

As credenciais da API de Afiliados da Shopee chegam **só por variáveis de ambiente** do ambiente da Routine: `SHOPEE_APP_ID` e `SHOPEE_SECRET`. Nunca as escreva em arquivo, commit, PR, artigo ou log. Se alguma estiver vazia, não publique nada: rode `node scripts/shopee.mjs buscar "teste" 1` (sai com código 2 e explica), encerre e diga no informe que as credenciais faltam.

## 1. Clone isolado e leitura

Igual ao `lote.md` seção 1 (clone em `/tmp/rp-lote-*`, branch `claude/lote-shopee-AAAAMMDD-HHMM`, `npm ci`). Leia inteiros `CLAUDE.md`, `docs/PADRAO-EDITORIAL.md`, `src/content.config.ts`, `docs/rotinas/lote.md` e este arquivo.

## 2. Fila e temas

Fila: `content/queue/topics-shopee.json` (mesmo formato de `topics.json`). Escolha 5 temas `pending` de 5 categorias diferentes, na ordem de prioridade, no formato da rodada (ver acima). Para atualizar um tema: `QUEUE_FILE=content/queue/topics-shopee.json node scripts/update-queue.mjs <id> published <slug>` (ou `skipped --erro "motivo"`).

Antes de aceitar um tema, confira que o site ainda não tem artigo do mesmo produto principal com a mesma intenção (`grep -rli "<modelo>" src/content/artigos`), inclusive artigos da Amazon: não duplique review de produto já coberto. Se duplicar, marque `skipped` e pegue o próximo.

**Repor a fila:** com menos de 40 `pending`, gere 100 temas novos (50 review + 50 comparativo, mesmos campos de `topics.json`, ids `<categoria>-<tipo>-sNNN` para não colidir com a fila da Amazon, todas as categorias de `src/data/categorias.json`). Descubra produtos que existem de fato na Shopee com `node scripts/shopee.mjs buscar "<termo>" 10 2` e prefira marcas conhecidas vendidas por loja **Shopee Mall (loja oficial)**. Inclua a reposição no PR da rodada.

## 3. Escolha dos produtos (regras da Shopee)

Para cada tema, o redator acha o anúncio real com a API:

```bash
node scripts/shopee.mjs buscar "<marca modelo>" 10 2   # ordem 2 = mais vendidos
node scripts/shopee.mjs item <itemId> <shopId>         # reconfere um anúncio
```

- Só use anúncio de loja **Shopee Mall (loja oficial)**, ou de marca própria verificável; evite vendedor genérico sem marca, produto "importado" sem modelo claro e anúncios com título de palavras soltas.
- O nome, o modelo e a variante do anúncio precisam bater com o produto do artigo. Se o anúncio mistura variações (voltagem, cor), escreva no `nome` a variante do anúncio e a `voltagem` quando a API ou o título informar.
- `itemId`, `shopId` e `link` (o `offerLink` curto `https://s.shopee.com.br/...`) vêm **exatamente** da API. Nunca monte nem encurte link à mão, nunca use `productLink` como botão.
- Para a imagem use o `imagem` da API (`cf.shopee.com.br`), com `fonte: shopee` e `alt` descrevendo o produto. Os scripts de validação conferem se carrega.
- Especificações, garantia e assistência vêm do **site oficial do fabricante** e de veículos especializados (WebFetch/WebSearch). A API não traz ficha técnica: o que o anúncio da Shopee não confirma e o fabricante não publica, não entra no artigo. Nunca invente.
- Estrelas, nota e quantidade de vendas da Shopee **não** aparecem no texto (usamos nossa nota de 0 a 10). `avaliacaoConsumidores` só com fonte de fora da Shopee (Reclame Aqui, fóruns).
- Preço: segue a regra do site. Nada de R$ no corpo e nada de preço da Shopee publicado. `precoMercado` só se o mesmo modelo aparecer em pelo menos 2 comparadores ou lojas, com páginas realmente abertas, fontes fora da Shopee; sem isso, sem `precoMercado`.

## 4. Formato do produto no frontmatter

Em vez de `asin`, o produto da Shopee leva:

```yaml
    loja: shopee
    shopee:
      itemId: 23698068860
      shopId: 1284887936
      link: "https://s.shopee.com.br/XXXXXXXX"
      loja: "Philips Walita"        # nome da loja oficial (opcional)
```

`imagem.fonte: shopee`. Todo o resto do schema é igual ao da Amazon (veredito, prós e contras reais, FAQ, `relacionados`, autor `bruno-danello`, sem fontes no corpo, sem menção a IA, sem "testamos", sem links no corpo). Os botões saem como **"Comprar agora na Shopee"** e o aviso de afiliado continua só no rodapé. Um artigo pode misturar lojas, mas prefira todos os produtos do artigo na mesma loja.

## 5. Redatores, revisão, publicação

Igual ao `lote.md` seções 3, 4, 5, 6 e 7, com estas trocas: o prompt dos redatores é o de lá, trocando "Amazon.com.br / ASIN / find-image" pelas regras das seções 3 e 4 deste arquivo; a seção 3b (preços) não se aplica; o PR leva só `src/content/artigos/` e `content/queue/topics-shopee.json`; no informe, diga também quantos anúncios da Shopee foram descartados e por quê.

Termine o informe com **Pendências do dono** (lista de `docs/PENDENCIAS-DONO.md`, cada item com link) e o link https://reviewprodutos.com.br.
