# Roadmap — Emilly Studio

Este roadmap segue o Prompt Mestre. Cada etapa precisa estar estável e verificável antes da seguinte. Status descreve o repositório em 2026-11-13.

## Etapa 0 — Inspeção e planejamento

**Status: concluída nesta branch.**

- [x] Inspecionar a árvore remota e ler o Prompt Mestre integralmente.
- [x] Registrar que o repositório não possui aplicação, dependências, testes ou configurações.
- [x] Propor arquitetura, privacidade, estratégia de performance, dependências, riscos e pendências.
- [x] Registrar decisões em `docs/DECISIONS.md`.
- [x] Atualizar este roadmap e criar README.
- [ ] Aprovação do responsável para iniciar a Etapa 1.

## Etapa 1 — Fundação

**Inicia após aprovação.** Criar estrutura Next.js/React/TypeScript, tokens e componentes visuais autorais, navegação mobile-first e um feed demonstrativo com dados explicitamente marcados como fictícios. Implementar estados de carregamento, vazio, erro e offline; preferências de movimento reduzido; layout responsivo e navegação acessível. Não simular integrações externas como se funcionassem.

**Aceite:** comandos de lint, typecheck, testes básicos e build definidos e executáveis; fluxo principal utilizável em viewport estreito e desktop; bundle inicial medido; baseline Lighthouse registrada com ambiente e limitações; revisão de teclado/labels/foco. Sem chaves secretas no cliente ou conteúdo demo apresentado como real.

## Etapa 2 — Conta e dados

Configurar projeto Supabase e ambientes, autenticação e recuperação, perfil editável e workspaces/membros. Escrever migrações e políticas RLS antes de conectar a interface. Definir sessão, logout, exportação/exclusão e retenção mínima. Documentar `.env.example` sem segredos.

**Aceite:** integração de autenticação; tentativa automatizada de leitura/escrita cruzada entre tenants negada no banco; fluxos de sessão expirada/logout; revisão das permissões e variáveis de ambiente. Requer credenciais de serviço configuradas pelo responsável.

## Etapa 3 — Feed e interações

Adicionar feed paginado, explorar por segmento/região, salvos e ajuste de preferências. Persistir curtir, salvar, desfazer e rejeição como sinais distintos, com respostas otimistas acessíveis e reconciliação após erro.

**Aceite:** dados persistem no tenant correto; regras de ordenação têm testes; falha de rede não deixa interface em estado falso; carga do feed e bundle são comparados com baseline.

## Etapa 4 — Dados reais

Selecionar fonte empresarial autorizada e implementar adaptador. Avaliar atribuição, termos, retenção, deduplicação, limites, custo e correções antes de ingestão. Exibir origem, confiança, descoberta e última verificação; manter demonstração rotulada e separada.

**Aceite:** nenhuma evidência ou telefone é inferido sem prova; origem e datas disponíveis em cada item; controle de quota/custo e sinalização de erro definidos. Requer aprovação da fonte, conta e orçamento.

## Etapa 5 — Contato e atividade

Abrir WhatsApp via link validado com mensagem contextual editável; registrar somente contato iniciado. Implementar pipeline de acompanhamento, notas e datas.

**Aceite:** mensagem nunca é enviada automaticamente; status não sugere leitura/resposta não confirmada; telefone inválido impede abertura; usuários controlam notas e exclusão.

## Etapa 6 — Inteligência

Implementar pontuação determinística explicável por perfil, região e sinais consentidos. Registrar versão e fatores. Permitir editar e redefinir preferências. IA opcional apenas após definir fornecedor, custo e salvaguardas contra fatos inventados.

**Aceite:** razão da recomendação exibida; diversidade de descoberta mantida; preferências e sinais apagáveis; avaliação com casos rastreáveis.

## Etapa 7 — Preparação comercial

Desacoplar planos e entitlements, quotas, métricas necessárias e painel administrativo. Revisar segurança, privacidade, backup/recuperação, operação e custos. Integrar pagamento apenas após aprovação explícita de provedor, preços e regras.

**Aceite:** isolamento testado, limites validados no backend, auditoria sem excesso de dados pessoais, restauração documentada e revisão pré-produção concluída.

## Verificações transversais

Em cada entrega, executar testes unitários/integrados/de interface aplicáveis, lint, typecheck e build disponíveis. Registrar resultados reais e falhas. Testar rede instável, dados vazios, sessão expirada e acessibilidade. Medir Core Web Vitals, bundle e frame drops. Validar Safari/iOS e Chrome/Android em dispositivos reais quando disponíveis; indicar claramente testes não realizados.

## Pendências de produto e operação

- Aprovar início da Etapa 1.
- Criar/configurar contas de Supabase e hospedagem em momento apropriado.
- Escolher domínio, ambientes e provedor de e-mail/autenticação.
- Selecionar fonte autorizada de dados de empresas e aprovar limites/orçamento antes da Etapa 4.
- Definir contato do controlador, política de retenção e procedimentos de direitos LGPD antes de produção.
- Decidir pagamentos e preços somente na Etapa 7.
