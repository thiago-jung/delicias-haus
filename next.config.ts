// next.config.ts
// Responsabilidade: Configuração global do Next.js com security headers

import type { NextConfig } from "next";

const securityHeaders = [
    // Previne clickjacking — só permite ser renderizado no mesmo origin
    {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
    },
    // Previne MIME-type sniffing
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    // Controla quais dados de referência são enviados
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    // Habilita DNS prefetch para performance
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    // Desabilita acesso a câmera, microfone, geolocalização
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
    // Content Security Policy
    // NOTA: 'unsafe-inline' e 'unsafe-eval' são necessários para Next.js + Framer Motion
    // Em produção avançada, use nonces para eliminar 'unsafe-inline'
    {
        key: "Content-Security-Policy",
        value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com data:",
            "img-src 'self' data: blob: https:",
            "media-src 'none'",
            "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
            "frame-ancestors 'none'",
        ].join("; "),
    },
];

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                // Aplica em todas as rotas
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },

    // Configuração de imagens externas (adicione domínios conforme necessário)
    images: {
        remotePatterns: [
            // Exemplo para futura CDN:
            // { protocol: "https", hostname: "cdn.deliciashaus.com.br" },
        ],
    },
};

export default nextConfig;