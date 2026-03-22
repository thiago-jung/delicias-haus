// src/components/ui/Card.tsx
// Responsabilidade: Primitivo de card com variantes de estilo

import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered";
  glow?: boolean;
}

export function Card({ className, variant = "default", glow, children, ...props }: CardProps) {
  const variants = {
    default: "bg-surface border border-border-subtle",
    glass: "glass",
    bordered: "bg-surface border border-brand-gold/15",
  };

  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        variants[variant],
        glow && "hover:shadow-gold hover:border-brand-gold/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
