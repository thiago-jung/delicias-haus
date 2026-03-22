"use client";
// src/components/shared/ProductCard.tsx

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/constants/site-config";

interface ProductCardProps {
  product: Product;
  index?: number;
  priority?: boolean;
}

export function ProductCard({ product, index = 0, priority = false }: ProductCardProps) {
  return (
    <Card
      variant="bordered"
      glow
      className={cn(
        "group overflow-hidden flex flex-col h-full",
        product.highlight && "ring-1 ring-brand-gold/20"
      )}
    >
      {product.highlight && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="gold" className="text-xs">Destaque</Badge>
        </div>
      )}

      {/* Área da Imagem */}
      <div className="relative aspect-square bg-surface-2 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes={SITE_CONFIG.imageSizes.hero}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
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

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-foreground group-hover:text-brand-gold transition-colors">
              {product.name}
            </h3>
            {/*<div className="flex items-center gap-0.5 shrink-0">*/}
            {/*  <Star className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />*/}
            {/*  <span className="text-xs text-foreground-muted">5.0</span>*/}
            {/*</div>*/}
          </div>
          <p className="mt-1.5 text-sm text-foreground-muted leading-relaxed line-clamp-2">
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
  );
}