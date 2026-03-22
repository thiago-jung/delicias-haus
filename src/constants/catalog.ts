// src/constants/catalog.ts
// Responsabilidade: Sistema de catálogo dinâmico e sazonal.
// Para adicionar uma nova coleção (ex: Natal), crie um novo objeto
// no array COLLECTIONS e defina isActive: true nele (e false nos outros).

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  tags: string[];
  highlight?: boolean;
};

export type Collection = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  isActive: boolean;
  color: string;
  products: Product[];
};

// DECISÃO: isActive controla qual coleção aparece na Home e em Produtos.
// ALTERNATIVA: Poderia ser feito por data atual (ex: Date.now() entre pascoa.start e pascoa.end)
export const COLLECTIONS: Collection[] = [
  {
    id: "pascoa-2026",
    title: "Coleção de Páscoa 2026",
    subtitle: "Biscoitos de mel decorados à mão com a delicadeza do renascimento. Cada peça, uma celebração.",
    badge: "🐣 Páscoa · Edição Limitada",
    isActive: true,
    color: "#C9A84C",
    products: [
      {
        id: "p-coelho-mel",
        name: "Coelho de Mel Imperial",
        description: "Biscoito de mel artesanal decorado à mão com glacê real de múltiplas camadas.",
        price: 24.90,
        unit: "unidade",
        image: "/products/coelho-pascoa.webp",
        tags: ["Mel", "Decorado", "Páscoa"],
        highlight: true,
      },
      {
        id: "p-ovo-manteiga",
        name: "Ovo de Manteiga Gourmet",
        description: "Massa amanteigada que derrete na boca. Decorado com flores e listras em glacê pastel.",
        price: 42.00,
        unit: "kit c/ 3",
        image: "/products/ovo-manteiga.webp",
        tags: ["Manteiga", "Páscoa"],
        highlight: true,
      },
      {
        id: "p-cesta-pascoa",
        name: "Cesta Presenteável Páscoa",
        description: "Combinação especial com 6 biscoitos sortidos em embalagem kraft artesanal com laço.",
        price: 89.90,
        unit: "cesta",
        image: "/products/cesta-pascoa.webp",
        tags: ["Mel", "Manteiga", "Presente", "Páscoa"],
        highlight: false,
      },
      {
        id: "p-borboleta",
        name: "Borboleta da Primavera",
        description: "Biscoito de manteiga em formato de borboleta com asas pintadas em glacê aquarela.",
        price: 19.90,
        unit: "unidade",
        image: "/products/borboleta.webp",
        tags: ["Manteiga", "Decorado"],
        highlight: false,
      },
      {
        id: "p-cenoura",
        name: "Cenoura de Mel",
        description: "Formato icônico de páscoa com massa de mel levemente especiada e detalhes em laranja.",
        price: 16.90,
        unit: "unidade",
        image: "/products/cenoura.webp",
        tags: ["Mel", "Páscoa"],
        highlight: false,
      },
      {
        id: "p-kit-familia",
        name: "Kit Família Páscoa",
        description: "O presente ideal: 12 biscoitos variados em caixa especial com cartão personalizado.",
        price: 149.90,
        unit: "kit c/ 12",
        image: "/products/kit-familia.webp",
        tags: ["Mel", "Manteiga", "Presente", "Páscoa"],
        highlight: true,
      },
    ],
  },
  {
    id: "classicos",
    title: "Clássicos Delicias Haus",
    subtitle: "Nossa assinatura de sempre: mel e manteiga em harmonia perfeita para qualquer ocasião.",
    badge: "✦ Linha Permanente",
    isActive: false,
    color: "#8B5E3C",
    products: [
      {
        id: "c-coracao-mel",
        name: "Coração de Mel",
        description: "O clássico que nunca sai de moda. Massa de mel pura com glacê branco.",
        price: 14.90,
        unit: "unidade",
        image: "/products/coracao-mel.webp",
        tags: ["Mel", "Clássico"],
        highlight: true,
      },
      {
        id: "c-estrela-manteiga",
        name: "Estrela de Manteiga",
        description: "Crocante por fora, derrete por dentro. Decoração minimalista em dourado.",
        price: 16.90,
        unit: "unidade",
        image: "/products/estrela-manteiga.webp",
        tags: ["Manteiga", "Clássico"],
        highlight: false,
      },
    ],
  },
];

export const getActiveCollection = (): Collection =>
  COLLECTIONS.find((c) => c.isActive) ?? COLLECTIONS[0];

export const getAllCollections = (): Collection[] => COLLECTIONS;
