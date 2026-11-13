# Decisões técnicas — Emilly Studio

**Status:** Etapa 1 — fundação PWA implementada; arquitetura de backend ainda proposta.  
**Data:** 2026-11-13.

## Auditoria inicial

A branch original continha somente `PROMPT_MESTRE_EMILLY_STUDIO.md` e uma pasta `docs/` vazia. Não havia app, dependências, CI, testes ou deploy. O diretório local aberto nesta sessão não era um checkout Git; o trabalho foi desenvolvido em `work/Emillystudio` e publicado por um commit de árvore na branch `docs/etapa-0-arquitetura` através do conector GitHub.

## Decisões da Etapa 1

### Aplicação e interface

- **Next.js App Router, React 19 e TypeScript estrito:** base web responsiva, com caminhos para renderização no servidor quando a autenticação e o banco forem adicionados.
- **Feed de coluna única inspirado na referência social enviada:** cabeçalho compacto, espaço quadrado de mídia, ações de interesse/contexto/contato, salvar separado, legenda e navegação inferior. Sem painéis laterais ou grid de dashboard. O espaço de mídia é neutro e declara que a imagem oficial não está disponível.
- **CSS autoral e tokens locais:** superfície branca, tinta escura e poucos acentos. Sem kit visual genérico, logotipos copiados ou biblioteca de animações.
- **Ícones SVG locais:** sem dependência de ícones, fontes remotas ou imagem de marca de terceiros.
- **PWA instalável sem wrapper nativo:** o Prompt Mestre recomenda frontend web responsivo com suporte a PWA. A entrega instala pela tela inicial e abre em modo standalone em navegadores compatíveis; não é um binário assinado nem está publicado em lojas.
- **Service worker próprio, pequeno e versionado:** cacheia apenas a home demonstrativa explicitamente marcada como pública, arquivos imutáveis `/_next/static/`, ícones, manifesto e fallback offline. Não intercepta APIs, formulários nem operações de escrita. Ativação remove caches antigos para evitar versão presa.
- **Instalação por plataforma:** Chromium usa `beforeinstallprompt` quando disponível; no iOS, a interface explica Safari → Compartilhar → Adicionar à Tela de Início. HTTPS é exigido em produção; localhost/loopback atende desenvolvimento.
- **Feed rolável nativamente:** cards têm dimensões previsíveis e animações limitadas a pequenas transições de cor/opacidade. Sem scroll snap, virtualização prematura, blur ou animação contínua.
- **Dados ilustrativos explicitamente rotulados:** a Etapa 1 não tem integração de empresas. Não usamos fotografias, contatos ou marcas fictícias apresentados como reais. O espaço de imagem avisa que uma imagem oficial não está disponível.
- **Sinais em memória:** curtir/salvar e preferências permitem explorar os estados visuais da prévia; toast informa que nada será guardado ao sair. O MVP persistente depende de autenticação e backend na Etapa 2.
- **Avião de papel inicia contato:** usa `wa.me` com mensagem contextual revisável somente se houver telefone válido e origem rastreável; exemplos fictícios não têm números reais. Nunca envia mensagem automaticamente nem afirma leitura.
- **Regras puras e explicáveis:** filtro e motivo de recomendação ficam em `src/lib/opportunities.ts`, com testes unitários. Os motivos declaram expressamente que são demonstrações.

### Validação

Lint passou (Biome); `pnpm typecheck` passou; 8/8 testes unitários passaram; `node --check public/sw.js` passou. O build padrão compilou a aplicação, mas a checagem interna de tipos falhou no sandbox com `spawn EPERM`. Para gerar preview, o build foi repetido com a checagem interna temporariamente desativada, após o typecheck explícito passar; `next.config.ts` foi restaurado sem `ignoreBuildErrors`. O build produziu `/` e `/manifest.webmanifest` como rotas estáticas.

A home, o manifest, o worker, o fallback offline e os ícones 192/512/maskable responderam HTTP 200 no preview. O botão de instalação e o modal de instruções foram verificados. A tela foi revisada visualmente em viewport estreito com feed de coluna única; o avião de papel exibiu aviso ao não haver telefone empresarial real no exemplo. Instalação e uso offline ainda precisam de validação em iPhone/Safari e Android/Chrome físicos. A auditoria de dependências desta rodada não alcançou npm registry (`ECONNREFUSED`); uma execução anterior não encontrou advisories, mas o resultado atual não pôde ser renovado.

Baseline anterior à camada PWA: HTML 200 de 22.206 bytes/~290 ms em localhost e 587.819 bytes JS bruto / 180.535 gzip para todos os 8 chunks. Esse valor não representa o payload deste artefato, payload inicial, Lighthouse, rede móvel ou FPS. Sem Lighthouse/Core Web Vitals, teste de frame drops, rede lenta ou dispositivo real, não certificamos meta de 60/120 fps.

Ainda não há perfil de Lighthouse, frame drops medidos, teste de rede lenta ou teste físico em iOS/Android. A sensação visual em navegador local não comprova metas de 60/120 fps.

## Arquitetura alvo (etapas futuras)

### Persistência, identidade e isolamento

Supabase Auth e PostgreSQL seguem como proposta para autenticação, perfis, workspaces, memberships, oportunidades, proveniência e interações. RLS deve isolar workspace no banco; backend também valida sessão, papel e tenant. `service_role` nunca pode estar no navegador. Migrações serão versionadas e políticas negativas entre tenants testadas. Esse backend não foi criado nem configurado nesta etapa.

### Segurança e LGPD

Minimizar dados, declarar finalidade e retenção, documentar exportação/exclusão, invalidar sessão ao sair e remover cache privado pertinente. Aplicar validação no servidor, autorização por tenant e rate limits onde houver abuso. Definir backup e recuperação antes de dados comerciais reais. Sem analytics invasivo ou cookies desnecessários.

### Dados reais e contato

Escolher fonte oficial/autorizada só após avaliar termos, atribuição, retenção, custos e limites. Proveniência deve distinguir existência da empresa, contato publicado/verificado, canal WhatsApp, responsável identificado e oportunidade confirmada. Link `wa.me` fica para etapa posterior e apenas com número válido de origem conhecida; envio sempre manual.

### Recomendações

Pontuação determinística com versão e evidências, editável e explicável. Curtir e salvar permanecem sinais diferentes. IA opcional exige fornecedor, orçamento e proteção contra fatos inventados; não há IA configurada.

## Custos e dependências externas

- Supabase e hospedagem ainda não escolhidos; custos dependem do plano, tráfego, armazenamento e retenção.
- Fonte real de empresas pode cobrar por chamada e impor atribuição/retenção; não aprovada.
- WhatsApp Business, IA e pagamentos não configurados nem aprovados.
- Não há valores estimados; confirmar tabela vigente e estimar volumes antes de contratar/ativar.

## Pendências e riscos

1. O código está em `work/Emillystudio` e na branch `docs/etapa-0-arquitetura`; a sessão não oferece checkout Git local funcional.
2. Autenticação, banco e isolamento multi-tenant estão pendentes para Etapa 2.
3. Dados reais, política de correção/remoção, custos e credenciais exigem decisões antes da Etapa 4.
4. Revisão do responsável sobre retenção e direitos LGPD antes de produção.
5. Validar performance em Safari/iOS e Chrome/Android; não certificar fps por inferência.
6. Sem chaves, contatos reais, campanhas ou segredos no projeto.

## Próximo passo

Validar instalação e comportamento offline em aparelhos reais. Antes da Etapa 2, provisionar contas e ambientes; nenhuma cobrança ou serviço externo está ativo.
