"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "@/components/icon";
import { PwaInstallControl } from "@/components/pwa-install-control";
import { demoCategories, demoOpportunities } from "@/lib/demo-opportunities";
import {
  createWhatsAppUrl,
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
  { id: "activity", label: "Atividade", icon: "comment" },
  { id: "profile", label: "Perfil", icon: "profile" },
];

const interestOptions = ["skincare", "beleza", "moda", "editorial", "lifestyle", "bem-estar"];

export default function Studio() {
  const [section, setSection] = useState<Section>("feed");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Todas");
  const [saved, setSaved] = useState<Set<string>>(() => new Set());
  const [liked, setLiked] = useState<Set<string>>(() => new Set());
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
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

  function navigate(next: Section) {
    setSection(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggle(setter: typeof setSaved, id: string, selected: boolean, label: string) {
    setter((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setToast(`${label} ${selected ? "removido" : "registrado"}. A prévia não salva essa ação.`);
  }

  function toggleDetails(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function contactCompany(opportunity: Opportunity) {
    const url = createWhatsAppUrl(opportunity);
    if (!url) {
      setToast("Esta demonstração não tem um telefone empresarial real para iniciar contato.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    setToast("WhatsApp aberto com uma mensagem para você revisar. Nada foi enviado.");
  }

  function toggleInterest(interest: string) {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  }

  const screenTitle: Record<Section, string> = {
    feed: "Para você",
    explore: "Explorar",
    saved: "Salvos",
    activity: "Atividade",
    profile: "Perfil",
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <header className="app-header">
        <span aria-hidden="true" />
        <button type="button" className="wordmark" onClick={() => navigate("feed")}>
          emilly studio
        </button>
        <div className="header-actions">
          <PwaInstallControl />
          <button
            type="button"
            className="header-profile"
            onClick={() => navigate("profile")}
            aria-label="Abrir perfil"
          >
            <Icon name="profile" />
          </button>
        </div>
      </header>

      {!online && (
        <div className="connection-banner" role="status">
          Sem conexão · ações desta prévia não serão sincronizadas.
        </div>
      )}

      <main id="conteudo" className={`app-main app-main-${section}`}>
        <h1 className="screen-title">{screenTitle[section]}</h1>

        {section === "explore" && (
          <section className="explore-tools" aria-label="Busca e filtros">
            <label className="search-field">
              <Icon name="search" />
              <span className="visually-hidden">Buscar empresa, segmento ou região</span>
              <input
                type="search"
                placeholder="Buscar empresas e segmentos"
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
                  key={item}
                  type="button"
                  className={category === item ? "filter-chip is-active" : "filter-chip"}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </fieldset>
          </section>
        )}

        {(section === "feed" || section === "explore" || section === "saved") && (
          <>
            <p className="demo-note">
              <span aria-hidden="true" /> Exemplos fictícios · sem empresas ou contatos verificados
            </p>
            {visibleOpportunities.length ? (
              <div className="feed-list">
                {visibleOpportunities.map((opportunity) => (
                  <OpportunityPost
                    key={opportunity.id}
                    opportunity={opportunity}
                    liked={liked.has(opportunity.id)}
                    saved={saved.has(opportunity.id)}
                    expanded={expanded.has(opportunity.id)}
                    reason={recommendationReason(opportunity, interests)}
                    onLike={() =>
                      toggle(setLiked, opportunity.id, liked.has(opportunity.id), "Interesse")
                    }
                    onSave={() =>
                      toggle(setSaved, opportunity.id, saved.has(opportunity.id), "Salvamento")
                    }
                    onDetails={() => toggleDetails(opportunity.id)}
                    onContact={() => contactCompany(opportunity)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title={section === "saved" ? "Nada salvo ainda" : "Nenhum resultado"}
                description={
                  section === "saved"
                    ? "Toque no marcador de uma publicação para guardá-la nesta sessão."
                    : "Experimente outro termo ou escolha um segmento diferente."
                }
                action={section === "saved" ? "Voltar ao início" : "Limpar filtros"}
                onAction={() => {
                  if (section === "saved") navigate("feed");
                  else {
                    setQuery("");
                    setCategory("Todas");
                  }
                }}
              />
            )}
          </>
        )}

        {section === "activity" && <ActivitySection />}
        {section === "profile" && (
          <ProfileSection interests={interests} onToggle={toggleInterest} />
        )}
      </main>

      <nav className="app-nav" aria-label="Navegação principal">
        {navigation.map((item) => (
          <button
            key={item.id}
            type="button"
            className={section === item.id ? "is-current" : ""}
            aria-label={item.label}
            aria-current={section === item.id ? "page" : undefined}
            onClick={() => navigate(item.id)}
          >
            <Icon name={item.icon} />
          </button>
        ))}
      </nav>

      {toast && (
        <div className="toast" role="status">
          <span>{toast}</span>
          <button type="button" onClick={() => setToast("")} aria-label="Fechar aviso">
            <Icon name="close" />
          </button>
        </div>
      )}
    </div>
  );
}

function OpportunityPost({
  opportunity,
  liked,
  saved,
  expanded,
  reason,
  onLike,
  onSave,
  onDetails,
  onContact,
}: {
  opportunity: Opportunity;
  liked: boolean;
  saved: boolean;
  expanded: boolean;
  reason: string;
  onLike: () => void;
  onSave: () => void;
  onDetails: () => void;
  onContact: () => void;
}) {
  return (
    <article className="post" aria-labelledby={`post-${opportunity.id}`}>
      <header className="post-header">
        <span className="post-avatar" aria-hidden="true">
          {initials(opportunity.name)}
        </span>
        <div className="post-identity">
          <h2 id={`post-${opportunity.id}`}>{opportunity.name}</h2>
          <p>
            {opportunity.category} · {opportunity.city}
          </p>
        </div>
        <button
          type="button"
          className="post-more"
          aria-label={expanded ? "Fechar detalhes" : "Ver detalhes e origem"}
          aria-expanded={expanded}
          onClick={onDetails}
        >
          <Icon name="more" />
        </button>
      </header>

      <div className="post-media" role="img" aria-label="Imagem oficial da empresa indisponível">
        <Icon name="image" />
        <span>Imagem oficial não disponível</span>
      </div>

      <div className="post-actions">
        <div className="post-actions-left">
          <button
            type="button"
            className={`post-action like-button ${liked ? "is-liked" : ""}`}
            aria-label={liked ? "Remover interesse" : "Demonstrar interesse"}
            aria-pressed={liked}
            onClick={onLike}
          >
            <Icon name="heart" />
          </button>
          <button
            type="button"
            className="post-action"
            aria-label={expanded ? "Fechar contexto" : "Ver contexto da recomendação"}
            aria-expanded={expanded}
            onClick={onDetails}
          >
            <Icon name="comment" />
          </button>
          <button
            type="button"
            className="post-action"
            aria-label={`Entrar em contato com ${opportunity.name}`}
            onClick={onContact}
          >
            <Icon name="send" />
          </button>
        </div>
        <button
          type="button"
          className={`post-action save-button ${saved ? "is-saved" : ""}`}
          aria-label={
            saved ? `Remover ${opportunity.name} dos salvos` : `Salvar ${opportunity.name}`
          }
          aria-pressed={saved}
          onClick={onSave}
        >
          <Icon name="bookmark" />
        </button>
      </div>

      <p className="interest-status">
        {liked
          ? "Você demonstrou interesse nesta oportunidade."
          : "Demonstre interesse nesta oportunidade."}
      </p>
      <p className="post-caption">
        <strong>{opportunity.name}</strong> {opportunity.description}
      </p>
      <p className="post-tags">
        {opportunity.services.map((service) => `#${service.replaceAll(" ", "")}`).join(" ")}
      </p>
      <p className="post-provenance">Exemplo fictício · dados sem verificação</p>

      {expanded && (
        <section className="post-details" aria-label="Contexto da recomendação">
          <strong>Por que aparece para você</strong>
          <p>{reason}</p>
          <span>Origem: conteúdo demonstrativo. Nenhuma campanha ou contato foi confirmado.</span>
        </section>
      )}
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
    <section className="empty-state">
      <Icon name="bookmark" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button type="button" onClick={onAction}>
        {action}
      </button>
    </section>
  );
}

function ActivitySection() {
  return (
    <section className="simple-screen">
      <p className="empty-state-copy">Os contatos iniciados aparecerão aqui.</p>
      <p className="screen-footnote">
        Esta demonstração não tem empresas com telefone real. Abrir o contato não significa que uma
        mensagem foi enviada ou lida.
      </p>
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
    <section className="profile-screen">
      <div className="profile-summary">
        <span className="profile-large-avatar">E</span>
        <div>
          <strong>Perfil de demonstração</strong>
          <p>Modelo · criadora UGC · influenciadora</p>
        </div>
      </div>
      <p className="profile-copy">
        Seus dados profissionais e links públicos serão configurados quando a conta estiver pronta.
      </p>
      <div className="preference-block">
        <h2>Interesses</h2>
        <p>Usados para explicar as sugestões desta prévia.</p>
        <div className="interest-options">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              type="button"
              className={interests.includes(interest) ? "is-selected" : ""}
              aria-pressed={interests.includes(interest)}
              onClick={() => onToggle(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
      <p className="screen-footnote">As alterações desta prévia não são guardadas.</p>
    </section>
  );
}
