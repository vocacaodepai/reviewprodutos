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
| `.github/workflows/publicar-artigos.yml` | Rotina diária: 4 lotes de 5 artigos (07h, 10h, 19h e 22h de Brasília), com commit automático. |
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
```

## Configuração obrigatória antes de ir ao ar

1. **Tag de afiliado Amazon**: crie sua conta em [associados.amazon.com.br](https://associados.amazon.com.br) e defina `PUBLIC_AMAZON_TAG` (ex.: `seusite-20`) no `.env` local, nas *Variables* do GitHub Actions e na hospedagem. Sem isso os links usam o placeholder `reviewprodutos-20` e **não geram comissão**.
2. **AdSense**: após aprovação, defina `PUBLIC_ADSENSE_CLIENT=ca-pub-...`. O script, o `ads.txt` e os blocos de anúncio passam a ser emitidos automaticamente. Ative no painel do AdSense a mensagem de consentimento (GDPR/CMP) para visitantes da Europa.
3. **Search Console**: defina `PUBLIC_GSC_VERIFICATION` com o código da meta tag e envie `https://reviewprodutos.com.br/sitemap-index.xml`.
4. **Autor real**: edite `src/data/autores.json` com nome, bio e foto reais (E-E-A-T). Troque `public/icons/avatar-equipe.png`.
5. **Instagram/redes** em `src/site.config.ts` (ou remova).

## Publicação automática (20 artigos/dia)

A rotina usa a Claude API. Passos:

1. Gere uma chave em [console.anthropic.com](https://console.anthropic.com) e adicione como **Secret** `ANTHROPIC_API_KEY` em *Settings → Secrets and variables → Actions*.
2. (Opcional) *Variables*: `GENERATOR_MODEL` (padrão `claude-opus-5-5`; `claude-sonnet-5-5` é mais barato), `GENERATOR_BATCH_SIZE` (padrão 5), `PUBLIC_AMAZON_TAG`, `PUBLIC_ADSENSE_CLIENT`.
3. Em *Settings → Actions → General*, marque **Read and write permissions** para o `GITHUB_TOKEN`.
4. Teste manualmente em *Actions → Publicar artigos → Run workflow* (use `dry_run=true` na primeira vez).

Cada lote: escolhe os próximos temas da fila por prioridade e diversidade de categoria → pesquisa produtos reais na Amazon.com.br → escreve seguindo `docs/PADRAO-EDITORIAL.md` → resolve e valida imagens reais por ASIN → valida schema/regras → faz build de verificação → commita. Temas que falham voltam para `pending` uma vez e depois ficam `skipped` com o erro registrado em `content/queue/log.jsonl`.

Custo estimado por artigo com `claude-opus-5-5` e busca na web: algo entre US$ 0,30 e US$ 0,90 (varia com o número de buscas). Com `claude-sonnet-5-5`, cerca de metade.

**Alternativa sem API key:** as *Routines* do Claude Code (claude.ai/code) podem rodar a mesma tarefa em sessões agendadas usando sua assinatura. Veja `docs/ROTINA-DIARIA.md`.

### Ramp-up recomendado

O Google trata conteúdo em escala sem valor agregado como spam ("scaled content abuse"). O pipeline mitiga isso com pesquisa real, dados únicos por produto, estrutura rica e validação, mas recomendamos começar com 2 lotes/dia (10 artigos) nas primeiras semanas, acompanhar o Search Console e só então subir para 4 lotes. Basta comentar linhas de `cron` no workflow.

## Conformidade com o Programa de Associados da Amazon (Brasil)

Regras do Contrato Operacional que o site e o gerador seguem (detalhes em `docs/PESQUISA-REFERENCIAS.md`):

- **Divulgação**: a frase oficial "Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas" aparece no topo e no fim de cada artigo e no rodapé.
- **Links**: sempre `https://www.amazon.com.br/dp/ASIN?tag=SUA-TAG`, com `rel="sponsored nofollow"`, sem encurtadores ou redirecionamentos.
- **Preços**: nunca em texto. Só faixa qualitativa ($ a $$$$) e o botão "Ver preço na Amazon". Quando a Creators API estiver liberada (10 vendas em 30 dias), preços poderão ser exibidos com data/hora.
- **Avaliações de clientes**: notas, estrelas e quantidade de avaliações da Amazon **não** são exibidas nem parafraseadas (o validador bloqueia). Percepção de consumidores vem de fontes como Reclame Aqui e veículos especializados.
- **Imagens**: as imagens de produto são exibidas por **link direto** (nunca baixadas, cacheadas ou alteradas). Até a Creators API estar disponível, isso é uma zona cinzenta do contrato: prefira `imagem.fonte: fabricante` (site oficial) sempre que possível e migre para a API assim que elegível.
- **Agentes automatizados**: qualquer acesso a domínios Amazon usa o user-agent `Agent/reviewprodutos` e não contorna bloqueios.

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
