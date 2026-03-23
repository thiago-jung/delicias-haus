// src/app/layout.tsx
// Responsabilidade: Root layout — providers de fonte, tema, JSON-LD e analytics

import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/constants/site-config";
import { Toaster } from "sonner";

// ANALYTICS: instale com `npm install @vercel/analytics @vercel/speed-insights`
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-playfair",
    display: "swap",
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-cormorant",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    metadataBase: new URL(SITE_CONFIG.url),
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: SITE_CONFIG.url,
        siteName: SITE_CONFIG.name,
        title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
        description: SITE_CONFIG.description,
    },
    twitter: {
        card: "summary_large_image",
        title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
        description: SITE_CONFIG.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: SITE_CONFIG.url,
    },
};

// JSON-LD: LocalBusiness schema para SEO local
// Aparece no Google como painel de negócio com horário, telefone, etc.
const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: "+5551992625835",
    priceRange: "$$",
    servesCuisine: "Confeitaria Artesanal",
    address: {
        "@type": "PostalAddress",
        addressCountry: "BR",
        addressRegion: "RS",
        // Adicione cidade e CEP quando quiser mais precisão:
         addressLocality: "Porto Alegre",
        // postalCode: "90000-000",
    },
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            opens: "09:00",
            closes: "18:00",
        },
    ],
    sameAs: [SITE_CONFIG.contact.instagram],
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+5551992625835",
        contactType: "customer service",
        availableLanguage: "Portuguese",
    },
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Biscoitos Artesanais",
        itemListElement: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Product",
                    name: "Biscoitos de Mel Decorados",
                    description: "Biscoitos artesanais de mel decorados à mão com glacê real",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Product",
                    name: "Spekulatius",
                    description: "Biscoito típico alemão, crocante e fininho feito de especiarias",
                },
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="pt-BR"
            className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} dark`}
        >
            <head>
                {/* JSON-LD LocalBusiness */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
                />
            </head>
            <body className="grain-overlay bg-background text-foreground antialiased selection:bg-brand-gold/25">
                <Navbar />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <Toaster
                    theme="dark"
                    toastOptions={{
                        style: {
                            background: "#1A1510",
                            border: "1px solid rgba(201,168,76,0.2)",
                            color: "#F0EBE3",
                        },
                    }}
                />
                {/* Vercel Analytics — coleta pageviews e web vitals automaticamente */}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}