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
        id: "coelho-mel",
        name: "Coelho Sentado",
        description: "Biscoito de mel artesanal decorado à mão com glacê real de múltiplas camadas.",
        price: 4.50,
        unit: "unidade",
        image: "/products/coelho_ind10.png",
        tags: ["Mel", "Decorado", "Páscoa"],
        highlight: true,
      },
      {
        id: "saquinho-manteiga",
        name: "Saquinho com 5 Biscoitos de Mel Decorados",
        description: "Biscoitos artesanais, crocantes e feitos com muito carinho para deixar a Páscoa ainda mais doce!",
        price: 15.00,
        unit: "kit c/ 5",
        image: "/products/saco5.png",
          tags: ["Mel", "Páscoa"],
        highlight: true,
      },
      {
        id: "bundinha-coelho",
        name: "Bundinha do Coelho",
        description: "Biscoito individual clássico de toda Páscoa.",
        price: 6.00,
        unit: "cesta",
        image: "/products/coelho_ind9.png",
        tags: ["Mel", "Páscoa"],
        highlight: false,
      },
      {
        id: "abanando",
        name: "Coelhinho Abanando",
        description: "Delicioso e fofinho, perfeito para adoçar o seu dia.",
        price: 4.50,
        unit: "unidade",
        image: "/products/coelho_ind11.png",
        tags: ["Mel", "Decorado"],
          highlight: false,
      },
      {
        id: "coelho-fofo",
        name: "Coelho Fofo",
        description: "Formato icônico de páscoa com massa de mel e glacê real.",
        price: 6.00,
        unit: "unidade",
        image: "/products/coelho_ind12.png",
        tags: ["Mel", "Páscoa"],
        highlight: false,
      },
      {
        id: "cenoura",
        name: "Cenoura",
        description: "A clássica cenoura do coelhinho de páscoa que não pode faltar.",
        price: 6.00,
        unit: "unidade",
        image: "/products/cenoura_ind1.png",
        tags: ["Mel", "Páscoa"],
        highlight: false,
        },
        {
            id: "spekulatius",
            name: "Spekulatius",
            description: "Biscoito típico alemão, crocante e fininho feito de especiarias.",
            price: 7.00,
            unit: "kit 50g",
            image: "/products/spek1.jpg",
            tags: ["Manteiga", "Páscoa"],
            highlight: true,
        },
        {
            id: "spritzgeback",
            name: "Spritzgebäck",
            description: "Biscoito típico alemão, ponta coberta de chocolate.",
            price: 16.00,
            unit: "kit 100g",
            image: "/products/spritz1.jpg",
            tags: ["Manteiga", "Páscoa"],
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
              id: "spekulatius",
              name: "Spekulatius",
              description: "Biscoito típico alemão, crocante e fininho feito de especiarias.",
              price: 7.00,
              unit: "kit 50g",
              image: "/products/spek1.jpg",
              tags: ["Manteiga", "Clássico"],
              highlight: true,
          },
          {
              id: "spritzgeback",
              name: "Spritzgebäck",
              description: "Biscoito típico alemão, ponta coberta de chocolate.",
              price: 16.00,
              unit: "kit 100g",
              image: "/products/spritz1.jpg",
              tags: ["Manteiga", "Clássico"],
              highlight: true,
          },
    ],
  },
];

export const getActiveCollection = (): Collection =>
  COLLECTIONS.find((c) => c.isActive) ?? COLLECTIONS[0];

export const getAllCollections = (): Collection[] => COLLECTIONS;
