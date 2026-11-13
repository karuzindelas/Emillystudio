import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emilly Studio — Descoberta com intenção",
  description: "Um espaço para descobrir oportunidades de marcas com contexto e intenção.",
  applicationName: "Emilly Studio",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Emilly Studio",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ed",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
