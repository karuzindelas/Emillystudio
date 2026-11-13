export type Opportunity = {
  id: string;
  name: string;
  category: string;
  city: string;
  description: string;
  services: string[];
  interests: string[];
  palette: "clay" | "olive" | "plum";
};

export type OpportunityFilters = {
  query?: string;
  category?: string;
};

export function filterOpportunities(
  opportunities: Opportunity[],
  { query = "", category = "Todas" }: OpportunityFilters = {},
): Opportunity[] {
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

  return opportunities.filter((opportunity) => {
    const matchesCategory = category === "Todas" || opportunity.category === category;
    const searchableText = [
      opportunity.name,
      opportunity.category,
      opportunity.city,
      opportunity.description,
      ...opportunity.services,
      ...opportunity.interests,
    ]
      .join(" ")
      .toLocaleLowerCase("pt-BR");

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
}

export function recommendationReason(opportunity: Opportunity, profileInterests: string[]): string {
  const overlap = opportunity.interests.find((interest) => profileInterests.includes(interest));
  return overlap
    ? `Demonstração: afinidade com seu interesse em ${overlap}.`
    : "Demonstração: oportunidade incluída para ampliar sua descoberta.";
}

export function initials(name: string): string {
  return name.replace("Marca fictícia", "").trim().slice(0, 2).padStart(2, "0");
}
