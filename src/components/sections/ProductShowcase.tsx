"use client";
// src/components/sections/ProductShowcase.tsx
// Responsabilidade: Vitrine dos produtos da coleção ativa, com grid responsivo e destaque visual

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getActiveCollection } from "@/constants/catalog";
import { formatPrice } from "@/lib/utils";
import { SITE_CONFIG } from "@/constants/site-config";
import Link from "next/link";

export function ProductShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const collection = getActiveCollection();

  // Show only highlighted products (max 3) on home page
  const featured = collection.products.filter((p) => p.highlight).slice(0, 3);

  return (
    <section ref={ref} className="py-24 px-6 bg-surface/40">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 flex items-start justify-between gap-6 flex-wrap"
        >
          <div>
            <Badge variant="gold" className="mb-3">
              {collection.badge}
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              {collection.title}
            </h2>
            <p className="mt-3 max-w-lg text-foreground-muted">
              {collection.subtitle}
            </p>
          </div>
          <Link href="/produtos" className="shrink-0 self-end">
            <Button variant="secondary">Ver catálogo completo</Button>
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Card
                variant="bordered"
                glow
                className="group overflow-hidden flex flex-col h-full"
              >
                {/* Product image area */}
                <div className="relative aspect-square bg-surface-2 overflow-hidden">
                  {/* Placeholder with emoji visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl select-none animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                      {i === 0 ? "🐰" : i === 1 ? "🥚" : "🎁"}
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Tags */}
                  <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-background/70 backdrop-blur-sm border border-border-subtle px-2.5 py-0.5 text-xs text-foreground-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-foreground group-hover:text-brand-gold transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <Star className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                        <span className="text-xs text-foreground-muted">5.0</span>
                      </div>
                    </div>
                    <p className="mt-1.5 text-sm text-foreground-muted leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                    <div>
                      <p className="text-xl font-semibold text-brand-gold">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-xs text-foreground-muted">{product.unit}</p>
                    </div>
                    <a
                      href={SITE_CONFIG.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" className="gap-1.5">
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Pedir
                      </Button>
                    </a>
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
