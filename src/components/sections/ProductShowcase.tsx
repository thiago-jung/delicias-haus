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
import Image from "next/image";
import { ProductCard } from "@/components/shared/ProductCard";
export function ProductShowcase() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const collection = getActiveCollection();

    // Filtra apenas produtos em destaque (max 3) para a home
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
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
                    {featured.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 32 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <ProductCard product={product} index={i} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}