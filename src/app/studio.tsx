"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "@/components/icon";
import { PwaInstallControl } from "@/components/pwa-install-control";
import { demoCategories, demoOpportunities } from "@/lib/demo-opportunities";
import {
  filterOpportunities,
  initials,
  type Opportunity,
  recommendationReason,
} from "@/lib/opportunities";

type Section = "feed" | "explore" | "saved" | "activity" | "profile";

const navigation: { id: Section; label: string; icon: IconName }[] = [
  { id: "feed", label: "Início", icon: "home" },
  { id: "explore", label: "Explorar", icon: "search" },
  { id: "saved", label: "Salvos", icon: "bookmark" },
  { id: "activity", label: "Atividade", icon: "activity" },
  { id: "profile", label: "Perfil", icon: "profile" },
];

const sectionCopy: Record<Section, { title: string; eyebrow: string; description: string }> = {
  feed: {
    title: "Seu próximo encontro pode começar aqui.",
    eyebrow: "RADAR DE PARCERIAS",
    description: "Uma descoberta por vez, com contexto para você decidir se faz sentido.",
  },
  explore: {
    title: "Encontre um caminho novo.",
    eyebrow: "EXPLORAR",
    description: "Busque por segmento, serviço ou região nos exemplos de demonstração.",
  },
  saved: {
    title: "O que vale acompanhar.",
    eyebrow: "SUA LISTA",
    description:
      "Guarde ideias para voltar a elas depois. Nesta prévia, os sinais não são persistidos.",
  },
  activity: {
    title: "Cada conversa começa com você.",
    eyebrow: "ATIVIDADE",
    description:
      "Acompanhe contatos iniciados e próximos passos quando sua conta estiver configurada.",
  },
  profile: {
    title: "Seu trabalho, do seu jeito.",
    eyebrow: "PERFIL PROFISSIONAL",
    description:
      "Preferências ajudam a dar contexto às recomendações. Edite os interesses abaixo nesta prévia.",
  },
};

const interestOptions = ["skincare", "beleza", "moda", "editorial", "lifestyle", "bem-estar"];

export default function Studio() {
  const [section, setSection] = useState<Section>("feed");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Todas");
  const [saved, setSaved] = useState<Set<string>>(() => new Set());
  const [liked, setLiked] = useState<Set<string>>(() => new Set());
  const [interests, setInterests] = useState<string[]>(["skincare", "beleza", "moda", "lifestyle"]);
  const [toast, setToast] = useState("");
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const updateConnection = () => setOnline(navigator.onLine);
    updateConnection();
    window.addEventListener("online", updateConnection);
    window.addEventListener("offline", updateConnection);
    return () => {
      window.removeEventListener("online", updateConnection);
      window.removeEventListener("offline", updateConnection);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const visibleOpportunities = useMemo(() => {
    const filtered = filterOpportunities(demoOpportunities, {
      query: section === "explore" ? query : "",
      category: section === "explore" ? category : "Todas",
    });
    if (section === "saved") return filtered.filter((item) => saved.has(item.id));
    return filtered;
  }, [category, query, saved, section]);

  function toggleItem(setter: typeof setSaved, id: string, wasSelected: boolean, kind: string) {
    setter((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setToast(
      `${kind} ${wasSelected ? "removido" : "registrado"} nesta prévia. Não será salvo após sair.`,
    );
  }

  function toggleInterest(interest: string) {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <aside className="sidebar" aria-label="Navegação principal">
        <Brand />
        <p className="sidebar-label">ESPAÇO DE TRABALHO</p>
        <Navigation section={section} onNavigate={setSection} />
        <div className="sidebar-bottom">
          <div className="workspace-switcher">
            <span className="workspace-avatar" aria-hidden="true">
              E
            </span>
            <span>
              <strong>Espaço de demonstração</strong>
              <small>Prévia do produto</small>
            </span>
            <span className="workspace-chevron" aria-hidden="true">
              ⌄
            </span>
          </div>
          <p className="sidebar-footnote">Um estúdio para descobrir com intenção.</p>
        </div>
      </aside>

      <main id="conteudo" className="main-column">
        <header className="topbar">
          <div className="mobile-brand">
            <Brand />
          </div>
          <span className="topbar-context">
            Espaço pessoal <span aria-hidden="true">/</span>{" "}
            {navigation.find((item) => item.id === section)?.label}
          </span>
          <div className="topbar-actions">
            <PwaInstallControl />
            <button
              type="button"
              className="profile-chip"
              onClick={() => setSection("profile")}
              aria-label="Abrir perfil de demonstração"
            >
              <span className="profile-avatar">E</span>
              <span className="profile-name">Perfil demo</span>
              <span aria-hidden="true">⌄</span>
            </button>
          </div>
        </header>

        {!online && (
          <div className="connection-banner" role="status">
            <span className="connection-dot" /> Sem conexão. Esta prévia não sincroniza ações.
          </div>
        )}

        <div className="content-wrap">
          <section className="page-intro" aria-labelledby="page-title">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {sectionCopy[section].eyebrow}
            </p>
            <h1 id="page-title">{sectionCopy[section].title}</h1>
            <p className="page-description">{sectionCopy[section].description}</p>
          </section>

          {section === "profile" ? (
            <ProfileSection interests={interests} onToggle={toggleInterest} />
          ) : section === "activity" ? (
            <ActivitySection />
          ) : (
            <>
              {section === "explore" && (
                <section className="explore-tools" aria-label="Filtros da busca">
                  <label className="search-field">
                    <Icon name="search" />
                    <span className="visually-hidden">Buscar por empresa, serviço ou região</span>
                    <input
                      type="search"
                      placeholder="Empresa, serviço ou região"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    {query && (
                      <button type="button" aria-label="Limpar busca" onClick={() => setQuery("")}>
                        <Icon name="close" />
                      </button>
                    )}
                  </label>
                  <fieldset className="filter-row">
                    <legend className="visually-hidden">Filtrar por segmento</legend>
                    {demoCategories.map((item) => (
                      <button
                        className={`filter-chip ${category === item ? "is-active" : ""}`}
                        key={item}
                        type="button"
                        aria-pressed={category === item}
                        onClick={() => setCategory(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </fieldset>
                </section>
              )}

              <div className="feed-heading">
                <div>
                  <h2>
                    {section === "saved"
                      ? "Salvos nesta sessão"
                      : section === "explore"
                        ? "Resultados de demonstração"
                        : "Uma seleção para você"}
                  </h2>
                  <p>
                    {section === "saved"
                      ? `${visibleOpportunities.length} itens`
                      : "Exemplos ilustrativos · não são oportunidades reais"}
                  </p>
                </div>
                {section === "feed" && (
                  <span className="feed-count">{demoOpportunities.length} exemplos</span>
                )}
              </div>

              {section !== "explore" && section !== "saved" && (
                <div className="demo-banner" role="note">
                  <Icon name="spark" />
                  <p>
                    <strong>Prévia do produto.</strong> Empresas, descrições e recomendações abaixo
                    são fictícias e não foram verificadas.
                  </p>
                </div>
              )}

              {visibleOpportunities.length > 0 ? (
                <div className="opportunity-list">
                  {visibleOpportunities.map((opportunity, index) => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      index={index}
                      saved={saved.has(opportunity.id)}
                      liked={liked.has(opportunity.id)}
                      reason={recommendationReason(opportunity, interests)}
                      onSave={() =>
                        toggleItem(
                          setSaved,
                          opportunity.id,
                          saved.has(opportunity.id),
                          "Salvamento",
                        )
                      }
                      onLike={() =>
                        toggleItem(setLiked, opportunity.id, liked.has(opportunity.id), "Interesse")
                      }
                      onContact={() =>
                        setToast(
                          "Sem contato disponível: esta demonstração não inclui telefones ou canais reais.",
                        )
                      }
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title={
                    section === "saved"
                      ? "Sua lista começa com uma boa descoberta."
                      : "Nenhum exemplo encontrado."
                  }
                  description={
                    section === "saved"
                      ? "Salve um item para mantê-lo nesta sessão."
                      : "Tente outro termo ou remova um filtro."
                  }
                  action={section === "saved" ? "Voltar ao início" : "Limpar busca"}
                  onAction={() => {
                    if (section === "saved") setSection("feed");
                    else {
                      setQuery("");
                      setCategory("Todas");
                    }
                  }}
                />
              )}
            </>
          )}

          <footer className="content-footer">
            <span>EMILLY STUDIO</span>
            <span>DESCOBERTA COM INTENÇÃO</span>
          </footer>
        </div>
      </main>

      <aside className="context-column" aria-label="Contexto do perfil">
        <div className="context-inner">
          <div className="context-head">
            <span>SEU NORTE</span>
            <Icon name="spark" />
          </div>
          <h2>Uma descoberta que combina com você.</h2>
          <p>
            O feed considera interesses que você escolheu e mostra por que cada exemplo aparece.
          </p>
          <div className="interest-stack">
            {interests.slice(0, 4).map((interest) => (
              <span key={interest}>{interest}</span>
            ))}
            {interests.length === 0 && <span>Nenhum interesse selecionado</span>}
          </div>
          <button type="button" className="text-link" onClick={() => setSection("profile")}>
            Editar interesses <Icon name="arrow" />
          </button>
          <div className="context-divider" />
          <div className="context-note-icon">
            <Icon name="bookmark" />
          </div>
          <h3>Guarde o que merece uma segunda olhada.</h3>
          <p>
            Salvar organiza suas descobertas. Curtir ajuda a mostrar afinidade. São sinais
            diferentes.
          </p>
          <button type="button" className="context-link" onClick={() => setSection("saved")}>
            Ver itens salvos <span aria-hidden="true">→</span>
          </button>
          <div className="context-privacy">
            <span className="privacy-mark">✳</span>
            <p>Seus sinais desta prévia ficam apenas na memória desta página.</p>
          </div>
        </div>
      </aside>

      <nav className="mobile-nav" aria-label="Navegação principal">
        {navigation.map((item) => (
          <button
            key={item.id}
            type="button"
            className={section === item.id ? "is-current" : ""}
            aria-current={section === item.id ? "page" : undefined}
            onClick={() => setSection(item.id)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {toast && (
        <div className="toast" role="status">
          <Icon name="check" />
          <span>{toast}</span>
          <button type="button" onClick={() => setToast("")} aria-label="Fechar aviso">
            <Icon name="close" />
          </button>
        </div>
      )}
    </div>
  );
}

function Brand() {
  return (
    <div className="brand-lockup">
      <span className="brand-mark" aria-hidden="true">
        <span>E</span>
        <i />
      </span>
      <span className="brand-type">
        emilly <b>studio</b>
        <small>CREATOR RELATIONSHIPS</small>
      </span>
    </div>
  );
}

function Navigation({
  section,
  onNavigate,
}: {
  section: Section;
  onNavigate: (section: Section) => void;
}) {
  return (
    <nav className="desktop-nav" aria-label="Seções">
      {navigation.map((item) => (
        <button
          type="button"
          key={item.id}
          className={`nav-item ${section === item.id ? "is-current" : ""}`}
          aria-current={section === item.id ? "page" : undefined}
          onClick={() => onNavigate(item.id)}
        >
          <Icon name={item.icon} />
          <span>{item.label}</span>
          {item.id === "saved" && <span className="nav-count">·</span>}
        </button>
      ))}
    </nav>
  );
}

function OpportunityCard({
  opportunity,
  index,
  saved,
  liked,
  reason,
  onSave,
  onLike,
  onContact,
}: {
  opportunity: Opportunity;
  index: number;
  saved: boolean;
  liked: boolean;
  reason: string;
  onSave: () => void;
  onLike: () => void;
  onContact: () => void;
}) {
  return (
    <article className="opportunity-card" aria-labelledby={`opportunity-${opportunity.id}`}>
      <div className={`brand-panel panel-${opportunity.palette}`}>
        <div className="panel-topline">
          <span>EXEMPLO FICTÍCIO</span>
          <span>0{index + 1} / 03</span>
        </div>
        <div className="panel-mark" aria-hidden="true">
          {initials(opportunity.name)}
        </div>
        <div className="panel-footline">
          <span>IMAGEM OFICIAL NÃO DISPONÍVEL</span>
          <span>◌</span>
        </div>
      </div>
      <div className="card-body">
        <div className="company-heading">
          <div>
            <p className="company-category">
              {opportunity.category} <span>·</span> {opportunity.city}
            </p>
            <h3 id={`opportunity-${opportunity.id}`}>{opportunity.name}</h3>
          </div>
          <button
            type="button"
            className={`icon-action ${saved ? "is-selected" : ""}`}
            aria-label={
              saved ? `Remover ${opportunity.name} dos salvos` : `Salvar ${opportunity.name}`
            }
            aria-pressed={saved}
            onClick={onSave}
          >
            <Icon name="bookmark" />
          </button>
        </div>
        <p className="company-description">{opportunity.description}</p>
        <ul className="service-list" aria-label="Serviços do exemplo">
          {opportunity.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
        <div className="fit-reason">
          <span className="fit-symbol">
            <Icon name="spark" />
          </span>
          <p>{reason}</p>
        </div>
        <div className="provenance">
          <span>
            <i /> Fonte demonstrativa
          </span>
          <span>Sem verificação</span>
        </div>
        <div className="card-actions">
          <button
            type="button"
            className={`like-action ${liked ? "is-selected" : ""}`}
            aria-pressed={liked}
            onClick={onLike}
          >
            <Icon name="heart" />
            <span>{liked ? "Interessada" : "Tenho interesse"}</span>
          </button>
          <button type="button" className="contact-action" onClick={onContact}>
            Contato <Icon name="arrow" />
          </button>
        </div>
      </div>
    </article>
  );
}

function EmptyState({
  title,
  description,
  action,
  onAction,
}: {
  title: string;
  description: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="empty-state">
      <span className="empty-mark">
        <Icon name="bookmark" />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      <button type="button" onClick={onAction}>
        {action}
      </button>
    </div>
  );
}

function ActivitySection() {
  return (
    <section className="section-panel activity-panel">
      <div className="section-panel-kicker">
        <span>SEU ACOMPANHAMENTO</span>
        <span>0 conversas</span>
      </div>
      <ol className="pipeline-steps" aria-label="Etapas de acompanhamento">
        {["Contato iniciado", "Aguardando resposta", "Em negociação", "Concluído"].map(
          (step, index) => (
            <li className="pipeline-step" key={step}>
              <span className="pipeline-index">0{index + 1}</span>
              <span>{step}</span>
              <span className="pipeline-count">0</span>
            </li>
          ),
        )}
      </ol>
      <div className="empty-inline">
        <span className="empty-mark">
          <Icon name="activity" />
        </span>
        <h3>Nenhum contato iniciado.</h3>
        <p>
          Quando uma oportunidade real estiver disponível, você poderá abrir o canal de contato e
          registrar o acompanhamento.
        </p>
      </div>
    </section>
  );
}

function ProfileSection({
  interests,
  onToggle,
}: {
  interests: string[];
  onToggle: (interest: string) => void;
}) {
  return (
    <section className="section-panel profile-panel">
      <div className="profile-cover">
        <span>PERFIL DE DEMONSTRAÇÃO</span>
        <span className="profile-large-avatar">E</span>
      </div>
      <div className="profile-detail">
        <p className="eyebrow">CRIADORA · MODELO · UGC</p>
        <h2>Seu perfil profissional</h2>
        <p>
          Os campos de perfil e dados públicos serão configurados com segurança quando a conta
          estiver disponível.
        </p>
      </div>
      <div className="preference-block">
        <div>
          <h3>Temas de interesse</h3>
          <p>Selecione para atualizar os motivos das recomendações nesta sessão.</p>
        </div>
        <div className="interest-options">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              type="button"
              className={interests.includes(interest) ? "is-selected" : ""}
              aria-pressed={interests.includes(interest)}
              onClick={() => onToggle(interest)}
            >
              {interests.includes(interest) && <Icon name="check" />}
              {interest}
            </button>
          ))}
        </div>
      </div>
      <p className="preview-caption">
        As escolhas desta demonstração não são salvas na conta nem no dispositivo.
      </p>
    </section>
  );
}
