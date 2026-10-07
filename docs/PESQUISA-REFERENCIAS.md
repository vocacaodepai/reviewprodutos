# Pesquisa de referências — Review Produtos (outubro de 2026)

> Documento de consolidação. Reúne seis relatórios de pesquisa concluídos em 07/10/2026 para orientar as decisões de produto, conteúdo, SEO e monetização do **reviewprodutos.com.br** — site brasileiro de reviews de produtos (Amazon.com.br + AdSense), com três formatos (review individual, comparativo de 2 produtos e lista "os N melhores" com 3+), SEO de duplo funil (nome do produto + dor/problema do leitor) e publicação automática diária.

**Relatórios consolidados**

| # | Relatório | Dimensão coberta |
|---|---|---|
| 1 | `intl-sites.json` | 15 sites internacionais de review (Wirecutter, RTINGS, Consumer Reports, Which?, Tom's Guide, TechRadar, CNET, Reviewed, The Verge, Good Housekeeping, OutdoorGearLab/TechGearLab, BestReviews, Engadget, PCMag, Trusted Reviews) + contexto de mercado 2025-2026 |
| 2 | `br-sites.json` | Sites nacionais de review/comparação e guias de compra com afiliados Amazon, SERPs do Google Brasil, disclosure e CONAR |
| 3 | `google-reviews-seo.json` | Regras e sinais do Google para reviews e afiliados: Reviews System, E-E-A-T, spam, IA, dados estruturados, CWV, Discover, AI Overviews |
| 4 | `adsense.json` | Requisitos do Google AdSense para aprovação e permanência, privacidade (EEE/LGPD), implementação técnica |
| 5 | `amazon-associates-br.json` | Programa Amazon Associados Brasil: contrato, políticas, comissões, Creators API, alternativas de afiliados |
| 6 | `keyword-funnel.json` | Estratégia de SEO por estágio de funil em PT-BR: hub/spoke, títulos, slugs, sazonalidade, 15 clusters de categoria |

**Como ler este documento**

- Números, datas e URLs foram preservados exatamente como aparecem nos relatórios.
- Quando o relatório marcou um achado com confiança **média** ou **baixa**, isso está sinalizado no texto como `[confiança média]` ou `[confiança baixa]`. Tudo o que não tem marcação foi classificado como confiança alta pelo relatório de origem.
- Nada aqui foi acrescentado por pesquisa nova. Lacunas estão listadas na seção 9 (Perguntas em aberto).

---

## 1. Resumo executivo

1. **Experiência real é o diferencial que o Google de 2026 recompensa.** O core update de março/2026 derrubou ~71% dos domínios afiliados monitorados (perdas de 20-35% de tráfego), atingindo "AI-generated reviews with no original opinion, no hands-on experience, thin review aggregation, dynamically generated comparison tables"; a correlação entre uso de IA e queda foi ≈ 0,011 — o problema é ausência de valor próprio, não a IA. Regra prática: **um dado próprio por artigo** (medição, foto, cálculo de consumo, tabela consolidada de Reclame Aqui, histórico de preço). `[confiança média — dados de terceiros]`
2. **Três templates fixos, repetidos em 100% das páginas**, com headings padronizados em PT-BR: lista "Os N melhores" (resposta rápida → tabela → cards com selo → "Como escolhemos" → "Também avaliamos" → FAQ → "Quem fez este guia" → histórico de atualizações), review individual (veredito em 2 frases → prós/contras → ficha → "Para quem é / não é" → alternativas) e comparativo (veredito "compre X se… / Y se…" → tabela lado a lado → H2 por critério com vencedor). É o esqueleto comum a Wirecutter, Future plc, GearLab, RevisaLar e Casa dos Eletrodomésticos.
3. **A concorrência nacional é forte nas buscas genéricas e fraca em confiança.** Buscapé/Zoom ranqueiam em 1º para quase toda busca "melhor X 2026", mas sem preço no corpo, sem contras (Zoom) e sem disclosure. Afiliados de nicho ocupam as posições 3-10 com datas incoerentes, placeholders quebrados (`%currentyear%`, "em é"), imagens erradas e disclosure só no rodapé. Onde atacar: reviews individuais de casa/cozinha/bebê/pets, comparativos "A vs B" com veredito e guias de dor. Onde não começar: smartphones e TVs.
4. **O Google permite IA, mas exige revisão humana e proíbe escala sem valor.** Orientação oficial de 01/10/2026: é "crítico" checar manualmente todo conteúdo gerado por IA, inclusive title, meta description, dados estruturados e alt. "Scaled content abuse" pune muitas páginas sem valor "não importa como foram criadas"; as Quality Rater Guidelines (11/09/2025) dão nota Lowest a conteúdo parafraseado com pouco esforço. Byline genérica ou autor inventado com foto de IA é "engano".
5. **Dados estruturados mudaram:** o rich result de FAQ acabou em 07/05/2026 (documentação removida em 15/06/2026); ItemList/carrossel não suporta Product; o que rende é Product + Review (com positiveNotes/negativeNotes, exclusivo de review editorial, disponível em português), Article com autor real, BreadcrumbList (só desktop desde jan/2025) e Organization. Proibido copiar estrelas da Amazon como aggregateRating. Desde jul/2026, reviews falsos ou incentivados sem disclosure podem gerar ação manual.
6. **Amazon Associados Brasil impõe regras duras ao gerador:** frase de divulgação exata ("Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas"), preços/disponibilidade só via API com carimbo de data/hora e aviso de alteração, imagens só via API sem cache (link válido 24h), avaliações/estrelas só via API, nenhum encurtador ou redirect que esconda o destino, nenhum scraping, conteúdo original com "comentários, análises ou transformações" (regra de 14/04/2026). A PA-API 5 foi descontinuada e a Creators API exige 10 vendas qualificadas em 30 dias — o site precisa nascer em **"modo sem API"** (CTA sem preço, fotos próprias/licenciadas, sem estrelas).
7. **A conta de Associado é frágil no início:** 3 vendas qualificadas em 180 dias ou a inscrição é cancelada (rejeição não reversível); 1 ano sem venda encerra por ociosidade; compras próprias não contam. Priorizar pautas de fundo de funil nos primeiros 180 dias e divulgar desde o dia 1.
8. **Tabela oficial de comissões BR orienta a escolha de categorias:** 13% (bebê, beleza, saúde, alimentos, audiolivros), 11% (roupas, pet), 10% (livros), 9,5% (dispositivos Amazon), 8% (casa, cozinha, eletrônicos, informática, celulares, games, esportes, ferramentas…), 7% (calçados, relógios, automotivo, outros). Blogs que citam 1-5% para eletrônicos estão errados. Cruzar comissão × ticket × volume (Beleza liderou o Prime Day 2026).
9. **AdSense não publica mínimos, mas reprova afiliado "sem valor".** Motivo oficial: "Your site shouldn't participate in affiliate programs without adding sufficient value to users"; "conteúdo de baixo valor" é a reprovação mais comum no Brasil. Meta prática (não regra): ~40-60 artigos indexados, ~40% informacionais, páginas Sobre/Contato/Privacidade/Divulgação linkadas, nenhuma tag/categoria vazia indexada, ads.txt, CMP certificada para visitantes do EEE, banner de cookies no padrão ANPD (dois níveis, "Rejeitar" com o mesmo destaque de "Aceitar").
10. **SEO por funil segue o modelo hub/spoke de Zoom/Buscapé:** hub de categoria com filtros → pilar "Melhor X 2026" → 5-20 satélites (marca, faixa de preço, uso, "X ou Y", reviews, dor) com linkagem bidirecional; **ano no title/H1, nunca no slug** (Buscapé /melhor-air-fryer publicado em 2021 e atualizado em 07/2026 ainda ranqueia); resposta direta em 2-3 frases no topo (lacuna recorrente dos líderes); perguntas do PAA como H2/H3; meta de 12-15 URLs por cluster em 60 dias.
11. **Duplo funil funciona dentro do mesmo artigo:** o guia de dor resolve o problema por completo e só então insere CTAs escalonados; a lista embute H2 de fundo ("Mondial é boa?", "Qual é melhor: A ou B?"); o review linka lista e comparativo. Dores que terminam em remédio (dor de ouvido) são YMYL puro e devem ficar fora; dores com produto não-medicamentoso (costas/dirigir, pescoço/travesseiro, home office/cadeira) entram com disclaimer médico — nenhum concorrente nacional faz isso bem.
12. **AI Overviews comprimem cliques informacionais:** no Brasil, estudo Authoritas (Cade, 13/11/2025) achou AIO em 35,3% das buscas de notícias e CTR da 1ª posição caindo de 21,4% para 8,93%; queries "melhor X para Y", "X vs Y" e "top 10" são as mais comprimidas nos EUA. Buscas de decisão ("é bom", "vs", "vale a pena") preservam cliques. Canais próprios (newsletter de ofertas, WhatsApp/Telegram, comentários, enquete "o que testar") reduzem a dependência. `[confiança média]`
13. **Sazonalidade brasileira exige calendário editorial:** publicar 6-8 semanas antes do pico e atualizar 1 semana antes, em URL fixa sem ano — volta às aulas (04/02), Dia do Consumidor (15/03), Dia das Mães (10/05; buscas sobem desde o início de abril), Dia dos Namorados (12/06), Prime Day (1-7/07), Dia dos Pais (09/08; interesse cresce ~800% a partir de 9 de maio), Dia das Crianças (12/10), Black Friday (27/11) com "esquenta" desde o fim de outubro, Cyber Monday (30/11), Natal.
14. **Volume: 20 artigos/dia é defensável só com governança.** Domínios com >500 páginas/mês de padrão semelhante caíram >71% em março/2026; não há limiar oficial. Recomendação convergente dos relatórios: começar com 8-10/dia, cada artigo com cluster atribuído, checagem de canibalização, ≥1 dado próprio, resposta direta, ≥6 links internos, prós/contras, 5-7 perguntas de PAA e revisão humana assinada; escalar conforme o Search Console mostrar saúde.
15. **Disclosure em três camadas é diferencial legal e de confiança:** frase oficial da Amazon acima do primeiro link, micro-rótulo "Link de afiliado"/"Publicidade" junto a cada botão, página /transparencia-editorial ou /politica-de-afiliados. O novo Guia do CONAR (vigente desde 01/06/2026) trata comissão por afiliado como publicidade com identificação imediata; Canaltech, Zoom, Buscapé, Promobit, GDM, Showmetech e Tudocelular não exibem aviso textual. `[confiança média — guia lido via imprensa e escritórios]`

---

## 2. Referências internacionais

Fonte: `intl-sites.json`. Pesquisa feita em 07/10/2026 nas páginas reais (home/categoria, uma lista "best X" e um review individual de cada site). Wirecutter foi lido via proxy de tradução porque nytimes.com bloqueia bots; RTINGS renderiza via JS, então o relatório leu o JSON embutido.

### 2.1 Tabela de referências

| Site | O que faz bem | Estrutura de página | O que copiar |
|---|---|---|---|
| **Wirecutter (New York Times)** — https://www.nytimes.com/wirecutter/reviews/best-office-chair/ | Veredito único e claro ("Since 2015… the Steelcase Gesture is the best office chair for most people"), narrativa de confiança completa, depoimentos de longo prazo, independência explícita ("never made aware of any business implications"), múltiplos varejistas com preço. | H1 → "Updated July 31, 2026" → byline duplo → intro com prova ("interviewed four ergonomics experts… more than 175 collective hours") → "Everything we recommend" (cards Top pick / Runner-up / Best for… / Budget pick, 2-3 botões "$1,208 from Amazon") → "Testing notes" → "The research": Why you should trust us, Who this is for, How we picked and tested, seção por pick com "Flaws but not dealbreakers" e "How the X has held up", Other X worth considering, What to look forward to, The competition, Meet your guides, Further reading, Sources, Comments. Home: "Wirecutter Finder" por necessidade ("How do I stop my house from smelling?"), "Daily deals" (426 deals), newsletter. | Rótulos por caso de uso com legenda; bloco "Tudo o que recomendamos" no topo; seções de confiança padronizadas; "A concorrência" para produtos que perderam; disclosure em 1 frase no topo ("We independently review everything we recommend. When you buy through our links, we may earn a commission."); Finder por dor na home; página About com fontes de receita e política de devolução/doação. |
| **RTINGS** — https://www.rtings.com/tv/reviews/best/tvs | Dados proprietários mensuráveis, metodologia versionada e transparente (fórmula visível), escala enorme de testes ("554 TVs bought and tested"), ferramentas de comparação, critério de recomendação explícito ("We factor in the price… feedback from our visitors, and availability"). | Lista por faixa de preço (Best TV / Upper Mid-Range / Mid-Range / Budget) com subtítulo de trade-off ("Similar image quality and features. Worse for bright rooms."), Notable Mentions, Recent Updates (changelog), All Reviews, Comments. Review por "usages" (Mixed Usage, Home Theater, Bright Room…) com nota 0-10 ponderada, test bench versionado (2.3), comparações com concorrentes. Nav por tamanho/marca/uso/tipo + Compare, Table Tool, Review Index, Review Pipeline, Vote. | Nota composta por sub-métricas com pesos; changelog "Recent Updates"; "Notable Mentions"; enquete "Vote" para o leitor escolher o que testar; comparador. **Não copiar:** paywall (resultados completos fechados em março/2026) sem marca consolidada. `[confiança média no detalhe do paywall]` |
| **Consumer Reports** — https://www.consumerreports.org/appliances/air-purifiers/best-air-purifiers-of-the-year-a1197763201/ | Testes de laboratório padronizados, dados de confiabilidade de 40 mil+ unidades, agrupamento por necessidade (tamanho do cômodo), custo total de propriedade. | "8 Best Air Purifiers of 2026, Tested by Our Experts" agrupado por tamanho de cômodo (2 picks por grupo), byline dupla + crédito aos testadores, "Updated October 7, 2026", cards em prosa com custo anual e confiabilidade de membros, "How We Pick", "How CR Tests" (câmara selada, partículas 0,1-1 micron, 15 min, dB por velocidade), CTA "Become a Member". Hub com abas Overview / Ratings & Reviews / Recommended / Buying Guide, "Room Air Purifiers (169)", "Best Time to Buy: March, September". Página de modelo com score trancado, specs visíveis, "Shop 1 Retailer", aviso de uso de IA generativa. | Agrupar picks por necessidade; custo anual/total de propriedade; "Best Time to Buy"; disclosure ("100% of the fees we collect are used to support our nonprofit mission"); aviso transparente de uso de IA no texto. |
| **Which? (UK)** — https://www.which.co.uk/reviews/washing-machines/article/which-washing-machine-should-you-buy-aafjl7E6UgGx | Filtros e comparador de categoria, custo de operação por produto, badges inequívocos (Best Buy / Don't Buy), promessa "We buy every single washing machine we test and refuse to accept any free samples". | Guia com TOC, "Just Buy This" (membros), tabela "Top rated" com badges best buy/eco buy e colunas Overall cleaning / Energy efficiency / Ease of use / Test score / £ to run per year (nomes e notas ocultos para não-membros, "Get Digital access £9.99 per month"). Hub com filtros ricos (tipo, marca, capacidade, preço, custo anual, varejista, "score at least 4 out of 5…"), "216 Results", ordenação "Most-recently reviewed". Página de modelo: preço em 5 varejistas, specs, custo anual, "Jan 2026 First reviewed / Feb 2026 Last checked / Aug 2025 Released". | Filtros por "score mínimo em X"; datas "First reviewed / Last checked / Released"; preço em vários varejistas; custo anual de operação; badges claros. |
| **Tom's Guide (Future plc)** — https://www.tomsguide.com/best-picks/best-tvs | Escaneabilidade extrema (quick list + jump to), preço por variante, "Also tested" transparente, voz pessoal com evidência de laboratório, comentários e clube de membros. | Título com número e ângulo ("The 5 best TVs we've tested for movies, sports and gaming"), byline + "Last updated 28 July 2026", disclosure 1 frase, "Jump To" (Best overall / Best under $500 / … / Also tested / How we test / How to choose / FAQs), quick list numerada com 5 estrelas + frase-gancho + 2-3 botões "View at Best Buy / View Prime Day at Amazon / View at Walmart", "Why you can trust Tom's Guide", por produto: imagem, "Our expert review", Specifications, "Today's Best Deals" por tamanho, Reasons to buy/avoid. Review: "Tom's Guide Verdict", selo Editor's Choice, "Should you buy it?", "Also consider", "How I tested", comentários ("2 Comments Join the conversation"). | Quick list numerada no topo; "Jump To"; "Also tested" com motivo + link; "Reasons to buy / Reasons to avoid"; preço por variante; "Swipe to scroll horizontally" nas tabelas. |
| **TechRadar (Future plc)** — https://www.techradar.com/best/best-laptops | Prova institucional em números, curadoria nomeada, consistência de template, "two-minute review" para quem tem pressa, metodologia de bateria explicada. | Mesmo template do Tom's Guide: byline + "Contributions by", "Last updated 21 September 2026", quick list, "Why you can trust TechRadar" com checklist numérica ("More than 1,800 laptops… reviewed", "18 years of product testing", "200,000+ hours", 16.000 produtos), "Latest news", "Recent updates" datado ("This page was updated on 09/21/2026 to add a news section"), "Best laptop list curated by" (bio), galeria de fotos próprias (crédito "Lance Ulanoff / Future"), "How to choose", "How we test". Review: "TechRadar Verdict", "Two-minute review", "Should you buy it?", "Also consider", "How I tested". | Bloco "Por que confiar" com números reais; "curated by" nomeado; "Two-minute review"; changelog datado; fotos com crédito de autor. |
| **CNET** — https://www.cnet.com/tech/computing/best-laptop/ | Nota numérica + tabela de specs + seção de adições recentes; metodologia concreta; forte branding de laboratório. | H1 + dek em 1ª pessoa, "OUR EXPERT" com bio, "Article updated on October 2, 2026", "INSIDE CNET LABS: 25+ Years of Experience / 23 Product Reviewers / 15k Sq.Ft of Lab Space", links "Reviews ethics statement" e "How we test", TOC com uma entrada por pick, cards com "$1,320 at HP", nota 0-10 (ex.: 8.3), "Bottom Line", "Pros & Cons", "Full X Review", tabela "Best laptops compared", "Most recent additions", "Other laptops we've tested", "How we test laptops" (Geekbench 6, Cinebench 2024, PCMark 10, 3DMark + bateria própria), "Best laptop brands", "Factors to consider". | "Most recent additions"; "Other X we've tested" (1 frase por modelo); benchmarks nomeados na metodologia; ethics statement linkado no topo. |
| **Reviewed (ex-USA Today, hoje StackCommerce)** — https://www.reviewed.com/vacuums/best-right-now/best-cordless-stick-vacuums | "The Rundown" resume o guia em 3 bullets; specs-chave padronizadas; múltiplos varejistas com preço. | Disclosure no topo ("Products are chosen independently by our editors. Purchases made through our links may earn us a commission."), "Why trust Reviewed?" sob o H1, cards por caso de uso ("Best Cordless Vacuum Overall / for Pet Owners / Upgrade / Smartest / Best Value") com "Check Price at Best Buy/Home Depot/Amazon", TOC, "The Rundown", por produto specs-chave (Battery life, Weight, Dimensions), 2 botões com preço ("$599.99 from Best Buy", "$897.88 from Amazon"), foto própria com crédito ("Reviewed / Jonathan Chan"), "Other X We Reviewed", "What To Consider", FAQs. **Alerta:** título "2026" mas "Updated October 15, 2025". | "The Rundown"; "Why trust" logo abaixo do H1; specs-chave padronizadas por produto; foto própria com crédito. **Evitar:** título com ano e update antigo. |
| **The Verge** — https://www.theverge.com/tech/983554/hp-omnibook-3-16-snapdragon-laptop-review | Voz autoral forte, "report card" por componente, política de nota pública, comunidade de assinantes. | Hub /reviews por sub-tópico com "Follow"; review: título opinativo, disclosure repetida 2x ("If you buy something from a link, The Verge may earn a commission. See our ethics statement."), byline com cargo ("Reviewer, Laptops") e mini-bio, "Verge Score" 6/10 (ratingValue 6 em schema) com "The Good" / "The Bad", 2 botões com preço ("$516 at Amazon", "$517 at Walmart"), "How we rate and review products", "Component report card" com letras (Screen: D, Webcam: C…), comentários/AMA. Página "How we rate": notas inteiras 0-10, não é média ponderada, "A score is best viewed as a snapshot in time", bateria medida a 200 nits. | ratingValue do schema coerente com a nota exibida; "report card" por componente; política de nota pública; nota como "snapshot in time". **Não copiar** para um site novo: ausência de prós/contras/specs padronizados. |
| **Good Housekeeping Institute** — https://www.goodhousekeeping.com/what-to-buy/g71595487/the-best-vacuums/ | Campos padronizados escaneáveis, prova de laboratório com padrão de indústria (ASTM F11), deals integrados aos picks, autoridade histórica. | "10 Best Vacuums of 2026, Tested by Cleaning Experts", "By Noah Pinsonnault Updated: Sep 14, 2026" + "Tested by Carolyn Forté Home Care & Cleaning Lab Executive Director", disclosure com "120 years", "Our top picks" com links Amazon (tag goodhousekeeping_auto-append-20), "Best Deal" ("$1,000 $293 NOW 71% OFF"), cards com preço riscado + lojas (Amazon/Walmart/Wayfair), Pros/Cons, campos em caixa-alta "FLOOR TYPE", "WHO IT'S BEST FOR", "CLEANING MODES", "WHY WE LOVE IT", "IN OUR LAB TESTS", "How we test", FAQs, "Why trust Good Housekeeping?" com bios. | Campos padronizados em caixa-alta ("PARA QUEM É", "POR QUE GOSTAMOS", "NOS NOSSOS TESTES"); "Tested by" separado de "By"; "Best Deal" com % OFF só em picks já recomendados. |
| **OutdoorGearLab / TechGearLab** — https://www.outdoorgearlab.com/topics/camping-and-hiking/best-backpacking-tent e https://www.techgearlab.com/topics/audio/best-wireless-earbuds | Melhor modelo de nota composta + tabela completa; medições próprias; prêmios explicados; review individual como mini-comparativo. | H1 "The Best X of 2026" + subtítulo com prova ("We purchased and tested 12…") + byline com cargo ("Review Editor") + "Updated June 16, 2026" + "Editor's Note" de changelog + "Quick Picks" + prêmios com legenda fixa ("Editors' Choice: Awarded to the very best overall products"; "Best Buy: Offers the most bang-for-the-buck"; "Top Pick: The best for a specific application") + "Product Comparison Table" com TODOS os produtos (rank, preço+botão, Overall Score 0-100, estrelas, Bottom Line, prós, contras, sub-métricas com pesos — ex.: Livability 35%, Weather Resistance 25%, Weight 15%, Packed Size 15%, Durability 10%) + seção por produto + "How We Tested" + "Why Trust GearLab" + "Analysis and Test Results" por métrica + "How to Choose" + "Other Notable X We Tested" + "Conclusion" assinada. Review: "Price: $650 List", "OVERALL SCORE 81", "RANKED #1 of 11", "Our Verdict", "REASONS TO BUY / REASONS TO AVOID", "Compare to Similar Products". | Selos com legenda fixa; sub-métricas ponderadas por categoria; tabela comparativa com todos os testados; review individual com posição no ranking e bloco "Compare com similares"; "We buy all the products we test — no freebies from companies". **Evitar:** botão só para Amazon (TechGearLab). |
| **BestReviews (Nexstar)** — https://bestreviews.com/bed-and-bath/mattresses/best-mattresses | Formato ultra-consistente e escalável, FAQ em Q./A., exibição de horas/modelos considerados. | Sempre 5 picks ("Best of the Best", "Best Bang for the Buck" + 3 "Top Pick"), cards com Pros/Cons e "Check Price"/"Shop Now", stats ("First Reviewed January 28, 2022", "40 models considered", "28 hours researched"), "Why trust BestReviews?" + "How We Tested" (admite testar "most of our top five"), buying guide (Key considerations, Types, Features, Tips, Prices, FAQ "Q./A."), "Our expertise". Sem tabela comparativa. **Problemas:** mesmo colchão chamado de 12" e 14"; card "Sweetnight" com alt "Nectar"; datas divergindo do título "2026". | Stats de processo ("N modelos considerados, Y horas"); FAQ em Q./A. **Contraexemplo** do que o pipeline automático precisa validar (coerência de dados entre blocos). |
| **Engadget** — https://www.engadget.com/computing/laptops/best-laptops-120008636.html | Contexto editorial (por que preços de RAM subiram), voz consistente de um só autor, FAQs H3. | "Best laptops for 2026" por Devindra Hardawar, "Updated: Aug. 31, 2026", intro com contexto de mercado, H2 por pick ("Best laptop overall: Apple MacBook Air M5") com linha de specs em negrito, foto com crédito de fotógrafo, "Read our X review", prosa sem prós/contras e sem nota; "Other laptops we tested", "How we test laptops", "Specs to look for", "Factors to consider", "Laptop FAQs", nota "Update, August 31, 2026". Botões de compra por widget client-side (não aparecem no HTML estático). | Intro com contexto de mercado; linha de specs em negrito no H2. **Evitar:** disclosure invisível no HTML estático; botões só via JS. |
| **PCMag** — https://www.pcmag.com/picks/the-best-laptops | Escala de nota inline, changelog editorial detalhado, buying guide otimizado para perguntas, bios ricas, ferramenta de IA própria. | Disclosure no topo ("PCMag editors select and review products independently. If you buy through affiliate links, we may earn commissions, which help support our testing."), 2 autores com bio e "Areas of Expertise", "OUR EXPERTS / 65 EXPERTS / 44 YEARS / 43K+ REVIEWS", "Edited By", "Updated October 1, 2026", TOC, "Our Top Tested Picks" (rótulo, H3 produto, "$859.99 at Amazon See It", Bottom Line, Editors' Choice, nota 0.5-5 com escala explicada inline — "5.0 - Exemplary… 4.0 - Excellent… 2.0 - Subpar: We do not recommend…"), "EDITORS' NOTE" ("Since our last update, we reviewed and evaluated eight new laptops… more than a dozen laptops in PC Labs"), "Compare Specs", buying guide em H2-perguntas ("How Much Will the Right Laptop Cost?"), "About Our Experts", "Honest, Objective, Lab-Tested Reviews", "Maggie: AI Product Finder". | Escala de nota explicada ao lado da nota; "EDITORS' NOTE" como changelog; buying guide em H2-perguntas (People Also Ask); "Edited By" + áreas de expertise. |
| **Trusted Reviews** — https://www.trustedreviews.com/best/best-laptops-3431966 e https://www.trustedreviews.com/reviews/asus-zenbook-duo-2026 | "Should you buy it?" em dois cenários, Test Data numérica, specs completas, metodologia logo no topo. | Lista: byline + data + tempo de leitura, "Best Laptop at a glance" (rótulo: produto), "How we test" antes dos produtos, por pick "Trusted Score" (estrelas), Pros/Cons, "Reviewer: … Full review: …". Review: Verdict, Pros/Cons, Key Features, seções por aspecto, "Should you buy it?" (2 cenários), Final Thoughts, Trusted Score, How We Test, FAQs, Test Data (benchmarks), Full Specs, "Why Trust our journalism?". | "Vale a pena comprar?" com 2 cenários; "Test Data" numérica; "at a glance" por caso de uso; metodologia antes dos produtos. |
| **Contexto de mercado 2025-2026** — https://pressgazette.co.uk/press-gazette-events/google-ai-overviews-leading-to-affiliate-revenue-drop-of-20-40-at-some-publishers/ | Mostra a direção: experiência real + canais próprios + transparência. | Fontes secundárias: AI Overviews cortaram até 50% do tráfego de guias de compra e 20-40% da receita em alguns publishers (out/2025); core update de mar/2026 teria afetado ~71% dos sites afiliados monitorados; Google (24/07/2026) passou a prever ação manual para reviews falsos/incentivados sem disclosure; Gannett vendeu Reviewed à StackCommerce após citar "Google's constant algorithm changes"; RTINGS fechou resultados completos para membros em março/2026. | Não depender só do Google; investir em newsletter, comunidade e busca interna desde o início. `[confiança média — dados de terceiros com interesse comercial]` |

### 2.2 As três escolas

O relatório identificou três "escolas" claras de página de review:

1. **Escola Wirecutter / Reviewed / Engadget — narrativa e poucos picks.** Poucas escolhas rotuladas por caso de uso ("Top pick", "Runner-up", "Budget pick", "Best for…"), texto narrativo longo, seções fixas de confiança ("Why you should trust us", "Who this is for", "How we picked and tested", "Flaws but not dealbreakers", "The competition", "What to look forward to", "Sources"), múltiplos botões de compra por produto com preço e loja ("$1,208 from Amazon").
2. **Escola de laboratório/dados — RTINGS / OutdoorGearLab / TechGearLab / Which? / Consumer Reports.** Nota numérica composta por sub-métricas com pesos explícitos (ex.: Livability 35%, Weather Resistance 25%…), tabela comparativa ordenável com TODOS os produtos testados, "test bench" versionado, "compramos tudo que testamos" como promessa central, e crescente paywall (RTINGS fechou resultados completos em março/2026; Which? e CR escondem notas/prós/contras atrás de assinatura).
3. **Escola Future plc (Tom's Guide / TechRadar) + CNET / PCMag / Trusted Reviews — escaneabilidade comercial.** "Quick list" numerada no topo com estrelas e 2-4 botões "View at Amazon / Best Buy / Walmart", caixa de specs, "Reasons to buy / Reasons to avoid", "Why you can trust [marca]" com números (ex.: "1.800+ laptops testados, 18 anos"), seções "How we test", "How to choose", FAQ, "Also tested / Also consider", comentários e newsletter.

Para o Review Produtos, a síntese recomendada pelo relatório combina as três: selos e seções de confiança da escola 1, nota composta transparente e tabela completa da escola 2, e quick list + "Reasons to buy/avoid" + FAQ da escola 3 — sem paywall.

### 2.3 Padrões universais (aparecem em praticamente todos)

- Disclosure de afiliado curta e no topo (acima ou logo abaixo do byline), com link "saiba mais".
- Data de atualização visível + nota de changelog ("Editors' Note: Oct 1, 2026 …").
- Autor com cargo, bio e áreas de expertise; "Edited by" e "Tested by" quando aplicável.
- Prós/contras em lista e "bottom line" de 1-2 frases por produto.
- Bloco "por que confiar" com evidência (horas, unidades testadas, anos).
- Seção para produtos que não entraram ("Other X we tested" / "The competition").
- FAQ, tabela de comparação de specs e links de compra para 2-3 varejistas com preço dinâmico.

### 2.4 Por que ranqueiam (síntese do relatório)

(a) prova de experiência em cada página — fotos próprias com crédito do autor/fotógrafo, medições próprias ("Measured Packaged Weight 3.81 lbs"), citações de painelistas, depoimentos de uso de longo prazo; (b) template rígido e previsível repetido em centenas de guias, com headings que coincidem com intenções de busca (How we test, How to choose, FAQ, "Best X under $500"); (c) arquitetura hub → guia principal → sub-guias (por preço, tipo, marca, uso) → review individual, todos interlinkados ("Related: Best Ultralight Tents", "Read our full LG C5 review"); (d) atualização frequente com data e changelog visível; (e) autoridade institucional exibida em números; (f) nav por facetas e ferramentas (comparador, tabela, finder); (g) links de compra para 2-3 lojas com preço atualizado — o que também atende à recomendação do Google de "links to multiple sellers".

### 2.5 Como lidam com produtos não testados ou não recomendados

- Wirecutter: "The competition" (por que cada concorrente perdeu) e "What to look forward to" (o que vai testar).
- Tom's Guide: "Also tested" com motivo e link.
- CNET: "Other laptops we've tested" + "Most recent additions".
- Engadget: "Other laptops we tested".
- OGL/TGL: "Other Notable X We Tested" + tabela com todos os testados.
- RTINGS: "Notable Mentions", "All Reviews", "Review Pipeline" e "Vote".
- Nenhum dos sites de alta autoridade publica "review" de produto que não tocou sem sinalizar isso; BestReviews é o único que admite não testar todos.

### 2.6 Design e layout `[confiança média]`

Coluna única de leitura (~680-760px) com sidebar/anúncios à direita nos sites com AdSense-like (Future, CNET, PCMag, GH, BestReviews); cards de produto com imagem à esquerda/topo, rótulo colorido ("Best overall"), título do produto como H2/H3, linha de preço+loja, prós/contras em duas colunas; serif para texto corrido em Wirecutter/Verge, sans-serif em Future/CNET; "Jump To"/TOC sticky ou no topo; botões de compra em cor única de alto contraste (vermelho em Wirecutter historicamente, verde em Future, azul em GearLab); tabelas com scroll horizontal; GH e Tom's Guide exibem preço riscado + "% OFF".

### 2.7 Padrões para copiar (lista consolidada do relatório)

1. Rótulos de veredito por caso de uso: "Nossa escolha", "Melhor custo-benefício", "Opção premium", "Melhor para [situação]", "Vice-campeão" — com legenda fixa explicando cada selo.
2. Bloco "Tudo o que recomendamos" no topo da lista: card por pick com selo, 1 frase de bottom line, preço atual e 1-3 botões com nome da loja e preço ("R$ 1.208 na Amazon").
3. Seções de confiança padronizadas em TODOS os guias: "Por que confiar na gente", "Para quem é este guia", "Como escolhemos e testamos", "Defeitos que não são decisivos", "Como ele se saiu com o tempo", "Outros produtos que consideramos", "O que vem por aí", "A concorrência", "Fontes".
4. Nota composta transparente com sub-métricas e pesos explícitos + tabela comparativa ordenável com TODOS os produtos testados.
5. Escala de nota explicada inline (PCMag) e nota como "snapshot in time" (Verge).
6. Review individual que já é um mini-comparativo: nota, posição ("RANKED #1 of 11"), sub-notas, veredito, "Reasons to buy / avoid", specs medidas, "Compare to Similar Products" com 4-5 concorrentes.
7. Data de atualização visível + changelog humano.
8. Autor com cargo, bio, áreas de expertise, "Edited by", "Tested by", "Meet your guides"; fotos com crédito "Nome/Site".
9. Números institucionais de autoridade na página — mesmo pequenos podem exibir "X produtos comprados e testados em 2026, Y horas de uso".
10. Disclosure de afiliado em uma frase, no topo, com link.
11. Campos padronizados por produto em caixa-alta estilo Good Housekeeping.
12. Seção "Também testamos / Não entraram" com 1-2 frases por produto explicando POR QUE perdeu + link.
13. Buying guide em formato de perguntas H2 — alinhado a People Also Ask e AI Overviews.
14. Arquitetura por categoria: hub (filtros) → guia "melhores" principal → sub-guias segmentados → reviews individuais; links "Related:" e "Read our full X review".
15. "Finder" por necessidade/dor na home (Wirecutter Finder) — exatamente o funil topo/meio que o projeto quer atacar.
16. Preço dinâmico por variante nos botões e bloco de deals só em picks já recomendados.
17. Newsletter e comunidade como canal próprio (comentários, "Vote", "Review Pipeline", newsletter de deals).

### 2.8 Armadilhas observadas nos sites internacionais

- Título com ano ("Best X of 2026") mas "Updated" antigo ou dados contraditórios no corpo (BestReviews; Reviewed com "Updated October 15, 2025").
- Prometer teste que não houve (BestReviews diz testar "most of our top five" e ao mesmo tempo "we buy all products with our own funds").
- Review individual sem nada além do texto (Verge/Engadget funcionam por marca e fotos originais; um site novo não).
- Esconder tudo atrás de paywall sem marca consolidada — mas copiar o princípio de manter o "por quê" e os dados exclusivos como diferencial.
- Tabelas comparativas geradas dinamicamente com dados de API sem análise própria — citadas em análises do update de março/2026 como padrão penalizado.
- Botão de compra para uma única loja quando há alternativas (TechGearLab só Amazon).
- Disclosure escondida no rodapé ou genérica.
- Listas infladas: Wirecutter recomenda 3-5 produtos; RTINGS 7; Tom's Guide 5; CR 8 agrupados; TechRadar 9. Ninguém faz "os 25 melhores".
- Nota sem escala e sem explicação.
- Dependência total do Google (Reviewed vendido; RTINGS fechou dados; AIO cortaram 20-50%).
- Texto corporativo em 3ª pessoa sem experiência: os guias que ranqueiam usam 1ª pessoa com detalhes concretos ("one panelist (6-foot-6 and over 300 pounds) said the back edge of the seat was uncomfortable").

---
## 3. Referências nacionais

Fonte: `br-sites.json` (com complementos de `keyword-funnel.json` para Zoom, Buscapé, TechTudo, Canaltech, Mundo Conectado, Tecnoblog e ReviewBox). Nota metodológica do relatório: o Firecrawl estava sem créditos na sessão, então as SERPs vieram do WebSearch e podem diferir ligeiramente do Google Brasil real por localização; Tecnoblog, Pelando, Melhor Escolha, UOL Guia de Compras e Estadão Recomenda bloquearam fetch direto.

### 3.1 Tabela de referências

| Site | O que faz bem | Estrutura de página | O que copiar |
|---|---|---|---|
| **TechTudo – Qual Comprar (listas) e guias "vale a pena"** — https://www.techtudo.com.br/listas/2026/01/8-air-fryers-que-valem-a-pena-em-janeiro-de-2026-edqualcomprarlb.ghtml | Título com mês/ano, público-alvo por produto em uma frase, prós/contras com contras vindos de usuários, cards de loja com desconto e botão "IR À LOJA", bloco "Por que confiar nas listas do Qual Comprar?", artigos em primeira pessoa ("Comprei e conto se vale a pena") com veredito claro. | H1 numérico ("8 air fryers que valem a pena em janeiro de 2026") → subtítulo com marcas e "preços desde R$ 229" → autor "para o TechTudo" + publicado/atualizado → lista-resumo → por produto: H3 "a partir de R$ X", frase de público ("para quem quer um modelo pequeno, simples, barato"), texto com specs, "Prós:"/"Contras:", CTA "Gostou do produto? Compre aqui", cards de loja, selo em caixa alta ("CUSTO-BENEFÍCIO") → créditos "Com informações de Amazon, Casas Bahia…". Sem tabela, FAQ ou índice. Preços do H3 divergem dos cards (R$ 229 vs R$ 206). Disclosure em bloco após o conteúdo ("o TechTudo mantém uma parceria comercial com lojas parceiras"). | Título com mês para listas voláteis; frase de público-alvo por produto; contras extraídos de usuários; artigo em 1ª pessoa com 8 H2 numerados ("Por quanto comprei", "O que não fica tão bom", "Como eu limpo", "Vale a pena comprar?"). **Evitar:** preço estático no H3; URLs datadas (/listas/2026/10/…). |
| **Buscapé (conteúdo + página de produto + metodologia)** — https://www.buscape.com.br/fritadeira/conteudo/melhor-air-fryer | Ranqueia #1 em quase toda busca genérica; seção "Como escolhemos"; FAQ com perguntas de busca real; página de produto com "Compare preços em 6 lojas", histórico de preço (40 dias a 1 ano), nota com nº de avaliações, ficha com "Tensão 127V ou 220V", "Perguntas & Respostas"; títulos "até R$ 1.500". | H1 "Melhor air fryer 2026: veja os modelos ideais…" → autora, "Publicado 22/04/2021 e atualizado 06/07/2026", "11 min. de leitura" → "Como escolhemos" (volume de vendas, quantidade de avaliações, nota média em varejistas, reputação da fabricante) → produtos "Marca Modelo: a melhor air fryer [categoria]" com prós/contras e specs em prosa, SEM preço/botão no corpo (comparador dinâmico "Carregando comparador…") → FAQ em H2 → links internos. Página de produto: "4.7 (766 avaliações)", abas "40 dias, 3 meses, 6 meses, 1 ano", "Com base nos últimos 40 dias, o valor está próximo da média de R$ 249,00", aviso "Ofertas da Amazon não compõem os dados deste histórico". | Resposta "Como escolhemos"; FAQ de busca real ("Air fryer gasta muita energia?"); contexto de preço (média de 40 dias) em vez de valor fixo; ficha com tensão; páginas-irmãs "até R$ N". **Evitar:** data de publicação 2021 em página "2026"; H2 vazios de widget. Monetização por cashback, sem disclosure. |
| **Zoom (listas "deumzoom" e guia de dor: colchão ortopédico)** — https://www.zoom.com.br/colchao-casal-solteiro/deumzoom/colchao-ortopedico | Títulos "X é bom? Guia completo para escolher o melhor"; aborda dor nas costas com tabela peso x densidade (D33/D45) do INER; FAQ em H2 ("Colchão ortopédico desvantagens?", "O colchão D45 é muito duro?"); link para comparador. Hub /fritadeira com filtros (preço "até R$ 100", "R$ 100 a R$ 505", marca, capacidade, lojas incl. Amazon) e blocos editoriais em pergunta que linkam ~10 guias. | H1 pergunta → subtítulo prometendo "modelos D33 e D45 mais bem avaliados" → autora + data + 11 min → intro com contexto da dor → produtos com "Por que vale a pena comprar…" (só prós) → tabela técnica → FAQ. Sem preço, botão, contras ou aviso médico; diz "12 modelos" e mostra 9. Guia de marca: H2 por marca em pergunta ("A marca de air fryer Philco é boa?"), H3 "[Marca] no Reclame Aqui" (jan/2026), H3 "Melhores air fryers da [Marca]". Comparativo "Galaxy A57 vs Galaxy A56": H2 por critério com os dois nomes, fichas lado a lado, preço datado (29/04/2026), regra "o upgrade vale se a diferença for de até R$ 300". | Hub/spoke com ~12 guias por categoria; H3 "[Marca] no Reclame Aqui"; H2 por critério no comparativo com regra numérica de decisão; FAQ de disputas de marca ("Britânia ou Mondial?"). **Evitar:** só prós; sem disclaimer de saúde; contagem que não bate; veredito só no fim; mistura 2025/2026. |
| **Canaltech (review individual, lista "Especialistas respondem", Prêmio Canaltech)** — https://canaltech.com.br/fritadeiras/analise/review-mondial-family-afn-40-bf-airfryer-de-4l-com-cesto-quadrado/ | Medições reais (ruído "média de 52 dB, medida com decibelímetro a 1,5 m"; "0,3 kWh em 20 minutos a 200 °C, R$ 6,55 por mês"), H2 "Concorrentes diretos" e "vale a pena?", links de compra para 3 lojas, listas com citações de analistas nomeados, Prêmio Canaltech 2026 (35 categorias, júri de 84 pessoas). Comparativo "Ventilador de teto ou ar-condicionado no 23ºC" com cálculo próprio (kWh/mês, tarifas de 5 capitais, diferença de R$ 18-24/mês). | Review: H1 "Review [Modelo] \| [benefício]" → autor + editor + data → H2 Design/Usabilidade (H3 Ruído, Consumo)/Limpeza/Concorrentes/"vale a pena?" → prós/contras → veredito textual sem nota → faixa de preço ("entre R$ 350 e R$ 550 no varejo") → links "Compre o [produto] no Magalu / no Mercado Livre / na Amazon" (tag=canaltech-site-20). SEM disclosure textual; "Continua após a publicidade". | Medições com protocolo (dB a 1,5 m; kWh → R$/mês); H2 "Concorrentes diretos"; H2 final "[Modelo] vale a pena?"; faixa de preço em vez de valor; cálculo de custo como "information gain barato". **Evitar:** ausência de disclosure; veredito só no último H2. |
| **Tecnoblog (guias, política editorial, Achados do TB, comparativo)** — https://tecnoblog.net/politica-editorial/ `[confiança média — fetch bloqueado]` | Guias baseados em ~400 reviews próprios ("segundo testes do Tecnoblog"), prós/contras específicos, política editorial pública ("Não aceitamos análises pagas"; nenhuma loja/fabricante tem participação acionária), canal de ofertas verificadas com 100 mil seguidores no WhatsApp, comparativo de até 3 produtos. URLs semânticas: /guias/ (listas), /achados/ (ofertas), /responde/ (explicativos). | Guias "Melhores celulares em 2026: 11 smartphones para comprar no Brasil" / "Melhor celular Samsung em 2026: 11 modelos"; estrutura inferida de snippets: produto → prós/contras → link para review. Achados: "Tudo é verificado para evitar divulgar promoções falsas"; "trabalha com todas as principais lojas do país, então não há favoritismo". Slugs 'melhor-[produto]-[modificador]', 'categoria-para-uso', 'categoria-com-atributo'. | Política editorial pública; canal de ofertas próprio; slugs semânticos por tipo de conteúdo. Frase exata de disclosure não confirmada. |
| **Tudocelular** — https://www.tudocelular.com/ | Banco de fichas técnicas, comparador /compare/ID1-ID2.html, rankings de desempenho e bateria com gráficos de testes próprios, fórum ativo, notícias de oferta com preço no título ("Huawei Band 10 por R$ 159!"). | Menu por editoria, "Reviews" chamados de "provas", comparador "X com Y" (não "X vs Y"), fichas sem preço; preço só em títulos de notícias de oferta para Amazon/Magalu. Sem disclosure visível. | Comparador programático a partir de fichas; rankings de testes. **Lacuna a explorar:** comparativos só mostram specs, sem veredito. |
| **Showmetech** — https://www.showmetech.com.br/air-fryers-com-desconto-no-prime-day-2026/ | Listas de ofertas por evento com índice numerado (nome + voltagem + preço), preço em negrito e % de desconto no CTA, autor + "revisado por", reviews individuais (QCY MeloBuds Pro). Mídia kit 2026 e >300 milhões de acessos. | H1 "19 Air Fryers com desconto de até 61% no Prime Day 2026" → intro → índice 1-19 → H2 por produto com preço ("R$ 138,20") → imagem com crédito → parágrafo → CTA "com aproximadamente 31% de desconto no Prime Day por apenas R$ 138,20" → "Fonte: Amazon". Ordenado por preço, variantes 127V/220V como itens separados. Links link.amazon encurtados; SEM disclosure. | Listas sazonais por evento; variantes de voltagem como itens separados; "revisado por". **Evitar:** encurtadores opacos; sem disclosure; preço estático no texto (ver seção 6). |
| **Olhar Digital (Guia de Compras, fichas, comparador, plugin de ofertas)** — https://olhardigital.com.br/2026/03/27/pro/na-duvida-de-qual-celular-comprar-quer-uma-tv-nova-o-od-te-ajuda/ | Ecossistema de ferramentas: comparador de até 3 produtos, área de ofertas (produtos.olhardigital.com.br), plugin de navegador que "indica se aquela oferta realmente é a melhor disponível naquele momento" com histórico de preço; cita revisão sistemática 2025 sobre travesseiros. | Editoria /editorias/guia-de-compras/, fichas em /fichas-tecnicas/ e /fichas-tecnicas/comparar/; não apareceu em nenhuma SERP "melhor X 2026" testada. Monetiza com publicidade e Clube OD; não menciona afiliados. | Citar evidência científica em conteúdo de saúde; ferramentas de comparação. (Mobile Time é B2B, não concorrente.) |
| **PROTESTE Brasil** — https://www.proteste.org.br/ | Única fonte nacional com testes de laboratório independentes (arroz, celulares, feijão, TVs, azeite, café), marca forte ("Maior associação de consumidores da América Latina"), vocabulário "Melhor do Teste"/"Escolha Certa". | Home com "Nossos comparadores" (6 categorias); conteúdo atrás de login/assinatura ("Faça login ou registre-se…"); irmã DECO PROteste PT descreve protocolo ("fritaram-se batatas congeladas… capacidade recomendada e quantidade máxima"). Assinatura R$ 9,90 no 1º mês; SEM links de compra; não ranqueia para buscas comerciais "2026". | Vocabulário de selo ("Escolha Certa"); protocolo de teste descrito. Não é concorrente direto nas SERPs comerciais. |
| **Promobit (home e blog de rankings)** — https://www.promobit.com.br/blog/melhores-carrinhos-de-bebe/ | Comunidade curada ("aprova apenas promoções reais"), abas "Destaques / Recentes / Em alta / Menor preço", lista de desejos com alerta, blog ranqueando em bebê/robô aspirador/fone com tabela-resumo Amazon + Mercado Livre e coluna "Destaque". | Card de oferta: imagem, título, selo ("Cupom", "Frete Grátis"), loja, autor, tempo, dois preços, "Pegar promoção" (redirect /Redirect/to/ e promoby.me), "Dúvidas?". Blog: H1 "Melhores carrinhos de bebê: 12 principais modelos em 2026" (lista diz 10, tem 12) → tabela resumo → H3 "1º Safety 1st…" → "Compre agora… na Amazon" (tag=blog-teste-20); admite "Como não pudemos testar os carrinhos pessoalmente…". SEM disclosure. | Tabela-resumo com duas lojas e coluna "Destaque"; honestidade sobre não ter testado. **Evitar:** contagem incoerente; redirects opacos; sem disclosure. |
| **Pelando** — https://www.pelando.com.br/ `[confiança média — fetch bloqueado]` | Temperatura votada pela comunidade (esquentar/esfriar), comentários como validação de "vale a pena", moderação de promoções falsas, extensão Chrome; páginas de oferta /d/ ranqueiam para nome de produto. | Estrutura via Showmetech/MobileTime/TecMundo: card com temperatura, loja, preço, cupom, comentários. Disclosure literal: "ao comprar por meio de uma promoção em nosso site, o Pelando pode receber da loja parceira uma comissão sobre a venda". | Disclosure clara em linguagem simples; comunidade como validação. |
| **Melhor Escolha (melhorescolha.com)** — https://www.melhorescolha.com/ | Autodescrição (via Ahrefs) de "comparações e reviews curados" em gadgets, casa e bem-estar; prêmio anual de banda larga baseado em >1 milhão de testes de velocidade. | Fetch bloqueado (403); nenhuma página de ranking de produto físico apareceu nas SERPs testadas. Monetização provavelmente referral de planos; não verificado. | Relevância para produtos Amazon não confirmada (ver seção 9). |
| **Oficina da Net (comparador e listas mensais)** — https://www.oficinadanet.com.br/smartphones/comparacao-apple-iphone-16,xiaomi-redmi-note-14-pro-5g | Melhor bloco de preço comparativo do Brasil: tabela GERAL com "Preço de lançamento", "Menor preço histórico", "Preço atual" e "Preço justo"; specs por grupo (Tela, Câmera, Bateria…); listas de custo-benefício atualizadas mensalmente. | H1 "Comparação de Celulares" → subtítulo → tabela GERAL (preços) → tabelas por grupo → resumo textual. Sem veredito/vencedor, sem nota, sem lojas, sem disclosure. | Contexto de preço em 4 colunas (lançamento / menor histórico / atual / justo). **Lacuna a explorar:** comparativo sem veredito. |
| **mybest Brasil (br.my-best.com)** — https://br.my-best.com/19905 | Ordem "Por Que Confiar em Nós?" → "Como Analisamos" (9 critérios, incl. "notas no Reclame Aqui e na Amazon", "ano de fundação", "sede") → ranking → "Como Escolher"; múltiplas lojas por card (Amazon, Casas Bahia, Magazine Luiza, Mercado Livre); "Reportar erro"; disclosure explícita; promete "banco de dados com mais de 2.000 produtos registrados mensalmente". | H1 "Top 10 Melhores Marcas de Air Fryer em 2026 (Mondial, Philips e mais)" → cards "No.1 / 1º mais popular" com botões de 4 lojas, "Visão Geral do Produto"; sem preço nem nota. Erros: título 2026 com corpo 2023; Oster/Arno descritos como aspiradores em ranking de air fryer. | Ordem "confiar → como analisamos → ranking → como escolher"; Reclame Aqui como critério; "Reportar erro"; disclosure ("Nossas análises e classificações são completamente independentes de patrocínios…"). **Evitar:** produtos de categoria errada. |
| **melhorairfryer.com.br (afiliado exact-match domain)** — https://melhorairfryer.com.br/ | Ranqueia #3 para "melhor air fryer 2026" com um único hub; sumário com âncoras; selos ("Melhor Escolha", "Melhor Custo Benefício", "Mais Silenciosa"); blocos "Para quem é / Por que gostamos / Pontos de atenção / Resumo"; ficha técnica; FAQ em H3; bio do autor com e-mail; disclosure oficial da Amazon. | Breadcrumb → H1 → "Redator: Gustavo Rodrigues" + "Última atualização: 27 de junho de 2026" → índice (ranking 1-11, comparativo, "Vale a pena", "Como escolher", "Qual a melhor marca", FAQ, conclusão) → por produto: número + nome + selo, botão "Ver Oferta na Amazon" (tag=melhor-airfryer-20), Vantagens/Desvantagens, ficha → tabela comparativa com muitas células vazias → FAQ. Nota só do guia inteiro ("4,7/5 · 107 avaliações"). Rodapé: "Como participante do Programa de Associados da Amazon Brasil, somos remunerados pelas compras qualificadas efetuadas." | Blocos "Para quem é / Por que gostamos / Pontos de atenção / Resumo"; selos específicos ("Mais Silenciosa"); não usa "testamos" sem ter testado. **Evitar:** tabela com células vazias; disclosure só no rodapé. |
| **RevisaLar / AnalisaMelhor (rede "Revisa")** — https://revisalar.com.br/melhor-fone-de-ouvido-custo-beneficio/ | Estrutura mais completa do mercado nacional: resposta rápida no 1º parágrafo ("O melhor fone de ouvido custo-benefício é o QCY MeloBuds Pro."), "Aviso de transparência" após a intro, sumário de 14 âncoras, tabela comparativa com preço, "Preço de referência" + "Ver preço" + "*Preço sujeito a alteração pela loja", ficha inline, prós/contras, "Boletim de Testes" (6 critérios 0-10 + "O que percebemos"), "Por que confiar em nós", guias de escolha, FAQ, "Sobre o autor" com cargo ("Analista de produtos") e LinkedIn, rodapé "Como comparamos"/"Transparência editorial". | H1 "Melhor fone de ouvido custo-benefício: os 6 melhores em 2026", "Por Danilo Teixeira", data + "15 min de leitura" + "Atualizado em". Header com "Explorar categorias" e "Guias de compra" (Cozinha, Casa & limpeza, Jardim & ferramentas, Climatização, TV & áudio, Casa conectada); analisamelhor.com.br redireciona 301 para revisalar.com.br; "Boletim de Testes" sem protocolo descrito. Disclosure: "Nossas avaliações são 100% independentes e imparciais… podemos receber uma comissão de afiliado, sem nenhum custo adicional para você". | Praticamente o template inteiro: resposta rápida, aviso de transparência, sumário, tabela discriminante, "Preço de referência" com asterisco, ficha em pares, "Sobre o autor" com LinkedIn. **Evitar:** "Boletim de Testes" sem protocolo. |
| **Buskando** — https://buskando.com.br/blog/melhores-air-fryers-2026 | Transparência radical ("Não testamos nenhuma air fryer, não usamos avaliações de compradores e não publicamos posição de venda"), "Como montamos esta lista" (40 anúncios conferidos), resposta rápida com 4 indicações e botões por voltagem, tabela "o que cada anúncio declara", "Para quem serve / Para quem não serve", "Armadilhas dos anúncios", "Histórico de atualizações", "Por que confiar no Buskando". | H1 "Melhor Air Fryer 2026: Qual Comprar e Custo-Benefício" → "Por Equipe Buskando" + "Atualizado em 02/10/2026" → disclosure ("Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas." no topo) → resposta rápida → sumário "Neste guia" → 7 critérios → tabela → blocos por capacidade → "Outros modelos" → armadilhas → FAQ → metodologia. **Removeu preços e nota 0-100 em 02/10/2026** — sinal de que preço estático virou passivo. Autoria coletiva sem bio. | "Como montamos esta lista"; "Armadilhas dos anúncios" (fichas que mudam por voltagem, códigos de painel); botão por voltagem sem preço; "Histórico de atualizações"; honestidade sobre não testar. **Evitar:** "Por Equipe" sem bio. |
| **Casa dos Eletrodomésticos** — https://www.casadoseletrodomesticos.com.br/melhor-robo-aspirador-custo-beneficio | E-E-A-T explícito ("Quem fez este guia", autora + responsável por "metodologia e revisão" e "governança E-E-A-T"), resposta rápida com cards Nº1-Nº5, scorecard com selos específicos ("Escolha do Editor", "O Mais Barato", "Maior Rede de Assistência", "Melhor Equilíbrio", "Marca Premium por Menos"), estrelas + nº de avaliações Amazon ("4,7 em 442"), "O que dizem as avaliações", "Para quem é", veredito, FAQ "O que mais perguntam sobre…", glossário, rótulo "Links de afiliados" sob cada produto; ranqueia para "travesseiro para dor no pescoço". | H1 "Os 5 Melhores Robôs Aspiradores Custo-Benefício em 2026 (Xiaomi e WAP)" → "Publicado: 14/07/2026 · Atualizado: 09/09/2026 · 26 min de leitura" → resposta rápida → "Índice do Artigo" → scorecard → blocos (ficha, avaliações, para quem, prós/contras, veredito) → "Como analisamos" (5 critérios incl. "prova social"; fontes: marketplaces, manuais PDF, portais de fabricantes) → FAQ → autor. Faixa de preço categórica (Premium/Intermediário/Entrada). FAQ institucional "Nem sempre realizamos testes físicos". | "Quem fez este guia" com autor + revisor; selos honestos e específicos; faixa de preço categórica; rótulo "Links de afiliados" por botão; FAQ institucional honesta. **Atenção:** exibir "4,7 em 442" da Amazon viola as Políticas do Associados sem API (ver seção 6). |
| **GDM (gdm.com.br)** — https://gdm.com.br/mondial-family-afn-40-bi/ | Testes reais com medições (1,56 kWh, ~50 ºC externa, 48-58 dB, tempos de coxinha/pão de queijo/batata), nota 4.8 no topo, title "[Modelo] é boa? - Review", H3 por aspecto, ficha, "1º lugar em Melhores air fryers", botões "Ver Preço" Amazon + Mercado Livre com selo "Loja Segura", bio de autor (co-fundador); ranqueia #1 em "melhor carrinho de bebê 2026" e #2 em cadeirinhas. | Review: H1 = nome do produto → autor/data → veredito + nota → "Comprar em lojas confiáveis" → "Vá direto para" → H3 (Preço, Cesto, Painel, Consumo, Ruídos, Preparos) → prós/contras → ficha → "Veja também". Lista: "Os 5 Melhores X de 2026" → tabela "Comparar" em pares rótulo/valor → blocos com "Ver Preço", prós/contras. Preço só em texto ("R$400 à época"); review de 2022 vendido como 2026. Amazon (tag=melhores-20) + Mercado Livre; SEM disclosure. | Medições com alimentos brasileiros; title "[Modelo] é boa? - Review"; H3 por aspecto; "1º lugar em [lista]" ligando review e lista; duas lojas. **Evitar:** sem disclosure; data antiga em título 2026. |
| **CupomOnline (cupomonline.com.br)** — https://www.cupomonline.com.br/melhor-robo-aspirador-custo-beneficio/ | Cobertura massiva de nichos (pets, bebê, casa, fones "até R$200", "Royal Canin vs Golden", "Air Fryer vs Forno Elétrico", "Sono Perfeito 2026"), "Resposta Rápida", tabela com "Preço Aproximado" e "Nota", FAQ, títulos com teto de preço ("até R$300", "até R$500"). | H1 → "Escrito por" + data + "Atualizado em" → Resposta Rápida quebrada ("O melhor Robô Aspirador Custo Benefício em é") → sumário 18 âncoras → tabela (Produto/Destaque/Preço Aproximado/Nota) → blocos "Preço: R$", "Por que escolher", Prós/Contras, sem botão → links genéricos Amazon/Mercado Livre/Shopee/Magalu em "Aproveite os melhores cupons" → FAQ. Placeholders '%currentyear%', 'Alt', 'Top 8' com 5 itens, imagens erradas (Roborock em lista de Xiaomi/Multilaser), cupons de bermuda/tênis em artigo de aspirador; disclosure só no rodapé. | Títulos com teto de preço e comparativos "A vs B 2026". **Contraexemplo** de pipeline sem validação — e mesmo assim ranqueia, mostrando que a concorrência de nicho é fraca. |
| **Cauda longa de afiliados** (Dicas do Vizinho / Panelas e Cozinha / Estrela Digital / Hora de Codar / Guia Recomenda / Mundo dos Reviews / mReviews / Amo Produtinhos) — https://dicasdovizinho.com.br/melhor-air-fryer/ | Ocupam posições 2-10 em nichos específicos (cozinha, home office, programação, cadeiras) com títulos "Melhor X em 2026: N Modelos Que Valem a Pena", "Testamos as Mais Vendidas do Brasil", "As 05 melhores cadeiras de escritório para comprar [2026]"; usam Mercado Livre além da Amazon; citam NR17, mesh, pistão a gás, assistência nacional. | Dicas do Vizinho: H1 → "Por Marcelo Castro" + duas datas sem rótulo → sumário → tabela de litragem → 9 blocos com botão "Comprar" (meli.la), "Pontos fortes"/"Atenção", sem preço, ficha, FAQ ou bio; afirma seguir "diretrizes do Google Search Central". Hora de Codar/mReviews: URLs com 2023/2024 e títulos 2026. Maioria SEM disclosure (Dicas do Vizinho só tem link "Transparência" com "Como Avaliamos" vazio); Panelas e Cozinha promete teste no título sem evidência. | Critérios normativos brasileiros (NR17, mesh, pistão a gás, assistência nacional). **Evitar:** tudo o mais. |
| **Amazon Associados Brasil – Contrato de Operação (Cláusula 5)** — https://associados.amazon.com.br/help/operating/agreement | Define o texto obrigatório de disclosure, a ser exibido "de forma clara e destacada"; regras de venda qualificada (clique → compra em 24h → não devolução), 3 vendas em 180 dias. | Contrato incorpora "Políticas do Programa" por referência; regras de exibição de preço não estão nesta página. | Base legal/contratual (detalhada na seção 6). |
| **CONAR – Guia de Marketing de Influência 2026** (via UAI, Migalhas, Cescon Barrieu, Mundo do Marketing) — https://www.uai.com.br/networking-e-negocios/2026/09/23/ganha-comissao-com-link-de-afiliado-para-o-conar-isso-ja-e-publicidade/ `[confiança média]` | Estabelece que "a remuneração por desempenho, como a dos programas de afiliados, caracteriza publicidade" (vigente desde 1º/06/2026), exige identificação imediata e em destaque ("publicidade"/"publi"), responsabiliza anunciantes e agências; CDC art. 36 segue aplicável. | Autorregulamentação (não lei); aplicação específica a sites/blogs não explicitada nas fontes lidas. | Padrão de compliance que a maioria dos concorrentes ainda não cumpre. |
| **Conversion – análises do March 2026 Core Update e Discover Feb 2026** — https://www.conversion.com.br/blog/google-core-update-marco-2026-impacto `[confiança média]` | Contextualiza o risco algorítmico: afiliados foram a categoria mais atingida (71% com quedas, JetDigitalPro em 600 mil páginas), foco em "information gain", correlação IA x queda ≈ 0,011, Discover priorizando conteúdo local brasileiro, Product Reviews System em português desde 2023. | Dados de agências/monitoramentos, não do Google; sem recorte específico para afiliados brasileiros. | Dado próprio (teste, foto, histórico de preço, leitura de avaliações) como diferencial obrigatório. |

### 3.2 Quem ranqueia para quê no Google Brasil

**"melhor air fryer 2026"** — 1º Buscapé ("Qual a melhor air fryer? Veja 10 opções em 2026"), 2º Panelas e Cozinha ("Testamos as Mais Vendidas do Brasil"), 3º melhorairfryer.com.br (domínio exact-match, "as 11 melhores airfryers"), 4º TechTudo ("8 air fryers que valem a pena em janeiro de 2026"), 5º Estrela Digital ("As 10 Melhores Air Fryers para Comprar em 2026: Ranking Completo e Reviews"). Portais internacionais (RTINGS, Food Network) só depois.

**"melhor fone de ouvido custo benefício 2026"** — TechTudo ocupa 2 posições no topo (listas de março/2026), depois Felitron (loja), Zoom ("10 modelos que valem a pena"), RevisaLar ("os 6 melhores em 2026"), Produtos Analisados ("os 7 melhores em 2026"), QueroTop, AnalisaMelhor e Guia Recomenda. Blogs de afiliado de nicho dominam as posições 5-9 com o padrão "Melhor X custo-benefício: os N melhores em 2026".

**Buscas de dor/problema** — a SERP é fragmentada e há espaço claro:
- "qual o melhor colchão para dor nas costas" → fabricantes (Emma, Maxcolchon), DECO PROteste PT, clínica ITC Vertebral, Zoom "Colchão ortopédico é bom?" (D33/D45, tabela do INER, SEM aviso médico), blogs de lojas (Costa Rica Colchões, Netsono).
- "dor nas costas dirigindo almofada lombar" → páginas de produto da Amazon.com.br ranqueiam diretamente, blogs médicos (SalvaPé, Dr. Sérgio Hennemann), Diário do Litoral, afiliados pequenos mReviews ("Top 10 … de 2026" com URL 2023) e experimentebrasilia.
- "cadeira de escritório para dor nas costas 2026" → só afiliados pequenos (techinter, horadecodar, Buskando, Mundo dos Reviews, Guia Recomenda) citando NR17, mesh, pistão a gás, assistência técnica nacional.
- "travesseiro para dor no pescoço" → Casa dos Eletrodomésticos, mybest, Olhar Digital (cita revisão sistemática 2025), páginas de loja.
- **Nenhum concorrente combina explicação do problema + critérios + produtos + disclaimer de saúde.**

**"o que usar para dor de ouvido"** — SERP 100% YMYL: Tua Saúde ("9 remédios para dor de ouvido"), farmácias (Preço Popular, Pague Menos, Panvel, Drogaria Nova Esperança, Catarinense), sites portugueses. Os produtos são medicamentos (Oto-Xilodase, Auris Sedina, Nazzo Oto, dipirona) — inviável para afiliado Amazon e arriscado para AdSense/E-E-A-T. A tradução correta de "dor → produto" nesse nicho é acessória (compressa térmica, protetor auricular para natação, umidificador), não remédio.

**Fundo de funil por modelo** — "mondial family afn-40 é boa": Canaltech (review com medições), páginas de produto Buscapé/Zoom (3-4 variantes AFN-40-BI/BF/TBI/F) e GDM. "QCY MeloBuds Pro review vale a pena": Showmetech (versão EN), sites gringos (Scarbir, Earbuds Arena), página de oferta do Pelando e techreviews.com.br (domínio já redirecionando para melhorestablet.com.br — churn alto de afiliados). Há pouca concorrência nacional sólida em reviews individuais de casa/cozinha; a dificuldade real é a multiplicidade de códigos de variante (BI/BF/TBI, HT10/BH24HT08A) e voltagem.

**Mix do hub editorial do Buscapé** (74 artigos únicos em "Dicas do Busca", via `keyword-funnel.json`): ~61% meio de funil ("Melhor X 2026: N modelos", "X ou Y", "X para [uso]", "X [spec]"), ~27% topo (dores: "Celular esquentando muito?", "Celular não carrega", "Como descongelar geladeira rápido") e ~12% fundo ("é bom?", "review completo", "ainda vale a pena em 2026?").

**Padrões de título que ranqueiam (literal)**

| Padrão | Quem usa |
|---|---|
| "Melhor X 2026: veja os modelos ideais para…" / "Qual a melhor X? Veja N opções em 2026" | Buscapé |
| "N X que valem a pena em [mês] de 2026" / "Melhor X custo-benefício em 2026: veja o top 10" | TechTudo |
| "Melhores X 2026: N modelos que valem a pena" | Zoom |
| "Melhor X custo-benefício: os N melhores em 2026" | RevisaLar / AnalisaMelhor / Produtos Analisados |
| "Melhor X 2026: as N melhores Xs" | domínio exact-match |
| "Melhor X até R$ 1.500 em 2026: N opções que valem a pena" / "Melhores X até R$300 em 2026" | Buscapé / CupomOnline |
| "X é bom? Guia completo para escolher o melhor" | Zoom |
| "Qual o melhor X para [dor]?" | Casa dos Eletrodomésticos |
| "Ter X é uma boa mesmo? Comprei e conto se vale a pena" | TechTudo |
| "Review [Modelo] \| [benefício em 5 palavras]" | Canaltech |
| "[Modelo] é boa? - Review" | GDM |
| "Royal Canin vs Golden 2026: Qual Melhor…" / "Air Fryer vs Forno Elétrico 2026: Qual Cozinha Melhor?" | CupomOnline |
| "N X com desconto de até Y% no Prime Day 2026" | Showmetech |

**Vocabulário e CTAs padrão em PT-BR:** "custo-benefício", "vale a pena", "é bom?/é boa?", "qual comprar", "para quem é"/"para quem serve"/"para quem não serve", "pontos de atenção", "prós e contras"/"vantagens e desvantagens", "ficha técnica", "a partir de R$", "preço de referência", "Ver preço", "Ver oferta na Amazon", "Compre aqui"/"Compre agora", "IR À LOJA", "Pegar promoção", "Loja Segura"; selos "Escolha do Editor", "Melhor custo-benefício", "Mais vendida", "Melhor Escolha", "Mais Silenciosa", "Melhor do Teste"/"Escolha Certa" (PROTESTE). Tempo de leitura ("11 min. de leitura") e "Atualizado em" são onipresentes.

### 3.3 Fraquezas da concorrência que podemos explorar

| Fraqueza observada | Quem comete | Como explorar |
|---|---|---|
| Datas incoerentes ("Publicado 22/04/2021 e atualizado 06/07/2026" em página "2026"; URL "…de-2023" com título "…de 2026"; review de 2022 vendido como ranking 2026) | Buscapé, Hora de Codar, mReviews, GDM | "Publicado" e "Atualizado" visíveis, coerentes e iguais ao schema; histórico de atualizações. |
| Placeholders e templates quebrados ("%currentyear%", "em é", célula "Alt", "Top 8" com 5, "12 modelos" com 9) | CupomOnline, Zoom, Promobit Blog | Validação automática de contagem, ano e campos obrigatórios antes de publicar. |
| Produtos de categoria errada e imagens genéricas/erradas | mybest, CupomOnline | Imagem sempre vinculada ao ASIN; checagem de categoria. |
| Preço estático divergente entre H3 e cards | TechTudo; Buskando removeu preços em 02/10/2026 | Faixa qualitativa ou "preço de referência em [data]"; preço dinâmico só via API. |
| Ausência de contras ou contras genéricos ("Sem grandes diferenciais") | Zoom | Contras específicos extraídos de uso/pesquisa própria. |
| Disclosure só no rodapé ou inexistente | Canaltech, Zoom, Buscapé, Promobit, GDM, Showmetech, Dicas do Vizinho, Tudocelular | Disclosure em 3 camadas (seção 6) — diferencial de confiança e compliance CONAR. |
| Promessa de teste sem evidência ("Testamos as Mais Vendidas do Brasil"; "Boletim de Testes" sem protocolo) | Panelas e Cozinha, RevisaLar | Dizer o que foi feito (modelo Buskando) e só usar "testado" quando houver medição/foto. |
| Voltagem 127V/220V ignorada | maioria | Botão por voltagem; campo "voltagens" no schema de produto; aviso em toda lista de eletro. |
| Códigos de variante confusos sem explicação (AFN-40-BI vs BF vs TBI vs F; MeloBuds Pro HT10 vs BH24HT08A) | geral | Indicar qual código o link aponta. |
| Conteúdo YMYL de medicamento ou colchão/cadeira para dor sem disclaimer | Zoom | Template "Guia de problema" com disclaimer e "quando procurar um médico". |
| Tabelas com colunas demais e células vazias, ou só specs sem veredito | melhorairfryer.com.br, Oficina da Net, Tudocelular | 4-6 colunas discriminantes + coluna "Para quem"; veredito por perfil. |
| Cupons/ofertas não relacionados e excesso de "Continua após a publicidade" | CupomOnline, Canaltech, Zoom | Slots de anúncio fora dos cards; nada não relacionado. |
| Redirecionadores opacos (promoby.me, meli.la, link.amazon) sem rel=sponsored | Promobit, Dicas do Vizinho, Showmetech | Link direto para a loja com rel="sponsored". |
| Só reescrita de fichas e avaliações de terceiros | cauda longa | Dado próprio por artigo. |
| Churn de domínio (techreviews.com.br → melhorestablet.com.br; analisamelhor.com.br → revisalar.com.br) | afiliados de nicho | Um domínio estável, hubs por categoria. |
| Autoria escondida ("Por Equipe Buskando", "Marcelo Castro" sem bio) | Buskando, Dicas do Vizinho | Nome, cargo, foto, LinkedIn e revisor. |
| Veredito só no fim ("depende…" no 1º parágrafo) | Zoom, Canaltech, Buscapé | Resposta direta em 2-3 frases no topo. |
| Comparativos "A vs B" só com specs | Oficina da Net, Tudocelular | Veredito por perfil + regra de decisão. |

**Onde investir primeiro (recomendação do relatório):** reviews individuais de produtos de casa/cozinha/bebê/pets (quase só Canaltech e GDM fazem com dados), comparativos "A vs B" com veredito e listas por dor/uso (SERP ocupada por fabricantes e clínicas). Em smartphones/TVs a concorrência (TechTudo, Tecnoblog, Canaltech, Buscapé) é forte demais para começar.

### 3.4 Sinais de confiança específicos do Brasil

Usados pelos concorrentes e esperados pelo leitor: voltagem 127V/220V (botões por voltagem no Buskando, itens separados no Showmetech, "Tensão" na ficha do Buscapé); notas do Reclame Aqui (mybest, Casa dos Eletrodomésticos, Zoom por marca); selo Inmetro + Portaria 246/2021 e Resolução CONTRAN 277 (cadeirinha); norma NR17 (cadeira de escritório); densidade D33/D45 e peso suportado (colchão); "assistência técnica nacional e garantia acima de 12 meses"; parcelamento ("6x de R$ 41,93") e preço "à vista"/Pix; selo "Loja Segura" (vendido e entregue por Amazon vs marketplace); ficha técnica com litros/potência/garantia.

### 3.5 Disclosure no Brasil — o que os concorrentes escrevem

- **Texto oficial do Programa de Associados Amazon Brasil** (Cláusula 5 do Contrato de Operação): *"Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas"*, a ser exibido "de forma clara e destacada". Usado literalmente por melhorairfryer.com.br (rodapé, versão "somos remunerados") e Buskando (no topo, perto da resposta rápida). Links seguem o padrão `tag=<id>-20` (melhor-airfryer-20, canaltech-site-20, blog-teste-20, melhores-20).
- **Variantes em português encontradas:** RevisaLar — "Aviso de transparência: Nossas avaliações são 100% independentes e imparciais… podemos receber uma comissão de afiliado, sem nenhum custo adicional para você" (após a introdução) + rodapé; Casa dos Eletrodomésticos — "Alguns links são de afiliado, o que significa que podemos receber uma comissão sem custo adicional para você" + rótulo "Links de afiliados" sob cada produto; mybest — "Nossas análises e classificações são completamente independentes de patrocínios de marcas e colocações pagas" + "Se você realizar uma compra por meio dos nossos links, poderemos receber uma comissão"; CupomOnline — "Alguns links podem gerar comissão para o CupomOnline sem custo adicional para você" (só no rodapé); JivoChat — "alguns links podem ser de afiliados, mas não afetam nossas análises ou recomendações"; Pelando — "ao comprar por meio de uma promoção em nosso site, o Pelando pode receber da loja parceira uma comissão sobre a venda".
- **CONAR 2026** `[confiança média]`: o novo Guia de Marketing de Influência (maio/2026, vigente desde 1º/06/2026) trata "remuneração por desempenho, como a dos programas de afiliados" como publicidade, exigindo identificação imediata (sem precisar clicar em "ver mais"), com termos como "publicidade"/"publi" em destaque; termos genéricos ("parceria") podem não bastar. CONAR é autorregulamentação e não substitui o CDC (art. 36 exige publicidade facilmente identificável).

### 3.6 Padrões nacionais para copiar (lista consolidada do relatório)

1. Resposta rápida nas 2 primeiras linhas abaixo do H1, nomeando o vencedor e 2-3 alternativas por perfil ("O melhor X custo-benefício é o Y. Para quem mora sozinho, Z; para famílias grandes, W") — RevisaLar, Casa dos Eletrodomésticos e Buskando fazem isso e ranqueiam acima de quem não faz.
2. Título com número + intenção + ano, e variação com mês para listas voláteis.
3. Sumário com âncoras ("Vá direto ao que você procura" / "Neste guia") cobrindo tabela, cada produto, critérios, FAQ e metodologia.
4. Tabela comparativa logo após a resposta rápida com 4-6 colunas realmente discriminantes por categoria (air fryer: litros, potência, formato cesto/forno, painel, voltagens, garantia; fone: tipo, ANC, bateria total, codec).
5. Bloco por produto: "selo de categoria → nome → botão → 2-3 parágrafos → ficha técnica em pares rótulo/valor → Prós/Contras → Para quem é / Para quem não é → veredito de 1 frase".
6. Selos editoriais específicos e honestos: "Escolha do Editor", "O Mais Barato", "Maior Rede de Assistência", "Melhor Equilíbrio", "Mais Silenciosa", "Para famílias grandes".
7. Contras reais extraídos de avaliações de compradores e Reclame Aqui — **observando a restrição da Amazon sobre exibir avaliações de clientes sem API (seção 6)**.
8. Medições próprias quando houver produto em mãos: ruído em dB a 1,5 m, consumo em kWh e custo mensal em R$, temperatura externa, tempo de preparo de alimentos brasileiros (coxinha, pão de queijo).
9. Seção "Armadilhas dos anúncios" (Buskando).
10. Botão de compra por voltagem sem preço estático — "Ver preço na Amazon (127V)" / "(220V)".
11. Histórico/contexto de preço em vez de preço fixo (Oficina da Net; Buscapé "média de 40 dias"); quando mostrar valor, "Preço de referência" + "*Preço sujeito a alteração pela loja" ou faixa.
12. FAQ com perguntas no formato de busca real em H3 — o relatório sugeria FAQPage, mas o rich result foi descontinuado (ver seção 4); manter as perguntas como texto.
13. Blocos E-E-A-T: "Quem fez este guia", "Por que confiar em nós", "Como comparamos", "Transparência editorial", bio com cargo e LinkedIn, FAQ institucional honesta ("Nem sempre realizamos testes físicos").
14. "Histórico de atualizações" no fim do artigo e revisão datada ("Atualizado: 09/09/2026", "revisado por").
15. Guias de escolha por perfil/uso dentro do artigo (H2 "Headphone vs intra-auricular", "Quantos litros deve ter uma air fryer?" com tabela litragem x uso) e links internos para reviews e comparativos.
16. Reviews individuais com title "[Modelo] é boa? - Review" ou "Review [Modelo]: [benefício]", H2 "Concorrentes diretos" e H2 final "[Modelo] vale a pena?".
17. Comparativos de 2 produtos com título "X vs Y 2026: qual [verbo]?" e veredito por perfil.
18. Disclosure dupla: frase oficial da Amazon no topo + rótulo "Link de afiliado" junto a cada botão + página "Transparência editorial".
19. Conteúdo de dor/problema: "o que causa → o que procurar (critério brasileiro) → produtos → quando procurar médico", com aviso "Este conteúdo não substitui avaliação médica".
20. Agrupar listas por capacidade/orçamento/perfil e criar páginas-irmãs "Melhor X até R$ N".

### 3.7 Recomendações nacionais específicas para o Review Produtos

- **Três templates de título com ano e número:** Lista → "Melhor [produto] 2026: os N melhores [para perfil/custo-benefício]" (+ variante mensal "N [produtos] que valem a pena em [mês] de 2026" para categorias voláteis); Review → "[Marca Modelo] é bom? Review completo: vale a pena em 2026?"; Comparativo → "[A] vs [B]: qual [produto] vale mais a pena em 2026?". Páginas-irmãs "Melhor [produto] até R$ 300/500/1.000" e "Melhor [produto] para [dor/uso]".
- **Estrutura fixa de lista (componentes Astro):** H1 → meta (autor, revisor, publicado, atualizado, tempo de leitura) → Resposta rápida (vencedor + 2-3 alternativas por perfil, com botões) → Aviso de transparência (frase oficial Amazon) → Sumário com âncoras → Tabela comparativa (4-6 colunas + coluna "Para quem") → Blocos por produto → "Como escolher" (critérios brasileiros) → "Armadilhas dos anúncios" → "Como montamos esta lista" → FAQ → "Quem fez este guia" → Histórico de atualizações → Artigos relacionados.
- **Bloco por produto padronizado:** selo → H2/H3 "N. Marca Modelo" → imagem (própria ou da Amazon via API, nunca de outro modelo) → botões "Ver preço na Amazon" por voltagem com rótulo "Link de afiliado" → "Para quem é / Para quem não é" → ficha técnica (litros, potência, voltagens, garantia, dimensões, código do modelo) → Prós/Contras → veredito de 1 frase. (O relatório sugeria exibir "nota Amazon + nº de avaliações" e "O que dizem as avaliações"; a seção 6 mostra que isso só é permitido via Creators API.)
- **Política de preço:** nunca gravar preço estático no HTML do artigo; usar faixa ("entre R$ 230 e R$ 300") ou "Preço de referência em [data]" com asterisco e, quando a API estiver disponível, preço dinâmico com timestamp. Módulo próprio "Preço de referência / Menor preço visto / Média 40 dias" alimentado por coletas diárias — **desde que via API, não scraping (seção 6)**.
- **Disclosure em 3 camadas:** (1) topo do artigo, antes do primeiro link; (2) micro-rótulo "Link de afiliado" ou "Publicidade" junto a cada botão; (3) página /transparencia-editorial com metodologia, "Como comparamos" e política de testes. `rel="sponsored nofollow"` em todos os links.
- **Honestidade de metodologia:** "Como montamos esta lista" dizendo exatamente o que foi feito ("Analisamos 40 anúncios na Amazon.com.br, lemos as avaliações de 1 a 3 estrelas, conferimos notas no Reclame Aqui e os manuais em PDF; não testamos fisicamente os modelos marcados com [ícone]"). Quando testar, publicar medições e fotos originais com data.
- **Voltagem como dado de primeira classe:** campo "voltagens" com ASIN por voltagem, botão por tensão, aviso "Confira a voltagem da sua região (127V/220V) antes de comprar" em toda lista de eletro.
- **Template "Guia de problema"** para topo/meio: H2 "Por que [dor] acontece", "O que procurar em um [produto] para [dor]" (NR17, D33/D45, Inmetro, FPS), "Produtos que ajudam" (3-5 itens), "Quando procurar um profissional", disclaimer fixo. Priorizar dores com produto não-medicamentoso (costas/dirigir, pescoço/travesseiro, home office/cadeira, ronco/travesseiro, bebê/sono); evitar ouvido e garganta.
- **Validação automática no pipeline:** nº de produtos no título = nº de blocos; ano no título = ano atual; nenhum placeholder ("%", "{{", "em é"); toda imagem bate com ASIN; todo link tem tag e voltagem; "Atualizado" ≥ "Publicado"; FAQ com 4-7 perguntas; disclosure acima da dobra; schema válido.
- **E-E-A-T visível:** página de autor com foto, cargo ("Analista de produtos"), especialidade, LinkedIn; "Quem fez este guia" com autor + revisor; FAQ institucional ("Vocês testam todos os produtos?", "Como ganham dinheiro?"); "Revisado em [data]" no topo.
- **Hubs por categoria com filtros** (capacidade, faixa de preço, voltagem, perfil) e comparador "A vs B" gerado a partir do schema de produtos.
- **Linguagem:** PT-BR direto, segunda pessoa ("você"), termos nativos, CTAs "Ver preço na Amazon" (não "Comprar"), sem anglicismos como "top picks".
- **Canais complementares:** canal de ofertas no WhatsApp/Telegram (Achados do TB tem 100 mil seguidores) e listas sazonais "N [produtos] com desconto no Prime Day/Black Friday 2026" — sempre com disclosure, sem prometer "menor preço histórico" sem dado e respeitando as regras de e-mail/DM solicitados da Amazon (seção 6).

---
## 4. O que o Google exige de reviews e sites de afiliados

Fonte: `google-reviews-seo.json`, com complementos de `keyword-funnel.json` e `adsense.json`. Pesquisa feita diretamente nas páginas oficiais do Google Search Central (datas de atualização entre dez/2025 e out/2026), no painel de status de atualizações e em cobertura especializada de 2025-2026.

### 4.1 Reviews System e as 14 práticas oficiais

- [ ] **Reviews System continua ativo**, é "melhorado em ritmo regular e contínuo" sem anúncios, avalia conteúdo first-party (artigos que recomendam, opinam ou analisam), não reviews de usuários; avalia "primariamente por página", mas em sites com quantidade substancial de reviews "qualquer conteúdo do site pode ser avaliado"; português está na lista de idiomas suportados; Product structured data "pode ajudar" a identificar páginas de review, mas o sistema não depende dele. Aplica-se a reviews individuais, comparativos e listas ranqueadas. Última atualização da página: 2025-12-10. → https://developers.google.com/search/docs/appearance/reviews-system
- [ ] **"Write high quality reviews"** (atualizada 2025-12-10) — 14 práticas: avaliar da perspectiva do usuário; demonstrar conhecimento; "fornecer evidências como imagens, áudio ou outros links da sua própria experiência"; compartilhar medições quantitativas; explicar o que diferencia dos concorrentes; cobrir alternativas comparáveis e para quem cada uma serve; discutir benefícios e desvantagens "com base em pesquisa própria"; descrever evolução vs. modelos anteriores; focar nos fatores de decisão mais importantes; descrever escolhas de design e seu efeito além do que o fabricante diz; incluir links para outros recursos úteis; "considerar incluir links para múltiplos vendedores"; ao eleger "melhor", explicar o porquê com evidência em primeira mão; garantir que listas ranqueadas tenham conteúdo suficiente para "se sustentarem sozinhas". Fecha com "foque na qualidade e originalidade, não no tamanho". → https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews (versão pt-br: https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews?hl=pt-br)
- [ ] Nenhuma "reviews update" nomeada desde 2023 — o sistema roda embutido nos core updates.

### 4.2 Conteúdo útil, E-E-A-T e autor real

- [ ] **Guia "Creating helpful, reliable, people-first content"** (atualizado 2026-10-05) aplica o framework "Quem, Como, Por quê": byline que leve a página de autor com background; para reviews, o leitor se beneficia de saber "o número de produtos testados, quais foram os resultados dos testes" e como foram feitos, com fotos como evidência; "o uso de automação, incluindo geração por IA, deve ser autoevidente aos visitantes por meio de disclosures ou de outras formas"; **"fabricar perfis de criadores" (headshots gerados por IA, credenciais falsas) é engano**; "confiança é o aspecto mais importante" de E-E-A-T; conteúdo atrás de abas conta como conteúdo principal; "atribuição a outras fontes não substitui a necessidade de esforço original". → https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- [ ] **Byline genérica ("Equipe", "Redação") ou autor inventado** fere o "Quem" e é o exemplo de violação da política de site reputation ("nem autor nem editor responsável identificados").
- [ ] **Página de autor real** para cada byline, com foto verdadeira, biografia, áreas que cobre e links externos (sameAs), e `Article.author.url` apontando para ela.

### 4.3 IA generativa

- [ ] **Orientação oficial (atualizada 2026-10-01):** "É crítico checar manualmente os fatos e revisar todo conteúdo gerado por IA quanto a precisão e confiabilidade" antes de publicar; a mesma revisão vale para "elementos title, meta descriptions, dados estruturados e alt text de imagens"; recomenda "considerar adicionar informação sobre como seu conteúdo foi criado"; remete às seções 4.6.5 (scaled content abuse) e 4.6.6 (conteúdo principal criado com pouco esforço/originalidade/valor) das Quality Rater Guidelines; para Merchant Center, imagens geradas por IA precisam do IPTC DigitalSourceType TrainedAlgorithmicMedia. → https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- [ ] **Quality Rater Guidelines** (edição de 11/set/2025; nenhuma edição 2026 confirmada) `[confiança média]`: nota Lowest obrigatória quando "todo ou quase todo o conteúdo principal é copiado, parafraseado, embutido ou repostado com pouco ou nenhum esforço, originalidade e valor adicionado"; o uso de IA "por si só não determina" o nível de esforço; avaliadores devem dar Lowest se, após ver várias páginas, "suspeitarem fortemente" de scaled content abuse. → https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf
- [ ] IA não é proibida; o problema é escala sem valor. Dados de terceiros `[confiança média]`: correlação uso de IA x queda ≈ 0,011 no core update de março/2026.

### 4.4 Políticas de spam

- [ ] **Scaled content abuse** (página atualizada 2026-08-28): "muitas páginas geradas com o propósito primário de manipular rankings", foco em "grandes quantidades de conteúdo não original que fornece pouco ou nenhum valor, **não importa como foi criado**"; exemplo explícito: "usar ferramentas de IA generativa ou similares para gerar muitas páginas sem adicionar valor para os usuários". Não existe limite numérico oficial; o gatilho é escala + baixo esforço + baixa originalidade + pouco valor. Criar páginas separadas para cada variação de consulta ("melhor X barato", "melhor X custo-benefício", "melhor X 2026") com conteúdo quase igual também se enquadra. → https://developers.google.com/search/docs/essentials/spam-policies (pt-br: https://developers.google.com/search/docs/essentials/spam-policies?hl=pt-br)
- [ ] **Thin affiliation:** conteúdo com links de afiliado em que descrições e reviews são "copiados diretamente do comerciante original", ou páginas "cookie-cutter" distribuídas por uma rede. Textualmente: **"nem todo site que participa de um programa de afiliados é um thin affiliate"**; "Good affiliate sites add value by offering meaningful content or features" (preços adicionais, reviews originais, testes rigorosos, navegação por categoria, comparações). John Mueller: "a quantidade de links de afiliado em um site é totalmente irrelevante" — o que importa é se a página tem conteúdo útil.
- [ ] **Expired domain abuse:** exemplo oficial "conteúdo de afiliado em site antes usado por órgão governamental" — não comprar domínio expirado para o projeto.
- [ ] **Site reputation** (renomeada de "site reputation abuse" em ago/2026): mira conteúdo de terceiros publicado para explorar sinais do host. Quatro fatores: Apresentação, Qualidade, **Autoria** ("há reconhecimento explícito de propriedade ou responsabilidade pelo conteúdo?") e Duplicação. Exemplo de NÃO violação: conteúdo de afiliado de freelancer editado, atribuído e adaptado. Exemplo de violação: artigo sem autor/editor identificado, sem disclosure comercial, fora da navegação e copiado de marketplace. Desde 30/ago/2026 não há impacto de ação manual no EEE, mas "para usuários fora do EEE, uma ação manual afetará diretamente os resultados" — **continua valendo no Brasil**. → https://www.searchenginejournal.com/google-updates-site-reputation-abuse-policy-removes-penalties-in-eea/587423/
- [ ] **John Mueller (6/out/2026)** sobre grande agregador de produtos (1,17 M de rastreamentos e 4 URLs indexadas): "convencer os buscadores de que isso vale a pena, convencer os usuários de que isso é valioso, será difícil" — programmatic SEO de produto em escala é visto com ceticismo. `[confiança média]` → https://www.seroundtable.com/google-seo-large-product-aggregator-42232.html

### 4.5 Links de afiliado: rel="sponsored"

- [ ] A doc "Qualify your outbound links" manda usar `rel="sponsored"` para "anúncios ou colocações pagas" (nofollow "ainda é aceitável, mas sponsored é preferido"); valores podem ser combinados (`rel="sponsored nofollow"`). → https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
- [ ] O anúncio de 2019 define sponsored para links "criados como parte de anúncios, patrocínios ou outros acordos de compensação" e diz: "se quiser evitar uma possível ação por link scheme, use rel=sponsored ou rel=nofollow"; os atributos são "hints". → https://developers.google.com/search/blog/2019/09/evolving-nofollow-new-ways-to-identify
- [ ] Não há penalidade manual por link de afiliado sem marcação quando não parece venda de links, mas é prática fortemente recomendada.
- [ ] Recomendação consolidada: `rel="sponsored noopener"` (opcional nofollow), `target=_blank`, texto âncora descritivo ("Ver preço na Amazon"), link para segundo vendedor quando existir.

### 4.6 Dados estruturados — o que ainda rende e o que não rende

| Tipo | Situação em out/2026 | Regras | Link oficial |
|---|---|---|---|
| **Product + Review (snippet de produto)** | Rende. Páginas de review que NÃO vendem o produto podem usar Product. | Exige `name` + pelo menos um de `review`, `aggregateRating` ou `offers`; **prós e contras (`Review.positiveNotes` / `negativeNotes` como ItemList, mínimo 2 afirmações) são exclusivos de "páginas de review editorial de produto"** e estão disponíveis em português; autor do Review deve ser Person ou Team com nome válido; Google recomenda marcar páginas de produto único e não listas/categorias; markup via JavaScript torna o rastreamento menos confiável; com ação manual o markup é ignorado. | https://developers.google.com/search/docs/appearance/structured-data/product-snippet (pt-br: https://developers.google.com/search/docs/appearance/structured-data/product-snippet?hl=pt-br) |
| **Review snippet** | Rende, com restrições. Doc atualizada 2026-09-08. | "O nome do avaliador deve ser um nome válido"; review sobre "um item específico, não uma categoria ou lista de itens"; "avaliações devem vir diretamente de usuários" e **"não agregue avaliações de outros sites"** (não copiar estrelas da Amazon); aggregateRating e reviews visíveis na página; self-serving (Organization/LocalBusiness) não ganha estrelas; **nova regra de jul/2026: "Não inclua reviews falsos ou incentivados sem disclosure na sua página ou no markup"** — reviews "não baseados em experiência genuína" ou "em troca de benefício (dinheiro, descontos, vouchers ou produtos grátis)" sem disclosure "claro e proeminente" podem gerar ação manual; jan/2025: aceitar só notas com comentário e nome; nov/2025: aninhamento claro. | https://developers.google.com/search/docs/appearance/structured-data/review-snippet ; https://www.searchenginejournal.com/google-expands-review-guidelines-and-warns-of-manual-actions/583674/ |
| **FAQPage** | **Descontinuado.** Changelog de 8/mai/2026 ("deixará de aparecer a partir de 7 de maio de 2026") e 15/jun/2026 ("documentação removida"). | Manter não prejudica, mas não rende nada; FAQs continuam úteis como conteúdo visível (PAA, AI Overviews). | https://developers.google.com/search/updates ; https://developers.google.com/search/docs/appearance/structured-data/faqpage |
| **HowTo** | Saiu em 2023. | — | https://developers.google.com/search/updates |
| **ItemList / carrossel** | Não suporta Product. | Tipos suportados: Course, Movie, Recipe e Restaurant. Listas "os N melhores" não ganham carrossel; manter só por semântica. Guidelines: itens do mesmo tipo, lista completa, URLs do mesmo domínio. | https://developers.google.com/search/docs/appearance/structured-data/carousel |
| **Article / BlogPosting** | Rende (doc 2026-09-08). | author (Person com name e url para perfil, ou sameAs), datePublished, dateModified (com fuso horário), headline, image em 16x9, 4x3 e 1x1 com ≥50 mil pixels; cada autor em campo separado. Mar/2026: Google usa schema.org e og:image para a imagem representativa em Search e Discover; evitar logos, imagens com texto e proporções extremas. | https://developers.google.com/search/docs/appearance/structured-data/article |
| **BreadcrumbList** | Rende, só desktop desde jan/2025. | itemListElement com ≥2 ListItem, position, name, item; trilha reflete caminho do usuário. | https://developers.google.com/search/docs/appearance/structured-data/breadcrumb |
| **Organization** | Rende. | Na home ou "Sobre"; logo ≥112x112; name, url, logo, sameAs, description, foundingDate, contactPoint/email, address. | (caminho citado no relatório: developers.google.com/search/docs/appearance/structured-data/organization) |
| **Diretrizes gerais** (2026-07-10) | — | "Não marque conteúdo que não está visível aos leitores"; "representação fiel do conteúdo da página"; "não marque conteúdo irrelevante ou enganoso, como reviews falsos"; JSON-LD recomendado; ação manual de dados estruturados tira a elegibilidade a rich results (não afeta ranking web). | https://developers.google.com/search/docs/appearance/structured-data/sd-policies |
| Outros removidos em 2025 | Course info, Estimated salary, Learning video, Special announcement, Vehicle listing, ClaimReview, Book actions, Dataset (só Dataset Search), Practice problem. | — | https://developers.google.com/search/updates |

**Aplicação por tipo de página (recomendação do relatório):**
- **Review individual:** Product (name, image, brand, description, sku/gtin se houver) com `review` (Review: author Person, datePublished, reviewRating ratingValue/bestRating/worstRating, reviewBody, positiveNotes e negativeNotes com ≥2 itens) — nota e prós/contras visíveis; `offers` só se o preço exibido for atualizado automaticamente e com priceValidUntil; **NÃO usar aggregateRating** a menos que haja avaliações de leitores coletadas no próprio site com comentário + nome.
- **Comparativo (2 produtos):** Article + dois Product aninhados, cada um com seu Review (não um Review para o par).
- **Lista "os N melhores":** Article + ItemList apenas semântico; opcionalmente Product+Review por item se cada item tiver avaliação editorial própria visível.
- Validar no Rich Results Test e revisar manualmente o JSON gerado por IA.

### 4.7 Page experience, Core Web Vitals e anúncios

- [ ] **Core Web Vitals** (2025-12-10): LCP nos primeiros 2,5 s, INP abaixo de 200 ms, CLS abaixo de 0,1; atingir "good" é "altamente recomendado para sucesso na Busca". → https://developers.google.com/search/docs/appearance/core-web-vitals
- [ ] **Page experience** (2026-09-22): "não há um único sinal de page experience"; CWV é o aspecto usado pelos sistemas de ranking; autoavaliação inclui HTTPS, mobile, "evitar quantidade excessiva de anúncios que distraem ou interferem no conteúdo principal", evitar interstitials intrusivos e distinguir conteúdo principal do resto. Interstitials: evitar overlays de página inteira; banners pequenos; age gates isentos. → https://developers.google.com/search/docs/appearance/page-experience
- [ ] **CrUX ad metrics** (Chrome, 15/set/2026) `[confiança média]`: Ad Count, Ad Density, Ad Weight CPU e Network em janela de 28 dias — experimental, "não faz parte dos Core Web Vitals", sem thresholds, mas sinaliza que o Google passa a medir densidade/peso de anúncios em campo. → https://developer.chrome.com/blog/crux-ad-metrics
- [ ] Dado de terceiros (`keyword-funnel.json`) `[confiança média]`: core update de dezembro/2025 associou LCP > 3 s e INP > 300 ms a perdas maiores; Raptive sugere densidade de anúncios ≤20% desktop / ≤24% mobile.
- [ ] Medir por dados de campo (CrUX / Search Console), não só Lighthouse.

### 4.8 Imagens, lazy loading, paginação, canonical, sitemaps e títulos

- [ ] **Imagens** (doc 2026-03-02): usar `<img>` HTML (CSS background não é indexado); alt "descritivo e em contexto" — alt cheio de palavras-chave é keyword stuffing e pode ser tratado como spam; nomes de arquivo curtos; srcset/`<picture>` sempre com src fallback; WebP e AVIF suportados; imagem representativa via og:image/primaryImageOfPage. → https://developers.google.com/search/docs/appearance/google-images
- [ ] **Lazy loading** (2025-12-10): "não adicione lazy-loading a conteúdo que provavelmente está visível imediatamente"; usar loading nativo ou IntersectionObserver, nunca scroll/click; conferir no HTML renderizado da Inspeção de URL. (caminho citado: developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading)
- [ ] **Paginação** (2025-12-10): cada página com URL única (?page=2), ligadas com `<a href>`; "não use a primeira página da sequência como canonical" das demais; "Google não usa mais" rel=next/prev; não usar fragmentos (#); variantes filtradas/ordenadas podem receber noindex; "carregar mais"/scroll infinito precisam de URLs paginadas equivalentes. → https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading
- [ ] **Canonical** (2026-07-10): redirects e rel=canonical são sinais fortes, sitemap é fraco; URLs absolutas; canonical autorreferente; não usar robots.txt nem noindex para canonicalização; canonical fora do `<head>` é ignorado; links internos consistentes; parâmetros de rastreamento (gclid) consolidados. (caminho citado: developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [ ] **Sitemaps** (2026-07-08): 50 MB/50.000 URLs por arquivo, sitemap index permitido; lastmod só é usado se "consistente e verificavelmente" preciso (mudar ano de copyright não conta); priority e changefreq são ignorados; URLs absolutas e canônicas; UTF-8; enviar via Search Console e linha `Sitemap:` no robots.txt. → https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- [ ] **Title links** (2025-12-10): `<title>` único, descritivo e conciso; evitar boilerplate, keyword stuffing e títulos desatualizados (datas); marca concisa no início ou fim; H1 visível deve ser o título principal; Google reescreve títulos "meio vazios", obsoletos ou duplicados. → https://developers.google.com/search/docs/appearance/title-link
- [ ] **Datas:** exibir "Publicado"/"Última atualização" visíveis e iguais a datePublished/dateModified; não usar datas futuras ou artificiais; mudar só a data não ajuda.
- [ ] **Core updates** (2025-12-10): há "core updates menores" não anunciados; recuperação "pode levar vários meses"; autoavaliar o site inteiro. (caminho citado: developers.google.com/search/docs/appearance/core-updates)

### 4.9 Discover

- [ ] Elegibilidade automática para conteúdo indexado que cumpra as políticas; sem markup especial; imagens "de pelo menos 1200 px de largura", >300 mil pixels, 16:9, com `max-image-preview:large` e og:image; evitar clickbait, títulos que omitem informação, sensacionalismo; tráfego "menos previsível e confiável" — tratar como suplementar. → https://developers.google.com/search/docs/appearance/google-discover
- [ ] **Discover core update** de 5/fev/2026 (concluído 27/fev): mais conteúdo local do país do usuário, menos clickbait, expertise avaliada "tópico a tópico" (site de reviews de filmes com um artigo de jardinagem não é expert em jardinagem); começou para inglês/EUA "e expandirá a todos os países e idiomas nos próximos meses". → https://developers.google.com/search/blog/2026/02/discover-core-update
- [ ] Recurso Follow/RSS removido da doc em nov/2025; Discover no desktop deixou de aparecer em set/2026 sem anúncio oficial; resumos por IA no Discover em testes (EUA, Coreia, Índia).
- [ ] Implicação para o pipeline: limitar artigos por categoria por semana para construir expertise por tópico.

### 4.10 AI Overviews, AI Mode e Preferred Sources

- [ ] **"AI features and your site"** (2025-12-10): "não há requisitos adicionais nem otimizações especiais"; a página precisa estar indexada e "elegível a aparecer com snippet"; controles nosnippet, data-nosnippet, max-snippet e noindex; dados estruturados devem bater com o texto visível; cliques de AIO contam no tipo "Web" do Search Console (AI Mode incluído desde jun/2025); há "Generative AI performance report". → https://developers.google.com/search/docs/appearance/ai-features
- [ ] **"Optimizing for generative AI"** (mai/2026, atualizado 2026-07-10): conteúdo "único, atraente e útil" com ponto de vista próprio é o que mais importa; criar páginas separadas para cada variação de consulta "primariamente para manipular rankings ou respostas de IA" viola scaled content abuse; "não há tamanho ideal de página"; **llms.txt, chunking, markdown, markup "especial" e menções inautênticas não ajudam**; dados estruturados "não são exigidos para IA generativa" mas devem continuar para rich results; apoiar texto com imagens e vídeos relevantes; desconfiar de ferramentas que prometem acesso a métricas internas. Políticas de spam cobrem tentativas de manipular "respostas de IA generativa na Busca" (15/mai/2026). → https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- [ ] **Preferred Sources** (doc 2026-09-18) `[confiança média]`: usuários podem marcar um site como fonte preferida; selo em Top Stories e, desde mai/2026, em AI Overviews/AI Mode; só domínios/subdomínios são elegíveis (não /blog); o site precisa estar incluído em "Search generative AI features" no Search Console; botão JS opcional. → https://developers.google.com/search/docs/appearance/preferred-sources
- [ ] **Impacto medido (terceiros, com interesse comercial)** `[confiança média]`: Pew Research via impact.com — CTR ~8% com AI Overview vs ~15% sem; queries "melhor X para Y", "X vs Y" e "top 10 X" são as de maior compressão de cliques; AI Mode agrega conteúdo de vários afiliados em uma resposta. Google respondeu em 6/mai/2026 com links inline, seção "Further Exploration", previews ao passar o mouse e rótulos de assinatura. No Brasil (Authoritas/Cade, 13/11/2025): AIO em 35,3% das buscas de notícias, CTR da 1ª posição de 21,4% para 8,93%, perda de ~58% dos visitantes esperados pelo 1º colocado. Raptive: resultados com AIO têm CTR 30-50% menor; sites que perderam tinham >13% de páginas com <500 palavras; vencedores tinham média ~1.400 palavras, marca forte e páginas atualizadas (prioridade: páginas sem atualização há 20 meses); desde ago/2026 AIO expande para resposta estilo Modo IA. → https://www.affiversemedia.com/googles-march-2026-core-update-hit-affiliate-sites-harder-than-any-other-category/ ; https://impact.com/affiliate/googles-new-ai-overview-feature-can-affect-product-review-sites/ ; https://conjur.com.br/2025-nov-28/recurso-de-ia-nas-buscas-do-google-reduz-trafego-de-sites-de-noticias-em-206/

### 4.11 Calendário oficial de atualizações 2025-2026

Search Status Dashboard → https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history

| Data | Atualização | Duração |
|---|---|---|
| Mar/2025 | core | 13 dias |
| Jun/2025 | core | 16 dias |
| Ago/2025 | spam | 26 dias |
| Dez/2025 | core (aplicou E-E-A-T a reviews de e-commerce, segundo terceiros) | 18 dias |
| Fev/2026 | Discover update | 21 dias |
| Mar/2026 | spam (24-25/03) | 19 h |
| Mar/2026 | core (27/03 a 08/04) | 12 dias |
| Mai/2026 | core (21/05 a 02/06) | 11 dias |
| Jun/2026 | spam | 2 dias |
| Ago/2026 | spam | 2 dias |
| Set/2026 | spam (iniciado 24/set, em fases até início de out) | — |

Não fazer mudanças drásticas durante um rollout; comparar quedas com as datas antes de reagir.

### 4.12 AdSense e Busca estão acoplados

Google Publisher Policies proíbem veicular anúncios do Google em telas que violem as "Spam policies for Google web search"; proíbem "conteúdo replicado" (embutido ou copiado de terceiros sem comentário/curadoria adicional) e telas "sem conteúdo do publisher ou com conteúdo de baixo valor". Uma violação de spam na Busca coloca a monetização AdSense em risco simultâneo. Google Ads também desaprova anúncios para destinos removidos por ação manual desde dez/2024. → https://support.google.com/publisherpolicies/answer/10502938

### 4.13 Checklist consolidado (site, artigo, tipo de página, pipeline)

**Site — identidade e confiança**
- [ ] Página "Sobre" com Organization JSON-LD (name, url, logo ≥112x112, description, foundingDate, contactPoint/email, sameAs).
- [ ] Página "Metodologia de avaliação" (por categoria, com critérios, pesos, equipamentos e versão — "Metodologia v1.0 — out/2026").
- [ ] Página "Política de afiliados e publicidade" com o texto de disclosure da Amazon Associados.
- [ ] Página "Como usamos IA" (pesquisa assistida por IA + redação/edição humana + checagem).
- [ ] Página "Correções/Contato".
- [ ] Páginas de autor (Person/ProfilePage) com foto real, bio, credenciais e sameAs.

**Site — técnico**
- [ ] HTTPS com redirect HTTP→HTTPS; canonical absoluto e autorreferente em todas as páginas no `<head>`.
- [ ] Sitemap index com sitemaps por tipo (reviews, comparativos, listas, autores), lastmod só quando o conteúdo mudar, sem priority/changefreq, listado no robots.txt e enviado no Search Console.
- [ ] Breadcrumbs visíveis + BreadcrumbList; títulos únicos; `max-image-preview:large`; og:image/og:title em todas as páginas.
- [ ] Paginação ?page=n com `<a href>` e canonical próprio; filtros/ordenações com noindex; 404 reais para produtos removidos ou 301 para o substituto.

**Site — performance e ads**
- [ ] Metas LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1 em CrUX (campo).
- [ ] Imagem hero sem lazy-load, com width/height e preload; demais com loading=lazy nativo; WebP/AVIF com fallback; fontes self-hosted.
- [ ] Slots de anúncio com tamanho reservado; sem interstitials de página inteira; densidade moderada; AdSense só em páginas com conteúdo próprio substancial.

**Site — links de afiliado**
- [ ] Todos com `rel="sponsored noopener"` (opcional nofollow), target=_blank, âncora descritiva, disclosure no topo e no rodapé global; segundo vendedor quando existir; sem preço fixo em texto sem data/atualização automática.

**Por artigo (todos os tipos)**
1. Byline com autor real e link para perfil.
2. Datas de publicação e de atualização reais.
3. Disclosure de afiliado + nota "como este conteúdo foi produzido" (IA assistida, revisão humana por X).
4. Resumo/veredito no topo com nota e para quem é/não é.
5. Seção "Como avaliamos" com critérios e fontes.
6. Evidência própria: fotos/medições/testes — se não houve teste físico, dizer claramente que a análise é baseada em especificações, manual, testes de terceiros citados e padrões de reclamação, e agregar valor próprio (tabela comparativa, cálculo de custo por uso, checagem de voltagem/garantia/assistência no Brasil).
7. Prós e contras específicos (nunca "boa qualidade").
8. Comparação com 2-3 alternativas e cenários de uso.
9. O que mudou vs. modelo anterior, quando aplicável.
10. Links para recursos úteis (manual, reviews de outros sites, página do fabricante).
11. Imagem destaque própria 16:9 ≥1200 px com alt descritivo sem keyword stuffing.
12. Title único e H1 claro.
13. Checklist de fact-check assinado (voltagem, dimensões, capacidade, compatibilidades, preço-faixa).
14. Links internos para lista/comparativo/review relacionados e para a página de categoria.

**Listas "os N melhores":** explicar critério de seleção e ordem; cada item com mini-review (por que entrou, melhor para quem, 2-3 prós e 2-3 contras, faixa de preço); incluir "o que não recomendamos e por quê"; justificar "melhor geral" e "melhor custo-benefício" com evidência; uma lista canônica por intenção, atualizada no mesmo URL.

**Comparativos (A vs B):** tabela lado a lado, diferenças que importam na prática, cenários "escolha A se… / escolha B se…", veredito claro, links para os dois reviews, Review próprio para cada produto no markup.

**Topo/meio de funil (dor):** abrir pela dor e pelas causas (com fontes confiáveis quando houver saúde envolvida — YMYL exige mais E-E-A-T), critérios de escolha antes dos produtos, soluções não comerciais também, e só então 2-4 produtos com justificativa; sem promessa de cura.

**Pipeline de ~20 artigos/dia — governança anti-scaled content abuse**
- (a) cada artigo nasce de um briefing com dados verificados (especificações oficiais, manual, perguntas reais de compradores, reclamações recorrentes) e de uma tese editorial própria;
- (b) IA gera rascunho, mas um editor humano identificado edita, adiciona insight e assina a checagem (campo no CMS; exibir "Revisado por");
- (c) proibir publicação com notas genéricas, prós/contras vagos, trechos com >N% de similaridade com texto do fabricante/Amazon ou com outros artigos do site;
- (d) exigir ao menos um ativo original por artigo (foto, tabela calculada, medição, gráfico de custo);
- (e) limitar artigos por categoria por semana (expertise por tópico);
- (f) preferir atualizar um artigo existente a criar uma variação;
- (g) revisão mensal de páginas com baixo engajamento para melhorar, consolidar (301) ou remover;
- (h) começar com ritmo menor em domínio novo e escalar conforme o Search Console mostrar saúde.

**Monitoramento:** Search Console — Ações manuais, Core Web Vitals, Experiência na página, Dados estruturados, Performance com filtro de aparência "AI Overviews"/"AI Mode" e relatório de IA generativa, Discover separado; acompanhar conversões de afiliado por página além de cliques.

**Distribuição complementar:** habilitar o site em "Search generative AI features" no Search Console e considerar o botão de Preferred Sources; manter feed RSS/Atom mesmo sem o Follow do Discover; canais próprios (newsletter, YouTube com os testes, redes).

---

## 5. AdSense: requisitos, armadilhas e checklist de aprovação

Fonte: `adsense.json`. Pesquisa nas páginas oficiais do AdSense, Publisher Policies, Chrome/GPT, Astro e em casos brasileiros 2024-2026.

### 5.1 Requisitos oficiais de elegibilidade

- Ter 18+ anos (ou responsável), ter site próprio com acesso ao código HTML, conteúdo original "de alta qualidade, único e interessante" e conformidade prévia com as Políticas do Programa. **Não há menção oficial a idade mínima do domínio, tráfego mínimo, número de artigos ou páginas obrigatórias (Sobre/Contato).** → https://support.google.com/adsense/answer/9724
- Idiomas: português está na lista de suportados; colocar código em páginas majoritariamente em idioma não suportado viola as Publisher Policies. → https://support.google.com/adsense/answer/9727
- A regra de "possuir o site há 6 meses" é citada pelo Google apenas para publishers na China e Índia — não se aplica ao Brasil. → https://blog.google/products/adsense/how-to-address-insufficient-content/
- Política de privacidade com divulgações específicas sobre cookies de publicidade e opt-out é exigida (ver 5.5).

### 5.2 Motivos oficiais de reprovação e prazos

Página "Why your site was not approved" → https://support.google.com/adsense/answer/81904

1. **Conteúdo insuficiente/"under construction"** — páginas de teste só com o código não são aprovadas.
2. **Qualidade** — frases oficiais: *"Your site shouldn't participate in affiliate programs without adding sufficient value to users"* e *"Affiliate program content should form only a minor part of the content of your site if the content adds no additional features"*; *"Don't place the ad code on auto-generated pages or pages with little to no original content"*.
3. **Violações de política.**
4. **Navegação** — redirects, login, links quebrados, pop-ups excessivos, páginas inacabadas.
5. **Fontes de tráfego** — PTC, e-mail não solicitado.
6. **Idioma não suportado.**

"We may review all pages of your site, not just the sign-up URL".

Hub "What to do when your site is not ready to show ads" → https://support.google.com/adsense/answer/9061852 — 4 categorias: código ausente/incompleto; site inacessível (URL correta, publicado, sem senha, robots.txt não bloqueando Mediapartners-Google, certificado HTTPS válido de CA reconhecida, HTTP redirecionando para HTTPS); conteúdo único insuficiente/UX ruim; violações. Nova revisão: Sites > selecionar site > confirmar código > Request review. Prazo: "alguns dias", podendo chegar a 2-4 semanas; **não há período mínimo de espera entre pedidos**.

"Tips to make your site AdSense-ready" → https://support.google.com/adsense/answer/10015918 — conteúdo único suficiente para o Google entender o tema; "Provide content that gives your users a reason to visit and return"; atualizações regulares; evitar cloaking/doorway/páginas com pouco conteúdo; proibido conteúdo raspado/duplicado (incl. republicar com pequenas alterações); consolidar páginas similares e encurtar rodapés repetidos; navegação por tópico/categoria.

Outros prazos `[confiança média]`: conta desativada se não configurada em 6 meses; contas sem impressões por 6 meses também podem ser desativadas. → https://support.google.com/adsense/answer/7402256

### 5.3 Políticas em operação

- **Publisher Policies (valor de inventário):** proibidos anúncios em telas "without publisher-content or with low-value content", em construção, de alerta/navegação, com "replicated content" (copiado/embutido "without additional commentary, curation or otherwise adding value"), com "more ads than publisher content" e em idioma não suportado. → https://support.google.com/adsense/answer/10502938
- **"More ads or paid promotional material than publisher-content":** conteúdo do publisher = imagens, vídeos, jogos, texto do artigo e UGC gerenciado; **NÃO contam whitespace, header/footer e links para outras páginas do site**. O limite fixo de 3 anúncios por página foi removido; o Google avalia o equilíbrio e pode limitar/desativar veiculação ("Valuable inventory"). → https://support.google.com/publisherpolicies/answer/11169917
- **Posicionamento:** só rótulos "Anúncios"/"Links patrocinados" (nunca "Recursos", "Links úteis"); proibido associar imagens a anúncios, setas/animações, anúncios perto de menus/botões/players/dropdowns (cliques acidentais mesmo não intencionais geram violação), anúncios em pop-ups/pop-unders, e-mails, software, iframes, páginas que recarregam sozinhas, anúncios que abrem em nova janela; sites com >3 pop-ups são inelegíveis; anúncios não podem ficar em páginas sem conteúdo (404, obrigado, login). → https://support.google.com/adsense/answer/1346295
- **"Ads interfering":** proibidos anúncios que sobrepõem ou ficam adjacentes a itens de navegação/ação, que cobrem conteúdo ou o empurram para fora da tela, em telas "dead end", ou anúncio sobre anúncio. Sticky/anchor não são proibidos per se, mas não podem cobrir conteúdo.
- **Better Ads Standards (mobile):** violações incluem densidade de anúncios >30% da altura do conteúdo principal (header/footer/comentários excluídos; sticky e inline incluídos), sticky grande (>30% da tela), pop-ups/prestitials, vídeo autoplay com som, animações piscantes, poststitial com contagem. → https://support.google.com/webtools/answer/7073774
- **Publisher Restrictions** (conteúdo "restrito" = menos demanda, não violação): facas "táticas"/canivetes automáticos, acessórios de armas, tabaco e vapes, venda online de álcool, suplementos com ingredientes farmacêuticos/perigosos e suplementos sexuais, parafernália para drogas. → https://support.google.com/adsense/answer/10437795
- **Program policies** (cliques inválidos, posicionamento, rótulos, privacidade) → https://support.google.com/adsense/answer/48182

### 5.4 ads.txt e verificação do site

- **ads.txt:** "not mandatory, but highly recommended". Linha: `google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0` no diretório raiz (exemplo.com/ads.txt). O crawl começa no domínio raiz (apex); exemplo.com/ads.txt pode redirecionar para www.exemplo.com/ads.txt (múltiplos redirects só dentro do mesmo domínio raiz; 1 redirect externo). Subdomínio só precisa de `subdomain=` se o publisher ID for diferente. Alterações levam alguns dias (até 1 mês em sites com pouco tráfego); botão "Check for updates" e data "last crawled". → https://support.google.com/adsense/answer/12171612
- **Verificação de propriedade** (tempo real desde set/2023), 3 métodos: (a) snippet `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX" crossorigin="anonymous"></script>` no `<head>` de todas as páginas com anúncios; (b) linha no ads.txt; (c) `<meta name="google-adsense-account" content="ca-pub-XXXX">` no `<head>` (útil se não quiser anúncios na home). Status "Requires review" → "Ready"; checagens de alguns dias até 2-4 semanas. Também via Search Console. → https://support.google.com/adsense/answer/12169212

### 5.5 Privacidade: política, CMP (EEE) e LGPD/ANPD

**Política de privacidade — conteúdo exigido** → https://support.google.com/adsense/answer/1348695
- Informar que "Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites";
- que os cookies de publicidade do Google permitem anúncios com base em visitas ao seu site e a outros sites;
- que o usuário pode desativar anúncios personalizados em Ads Settings (google.com/settings/ads) ou aboutads.info;
- listar fornecedores/redes terceiros (com links) se não desativados.
- O Google não fornece texto modelo. Publisher Policies ("Privacy disclosures"): divulgar que terceiros podem gravar/ler cookies, web beacons e IPs; link opcional para "How Google uses information from sites or apps that use our services" (policies.google.com/technologies/partner-sites).

**EEE / Reino Unido / Suíça** → https://support.google.com/adsense/answer/13554116
- Desde 16/01/2024 (EEE/UK) e 31/07/2024 (CH) é obrigatório usar CMP certificada pelo Google e integrada ao IAB TCF para anúncios personalizados; sem CMP, só anúncios não personalizados/limitados. **A EU User Consent Policy é acionada pela localização do USUÁRIO, não do publisher** — um site brasileiro com visitantes europeus está em escopo. CMP gratuita do Google ("Privacy & messaging" > "European regulations", TCF CMP ID 300). Requisitos adicionais: registrar consentimentos, instruções de revogação, identificar cada parte que recebe dados.
- **TCF v2.3** obrigatório para novas TC strings a partir de 28/02-01/03/2026 (erro TCF 1.4 para "disclosed vendors"); strings v2.2 novas são rejeitadas e podem resultar em "Limited Ads". Quem usa a CMP do Google não precisou agir. → https://support.google.com/admanager/answer/9805023
- **Anúncios não personalizados (NPA)** ainda usam cookies para frequency capping e relatórios agregados; onde a lei exige consentimento para cookies, NPA não dispensa consentimento. → https://support.google.com/adsense/answer/9007336

**LGPD / Brasil**
- AdSense: desde 13/08/2020 a veiculação para tráfego brasileiro é restrita a fornecedores de ad tech certificados para a LGPD (lista pública); Google recomenda linkar "How Google uses information…" na política de privacidade; oferece anúncios não personalizados para o Brasil e sinalização de usuários abaixo da idade de consentimento. **O AdSense NÃO impõe banner de consentimento para usuários brasileiros**, mas diz que o publisher "may have other LGPD obligations". → https://support.google.com/adsense/answer/9928203
- **Guia Orientativo ANPD "Cookies e Proteção de Dados Pessoais"** (out/2022; modificado em 23/01/2025; nenhuma nova versão até out/2026): cookies de publicidade são "não necessários"; "o legítimo interesse dificilmente será a hipótese legal mais apropriada" para publicidade comportamental → consentimento é a base recomendada. Boas práticas: 1º nível com botão "Rejeitar cookies não necessários" com o mesmo destaque que "Aceitar", link para exercício de direitos; 2º nível com categorias, finalidades e consentimento por finalidade, "Desativar cookies baseados no consentimento por padrão"; informar bloqueio via navegador. Evitar: botão único ("concordo/ciente"), destacar só o aceite, pré-marcados, sem 2º nível, informações só em idioma estrangeiro, granularidade excessiva, condicionar acesso ao aceite. Política de Cookies pode ser seção da Política de Privacidade, página separada ou dentro do banner, desde que contenha finalidades, retenção, compartilhamento (art. 9º LGPD). O controlador deve registrar e comprovar o consentimento. → https://www.gov.br/anpd/pt-br/documentos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf

### 5.6 Mudanças 2025-2026 na Privacy & messaging e Auto ads

Announcements oficiais → https://support.google.com/adsense/announcements/9189068

| Data | Mudança |
|---|---|
| 30/01/2025 | Botão "não consentir" configurável por país |
| 19/05/2025 | Controle "ad choice (NPA)" removido das mensagens europeias em favor do TCF |
| 09/02/2026 | Novos gatilhos de vignette ativados automaticamente após 1 mês, salvo opt-out |
| 11/03/2026 | Slider "ad load" dos Auto ads substituído por configurações avançadas granulares |
| 07/04-07/05/2026 | "Consent message optimization" auto-ativada (alterna entre mensagem bloqueante e "limitada" baseada em legítimo interesse), salvo opt-out |
| 21/05/2026 | Anchor ads colapsáveis ("dynamic anchor ads") no desktop |
| 15/06/2026 | Vignette deixa de disparar no botão voltar (política de back-button hijacking do Search) |
| 11/09/2026 | "Maximize message coverage" |

**Auto ads** → https://support.google.com/adsense/answer/9261805 — um único código em todas as páginas; detecta anúncios manuais e ajusta; formatos: ad intents, overlay (anchor, vignette, side rails), in-page (banner, multiplex); controles: exclusão de páginas e de áreas, frequência de vignette, posição de anchor/side rail (mai/2025), configurações avançadas (mar/2026), preview.

### 5.7 Implementação técnica (CLS, Astro, Next.js)

- **Guia oficial GPT "Minimize layout shift"** → https://developers.google.com/publisher-tag/guides/minimize-layout-shift — manter CLS p75 < 0,1; reservar espaço do slot com CSS fixo (height/width) ou min-height/min-width por media query; "Reserving space with JavaScript should be avoided"; slots multi-tamanho: reservar o mais provável/maior e centralizar; slots "fluid" sempre causam shift → só abaixo da dobra; iniciar colapsado apenas slots com baixa taxa de preenchimento. web.dev: scripts de anúncio assíncronos e lazy-load dos anúncios abaixo da dobra; monitorar por CrUX.
- **Astro** `[confiança média]` → https://docs.astro.build/en/guides/view-transitions/ — loader `adsbygoogle.js` (async, crossorigin=anonymous) uma única vez no `<head>` do layout (scripts com atributos além de src comportam-se como is:inline); `ads.txt` em `public/`. Com `<ClientRouter />`, "bundled module scripts are only ever executed once"; `astro:page-load` dispara "both on initial page navigation for a pre-rendered page and on any subsequent navigation"; `data-astro-rerun` força re-execução de inline scripts. Padrão recomendado (síntese, não documentado pelo Google): em `astro:page-load`, fazer `push({})` apenas para `ins.adsbygoogle` sem `data-adsbygoogle-status`, evitando push duplicado ("already have ads in them"); elementos com `transition:persist` não são re-renderizados.
- **Next.js (App Router)** `[confiança média]` → https://dev.to/vibeberry/how-we-integrated-google-adsense-into-a-nextjs-app-router-project-the-right-way-4540 — loader com `next/script` (`strategy="afterInteractive"` ou `lazyOnload`; `crossOrigin` em camelCase) só em produção; componente cliente `AdSlot` com `useEffect` fazendo `(window.adsbygoogle = window.adsbygoogle || []).push({})` em try/catch; slots que permanecem montados não re-fazem push (usar `key` por pathname/slot); erro `no_div` indica push antes de o `<ins>` existir. Relato: `lazyOnload` elevou PageSpeed mobile de 69 para 96.

### 5.8 Coexistência com o Amazon Associados

Nem o Acordo Operacional nem as Políticas do Programa BR proíbem redes de anúncios no site. Restrições relevantes: não usar Conteúdo do Programa "para anunciar ou promover quaisquer produtos oferecidos em outros sites"; não colocar "material não relacionado de terceiros em proximidade ao Conteúdo do Programa" de modo a sugerir endosso; Links Especiais não podem aparecer "em janelas pop-up ou pop-under, em anúncios de página transitória ou anúncios de sobreposição"; o Site deve "ter conteúdo original e estar disponível publicamente". Não há orientação oficial sobre a distância aceitável entre um bloco AdSense e um box de produto Amazon — recomenda-se separação visual clara e rótulo "Publicidade". → https://associados.amazon.com.br/help/operating/policies

### 5.9 Experiência brasileira 2024-2026 `[confiança baixa — fontes com viés comercial]`

"Conteúdo de baixo valor" é a reprovação mais comum; causas apontadas: ≤5-30 posts, posts curtos, Sobre/Contato/Política vazias ou fora do menu/rodapé, categorias com <5 posts e tags indexadas vazias, plágio/tradução, IA sem edição, subdomínios gratuitos, imagens pesadas (PNG/JPEG → WebP resolveu uma reprovação). Caso 2026: blog criado fim de maio, 100+ artigos, enviado 05/08 e aprovado 08/08/2026 (3 dias) — autor recomenda 60-80 artigos antes de enviar e aguardar indexação de 15-20 páginas. → https://kildaryoliver.com.br/blog-aprovado-google-adsense-estudo-de-caso/ ; https://blogueirainteligente.com.br/blog-reprovado-no-adsense/

### 5.10 Armadilhas

- Aplicar cedo demais: poucas dezenas de páginas, categorias/tags vazias indexadas, páginas institucionais genéricas ou ausentes do menu/rodapé.
- Conteúdo que é só "Review/Melhores/Top" com descrições reescritas da Amazon — "thin affiliation" (Search) e "affiliate programs without adding sufficient value" (AdSense).
- Artigos em massa com IA sem revisão humana e sem evidência de uso.
- Exibir preços e estrelas da Amazon copiados manualmente ou cachear imagens da API por mais de 24h (viola o Associados).
- Links de afiliado em pop-ups/overlays; encurtadores; bloco AdSense "colado" no box de produto Amazon.
- Rótulos "Recursos", "Ofertas", "Links úteis" acima de anúncios; setas/animações; anúncios ao lado de botões/menus/tabelas interativas.
- Anúncios em páginas sem conteúdo (busca vazia, 404, "obrigado", tags) ou mais anúncios que conteúdo.
- Anchor/sticky que cobre conteúdo ou >30% da tela; vignette agressivo; densidade mobile >30%; não desligar os gatilhos de vignette auto-ativados em 2026.
- Ignorar o EEE porque o site é brasileiro.
- Banner "dark pattern" (botão único "OK/Ciente", publicidade ativada por padrão, texto só em inglês); política sem os itens do art. 9º da LGPD.
- Reservar espaço de anúncio por JavaScript; slots fluidos acima da dobra; push duplicado em navegação client-side.
- Confundir prazos: não há idade mínima do site no Brasil; mas a conta AdSense é desativada se não configurada em 6 meses, e a conta Amazon é cancelada sem 3 vendas em 180 dias.

### 5.11 Checklist de aprovação e permanência

**Antes de aplicar**
- [ ] ~40-60 artigos publicados e indexados (meta prática, não regra oficial), mix ~60% reviews/comparativos/listas e ~40% guias informacionais, cada categoria com ≥5 artigos; tags não indexadas; nenhuma categoria vazia publicada.
- [ ] Páginas institucionais em português, linkadas no menu e no rodapé: Sobre (quem somos, método, como ganhamos dinheiro), Contato (e-mail funcional + formulário), Política de Privacidade (seção AdSense com os 4 pontos + link partner-sites + seção Amazon Associados + itens do art. 9º LGPD + canal do encarregado), Política de Cookies, Termos de Uso, "Divulgação de afiliados" com a frase oficial da Amazon.
- [ ] HTTPS válido com redirect HTTP→HTTPS; robots.txt liberando Mediapartners-Google e Google-Display-Ads-Bot; nenhuma página atrás de login; zero links quebrados; nenhuma página "em construção" indexada.
- [ ] Performance: WebP/AVIF com dimensões explícitas, fontes locais, zero scripts de terceiros além de AdSense/CMP/analytics; CLS <0,1, INP <200ms, LCP <2,5s em campo; validar no PageSpeed e no relatório CWV do Search Console.
- [ ] Loader AdSense único no `<head>` do layout (async + crossorigin) só em produção; `public/ads.txt` com a linha do pub-ID; `<meta name="google-adsense-account">` como fallback de verificação.
- [ ] Template de review alinhado às diretrizes do Google (resumo/veredito, para quem é/não é, specs verificadas, prós/contras próprios, 2-3 alternativas, "o que mudou", FAQ, metodologia, data); listas com ≥120-150 palavras substantivas por item.
- [ ] Governança editorial: checklist pré-publicação, página de autor com credenciais, política "sem preço copiado, sem review inventado"; evitar categorias em Publisher Restrictions.
- [ ] Só então: Sites > Request review.

**Layout de anúncios**
- [ ] AdSense manual em 3-4 posições fixas (após intro, meio, fim, sidebar desktop) com containers `min-height` reservados por breakpoint, rótulo "Publicidade", distância mínima de botões de afiliado/tabelas.
- [ ] Nenhum anúncio em busca, 404, categorias vazias ou páginas institucionais.
- [ ] Se usar Auto ads: desativar vignette (ou limitar frequência), anchor só no rodapé mobile, excluir home/institucionais.
- [ ] Proporção conteúdo editorial > publicidade em toda página (contando AdSense + boxes de afiliado).
- [ ] Em Astro com ClientRouter: um único listener em `astro:page-load` fazendo push só em `ins.adsbygoogle:not([data-adsbygoogle-status])`; sem `transition:persist` em containers de anúncio.

**Consentimento**
- [ ] CMP do Google (Privacy & messaging > European regulations) para EEE/UK/CH, com privacy policy URL, idiomas en+pt, revisão explícita dos toggles "Optimize my consent message" e gatilhos de vignette.
- [ ] Banner LGPD próprio em português no padrão ANPD (Aceitar / Rejeitar não necessários / Gerenciar; categorias Necessários sempre ativos / Analíticos / Publicidade desativadas por padrão; link permanente "Gerenciar cookies" no rodapé; log de consentimento com timestamp, versão do banner e escolhas), integrado ao Google Consent Mode v2 (ad_storage/ad_user_data/ad_personalization = denied até aceite) para servir NPA a quem rejeitar.

**Pós-aprovação**
- [ ] Monitorar o Policy Center semanalmente; manter proporção conteúdo>anúncios ao adicionar blocos; revisar ads.txt após qualquer mudança de domínio/www; responder a alertas de ads.txt/CMP em alguns dias; manter 3 vendas qualificadas na Amazon nos primeiros 180 dias.

---
## 6. Amazon Associados Brasil: regras que o site e o gerador devem obedecer

Fonte: `amazon-associates-br.json` (leitura direta dos documentos oficiais do programa brasileiro), com complementos de `adsense.json` e `br-sites.json`. Observação: `google-reviews-seo.json` havia marcado como `[confiança baixa]` o texto brasileiro de disclosure por ter lido só a versão dos EUA; o relatório de Associados leu a fonte primária em português e confirmou o texto (confiança alta).

### 6.1 Documentos oficiais lidos

| Documento | URL | Data/versão |
|---|---|---|
| Contrato Operacional (preâmbulo + 13 cláusulas; cláusula 1 definições, 4 comissões, 5 identificação como associado, 6 rescisão, 13 alterações com 7 dias de aviso) | https://associados.amazon.com.br/help/operating/agreement | atualizado em 15/10/2025 |
| Políticas do Programa (Regulamento de Comissões; Requisitos para Participação, cláusulas 1-6 com 6(a)-(y); Regulamento dos Produtos; Política de Aplicativos Móveis; Diretrizes de Marcas; Licença de PI; Política de Influenciadores; Creator Ads Boost) | https://associados.amazon.com.br/help/operating/policies | 14/04/2026 |
| Tabela de Comissões (Tabela 1 + Comissões Especiais) | https://associados.amazon.com.br/help/node/topic/GRXPHT8U84RAYDXZ | sem data de vigência |
| Dormência da conta (3 vendas/180 dias) | https://associados.amazon.com.br/help/node/topic/G7MJTPEP9NC3YKMG | — |
| "O que mudou" | https://associados.amazon.com.br/help/operating/compare | vigência 14/04/2026 |
| Ajuda do SiteStripe | https://associados.amazon.com.br/help/node/topic/GJMMT7G4C8K4Y3AY | desatualizada (ainda lista "Imagem") |
| Creators API — Introdução / Headers e Locales / Deprecação da PA-API 5 | https://affiliate-program.amazon.com/creatorsapi/docs/en-us/introduction ; https://affiliate-program.amazon.com/creatorsapi/docs/en-us/concepts/common-request-headers-and-parameters ; https://affiliate-program.amazon.com/creatorsapi/docs/en-us/paapiv5-deprecation | — |

### 6.2 Divulgação obrigatória (Cláusula 5 do Contrato Operacional)

- **Frase exata em português:** *"Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas"* — deve ser exibida "de forma clara e destacada".
- O contrato aceita "qualquer informação similar anteriormente permitida" (variações como "Como Associado da Amazon, recebo por compras qualificadas" circulam e são toleradas; melhorairfryer.com.br usa "somos remunerados").
- Descumprir a cláusula 5 é "descumprimento material".
- Além dessa frase, **não se pode fazer outras referências públicas à participação nem sugerir apoio/endosso da Amazon** ("recomendado pela Amazon", "parceiro oficial Amazon" são proibidos).
- Regra de venda qualificada citada no contrato: clique → compra em 24h → não devolução.
- **Implementação recomendada:** constante global `DISCLOSURE_PT = 'Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas.'` renderizada (1) em um `<aside class="aviso-afiliado">` acima do primeiro link de cada review/comparativo/lista, (2) no rodapé de todas as páginas, (3) na página /politica-de-afiliados, com complemento legal "Este conteúdo contém publicidade na forma de links de afiliado (CONAR/CDC art. 36)". Teste automatizado no build falha se uma página com `?tag=` não contiver a frase.

### 6.3 Links: formato, encurtadores, cloaking e canais proibidos

- **Formato exigido:** "formatos especiais de link rastreado" com o ID de Associado como parâmetro de URL — `https://www.amazon.com.br/dp/ASIN?tag=SEUID-20`.
- **Encurtadores e cloaking (Requisitos 6(v) e 6(w)):** "Você não irá utilizar um serviço encurtador de links, botão, hyperlink ou outra forma de colocação de anúncio" que torne pouco claro que o destino é a Amazon; "Você não irá disfarçar, esconder, falsificar ou de outra forma obscurecer a URL de seu Site contendo Links Especiais" (inclusive por "Links de Redirecionamento"). O `amzn.to` é o encurtador da própria Amazon gerado pelo SiteStripe ("Sua ID de associado e sua ID de rastreamento já estão incluídas no link curto") — único encurtador aceitável. Redirects internos (/go/produto), bit.ly, TinyURL: proibidos.
- **Sub-tags** não podem ser atribuídas a usuários finais individuais. IDs de rastreamento distintos por tipo de conteúdo/canal (ex.: rp-review-20, rp-lista-20, rp-comparativo-20) são permitidos para medir conversão.
- **Canais proibidos:** nenhum Link Especial "em qualquer material impresso, ebook, correspondência" ou uso offline/verbal; e-mails, SMS e DMs só "desde que tais comunicações sejam solicitadas (ou seja, solicitadas pelo cliente que as receber)"; extensões/toolbars de navegador; embutir páginas da Amazon em iframe/WebView; pop-ups/pop-unders/intersticiais com links Amazon; recursos de rastreamento/alerta de preço sem aprovação; incentivos (cashback, pontos, sorteios) por usar os links; compras pelos próprios links; lances em palavras-chave com marca Amazon; marcas Amazon ("amazon", "amzn", "kindle") em domínio/subdomínio/handles.
- **Mudança de 14/04/2026:** compras de clientes referidos por "qualquer anúncio pago ou impulsionado vinculado à Amazon, independentemente do uso de palavras-chave proibidas" deixaram de ser qualificadas ("Exceções limitadas se aplicam"). Se houver mídia paga, só para páginas próprias — e mesmo assim confirmar com o suporte (seção 9).
- **Componente recomendado:** `<AmazonLink asin tag>` que gera apenas `https://www.amazon.com.br/dp/{ASIN}?tag={ID}-20`, `rel="sponsored nofollow noopener"`, `target=_blank`, texto padrão "Ver preço na Amazon.com.br" ou "Comprar na Amazon.com.br". Lint de conteúdo: bloquear qualquer href amazon.com.br sem `?tag=`, qualquer bit.ly/tinyurl, e qualquer amzn.to não listado como gerado via SiteStripe.
- Newsletter e WhatsApp: só double opt-in com registro de consentimento (LGPD) antes de incluir links; nunca PDFs/e-books com links; nunca pop-ups.

### 6.4 Preços e disponibilidade

- Só podem ser exibidos se **(a)** a Amazon disponibilizar o link (ex.: SiteStripe/widgets) ou **(b)** os dados vierem da API de Divulgação de Produtos / Creators API.
- Se o dado vier de feed ou for atualizado com frequência inferior a 1 hora, é obrigatório **carimbo de data/hora ao lado do preço**, no formato de exemplo *"Preço na Amazon.com.br: R$ 32,77 (em 01/07/2018 às 14:11 Horário de Brasília - Detalhes)"*, mais o aviso *"Os preços e a disponibilidade dos produtos estão corretos na data/horário indicados e poderão sofrer alterações."*
- Preço comparativo deve mostrar o novo menor preço (e o antigo, se fornecido).
- Proibido divulgar "informações incorretas, exageradas, enganosas ou que de outra forma possam induzir a erro"; obrigatório "excluir do seu Site quaisquer links e respectivas referências a promoções com prazo limitado" quando a promoção acabar.
- **Para o gerador:** nunca escrever preços, "desconto de X%", "menor preço do ano", "em promoção" ou "frete grátis" em texto corrido. Em "modo sem API", falar de faixa de preço apenas de forma qualitativa ("entrada", "intermediário", "premium") e sem citar números; validar por regex a ausência de valores em R$, percentuais de desconto e das palavras "promoção", "oferta", "menor preço", "cupom", "frete grátis", "estrelas", "avaliações" associadas à Amazon.
- **Componente de preço** (quando houver API): "Preço na Amazon.com.br: R$ X (em DD/MM/AAAA às HH:MM Horário de Brasília - Detalhes)" + aviso fixo; renderizado só com dado da API; sem dado, degrada para botão sem valor. Revalidar a cada ≤ 24h (idealmente a cada hora, mantendo o timestamp mesmo assim).
- **Sistema de validade:** campo `valid_until` no frontmatter para qualquer menção a evento/promoção (Prime Day, Black Friday, cupons); job diário remove/neutraliza trechos vencidos e republica.
- Widget de histórico/alerta de preço ("acompanhe o preço") requer aprovação prévia da Amazon.

### 6.5 Imagens

- "Você não irá armazenar nem armazenar em cache o Conteúdo de Anúncio de Produtos que consista em uma imagem"; pode-se "salvar um link para o Conteúdo de Anúncio de Produtos que consista em uma imagem por até 24 horas".
- Outros conteúdos (título, descrição) podem ser cacheados por até 24h; **ASINs podem ser armazenados indefinidamente**.
- Só é permitido redimensionar mantendo proporções ou truncar texto sem mudar o sentido (sem overlays/edições).
- **Proibido:** baixar imagens e re-hospedar no próprio CDN/repositório; screenshots; hotlinkar URLs de m.media-amazon.com copiadas da página do produto (fora da API/SiteStripe); guardar URL de imagem da API por mais de 24h.
- **SiteStripe** `[confiança média]`: os formatos "Imagem" e "Texto+Imagem" foram descontinuados em 01/12/2023 e os links de imagem antigos pararam de funcionar em 31/12/2023; só o link de "Texto" (longo e curto amzn.to) permanece. A página de ajuda BR ainda descreve as três opções, mas está desatualizada. **Consequência: sem API, não existe caminho oficial para exibir imagens da Amazon.** → https://amalinkspro.com/?p=34288
- **Enquanto não houver API:** fotos próprias, fotos de press kit do fabricante com autorização escrita, ou ilustrações/stock licenciado. Campo `image_source` obrigatório no frontmatter com valores permitidos (own, manufacturer_licensed, stock_licensed, creators_api).
- **Arquitetura "ASIN como única coisa persistida":** guardar apenas ASIN + metadados editoriais próprios; título/imagem/preço vindos da Creators API em build/ISR com revalidação ≤ 24h.

### 6.6 Avaliações de clientes e estrelas

- "Você não irá exibir ou utilizar de outra maneira qualquer avaliação ou classificação em estrelas feitas pelos clientes da Amazon, total ou parcialmente, em seu Site, salvo se você tiver obtido um link à referida avaliação … através do Creators API" e cumprir a Licença.
- Ou seja: **nem copiar, nem parafrasear trechos, nem exibir "4,7 estrelas" ou "4,7/5 (12.345 avaliações)" sem a API.** (Isso atinge práticas vistas em Casa dos Eletrodomésticos e no padrão "contras extraídos de avaliações" do TechTudo.)
- O Contrato exige obedecer às Diretrizes da Comunidade ("proibição de avaliações de clientes que sejam criadas, editadas ou removidas em troca de remuneração").
- Coincide com a regra do Google de não agregar avaliações de outros sites no markup (seção 4.6).
- **Para o gerador:** nunca citar/parafrasear reviews da Amazon nem nota/quantidade de avaliações. Substituir por análise própria (prós/contras, para quem é, alternativas) e, se quiser "prova social", usar apenas dados próprios ou fontes com licença (testes de institutos, fabricante), sempre com link.

### 6.7 Scraping, agentes automatizados e IA (Licença de PI)

- **Data mining e scraping do Conteúdo do Programa são proibidos.** Qualquer agente que acesse a Amazon deve se identificar no user-agent como `Agent/[nome do agente]`, não pode imitar humanos nem burlar CAPTCHAs.
- "Você não usará e não permitirá que terceiros usem o Conteúdo do Programa para, direta ou indiretamente, desenvolver ou aprimorar modelos de linguagem grande ou multimodais".
- Conteúdo textual exibido deve trazer aviso **"AS IS"** de que vem da Amazon e pode mudar/ser removido. Arquivos acima de 40 KB exigem aprovação prévia.
- **Para o pipeline:** proibir qualquer crawler em amazon.com.br; toda coleta via Creators API com partnerTag brasileiro e `x-marketplace=www.amazon.com.br`; se algum agente HTTP tocar domínios Amazon, user-agent `Agent/reviewprodutos` e nunca burlar CAPTCHA. Não usar textos/imagens da API para fine-tuning ou avaliação de modelos; usar apenas como dados estruturados exibidos com aviso "AS IS". Usar dados da API como insumo de prompt é zona cinzenta (seção 9) — posição conservadora: só campos estruturados exibidos.

### 6.8 Conteúdo original, listas e requisitos de site

- "Seu(s) Site(s) deverá(ão) ter conteúdo original e deverá(ão) estar disponível(is) publicamente".
- **Desde 14/04/2026:** "O conteúdo original que utiliza materiais de terceiros deve conter comentários, análises ou transformações" para ter valor adicional.
- "Ao vincular a páginas com listas de Produtos, você deverá ter conteúdo original adicional em seu Site" relevante ao link.
- "Você poderá adicionar ou excluir Produtos (e os respectivos Links Especiais) de seu Site a qualquer momento" (sem aprovação prévia).
- Não colocar "material não relacionado de terceiros em proximidade ao Conteúdo do Programa" de modo a sugerir endosso; não usar Conteúdo do Programa "para anunciar ou promover quaisquer produtos oferecidos em outros sites" — a licença restringe o uso de imagem/preço da API a páginas que linkem para a Amazon; não misturar com ofertas do mesmo item em outra loja.
- **Para listas e comparativos:** antes dos cards, no mínimo critérios de seleção, perfil de uso de cada escolha, veredito por cenário e FAQ; cada card com "por que escolhemos / para quem não é".

### 6.9 Marca Amazon (Diretrizes de Marcas)

- "VOCÊ TEM PERMISSÃO PARA USAR AS MARCAS DA AMAZON APENAS PARA EXIBIÇÃO EM SEU SITE" com a finalidade de anunciar a disponibilidade de produtos via Link Especial.
- "Você não poderá modificar qualquer Marca da Amazon de nenhuma maneira" (proporção, cor, fonte); proibido uso offline/em e-mail, sugerir endosso, usar logos de fornecedores/vendedores sem autorização escrita, registrar domínios/handles parecidos. Qualquer violação encerra automaticamente a licença.
- Não há CTA "oficial"; "Ver na Amazon.com.br" é neutro. Não exibir logos de fabricantes sem autorização (usar nome em texto). reviewprodutos.com.br está ok quanto ao domínio.

### 6.10 Creators API, PA-API 5 e "modo sem API"

- **PA-API 5 está descontinuada:** "has been deprecated and is being replaced by the Creators API"; chamadas retornam HTTP 403 AccessDeniedException. Fontes secundárias datam a descontinuação em 30/04/2026 e o desligamento do endpoint em 15/05/2026 (aviso em abril/2026). Credenciais AWS antigas não funcionam. → https://affiliate-program.amazon.com/creatorsapi/docs/en-us/paapiv5-deprecation ; https://dev.to/th3nate/amazon-pa-api-v5-is-shutting-down-april-30-2026-here-is-what-changes-at-the-auth-layer-22ek
- **Creators API — requisitos:** "Be enrolled in the Amazon Associates program for your target marketplace"; **"Have at least 10 qualifying sales within the past 30 days"**; registrar em Associates Central (Tools > Creators API) e gerar credenciais (só o titular principal; até 2 aplicações por loja e 2 credenciais por aplicação). Operações: GetItems (até 10 itemIds), SearchItems, GetVariations, GetBrowseNodes. Auth OAuth 2.0 (token válido por 3600 s), host `creatorsapi.amazon/catalog/v1/`, parâmetros em lowerCamelCase, recurso Offers substituído por OffersV2. Terceiros relatam suspensão temporária se as 10 vendas/30 dias não forem mantidas e restabelecimento em ~2 dias.
- **Brasil na tabela de locales:** "Brazil | www.amazon.com.br | NA". O `partnerTag` deve ser "store ID ou tracking ID de uma loja de associado válida do marketplace solicitado" (tag brasileira terminada em -20) e header/parâmetro marketplace = www.amazon.com.br. FAQ: "Your credentials work globally across all marketplaces", mas o acesso precisa estar "approved in that region".
- A referência pública lista apenas 7 recursos (BrowseNodeInfo, BrowseNodes, Images, ItemInfo, ParentASIN, SearchRefinements, VariationSummary); não há página pública de OffersV2 nem de CustomerReviews (ver seção 9).
- **"Creator Hub" não é produto oficial** `[confiança média]`; existe o Creator Central (dez/2024, inicialmente só no app mobile) e, desde 14/04/2026, a "Página de Creator"/link exclusivo para todos os associados. → https://marketing4ecommerce.net/en/amazon-creator-central-influencers-affiliates/
- **Modo sem API (padrão até destravar a Creators API):** CTA sem preço, fotos próprias/licenciadas, sem estrelas, texto sem valores em R$. Quando liberada: módulo de fetch em build/ISR que busca ItemInfo, Images e OffersV2 por ASIN, grava apenas o ASIN no repositório, renderiza preço no formato exigido e revalida a cada ≤ 24h; nunca persiste URL de imagem por mais de 24h; nunca baixa o arquivo.

### 6.11 Sessão, carrinho, pagamento

- A Sessão começa no clique e termina em "24 horas decorridas após o referido clique" (ou quando o cliente clicar em outro link de associado).
- Itens colocados no carrinho precisam ter o pedido concluído "no prazo máximo de 89 dias após o clique inicial".
- "Dentro de 180 dias da compra, o Produto for enviado, transmitido, baixado e pago pelo cliente" (regra nova de 14/04/2026).
- Pagamento ~60 dias após o fim do mês, **apenas por depósito bancário no Brasil, mínimo R$ 30,00**; contas inativas há 3+ anos podem ter comissões retidas.
- Fontes secundárias `[confiança média]` acrescentam: last-click, comissão sobre o carrinho inteiro da sessão, cookie renovado a cada clique. → https://formulaninja.com.br/amazon-associates-brasil-vale-a-pena/

### 6.12 Aprovação, 3 vendas em 180 dias e dormência

→ https://associados.amazon.com.br/help/node/topic/G7MJTPEP9NC3YKMG

- "Após a inscrição, você tem 180 dias para realizar três vendas qualificadas através dos seus links dos associados".
- Após as 3 vendas, "nós avaliaremos a sua candidatura dentro de um ou dois dias".
- "Sua inscrição pode ser cancelada se não houver um número suficiente de vendas qualificadas em 180 dias".
- **"Não podemos restabelecer sua conta ou ID de rastreamento depois que ela é rejeitada"** — mas pode-se recandidatar "quando tiver estabelecido seu site".
- "Se você permanecer no Programa de Associados por um ano sem gerar uma venda, sua conta será encerrada por ociosidade".
- Compras próprias (ou de amigos/família) não contam e podem causar rejeição definitiva.
- **Fluxo recomendado:** publicar ao menos 15-20 artigos originais, públicos, com disclosure e política de privacidade antes de se inscrever; registrar site e perfis sociais corretos; nos primeiros 180 dias priorizar pautas de fundo de funil com alta intenção; depois mirar ≥ 10 vendas/30 dias para destravar e manter a Creators API; monitorar "Desempenho por tipo de link".

### 6.13 Mudanças em vigor em 14/04/2026 ("O que mudou")

1. Limite de 180 dias para envio/transmissão/download e pagamento.
2. Compras de clientes referidos por "qualquer anúncio pago ou impulsionado vinculado à Amazon" passam a ser desqualificadas ("Exceções limitadas se aplicam").
3. Comissão onsite restrita à mesma variante de ASIN.
4. Definição de conteúdo original passa a exigir que "contenha comentários, análises ou transformações para ter valor adicional".
5. Concluir o registro dá acesso a uma "Página de Creator e a um link exclusivo de creator" para todos.

A página "O que mudou" só lista 14/04/2026; o que mudou na atualização do Contrato de 15/10/2025 não está documentado (seção 9).

### 6.14 Tabela oficial de comissões (Tabela 1 — Comissão Padrão Fixa)

→ https://associados.amazon.com.br/help/node/topic/GRXPHT8U84RAYDXZ

| Taxa | Categorias |
|---|---|
| **13%** | Bebê \| Beleza \| Beleza de Luxo \| Saúde e Cuidados Pessoais \| Aparelhos de Cuidados Pessoais \| Bebidas Alcoólicas \| Alimentos e Bebidas \| Audiolivros |
| **11%** | Roupas \| Pet Shop |
| **10%** | Livros \| Livros Digitais |
| **9,5%** | Dispositivos Amazon (Echo, Fire TV e Kindle) |
| **8%** | Aventura e Lazer \| Esportes \| Brinquedos e Jogos \| Móveis \| Casa \| Construção e Reforma \| Ferramentas \| Cozinha \| Jardim e Piscina \| Eletrodomésticos \| Câmeras e Foto \| Eletrônicos \| Informática \| Instrumentos Musicais \| Papelaria e Escritório \| Celulares e Tecnologia Sem Fio \| Games e Consoles \| TV e Áudio |
| **7%** | Bolsas \| Malas e Mochilas \| Calçados \| Jóias \| Relógios \| CD e Vinil \| DVD e Blu-ray \| Automotivo \| Produtos Industriais e Científicos \| Outros |
| **0%** | Coach |

**Comissões especiais (Eventos Geradores de Recompensa):** Prime R$ 9; Prime Video R$ 9; Prime Video Channels R$ 5; Kindle Unlimited R$ 15; Music Unlimited R$ 10; Lista do Bebê R$ 6 (cadastro) + R$ 6 (1ª compra). "Eventos de bônus: Não disponíveis no Brasil".

- A página não traz data de vigência. Tabelas de blogs (Divulga Ninja, CupomOnline etc.) divergem entre si e citam 1-5% para eletrônicos/celulares — **está errado frente à tabela oficial (8%)**; usar sempre o node oficial ou a Declaração de Receita no painel.
- **Cortes de comissão de até 50%** relatados em 2026 (Ásia-Pacífico fim de 2025, EUA ~março/2026, sem anúncio público) ainda não aparecem na tabela brasileira consultada em out/2026 `[confiança média]`; o corte de fevereiro/2025 noticiado no Brasil foi para vendedores (Seller Central), não afiliados. → https://www.shopifreaks.com/amazon-quietly-slashed-associates-affiliate-commission-rates-by-up-to-50-across-publisher-ecosystem-and-gutted-reporting-tools/
- **Mapa de monetização:** priorizar pautas de alto ticket × alta taxa (beleza/saúde, casa/cozinha, bebê) em vez de só eletrônicos; incluir bounties (Prime R$ 9, Kindle Unlimited R$ 15) em artigos de livros/streaming.

### 6.15 Divulgação é exigência legal no Brasil (CONAR / CDC) `[confiança média]`

- Novo Guia de Publicidade por Influenciadores do CONAR (publicado em maio/2026, "A regra vale desde 1º de junho de 2026") passou a enquadrar quem "recebe comissão pelas vendas feitas pelo próprio link" como publicidade, bastando o compromisso recíproco; a identificação deve ser clara, ostensiva, imediata e integrada ao conteúdo, visível na primeira tela, com marcação nativa e/ou expressões como #publi/#publicidade (evitar #ad). O art. 36 do CDC já impõe a identificação da publicidade.
- As Políticas da Amazon BR citam expressamente Marco Civil (Lei 12.965/2014), LGPD e CONAR, e a Política de Influenciadores menciona "#publi". O site é responsável por "avisos de privacidade e cookies".
- Aplicar o padrão também nos posts sociais que divulgarem os artigos (#publi + ferramenta nativa). As fontes divergem sobre se #publi é complemento ou substituto das ferramentas nativas (seção 9). → https://www.uai.com.br/networking-e-negocios/2026/09/23/ganha-comissao-com-link-de-afiliado-para-o-conar-isso-ja-e-publicidade/

### 6.16 Alternativas de afiliados no Brasil (fase 2)

| Programa | Comissões e regras (conforme relatório) | Confiança | Fonte |
|---|---|---|---|
| **Mercado Livre Afiliados** | Venda direta 16% (Beleza; Calçados/Roupas/Bolsas; Esportes), 8% (Bebês, Brinquedos, Casa/Móveis, Construção, Ferramentas, Games, Joias/Relógios, Livros, Acessórios para Veículos), 4% (Câmeras, Celulares, Eletrodomésticos, Eletrônicos, Informática), 0% Alimentos; venda indireta = metade; cupons 3%-5%. Requisitos: 18+, CPF, conta Mercado Pago ativa, não ser vendedor, canal aprovado. Pagamento no Mercado Pago, mínimo R$ 80 com ao menos 3 compradores distintos, até 60 dias após validação. Cookie de 24h segundo blogs (não confirmado). Páginas oficiais retornam 403. | média | https://www.hostinger.com/br/tutoriais/comissao-afiliado-mercado-livre |
| **Shopee Afiliados** | "Até" 14% Moda, 12% Beleza/Saúde, 10% Casa/Esportes/Livros, 8% Eletrônicos, 6% Celulares; cookie de 7 dias; saque mínimo ~R$ 10; pagamento 30-45 dias; blogs aceitos; sem CNPJ; "Comissões podem mudar sem aviso prévio"; ajustes múltiplos em 2026 e NFS-e por afiliado PJ a partir de agosto/2026 (Actana). | baixa | https://www.cupomonline.com.br/afiliado-shopee-como-funciona/ |
| **Parceiro Magalu / Magazine Você** | Loja virtual gratuita sem estoque; 2%-12% por categoria e nível (Iniciante, Bronze 1.000 pts, Prata 1.500, Ouro 3.500, Diamante 8.000); Beleza 5%-8%, Bebê/Brinquedos 8%-12%; marketplace 2%-4%; mínimo R$ 50, pagamento em até 34 dias; CPF, PIS e conta bancária. Modelo social-first; uso em blogs não documentado. | baixa | https://ecommercenapratica.com/parceiro-magalu-vale-a-pena/ |
| **Awin Brasil** | Termos Padrão (agosto/2025, PDF oficial): adesão pode exigir "pequeno depósito" restituído no primeiro pagamento; atribuição ao "encaminhamento mais recente" (last click) com "hierarquia de cookies"; anunciantes aprovam/rejeitam vendas e podem reduzir comissão com ~7 dias de aviso; pagamento só após receber do anunciante e após "valor mínimo de faturamento"; Código de Conduta e "Padrões de Publicidade"; foro São Paulo. Anunciantes BR: Casas Bahia, Centauro. Lomadee adquirida pela A&EIGHT (set/2024). | média | https://www.awin.com/docs.awin.com/Legal/Publisher+Terms/2025/BR_PT-Awin-Brazil-Publisher-terms-August-2025.pdf |

Preparar adapters de link mantendo a mesma camada de disclosure e a mesma proibição de preços sem fonte; não misturar Conteúdo de Anúncio de Produtos da Amazon em páginas que ofereçam o mesmo item em outra loja.

### 6.17 Resumo operacional: o que o site e o gerador devem fazer e nunca fazer

**Sempre**
- [ ] Frase oficial de divulgação acima do primeiro link, no rodapé e na página de política; teste de build.
- [ ] Links no formato `https://www.amazon.com.br/dp/{ASIN}?tag={ID}-20`, `rel="sponsored nofollow noopener"`, destino explícito no texto.
- [ ] Persistir só ASIN + metadados editoriais; título/imagem/preço via Creators API com revalidação ≤ 24h.
- [ ] Preço só com dado da API, formato com timestamp + aviso oficial de alteração.
- [ ] Imagens próprias/licenciadas enquanto não houver API; campo `image_source` obrigatório.
- [ ] Conteúdo original com comentários/análises/transformação; listas com camada editorial antes e entre os cards.
- [ ] `valid_until` em toda menção a promoção; job diário de limpeza.
- [ ] Tracking IDs por tipo de conteúdo.
- [ ] Logo Amazon só em formato oficial e inalterado; nomes de fabricantes em texto.
- [ ] Mirar 3 vendas em 180 dias e depois ≥ 10 vendas/30 dias.

**Nunca**
- [ ] Preço, desconto, "menor preço", "promoção", "frete grátis" em texto corrido sem API.
- [ ] Copiar/parafrasear avaliações da Amazon ou exibir nota/quantidade de avaliações sem API.
- [ ] Baixar/re-hospedar/hotlinkar imagens; screenshots; cache de imagem > 24h; overlays.
- [ ] Encurtadores (exceto amzn.to do SiteStripe) ou redirects internos; "amazon"/"amzn"/"kindle" em domínio/handles.
- [ ] Links em newsletter não solicitada, PDFs/e-books, impresso, pop-ups, extensões.
- [ ] Anúncios pagos linkando direto para a Amazon; lances em marca Amazon.
- [ ] Compras pelos próprios links.
- [ ] Widget de histórico/alerta de preço sem aprovação.
- [ ] Scraper/gerador acessando amazon.com.br; alimentar LLM com Conteúdo do Programa; exibir texto da API sem "AS IS".
- [ ] Sugerir endosso; alterar logomarca; logos de marcas sem autorização.
- [ ] Confiar em tabelas de comissão de blogs.
- [ ] Tratar a divulgação como só contratual (CONAR desde 01/06/2026).

---

## 7. Estratégia de SEO por funil

Fonte: `keyword-funnel.json`, com complementos de `br-sites.json`, `intl-sites.json` e `google-reviews-seo.json`.

### 7.1 O modelo hub/spoke observado nos líderes brasileiros

Zoom, Buscapé, TechTudo "Qual Comprar", Canaltech e Mundo Conectado operam o mesmo desenho:

- **Hub de categoria** com filtros (preço "até R$", marca, capacidade) + bloco editorial. Exemplo: /fritadeira do Zoom tem filtros (preço "até R$ 100", "R$ 100 a R$ 505", marca, capacidade "3 a 4 litros", recursos, lojas incl. Amazon, avaliações), blocos editoriais em forma de pergunta ("Como escolher uma boa fritadeira elétrica?", "Qual é a melhor air fryer atualmente?") que linkam para guias /deumzoom/ (melhor-air-fryer-do-mercado, qual-a-melhor-marca-de-air-fryer, melhores-air-fryers-custo-beneficio, air-fryer-5-litros-4-litros-ou-3-litros-como-escolher-o-tamanho, como-usar-air-fryer-passo-a-passo, como-fazer-a-cura-da-air-fryer, como-limpar-air-fryer, air-fryer-ou-forno-eletrico, air-fryer-elgin, melhor-air-fryer-electrolux) e FAQ em acordeão. → https://www.zoom.com.br/fritadeira
- **Guias de meio de funil:** "Melhor X 2026: N modelos para comprar", "Qual a melhor marca de X?", "X custo-benefício", "X ou Y: qual vale mais a pena?", "X para [uso]".
- **Reviews de fundo:** "[Produto] é bom? Veja análise e preço", "[Produto] ainda vale a pena em 2026?", "[A] vs [B]".
- **Páginas de produto/oferta.**
- Cada guia linka 8-12 guias-irmãos da mesma categoria; **um cluster de ~12 artigos por categoria é o tamanho observado**. Módulos "Tendências em [categoria]" e "Mais lidos" em todas as páginas da categoria distribuem PageRank interno.
- Topic clusters (fontes PT-BR 2026) `[confiança média]`: pilar com conteúdo próprio (>2.500 palavras, índice navegável, CTAs contextuais), 5-20 satélites, linkagem obrigatoriamente bidirecional (erro mais comum: satélite linka a pilar mas a pilar não linka de volta), âncoras descritivas, evitar canibalização, consolidar com 301; 3-6 meses para ver efeito. Ferramentas citadas: Link Whisper, Yoast Premium, Screaming Frog (500 URLs grátis). → https://meuredator.com.br/a-estrutura-de-topicos-topic-clusters/

**Padrões de URL dos líderes:** Buscapé /{categoria}/conteudo/{slug}; Zoom /{categoria}/deumzoom/{slug}; Tecnoblog /guias/, /achados/, /responde/, /noticias/; Mundo Conectado /analise/{categoria}/{slug}; TudoCelular /compare/{id1}-{id2}.html (programático); TechTudo /listas/AAAA/MM/slug-edqualcomprar{xx}.ghtml (CMS de notícias — **não copiar**).

### 7.2 Taxonomia de URL proposta para o Review Produtos

| Tipo | URL | Estágio |
|---|---|---|
| Hub de categoria (filtros por faixa de preço "até R$ 300/500/1.000", marca, uso + blocos editoriais) | `/c/{categoria}/` | todos |
| Lista (3+ produtos) | `/melhores/{slug}` | meio (com H2 de fundo embutidos) |
| Comparativo de 2 produtos | `/comparativo/{a}-vs-{b}` | meio/fundo |
| Review individual | `/review/{produto-slug}` | fundo |
| Guia de dor/problema/como escolher | `/guia/{slug}` | topo (com funil embutido) |

Slugs curtos (3-6 palavras), sem ano, sem stop words supérfluas, estáveis para sempre. O relatório internacional sugeria `/categoria/`, `/melhores-[categoria]/`, `/review/[produto]/`, `/comparativo/[a]-vs-[b]/` e `/comparar/` (comparador por checkbox) — compatível com a taxonomia acima.

**Mapa de intenção por tipo de página**
- **FUNDO:** "[produto] é bom", "review", "vale a pena", "análise", "ainda vale a pena em 2026", "[marca] [categoria] é boa" → /review/ e /melhores/ por marca.
- **MEIO:** "melhor X", "melhor X para Y", "qual o melhor X", "X custo-benefício", "X até R$ 500", "X barato", "melhor marca de X", "X ou Y", "A vs B", "X [spec]" → /melhores/ e /comparativo/.
- **TOPO:** dores ("dor nas costas ao dirigir", "como dormir melhor", "casa cheia de mosquitos", "o que levar para festa", "presente para pai") → /guia/ com funil embutido.

### 7.3 Fórmulas de título em PT-BR

**Fórmulas que ranqueiam (literal, dos líderes):**
- "Melhor [X] 2026: [N] modelos para comprar" / "Melhor [X] [faixa/uso] em 2026: [N] opções"
- "Qual a melhor marca de [X] em 2026? Conheça [N] opções"
- "[X] ou [Y]: qual vale mais a pena?"
- "[A] vs [B]: qual vale mais a pena comprar?"
- "[Produto] é bom? Veja análise e preço"
- "[Produto] ainda vale a pena em 2026? Prós, limitações e custo-benefício"
- "[N] [X] por menos de R$ [valor]"
- "[Produto] [marca] é boa? O que você precisa saber antes de comprar"
- "Testado e aprovado! Melhor [X] custo-benefício para comprar em [mês]" (só se testado)
- Mais os padrões da tabela em 3.2 (TechTudo, Canaltech, GDM, CupomOnline, Showmetech).

**Fórmulas recomendadas para o site (síntese dos dois relatórios):**
- Lista: "Melhor [produto] 2026: os N melhores [para perfil/custo-benefício]" — variante mensal "N [produtos] que valem a pena em [mês] de 2026" para categorias voláteis.
- Review: "[Marca Modelo] é bom? Review completo: vale a pena em 2026?" ou "[Produto] é bom? Análise, prós e contras e preço".
- Comparativo: "[A] vs [B]: qual [produto] vale mais a pena em 2026?".
- Guia de dor: H1 com a dor ("Dor nas costas ao dirigir: causas e 7 soluções que funcionam").

**Regras de título:** ano e número integrados à frase ("Melhor air fryer 2026: 8 modelos testados por perfil"), 50-60 caracteres, sem nome do site no title de páginas não-branded, perguntas em reviews ("é bom?"), "vs" em comparativos; **evitar ano como sufixo solto ("| 2026")**; atualizar ano em title/H1/intro a cada refresh e nunca na URL. Title e H1 podem variar intencionalmente para cobrir duas formulações (Buscapé: title "Qual a melhor air fryer? Veja 10 opções em 2026" + H1 "Melhor air fryer 2026: veja os modelos ideais para sua cozinha"; Zoom: title "Melhor marca de air fryer 2026: compare 10 opções" + H1 "Qual a melhor marca de air fryer em 2026?") — mesma entidade, sintaxe diferente.

**Evidência experimental sobre ano/mês no título** `[confiança média — não brasileira]`: SearchPilot mediu +5% de sessões orgânicas ao adicionar "in January 2020" a títulos de um site de listagens; um teste com 423 páginas (2026) achou que ano solto no FINAL do título reduziu CTR, ano no meio foi neutro, e números, perguntas e o frame "vs" aumentaram CTR; nome da marca no título reduziu CTR em buscas não-branded. → https://ustechautomations.com/resources/blog/how-we-ab-tested-423-seo-titles-for-clickthrough-rate-2026

**H2 de produto padronizado** com posição + nome + "melhor para": "1. Consul CCK10CB 10.000 BTUs: melhor ar-condicionado de janela no geral", "3. Philips Walita NA130: a melhor air fryer custo-benefício geral", "8. POCO F7: melhor celular gamer custo-benefício" — ranqueia o produto (fundo) dentro da lista (meio).

### 7.4 Slugs

- **Ano no título, nunca na URL.** Zoom e Buscapé colocam "2026" no title/H1 mas usam slugs estáveis: /fritadeira/conteudo/melhor-air-fryer (publicado 22/04/2021, atualizado 06/07/2026), /celular/conteudo/melhores-celulares (publicado 04/01/2022, atualizado 16/09/2026) — a URL estável acumulou autoridade por 4-5 anos. A Semrush PT recomenda explicitamente evitar anos no slug.
- Exemplos de slug curto e estável: melhor-air-fryer, melhor-ar-condicionado-de-janela, air-fryer-midea-vale-a-pena, galaxy-a57-vs-galaxy-a56, lava-e-seca-ou-maquina-de-lavar, notebook-para-estudar-e-trabalhar, celular-com-snapdragon, xbox-series-s-review, celular-esquentando-muito-motivos-como-resolver.
- Padrões semânticos do Tecnoblog: 'melhor-[produto]-[modificador]', 'categoria-para-uso', 'categoria-com-atributo'.
- **Armadilha:** /melhor-air-fryer-2026 obriga redirecionamento anual e zera a autoridade acumulada (Hora de Codar e mReviews têm URLs 2023/2024 com títulos 2026).

### 7.5 Duplo funil: como um artigo atende dois estágios

- **Artigo de dor (topo) que vende:** Buscapé "Celular esquentando muito? Descubra as causas e soluções" (publicado 2020, atualizado 08/2026) resolve o problema primeiro (causas, quando se preocupar, o que fazer, FAQ com 6 perguntas) e só então insere CTAs escalonados: link suave "Está procurando um celular novo?" → "Melhor iPhone barato em 2026" → bloco de 4 produtos com specs no fim. A autora tem bio verificável (jornalista UFRJ, 9 anos). → https://www.buscape.com.br/celular/conteudo/celular-esquentando-muito-motivos-como-resolver
- **Lista (meio) que embute fundo:** Buscapé "melhores celulares" usa H2 comparativos dentro da lista ("Qual é melhor: Galaxy Z Fold8 ou Galaxy Z Fold8 Ultra?", "Vale mais a pena comprar o iPhone 18 Pro ou o 18 Pro Max?"). → https://www.buscape.com.br/celular/conteudo/melhores-celulares
- **Guia de marca (meio) que embute fundo:** Zoom "Qual a melhor marca de air fryer em 2026? Conheça 10 opções" — H2 por marca em pergunta de fundo ("A marca de air fryer Philco é boa? Saiba se realmente compensa comprar"), H3 "[Marca] no Reclame Aqui" (pesquisado em jan/2026), H3 "Melhores air fryers da [Marca]" com 3 modelos, FAQ de disputas de marca ("Qual marca de air fryer é melhor, Britânia ou Mondial?"). → https://www.zoom.com.br/fritadeira/deumzoom/qual-a-melhor-marca-de-air-fryer
- **Review (fundo)** responde "é bom?" e linka a lista e o comparativo. "Ainda vale a pena em 2026?" (Buscapé, Xbox Series S, publicado 2021/atualizado 09/2026): veredito condicional no topo ("vale, mas só pelo preço certo"), "Para quem é / para quem não é", alternativas atuais, FAQ de compatibilidade (GTA VI, 120 fps); URL original mantida e refresh anual. → https://www.buscape.com.br/console-de-video-game/conteudo/xbox-series-s-review
- **Comparativo:** H2 por critério com os dois nomes, fichas lado a lado, preço datado, regra de decisão numérica (Zoom A57 vs A56: "o upgrade vale se a diferença for de até R$ 300"); mas o veredito só aparece no fim — lacuna a explorar. → https://www.zoom.com.br/celular/deumzoom/galaxy-a57-vs-galaxy-a56
- **Finder por dor na home** (Wirecutter: "How do I stop my house from smelling?", "I want to read in bed at night without waking my partner") — espelhar com artigos-problema brasileiros ("Dor nas costas dirigindo: o que realmente ajuda e 5 produtos que testamos").
- **O que evitar no topo:** consultas puramente informacionais e genéricas ("o que é air fryer", "como funciona") são as mais absorvidas por AI Overviews; priorizar dores que terminam em decisão de compra.

**Lacuna recorrente dos líderes a explorar:** quase nenhum responde a pergunta do título no primeiro parágrafo (Zoom "melhor air fryer" e "melhor marca" abrem com "depende"; Canaltech põe o "Veredito" no último H2; Zoom QN70H não diz se é boa; Buscapé só responde no H3 "Qual a melhor air fryer de 2026?" no meio do texto). Também há inconsistências de ano (2025 e 2026 misturados), numeração de H2 fora de ordem e title ≠ H1 sem intenção. Responder em 2-3 frases no topo é a recomendação da Tropk para AI Overviews e do Google para reviews ("foque nos fatores de decisão").

### 7.6 Templates por estágio

**(a) LISTA — `/melhores/{slug}`**
H1 "Melhor X 2026: N modelos para comprar" → resposta direta em 2-3 frases com o vencedor geral + custo-benefício (+ 2-3 alternativas por perfil, com botões) → aviso de transparência → sumário com âncoras → tabela resumo (4-6 colunas discriminantes + "Para quem") → "Como escolhemos" (critérios, pesos) → H2 por produto "N. Marca Modelo: melhor para [perfil]" com selo, prós/contras, ficha técnica, "Para quem é / não é", preço datado (só via API) e 2 lojas quando existir → "Também avaliamos (e por que ficaram de fora)" → H2 "Como escolher X" (critérios brasileiros) → "Armadilhas dos anúncios" → 5-7 H2/H3 de FAQ em forma de pergunta (incluindo "Qual marca é melhor, A ou B?" e a dor principal, ex.: "Air fryer gasta muita energia?") → "Quem fez este guia" / "Por que confiar" → histórico de atualizações → relacionados.

**(b) REVIEW — `/review/{produto-slug}`**
H1 "[Produto] é bom? Análise, prós e contras e preço" → veredito em 2 frases ("vale para quem…; não vale se…") com nota, posição no ranking da categoria e botão → prós/contras → ficha técnica (specs medidas ou verificadas) → H2 por critério/aspecto → "Como se saiu com o tempo" (quando houver) → "Para quem é / para quem não é" → "Vale a pena comprar?" (2 cenários) → "Alternativas / Compare com similares" (3-5 produtos; linka comparativo e lista) → "Como testamos" → FAQ.

**(c) COMPARATIVO — `/comparativo/{a}-vs-{b}`**
Veredito curto no topo "compre X se…, compre Y se…" → tabela de especificações lado a lado → H2 por critério com os dois nomes e vencedor → regra de decisão (ex.: diferença de preço que justifica o upgrade) → botões para ambos → links para os dois reviews → FAQ.

**(d) GUIA DE DOR — `/guia/{slug}`**
H1 com a dor ("Dor nas costas ao dirigir: causas e 7 soluções que funcionam") → resposta direta → "Por que [dor] acontece" / quando se preocupar → soluções sem produto → "O que procurar em um [produto] para [dor]" (NR17, D33/D45, Inmetro, FPS) → H2 "Produtos que ajudam" com 3-5 itens e link para a lista "Melhor almofada lombar para carro 2026" → "Quando procurar um profissional" → disclaimer fixo "Este conteúdo é informativo e não substitui avaliação médica" → FAQ. CTAs comerciais só após a solução; densidade de anúncios ≤20%.

**Blocos fixos por produto** (síntese Buscapé/TechTudo/RevisaLar): ficha técnica resumida, "Por que vale a pena?" + "Pontos de atenção" ou Prós/Contras, preço com data de checagem (via API), nota própria, botões para 2+ lojas quando existir ("links para vários vendedores").

### 7.7 Regra "um dado próprio por artigo" (information gain)

Opções baratas de produzir, observadas nos líderes:
- Tabela consolidada de reputação: "Marca x reputação no Reclame Aqui (RA1000/Ótimo/Bom/Regular, pesquisado em [mês/ano])" (Zoom).
- Cálculo de consumo em kWh/mês e custo em R$ com tarifa média ou de capitais (Canaltech: diferença de R$ 18-24/mês entre ventilador de teto e ar-condicionado a 23 ºC, com ressalva metodológica sobre o ensaio do Inmetro). → https://canaltech.com.br/eletro/ventilador-de-teto-ou-ar-condicionado-no-23-c-qual-gasta-menos-luz/
- Histórico de preço de 90 dias — **apenas via Creators API** (seção 6).
- Contagem/análise temática de reclamações — **sem copiar/parafrasear avaliações da Amazon** (seção 6); usar Reclame Aqui, manuais, fontes licenciadas.
- Medições de peso/dimensões/ruído/tempo de preparo quando testado (Canaltech: 52 dB a 1,5 m; 0,3 kWh/20 min = R$ 6,55/mês; GDM: 1,56 kWh, ~50 ºC externa, 48-58 dB, coxinha/pão de queijo/batata).
- Matriz "melhor para" por perfil; regra de decisão numérica.
- Declarar a metodologia em bloco padrão "Como avaliamos".

### 7.8 Pesquisa de palavras-chave em PT-BR (processo)

Semente da categoria → autocomplete do Google com modificadores ("melhor", "qual", "é bom", "vale a pena", "ou", "vs", "para", "até", "barato", "custo benefício", "2026") → PAA em cascata (AlsoAsked; cada clique abre 2-4 novas) e "pesquisas relacionadas" → validar volume no Planejador de palavras-chave (Brasil, português) e sazonalidade no Google Trends (BR, 5 anos; histórico desde 2004) → classificar por estágio e atribuir à URL do cluster. Guardar as perguntas do PAA literalmente como H2/H3 e responder logo abaixo em texto curto e autossuficiente (prática: 40-60 palavras na resposta direta). Ferramentas citadas `[confiança média]`: AlsoAsked, AnswerThePublic (hoje da Ubersuggest), Keyword Tool. → https://www.edialog.com.br/as-pessoas-tambem-perguntam-people-also-ask/

### 7.9 Frescor, refresh e datas

- Exibir "Publicado em" e "Atualizado em" iguais a datePublished/dateModified; não usar datas futuras ou artificiais; mudar só a data é inútil ou prejudicial.
- **Evidência de refresh:** Workshop Digital (273 eventos, jan/2024-2026, janelas de 90 dias, com controle) mediu +447,7% de sessões em 95 páginas atualizadas (610 → 3.341) enquanto o controle caiu 20,2%; posição média 42,8 → 32,8. O que funcionou: responder a pergunta no início, atualizar dados, consolidar seções sobrepostas, remover enchimento, melhorar links internos e corrigir schema — não reescrita total. → https://www.workshopdigital.com/blog/content-refresh-analysis/
- **Cadência recomendada:** rechecar preços e disponibilidade de ASINs mensalmente (automatizável via API); refresh editorial trimestral das pilares e semestral dos reviews (resposta direta no topo, novos modelos, remoção de descontinuados, consolidação de satélites canibalizando, ajuste de ano); reavaliar guias principais a cada 60-90 dias e sempre que o produto sair de estoque (checagem automática de ASIN + alerta); monitorar GSC a cada 4/8/12 semanas; priorizar páginas sem atualização há >12 meses (Raptive usa 20 meses como limite).
- Changelog humano visível: "07/10/2026: adicionamos a cadeira X após 3 semanas de uso; removemos Y por indisponibilidade na Amazon".
- Páginas finas: sites com >13% de páginas com <500 palavras foram os que mais perderam em 2026; vencedores tinham média ~1.400 palavras. Não publicar reviews de 300 palavras só para "cobrir" um ASIN. `[confiança média]`
- Canibalização: não criar artigos separados para "melhor air fryer", "melhores air fryers", "air fryer boa"; consolidar com 301; satélite só quando o modificador tem intenção própria (barata, oven, pequena, marca).

### 7.10 Calendário sazonal brasileiro `[confiança média]`

Datas e comportamento de busca em 2026 (Nuvemshop, Think with Google BR, Webterra/Do Follow, Sala da Notícia):

| Data | Evento | Comportamento / categorias |
|---|---|---|
| 04/02 | Volta às aulas | papelaria, mochilas, tablets, notebooks |
| 14-17/02 (17/02 no Think with Google) | Carnaval | — |
| 15/03 | Dia do Consumidor | Buscapé publica "Ar-condicionado na Semana do Consumidor: 7 modelos" |
| 05/04 | Páscoa | — |
| 10/05 | Dia das Mães | buscas por presente sobem no início de abril e atingem 100 no Google Trends na última semana de abril; em maio "perfume" sobe de 327 mil para 450 mil buscas/mês, "cesta de café da manhã" de 130 mil para 246 mil, "flores" 480 → 550 mil, "spa day" 8 → 12,1 mil |
| 12/06 | Dia dos Namorados | — |
| 11/06-19/07 | Copa do Mundo | (Think with Google) |
| 1-7/07 (antecipadas desde 29/06) | Prime Day | >35 categorias; Beleza e Cuidados Pessoais foi a de maior volume, seguida de Alimentos e Bebidas e Limpeza Doméstica |
| 09/08 | Dia dos Pais | interesse cresce ~800% a partir de 9 de maio (gatilho: cobertura do Father's Day dos EUA) |
| 15/09 | Dia do Cliente | — |
| 12/10 | Dia das Crianças | TechTudo: "achadinhos por menos de R$ 100" |
| 10/10 | 10.10 | — |
| 27/11 | Black Friday | dentro da "Black November" com "esquenta" desde o fim de outubro; 89% dos brasileiros conhecem a data, 67% já compraram, 48% já tinham lista de compras em julho/2025 |
| 30/11 | Cyber Monday | — |
| 25/12 | Natal | metade começa as compras na Black Friday, gasto médio previsto R$ 540; lista "Mais Desejados do Ano" do Google inclui sazonais de verão (ar-condicionado, ventilador de coluna, barraca de camping) além de Labubu, Poco X7 Pro, iPhone 16/17, TVs 43/55/65", lava-louças, fogão de indução, perfumes árabes, Cicaplast |

**Calendário editorial (publicar 6-8 semanas antes, atualizar 1 semana antes, URL fixa sem ano):**
- **jan** → "volta às aulas" (mochila, lancheira, tablet, notebook até R$ 3.000) e verão (ventilador, ar-condicionado portátil, climatizador, repelente/casa cheia de mosquitos)
- **mar** → Dia do Consumidor (15/03) com "vale esperar?"
- **abr** → Dia das Mães (10/05: perfume, secador/prancha, cesta de café, robô aspirador, Kindle, spa em casa)
- **mai-jun** → Dia dos Namorados (12/06) e início do interesse por Dia dos Pais
- **jun** → Prime Day (1-7/07: "melhores ofertas do Prime Day", "vale a pena o Prime?")
- **jul** → Dia dos Pais (09/08: churrasqueira elétrica, ferramentas, relógio, barbeador, caixa de som)
- **set** → Dia das Crianças (12/10: "brinquedos até R$ 100/200", LEGO, Hot Wheels, tablet infantil) e primavera/verão
- **out** → "esquenta" Black Friday (27/11) com guias "vale esperar a Black Friday?", "o que comprar na Black Friday", "como saber se o desconto é real" e páginas-ofertas por categoria
- **nov** → Cyber Monday (30/11) e Natal ("presente para pai/mãe/namorado até R$ 200", "presente de amigo secreto até R$ 100")
- **dez** → Natal + Réveillon + verão

Ganchos sazonais com faixa de preço e data no título: "6 achadinhos tech para o Dia das Crianças por menos de R$ 100", "Ar-condicionado na Semana do Consumidor: 7 modelos", "Melhor X para comprar no 10.10", "vale esperar a Black Friday?". Toda menção a promoção com prazo carrega `valid_until` (seção 6). → https://www.nuvemshop.com.br/blog/calendario-comercial/ ; https://business.google.com/br/think/consumer-insights/calendario-marketing-2026/index.html

**Demanda real na Amazon.com.br** (sinal de prioridade): campeões do Prime Day 2026 — Elseve Óleo Extraordinário, Cif, lava-roupas líquido, Campari, óleo Lola, Heinz, figurinhas da Copa, papel higiênico, PS5 Slim Digital, iPhone 16 e 17, LEGO Classic, livro "O Massacre da Família Hope", kit 12 potes herméticos Electrolux, Ray-Ban Justin. Bestsellers recorrentes (Nuvemshop): Kindle, Fire TV Stick, Echo Pop, fones Bluetooth, filtro de linha, robô aspirador, café moído, caixas de som, Hot Wheels/Uno/Dobble, kits de camisetas/meias/cuecas, mouse sem fio, suporte para notebook, mop giratório, potes herméticos, cadeira gamer, escrivaninha, óleo capilar, protetor labial, hidratante facial, fraldas, creme de assaduras. → https://www.aboutamazon.com.br/noticias/loja/saiba-quais-foram-os-itens-mais-vendidos-do-prime-day-2026-no-brasil

### 7.11 Os 15 clusters de categoria (exemplos de temas por estágio)

Critério de priorização: comissão oficial × ticket médio × volume (Prime Day/bestsellers). Para cada categoria: 1 pilar `/melhores/melhor-x` (2.000-3.000 palavras), 2-3 satélites de meio, 1 "X ou Y" de categoria, 4-6 reviews dos produtos da pilar, 1-2 comparativos "A vs B" e 2 guias de dor; linkagem bidirecional + 6-10 links contextuais + módulo "Mais em [categoria]". Meta: 12-15 URLs por cluster em 60 dias; novo cluster só depois.

**1/15 — Casa e Cozinha** (eletroportáteis, 8%, ticket R$ 250-1.500, maior volume de buscas de compra no BR)
- Fundo: "Air fryer Mondial AF-30 é boa?", "Robô aspirador Wap Robot W100 vale a pena?", "Cafeteira Dolce Gusto Genio S review", "Panela elétrica Philco é boa?"
- Meio: "Melhor air fryer 2026", "Air fryer oven ou tradicional", "Melhor robô aspirador até R$ 1.000", "Melhor cafeteira expresso para casa", "Qual a melhor marca de liquidificador", "Purificador de água ou filtro de barro"
- Topo: "Como fritar sem óleo e sem fumaça na cozinha pequena", "Casa com pelos de pet: como manter o chão limpo", "Como economizar gás cozinhando", "Água com gosto de cloro: o que fazer"

**2/15 — Beleza e Cuidados Pessoais** (13%, líder de volume no Prime Day 2026, recompra alta)
- Fundo: "Secador Taiff Fox Ion é bom?", "Protetor solar La Roche Anthelios vale a pena?", "Cicaplast B5 review", "Barbeador Philips OneBlade é bom?"
- Meio: "Melhor protetor solar facial para pele oleosa", "Melhor secador de cabelo profissional 2026", "Prancha ou escova secadora", "Melhor perfume masculino até R$ 200", "Melhor esfoliante labial"
- Topo: "Pele oleosa no verão: rotina simples que funciona", "Cabelo com frizz no calor: o que usar", "Presente de Dia das Mães para quem gosta de skincare", "Barba irritada: como evitar"

**3/15 — Saúde, Suplementos e Bem-estar** (13%, recompra mensal: whey, creatina, vitaminas; aparelhos de cuidados pessoais)
- Fundo: "Creatina Growth é boa?", "Whey Dux vale a pena?", "Massageador de pescoço Relaxmedic review", "Balança bioimpedância Xiaomi é boa?"
- Meio: "Melhor creatina 2026", "Whey concentrado ou isolado", "Melhor termogênico", "Melhor almofada lombar ortopédica", "Melhor travesseiro para dor no pescoço", "Lavitan ou Centrum"
- Topo: "Dor nas costas ao dirigir: causas e o que ajuda", "Como dormir melhor: hábitos + 5 produtos", "Como começar a tomar creatina", "Dor no punho de quem usa notebook: como aliviar"
- Atenção: suplementos com ingredientes farmacêuticos estão em Publisher Restrictions do AdSense (seção 5.3); conteúdo de saúde é YMYL (disclaimer obrigatório).

**4/15 — Bebê e Maternidade** (13% + bônus Lista do Bebê R$ 6+6; pais pesquisam muito e compram em kit)
- Fundo: "Babá eletrônica Motorola é boa?", "Fralda Pampers Premium Care vale a pena?", "Esterilizador Multikids review", "Carrinho Burigotto é bom?"
- Meio: "Melhor babá eletrônica 2026", "Melhor cadeirinha de carro por faixa etária", "Melhor fralda custo-benefício", "Bebê conforto ou cadeirinha", "Melhor berço portátil"
- Topo: "Bebê não dorme: o que fazer e o que ajuda", "Lista de enxoval essencial (sem exageros)", "Assadura: como prevenir", "Presente para chá de bebê até R$ 150"

**5/15 — Pet Shop** (11%, nicho emocional e recorrente: ração, areia, tapete)
- Fundo: "Bebedouro automático Petlon é bom?", "Ração Golden é boa?", "Caixa de areia fechada Furba review", "Rastreador GPS para cachorro vale a pena?"
- Meio: "Melhor bebedouro fonte para gatos 2026", "Melhor ração para cachorro filhote custo-benefício", "Tapete higiênico ou sanitário canino", "Melhor comedouro automático", "Melhor arranhador"
- Topo: "Gato bebe pouca água: como estimular", "Cachorro destruindo a casa quando fica sozinho", "Pelos de pet no sofá: como resolver", "Cheiro de xixi de gato: como eliminar"

**6/15 — Dispositivos Amazon e Casa Inteligente** (9,5% em Echo/Fire TV/Kindle + 8% em lâmpadas, câmeras Wi-Fi, fechaduras; itens mais vendidos da Amazon.com.br)
- Fundo: "Kindle Paperwhite 2026 vale a pena?", "Echo Pop é bom?", "Fire TV Stick 4K review", "Fechadura digital Intelbras é boa?"
- Meio: "Kindle ou Kobo", "Qual Kindle comprar", "Echo Dot ou Echo Pop", "Melhor câmera Wi-Fi para casa", "Melhor lâmpada inteligente barata", "Fire TV Stick ou Chromecast"
- Topo: "Como automatizar a casa gastando pouco", "Como ler mais em 2026 (e por que o e-reader ajuda)", "TV antiga ficou lenta: como deixar smart", "Como monitorar a casa quando viaja"

**7/15 — Áudio e Acessórios de Celular** (8%, ticket baixo mas volume enorme: fones TWS, caixas de som, carregadores, power bank, smartwatch)
- Fundo: "Fone QCY T13 é bom?", "JBL Go 4 vale a pena?", "Galaxy Buds FE review", "Smartwatch Amazfit Bip 6 é bom?"
- Meio: "Melhor fone Bluetooth até R$ 200", "Melhor fone com cancelamento de ruído custo-benefício", "Melhor caixa de som para festa", "Melhor power bank para viagem", "Relógio para treino e esportes"
- Topo: "O que levar para festa na praia (som, gelo, energia)", "Como dormir com barulho: fones e abafadores que funcionam", "Celular descarrega rápido na viagem: como resolver", "Como ouvir música na academia sem fio caindo"

**8/15 — Informática e Home Office** (8%, ticket alto em monitor/cadeira/notebook; home office consolidado)
- Fundo: "Cadeira gamer ThunderX3 é boa?", "Monitor LG UltraGear 24 review", "Suporte para notebook Octoo vale a pena?", "Mouse Logitech M170 é bom?"
- Meio: "Melhor cadeira ergonômica até R$ 1.000", "Melhor monitor para home office 2026", "Notebook para estudar e trabalhar", "Melhor teclado e mouse sem fio", "Cadeira gamer ou cadeira de escritório"
- Topo: "Dor nas costas no home office: ergonomia + o que comprar", "Como montar um home office pequeno e barato", "Notebook esquentando: causas e soluções", "Olhos cansados de tela: o que ajuda"

**9/15 — Celulares e Tablets** (8%, ticket R$ 1.000-8.000: a comissão por venda é das maiores em reais; fundo de funil fortíssimo — mas concorrência forte, ver 3.3)
- Fundo: "Galaxy A57 é bom?", "Redmi Note 15 Pro review", "iPhone 16 ainda vale a pena em 2026?", "Tablet Samsung A9 é bom para estudar?"
- Meio: "Melhor celular custo-benefício 2026", "Melhor celular até R$ 1.500", "Galaxy A57 vs A56", "Melhor celular para fotos", "Melhor celular para idosos", "Melhor tablet para estudar"
- Topo: "Celular esquentando muito", "Celular não carrega", "Memória cheia: o que fazer", "Primeiro celular do filho: o que considerar"

**10/15 — TV, Games e Entretenimento** (8%, ticket alto: TV 50-65", soundbar, PS5/Switch e acessórios)
- Fundo: "TV TCL 55 P7K é boa?", "Soundbar JBL Cinema SB170 review", "Xbox Series S ainda vale a pena em 2026?", "Controle DualSense Edge vale a pena?"
- Meio: "Melhor TV 55 polegadas 2026", "Melhor smart TV até R$ 2.500", "Soundbar ou home theater", "Melhor headset gamer custo-benefício", "PS5 ou Xbox Series X", "Melhor TV para PS5"
- Topo: "Som da TV baixo e difícil de entender diálogos: como resolver", "Como escolher o tamanho da TV pela distância do sofá", "Presente para gamer até R$ 300", "Copa do Mundo 2026: como preparar a sala"

**11/15 — Clima e Eletrodomésticos** (8%, forte sazonalidade de verão/Natal: ar-condicionado, ventilador, climatizador, umidificador; grandes eletros via Amazon)
- Fundo: "Ventilador Arno Silence Force é bom?", "Ar-condicionado portátil Elgin review", "Climatizador Consul vale a pena?", "Umidificador Multilaser é bom?"
- Meio: "Ventilador de teto ou ar-condicionado: qual gasta menos", "Melhor ventilador de coluna 2026", "Melhor ar-condicionado portátil", "Ar-condicionado de janela ou split", "Melhor climatizador para quarto"
- Topo: "Calor para dormir: como refrescar o quarto sem ar-condicionado", "Ar seco no inverno: nariz entupido e o que ajuda", "Mofo no quarto: como resolver", "Conta de luz alta no verão: o que mais gasta"

**12/15 — Ferramentas, Construção e Jardim** (8%, nicho "campeão" em blogs de review: parafusadeira, furadeira, kit de ferramentas, lavadora de alta pressão, aspirador de pó)
- Fundo: "Parafusadeira Wap 12V é boa?", "Furadeira Bosch GSB 13 RE review", "Lavadora Karcher K2 vale a pena?", "Kit de ferramentas Tramontina 110 peças é bom?"
- Meio: "Melhor parafusadeira a bateria até R$ 300", "Furadeira ou parafusadeira", "Melhor lavadora de alta pressão para carro", "Melhor kit de ferramentas para casa", "Melhor aspirador de pó vertical"
- Topo: "Como furar parede sem rachar o azulejo", "Como montar móvel sozinho sem estragar", "Presente de Dia dos Pais para quem gosta de consertar", "Como lavar o carro em casa gastando pouca água"

**13/15 — Esportes, Fitness e Lazer** (8%, buscas altas em treino em casa, bike, camping, garrafas térmicas)
- Fundo: "Esteira Dream Fitness é boa?", "Garrafa Stanley vale a pena?", "Bicicleta Caloi Explorer review", "Tapete de yoga Acte é bom?"
- Meio: "Melhor esteira para casa 2026", "Halteres ajustáveis ou kit de anilhas", "Melhor garrafa térmica custo-benefício", "Melhor barraca de camping para 4 pessoas", "Melhor bicicleta até R$ 2.000"
- Topo: "Como começar a treinar em casa sem equipamento caro", "O que levar para acampar pela primeira vez", "Dor no joelho ao correr: o que ajuda", "Como manter água gelada o dia todo no calor"

**14/15 — Livros, Kindle e Papelaria/Volta às Aulas** (10% livros + bônus Kindle Unlimited R$ 15 + 8% papelaria; pico em janeiro/fevereiro e Dia do Leitor)
- Fundo: "Kindle Unlimited vale a pena?", "Mochila Dell Essential é boa?", "Caneta Bobbie Goods vale a pena?", "Planner 2027 X review"
- Meio: "Melhor mochila escolar 2026", "Melhor lancheira térmica", "Kindle ou livro físico", "Melhor tablet para ler PDF", "Melhor caneta para estudar"
- Topo: "Lista de material escolar: o que realmente precisa", "Como ler mais em 2026", "Presente para quem ama ler até R$ 100", "Como organizar os estudos para o vestibular"

**15/15 — Automotivo** (7%, mas ticket médio e dor forte: suporte de celular, câmera veicular, aspirador portátil, almofada lombar, carregador, cera, pneu/calibrador)
- Fundo: "Câmera veicular 70mai é boa?", "Aspirador portátil Wap vale a pena?", "Suporte Baseus magnético review", "Almofada lombar para carro X é boa?"
- Meio: "Melhor almofada lombar para carro 2026", "Melhor câmera veicular até R$ 400", "Melhor suporte de celular para carro", "Melhor aspirador portátil para carro", "Cera líquida ou pasta"
- Topo: "Dor nas costas ao dirigir: ajustes de banco + 5 produtos", "Como viajar de carro com crianças sem estresse", "Vidro embaçando na chuva: o que fazer", "Como manter o carro limpo com cachorro"

### 7.12 Guard-rails do pipeline e métricas

**Guard-rails (4 lotes de 5 artigos/dia):** cada artigo precisa de (1) palavra-chave e estágio atribuídos a um cluster existente, (2) checagem de canibalização contra URLs já publicadas, (3) ≥1 dado próprio, (4) resposta direta no primeiro parágrafo, (5) ≥6 links internos (pilar + irmãos), (6) prós/contras e preço datado (só via API), (7) 5-7 perguntas de PAA, (8) revisão humana com autor real antes de publicar. **Preferir 8-10 artigos/dia bem feitos a 20 iguais** — o update de março/2026 puniu exatamente a escala com padrão (domínios com >500 páginas/mês de padrão semelhante caíram >71%).

**Validações automáticas** (consolidadas de `br-sites.json`, `intl-sites.json`, `amazon-associates-br.json`): nº de produtos no título = nº de blocos; ano no título = ano atual; nenhum placeholder ("%", "{{", "em é"); mesmo nome/ASIN/specs em card, tabela e texto; toda imagem bate com ASIN e tem `image_source` permitido; todo link Amazon tem `?tag=` e voltagem; nenhum encurtador não autorizado; "Atualizado" ≥ "Publicado"; FAQ com 4-7 perguntas; disclosure acima da dobra; nota dentro da escala; nenhum valor em R$/percentual/"promoção"/"estrelas" sem API; mínimo de prova de experiência antes de publicar; schema válido no Rich Results Test.

**Métricas por estágio no GSC:** fundo = cliques e CTR por URL de review e "é bom"; meio = impressões/posição das pilares e satélites; topo = impressões de perguntas e presença em AIO (cliques de AIO entram no tipo "Web"); acompanhar buscas pela marca "reviewprodutos" como sinal de confiança (sites com >8.000 cliques de marca/ano resistiram melhor em 2026 `[confiança média]`); conversões de afiliado por página e por tracking ID.

---
## 8. Riscos e mitigação

| # | Risco | Evidência (dos relatórios) | Mitigação |
|---|---|---|---|
| 1 | **Conteúdo em escala enquadrado como "scaled content abuse"** | Política de spam (2026-08-28): muitas páginas sem valor "não importa como foram criadas"; QRG (09/2025) manda Lowest a conteúdo parafraseado; avaliadores condenam o site inteiro por "forte suspeita"; Reviews System pode avaliar o site inteiro; domínios com >500 páginas/mês de padrão semelhante caíram >71% em mar/2026 `[média]`; Mueller (06/10/2026) cético com agregadores programáticos. | Começar com 8-10 artigos/dia; cluster atribuído, checagem de canibalização, ≥1 dado próprio, resposta direta, ≥6 links internos, revisão humana assinada; limitar artigos por categoria por semana; preferir atualizar a criar variação; poda mensal; uma lista canônica por intenção. |
| 2 | **IA sem revisão humana / autor fabricado** | Orientação de 01/10/2026: revisão manual "crítica" de texto, title, meta, schema e alt; "fabricar perfis de criadores" é engano; exemplo de violação de site reputation: sem autor/editor identificado. | Editor humano identificado edita e assina ("Revisado por"); página de autor real com foto, bio, sameAs; página "Como usamos IA"; nota "como este conteúdo foi produzido" por artigo; nunca "Equipe"/"Redação" como byline. |
| 3 | **Afiliado "thin" (Google + AdSense + Amazon ao mesmo tempo)** | Google: descrições/reviews copiados do comerciante = spam; AdSense: "shouldn't participate in affiliate programs without adding sufficient value"; Amazon (14/04/2026): conteúdo original exige "comentários, análises ou transformações" e listas precisam de "conteúdo original adicional"; core update mar/2026 puniu "best of" que reembalam texto de fabricante. | Templates com camada editorial obrigatória (critérios, para quem é, prós/contras específicos, alternativas, "também avaliamos"); evidência própria ou declaração honesta de método; ~40% de conteúdo informacional; links para múltiplos vendedores quando existir. |
| 4 | **AI Overviews/AI Mode comprimem cliques** | CTR ~8% com AIO vs ~15% sem (Pew via impact.com); "melhor X para Y", "X vs Y", "top 10" são as mais comprimidas; no BR, AIO em 35,3% das buscas de notícias e CTR da 1ª posição 21,4% → 8,93% (Authoritas/Cade); AIO cortaram 20-50% do tráfego de guias em alguns publishers `[média]`. | Priorizar buscas de decisão ("é bom", "vs", "vale a pena", "melhor para") e dores que terminam em compra; resposta direta no topo; conteúdo "não-commodity" com ponto de vista próprio; medir no GSC (filtro AIO/AI Mode); canais próprios (newsletter, WhatsApp/Telegram, comentários, YouTube); habilitar "Search generative AI features" e Preferred Sources; não investir em llms.txt/GEO. |
| 5 | **Volatilidade de comissões** | Cortes de até 50% em APAC (fim de 2025) e EUA (~mar/2026) sem anúncio público `[média]`; tabela BR sem data de vigência; Shopee "Comissões podem mudar sem aviso prévio"; Awin permite redução com ~7 dias de aviso; Amazon pode alterar o contrato com 7 dias. | Monitorar a Declaração de Receita mensalmente; priorizar categorias de 13%/11% com ticket alto; preparar adapters para Mercado Livre/Shopee/Awin (fase 2) sob a mesma camada de disclosure; AdSense como segunda perna; não planejar receita só em afiliado. |
| 6 | **Dormência/cancelamento da conta Amazon** | 3 vendas qualificadas em 180 dias ou cancelamento irreversível; 1 ano sem venda = encerramento por ociosidade; compras próprias não contam; Creators API exige 10 vendas/30 dias e suspende se cair. | Publicar 15-20 artigos antes de se inscrever; priorizar fundo de funil nos primeiros 180 dias; divulgar desde o dia 1 (respeitando regras de e-mail/DM); tracking IDs por tipo para saber o que converte; mirar ≥10 vendas/30 dias. |
| 7 | **Perda ou ausência de API (preço, imagem, estrelas)** | PA-API 5 descontinuada (HTTP 403); Creators API só com 10 vendas/30 dias; OffersV2/CustomerReviews sem documentação pública; SiteStripe sem imagem desde 12/2023 `[média]`; Buskando removeu preços em 02/10/2026. | "Modo sem API" como padrão: CTA sem preço, faixa qualitativa, fotos próprias/licenciadas, sem estrelas; componente de preço que degrada para botão; persistir só ASIN; `image_source` obrigatório; regex bloqueando valores em R$ no texto. |
| 8 | **Violação das Políticas Amazon (preço, imagem, avaliações, encurtador, scraping)** | Preço só via API com timestamp e aviso; imagem sem cache (24h); avaliações só via API; encurtadores/cloaking proibidos (6(v), 6(w)); scraping/data mining proibidos; não treinar LLM com Conteúdo do Programa; promoções expiradas devem ser removidas; licença de marca encerra automaticamente com violação. | Componente `<AmazonLink>` único; lint de links; job de `valid_until`; nenhum crawler em amazon.com.br; API só para campos estruturados exibidos com "AS IS"; logo Amazon inalterado; frase de disclosure testada no build. |
| 9 | **Reprovação ou suspensão no AdSense** | Motivos oficiais: conteúdo insuficiente, afiliado sem valor, navegação, violações; Publisher Policies proíbem ads em conteúdo que viole spam da Busca ou "replicated content"; Better Ads (>30% densidade mobile); CrUX ad metrics (set/2026) `[média]`; reprovações BR por "baixo valor" `[baixa]`. | Aplicar só com ~40-60 artigos indexados e páginas institucionais completas; 3-4 slots fixos com espaço reservado; rótulo "Publicidade"; nada perto de botões/tabelas; sem ads em páginas sem conteúdo; CMP para EEE + banner ANPD; Policy Center semanal. |
| 10 | **Core updates e Discover voláteis** | Calendário 2025-2026 com core em mar, jun, dez/2025, mar e mai/2026 e spam em ago/2025, mar, jun, ago, set/2026; recuperação "pode levar vários meses"; Discover: Follow removido (11/2025), desktop sumiu (09/2026), update de fev/2026 ainda expandindo. | Não reagir durante rollout; comparar com as datas do dashboard; autoavaliar o site inteiro; tratar Discover como suplementar e medir separado; construir expertise por tópico (clusters) em vez de espalhar. |
| 11 | **Dependência total do Google** | Reviewed vendido pela Gannett citando "Google's constant algorithm changes"; RTINGS fechou dados e virou membership; AIO cortaram receita de afiliados em 20-40% em alguns publishers `[média]`. | Newsletter de ofertas de produtos já recomendados (double opt-in), canal WhatsApp/Telegram (Achados do TB: 100 mil seguidores), comentários moderados, enquete "o que testar", RSS/Atom, YouTube com os testes, busca interna/Finder por dor. |
| 12 | **YMYL / saúde** | "dor de ouvido" = SERP de medicamentos e farmácias; Zoom recomenda colchão para dor sem aviso médico; Publisher Restrictions para suplementos farmacológicos; Google exige mais E-E-A-T em YMYL. | Evitar dores que levam a remédio (ouvido, garganta); template "Guia de problema" com causas, critérios normativos (NR17, D33/D45, Inmetro), soluções não comerciais, "quando procurar um profissional" e disclaimer fixo; fontes confiáveis citadas; sem promessa de cura. |
| 13 | **Não conformidade legal (CONAR/CDC/LGPD)** | Guia CONAR vigente desde 01/06/2026 trata afiliado como publicidade com identificação imediata `[média]`; CDC art. 36; ANPD: consentimento como base para cookies de publicidade; EU User Consent Policy por localização do usuário; Amazon BR cita Marco Civil, LGPD e CONAR. | Disclosure em 3 camadas com rótulo "Publicidade"/"Link de afiliado" junto a cada botão; #publi em posts sociais; política de privacidade com itens do art. 9º LGPD e os 4 pontos do AdSense; banner de dois níveis; CMP certificada; registro de consentimento; confirmar texto integral do CONAR. |
| 14 | **Erros de pipeline que destroem confiança** | CupomOnline ("%currentyear%", "em é", "Top 8" com 5), mybest (Oster/Arno como aspiradores), BestReviews (12" vs 14"), Buscapé (publicado 2021 em página 2026), Zoom ("12 modelos" com 9), TechTudo (R$ 229 vs R$ 206). | Validação automática pré-publicação (contagem, ano, placeholders, imagem = ASIN, datas, disclosure, schema, coerência card/tabela/texto); changelog humano; "Histórico de atualizações". |
| 15 | **Voltagem e variantes de modelo erradas** | Mesmo modelo com fichas e preços diferentes por tensão; códigos AFN-40-BI/BF/TBI/F, HT10/BH24HT08A; link para voltagem errada gera devolução (sem comissão) e perda de confiança; comissão onsite restrita à mesma variante de ASIN (14/04/2026). | Campo "voltagens" com ASIN por tensão; botão por voltagem; indicar o código exato do modelo; aviso "Confira a voltagem da sua região (127V/220V)"; seção "Armadilhas dos anúncios". |
| 16 | **Prometer teste que não houve** | Panelas e Cozinha ("Testamos as Mais Vendidas"), RevisaLar ("Boletim de Testes" sem protocolo), BestReviews ("most of our top five"); Google jul/2026: reviews "não baseados em experiência genuína" podem gerar ação manual. | Rotular "avaliado por pesquisa (não testado em mãos)" vs "testado"; manter não testados fora de títulos com "testado"; "Como montamos esta lista" dizendo exatamente o que foi feito; medições e fotos com data quando testar. |

---

## 9. Perguntas em aberto

Consolidação das `open_questions` dos seis relatórios, deduplicadas e agrupadas. Itens que um relatório deixou em aberto e outro respondeu estão marcados como **resolvidos entre relatórios**.

### 9.1 Resolvidas entre relatórios

- *Texto exato de disclosure do Associados BR e regras de exibição de preço/imagem/avaliações* (levantadas em `intl-sites`, `br-sites`, `google-reviews-seo`, `keyword-funnel`) → respondidas pela leitura das Políticas do Programa em `amazon-associates-br` (seção 6). Permanece aberta só a disponibilidade prática da Creators API no Brasil (9.2).
- *Cookie de 24h e 3 vendas/180 dias vinham de fontes secundárias* (`keyword-funnel`) → confirmados na fonte oficial (Regulamento de Comissões e página de dormência).

### 9.2 Amazon Associados e Creators API

1. A Creators API já está habilitada para contas do Amazon Associados **Brasil**? A rota associados.amazon.com.br/creatorsapi exige login e a FAQ fala em acesso "approved in that region"; só dá para confirmar no painel após as 10 vendas/30 dias.
2. A referência pública da Creators API lista apenas 7 recursos; o guia de migração cita OffersV2, mas não há página pública de OffersV2 nem de CustomerReviews. **Preço e estrelas estarão realmente disponíveis via API no marketplace BR?** Isso define se vale incluir Offer/price no markup Product.
3. O SiteStripe brasileiro ainda gera links de imagem? A ajuda BR descreve "Obter link: Imagem", mas a remoção global de dez/2023 sugere que não; verificar no painel.
4. Os cortes de comissão de 2026 (até 50% nos EUA/APAC) chegarão ao Brasil? A tabela oficial BR não tem data de vigência; monitorar a Declaração de Receita mensalmente.
5. Anúncios pagos (Google/Meta) que levam ao reviewprodutos.com.br — não à Amazon — e depois geram clique orgânico no link: a regra de 14/04/2026 fala em "anúncio pago ou impulsionado vinculado à Amazon" com "exceções limitadas"; confirmar com o suporte de associados antes de comprar tráfego.
6. Usar dados da Creators API (título, descrição, features) como insumo de prompt para gerar texto editorial viola a cláusula de não usar Conteúdo do Programa para "desenvolver ou aprimorar modelos de linguagem"? A cláusula mira treinamento, não inferência, mas é zona cinzenta; posição conservadora: API só para campos estruturados exibidos.
7. O que mudou exatamente na atualização do Contrato Operacional BR de 15/10/2025 (a página "O que mudou" só lista 14/04/2026)?
8. Como a Amazon.com.br exibe nota/avaliações para variantes de voltagem (ASINs separados ou unificados)? Impacta a exibição por produto quando a API estiver disponível.
9. Alternativas: critérios de aprovação de sites/blogs no Mercado Livre Afiliados e janela de cookie oficial (24h segundo blogs; páginas oficiais retornam 403); Shopee: cookie de 7 dias e base de cálculo divergem entre fontes; Magalu: uso de links em blogs não documentado.

### 9.3 Google, Reviews System e SEO

10. O Reviews System diferencia um review honesto "baseado em especificações e pesquisa" (sem teste físico) de um review com teste próprio? O Google só diz que recompensa "análise perspicaz e pesquisa original" e evidências de experiência. Decidir qual fração do catálogo terá teste físico real e **testar duas variantes de template ("Avaliado por pesquisa" vs. "Testado") medindo no Search Console**.
11. Volume: qual a tolerância prática do Google para o pipeline (20 artigos/dia) em domínio novo? Não existe limiar oficial; os dados de mar/2026 indicam risco acima de ~500 páginas/mês com padrão semelhante. Começar com 8-10/dia e observar o GSC por 8-12 semanas.
12. O Discover core update de fev/2026 ("expansão a todos os países e idiomas nos próximos meses") já alcançou pt-BR/Brasil? Medir no Search Console.
13. Qual a frequência real de AI Overviews/AI Mode em consultas **comerciais** em português no Brasil? O único dado nacional (35,3%, Authoritas) é de buscas de notícias; os dados de queda de CTR são majoritariamente dos EUA. Checar a cobertura de AIO nas palavras-chave alvo antes de calibrar SEO vs. canais próprios.
14. As CrUX ad metrics (set/2026) passarão a influenciar page experience/ranking? O Chrome diz que não fazem parte dos CWV e não têm thresholds; acompanhar.
15. O "September 2026 spam update" (em fases até início de out/2026) tem alvo específico em conteúdo de IA sem revisão? Sem confirmação oficial; só especulação da imprensa.
16. Como marcar em dados estruturados a nota editorial em comparativos (dois Product com Review cada) sem ambiguidade — a doc de nov/2025 pede aninhamento claro; validar no Rich Results Test se o Google reconhece ambos.
17. Não há teste brasileiro isolando o efeito de ano/mês no título sobre CTR (dados: SearchPilot +5% em site de listagens; fornecedor com 423 títulos). Testar no próprio GSC (CTR antes/depois) em 20-30 pilares.
18. Volumes de busca reais em PT-BR para as consultas de dor ("dor nas costas ao dirigir", "casa cheia de mosquitos") e modificadores de meio ("até 500 reais", "custo benefício") não foram medidos: rodar Planejador de palavras-chave (Brasil/português) e Google Trends (BR, 5 anos) por cluster antes de fixar a ordem de publicação.
19. Séries do Google Trends para "volta às aulas", "ventilador", "ar-condicionado" e "Black Friday" não puderam ser extraídas; as datas de início de pico vêm de calendários de e-commerce, não de dados de busca.
20. Conversão por categoria na Amazon.com.br (cliques → pedidos) não é pública; a priorização dos 15 clusters combinou comissão oficial, volume e ticket estimado — ajustar após 60-90 dias de dados reais do painel.
21. A página "Mais Vendidos" da Amazon.com.br retornou 503 — consultar manualmente ou via API a lista atual de bestsellers por categoria.

### 9.4 AdSense e privacidade

22. O Google não lista oficialmente Sobre/Contato como obrigatórios — são práticas da comunidade; a Política de Privacidade sim é exigida. Tratar como obrigatórias por precaução; a causa raiz das reprovações "low value content" não é publicada.
23. O que o Google considera "minor part" para conteúdo de afiliado "if the content adds no additional features" não é quantificado; a proporção ~40% informacional é inferência.
24. Texto oficial da LGPD no planalto.gov.br não foi acessado (HTTP 503 em duas tentativas); os itens dos arts. 8º (consentimento, ônus da prova, revogação) e 9º (informações ao titular) foram referenciados pelo Guia da ANPD e devem ser conferidos no texto legal antes de redigir a política.
25. Para um site BR com pouco tráfego europeu, a alternativa de simplesmente não servir anúncios a usuários do EEE/UK/CH (em vez de operar uma CMP TCF) não foi confirmada nas páginas oficiais; a CMP gratuita do Google elimina a dúvida na prática.
26. Não há orientação oficial sobre a distância aceitável entre um bloco AdSense e um box de produto Amazon ("material não relacionado de terceiros em proximidade"); recomenda-se separação visual clara e rótulo "Publicidade".
27. A ANPD indicou novas orientações sobre cookies/consentimento na agenda 2025-2026, mas até out/2026 nenhuma versão nova do guia foi localizada; acompanhar gov.br/anpd.
28. Os números práticos brasileiros (30 vs 60-80 artigos; 2-3 meses de idade) vêm de blogs com interesse comercial — heurística, não regra.
29. O comportamento do atributo `data-adsbygoogle-status` como marcador de slot preenchido é observado na prática, não documentado; testar em build de produção com ClientRouter.

### 9.5 Decisões editoriais e de produto

30. Com quais recursos reais o site vai testar produtos (compra própria, devolução dentro do prazo Amazon, amostras)? A promessa "compramos tudo que testamos" é o diferencial central de RTINGS/GearLab/Which?, mas só pode ser feita se for verdade; definir a política antes de escrever "Como ganhamos dinheiro".
31. Usar nota numérica (0-10/0-100 com sub-métricas, estilo GearLab/RTINGS) ou apenas selos + prós/contras (estilo Wirecutter/Engadget)? Nota facilita tabela/comparador e rich results, mas exige metodologia defensável por categoria desde o início.
32. Comentários e comunidade: agregam sinais de engajamento (Future/Verge), mas exigem moderação e têm risco de spam/reviews incentivados (regra do Google de jul/2026). MVP ou fase posterior?
33. Vale coletar avaliações de leitores no próprio site (habilitaria AggregateRating legítimo) considerando o custo de moderação e a regra de aceitar só notas com comentário e nome?

### 9.6 Concorrência e mercado

34. Melhor Escolha (melhorescolha.com) retornou 403 e as buscas só trouxeram descrições de terceiros — não foi possível confirmar se é concorrente relevante em produtos físicos.
35. UOL Guia de Compras e Estadão Recomenda bloquearam fetch e não apareceram em nenhuma busca "melhor [produto] 2026" — hipótese: pouco alcance orgânico ou conteúdo não indexado; verificar manualmente.
36. Tecnoblog, Pelando e o hub "Qual Comprar" do TechTudo bloquearam fetch direto; confirmar visualmente se o Tecnoblog exibe disclosure de afiliado nos guias e qual é a frase exata; a estrutura interna do Tecnoblog foi inferida pelo RSS.
37. As SERPs vieram do WebSearch (Firecrawl sem créditos); validar as 5 buscas-chave em google.com.br com localização Brasil.
38. Não foi possível medir tráfego/autoridade (DR, visitas) dos afiliados de nicho (RevisaLar, Buskando, Casa dos Eletrodomésticos, GDM, CupomOnline) — uma passada no Ahrefs/Semrush ajudaria a priorizar nichos.

### 9.7 Legal (CONAR)

39. O Guia CONAR 2026 foi lido via análises de escritórios e imprensa; não está claro se as regras de "identificação imediata" se aplicam formalmente a sites/blogs ou só a influenciadores em redes sociais — consultar o texto integral no site do CONAR.
40. As fontes divergem sobre se #publi é recomendado em complemento ou em substituição às ferramentas nativas de marcação; confirmar antes de fixar o padrão de identificação em posts sociais.

---

## 10. Fontes

Todas as URLs de evidência presentes nos seis relatórios, deduplicadas e agrupadas por tema. Caminhos citados de forma abreviada nos relatórios (sem URL completa) aparecem no fim de cada grupo, marcados como "caminho citado".

### 10.1 Google Search Central (fontes oficiais)

- https://developers.google.com/search/docs/appearance/reviews-system
- https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews
- https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews?hl=pt-br
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/essentials/spam-policies?hl=pt-br
- https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
- https://developers.google.com/search/blog/2019/09/evolving-nofollow-new-ways-to-identify
- https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- https://developers.google.com/search/docs/appearance/structured-data/product-snippet?hl=pt-br
- https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- https://developers.google.com/search/docs/appearance/structured-data/carousel
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- https://developers.google.com/search/docs/appearance/structured-data/faqpage
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/docs/appearance/core-web-vitals
- https://developers.google.com/search/docs/appearance/page-experience
- https://developers.google.com/search/docs/appearance/google-images
- https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/google-discover
- https://developers.google.com/search/blog/2026/02/discover-core-update
- https://developers.google.com/search/docs/appearance/preferred-sources
- https://developers.google.com/search/updates
- https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history
- https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf
- Caminhos citados (sob developers.google.com/search/docs/): `crawling-indexing/javascript/lazy-loading`; `crawling-indexing/consolidate-duplicate-urls`; `appearance/structured-data/organization`; `appearance/core-updates`; `appearance/avoid-intrusive-interstitials`.

### 10.2 Google AdSense, Publisher Policies, Chrome e Google Publisher Tag (fontes oficiais)

- https://support.google.com/adsense/answer/9724
- https://support.google.com/adsense/answer/81904
- https://support.google.com/adsense/answer/9061852
- https://support.google.com/adsense/answer/10015918
- https://support.google.com/adsense/answer/48182
- https://support.google.com/adsense/answer/1348695
- https://support.google.com/adsense/answer/1346295
- https://support.google.com/adsense/answer/10502938
- https://support.google.com/publisherpolicies/answer/10502938
- https://support.google.com/publisherpolicies/answer/11169917
- https://support.google.com/adsense/answer/10437795
- https://support.google.com/webtools/answer/7073774
- https://support.google.com/adsense/answer/12171612
- https://support.google.com/adsense/answer/12169212
- https://support.google.com/adsense/answer/13554116
- https://support.google.com/admanager/answer/9805023
- https://support.google.com/adsense/answer/9007336
- https://support.google.com/adsense/answer/9928203
- https://support.google.com/adsense/announcements/9189068
- https://support.google.com/adsense/answer/9261805
- https://support.google.com/adsense/answer/9727
- https://support.google.com/adsense/answer/7402256
- https://blog.google/products/adsense/how-to-address-insufficient-content/
- https://developers.google.com/publisher-tag/guides/minimize-layout-shift
- https://developer.chrome.com/blog/crux-ad-metrics
- Caminhos citados: `policies.google.com/technologies/partner-sites`; `google.com/settings/ads`; `aboutads.info`.

### 10.3 Amazon Associados Brasil e Creators API (fontes oficiais)

- https://associados.amazon.com.br/help/operating/agreement
- https://associados.amazon.com.br/help/operating/policies
- https://associados.amazon.com.br/help/node/topic/GRXPHT8U84RAYDXZ
- https://associados.amazon.com.br/help/node/topic/G7MJTPEP9NC3YKMG
- https://associados.amazon.com.br/help/operating/compare
- https://associados.amazon.com.br/help/node/topic/GJMMT7G4C8K4Y3AY
- https://affiliate-program.amazon.com/help/operating/agreement (versão EUA, usada em `google-reviews-seo`)
- https://affiliate-program.amazon.com/creatorsapi/docs/en-us/introduction
- https://affiliate-program.amazon.com/creatorsapi/docs/en-us/concepts/common-request-headers-and-parameters
- https://affiliate-program.amazon.com/creatorsapi/docs/en-us/paapiv5-deprecation
- https://www.aboutamazon.com.br/noticias/loja/saiba-quais-foram-os-itens-mais-vendidos-do-prime-day-2026-no-brasil
- Formato de link citado: `https://www.amazon.com.br/dp/ASIN?tag=SEUID-20` / `https://www.amazon.com.br/dp/{ASIN}?tag={ID}-20`

### 10.4 Amazon — fontes secundárias

- https://dev.to/th3nate/amazon-pa-api-v5-is-shutting-down-april-30-2026-here-is-what-changes-at-the-auth-layer-22ek
- https://amalinkspro.com/?p=34288
- https://conductatlas.com/platform/amazon-associates/amazon-associates-program-policies/provision/CA-P-064523/customer-reviews-require-api-link-to-display/
- https://marketing4ecommerce.net/en/amazon-creator-central-influencers-affiliates/
- https://www.shopifreaks.com/amazon-quietly-slashed-associates-affiliate-commission-rates-by-up-to-50-across-publisher-ecosystem-and-gutted-reporting-tools/
- https://www.divulganinja.com.br/blog/quanto-ganha-um-afiliado-amazon-no-brasil-2026/
- https://formulaninja.com.br/amazon-associates-brasil-vale-a-pena/

### 10.5 Outros programas de afiliados no Brasil

- https://www.hostinger.com/br/tutoriais/comissao-afiliado-mercado-livre
- https://www.cupomonline.com.br/afiliado-shopee-como-funciona/
- https://ecommercenapratica.com/parceiro-magalu-vale-a-pena/
- https://www.awin.com/docs.awin.com/Legal/Publisher+Terms/2025/BR_PT-Awin-Brazil-Publisher-terms-August-2025.pdf

### 10.6 Regulação brasileira (CONAR, ANPD)

- https://www.uai.com.br/networking-e-negocios/2026/09/23/ganha-comissao-com-link-de-afiliado-para-o-conar-isso-ja-e-publicidade/
- https://www.gov.br/anpd/pt-br/documentos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf

### 10.7 Sites internacionais de review analisados

- https://www.nytimes.com/wirecutter/reviews/best-office-chair/
- https://www.nytimes.com/wirecutter/about/
- https://www.rtings.com/tv/reviews/best/tvs
- https://www.consumerreports.org/appliances/air-purifiers/best-air-purifiers-of-the-year-a1197763201/
- https://www.which.co.uk/reviews/washing-machines/article/which-washing-machine-should-you-buy-aafjl7E6UgGx
- https://www.tomsguide.com/best-picks/best-tvs
- https://www.techradar.com/best/best-laptops
- https://www.cnet.com/tech/computing/best-laptop/
- https://www.reviewed.com/vacuums/best-right-now/best-cordless-stick-vacuums
- https://www.theverge.com/tech/983554/hp-omnibook-3-16-snapdragon-laptop-review
- https://www.goodhousekeeping.com/what-to-buy/g71595487/the-best-vacuums/
- https://www.outdoorgearlab.com/topics/camping-and-hiking/best-backpacking-tent
- https://www.outdoorgearlab.com/reviews/camping-and-hiking/backpacking-tent/big-agnes-copper-spur-ul3
- https://www.techgearlab.com/topics/audio/best-wireless-earbuds
- https://bestreviews.com/bed-and-bath/mattresses/best-mattresses
- https://www.engadget.com/computing/laptops/best-laptops-120008636.html
- https://www.pcmag.com/picks/the-best-laptops
- https://www.trustedreviews.com/best/best-laptops-3431966
- https://www.trustedreviews.com/reviews/asus-zenbook-duo-2026

### 10.8 Contexto de mercado internacional e imprensa especializada em SEO

- https://pressgazette.co.uk/press-gazette-events/google-ai-overviews-leading-to-affiliate-revenue-drop-of-20-40-at-some-publishers/
- https://www.back2gaming.com/news/rtings-locks-full-test-results-behind-a-paywall-to-combat-ai-scraping/
- https://www.searchenginejournal.com/google-updates-site-reputation-abuse-policy-removes-penalties-in-eea/587423/
- https://www.searchenginejournal.com/google-expands-review-guidelines-and-warns-of-manual-actions/583674/
- https://www.seroundtable.com/google-seo-large-product-aggregator-42232.html
- https://www.affiversemedia.com/googles-march-2026-core-update-hit-affiliate-sites-harder-than-any-other-category/
- https://impact.com/affiliate/googles-new-ai-overview-feature-can-affect-product-review-sites/
- https://www.ranktracker.com/blog/google-ai-mode-for-amazon-affiliate-stores/

### 10.9 Sites nacionais analisados

**TechTudo**
- https://www.techtudo.com.br/listas/2026/01/8-air-fryers-que-valem-a-pena-em-janeiro-de-2026-edqualcomprarlb.ghtml
- https://www.techtudo.com.br/listas/2026/03/melhor-fone-de-ouvido-bluetooth-custo-beneficio-em-2026-edqualcomprarie.ghtml
- https://www.techtudo.com.br/listas/2026/10/testado-e-aprovado-melhor-celular-custo-beneficio-para-comprar-em-outubro-edqualcomprarmb.ghtml
- https://www.techtudo.com.br/guia/2025/12/ter-air-fryer-e-uma-boa-mesmo-comprei-e-conto-se-vale-a-pena-lb.ghtml
- https://www.techtudo.com.br/eletronicos/qual-comprar/

**Buscapé**
- https://www.buscape.com.br/conteudo
- https://www.buscape.com.br/fritadeira/conteudo/melhor-air-fryer
- https://www.buscape.com.br/fritadeira/fritadeira-eletrica-sem-oleo-mondial-air-fryer-family-afn-40-bi-capacidade-4l
- https://www.buscape.com.br/celular/conteudo/melhor-celular-ate-1500-reais
- https://www.buscape.com.br/celular/conteudo/melhores-celulares
- https://www.buscape.com.br/celular/conteudo/celular-esquentando-muito-motivos-como-resolver
- https://www.buscape.com.br/ar-condicionado/conteudo/melhor-ar-condicionado-de-janela
- https://www.buscape.com.br/console-de-video-game/conteudo/xbox-series-s-review

**Zoom**
- https://www.zoom.com.br/fritadeira
- https://www.zoom.com.br/fritadeira/deumzoom/melhor-air-fryer-do-mercado
- https://www.zoom.com.br/fritadeira/deumzoom/qual-a-melhor-marca-de-air-fryer
- https://www.zoom.com.br/fritadeira/deumzoom/melhores-air-fryers-custo-beneficio
- https://www.zoom.com.br/fone-de-ouvido-e-headset/deumzoom/melhores-fones-de-ouvido
- https://www.zoom.com.br/colchao-casal-solteiro/deumzoom/colchao-ortopedico
- https://www.zoom.com.br/celular/deumzoom/galaxy-a57-vs-galaxy-a56

**Canaltech**
- https://canaltech.com.br/fritadeiras/analise/review-mondial-family-afn-40-bf-airfryer-de-4l-com-cesto-quadrado/
- https://canaltech.com.br/eletro/ventilador-de-teto-ou-ar-condicionado-no-23-c-qual-gasta-menos-luz/

**Tecnoblog**
- https://tecnoblog.net/politica-editorial/
- https://tecnoblog.net/guias/melhores-celulares/
- https://tecnoblog.net/feed/

**Demais portais e comparadores**
- https://www.tudocelular.com/
- https://www.showmetech.com.br/air-fryers-com-desconto-no-prime-day-2026/
- https://www.showmetech.com.br/como-usar-o-pelando-para-economizar/
- https://olhardigital.com.br/2026/03/27/pro/na-duvida-de-qual-celular-comprar-quer-uma-tv-nova-o-od-te-ajuda/
- https://www.proteste.org.br/
- https://www.promobit.com.br/blog/melhores-carrinhos-de-bebe/
- https://www.pelando.com.br/
- https://www.melhorescolha.com/
- https://www.oficinadanet.com.br/smartphones/comparacao-apple-iphone-16,xiaomi-redmi-note-14-pro-5g
- https://www.mundoconectado.com.br/

**Afiliados de nicho**
- https://br.my-best.com/19905
- https://melhorairfryer.com.br/
- https://revisalar.com.br/melhor-fone-de-ouvido-custo-beneficio/
- https://buskando.com.br/blog/melhores-air-fryers-2026
- https://www.casadoseletrodomesticos.com.br/melhor-robo-aspirador-custo-beneficio
- https://gdm.com.br/mondial-family-afn-40-bi/
- https://www.cupomonline.com.br/melhor-robo-aspirador-custo-beneficio/
- https://dicasdovizinho.com.br/melhor-air-fryer/
- https://reviewbox.com.br/

**YMYL (exemplo de SERP a evitar)**
- https://www.tuasaude.com/remedio-para-dor-de-ouvido/

### 10.10 SEO, mercado brasileiro e estudos de terceiros

- https://www.conversion.com.br/blog/google-core-update-marco-2026-impacto (também citada com barra final: https://www.conversion.com.br/blog/google-core-update-marco-2026-impacto/)
- https://conjur.com.br/2025-nov-28/recurso-de-ia-nas-buscas-do-google-reduz-trafego-de-sites-de-noticias-em-206/
- https://www.workshopdigital.com/blog/content-refresh-analysis/
- https://ustechautomations.com/resources/blog/how-we-ab-tested-423-seo-titles-for-clickthrough-rate-2026
- https://meuredator.com.br/a-estrutura-de-topicos-topic-clusters/
- https://www.edialog.com.br/as-pessoas-tambem-perguntam-people-also-ask/
- https://www.nuvemshop.com.br/blog/calendario-comercial/
- https://business.google.com/br/think/consumer-insights/calendario-marketing-2026/index.html

### 10.11 AdSense — casos brasileiros e implementação técnica

- https://kildaryoliver.com.br/blog-aprovado-google-adsense-estudo-de-caso/
- https://blogueirainteligente.com.br/blog-reprovado-no-adsense/
- https://docs.astro.build/en/guides/view-transitions/
- https://dev.to/vibeberry/how-we-integrated-google-adsense-into-a-nextjs-app-router-project-the-right-way-4540
- Script citado (não é fonte de evidência): `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX`

---

*Documento gerado em 07/10/2026 a partir dos seis relatórios de pesquisa listados na abertura. Nenhuma informação foi acrescentada por pesquisa externa a esses relatórios.*
