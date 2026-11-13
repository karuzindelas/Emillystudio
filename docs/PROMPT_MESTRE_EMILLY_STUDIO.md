# EMILLY STUDIO — PROMPT MESTRE DO CODEX
Versão revisada: 1.0  
Status: especificação inicial — ainda não implementar integrações pagas sem aprovação.

> **Instrução principal:** leia este documento inteiro antes de alterar qualquer arquivo. Ele define a visão do produto, os requisitos de experiência, as regras de segurança e a forma de trabalhar. Não comece construindo tudo de uma vez. Primeiro inspecione o repositório, apresente um plano curto e implemente em etapas verificáveis.

---

## 1. Visão do produto

Emilly Studio é um produto digital de prospecção e oportunidades comerciais para criadoras de conteúdo, influenciadoras, modelos e profissionais que trabalham com imagem e presença digital.

A primeira usuária real será Emilly. O produto deve resolver as necessidades dela antes de ser oferecido a outras pessoas. Porém, a arquitetura deve nascer preparada para evoluir para um SaaS multiusuário e comercializável, sem exigir uma reconstrução completa.

A experiência principal deve lembrar um feed social de descoberta de empresas, mas o produto por trás é uma ferramenta profissional de prospecção e gestão de oportunidades.

**Objetivo central:** ajudar a descobrir empresas que possam contratar ou estabelecer parcerias com a usuária, entender por que cada empresa é relevante, organizar oportunidades, acompanhar mudanças e facilitar o primeiro contato.

O produto não deve prometer contratos, campanhas ou resultados garantidos.

## 2. Princípios inegociáveis

1. **Fluidez em primeiro lugar.** A navegação e a rolagem do feed devem ser extremamente suaves.
2. **Mobile-first, com prioridade de acabamento no iPhone**, sem prejudicar Android, telas maiores ou acessibilidade.
3. **Simplicidade visual.** Poucos cartões por tela, conteúdo bem hierarquizado e rolagem vertical contínua. Evitar grades densas, excesso de informação, animações decorativas e telas confusas.
4. **Dados verdadeiros e rastreáveis.** Não inventar empresas, contatos, redes sociais, endereços, notícias ou sinais de atividade.
5. **IA como inteligência, não como fonte fictícia.** A IA pode classificar, resumir, explicar e recomendar com base em dados disponíveis; não pode preencher lacunas com suposições apresentadas como fatos.
6. **Privacidade e segurança desde o início.**
7. **Preparação SaaS sem antecipar complexidade desnecessária.** Criar fundamentos extensíveis, mas não implementar cobrança real ou integrações pagas sem decisão explícita.
8. **Desenvolvimento incremental.** Mudanças pequenas, testadas e documentadas. Não reescrever o projeto inteiro por conveniência.

## 3. Experiência e interface

### 3.1 Prioridade iPhone e compatibilidade Android

- Projetar primeiro para telas de iPhone, respeitando safe areas, notch/Dynamic Island, áreas de gesto, teclado, status bar e navegação inferior.
- Garantir layout responsivo e comportamento equivalente em Android.
- Testar em larguras pequenas, médias e grandes, além de orientação e escalas de fonte.
- Não usar elementos que dependam exclusivamente de gestos difíceis de descobrir; controles importantes devem ser visíveis.
- Respeitar preferências do sistema, inclusive redução de movimento e tamanho de texto.

### 3.2 Meta de fluidez: 120 Hz quando disponível

A experiência deve ser otimizada para aproveitar telas de alta taxa de atualização. **120 Hz é uma meta de qualidade em aparelhos compatíveis, não uma promessa de que todo dispositivo ou navegador renderizará a 120 FPS.**

Requisitos:
- Manter rolagem nativa/inercial sempre que possível; não implementar scroll customizado sem necessidade comprovada.
- Evitar trabalho pesado na thread principal, re-renderizações desnecessárias, listas grandes sem virtualização e cálculos repetidos durante a rolagem.
- Usar listas virtualizadas e paginação/infinite loading com limites e pré-carregamento prudente.
- Reservar dimensões de imagens, usar formatos eficientes, thumbnails responsivas e lazy loading sem causar saltos de layout.
- Evitar animações de layout caras; priorizar transform/opacity quando animação for necessária.
- Não executar chamadas de rede, análise de IA ou processamento pesado no caminho crítico de scroll.
- Não bloquear a interface enquanto dados carregam; usar skeletons discretos e estados vazios bem desenhados.
- Medir desempenho em dispositivos reais e perfis de baixo desempenho, não apenas no simulador.
- Monitorar travamentos, frames perdidos, tempo de inicialização e fluidez em listas.
- Definir metas mensuráveis após identificar a stack e os dispositivos de teste. Investigar qualquer queda perceptível de frames.
- Respeitar `prefers-reduced-motion` e as configurações de acessibilidade do sistema.

Não usar timers ou animações artificiais para simular 120 FPS. Não afirmar que o app está em 120 Hz sem medição compatível.

### 3.3 Design system

Criar tokens reutilizáveis para:
- cores, tipografia, espaçamento, raios, elevação, bordas e estados;
- componentes de botão, cartão, campo, navegação, modal, toast, skeleton e badge;
- estados de foco, pressionado, desabilitado, erro e carregamento.

A interface deve parecer refinada, contemporânea, leve e confiável. Evitar aparência genérica de painel administrativo.

### 3.4 Modo claro e modo escuro

- Disponibilizar modo claro, modo escuro e opção “seguir sistema”.
- Salvar a preferência da conta ou do dispositivo de forma apropriada.
- Garantir contraste legível em ambos os temas, inclusive textos secundários, ícones, bordas e estados.
- Evitar flashes de tema incorreto na inicialização.
- Não depender apenas da cor para comunicar estados.

## 4. Feed principal de oportunidades

O feed é o centro do produto.

Cada cartão deve mostrar, de forma organizada:
- nome da empresa e segmento;
- imagem/logo apenas quando houver fonte legítima e disponível;
- localização, quando relevante;
- breve explicação de por que a empresa apareceu;
- sinais observáveis de oportunidade, com fonte e data;
- site e perfil social, quando confirmados;
- status e grau de confiança dos dados;
- ações de curtir, salvar e entrar em contato.

Regras:
- Uma empresa por cartão, com hierarquia visual clara.
- Rolagem vertical simples e contínua.
- Não sobrecarregar o cartão com muitos campos.
- Não repetir empresas no feed sem motivo; permitir atualização quando houver novidade real.
- Informar quando os dados foram consultados e quando foram atualizados pela última vez.
- Distinguir “não encontrado” de “não existe”.
- Nunca exibir telefone ou perfil como confirmado se a fonte não sustentar essa confirmação.

### 4.1 Curtir

Curtir significa sinalizar preferência. O sistema deve usar curtidas para ajustar recomendações futuras, por exemplo, priorizando segmentos, perfis de empresa e tipos de oportunidade semelhantes.

A recomendação deve ser explicável e ajustável. Não transformar uma única curtida em uma conclusão definitiva sobre o gosto da pessoa. Permitir desfazer a curtida e oferecer controles para corrigir recomendações.

### 4.2 Salvar

Salvar significa guardar uma oportunidade para consulta e acompanhamento. Itens salvos devem aparecer em uma área própria e manter histórico de alterações relevantes.

Quando uma empresa salva apresentar atualização verificável — por exemplo, mudança de contato, nova campanha pública ou nova informação relevante — o app pode sinalizar a atualização. Não gerar alertas com base em especulação.

Curtir e salvar são ações diferentes e devem ter estados independentes.

### 4.3 Contato

- A ação de contato pode preparar uma mensagem personalizada e abrir o WhatsApp ou outro canal disponível.
- A mensagem deve ser apresentada para revisão da usuária antes do envio.
- Não enviar mensagens automaticamente.
- Não simular envio nem afirmar que houve contato se a usuária apenas abriu o aplicativo externo.
- Guardar um registro de “contato iniciado” somente quando a ação realmente ocorrer e deixar claro que isso não comprova entrega ou resposta.

## 5. Descoberta e qualidade das empresas

O sistema deve separar claramente:
1. empresas recém-identificadas;
2. empresas com sinais recentes de atividade ou divulgação;
3. empresas com evidência de investimento recorrente em marketing/conteúdo;
4. empresas que parecem alinhadas ao perfil e portfólio da usuária.

Não confundir “empresa nova” com “empresa que precisa de serviço”. Não afirmar que uma empresa está procurando influenciadores ou fornecedores sem evidência explícita.

Para cada oportunidade, registrar:
- fonte original e URL, quando permitido;
- data/hora da coleta;
- data da última verificação;
- campos confirmados e campos não confirmados;
- evidência que sustenta a recomendação;
- nível de confiança e motivo;
- status de atualização.

Priorizar fontes oficiais, páginas públicas e APIs autorizadas. Respeitar termos de serviço, robots.txt quando aplicável, limites de uso, direitos autorais e legislação de proteção de dados. Não contornar login, paywall, CAPTCHA, bloqueios técnicos ou restrições de plataformas. Não fazer scraping proibido.

Se não houver fonte confiável ou acesso autorizado, informar a limitação e criar uma interface de integração futura, sem inventar resultados.

## 6. Inteligência artificial e recomendações

A camada de IA deve ser independente do fornecedor, para permitir troca de modelo/provedor no futuro.

Responsabilidades possíveis:
- classificar empresas por segmento;
- resumir sinais públicos com referências;
- explicar por que uma oportunidade combina com o perfil;
- sugerir mensagens de abordagem;
- aprender preferências a partir de curtidas, salvos e feedback explícito;
- detectar duplicatas e possíveis atualizações.

Regras:
- Toda afirmação factual importante deve estar vinculada a uma fonte.
- Distinguir fatos, inferências e recomendações.
- Não inferir atributos sensíveis de pessoas.
- Não usar dados privados ou obtidos indevidamente.
- Não enviar dados pessoais ou portfólio para um provedor de IA sem necessidade, transparência e controles adequados.
- Chaves de API devem ficar exclusivamente no servidor/ambiente seguro, nunca no código cliente.
- Implementar limites de uso, tratamento de erros, timeout e fallback.
- Não chamar IA a cada rolagem ou renderização; usar processamento assíncrono, cache com validade e atualização sob demanda.
- Não deixar a IA decidir permissões, acesso a dados ou cobrança.

## 7. Telas e navegação inicial

Estrutura sugerida, sujeita a validação com protótipo:
- **Início:** feed de oportunidades.
- **Explorar:** busca e filtros por segmento, localização e tipo de oportunidade.
- **Salvos:** empresas favoritas e acompanhamento de atualizações.
- **Atividades:** contatos iniciados, notas e histórico de ações.
- **Perfil/Configurações:** dados da usuária, preferências, tema, privacidade e conta.

A navegação deve ser simples, previsível e consistente. Evitar criar telas que não tenham função clara.

## 8. Arquitetura preparada para SaaS

Mesmo que a primeira versão tenha apenas uma usuária, modelar desde o início o conceito de:
- usuário;
- workspace/organização/conta;
- associação entre usuário e workspace;
- papel/permissão;
- plano;
- assinatura;
- limites de uso;
- consumo de recursos;
- preferências;
- oportunidades e interações pertencentes a um workspace.

### 8.1 Isolamento multi-tenant

- Todo dado privado deve pertencer a um workspace/tenant.
- Todas as consultas e mutações devem validar o tenant no servidor e no banco.
- Aplicar políticas de segurança no banco (por exemplo, Row Level Security quando disponível).
- Nunca confiar em um `tenant_id` enviado pelo cliente sem validar a associação do usuário.
- Testar explicitamente que uma conta não consegue ler, alterar ou inferir dados de outra.
- Não usar apenas filtros de interface como mecanismo de segurança.

### 8.2 Planos e cobrança futura

Preparar interfaces e entidades para:
- plano gratuito;
- plano profissional;
- plano avançado/Business;
- limites configuráveis por plano;
- trial, assinatura ativa, em atraso, cancelada e expirada;
- histórico de cobrança e eventos do provedor.

**Não ativar pagamentos reais nesta fase.** Não criar preços definitivos, não coletar cartão e não integrar checkout até aprovação explícita.

A camada de planos deve ser desacoplada do provedor de pagamento. No futuro, avaliar provedores adequados ao Brasil e ao mercado internacional, como Mercado Pago, Asaas ou Stripe, comparando taxas, recorrência, impostos, suporte e disponibilidade. Não assumir que um provedor é a escolha final.

Webhooks futuros deverão validar assinatura, ser idempotentes, registrar eventos e não depender apenas do redirecionamento do navegador.

### 8.3 Administração

Preparar a possibilidade de um painel administrativo seguro para:
- visualizar contas e status;
- administrar planos e limites;
- acompanhar uso e custos;
- revisar falhas e denúncias;
- consultar métricas agregadas.

Acesso administrativo deve ser protegido por autorização explícita, auditoria e princípio do menor privilégio.

## 9. Privacidade, cookies, cache e segurança

A solicitação de “limpar tudo que atrapalha” significa manter o aplicativo leve e sem armazenamento desnecessário — **não apagar dados legítimos do usuário nem desativar mecanismos de segurança**.

- Não instalar cookies de publicidade ou rastreamento de terceiros por padrão.
- Usar cookies apenas quando necessários e, se houver cookies não essenciais, obter consentimento válido conforme a legislação aplicável.
- Preferir armazenamento seguro e mínimo para sessão e preferências.
- Nunca guardar senhas em texto puro, tokens sensíveis em localStorage ou chaves secretas no app.
- Implementar logout seguro, expiração/renovação de sessão e revogação quando aplicável.
- Cache deve ter política explícita de validade, invalidação e remoção de dados sensíveis.
- Não limpar cache a cada abertura: isso pode piorar desempenho e consumo de dados.
- Não apagar dados do usuário automaticamente.
- Permitir exportação e exclusão de conta/dados conforme requisitos legais e política definida.
- Minimizar coleta de dados e documentar finalidade, retenção e compartilhamentos.
- Aplicar LGPD, incluindo transparência, base legal, direitos do titular e medidas de segurança pertinentes.
- Proteger contra XSS, CSRF, injeção, abuso de API, enumeração de contas e uploads maliciosos, conforme a stack.
- Validar entradas no cliente e no servidor.
- Usar HTTPS/TLS e segredos em variáveis de ambiente ou secret manager.
- Não registrar senhas, tokens, conteúdo privado ou dados sensíveis em logs.
- Dependências devem ser necessárias, mantidas e auditadas.

## 10. Dados e modelo inicial

Propor um modelo de dados simples e extensível. Entidades candidatas:
- users;
- workspaces;
- workspace_members;
- profiles;
- companies;
- company_sources;
- opportunities;
- likes;
- saved_companies;
- interactions;
- notes;
- recommendation_feedback;
- plans;
- subscriptions;
- usage_records;
- audit_events.

Não criar todas as tabelas sem necessidade. Primeiro desenhar relações, chaves, índices, políticas de acesso e migrações. Evitar duplicar empresas e fontes. Dados de oportunidade devem ter origem e timestamps.

## 11. Stack e decisões técnicas

Antes de escolher ou alterar stack:
1. inspecionar o repositório e arquivos existentes;
2. identificar se já há código, framework ou decisões tomadas;
3. apresentar uma proposta enxuta com justificativa;
4. evitar substituir ferramentas funcionais sem razão concreta.

Preferir tecnologias estáveis, documentadas e adequadas a iOS/Android, com bom suporte a listas e desempenho. Considerar uma solução cross-platform para o app e backend gerenciado com autenticação, banco relacional e políticas de acesso. Uma combinação como React Native/Expo e Supabase pode ser avaliada, mas não é obrigatória: confirmar compatibilidade, custos, limites e necessidades antes de decidir.

Não introduzir microsserviços, filas, cache distribuído ou múltiplos bancos prematuramente. Começar com arquitetura modular simples, mantendo fronteiras claras para IA, dados externos, autenticação e cobrança.

## 12. Acessibilidade e qualidade

- Alvos de toque confortáveis.
- Suporte a leitor de tela e rótulos acessíveis.
- Contraste adequado nos dois temas.
- Texto escalável e layouts resilientes.
- Navegação por teclado quando houver versão web.
- Respeitar redução de movimento.
- Estados de carregamento, erro, vazio, offline e sucesso.
- Mensagens de erro úteis, sem expor detalhes internos.
- Idioma inicial: português do Brasil, com estrutura preparada para internacionalização.

## 13. Etapas de desenvolvimento

Trabalhar nesta ordem, sem pular etapas:

### Fase 0 — Auditoria e plano
- Inspecionar o repositório.
- Identificar arquivos, stack, scripts e estado atual.
- Não apagar nem sobrescrever trabalho existente.
- Registrar dúvidas e riscos.
- Entregar plano de implementação e proposta de arquitetura.

### Fase 1 — Protótipo visual
- Criar design system.
- Implementar navegação e telas principais com dados fictícios claramente marcados como demonstração.
- Criar feed vertical com cartões limpos.
- Implementar modo claro/escuro/seguir sistema.
- Testar responsividade iPhone e Android.
- Validar a fluidez da rolagem.

### Fase 2 — Interações locais
- Curtir e descurtir.
- Salvar e remover dos salvos.
- Filtros e busca.
- Estados vazios e feedback visual.
- Persistência local apenas para protótipo, sem confundir com backend definitivo.

### Fase 3 — Backend e autenticação
- Configurar banco e autenticação.
- Criar migrações.
- Implementar isolamento multi-tenant e políticas de segurança.
- Testar permissões e fluxos de sessão.
- Nunca inserir segredos no repositório.

### Fase 4 — Dados reais
- Integrar fontes autorizadas.
- Normalizar e deduplicar empresas.
- Registrar proveniência, atualização e confiança.
- Criar mecanismos de revisão e tratamento de falhas.

### Fase 5 — IA e personalização
- Implementar recomendações com base em feedback.
- Exibir justificativas e fontes.
- Controlar custos, cache e limites.
- Permitir corrigir preferências.

### Fase 6 — Preparação comercial
- Implementar estrutura de planos e limites sem cobrança ativa.
- Criar interfaces para futuras integrações.
- Documentar como ativar pagamentos em uma fase posterior, mediante aprovação.

### Fase 7 — Qualidade e lançamento
- Testes funcionais, segurança, acessibilidade e desempenho.
- Testes em dispositivos reais.
- Build de produção e checklist de publicação.
- Documentar deploy, variáveis e recuperação.

## 14. Testes obrigatórios

Criar e executar testes adequados para:
- autenticação e autorização;
- isolamento entre workspaces;
- curtidas e salvos;
- deduplicação de empresas;
- atualização de fontes;
- estados de erro e offline;
- modo claro e escuro;
- navegação em telas pequenas;
- acessibilidade básica;
- desempenho de listas longas;
- expiração e invalidação de cache;
- limites de plano (quando implementados).

Não declarar uma fase concluída se os testes relevantes falharem. Se algum teste não puder ser executado, explicar o motivo e o risco.

## 15. Regras de trabalho para o Codex

- Ler este arquivo antes de cada grande etapa.
- Trabalhar em mudanças pequenas e coerentes.
- Antes de editar, explicar brevemente o que será feito.
- Não apagar arquivos, configurações ou dados sem autorização.
- Não instalar dependências sem necessidade e justificativa.
- Não inventar credenciais, URLs, APIs ou dados de empresas.
- Não fazer deploy, publicar nas lojas, criar cobranças ou enviar mensagens reais sem autorização explícita.
- Não adicionar analytics ou rastreadores sem aprovação.
- Manter nomes, código e documentação consistentes.
- Atualizar README e documentação quando decisões mudarem.
- Criar commits com mensagens claras, sem incluir segredos.
- Ao final de cada etapa, informar: arquivos alterados, decisões, testes executados, resultados, pendências e próximo passo recomendado.
- Se faltar informação essencial, fazer uma pergunta objetiva em vez de assumir.
- Não tentar concluir todo o produto em uma única execução.

## 16. Primeira tarefa ao abrir o repositório

**Não implemente o aplicativo ainda.**

Primeiro:
1. leia este documento por completo;
2. inspecione o estado do repositório;
3. informe o que já existe;
4. proponha uma stack e arquitetura enxutas, com justificativa;
5. apresente um plano dividido em pequenas tarefas;
6. destaque riscos e decisões que precisam da aprovação do proprietário.

Aguarde aprovação antes de iniciar a Fase 1.

---

## Critérios de sucesso do produto

O Emilly Studio estará no caminho certo quando:
- o feed for simples, bonito e muito fluido em iPhones e Androids;
- o sistema aproveitar telas de 120 Hz quando o dispositivo e a plataforma permitirem, sem prometer desempenho impossível;
- modo claro e escuro funcionarem de forma consistente;
- curtidas realmente influenciarem recomendações e salvos servirem para acompanhamento;
- empresas e contatos exibidos tiverem fontes rastreáveis;
- a usuária entender por que cada oportunidade apareceu;
- dados de diferentes clientes estiverem isolados e protegidos;
- a base permitir introduzir planos pagos futuramente sem reescrever o núcleo;
- cada etapa puder ser testada, auditada e retomada sem depender do histórico de uma conversa.
