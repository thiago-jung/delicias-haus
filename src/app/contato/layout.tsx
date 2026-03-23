// src/app/contato/layout.tsx
// Responsabilidade: Metadata de contato — necessário porque page.tsx usa "use client"

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site-config";

export const metadata: Metadata = {
    title: "Contato",
    description:
        "Entre em contato com a Delicias Haus para fazer sua encomenda de biscoitos artesanais. Atendemos via WhatsApp, Instagram ou formulário.",
    openGraph: {
        title: `Contato | ${SITE_CONFIG.name}`,
        description:
            "Faça sua encomenda de biscoitos artesanais. Atendemos via WhatsApp, Instagram ou formulário.",
        url: `${SITE_CONFIG.url}/contato`,
        siteName: SITE_CONFIG.name,
        locale: "pt_BR",
        type: "website",
    },
    alternates: {
        canonical: `${SITE_CONFIG.url}/contato`,
    },
};

export default function ContatoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}