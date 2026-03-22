// src/app/layout.tsx
// Responsabilidade: Root layout — providers de fonte, tema e estrutura global

import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/constants/site-config";
import { Toaster } from "sonner";

// Configuração da Geist Sans
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

// Configuração da Geist Mono (opcional, útil para código)
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
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
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
          className={`${geistSans.variable} ${playfair.variable} ${cormorant.variable} dark`}
    >
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
      </body>
    </html>
  );
}
