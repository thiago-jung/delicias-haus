// src/constants/site-config.ts
// Responsabilidade: Metadados globais, navegação e textos do site

export const SITE_CONFIG = {
  name: "Delicias Haus",
    tagline: "Biscoitos decorados feitos com alma",
    logoSrc: "/images/logo2.svg",
  description:
    "Biscoitos de mel e manteiga artesanais, decorados com precisão e carinho. Cada peça é única — criada para ser o presente perfeito.",
  url: "https://deliciashaus.com.br",
  contact: {
    whatsapp: "https://wa.me/5551992625835",
    email: "thiago.sjung@gmail.com",
    instagram: "https://instagram.com/deliciashaus",
  },
  social: {
    instagram: "@deliciashaus",
    },
    imageSizes: {
        productCard: "(max-width: 768px) 100vw, 384px",
        hero: "(max-width: 1024px) 100vw, 50vw",
        logo: "40px",
    }
};

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Catálogo", href: "/produtos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export const STATS = [
  { value: "500+", label: "clientes felizes" },
  { value: "20", label: "anos de prática" },
  { value: "100%", label: "artesanal" },
  { value: "0", label: "corantes artificiais" },
];
