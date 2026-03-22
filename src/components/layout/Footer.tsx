// src/components/layout/Footer.tsx
// Responsabilidade: Rodapé com links, redes sociais e copyright

import Link from "next/link";
import { Instagram, MessageCircle, Mail, Heart } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/constants/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-border-subtle bg-background">
      {/* Subtle glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-64 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center">
                <span className="text-brand-gold text-xs font-bold">D</span>
              </div>
              <span className="font-display text-lg font-semibold">
                Delicias <span className="text-brand-gold">Haus</span>
              </span>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed max-w-xs">
              Biscoitos de mel e manteiga feitos com carinho. Cada peça decorada à mão, cada entrega com afeto.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full border border-border-subtle flex items-center justify-center text-foreground-muted hover:text-brand-gold hover:border-brand-gold/30 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full border border-border-subtle flex items-center justify-center text-foreground-muted hover:text-brand-gold hover:border-brand-gold/30 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="h-9 w-9 rounded-full border border-border-subtle flex items-center justify-center text-foreground-muted hover:text-brand-gold hover:border-brand-gold/30 transition-all"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
              Navegação
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-foreground-muted">
              <li>
                <a
                  href={SITE_CONFIG.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition-colors"
                >
                  WhatsApp: (51) 99999-9999
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-brand-gold transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="text-foreground-muted/60 text-xs leading-relaxed">
                Atendimento: Seg–Sáb, 9h–18h<br />
                Encomendas com 7 dias de antecedência
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground-muted/60">
            © {year} Delicias Haus. Todos os direitos reservados.
          </p>
          <p className="text-xs text-foreground-muted/40 flex items-center gap-1">
            Feito com <Heart className="h-3 w-3 text-brand-gold/60" /> e muito mel
          </p>
        </div>
      </div>
    </footer>
  );
}
