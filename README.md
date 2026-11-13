# Emilly Studio

Plataforma mobile-first para descoberta de oportunidades comerciais por modelos, criadores UGC e influenciadores. A experiência principal será um feed privado de oportunidades verificáveis, com recomendações explicáveis, favoritos e início manual de contato.

## Estado atual

A branch `main` contém a especificação em [PROMPT_MESTRE_EMILLY_STUDIO.md](PROMPT_MESTRE_EMILLY_STUDIO.md). Na auditoria inicial, não foram encontrados código de aplicação, dependências, configuração de build ou testes. O diretório `docs/` estava vazio. A Etapa 0 registra decisões e sequência de trabalho; a Etapa 1 ainda depende de aprovação explícita, conforme a especificação.

## Arquitetura proposta

- **Web:** Next.js com App Router, React e TypeScript estrito; interface responsiva e instalável como PWA quando fizer sentido.
- **Estilo e interação:** CSS próprio com tokens documentados, componentes pequenos e sem biblioteca de animação para a rolagem principal.
- **Dados e autenticação:** Supabase Auth e PostgreSQL, com migrações versionadas e Row Level Security (RLS) por workspace/tenant.
- **Validação:** schemas compartilhados para entradas e validação novamente no servidor; autorização aplicada no backend e reforçada no banco.
- **Integrações:** adaptadores no servidor para fontes oficiais de empresas. Nenhum provedor externo será ativado sem credenciais, revisão de termos, orçamento e configuração.
- **Deploy:** ambientes separados para desenvolvimento, preview e produção; segredos apenas em variáveis de ambiente do servidor.

Detalhes e trade-offs estão em [docs/DECISIONS.md](docs/DECISIONS.md). As entregas estão em [docs/ROADMAP.md](docs/ROADMAP.md).

## Execução

Ainda não há aplicação executável nem dependências instaladas. Instruções de instalação, variáveis e comandos serão adicionadas quando a Etapa 1 for aprovada e a estrutura do app for criada. Não há `.env.example` nesta etapa porque nenhum serviço ou chave foi configurado.

## Privacidade e fontes de dados

Não há dados de usuário nem empresas incorporados ao repositório. Conteúdo de demonstração futuro será identificado explicitamente como demonstração. Dados reais deverão registrar fonte e datas de descoberta/verificação, respeitar termos de retenção e permitir correção e exclusão. O botão de WhatsApp apenas abrirá uma mensagem editável; o usuário enviará manualmente.

## Validação

Etapa 0: auditoria da árvore remota e leitura integral do Prompt Mestre. Não se aplicam lint, typecheck, testes ou build porque o repositório ainda não contém aplicação. Testes de implementação serão registrados por etapa após a aprovação correspondente.
