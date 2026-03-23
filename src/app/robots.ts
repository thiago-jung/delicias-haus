// src/app/robots.ts
// Responsabilidade: Gera robots.txt automaticamente via Next.js
// Servido em /robots.txt

import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site-config";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // Bloqueia rotas de API de indexação
                disallow: ["/api/"],
            },
        ],
        sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
        host: SITE_CONFIG.url,
    };
}