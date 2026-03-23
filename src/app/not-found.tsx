// src/app/not-found.tsx
// Responsabilidade: Página 404 com identidade visual da marca

import Link from "next/link";
import { Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand-gold/4 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[200px] w-[200px] rounded-full bg-brand-caramel/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-xl">
        {/* Large 404 */}
        <p className="font-display text-[clamp(100px,20vw,180px)] font-semibold leading-none gradient-text select-none">
          404
        </p>

        {/* Divider */}
        <div className="mx-auto mt-2 mb-8 h-px w-32 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
          Página não encontrada
        </h1>

        <p className="mt-4 text-foreground-muted leading-relaxed max-w-sm mx-auto">
          Essa página não existe ou foi movida. Que tal explorar nossas coleções de biscoitos artesanais?
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="h-4 w-4" />
              Voltar ao início
            </Button>
          </Link>
          <Link href="/produtos">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <ShoppingBag className="h-4 w-4" />
              Ver catálogo
            </Button>
          </Link>
        </div>

        {/* Subtle brand hint */}
        <p className="mt-12 text-xs text-foreground-muted/40 tracking-widest uppercase">
          Delicias Haus · Biscoitos Artesanais
        </p>
      </div>
    </section>
  );
}