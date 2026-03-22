// src/components/ui/Badge.tsx
// Responsabilidade: Componente de badge/tag para categorias e destaques

import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "subtle" | "outline";
}

export function Badge({ className, variant = "subtle", children, ...props }: BadgeProps) {
  const variants = {
    gold: "bg-brand-gold/15 text-brand-gold border border-brand-gold/30",
    subtle: "bg-white/5 text-foreground-muted border border-border-subtle",
    outline: "border border-brand-gold/40 text-brand-gold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
