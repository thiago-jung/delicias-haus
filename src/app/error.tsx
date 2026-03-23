"use client";
// src/app/error.tsx
// Responsabilidade: Error boundary global — captura erros de runtime em toda a árvore de rotas
// DEVE ser "use client" — requisito do Next.js para error boundaries

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/constants/site-config";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Em produção, enviar para serviço de monitoramento (ex: Sentry)
        console.error("[GlobalError]", error);
    }, [error]);

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-red-500/3 blur-[120px] pointer-events-none" />

            <div className="relative z-10 text-center max-w-lg">
                {/* Icon */}
                <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/15">
                    <span className="text-2xl select-none">⚠️</span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                    Algo deu errado
                </h1>

                <p className="mt-4 text-foreground-muted leading-relaxed max-w-sm mx-auto">
                    Ocorreu um erro inesperado. Você pode tentar novamente ou nos chamar pelo WhatsApp.
                </p>

                {/* Digest para debug (só mostra se existir) */}
                {error.digest && (
                    <p className="mt-3 text-xs text-foreground-muted/40 font-mono">
                        ref: {error.digest}
                    </p>
                )}

                {/* CTAs */}
                <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg" onClick={reset} className="w-full sm:w-auto">
                        <RefreshCw className="h-4 w-4" />
                        Tentar novamente
                    </Button>
                    <Link href="/">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                            <Home className="h-4 w-4" />
                            Voltar ao início
                        </Button>
                    </Link>
                </div>

                {/* WhatsApp fallback */}
                <div className="mt-8 pt-8 border-t border-border-subtle">
                    <p className="text-sm text-foreground-muted mb-3">
                        Prefere falar direto?
                    </p>
                    <a
                        href={SITE_CONFIG.contact.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4 text-green-400" />
                            Chamar no WhatsApp
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
}