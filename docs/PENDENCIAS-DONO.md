# Pendências do dono (Bruno)

Itens que só o dono pode fazer (painéis e contas externas). Ao fim de **toda** entrega ou publicação, o Claude repete esta lista no informe, com o link do site, até cada item ser resolvido. Quando um item for confirmado como feito (por exemplo, o `site-health --live` deixar de avisar), o Claude remove o item daqui no próximo PR.

| # | Pendência | Onde fazer | Como saber que terminou |
| --- | --- | --- | --- |
| 1 | Definir `reviewprodutos.com.br` (sem www) como domínio principal e deixar o `www` redirecionando para ele. | https://vercel.com/portal-da-ai/reviewprodutos/settings/domains | `node scripts/site-health.mjs --live` para de avisar sobre o www |
| 2 | Cadastrar o site no Google Search Console (propriedade de domínio `reviewprodutos.com.br`) e enviar o sitemap `https://reviewprodutos.com.br/sitemap-index.xml`. | https://search.google.com/search-console | O dono confirma |
| 3 | Quando o AdSense aprovar o site, informar o código `ca-pub-...` para o Claude ativar os anúncios e o `ads.txt`. | https://www.google.com/adsense | O dono envia o código |
