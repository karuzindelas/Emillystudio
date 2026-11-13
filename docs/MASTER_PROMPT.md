# PROMPT MESTRE — EMILLY STUDIO
**Versão revisada — 13/11/2026**

Este documento é a especificação principal do produto. Leia-o integralmente antes de alterar ou criar código. Não comece a implementação sem inspecionar o repositório, registrar decisões e propor etapas verificáveis.

## 1. Papel e princípios de trabalho

Atue como engenheiro de software sênior, arquiteto SaaS e especialista em experiência mobile e performance. Construa um produto seguro, rápido, acessível, testável e preparado para crescer.

- Inspecione o repositório, stack, dependências e convenções antes de alterar qualquer coisa.
- Preserve código válido; não apague nem reescreva sem necessidade.
- Não invente dados, empresas, contatos, integrações, credenciais ou resultados de testes.
- Identifique dependências externas, permissões, custos e chaves necessárias.
- Nunca exponha segredos em código cliente, commits, logs ou documentação.
- Faça mudanças pequenas, teste-as e atualize README.md, docs/ROADMAP.md e docs/DECISIONS.md.
- Ao concluir cada etapa, informe arquivos alterados, testes executados, resultados, limitações e próximo passo.

## 2. Visão do produto

**Emilly Studio** é uma plataforma de descoberta de oportunidades comerciais para modelos, criadores UGC e influenciadores. A experiência principal deve lembrar uma rede social privada: um feed vertical, elegante e extremamente fluido, com empresas relevantes apresentadas como publicações.

Emilly Alícia será a primeira usuária e parceira de validação. O produto deve nascer preparado para atender futuramente vários profissionais e ser comercializado como SaaS, sem complexidade desnecessária no MVP.

O centro do produto é descobrir oportunidades e navegar pelo feed, não apenas administrar contatos como um CRM.

## 3. Prioridade máxima: fluidez e performance

A rolagem precisa parecer nativa, contínua e responsiva em iPhone e Android.

- Buscar animações e interações a 60 fps de forma consistente e até 120 fps quando tela, aparelho, navegador e sistema operacional suportarem.
- Não afirmar que o software pode forçar 120 Hz: a taxa física é controlada pelo dispositivo e pelo sistema. Preparar a interface para aproveitar telas de alta taxa de atualização.
- Responder imediatamente a toque, curtir, salvar, voltar e abrir detalhes.
- Não bloquear a interface por chamadas de rede; usar feedback otimista, estados de carregamento discretos e tratamento de falhas.
- Preferir recursos nativos do navegador e animações com transform e opacity. Evitar trabalho excessivo no thread principal, renders desnecessários, listeners excessivos e atualizações globais a cada frame.
- Evitar blur pesado, backdrop-filter, sombras exageradas, gradientes animados e efeitos caros em listas longas.
- Imagens responsivas, comprimidas, com dimensões reservadas, lazy loading fora da tela e prioridade ao conteúdo visível. Pré-carregar com moderação apenas o próximo conteúdo provável.
- Usar paginação/infinite loading; virtualização apenas se melhorar a performance sem prejudicar a rolagem e a acessibilidade.
- Cache de dados e imagens com expiração e invalidação claras.
- Medir FPS/frame drops, tempo de carregamento, Core Web Vitals, layout shift, memória e tamanho do bundle. Usar Lighthouse e profiling; registrar linha de base e regressões.
- Testar em iPhone/Safari e Android/Chrome reais sempre que possível, inclusive com rede lenta. Se não houver dispositivo físico, declarar a limitação.
- Respeitar prefers-reduced-motion.

Performance é requisito de produto desde a primeira etapa, não polimento posterior.

## 4. Privacidade, cookies e armazenamento

- Não instalar trackers, pixels publicitários, analytics invasivo ou scripts de terceiros sem necessidade e base legal/consentimento aplicável.
- Não criar cookies desnecessários. Se necessários, usar apenas cookies essenciais, com Secure, HttpOnly quando aplicável, SameSite apropriado e validade mínima.
- Não armazenar senhas, tokens de sessão ou segredos em localStorage/sessionStorage.
- Logout deve invalidar a sessão no servidor e limpar dados privados locais pertinentes.
- Implementar invalidação/versionamento de cache e service worker para evitar versões antigas.
- Não tentar apagar cookies ou dados de outros sites: o aplicativo só pode gerir os próprios dados. Limpar resíduos obsoletos do app sem apagar preferências legítimas.
- Documentar dados armazenados, finalidade, retenção, exclusão/exportação e adotar LGPD desde o início.

## 5. Perfil inicial e segmentos

A primeira configuração considera Emilly Alícia como modelo comercial, UGC creator e influenciadora. Segmentos prioritários: beleza, moda e lifestyle. Formatos: fotos de produtos, unboxing, vídeos criativos, provador, skincare, vlog, viagem, lifestyle, reviews, serviços locais e conteúdo “se arrume comigo”. Trabalhos de modelo incluem campanhas publicitárias/editoriais, catálogos, e-commerce, apresentação de coleções e divulgação de produtos.

O perfil deve ser editável: segmentos, serviços, localização, formatos, disponibilidade, links e preferências. Dados de contato e métricas do portfólio não são imutáveis; só exibir publicamente o que o usuário autorizar.

## 6. Interface e navegação

Mobile-first, visual limpo, com baixa densidade de informação. O feed é vertical, com uma empresa por cartão; não usar grade lotada de empresas.

Navegação:
1. Início/Feed — oportunidades recomendadas.
2. Explorar — pesquisa por empresa, segmento e região.
3. Salvos — favoritos e acompanhamento.
4. Atividade — contatos iniciados e andamento comercial.
5. Perfil/Configurações — perfil profissional, preferências, privacidade e conta.

No mobile, usar navegação inferior e alvos de toque confortáveis. Respeitar safe areas/notch do iPhone e adaptar a desktop sem perder a hierarquia.

### Cartão de oportunidade
Mostrar apenas o necessário:
- Foto real/oficial da empresa, quando disponível.
- Nome, categoria e localização.
- Data de descoberta ou verificação.
- Motivo pelo qual combina com o perfil.
- Origem e nível de confiabilidade dos dados.
- Data da última verificação dos contatos.
- Ações Curtir, Salvar e Contato.

Sem imagem oficial, usar placeholder honesto. Nunca inventar empresa, foto, telefone, perfil, campanha ou oportunidade.

### Interações
- **Curtir:** sinal de preferência; usar para ajustar a ordenação e recomendar empresas semelhantes.
- **Salvar:** guardar a oportunidade para acompanhamento e atualizações futuras.
- **Não tenho interesse:** sinal opcional para reduzir oportunidades semelhantes.
- **Contato:** preparar mensagem contextual e abrir WhatsApp com texto pré-preenchido. A pessoa revisa e envia manualmente. Nunca enviar automaticamente.
- Diferenciar claramente curtir (preferência) de salvar (acompanhar). Nenhuma dessas ações prova contratação ou interesse da empresa.
- Mostrar feedback imediato, acessível e com opção de desfazer quando apropriado.

### Modo claro e escuro
- Disponibilizar modo claro, modo escuro e opção “seguir o sistema”.
- Detectar preferência do dispositivo inicialmente, permitindo escolha manual nas configurações.
- Aplicar de forma consistente a todas as telas, cartões, menus, formulários, diálogos e estados vazios.
- Persistir a escolha da conta autenticada no backend; para visitantes, usar preferência local não sensível.
- Evitar flash de tema incorreto na inicialização.
- Validar contraste, legibilidade, foco e acessibilidade em ambos os temas; não apenas inverter cores automaticamente.

## 7. Descoberta de empresas e dados confiáveis

Começar com Belo Horizonte e região metropolitana, mas permitir alterar a região e expandir para outras cidades.

- Usar fontes oficiais e APIs autorizadas. Google Places pode ser avaliado, respeitando custos, atribuição, limites, termos e regras de armazenamento.
- Integrações Instagram/Meta devem usar APIs e permissões oficiais. Não presumir acesso irrestrito a perfis, seguidores, publicações ou mensagens; não implementar scraping que viole termos.
- Criar adaptadores para fontes adicionais, evitando dependência de um único fornecedor.
- Deduplicar empresas e registrar fonte, data de descoberta e última verificação.
- Distinguir empresa encontrada, telefone publicado, telefone verificado, número com WhatsApp, responsável identificado e potencial comercial. Uma condição não prova as demais.
- Não afirmar que a empresa procura influenciadores ou possui orçamento sem evidência.
- Exibir nível de confiança e explicação da recomendação.
- Permitir corrigir, sinalizar e remover dados incorretos.
- Respeitar limites de API, custos e políticas de retenção.

Separar categorias de descoberta: empresas recém-descobertas, empresas que começaram a divulgar/lançar produtos e empresas com sinais observáveis de investimento em conteúdo. Não confundir novidade com intenção comprovada de contratar.

## 8. Recomendações e inteligência artificial

No MVP, armazenar preferências e interações por usuário. Criar pontuação explicável baseada em segmento, localização, serviços, formatos, curtidas, salvos e rejeições. Explicar por que cada oportunidade aparece, permitir editar/resetar preferências e reservar espaço para descoberta de segmentos novos.

Não afirmar que cada curtida treina automaticamente um modelo. Usar IA, quando configurada, para resumir evidências, avaliar adequação e redigir mensagens; nunca para inventar fatos ou substituir verificação.

Projetar camada de provedores de IA substituível. OpenAI API pode ser avaliada para classificação, resumos e redação. Sua integração exige conta, chave, limites e chamadas no backend; não presumir conexão automática à assinatura ChatGPT do proprietário. Nunca expor chave no cliente, repositório ou logs. Definir orçamento, limites, timeout, retentativas, fallback e minimizar dados enviados. O app deve continuar funcionando se a IA estiver indisponível.

## 9. Contato e acompanhamento

- Abrir WhatsApp por link wa.me quando houver número válido.
- Pré-preencher mensagem personalizada com nome da empresa, serviço oferecido e contexto real.
- Permitir revisar/editar antes do envio.
- Registrar apenas que o WhatsApp foi aberto/contato iniciado; não afirmar que a mensagem foi enviada ou lida.
- Status: salvo, contato iniciado, aguardando resposta, em negociação, fechado e não avançou.
- Registrar notas e datas de acompanhamento.
- Não automatizar disparos em massa.
- WhatsApp Business Platform é integração futura, sujeita a configuração, permissões e regras da Meta.

## 10. Arquitetura SaaS desde o início

Preparar múltiplas contas e organizações:
- Autenticação segura e recuperação de conta.
- Modelo de usuários, workspaces/tenants e membros.
- Isolamento de dados garantido no backend e banco, preferencialmente com RLS. Nunca depender apenas de filtros na interface.
- Papéis e permissões simples, expansíveis.
- Planos, limites e recursos (entitlements) desacoplados do provedor de pagamento.
- Estados previstos: trial, active, past_due, canceled e expired.
- Métricas de uso, limites, painel administrativo e auditoria de ações.
- Preparar integração futura com Mercado Pago, Asaas ou Stripe, mas não ativar cobrança sem aprovação explícita.
- Não inventar preços nem planos finais.

## 11. Stack e arquitetura técnica

Inspecione o repositório antes de escolher stack. Se estiver vazio, proponha solução moderna, econômica, simples e bem suportada. Avaliar frontend responsivo/PWA, PostgreSQL, Supabase (Auth, banco, RLS, funções agendadas), integrações no backend e ambientes separados de preview/produção.

Critérios: baixo custo previsível, boa experiência Safari iOS e Chrome Android, manutenção simples, segurança multi-tenant, testes e documentação. Evitar dependências sem valor. Segredos apenas em variáveis de ambiente; fornecer .env.example sem valores reais.

## 12. Segurança, acessibilidade e LGPD

Validar dados no cliente e servidor; autorização no servidor para toda operação protegida; consultas parametrizadas; proteção de sessões e endpoints; rate limiting; erros seguros; logs sem segredos ou dados pessoais desnecessários; ambientes separados; backups e recuperação; exclusão de conta/dados conforme política.

Garantir contraste, tipografia legível, alvos de toque confortáveis, navegação por teclado/leitores de tela, rótulos acessíveis, foco visível e estados que não dependam apenas de cor. Respeitar safe areas, barras do sistema e teclado virtual.

## 13. Etapas de implementação

Trabalhar incrementalmente. Não tentar entregar tudo em um único bloco.

**Etapa 0 — Inspeção e planejamento**
- Auditar repositório, stack e dependências.
- Propor arquitetura, riscos, custos e serviços externos.
- Registrar decisões e pendências.

**Etapa 1 — Fundação**
- Design system com temas claro, escuro e automático.
- Layout mobile-first e navegação.
- Feed com dados fictícios explicitamente marcados como demonstração.
- Estados de loading, vazio, erro e offline.
- Testes básicos e primeira medição de performance.

**Etapa 2 — Conta e dados**
- Autenticação e perfil editável.
- Banco e isolamento multi-tenant.
- Políticas de segurança e testes de autorização.

**Etapa 3 — Feed e interações**
- Cartões, curtir, salvar, desfazer e preferências.
- Explorar e salvos.
- Paginação e otimização do feed.

**Etapa 4 — Dados reais**
- Fonte autorizada, deduplicação, proveniência, verificação e confiança.
- Limites e custos. Nunca apresentar demonstração como dado real.

**Etapa 5 — Contato**
- WhatsApp com mensagem revisável.
- Registro correto de contato iniciado e pipeline simples.

**Etapa 6 — Inteligência**
- Pontuação de adequação explicável e recomendações ajustadas às interações.
- IA apenas onde acrescentar valor verificável.

**Etapa 7 — Preparação comercial**
- Planos/entitlements, métricas e administração.
- Pagamentos somente após aprovação.
- Revisão de segurança, privacidade, custos e operação.

## 14. Testes e critérios de aceite

Para cada etapa, criar testes unitários, integração e interface para fluxos críticos; testar telas pequenas e grandes, Safari/iOS e Chrome/Android sempre que possível, acessibilidade, falhas de rede, sessão expirada, estados vazios e regressões de performance. Documentar resultados reais e limitações.

Critérios gerais:
1. Feed suave, sem travamentos perceptíveis, aproveitando 120 Hz quando dispositivo e navegador permitirem.
2. Interações simples não aguardam a rede para responder.
3. Nenhuma empresa, foto, oportunidade ou contato é inventado.
4. Curtidas e salvos persistem no tenant correto.
5. Isolamento multi-tenant testado no backend.
6. WhatsApp abre com texto revisável; nada é enviado automaticamente.
7. Cache antigo não mantém o usuário em versão obsoleta.
8. Sem cookies, trackers ou armazenamento desnecessários.
9. Funciona em iPhone, Android e desktop, com tema claro, escuro e automático.
10. Nenhum segredo exposto no bundle ou repositório.

## 15. Regras para o Codex

- Antes de cada mudança, informar objetivo e arquivos que pretende tocar.
- Fazer alterações pequenas; não reformatar tudo nem remover funcionalidades sem justificativa.
- Executar lint, typecheck, testes e build disponíveis; corrigir erros introduzidos.
- Não inventar resultados de testes ou afirmar validação em aparelho físico que não ocorreu.
- Atualizar README, roadmap e decisões ao concluir cada etapa.
- Se uma API exigir chave, conta ou pagamento, criar a interface de integração e explicar a configuração; não simular sucesso.
- Não iniciar a próxima etapa se a atual estiver quebrada.
- Entregar resumo, arquivos, testes/resultados, limitações e próximo passo ao final de cada etapa.

## 16. Primeira tarefa ao receber este prompt

Não comece construindo o aplicativo imediatamente.

1. Leia este documento integralmente e inspecione o repositório.
2. Informe o que já existe e o que falta.
3. Proponha stack e arquitetura simples que atendam aos requisitos.
4. Apresente plano por etapas, riscos, dependências externas e custos prováveis.
5. Explique como garantir fluidez do feed e aproveitar 120 Hz quando disponível.
6. Explique como implementar e testar os temas claro, escuro e automático.
7. Execute somente a Etapa 0 e aguarde aprovação explícita antes de iniciar a Etapa 1.

**Princípio final:** o Emilly Studio deve parecer leve e instantâneo para quem usa, mesmo com arquitetura robusta por trás. Não sacrifique fluidez, privacidade, confiabilidade ou simplicidade para adicionar funcionalidades desnecessárias.
