"use client";
// src/app/produtos/page.tsx
// Responsabilidade: Página de catálogo com todas as coleções e filtro por tags

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getAllCollections, getActiveCollection } from "@/constants/catalog";
import { formatPrice } from "@/lib/utils";
import { SITE_CONFIG } from "@/constants/site-config";
import { cn } from "@/lib/utils";
import { CTASection } from "@/components/sections/CTASection";
import Image from "next/image";
import { ProductCard } from "@/components/shared/ProductCard";
export default function ProdutosPage() {
    const collections = getAllCollections();
    const activeCollection = getActiveCollection();
    const [selectedCollection, setSelectedCollection] = useState(activeCollection.id);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const currentCollection = collections.find((c) => c.id === selectedCollection) ?? collections[0];

    // Coleta tags únicas da coleção atual
    const allTags = Array.from(
        new Set(currentCollection.products.flatMap((p) => p.tags))
    );

    const filteredProducts = selectedTag
        ? currentCollection.products.filter((p) => p.tags.includes(selectedTag))
        : currentCollection.products;

    return (
        <>
            {/* Page Header */}
            <section className="relative pt-32 pb-12 px-6 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-brand-gold/4 blur-[120px] pointer-events-none" />
                <div className="mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-xs font-medium uppercase tracking-widest text-brand-gold mb-3">
                            Catálogo
                        </p>
                        <h1 className="font-display text-5xl md:text-6xl font-semibold">
                            Nossas coleções
                        </h1>
                        <p className="mt-3 text-foreground-muted max-w-lg">
                            Biscoitos artesanais para todas as ocasiões. Encomende pelo WhatsApp.
                        </p>
                    </motion.div>

                    {/* Collection Tabs */}
                    <div className="mt-8 flex gap-2 flex-wrap">
                        {collections.map((col) => (
                            <button
                                key={col.id}
                                onClick={() => {
                                    setSelectedCollection(col.id);
                                    setSelectedTag(null);
                                }}
                                className={cn(
                                    "rounded-full px-4 py-2 text-sm font-medium border transition-all duration-200",
                                    selectedCollection === col.id
                                        ? "bg-brand-gold/15 border-brand-gold/40 text-brand-gold"
                                        : "border-border-subtle text-foreground-muted hover:border-brand-gold/20 hover:text-foreground"
                                )}
                            >
                                {col.isActive && (
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold mr-2 align-middle" />
                                )}
                                {col.title}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Collection Header */}
            <section className="px-6 pb-6">
                <div className="mx-auto max-w-6xl">
                    <div className="rounded-2xl border border-brand-gold/15 bg-surface-2 p-6 md:p-8">
                        <Badge variant="gold" className="mb-3">{currentCollection.badge}</Badge>
                        <h2 className="font-display text-2xl md:text-3xl font-semibold">
                            {currentCollection.title}
                        </h2>
                        <p className="mt-2 text-foreground-muted">{currentCollection.subtitle}</p>
                    </div>
                </div>
            </section>

            {/* Tag Filter */}
            <section className="px-6 pb-6">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1.5 text-xs text-foreground-muted">
                            <Filter className="h-3.5 w-3.5" /> Filtrar:
                        </span>
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={cn(
                                "rounded-full px-3 py-1 text-xs border transition-all",
                                !selectedTag
                                    ? "bg-brand-gold/15 border-brand-gold/30 text-brand-gold"
                                    : "border-border-subtle text-foreground-muted hover:border-brand-gold/20"
                            )}
                        >
                            Todos
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                className={cn(
                                    "rounded-full px-3 py-1 text-xs border transition-all",
                                    selectedTag === tag
                                        ? "bg-brand-gold/15 border-brand-gold/30 text-brand-gold"
                                        : "border-border-subtle text-foreground-muted hover:border-brand-gold/20"
                                )}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="px-6 pb-24">
                <div className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {filteredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <ProductCard product={product} index={i} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </>
    );
}