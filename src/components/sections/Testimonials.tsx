"use client";
// src/components/sections/Testimonials.tsx
// Responsabilidade: Grid de depoimentos de clientes com avatar e avaliação

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Thiago J.",
    role: "Consumidor regular",
    content:
      "O Spritzgebäck é o melhor, recomendo de olhos fechados!",
    rating: 5,
    avatar: "TJ",
  },
  {
    id: "t2",
    name: "Rodrigo S.",
    role: "Comprou para o aniversário da esposa",
    content:
      "Encomendei um kit personalizado e superou todas as expectativas. O cuidado com a embalagem é único — parece presente de confeitaria importada. Vou sempre voltar.",
    rating: 5,
    avatar: "R",
  },
  {
    id: "t3",
    name: "Fernanda L.",
    role: "Fez encomenda corporativa",
    content:
      "Usamos para lembrancinhas do evento da empresa. Todos os 60 clientes comentaram. Qualidade consistente, entrega no prazo e atendimento excelente. Recomendo demais.",
    rating: 5,
    avatar: "F",
  },
];

const avatarColors = [
  "from-brand-gold/30 to-brand-caramel/30",
  "from-brand-caramel/30 to-brand-gold/20",
  "from-brand-gold/20 to-brand-caramel/40",
];

export function Testimonials() {
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
          className="mb-12 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-brand-gold">
            Depoimentos
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold">
            O que dizem nossos clientes
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card
                variant="bordered"
                className="flex flex-col h-full p-6 gap-5 hover:border-brand-gold/25 transition-all duration-300"
              >
                {/* Quote icon */}
                <Quote className="h-6 w-6 text-brand-gold/30" />

                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                {/* Content */}
                <p className="flex-1 text-sm text-foreground-muted leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                  <div
                    className={`h-9 w-9 rounded-full bg-gradient-to-br ${avatarColors[i]} border border-brand-gold/20 flex items-center justify-center shrink-0`}
                  >
                    <span className="text-sm font-semibold text-brand-gold">
                      {t.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-foreground-muted">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
