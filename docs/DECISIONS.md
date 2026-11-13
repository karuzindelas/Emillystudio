# Decisões técnicas — Emilly Studio

**Status:** Etapa 0 — auditoria e proposta inicial.  
**Data:** 2026-11-13.  
**Escopo:** decisões de arquitetura para orientar a Etapa 1; ainda não são implementação nem configuração de serviços.

## Auditoria do repositório

A branch `main` foi inspecionada por meio da integração GitHub. A raiz contém somente `PROMPT_MESTRE_EMILLY_STUDIO.md` e uma pasta `docs/` vazia. Não há README, código, manifestos de dependências, CI, migrations, testes, deploy ou arquivo de ambiente. O diretório de trabalho local aberto nesta sessão não é um checkout Git e está vazio; portanto, esta auditoria usa a árvore remota como fonte de verdade. Nenhuma implementação existente foi alterada.

## Proposta de arquitetura

### Aplicação web

Next.js App Router, React e TypeScript estrito em uma aplicação web responsiva. Componentes de servidor para leitura inicial e renderização; componentes de cliente somente onde a interação exigir. Começar com CSS moderno e tokens próprios, sem uma camada pesada de UI. Isso mantém uma equipe pequena produtiva e dá controle sobre a identidade visual e o custo do bundle.

A instalação como PWA pode ser acrescentada sem tornar o service worker requisito para navegação. Não armazenar dados privados do feed offline no MVP. Cache público e estático deve ter versionamento e invalidação explícitos.

### Persistência, identidade e isolamento

Supabase Auth e PostgreSQL são uma opção adequada à escala inicial: reduzem trabalho operacional e oferecem autenticação, SQL relacional e RLS. O desenho inicial deve incluir `users/profiles`, `workspaces`, `memberships`, empresas, oportunidades, proveniência e interações. Relações de usuário devem sempre estar escopadas por workspace.

RLS será aplicada às tabelas expostas, com políticas negativas testadas entre workspaces. O backend validará sessão, papel e tenant em cada operação protegida. A chave `service_role` não pode aparecer no navegador. Migrações SQL serão versionadas e revisadas; dados de tenants nunca dependerão somente de filtros na interface.

Papéis iniciais podem ser `owner` e `member`; planos e entitlements ficam desacoplados da identidade e do provedor de pagamento. Não ativar cobrança até aprovação comercial explícita.

### Segurança, privacidade e LGPD

Minimizar os dados coletados: informações de perfil profissional, preferências, interações e notas que o usuário inserir. Documentar finalidade, retenção, exportação e exclusão antes de produção. Logout deve invalidar a sessão e remover cache privado local. Cookies estritamente necessários devem permanecer sob gestão do provedor de autenticação. Sem trackers ou analytics invasivo por padrão.

Aplicar validação no cliente e novamente no servidor, autorização por tenant, rate limiting em operações sujeitas a abuso e mensagens de erro sem detalhes internos. Definir backups e recuperação antes de guardar dados comerciais relevantes. Revisar contratos e localização de processamento do provedor antes da produção.

### Descoberta e recomendações

O MVP começa com dados de demonstração claramente identificados para validar feed e fluxo, sem marcas ou contatos inventados como se fossem reais. Dados reais somente após escolher uma fonte autorizada e validar seus termos, atribuição, limites, regras de armazenamento e custos.

Cada registro de empresa/oportunidade deve distinguir existência, contato publicado, contato verificado, WhatsApp disponível, pessoa responsável identificada e oportunidade confirmada. A proveniência registra fonte, descoberta, última verificação e evidências. Adaptadores isolam provedores futuros. Deduplicação deve usar identificadores de fonte quando autorizados e campos normalizados sem presumir identidade.

A recomendação inicial será uma pontuação determinística e explicável por segmento, localização, serviços e sinais explícitos. Guardar versão da regra e fatores usados; permitir editar preferências e apagar sinais. Curtida e salvamento permanecem eventos distintos. Não alegar treinamento automático de IA.

### Experiência e performance

Usar rolagem nativa do navegador, conteúdo com altura estável, dimensões explícitas de imagem e carregamento lazy fora da primeira tela. Feedback de curtir/salvar deve ser otimista e reversível; falhas sincronizam o estado com o servidor. Começar sem virtualização e sem animações contínuas no feed; medir antes de adicionar complexidade.

60/120 fps não pode ser garantido pelo software. O app evitará trabalho por frame em JavaScript, animará apenas propriedades baratas quando necessário e respeitará `prefers-reduced-motion`. A validação deve medir Core Web Vitals, bundle e frame drops em profiling, em dispositivos e redes representativos quando disponíveis. Lighthouse em desktop não substitui validação em iPhone/Safari e Android/Chrome.

### Contato

Gerar um link `wa.me` somente com telefone válido e origem rastreável. A mensagem pré-preenchida é editável e o envio permanece manual. Registrar apenas que o link de contato foi aberto/iniciado; nunca inferir envio, leitura ou resposta. Não haverá disparo em massa nem integração WhatsApp Business no MVP.

## Dependências externas e custos prováveis

- **Supabase:** conta e configuração necessárias para autenticação, banco, RLS, backups e deploy. Pode haver opção de baixo custo para desenvolvimento, mas limites e preços mudam; confirmar a tabela vigente antes de escolher plano ou produzir. Não há gasto aprovado.
- **Hospedagem web:** requer provedor e ambientes separados; custo depende de tráfego, execução e armazenamento. A escolha fica para a Etapa 1/produção.
- **Google Places ou outra fonte empresarial:** não habilitar sem avaliar termos, atribuição, retenção, limites e preço por chamada. A fonte pode se tornar o principal custo variável. Sem preço ou uso estimado nesta etapa.
- **WhatsApp:** link público `wa.me` não equivale a API de envio. Integração de plataforma empresarial exigiria configuração e aprovações próprias e fica fora do MVP.
- **Pagamentos e IA:** sem contratação ou credencial. Estruturas futuras devem permanecer desacopladas e sem cobrança/IA ativada no MVP.

Valores não foram estimados porque faltam provedor escolhido, volumes, região de processamento e plano. Antes de qualquer serviço pago, apresentar estimativa com limites de uso e alertas.

## Riscos e bloqueios

1. A sessão não possui checkout Git local do repositório; alterações de código e comandos de build exigirão abrir um checkout da branch.
2. Supabase, hospedagem, domínio e provedor de e-mail/autenticação ainda não foram escolhidos nem configurados.
3. Fonte autorizada de empresas e orçamento para dados reais ainda precisam de decisão; até lá, não publicar oportunidades como reais.
4. Requisitos de retenção, exclusão/exportação e termos para produção precisam de revisão pelo responsável pelo produto.
5. Performance física em Safari/iOS e Chrome/Android não pode ser certificada sem dispositivos reais; registrar limitações por medição.
6. Nenhuma chave, dado real de contato, campanha ou credencial foi fornecida; não criar valores fictícios para simular integrações.

## Aprovação necessária

O Prompt Mestre determina que a Etapa 1 só comece após aprovação. Esta branch entrega a auditoria, arquitetura proposta e roadmap da Etapa 0. A próxima autorização necessária é iniciar a fundação visual e técnica, ainda sem conectar serviços pagos ou exibir dados reais.
