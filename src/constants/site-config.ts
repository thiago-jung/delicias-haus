// src/constants/site-config.ts
// Responsabilidade: Metadados globais, navegação e textos do site

export const SITE_CONFIG = {
  name: "Delicias Haus",
  tagline: "Biscoitos decorados feitos com alma",
  description:
    "Biscoitos de mel e manteiga artesanais, decorados com precisão e carinho. Cada peça é única — criada para ser o presente perfeito.",
  url: "https://deliciashaus.com.br",
  contact: {
    whatsapp: "https://wa.me/5551999999999",
    email: "ola@deliciashaus.com.br",
    instagram: "https://instagram.com/deliciashaus",
  },
  social: {
    instagram: "@deliciashaus",
  },
};

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Catálogo", href: "/produtos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export const STATS = [
  { value: "500+", label: "clientes felizes" },
  { value: "12", label: "anos de prática" },
  { value: "100%", label: "artesanal" },
  { value: "0", label: "corantes artificiais" },
];
