import { describe, expect, it } from "vitest";
import {
  createWhatsAppUrl,
  filterOpportunities,
  initials,
  type Opportunity,
  recommendationReason,
} from "./opportunities";

const examples: Opportunity[] = [
  {
    id: "beauty",
    name: "Marca fictícia 01",
    category: "Beleza",
    city: "Belo Horizonte, MG",
    description: "Cuidados de pele para uma campanha demonstrativa.",
    services: ["Skincare", "UGC"],
    interests: ["skincare", "beleza"],
    palette: "clay",
  },
  {
    id: "fashion",
    name: "Marca fictícia 02",
    category: "Moda",
    city: "Contagem, MG",
    description: "Editorial de moda para demonstração.",
    services: ["Editorial", "Provador"],
    interests: ["moda"],
    palette: "olive",
  },
];

describe("filterOpportunities", () => {
  it("matches text without case sensitivity across fields", () => {
    expect(filterOpportunities(examples, { query: "BELO HORIZONTE" })).toHaveLength(1);
    expect(filterOpportunities(examples, { query: "provador" })[0]?.id).toBe("fashion");
  });

  it("applies category and query together", () => {
    expect(filterOpportunities(examples, { query: "skincare", category: "Moda" })).toEqual([]);
    expect(filterOpportunities(examples, { category: "Beleza" })[0]?.id).toBe("beauty");
  });

  it("returns no result for an unmatched search", () => {
    expect(filterOpportunities(examples, { query: "Recife" })).toEqual([]);
  });
});

describe("recommendationReason", () => {
  it("explains an explicit profile match", () => {
    expect(recommendationReason(examples[0], ["skincare"])).toContain("skincare");
  });

  it("labels discovery suggestions as demonstrations", () => {
    expect(recommendationReason(examples[1], ["skincare"])).toContain("ampliar sua descoberta");
  });
});

it("creates a compact monogram without turning demo names into brands", () => {
  expect(initials("Marca fictícia 01")).toBe("01");
});

describe("createWhatsAppUrl", () => {
  it("does not create a contact link for examples without a published number", () => {
    expect(createWhatsAppUrl(examples[0])).toBeNull();
  });

  it("requires a traceable source and a valid phone number", () => {
    expect(
      createWhatsAppUrl({
        ...examples[0],
        contact: { whatsappPhone: "+55 (31) 99999-9999", source: "Página oficial da empresa" },
      }),
    ).toContain("https://wa.me/5531999999999?text=");
    expect(
      createWhatsAppUrl({
        ...examples[0],
        contact: { whatsappPhone: "123", source: "Página oficial da empresa" },
      }),
    ).toBeNull();
    expect(
      createWhatsAppUrl({
        ...examples[0],
        contact: { whatsappPhone: "5531999999999", source: " " },
      }),
    ).toBeNull();
  });
});
