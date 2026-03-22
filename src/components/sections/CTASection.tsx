"use client";
// src/components/sections/CTASection.tsx
// Responsabilidade: Seção de fechamento com CTA de encomenda

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/constants/site-config";
import Link from "next/link";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-brand-gold/20 bg-surface-2 p-12 md:p-16 text-center"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-brand-gold/5 blur-[80px] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <p className="mb-4 text-sm uppercase tracking-widest text-brand-gold">
              Pronto para encomendar?
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              Cada ocasião merece um{" "}
              <span className="gradient-text">biscoito especial</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-foreground-muted">
              Entre em contato pelo WhatsApp e vamos criar juntos o presente perfeito.
              Atendemos pedidos personalizados para qualquer ocasião.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={SITE_CONFIG.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="xl" className="w-full sm:w-auto gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Encomendar no WhatsApp
                </Button>
              </a>
              <Link href="/contato">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  Enviar mensagem
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
