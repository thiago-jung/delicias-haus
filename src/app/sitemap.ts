// src/app/sitemap.ts
// Responsabilidade: Gera sitemap.xml dinâmico para SEO
// Next.js serve automaticamente em /sitemap.xml

import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site-config";
import { getAllCollections } from "@/constants/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  // Páginas estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/produtos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Páginas individuais de produto
  const collections = getAllCollections();
  const productRoutes: MetadataRoute.Sitemap = collections.flatMap((collection) =>
    collection.products.map((product) => ({
      url: `${baseUrl}/produtos/${product.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...productRoutes];
}