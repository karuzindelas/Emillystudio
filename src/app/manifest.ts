import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Emilly Studio",
    short_name: "Emilly Studio",
    description: "Descoberta de oportunidades para criadoras, com contexto e intenção.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone"],
    orientation: "any",
    background_color: "#f5f3ed",
    theme_color: "#f5f3ed",
    categories: ["business", "lifestyle"],
    prefer_related_applications: false,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
