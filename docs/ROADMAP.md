# Roadmap — Emilly Studio

Atualizado em 2026-11-13. Segue as etapas do Prompt Mestre; serviços externos permanecem desligados até serem escolhidos e configurados.

## Etapa 0 — Inspeção e planejamento

**Concluída na branch `docs/etapa-0-arquitetura`.** Árvore remota inspecionada; arquitetura, custos prováveis, riscos e sequência registrados no README, neste arquivo e em `docs/DECISIONS.md`.

## Etapa 1 — Fundação

**Fundação implementada como PWA; validação em dispositivos reais pendente.**

- Next.js App Router, React e TypeScript estrito.
- Design system autoral, navegação desktop/mobile e safe-area inferior.
- Feed, explorar/busca/filtros, salvos, atividade e perfil de demonstração.
- Registros inteiramente fictícios rotulados; contatos externos não simulados.
- Interações otimistas em memória e avisos de não persistência.
- Estados de loading, erro, vazio e offline; respeita `prefers-reduced-motion`.
- Seis testes unitários de filtragem e explicação de recomendações.
- Manifesto PWA, ícones próprios 192/512/maskable, instalação standalone, orientação de instalação no Safari/iOS, service worker versionado e fallback offline.
- Cache explicitamente limitado ao shell público da demonstração e assets estáticos versionados; não cacheia chamadas de API nem estado do usuário.

**Verificações desta entrega:** lint, `pnpm typecheck`, 6/6 testes unitários e `node --check public/sw.js` passaram. O build padrão compilou, mas a checagem TypeScript interna bloqueou com `spawn EPERM`; o artefato de preview foi gerado com essa checagem temporariamente delegada ao typecheck explícito, e a configuração versionada foi restaurada sem ignorar erros. Build criou `/` e `/manifest.webmanifest`. Home, manifest, worker, fallback offline e ícones responderam HTTP 200; CTA e modal de instalação foram conferidos no preview. `pnpm audit --prod` não chegou a `registry.npmjs.org` nesta rodada (`ECONNREFUSED`); uma execução anterior não encontrou advisories, mas não foi possível atualizar o resultado agora. A linha de base de bundle documentada é da versão anterior ao PWA. Não há Lighthouse, frame drops, rede limitada ou instalação em aparelho físico.

**Aceite restante:** instalar em Android/Chrome e iPhone/Safari reais, confirmar abertura standalone e comportamento offline; registrar Lighthouse/Core Web Vitals e bundle em ambiente sem bloqueio de processos; revisar navegação com teclado e leitor de tela.

## Etapa 2 — Conta e dados

Configurar Supabase e ambientes, autenticação/recuperação, perfil editável, workspaces/membros, migrações e RLS antes de conectar a interface. Definir sessão/logout, exportação/exclusão e retenção mínima.

**Aceite:** tentativa automatizada de leitura/escrita cruzada entre tenants negada no banco; sessão expirada e logout testados; credenciais somente em ambiente de servidor. Requer provisionamento do responsável.

## Etapa 3 — Feed e interações

Substituir estados de sessão por dados paginados persistidos; manter explorar, salvos, desfazer e preferências. Feedback otimista deve reconciliar falha da rede.

**Aceite:** persistência por tenant; regras de ordenação testadas; nenhuma interface falsa após falha de rede; bundle comparado com baseline.

## Etapa 4 — Dados reais

Selecionar fonte oficial/autorizada; criar adaptador, deduplicação, proveniência, confiança, data de descoberta/verificação, limites e controles de custo.

**Aceite:** nenhuma oportunidade, contato ou responsável inferido sem evidência; direitos de correção/remoção implementados. Requer fonte, conta, termos e orçamento aprovados.

## Etapa 5 — Contato e atividade

Adicionar link `wa.me` validado com texto contextual editável e acompanhamento comercial. Registrar apenas contato iniciado; não inferir envio/leitura.

**Aceite:** envio sempre manual, sem disparo em massa; notas e estados removíveis; telefone sem origem válida não gera link.

## Etapa 6 — Inteligência

Pontuação determinística por perfil, localização e sinais explícitos, com explicação, versão, edição e redefinição. IA opcional só após fornecedor, custo e salvaguardas definidos.

## Etapa 7 — Preparação comercial

Planos/entitlements, quotas, métricas mínimas, painel administrativo, backup/restauração e revisão pré-produção. Pagamentos só após aprovação comercial explícita.

## Verificações transversais

Em cada etapa: lint, typecheck, testes aplicáveis e build; registrar resultados, acessibilidade, rede instável, sessão expirada, dados vazios e regressões de bundle/Core Web Vitals. Validar Safari/iOS e Chrome/Android em dispositivos reais quando disponíveis.

## Pendências de produto/operacionais

- Validar instalação e experiência offline da Etapa 1 em aparelhos reais.
- Provisionar Supabase, hospedagem, domínio e provedor de e-mail antes da Etapa 2.
- Definir política de retenção e processo LGPD antes de produção.
- Aprovar fonte de dados, atribuição e orçamento antes da Etapa 4.
- Decidir preços e pagamentos somente na Etapa 7.
