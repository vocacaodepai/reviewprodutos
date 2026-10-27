# Pendências do dono (Bruno)

Itens que só o dono pode fazer (painéis e contas externas). Ao fim de **toda** entrega ou publicação, o Claude repete esta lista no informe, com o link do site, até cada item ser resolvido. Quando um item for confirmado como feito (por exemplo, o `site-health --live` deixar de avisar), o Claude remove o item daqui no próximo PR.

| # | Pendência | Onde fazer | Como saber que terminou |
| --- | --- | --- | --- |
| 1 | Quando o AdSense aprovar o site, informar o código `ca-pub-...` para o Claude ativar os anúncios e o `ads.txt`. | https://www.google.com/adsense | O dono envia o código |
| 4 | Guardar a credencial da Shopee no ambiente da Routine: criar as variáveis `SHOPEE_APP_ID` e `SHOPEE_SECRET` (valores que você enviou no chat) em Network secrets/variáveis de ambiente. Depois, trocar a Secret no painel da Shopee, pois ela foi colada em chat, e atualizar a variável. | Menu do ambiente na barra de título da sessão > Edit, e https://affiliate.shopee.com.br/open_api | A Routine da Shopee roda sem avisar que faltam credenciais |
