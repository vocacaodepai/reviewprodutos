# Rotina de lote: 5 artigos por rodada

Roteiro completo da publicação diária do Review Produtos. É executado por uma **Routine do Claude Code** (assinatura do Claude, sem chave de API paga) 4 vezes por dia: 06:52, 09:52, 18:52 e 21:52 de Brasília. Cada rodada publica **5 artigos**, totalizando 20 por dia.

Ele substitui o antigo agendamento do GitHub Actions (`.github/workflows/publicar-artigos.yml`), que segue disponível só para disparo manual com `ANTHROPIC_API_KEY`. O padrão editorial, a fila, o schema e o validador são os mesmos; nada muda na qualidade.

Trabalhe sozinho até o fim, sem perguntar nada ao usuário.

## 1. Preparar um clone isolado

```bash
rm -rf /tmp/rp-lote-*                                   # clones órfãos de rodadas anteriores
DIR=/tmp/rp-lote-$(date +%s)
git clone -q https://github.com/vocacaodepai/reviewprodutos "$DIR" && cd "$DIR"
git checkout -q -B claude/lote-$(TZ=America/Sao_Paulo date +%Y%m%d-%H%M) origin/main
npm ci --silent
```

Todo o trabalho (artigos, validação, commit, push) acontece nesse clone. Nunca trabalhe em `/home/user/reviewprodutos`, que é usado em conversas com o usuário. No fim, sempre `rm -rf "$DIR"`, publicando ou não.

Leia, no clone, inteiros: `CLAUDE.md`, `docs/PADRAO-EDITORIAL.md`, `src/content.config.ts` e este arquivo.

## 2. Escolher 5 temas da fila

Fila: `content/queue/topics.json` (`temas[]`, com `status` pending | in_progress | published | skipped).

1. Considere só `status: "pending"`, menor `prioridade` primeiro, na ordem do arquivo.
2. Os 5 temas devem ser de **5 categorias diferentes** e, quando houver na mesma prioridade, misturar formatos: pelo menos 1 `lista`, 1 `review` e 1 `comparativo`.
3. Antes de aceitar um tema, confira se o site já não cobre o mesmo produto principal com a mesma intenção (`ls src/content/artigos/*/` e `grep -rl "<modelo>" src/content/artigos`). Review de um produto que já aparece numa lista é permitido (intenções diferentes); dois reviews do mesmo produto não. Se duplicar, marque `skipped` com o motivo e pegue o próximo.
4. Confira se não há PR aberto de lote anterior ainda não mesclado (`mcp__github__list_pull_requests`, state open, head `claude/lote-*`). Se houver, não repita os temas dele.

## 3. Escrever os 5 artigos em paralelo

Lance **5 subagentes em paralelo** (ferramenta Agent, um por tema, todos na mesma mensagem), cada um com o prompt abaixo preenchido com o `id` do tema e o caminho do clone. Escrever em paralelo mantém a qualidade de cada artigo (contexto limpo por tema) e cabe na janela da rodada.

```text
Você é redator do site reviewprodutos.com.br (repositório em <DIR>). Escreva UM artigo novo, completo e publicável, para o tema da fila editorial com id `<ID>` (veja o objeto em content/queue/topics.json: tipo, categoria, subcategoria, funil, titulo_sugerido, problema, palavras_chave, produtos_candidatos).

1. Leia por inteiro docs/PADRAO-EDITORIAL.md (padrão obrigatório, inclusive regras YMYL de saúde e bebês), src/content.config.ts (schema) e CLAUDE.md. Use como modelo de formato um artigo publicado do mesmo tipo em src/content/artigos/ (review: cozinha/liquidificador-philips-walita-daily-e-bom.md; lista: cozinha/melhor-air-fryer-familia-grande.md; comparativo: cozinha/dolce-gusto-ou-nespresso-cafeteira-de-capsula.md). Veja src/data/categorias.json para subcategorias válidas.
2. Pesquise na web (WebSearch/WebFetch) produtos REAIS vendidos na Amazon.com.br: ASIN correto (URL /dp/ASIN), especificações oficiais, garantia, assistência, voltagem, relatos de consumidores FORA da Amazon (Reclame Aqui, fóruns, YouTube, veículos especializados). Nunca invente ASIN, nunca cite preço exato, nunca use estrelas/nº de avaliações da Amazon nem parafraseie avaliações da Amazon. Se um candidato não existir mais, escolha o modelo atual equivalente.
3. Rode `node scripts/find-image.mjs ASIN1 ASIN2 ...` e use o resultado em imagem.src (fonte: amazon). O campo title deve confirmar que o ASIN é o produto certo.
4. Grave em src/content/artigos/<categoria>/<slug>.md (slug curto, sem acentos, sem ano). autor: bruno-danello. pubDate e updatedDate: data de hoje em Brasília. Sem rascunho. testadoFisicamente: false e nunca "testamos". Sem seção de fontes, sem parágrafo do tipo "As fontes foram..." (nem em "Como escolhemos") e sem "Como este conteúdo foi produzido" no corpo; fontes só no frontmatter. Sem links no corpo. Nunca mencione que o texto foi feito com IA (IA só pode aparecer como característica de um produto). Preencha `relacionados` com slugs existentes.
5. Valide: `node scripts/validate-content.mjs --images` deve passar para o seu arquivo; corrija até passar. NÃO rode npm run build, NÃO faça commit, NÃO altere código do site nem outros artigos.
6. Ao final: `node scripts/update-queue.mjs <ID> published <slug>`. Se for impossível: `node scripts/update-queue.mjs <ID> skipped --erro "motivo"`.

Responda só com: caminho do arquivo, ASIN(s), nº de palavras do corpo e resultado da validação.
```

Se um subagente falhar ou o tema for pulado, a rodada segue com os artigos que ficaram prontos (não substitua por outro tema na mesma rodada; ele entra na próxima).

## 4. Revisar e validar o lote

1. Leia cada artigo novo inteiro e confira o checklist da seção 10 do padrão editorial: veredito no topo, duplo funil, contras reais, contexto brasileiro (voltagem, garantia, assistência), nenhum preço, nenhuma estrela da Amazon, nenhum "testamos", nenhuma fonte no corpo.
2. Rode, no clone, e corrija até tudo passar:

```bash
npx astro check                              # 0 erros
node scripts/validate-content.mjs --images   # todos válidos
npm run build                                # build + índice de busca
```

3. `git status --short` só pode mostrar arquivos novos em `src/content/artigos/` e a fila `content/queue/topics.json`. Nada de código, docs ou configuração. Nenhum segredo no diff.

## 5. Publicar

1. Commit em português, sem citar modelo: `conteúdo: publica N artigos, lote DD/MM HH:MM BRT`, com a lista de títulos no corpo.
2. `git push -u origin <branch>` e abra o PR para `main` (`mcp__github__create_pull_request`, pronto para revisão) com a lista dos artigos e o resultado das validações.
3. Aguarde o CI (`build`) e a pré-visualização da Vercel ficarem verdes (`mcp__github__pull_request_read` com `get_check_runs`, com pausas entre as consultas). Se algo falhar, corrija no mesmo branch e empurre de novo.
4. Mescle com **merge commit** (`mcp__github__merge_pull_request`, `merge_method: "merge"`, `expectedHeadSha` do head), autorizado no `CLAUDE.md`. Não termine antes de `merged: true`, salvo erro real que você não conseguiu resolver.
5. `rm -rf "$DIR"`.

## 6. Informe final

Uma ou duas frases em português, sem travessão: quantos artigos entraram e quais (títulos curtos), temas pulados e por quê, e o link https://reviewprodutos.com.br. Se nada foi publicado, diga o motivo em uma frase.

## Manutenção da fila

Quando restarem menos de 40 temas `pending`, gere mais 100 seguindo o formato do arquivo e a taxonomia de `src/data/categorias.json` (mistura de reviews, comparativos e listas; metade fundo de funil, metade topo/meio com `problema` preenchido) e inclua no PR da rodada.
