# Padrão Editorial — Review Produtos

> Este documento é a referência única para humanos e para o gerador automático (`scripts/generate-articles.mjs`, que o injeta no prompt do modelo). Ele consolida a pesquisa de referências internacionais (Wirecutter, RTINGS, OutdoorGearLab, Tom's Guide, PCMag, Which?), nacionais (Buscapé/Zoom, TechTudo, Canaltech, Tecnoblog, GDM, Buskando) e as regras do Google, do AdSense e do Programa de Associados da Amazon Brasil. Veja `docs/PESQUISA-REFERENCIAS.md` para as evidências.
>
> Versão 1.0 · 7 de outubro de 2026

## 1. Missão e promessa da marca

**Missão:** ajudar brasileiros a comprar certo na primeira vez, em qualquer categoria de produto.

**Promessa ao leitor (o que todo artigo precisa cumprir):**

1. Responder a pergunta de compra nos primeiros 30 segundos (veredito no topo).
2. Dizer para quem o produto é e para quem não é.
3. Mostrar o que o fabricante não conta: limitações, defeitos recorrentes, cuidados.
4. Comparar com alternativas reais da mesma faixa.
5. Explicar como chegamos à nota (critérios e pesos visíveis).
6. Ser honesto sobre o método (análise de dados e fontes vs. teste físico).
7. Trazer contexto brasileiro: voltagem, tomada, garantia, assistência técnica, Inmetro/Anatel, reputação da marca no Reclame Aqui.

**Posicionamento:** entre o comparador frio (Buscapé/Zoom, sem contras explícitos) e a notícia de tecnologia (TechTudo/Canaltech, forte só em eletrônicos), somos o guia honesto de **qualquer categoria**, organizado também pelo **problema do leitor**, não só pelo produto.

## 2. Tom de voz e princípios

- **Direto e útil.** Resposta antes da explicação. Frases curtas. Segunda pessoa ("você").
- **Honesto.** Defeitos entram no texto com o mesmo peso dos elogios. Produto ruim recebe nota ruim mesmo com link de afiliado.
- **Brasileiro.** Vocabulário nativo: "custo-benefício", "vale a pena", "é bom?", "para quem é", "pontos de atenção", "ficha técnica", "a partir de". CTA: "Ver preço na Amazon" (nunca "Comprar agora"). Evitar anglicismos ("top picks", "budget pick").
- **Transparente sobre o método.** Quando não houve teste físico, o artigo diz que a análise se baseia em especificações oficiais, fontes especializadas e relatos públicos de consumidores fora da Amazon. Nunca escrever "testamos" sem `testadoFisicamente: true`.
- **Sem exagero.** Proibidos: "o melhor do mundo", "imperdível", "promoção", "corra", promessas de cura, superlativos sem evidência.
- **Cauteloso em saúde e bebê (YMYL).** Linguagem informativa, "quando procurar um profissional", disclaimer automático do layout, nenhum produto medicamentoso.
- **Transparente sobre IA.** Usamos IA para pesquisa, organização e rascunho; o padrão, a verificação automática e a revisão editorial são de responsabilidade humana. Isso está declarado em `/politica-editorial/` e no rodapé de cada artigo.

## 3. Os três formatos de artigo

Todos os formatos compartilham o mesmo frontmatter (ver seção 11) e o mesmo "esqueleto" renderizado pelo layout: título → meta (autor, datas, tempo de leitura, nota de IA) → aviso de afiliado → imagem de destaque → **Resumo em 30 segundos** (veredito + destaques) → corpo em Markdown → tabela comparativa (2+ produtos) → cards de produto (nota, selo, prós/contras, ficha, botão) → "Como avaliamos" (critérios e pesos) → FAQ → fontes → nota de produção → autor → relacionados.

O **corpo em Markdown** é a parte que o redator escreve. Ele não repete o que os cards já mostram (prós/contras, ficha técnica), e sim explica, contextualiza e decide.

### 3.1 Review individual (`tipo: review`, 1 produto)

- **Intenção:** fundo de funil ("X é bom?", "X vale a pena?", "review X"), com H2 de dor para o duplo funil.
- **Tamanho:** 1.000 a 1.800 palavras no corpo.
- **Título:** `[Produto] é bom? Review completo: vale a pena em 2026?` ou `[Produto] vale a pena? Review [característica marcante]`. `seoTitle` ≤ 62 caracteres.
- **Veredito (frontmatter):** 3 a 5 frases: o que é, para quem vale, para quem não vale, a limitação principal.

Seções do corpo, nesta ordem (H2):

1. `## Para quem é este review` — reconhece a busca do leitor (nome do produto) e a dor por trás dela (2 parágrafos).
2. `## O que é o [produto]` — posicionamento, linha, geração, o que o diferencia na faixa.
3. `## [Critério 1]` … `## [Critério N]` — um H2 por critério avaliado (ex.: Desempenho, Capacidade, Facilidade de uso, Ruído, Durabilidade), com H3 para sub-aspectos. Dados concretos (potência, tempos, medidas) com unidade. Cada seção termina com uma frase de julgamento.
4. `## Durabilidade, garantia e assistência` — garantia em meses, rede de assistência, padrões de defeito relatados (fonte citada).
5. `## O que dizem os consumidores` — padrões de elogio/reclamação a partir de **fontes fora da Amazon** (Reclame Aqui, fóruns, YouTube, veículos especializados), citadas em `fontes`.
6. `## Alternativas que vale considerar` — 2 a 3 concorrentes com cenário em que cada um vence (links internos quando existirem).
7. `## Dicas para tirar o máximo do [produto]` — 4 a 6 bullets práticos (uso, limpeza, segurança).
8. `## Veredito final` — decisão clara: compre se…; não compre se…; o que conferir antes (voltagem, tomada, tamanho).

### 3.2 Comparativo (`tipo: comparativo`, exatamente 2 produtos)

- **Intenção:** meio de funil ("A vs B", "A ou B: qual comprar?", "X ou Y" entre tipos de produto).
- **Tamanho:** 1.100 a 1.800 palavras.
- **Título:** `[A] vs [B]: qual [produto] vale mais a pena em 2026?` ou `[A] ou [B]: qual comprar?`
- **Veredito:** quem vence no geral, quem vence por preço, e a regra de decisão ("se você…, escolha A; se…, escolha B").
- **Selos:** normalmente `escolha-do-editor` para o vencedor geral e `melhor-custo-beneficio` (ou `melhor-premium`) para o outro.

Seções (H2):

1. `## Resposta rápida` — vencedor e regra de decisão em 3 frases.
2. `## Para quem é esta comparação` — a dúvida real e a dor do leitor.
3. `## Frente a frente: o que muda na prática` — H3 por diferença que importa (não por spec): capacidade real, desempenho, uso diário, consumo/energia, ruído, acabamento, acessórios.
4. `## Onde o [A] vence` / `## Onde o [B] vence` — bullets objetivos.
5. `## Preço e custo-benefício` — faixa qualitativa (entrada/intermediário/premium), sem valores em reais; o que a diferença de faixa compra de fato.
6. `## Escolha o [A] se…` / `## Escolha o [B] se…` — perfis.
7. `## Veredito` — decisão e um "terceiro caminho" quando existir (link interno).

### 3.3 Lista "os N melhores" (`tipo: lista`, 3 a 7 produtos)

- **Intenção:** meio de funil ("melhor X 2026", "melhor X para Y", "melhor X custo-benefício", "X até R$ 500"). Quando o tema é uma **dor** (topo de funil), use este formato com `funil.estagio: topo` e a variante "guia de problema" abaixo.
- **Tamanho:** 1.300 a 2.500 palavras no corpo (mínimo 120 palavras de texto por produto além do card).
- **Título:** `Melhor [X] 2026: [N] modelos para comprar [por perfil]` ou `Os [N] melhores [X] de 2026 para [uso/perfil]`. N no título = número de produtos no frontmatter.
- **Veredito:** vencedor geral + melhor custo-benefício + a recomendação por perfil em 3 a 5 frases.
- **Selos obrigatórios:** `escolha-do-editor` e `melhor-custo-beneficio`; opcionais: `melhor-premium`, `melhor-barato`, `melhor-para-iniciantes`, `melhor-compacto`, `melhor-para-familias`, `melhor-silencioso`, `melhor-desempenho`. No máximo 1 produto por selo.

Seções (H2):

1. `## Resposta rápida` — o melhor no geral, o melhor custo-benefício e para quem cada um serve.
2. `## Para quem é este guia` — perfil do leitor e a dor que motiva a busca.
3. `## Como escolhemos` — critérios de seleção e ordem (quantos modelos considerados, por que entraram/saíram), fontes consultadas, e a frase de transparência sobre teste.
4. `## [N]. [Marca Modelo]: melhor para [perfil]` — um H2 por produto, na ordem do ranking, com 120 a 200 palavras: por que entrou, para quem é, o que decepciona, contexto brasileiro (voltagem, garantia). Os prós/contras e a ficha ficam no card.
5. `## Como escolher [X]: o que importa de verdade` — critérios de compra explicados (capacidade, potência, voltagem, consumo, tamanho, garantia, assistência), em H3.
6. `## O que não recomendamos (e por quê)` — 2 a 3 produtos/tipos populares que ficaram de fora, com motivo.
7. `## Veredito` — decisão por perfil e próximo passo (links internos para reviews e comparativos).

**Variante "guia de problema" (estágio topo):** o título abre pela dor (`Dor nas costas ao dirigir: causas e 5 produtos que ajudam de verdade`); as seções 2 e 3 viram `## Por que [a dor] acontece`, `## O que você pode fazer hoje sem comprar nada` e `## O que procurar em um [produto] para [a dor]`; os produtos entram só depois; obrigatório `## Quando procurar um profissional` em saúde/bebê. CTAs comerciais só após a solução.

## 4. Sistema de notas e selos

**Escala 0 a 10 (uma casa decimal):** 9,0–10 Excelente (referência da categoria) · 8,0–8,9 Muito bom · 7,0–7,9 Bom (vale para o público certo) · 6,0–6,9 Razoável (só com desconto ou necessidade específica) · abaixo de 6 Não recomendamos.

**Critérios com peso (soma = 100):** cada artigo declara 4 a 6 critérios em `criterios` e dá a cada produto uma nota por critério em `notasCriterios`. A **nota final** é a média ponderada, arredondada a 1 casa. Pesos de referência por família de produto:

| Família | Critérios e pesos sugeridos |
| --- | --- |
| Eletroportáteis de cozinha | Desempenho 30 · Capacidade/formato 15 · Facilidade de uso e limpeza 15 · Durabilidade/acabamento 15 · Ruído 5 · Custo-benefício 20 |
| Áudio (fones, caixas) | Som 30 · Conforto/ergonomia 15 · Bateria 15 · Conectividade/recursos 15 · Construção 10 · Custo-benefício 15 |
| Celulares/tablets | Tela 15 · Desempenho 20 · Câmera 20 · Bateria 15 · Software/atualizações 10 · Custo-benefício 20 |
| Casa (aspiradores, ventiladores, climatização) | Eficiência 30 · Praticidade 20 · Ruído 15 · Consumo de energia 10 · Durabilidade 10 · Custo-benefício 15 |
| Saúde/postura/sono | Eficácia percebida 30 · Conforto 20 · Segurança/materiais 15 · Praticidade 15 · Custo-benefício 20 |
| Bebê | Segurança/certificação 35 · Praticidade 20 · Conforto do bebê 15 · Durabilidade 10 · Custo-benefício 20 |
| Pets | Funcionalidade 30 · Segurança/materiais 20 · Facilidade de limpeza 20 · Durabilidade 10 · Custo-benefício 20 |
| Ferramentas/automotivo | Desempenho 30 · Ergonomia 15 · Durabilidade 20 · Acessórios/garantia 15 · Custo-benefício 20 |

**Selos** (campo `selo`): `escolha-do-editor` (melhor equilíbrio geral) · `melhor-custo-beneficio` · `melhor-premium` · `melhor-barato` · `melhor-para-iniciantes` · `melhor-compacto` · `melhor-para-familias` · `melhor-silencioso` · `melhor-desempenho` · `mais-vendido` (usar só com fonte pública não-Amazon). O layout mostra a legenda; o texto deve justificar cada selo.

**Faixa de preço** (`faixaPreco`): `$` entrada · `$$` intermediário · `$$$` premium · `$$$$` topo de linha. Nunca valores em reais.

## 5. Regras de SEO por artigo

- **Title tag (`seoTitle`)** ≤ 62 caracteres, com a entidade principal no início, ano quando fizer sentido e, em reviews, a pergunta ("é bom?"/"vale a pena?"). Sem nome do site (o layout adiciona).
- **H1 (`title`)** 20 a 100 caracteres: pode variar a sintaxe do title (pergunta vs. afirmação) para cobrir duas formulações da busca.
- **Meta description (`description`)** 120 a 165 caracteres, com benefício + o que o leitor vai encontrar; sem clickbait.
- **Slug** 3 a 8 palavras, sem acentos, sem ano, sem stop words supérfluas, estável para sempre (ex.: `melhor-air-fryer-familia-grande`, `galaxy-a57-vs-a56`, `dor-nas-costas-ao-dirigir`). O ano fica só no título e é atualizado no refresh.
- **Estrutura:** H2 para seções, H3 para sub-aspectos; nunca H1 no corpo; 4+ H2.
- **Perguntas reais como FAQ:** 4 a 6 perguntas no estilo "As pessoas também perguntam" (incluindo uma de comparação de marca e uma sobre a dor), respostas de 2 a 4 frases com dado concreto. O FAQ também vira H2/H3 implícito no layout.
- **Links internos:** mínimo 3 por artigo (pilar da categoria, review/comparativo irmão, página de categoria), com texto âncora descritivo; `relacionados` no frontmatter quando souber os slugs. O layout adiciona "Leia também" automaticamente.
- **Imagens:** alt text descritivo (produto, cor, ângulo), 8 a 160 caracteres, sem lista de palavras-chave.
- **Dados estruturados** (gerados pelo layout): Article, BreadcrumbList, Organization/WebSite, Person; `Product` + `Review` (com `positiveNotes`/`negativeNotes`) em review individual; `ItemList` de Products em listas e comparativos; FAQPage mantido apenas como dado semântico (sem rich result desde maio/2026). Nunca `aggregateRating` com dados da Amazon.
- **Frescor:** `pubDate` real; `updatedDate` só quando o conteúdo mudar de verdade; refresh trimestral das listas e semestral dos reviews (atualizar ano no título, trocar descontinuados, revisar FAQ).
- **Um dado próprio por artigo** (critério de "information gain"): tabela de reputação de marcas no Reclame Aqui com mês/ano, cálculo de consumo em kWh/mês, matriz "melhor para" por perfil, análise de defeitos recorrentes com fontes, comparação de garantia/assistência. Declarar em "Como escolhemos/avaliamos".

## 6. Regra do duplo funil

Cada artigo atende **duas buscas** ao mesmo tempo: a de quem já sabe o produto (fundo) e a de quem só tem o problema (topo/meio).

| Tipo | Elemento de fundo (produto) | Elemento de topo/meio (dor) |
| --- | --- | --- |
| Review | Título, H2 "O que é", critérios, veredito | Seção "Para quem é este review" abre pela dor; FAQ com 1-2 perguntas da dor; `funil.problema` preenchido |
| Comparativo | Nomes dos dois produtos no título e nas seções | "Para quem é esta comparação" e perfis "Escolha A se…" descritos pela necessidade |
| Lista | H2 por produto com nome (ranqueia cada produto) | Título e "Resposta rápida" falam do uso/dor; "Como escolher"; FAQ da dor |
| Guia de problema | Bloco de produtos com nomes, cards e links | Título pela dor, causas, soluções sem compra, "o que procurar" |

Regras: o `funil.problema` descreve a dor em linguagem do leitor ("casa cheia de mosquitos", "dor nas costas ao dirigir"); `funil.palavrasChave` traz pelo menos uma expressão de fundo e uma de topo/meio; o primeiro parágrafo responde à busca; CTAs comerciais nunca aparecem antes da resposta.

## 7. Taxonomia

Categorias e subcategorias em `src/data/categorias.json` (ids/slugs são imutáveis):

`tecnologia` (celulares-e-acessorios, fones-de-ouvido, notebooks-e-computadores, tvs-e-video, casa-inteligente, smartwatches-e-wearables, audio-e-caixas-de-som, games, cameras-e-fotografia) · `casa-e-jardim` (limpeza, organizacao, climatizacao, iluminacao, ferramentas, jardinagem, cama-mesa-e-banho, decoracao, festas-e-eventos) · `cozinha` (air-fryer, cafeteiras, liquidificadores-e-processadores, panelas-e-frigideiras, utensilios, eletroportateis, geladeiras-fogoes-e-micro-ondas, purificadores-e-filtros) · `saude-e-bem-estar` (dor-e-postura, sono-e-descanso, massagem-e-relaxamento, monitoramento-de-saude, higiene-bucal, suplementos-e-vitaminas, primeiros-socorros) · `beleza-e-cuidados-pessoais` (cabelo, pele-e-skincare, barbear-e-depilacao, maquiagem, perfumes, unhas-e-maos) · `bebes-e-criancas` (carrinhos-e-cadeirinhas, alimentacao-e-amamentacao, higiene-e-banho, quarto-e-sono-do-bebe, brinquedos, seguranca-e-monitoramento) · `pets` (alimentacao-e-comedouros, higiene-e-cuidados, caminhas-e-casinhas, brinquedos-e-enriquecimento, passeio-e-transporte) · `esportes-e-lazer` (fitness-e-musculacao, corrida-e-caminhada, ciclismo, camping-e-aventura, piscina-e-praia, yoga-e-pilates) · `automotivo` (conforto-e-postura-ao-dirigir, eletronicos-automotivos, acessorios-internos, limpeza-e-estetica, ferramentas-e-emergencia, motos) · `escritorio-e-estudos` (cadeiras-e-mesas, monitores, teclados-e-mouses, papelaria-e-organizacao, iluminacao-e-ergonomia, impressoras-e-suprimentos) · `moda-e-acessorios` (tenis-e-calcados, mochilas-e-bolsas, malas-e-viagem, relogios-e-oculos).

**URLs:** `/reviews/<slug>/` · `/comparativos/<slug>/` · `/melhores/<slug>/` · `/categoria/<cat>/` e `/categoria/<cat>/<sub>/` · `/solucoes/` (índice por problema). Clusters: 1 pilar "melhor X" + 2-3 satélites de meio + 4-6 reviews + 1-2 comparativos + 1-2 guias de problema por subcategoria, todos interligados.

**Prioridade de categorias** (comissão Amazon BR × volume × fraqueza da concorrência): saúde e bem-estar, beleza, bebê (13%), pets (11%), casa/cozinha/ferramentas (8%), escritório/home office, automotivo; celulares e TVs só em fundo de funil (concorrência forte).

## 8. Regras de afiliado e divulgação (Programa de Associados da Amazon Brasil)

1. **Divulgação exata** (cláusula 5 do Contrato Operacional): "Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas." Exibida pelo layout no topo (antes do primeiro link), no fim e no rodapé, mais a página `/divulgacao-de-afiliados/`. Todo botão de compra leva o micro-rótulo "Link de afiliado · Publicidade" (CONAR 2026).
2. **Links:** sempre `https://www.amazon.com.br/dp/ASIN?tag=<tag>`, gerados pelo componente a partir do `asin`; `rel="sponsored nofollow noopener"`, nova aba. Proibidos: encurtadores, redirecionamentos internos, links no corpo do texto, links em PDF/e-mail não solicitado/pop-up.
3. **Preços e disponibilidade:** nunca em texto. Só faixa qualitativa. Preço real somente quando a Creators API estiver ativa, com data/hora e aviso de alteração.
4. **Avaliações de clientes da Amazon:** não exibir, copiar ou parafrasear notas, estrelas, quantidade de avaliações ou trechos. `avaliacaoConsumidores` só com `fonte` não-Amazon (Reclame Aqui, Buscapé, Proteste).
5. **Promoções:** proibidas as palavras cupom, frete grátis, menor preço, "% de desconto", "em promoção" em texto corrido (o validador bloqueia). Conteúdo sazonal fala de "época de ofertas" sem prometer valores.
6. **Marca Amazon:** só o nome em texto; nunca "recomendado pela Amazon" ou "parceiro oficial".
7. **Conta:** 3 vendas qualificadas em 180 dias para manter a inscrição; 10 vendas/30 dias para a Creators API. Nunca comprar pelos próprios links.
8. **Múltiplos vendedores:** quando existir, `linksAlternativos` (Mercado Livre, loja oficial) por produto, também com `rel="sponsored nofollow"`.

## 9. Política de imagens

Ordem de preferência para `imagem.src` (hero e por produto):

1. **Creators API** (`fonte: api`) quando a conta for elegível: URL da API, sem cache > 24h.
2. **Fabricante** (`fonte: fabricante`): imagem oficial do site/press kit da marca, por link direto, com `credito`.
3. **Amazon por link direto** (`fonte: amazon`): URL `m.media-amazon.com/images/I/...` descoberta por `scripts/find-image.mjs` (snapshot público da página → página ao vivo com agente identificado → miniatura por ASIN), exibida sem download, cache, recorte ou derivado; o site não processa essas imagens no build e não as embute na imagem Open Graph.
4. **Própria** (`fonte: propria`): fotos da equipe (preferidas quando houver teste físico).

Toda imagem é validada (HTTP 200, `image/*`, lado mínimo 300 px para hero/cards; miniaturas 160 px marcadas com `credito`). `largura`/`altura` preenchidas evitam CLS. Alt text descritivo obrigatório. Nunca usar imagem de outro modelo/cor do que o ASIN indicado; o `title` retornado pelo script confirma o produto.

## 10. Checklist de qualidade pré-publicação

O validador (`node scripts/validate-content.mjs --images`) bloqueia o que é verificável por máquina; o restante é responsabilidade editorial.

**Automático (bloqueia):** schema completo; tipo × número de produtos; ASIN válido e único; `title` 20-100, `seoTitle` ≤ 62, `description` 100-170, `veredito` 120-600; FAQ 2-10; critérios somando ~100; imagens válidas e com alt; corpo com mínimo de palavras e 4+ H2; sem H1; sem "R$"; sem links da Amazon no corpo; sem encurtadores; sem "testamos" quando `testadoFisicamente: false`; sem estrelas/avaliações da Amazon; sem promessas de promoção; `avaliacaoConsumidores.fonte` não-Amazon; slug e conjunto de ASINs não duplicados.

**Editorial (humano/modelo):**
- [ ] Veredito responde "vale a pena? para quem?" sem rodeios.
- [ ] Produtos existem na Amazon.com.br, nomes e modelos corretos, voltagem indicada quando for eletro.
- [ ] Números (potência, capacidade, bateria, dimensões, garantia) conferidos em fonte oficial e com unidade.
- [ ] Prós e contras específicos (nada de "boa qualidade"); contras reais, não disfarçados.
- [ ] Notas por critério coerentes com o texto; nota final = média ponderada.
- [ ] Duplo funil: dor presente no título/intro/FAQ; `funil.problema` preenchido.
- [ ] Um dado próprio (tabela/cálculo/matriz) no artigo.
- [ ] 3+ links internos; fontes listadas com URLs reais.
- [ ] Nenhum placeholder, ano errado, contagem errada ("Top 8" com 5 produtos), ou texto repetido entre produtos.
- [ ] Saúde/bebê: cautela, "quando procurar um profissional", sem promessa de cura.
- [ ] Revisão humana registrada (quem revisou e quando) antes de considerar o artigo "final".

## 11. Frontmatter de referência

```yaml
---
title: "Melhor air fryer 2026: 5 modelos para família grande (5 litros ou mais)"
seoTitle: "Melhor air fryer para família grande 2026: 5 modelos"
description: "Analisamos as air fryers de 5 litros ou mais mais vendidas no Brasil e escolhemos 5 que valem a pena por capacidade real, potência, limpeza e custo-benefício."
tipo: lista                      # review | comparativo | lista
categoria: cozinha               # id de src/data/categorias.json
subcategoria: air-fryer          # slug da subcategoria
tags: ["air fryer", "família grande", "cozinha"]
pubDate: 2026-10-07
autor: equipe
imagem:
  src: "https://m.media-amazon.com/images/I/XXXXXXXX._AC_SL1500_.jpg"
  fonte: amazon
  largura: 1200
  altura: 1500
  alt: "Air fryer de 6,5 litros preta com cesto aberto cheio de batatas"
funil:
  estagio: meio                  # topo | meio | fundo
  problema: "cozinhar para a família toda sem fazer várias fornadas"
  palavrasChave: ["melhor air fryer 2026", "air fryer grande 5 litros", "air fryer para família", "air fryer custo benefício"]
veredito: "Resumo em 3 a 5 frases com vencedor, custo-benefício e para quem cada um serve."
produtos:
  - nome: "Marca Modelo Air Fryer 6,5L"
    marca: "Marca"
    modelo: "ABC-65"
    asin: "B0XXXXXXXX"
    voltagem: "127V"
    variantes:
      - rotulo: "Versão 220V"
        asin: "B0YYYYYYYY"
    imagem: { src: "https://m.media-amazon.com/images/I/....jpg", fonte: amazon, largura: 1000, altura: 1200, alt: "..." }
    nota: 8.7
    selo: escolha-do-editor
    resumo: "Uma frase: por que entrou e para quem é."
    pros: ["...", "...", "..."]
    contras: ["...", "..."]
    especificacoes: { "Capacidade": "6,5 litros", "Potência": "1.700 W", "Garantia": "12 meses" }
    faixaPreco: "$$"
    idealPara: "Famílias de 4 a 6 pessoas"
    naoIndicadoPara: "Cozinhas muito pequenas"
    notasCriterios: { "Desempenho": 9.0, "Capacidade e formato": 9.5, "Facilidade de uso e limpeza": 8.0, "Durabilidade e acabamento": 8.0, "Ruído": 7.5, "Custo-benefício": 8.5 }
    linksAlternativos: []
criterios:
  - { nome: "Desempenho", peso: 30 }
  - { nome: "Capacidade e formato", peso: 15 }
  - { nome: "Facilidade de uso e limpeza", peso: 15 }
  - { nome: "Durabilidade e acabamento", peso: 15 }
  - { nome: "Ruído", peso: 5 }
  - { nome: "Custo-benefício", peso: 20 }
tabelaComparativa: ["Capacidade", "Potência", "Voltagem", "Garantia"]
faq:
  - pergunta: "Air fryer de 5 litros serve para quantas pessoas?"
    resposta: "Resposta direta em 2 a 4 frases com dado concreto."
fontes:
  - { nome: "Site oficial da marca — ficha técnica", url: "https://..." }
testadoFisicamente: false
rascunho: false
destaque: false
relacionados: []
---
```

## 12. Interligação e clusters

- Cada artigo linka para: a página da categoria/subcategoria, o pilar "melhor X" da subcategoria (quando existir), 1-2 reviews/comparativos irmãos.
- O gerador recebe a lista de artigos já publicados na mesma subcategoria para citar; o layout adiciona "Leia também" por afinidade (subcategoria > categoria > tags).
- Evitar canibalização: uma lista canônica por intenção ("melhor air fryer", "melhor air fryer barata", "melhor air fryer família grande" são intenções distintas; "melhor air fryer 2026" e "melhores air fryers" não são).

## 13. Ritmo, frescor e governança

- Ritmo recomendado no lançamento: 2 lotes/dia (10 artigos) por 2-3 semanas, depois 4 lotes/dia, acompanhando indexação e desempenho no Search Console. Qualidade > volume: o update de março/2026 puniu escala com padrão.
- Antes de pedir AdSense: 40-60 artigos indexados, cada categoria com 5+, 40% de guias informacionais; sem categorias vazias indexadas (o site já marca `noindex` nas vazias).
- Antes de se inscrever no Associados: 15-20 artigos públicos com divulgação e política de privacidade; nos primeiros 180 dias, priorizar fundo de funil para fechar 3 vendas qualificadas.
- Correções: erros factuais corrigidos no artigo com nota de correção; canal `contato@reviewprodutos.com.br`.
