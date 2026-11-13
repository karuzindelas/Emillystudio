# PROMPT MESTRE — EMILLY STUDIO
**Versão inicial — 13/11/2026**

> Este documento é a especificação principal do produto. Leia-o integralmente antes de alterar ou criar código. Não comece pela implementação sem primeiro compreender os objetivos, registrar decisões e propor uma sequência de entregas verificáveis.

---

## 1. Seu papel

Atue como engenheiro de software sênior, arquiteto de soluções SaaS, especialista em experiência mobile e performance web. Você será responsável por transformar esta especificação em um produto real, seguro, rápido, acessível, testável e preparado para crescer.

Trabalhe com cuidado: não invente integrações, dados, credenciais, resultados de testes ou funcionalidades concluídas. Quando algo depender de uma conta, chave de API, permissão externa, contratação ou decisão do proprietário, explique exatamente o bloqueio e proponha o próximo passo.

Antes de implementar:
1. Inspecione o repositório e identifique stack, dependências, convenções e funcionalidades existentes.
2. Preserve o que estiver correto; não apague nem reescreva código sem necessidade.
3. Apresente uma arquitetura simples e uma sequência incremental de implementação.
4. Registre decisões técnicas e dúvidas em `docs/DECISIONS.md`.
5. Crie ou atualize `README.md` e `docs/ROADMAP.md`.
6. Não exponha segredos, tokens, dados pessoais desnecessários ou chaves de API no código, commits ou logs.

## 2. Visão do produto

**Emilly Studio** é uma plataforma de descoberta de oportunidades comerciais para modelos, criadores UGC e influenciadores. A experiência principal deve parecer um feed social privado, elegante e extremamente fluido: a pessoa percorre uma sequência vertical de empresas e oportunidades relevantes, conhece o motivo da recomendação, salva as oportunidades, demonstra preferências e inicia contato.

Emilly Alícia será a primeira usuária e parceira de validação. O produto deve nascer preparado para, futuramente, atender vários profissionais e ser comercializado como SaaS, sem transformar o MVP em um sistema complexo demais.

Não é apenas um CRM com aparência de rede social. A descoberta e a navegação pelo feed são o centro do produto.

## 3. Prioridade absoluta: fluidez e performance mobile

A sensação de uso deve ser excepcionalmente fluida. Trate performance como requisito central de produto, não como polimento posterior.

### Meta de experiência
- Buscar animações e interações a **60 fps como mínimo consistente** e **120 fps quando o aparelho, a tela, o navegador e o sistema operacional suportarem**.
- Não prometa nem tente forçar 120 Hz por software: a taxa física de atualização é controlada pelo dispositivo e pelo sistema. O aplicativo deve estar preparado para aproveitar telas de alta taxa de atualização.
- Rolagem vertical natural, contínua e responsiva, sem travamentos, saltos, engasgos ou bloqueios causados por carregamentos.
- Priorizar a sensação de rolagem nativa do iOS e Android.
- Responder imediatamente a toque, curtir, salvar, voltar e abrir detalhes.
- Evitar mudanças bruscas de layout durante o carregamento.
- Otimizar primeiro para celulares; adaptar muito bem para tablets e desktop.

### Regras de implementação de performance
- Use CSS e recursos nativos do navegador sempre que forem suficientes.
- Não implemente animações pesadas em JavaScript quando CSS ou APIs nativas resolverem.
- Evite trabalho no thread principal, renders desnecessários, cálculos repetidos, listeners excessivos e atualizações globais de estado a cada frame.
- Use animações preferencialmente com `transform` e `opacity`; evite animar propriedades que provoquem layout ou pintura constante.
- Não use `will-change` indiscriminadamente.
- Evite blur, backdrop-filter, sombras gigantes, gradientes animados e efeitos decorativos caros em listas longas.
- Use imagens responsivas, formatos modernos quando suportados, dimensões explícitas, compressão adequada, carregamento lazy para conteúdo fora da tela e prioridade para o conteúdo inicial.
- Reserve o espaço das imagens antes de carregá-las para impedir layout shift.
- Carregue primeiro o conteúdo visível e pré-carregue com moderação o próximo conteúdo provável.
- Se o feed crescer, use paginação/infinite loading e virtualização apenas quando isso melhorar a performance sem prejudicar a rolagem ou acessibilidade.
- Evite bibliotecas grandes para efeitos simples. Analise o custo de cada dependência.
- Use feedback otimista em curtidas e favoritos, com tratamento de falha e sincronização posterior.
- Não bloqueie a interface aguardando chamadas de rede. Mostre estados de carregamento discretos e mantenha a navegação responsiva.
- Faça cache inteligente de dados e imagens, com expiração e invalidação claras.
- Meça antes e depois. Não declare que está fluido apenas porque parece funcionar no computador do desenvolvedor.

### Testes de performance obrigatórios
- Testar em dispositivos móveis reais sempre que possível, incluindo iPhone/Safari e Android/Chrome.
- Testar em condições de rede lenta e instável.
- Verificar FPS/frame drops durante rolagem e transições, tempo de carregamento, Core Web Vitals, layout shift, consumo de memória e tamanho do bundle.
- Usar Lighthouse e ferramentas de profiling do navegador, documentando resultados e limitações.
- Definir metas realistas e registrar a linha de base. Investigar regressões antes de adicionar efeitos visuais.
- Respeitar `prefers-reduced-motion`; oferecer transições reduzidas sem prejudicar a funcionalidade.

## 4. Privacidade, cookies, armazenamento e limpeza

O aplicativo deve ser leve, previsível e respeitar a privacidade.

- Não instalar trackers, pixels de publicidade, analytics invasivo ou scripts de terceiros sem necessidade e sem a configuração/consentimento aplicável.
- Não criar cookies desnecessários. Preferir sessão segura e armazenamento estritamente necessário.
- Se cookies forem usados, limitar a cookies essenciais, com `Secure`, `HttpOnly` quando aplicável, `SameSite` adequado, escopo e validade mínimos.
- Não armazenar senhas, tokens de sessão ou segredos em `localStorage` ou `sessionStorage`.
- Não usar armazenamento persistente para dados sensíveis sem justificativa, proteção e política de retenção.
- Implementar logout que invalide a sessão no servidor e limpe os dados locais de autenticação e cache privado pertinentes.
- Implementar estratégia de atualização de versão e invalidação de cache/service worker para que usuários não fiquem presos a arquivos antigos.
- Não apagar indiscriminadamente cookies ou dados de outros sites do navegador: um site não tem permissão para limpar o navegador inteiro, e isso seria inadequado.
- Não confundir cache técnico necessário com rastreamento. O objetivo é remover resíduos e dados obsoletos do próprio aplicativo, sem quebrar sessões ou apagar preferências legítimas.
- Documentar o que é armazenado, por quê, por quanto tempo e como o usuário pode excluir seus dados.
- Adotar LGPD desde o início: finalidade, minimização, transparência, segurança, direitos do titular e processo de exclusão/exportação quando aplicável.

## 5. Público e perfil comercial inicial

A primeira configuração de perfil deve considerar o portfólio de Emilly Alícia:

- Modelo comercial, UGC creator e influenciadora digital.
- Segmentos principais: beleza, moda e lifestyle.
- Serviços e formatos: fotos de produtos, unboxing, vídeos criativos, provador, skincare, vlog, viagem, lifestyle, reviews, serviços locais e conteúdo “se arrume comigo”.
- Trabalhos de modelo: campanhas publicitárias e editoriais, fotos para catálogos e e-commerce, apresentação de coleções, conteúdo vestindo marcas e divulgação de produtos e lançamentos.
- Conteúdos já apresentados no portfólio: skincare, hair, maquiagem, lifestyle/experiências e suplementos/bem-estar.
- A plataforma deve permitir editar segmentos, serviços, localização, formatos, disponibilidade, links e preferências sem alterar o código.

Os dados de contato e métricas do portfólio não devem ser tratados como imutáveis. Permitir atualização pelo próprio usuário e só exibir publicamente o que ele decidir compartilhar.

## 6. Experiência e estrutura de navegação

A interface deve ser mobile-first, simples e limpa. O feed é vertical e apresenta uma oportunidade por card, com densidade visual baixa. Não use um grid lotado de dezenas de empresas.

### Navegação principal
1. **Início / Feed:** oportunidades recomendadas.
2. **Explorar:** busca por empresa, segmento e região.
3. **Salvos:** oportunidades favoritas e lista de acompanhamento.
4. **Atividade:** contatos iniciados e andamento comercial.
5. **Perfil / Configurações:** perfil profissional, preferências, privacidade e conta.

Use navegação inferior no mobile, com alvos de toque confortáveis e área segura do iPhone (`safe-area-inset`). No desktop, adapte a navegação sem alterar a hierarquia do produto.

### Card do feed
Cada card deve ser visualmente leve e apresentar apenas o necessário:
- Foto real da empresa ou imagem oficial quando disponível.
- Nome da empresa.
- Categoria/segmento e localização.
- Data em que a oportunidade foi descoberta ou verificada.
- Motivo pelo qual pode combinar com o perfil.
- Indicador de origem e confiabilidade dos dados.
- Data da última verificação dos contatos.
- Ações claras: **Curtir**, **Salvar** e **Contato**.

Não invente fotos, empresas, telefones, perfis, campanhas ou oportunidades. Se não houver imagem oficial adequada, use um placeholder elegante e honesto.

### Interações
- **Curtir:** sinal explícito de interesse. Registrar o sinal e utilizá-lo para ajustar a ordenação e recomendações futuras.
- **Salvar:** adicionar à lista de favoritos/acompanhamento. Preservar a oportunidade e permitir consultar atualizações.
- **Não tenho interesse:** opcional, para reduzir oportunidades semelhantes.
- **Contato:** preparar uma mensagem contextual e abrir o WhatsApp com texto pré-preenchido. A pessoa sempre revisa e envia manualmente no MVP. Nunca enviar mensagem automaticamente.
- Mostrar confirmação visual imediata, com acessibilidade e possibilidade de desfazer quando apropriado.

Curtir e salvar são ações diferentes: curtir representa preferência; salvar representa intenção de acompanhar. Não trate esses sinais como prova de contratação ou interesse da empresa.

## 7. Descoberta de empresas e qualidade dos dados

A plataforma deve trabalhar com empresas reais e informações rastreáveis.

- Começar com uma região configurável, inicialmente Belo Horizonte e região metropolitana, sem limitar permanentemente o produto a essa área.
- Permitir filtros por segmento, localização, tipo de negócio e adequação ao perfil.
- Usar fontes oficiais e APIs autorizadas. Google Places pode ser avaliado para descoberta e dados de estabelecimentos, respeitando termos, custos, atribuição, limites e regras de armazenamento.
- Integrações com Instagram/Meta devem usar APIs e permissões oficiais disponíveis. Não presumir acesso irrestrito a perfis, seguidores, publicações ou mensagens; não construir scraping que viole termos.
- Permitir fontes adicionais autorizadas no futuro, com adaptadores independentes para não acoplar o produto a um único fornecedor.
- Deduplicar empresas e registrar a origem de cada dado.
- Guardar data de descoberta, data da última verificação e fonte.
- Separar claramente: empresa existente, telefone publicado, telefone verificado, número com WhatsApp, pessoa responsável identificada e potencial comercial. Uma dessas condições não prova as demais.
- Nunca afirmar que um telefone pertence ao responsável por marketing ou contratação sem evidência.
- Não afirmar que a empresa está buscando influenciadores ou tem orçamento se isso não foi confirmado.
- Exibir nível de confiança e explicação do motivo da recomendação.
- Criar mecanismos para corrigir, sinalizar ou remover dados incorretos.
- Respeitar limites de API, orçamento e políticas de retenção de cada fonte.

## 8. Recomendações inteligentes

As recomendações devem melhorar com o uso, mas sem prometer que cada curtida treina automaticamente um modelo de IA.

No MVP:
- Armazenar preferências explícitas e interações por usuário.
- Criar uma pontuação compreensível baseada em segmento, localização, serviços, formato de campanha, histórico de curtidas, itens salvos e rejeições.
- Explicar em linguagem simples por que uma oportunidade aparece.
- Permitir que o usuário edite preferências e redefina sinais.
- Evitar bolhas excessivamente estreitas: reservar espaço para descoberta de novos segmentos relevantes.
- Usar IA, quando configurada, para resumir evidências, sugerir adequação e redigir mensagens. A IA não deve inventar fatos nem substituir a verificação de dados.
- Registrar versão da regra/modelo e evidências utilizadas para permitir auditoria e melhoria.

## 9. Contato e acompanhamento comercial

O MVP deve permitir:
- Abrir conversa de WhatsApp por link `wa.me` quando houver número válido.
- Pré-preencher uma mensagem personalizada com nome da empresa, serviço oferecido e contexto real.
- Permitir editar a mensagem antes do envio.
- Registrar que o usuário abriu/iniciou o contato, sem afirmar que a mensagem foi enviada ou lida.
- Organizar status como: salvo, contato iniciado, aguardando resposta, em negociação, fechado e não avançou.
- Registrar notas e datas de acompanhamento.
- Não automatizar disparos em massa.
- Integração futura com WhatsApp Business Platform somente após configuração, permissões, consentimento e conformidade com as regras da Meta.

## 10. Arquitetura SaaS desde o início

Embora Emilly seja a primeira usuária, preparar a base para múltiplas contas e organizações.

Requisitos:
- Autenticação segura e recuperação de conta.
- Modelo de usuários, workspaces/tenants e membros.
- Isolamento de dados por tenant garantido no backend e no banco, preferencialmente com políticas RLS quando suportadas. Nunca depender apenas de filtros na interface.
- Papéis e permissões simples no início, com possibilidade de expansão.
- Planos, limites e recursos habilitados desacoplados do provedor de pagamento.
- Estados de assinatura previstos: trial, active, past_due, canceled e expired.
- Estrutura para métricas de uso, limites e cobrança futura.
- Painel administrativo futuro para gerenciar contas, planos, assinaturas e indicadores.
- Auditoria de ações relevantes, rate limiting, validação de entrada e proteção contra abuso.
- Preparar integração futura com provedores como Mercado Pago, Asaas ou Stripe, mas não ativar cobrança no MVP sem decisão explícita.
- Não inventar preços, planos finais ou regras comerciais. Usar configurações provisórias claramente identificadas.

## 11. Stack e decisões técnicas

Não imponha tecnologia sem inspecionar o repositório. Se o projeto estiver vazio, proponha uma stack moderna, simples, econômica e bem suportada.

Uma opção inicial a avaliar:
- Frontend web responsivo com suporte a PWA.
- Backend e banco relacional PostgreSQL.
- Supabase para autenticação, banco, políticas RLS e funções agendadas, se adequado.
- Integrações externas por serviços/adaptadores no backend.
- Deploy com ambiente de preview e produção separados.

Critérios:
- Baixo custo inicial e previsibilidade de cobrança.
- Boa experiência no Safari do iPhone e Chrome do Android.
- Facilidade de manutenção por uma equipe pequena.
- Segurança e isolamento multi-tenant.
- Testabilidade e documentação.
- Evitar dependências e serviços que não agreguem valor ao MVP.

Não colocar chaves secretas no frontend. Usar variáveis de ambiente e documentar `.env.example` sem valores reais.

## 12. Segurança e conformidade

- Validar dados no cliente e no servidor.
- Aplicar autorização no servidor em toda operação protegida.
- Usar consultas parametrizadas/ORM seguro.
- Proteger autenticação, sessões, recuperação de senha e endpoints.
- Implementar rate limiting e tratamento seguro de erros.
- Não registrar tokens, senhas, dados pessoais sensíveis ou conteúdo privado em logs.
- Separar ambientes de desenvolvimento, teste e produção.
- Criar backups e política de recuperação antes de armazenar dados comerciais relevantes.
- Considerar LGPD e termos de uso das fontes integradas.
- Fornecer exclusão de conta e dados conforme política documentada.

## 13. Acessibilidade e acabamento

- Contraste adequado, tipografia legível e hierarquia visual consistente.
- Alvos de toque confortáveis.
- Navegação por teclado e leitores de tela.
- Rótulos acessíveis para botões de ícone.
- Estados de foco visíveis.
- Não comunicar estado apenas por cor.
- Respeitar safe areas, notch, barras do sistema e teclado virtual.
- Formulários simples, com validação e mensagens claras.
- Layout adaptado para iPhone e Android, sem favorecer um sistema a ponto de quebrar o outro.

## 14. Escopo de MVP e etapas

Implemente em etapas pequenas, com entregas utilizáveis:

**Etapa 0 — Inspeção e planejamento**
- Auditar repositório e dependências.
- Definir arquitetura e decisões.
- Identificar credenciais e serviços externos necessários.
- Registrar riscos, custos e bloqueios.

**Etapa 1 — Fundação**
- Design system básico.
- Layout mobile-first.
- Navegação e feed com dados fictícios claramente marcados como demonstração.
- Estados de carregamento, vazio, erro e offline.
- Testes básicos e primeira medição de performance.

**Etapa 2 — Conta e dados**
- Autenticação.
- Perfil profissional editável.
- Banco de dados e isolamento multi-tenant.
- Políticas de segurança e testes de autorização.

**Etapa 3 — Feed e interações**
- Cards de oportunidades.
- Curtir, salvar, desfazer e preferências.
- Explorar e lista de salvos.
- Feed paginado e otimizado.

**Etapa 4 — Dados reais**
- Integração com fonte de empresas autorizada.
- Deduplicação, proveniência, verificação e confiança.
- Limites de uso e controle de custos.
- Não exibir dados de demonstração como dados reais.

**Etapa 5 — Contato e atividade**
- Mensagem pré-preenchida para WhatsApp.
- Registro correto de contato iniciado.
- Pipeline simples de acompanhamento.

**Etapa 6 — Inteligência**
- Pontuação de adequação.
- Explicação de recomendações.
- Ajuste com base nas preferências e interações.
- IA apenas onde acrescentar valor verificável.

**Etapa 7 — Preparação comercial**
- Planos e entitlements.
- Métricas e administração.
- Integração de pagamento somente após aprovação.
- Revisão de segurança, privacidade, custos e operação.

Não tente entregar todas as etapas em um único bloco. Priorize uma base estável e testada.

## 15. Testes e critérios de aceite

Para cada etapa:
- Criar testes unitários para regras de negócio.
- Criar testes de integração para banco, autenticação e autorização.
- Criar testes de interface para fluxos críticos.
- Testar em viewport pequeno e telas maiores.
- Testar Safari/iOS e Chrome/Android sempre que possível.
- Verificar acessibilidade básica.
- Verificar falhas de rede, carregamento, sessão expirada e dados vazios.
- Medir performance e regressões.
- Documentar o que foi testado, o resultado e o que ainda não foi possível validar.

Critérios gerais:
1. Feed rola suavemente, sem travamentos perceptíveis, e aproveita telas de 120 Hz quando o dispositivo/browser permite.
2. A interface não espera a rede para responder a interações simples.
3. Nenhuma empresa, imagem, oportunidade ou informação de contato é inventada.
4. Curtidas e salvos persistem e pertencem ao usuário/tenant correto.
5. O isolamento entre tenants é testado no backend.
6. O contato abre WhatsApp com texto revisável e não envia automaticamente.
7. Cache antigo não mantém o usuário preso em versões obsoletas.
8. Não há cookies, trackers ou armazenamento desnecessários.
9. O app funciona em iPhone e Android, além de desktop.
10. Nenhum segredo está exposto no bundle ou no repositório.

## 16. Regras de trabalho do Codex

- Antes de cada mudança, explique brevemente o objetivo e os arquivos que pretende tocar.
- Faça alterações pequenas e coerentes.
- Não reformate ou reescreva arquivos sem necessidade.
- Não remova funcionalidades existentes sem explicar o motivo.
- Não invente resultados de testes.
- Execute lint, typecheck, testes e build disponíveis após mudanças relevantes.
- Corrija erros introduzidos antes de avançar.
- Atualize a documentação e o roadmap ao concluir cada etapa.
- Mantenha uma seção de “pendências e decisões necessárias”.
- Se uma API exigir chave ou pagamento, crie a interface de integração e explique como configurar; não simule sucesso.
- Se não puder validar em dispositivo físico, declare essa limitação.
- Ao final de cada etapa, entregue: resumo, arquivos alterados, testes executados, resultados, limitações e próximo passo recomendado.
- Não comece a etapa seguinte se a atual estiver quebrada.

## 17. Primeira tarefa ao receber este prompt

Não comece construindo tudo imediatamente.

1. Leia este documento integralmente.
2. Inspecione o repositório.
3. Informe o que já existe e o que está faltando.
4. Proponha a stack e a arquitetura mais simples que atendam aos requisitos.
5. Apresente um plano de implementação por etapas, com riscos, dependências externas e custos prováveis.
6. Destaque como será garantida a fluidez do feed, incluindo suporte a 120 Hz quando disponível.
7. Só então implemente a Etapa 0 e aguarde aprovação para iniciar a Etapa 1.

**Princípio final:** o Emilly Studio deve parecer leve e instantâneo para quem usa, mesmo que sua arquitetura seja robusta por trás. A experiência de rolagem é uma das principais características do produto. Não sacrifique fluidez, privacidade, confiabilidade ou simplicidade para adicionar funcionalidades desnecessárias.

## 18. Direção de design profissional — identidade própria, sem aparência de IA

O Emilly Studio deve ter aparência de um produto digital concebido e executado por profissionais experientes de produto, UX/UI e engenharia. **O aplicativo não pode parecer um template genérico, uma interface montada automaticamente por IA ou um projeto demonstrativo sem identidade.**

Trate o design como trabalho de direção de arte e produto, não como decoração.

### Princípios obrigatórios
- Desenvolva uma identidade visual própria, coerente com o posicionamento do Emilly Studio e com o público de criadores, modelos e influenciadores.
- Cada decisão visual deve ter intenção: hierarquia, espaçamento, tipografia, cores, composição, iconografia, imagens e microinterações precisam funcionar como um sistema consistente.
- Busque acabamento de produto comercial maduro: layouts equilibrados, alinhamentos precisos, ritmo visual, estados bem resolvidos e detalhes cuidadosamente revisados.
- Prefira soluções simples, elegantes e reconhecíveis a efeitos chamativos ou tendências aplicadas sem propósito.
- Use componentes consistentes, mas evite que todas as telas pareçam cópias rígidas umas das outras.
- Utilize conteúdo, imagens e elementos visuais autênticos e contextualizados. Nunca invente marcas, campanhas, depoimentos, métricas ou fotografias para preencher espaço.
- Dê atenção especial à qualidade visual em telas pequenas, aos estados vazios, carregamento, erro, sucesso, formulários e transições.
- A interface deve transmitir confiança, personalidade e clareza, sem excesso de elementos.

### Evite expressamente
- Aparência padrão de template SaaS ou dashboard genérico.
- Layouts previsíveis e repetitivos que pareçam gerados a partir de um prompt.
- Gradientes aleatórios, brilho, glassmorphism, blur, sombras exageradas e efeitos decorativos sem função.
- Uso indiscriminado de cards, bordas arredondadas, pills, ícones e badges em todos os elementos.
- Emojis como substitutos de iconografia profissional.
- Tipografia, paletas, espaçamentos e componentes escolhidos apenas por conveniência ou por parecerem modernos.
- Textos genéricos de placeholder, slogans vazios e conteúdo artificial.
- Animações que chamem mais atenção que o conteúdo ou prejudiquem a performance.

### Processo de qualidade visual
1. Antes de criar uma tela, compreenda sua função, o contexto de uso e a prioridade das informações.
2. Defina e mantenha tokens de design para cores, tipografia, espaçamento, raios, elevação e estados.
3. Analise referências de produtos digitais de alta qualidade quando isso ajudar, sem copiar interfaces ou identidades de terceiros.
4. Revise cada tela em diferentes larguras e densidades de conteúdo, incluindo situações reais e casos extremos.
5. Faça uma revisão crítica como designer sênior: elimine inconsistências, elementos redundantes, desalinhamentos, ruído visual e decisões sem justificativa.
6. Não considere uma tela pronta apenas porque está funcional. Ela precisa ter qualidade visual, usabilidade, acessibilidade e consistência com o produto inteiro.

**Critério de aceite:** ao olhar e utilizar o Emilly Studio, a percepção deve ser de um produto profissional, autoral, confiável e cuidadosamente construído por uma equipe qualificada — nunca de uma interface genérica criada por IA. A tecnologia usada para desenvolver o produto não deve ser perceptível na identidade visual.
