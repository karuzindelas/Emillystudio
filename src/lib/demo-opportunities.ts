import type { Opportunity } from "./opportunities";

/** Fictional examples for product review. Never treat these as real businesses. */
export const demoOpportunities: Opportunity[] = [
  {
    id: "demo-01",
    name: "Marca fictícia 01",
    category: "Beleza",
    city: "Belo Horizonte, MG",
    description: "Uma proposta ilustrativa de conteúdo para cuidados de pele.",
    services: ["Skincare", "Vídeo UGC", "Review"],
    interests: ["skincare", "beleza"],
    palette: "clay",
  },
  {
    id: "demo-02",
    name: "Marca fictícia 02",
    category: "Moda",
    city: "Contagem, MG",
    description: "Um exemplo de pauta editorial para apresentação de coleção.",
    services: ["Editorial", "Provador", "Fotos de produto"],
    interests: ["moda", "editorial"],
    palette: "olive",
  },
  {
    id: "demo-03",
    name: "Marca fictícia 03",
    category: "Lifestyle",
    city: "Nova Lima, MG",
    description: "Uma ideia demonstrativa para conteúdo de rotina e bem-estar.",
    services: ["Lifestyle", "Vlog", "Review"],
    interests: ["lifestyle", "bem-estar"],
    palette: "plum",
  },
];

export const demoCategories = ["Todas", "Beleza", "Moda", "Lifestyle"] as const;
