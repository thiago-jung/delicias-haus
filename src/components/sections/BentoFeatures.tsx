"use client";
// src/components/sections/BentoFeatures.tsx
// Responsabilidade: Grid assimétrico de diferenciais com hover states iluminados

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Paintbrush, Wheat, Package, Clock, Heart, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Paintbrush,
    title: "Decoração à mão",
    description:
      "Cada biscoito é pintado individualmente com glacê real. Nenhuma peça é igual à outra.",
    span: "md:col-span-2",
    highlight: true,
  },
  {
    icon: Wheat,
    title: "Ingredientes selecionados",
    description:
      "Mel puro, manteiga de qualidade e farinha selecionada. Zero conservantes ou corantes artificiais.",
    span: "md:col-span-1",
    highlight: false,
  },
  {
    icon: Leaf,
    title: "Sem artificiais",
    description: "Corantes naturais em todas as decorações. Seguro para toda a família.",
    span: "md:col-span-1",
    highlight: false,
  },
  {
    icon: Package,
    title: "Embalagem presenteável",
    description:
      "Caixas kraft artesanais com laço e cartão personalizado. Pronto para presentear.",
    span: "md:col-span-1",
    highlight: false,
  },
  {
    icon: Clock,
    title: "Encomenda com antecedência",
    description:
      "Planeje com 7 dias de antecedência e receba no prazo combinado. Entrega ou retirada.",
    span: "md:col-span-2",
    highlight: true,
  },
  {
    icon: Heart,
    title: "Feito com afeto",
    description:
      "Cada encomenda é tratada com cuidado especial. Você sente a diferença em cada mordida.",
    span: "md:col-span-1",
    highlight: false,
  },
];

export function BentoFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-xl"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-brand-gold">
            Por que Delicias Haus
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight">
            O que torna cada biscoito{" "}
            <span className="gradient-text">especial</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.08,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(feature.span)}
              >
                <div
                  className={cn(
                    "group h-full rounded-2xl p-6 border transition-all duration-300 cursor-default",
                    feature.highlight
                      ? "bg-surface-2 border-brand-gold/20 hover:border-brand-gold/40 hover:shadow-gold"
                      : "bg-surface border-border-subtle hover:border-brand-gold/20 hover:shadow-gold-sm"
                  )}
                >
                  <div
                    className={cn(
                      "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300",
                      feature.highlight
                        ? "bg-brand-gold/15 border-brand-gold/30 text-brand-gold group-hover:bg-brand-gold/25"
                        : "bg-white/5 border-border-subtle text-foreground-muted group-hover:text-brand-gold group-hover:border-brand-gold/20"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2 group-hover:text-brand-gold transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
