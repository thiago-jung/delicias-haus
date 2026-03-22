"use client";
// src/components/sections/Hero.tsx
// Responsabilidade: Seção hero principal com animação de entrada, badge sazonal e CTAs duplos

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getActiveCollection } from "@/constants/catalog";
import { SITE_CONFIG } from "@/constants/site-config";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const floatingDecor = [
    //{ src: "/products/spritz_ind1.png", size: 120, top: "15%", left: "8%", delay: 0, duration: 5 },
    { src: "/products/ovo_ind1.png", size: 100, top: "25%", right: "10%", delay: 0.5, duration: 6 },
    { src: "/products/pata_ind1.png", size: 60, top: "65%", left: "5%", delay: 1, duration: 7 },
    { src: "/products/cenoura_ind1.png", size: 50, top: "70%", right: "8%", delay: 0.3, duration: 5.5 },
    { src: "/products/coelho_ind6.png", size: 60, top: "15%", left: "8%", delay: 0.7, duration: 4 },
];

export function Hero() {
  const activeCollection = getActiveCollection();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-brand-gold/5 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-brand-caramel/5 blur-[80px]" />
      </div>

    {/* Floating decorative Images */}
    {floatingDecor.map((item, i) => (
        <motion.div
            key={i}
            className="absolute select-none pointer-events-none hidden lg:block"
            style={{
                top: item.top,
                left: "left" in item ? item.left : undefined,
                right: "right" in item ? item.right : undefined,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: [0, 0.8, 0.8], // Um pouco mais opaco que os emojis
                scale: 1,
                y: [0, -20, 0], // Movimento um pouco mais amplo para fotos
                rotate: [0, 10, -10, 0], // Adicionada uma leve rotação orgânica
            }}
            transition={{
                opacity: { delay: item.delay + 1, duration: 0.8 },
                scale: { delay: item.delay + 1, duration: 0.8 },
                y: {
                    delay: item.delay + 1.5,
                    duration: item.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
                rotate: {
                    delay: item.delay + 1.5,
                    duration: item.duration * 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }
            }}
            >
            <Image
                src={item.src}
                alt="Decoração biscoito"
                width={item.size}
                height={item.size}
                className="drop-shadow-2xl" // Adiciona profundidade às fotos transparentes
            />
        </motion.div>
    ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Seasonal Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-8 flex justify-center"
        >
          <Badge variant="gold" className="gap-2 px-4 py-1.5 text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {activeCollection.badge}
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-display text-6xl sm:text-7xl md:text-8xl font-semibold leading-[1.05] tracking-tight text-balance"
        >
          Feito com mel,{" "}
          <br className="hidden sm:block" />
          <span className="gradient-text">decorado com alma</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={0.2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-lg text-foreground-muted leading-relaxed"
        >
          Biscoitos artesanais de mel e manteiga, decorados à mão para tornar cada
          momento especial. Encomendas para todas as ocasiões.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/produtos">
            <Button size="lg" className="w-full sm:w-auto">
              Ver Catálogo de Páscoa
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a
            href={SITE_CONFIG.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Fazer Encomenda
            </Button>
          </a>
        </motion.div>

        {/* Social proof micro */}
        <motion.p
          custom={0.45}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-8 text-xs text-foreground-muted/50 tracking-wide"
        >
          Mais de 500 clientes satisfeitos · 100% artesanal · Sem corantes artificiais
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
