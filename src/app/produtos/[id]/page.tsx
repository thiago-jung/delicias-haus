// src/app/produtos/[id]/page.tsx
// Responsabilidade: Página individual de produto com SEO, JSON-LD e CTA de encomenda

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, MessageCircle, Tag, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getAllCollections } from "@/constants/catalog";
import { SITE_CONFIG } from "@/constants/site-config";
import { formatPrice } from "@/lib/utils";
import { CTASection } from "@/components/sections/CTASection";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function findProduct(id: string) {
    const collections = getAllCollections();
    for (const collection of collections) {
        const product = collection.products.find((p) => p.id === id);
        if (product) return { product, collection };
    }
    return null;
}

// ─── Static Params (geração estática de todas as páginas de produto) ──────────

export async function generateStaticParams() {
    const collections = getAllCollections();
    return collections.flatMap((collection) =>
        collection.products.map((product) => ({ id: product.id }))
    );
}

// ─── Metadata dinâmica ────────────────────────────────────────────────────────

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const result = findProduct(id);

    if (!result) {
        return { title: "Produto não encontrado" };
    }

    const { product } = result;

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: `${product.name} | ${SITE_CONFIG.name}`,
            description: product.description,
            url: `${SITE_CONFIG.url}/produtos/${product.id}`,
            siteName: SITE_CONFIG.name,
            locale: "pt_BR",
            type: "website",
            images: [
                {
                    url: `${SITE_CONFIG.url}${product.image}`,
                    width: 800,
                    height: 800,
                    alt: product.name,
                },
            ],
        },
        alternates: {
            canonical: `${SITE_CONFIG.url}/produtos/${product.id}`,
        },
    };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const result = findProduct(id);

    if (!result) notFound();

    const { product, collection } = result;

    // JSON-LD Product schema — aparece no Google Shopping e resultados enriquecidos
    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: `${SITE_CONFIG.url}${product.image}`,
        sku: product.id,
        brand: {
            "@type": "Brand",
            name: SITE_CONFIG.name,
        },
        offers: {
            "@type": "Offer",
            price: product.price.toFixed(2),
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: SITE_CONFIG.name,
            },
        },
    };

    // Mensagem pré-preenchida para o WhatsApp
    const whatsappMessage = encodeURIComponent(
        `Olá! Tenho interesse em encomendar: ${product.name} (${formatPrice(product.price)}/${product.unit}). Podem me ajudar?`
    );
    const whatsappUrl = `https://wa.me/5551992625835?text=${whatsappMessage}`;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />

            {/* Breadcrumb */}
            <section className="pt-24 pb-0 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <Link href="/produtos" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                            <ArrowLeft className="h-3.5 w-3.5" />
                            Catálogo
                        </Link>
                        <span className="text-border-subtle">/</span>
                        <span className="text-foreground">{product.name}</span>
                    </div>
                </div>
            </section>

            {/* Product Detail */}
            <section className="py-12 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        {/* Image */}
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-3xl bg-brand-gold/3 blur-2xl pointer-events-none" />
                            <div className="relative aspect-square rounded-2xl overflow-hidden border border-brand-gold/15 bg-surface-2">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />
                                {product.highlight && (
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="gold">Destaque da coleção</Badge>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-6 lg:pt-4">
                            {/* Collection badge */}
                            <Badge variant="subtle">{collection.badge}</Badge>

                            {/* Name */}
                            <div>
                                <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                                    {product.name}
                                </h1>
                                <p className="mt-4 text-foreground-muted leading-relaxed text-lg">
                                    {product.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="py-6 border-y border-border-subtle">
                                <div className="flex items-end gap-3">
                                    <span className="font-display text-4xl font-semibold text-brand-gold">
                                        {formatPrice(product.price)}
                                    </span>
                                    <span className="text-foreground-muted mb-1">/ {product.unit}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            {product.tags.length > 0 && (
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Tag className="h-4 w-4 text-foreground-muted/60" />
                                    {product.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-border-subtle px-3 py-1 text-xs text-foreground-muted"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Info list */}
                            <ul className="space-y-2">
                                {[
                                    "100% artesanal, feito à mão",
                                    "Decorado com glacê real",
                                    "Sem corantes artificiais",
                                    "Encomenda com 7 dias de antecedência",
                                ].map((info) => (
                                    <li key={info} className="flex items-center gap-2.5 text-sm text-foreground-muted">
                                        <CheckCircle className="h-4 w-4 text-brand-gold shrink-0" />
                                        {info}
                                    </li>
                                ))}
                            </ul>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1"
                                >
                                    <Button size="lg" className="w-full gap-2">
                                        <ShoppingBag className="h-4 w-4" />
                                        Encomendar este produto
                                    </Button>
                                </a>
                                <a
                                    href={SITE_CONFIG.contact.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="secondary" size="lg" className="gap-2 w-full sm:w-auto">
                                        <MessageCircle className="h-4 w-4" />
                                        Tirar dúvidas
                                    </Button>
                                </a>
                            </div>

                            {/* Back link */}
                            <Link
                                href="/produtos"
                                className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-brand-gold transition-colors"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                Ver todos os produtos
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection />
        </>
    );
}