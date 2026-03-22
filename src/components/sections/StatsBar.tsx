"use client";
// src/components/sections/StatsBar.tsx
// Responsabilidade: Barra de números de impacto com animação de entrada no scroll

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/constants/site-config";

export function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-16 border-y border-brand-gold/8">
      {/* Background glow line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="font-display text-4xl md:text-5xl font-semibold text-brand-gold">
                {stat.value}
              </span>
              <span className="text-sm text-foreground-muted">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
