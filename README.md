# Review Produtos — reviewprodutos.com.br

Site brasileiro de **reviews, comparativos e listas dos melhores produtos** (começando pela Amazon.com.br), construído com [Astro 7](https://astro.build), Tailwind CSS 4 e Pagefind, otimizado para SEO e pronto para Google AdSense e Amazon Associados.

> Documentos de base: [`docs/PESQUISA-REFERENCIAS.md`](docs/PESQUISA-REFERENCIAS.md) (pesquisa de referências internacionais/nacionais e regras Google/AdSense/Amazon) e [`docs/PADRAO-EDITORIAL.md`](docs/PADRAO-EDITORIAL.md) (o padrão Review Produtos que humanos e o gerador automático seguem).

## Como funciona

| Camada | O que é |
| --- | --- |
| `src/content/artigos/<categoria>/<slug>.md` | Cada artigo: frontmatter YAML estruturado (produtos com ASIN, notas, prós/contras, FAQ, funil) + corpo em Markdown. Três formatos: `review` (1 produto), `comparativo` (2), `lista` (3+). |
| `src/data/categorias.json` / `autores.json` | Taxonomia (11 categorias e subcategorias) e autores. |
| `src/layouts/ArticleLayout.astro` | Renderiza o artigo: resumo em 30 segundos, tabela comparativa, cards de produto com botão de afiliado, critérios, FAQ, autor, JSON-LD (Article, Product/Review, ItemList, FAQPage, BreadcrumbList). |
| `scripts/generate-articles.mjs` | Gerador automático (Claude API + busca na web) que consome a fila `content/queue/topics.json`, resolve imagens reais por ASIN e valida tudo antes de gravar. |
| `docs/rotinas/lote.md` | Rotina diária (Routine do Claude Code): 4 lotes de 5 artigos por dia, com PR e merge automático. |
| `.github/workflows/publicar-artigos.yml` | Gerador via Claude API, só para disparo manual (exige `ANTHROPIC_API_KEY`). |
| `scripts/validate-content.mjs` | Validador de schema, regras editoriais e imagens (usado no CI). |

## Rodando localmente

```bash
npm install
cp .env.example .env        # preencha PUBLIC_AMAZON_TAG etc.
npm run dev                 # http://localhost:4321
npm run build               # gera dist/ + índice de busca (Pagefind)
npm run preview
```

Validar conteúdo:

```bash
npm run validate:content           # schema + regras editoriais
npm run images:check               # idem + checa URLs/dimensões das imagens
node scripts/find-image.mjs ASIN   # descobre a imagem real de um produto pelo ASIN
node scripts/update-queue.mjs <id> published <slug>   # marca um tema da fila (atômico, seguro em paralelo)
```

## Configuração obrigatória antes de ir ao ar

1. **Tag de afiliado Amazon**: crie sua conta em [associados.amazon.com.br](https://associados.amazon.com.br) e defina `PUBLIC_AMAZON_TAG` (ex.: `seusite-20`) no `.env` local, nas *Variables* do GitHub Actions e na hospedagem. Sem isso os links usam o placeholder `reviewprodutos-20` e **não geram comissão**.
2. **AdSense**: após aprovação, defina `PUBLIC_ADSENSE_CLIENT=ca-pub-...`. O script, o `ads.txt` e os blocos de anúncio passam a ser emitidos automaticamente. Ative no painel do AdSense a mensagem de consentimento (GDPR/CMP) para visitantes da Europa.
3. **Search Console**: defina `PUBLIC_GSC_VERIFICATION` com o código da meta tag e envie `https://reviewprodutos.com.br/sitemap-index.xml`.
4. **Autor real**: edite `src/data/autores.json` com nome, bio e foto reais (E-E-A-T). Troque `public/icons/avatar-equipe.png`.
5. **Instagram/redes** em `src/site.config.ts` (ou remova).

## Publicação automática (20 artigos/dia)

A rotina diária roda como **Routine do Claude Code**, usando a assinatura do Claude (sem chave de API paga), 4 vezes por dia: 06:52, 09:52, 18:52 e 21:52 de Brasília, 5 artigos por rodada. O roteiro completo está em `docs/rotinas/lote.md` e o resumo em `docs/ROTINA-DIARIA.md`.

Cada lote: escolhe os próximos temas da fila por prioridade e diversidade de categoria → pesquisa produtos reais na Amazon.com.br → escreve seguindo `docs/PADRAO-EDITORIAL.md` → resolve e valida imagens reais por ASIN → valida schema/regras → faz build de verificação → abre PR e mescla quando o CI fica verde.

**Uso pontual via API (opcional):** `.github/workflows/publicar-artigos.yml` + `scripts/generate-articles.mjs` geram um lote pela Claude API quando disparados à mão em *Actions → Publicar artigos → Run workflow*. Exige o secret `ANTHROPIC_API_KEY` e tem custo por uso.

### Ramp-up recomendado

O Google trata conteúdo em escala sem valor agregado como spam ("scaled content abuse"). O pipeline mitiga isso com pesquisa real, dados únicos por produto, estrutura rica e validação, mas recomendamos começar com 2 lotes/dia (10 artigos) nas primeiras semanas, acompanhar o Search Console e só então subir para 4 lotes. O horário dos lotes é ajustado na Routine (claude.ai/code → Routines).

## Conformidade com o Programa de Associados da Amazon (Brasil)

Regras do Contrato Operacional que o site e o gerador seguem (detalhes em `docs/PESQUISA-REFERENCIAS.md`):

- **Divulgação**: a frase oficial "Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas" aparece no topo e no fim de cada artigo e no rodapé.
- **Links**: sempre `https://www.amazon.com.br/dp/ASIN?tag=SUA-TAG`, com `rel="sponsored nofollow"`, sem encurtadores ou redirecionamentos.
- **Preços**: nunca em texto. Só faixa qualitativa ($ a $$$$) e o botão "Ver preço na Amazon". Quando a Creators API estiver liberada (10 vendas em 30 dias), preços poderão ser exibidos com data/hora.
- **Avaliações de clientes**: notas, estrelas e quantidade de avaliações da Amazon **não** são exibidas nem parafraseadas (o validador bloqueia). Percepção de consumidores vem de fontes como Reclame Aqui e veículos especializados.
- **Imagens**: as imagens de produto são exibidas por **link direto** (nunca baixadas, cacheadas ou alteradas). Até a Creators API estar disponível, isso é uma zona cinzenta do contrato: prefira `imagem.fonte: fabricante` (site oficial) sempre que possível e migre para a API assim que elegível.
- **Agentes automatizados**: qualquer acesso a domínios Amazon usa o user-agent `Agent/reviewprodutos` e não contorna bloqueios.

## Estado atual do repositório (outubro de 2026)

- O repositório nasceu vazio, então a branch `claude/reviewprodutos-site-build-vdk4ib` é hoje a **branch padrão** no GitHub. Recomendado: em *Settings → General → Default branch*, renomeá-la para `main` (o GitHub redireciona a antiga), ou criar `main` a partir dela. Os workflows de CI/publicação funcionam em qualquer branch.
- A criação automática do projeto na Vercel pela integração foi negada (403) nesta conta; importe o repositório manualmente pelo painel da Vercel (passos abaixo).

## Deploy

- **Vercel (recomendado):** importe o repositório, framework *Astro*, defina as variáveis `PUBLIC_*`. `vercel.json` já traz cache e headers de segurança. Aponte o domínio em *Settings → Domains* e crie no [registro.br](https://registro.br) os registros `A 76.76.21.21` (apex) e `CNAME cname.vercel-dns.com` (www), ou use os valores que a Vercel indicar.
- **Cloudflare Pages / Netlify:** comando `npm run build`, pasta `dist`, Node 22.
- Cada push em `main` (inclusive os commits do robô) gera um novo deploy, então os 4 lotes diários entram no ar automaticamente.

## Estrutura de URLs

- `/reviews/<slug>/`, `/comparativos/<slug>/`, `/melhores/<slug>/`
- `/categoria/<categoria>/` e `/categoria/<categoria>/<subcategoria>/` (com paginação em `/pagina/N/`)
- `/solucoes/` (artigos organizados pelo problema do leitor: topo de funil)
- `/busca/` (Pagefind com filtros por categoria, tipo e subcategoria)
- Institucionais: `/sobre/`, `/metodologia/`, `/contato/`, `/divulgacao-de-afiliados/`, `/politica-editorial/`, `/politica-de-privacidade/`, `/politica-de-cookies/`, `/termos-de-uso/`
- `/rss.xml`, `/sitemap-index.xml`, `/robots.txt`, `/ads.txt`

## Licença

Código: MIT. Conteúdo editorial: © Review Produtos. Imagens de produtos pertencem aos respectivos fabricantes/lojas.
