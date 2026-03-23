// src/app/produtos/layout.tsx
// Responsabilidade: Metadata do catálogo — necessário porque page.tsx usa "use client"
// Em Next.js App Router, metadata não pode ser exportada de client components

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site-config";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explore nossa coleção de biscoitos artesanais de mel e manteiga, decorados à mão para todas as ocasiões. Coleção de Páscoa, clássicos e muito mais.",
  openGraph: {
    title: `Catálogo | ${SITE_CONFIG.name}`,
    description:
      "Biscoitos artesanais decorados à mão para todas as ocasiões. Encomende pelo WhatsApp.",
    url: `${SITE_CONFIG.url}/produtos`,
    siteName: SITE_CONFIG.name,
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/produtos`,
  },
};

export default function ProdutosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}