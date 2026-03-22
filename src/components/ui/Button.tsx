// src/components/ui/Button.tsx
// Responsabilidade: Primitivo de botão com variantes tipadas (CVA)

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-sans text-sm font-medium tracking-wide",
    "rounded-full transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.97]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-brand-gold text-background",
          "hover:bg-brand-gold-light",
          "shadow-gold-sm hover:shadow-gold",
        ],
        secondary: [
          "border border-brand-gold/20 bg-brand-gold/5 text-foreground",
          "hover:border-brand-gold/40 hover:bg-brand-gold/10",
          "backdrop-blur-sm",
        ],
        ghost: [
          "text-foreground-muted hover:text-foreground hover:bg-white/5",
        ],
        outline: [
          "border border-border-subtle text-foreground-muted",
          "hover:border-brand-gold/30 hover:text-foreground",
        ],
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Aguarde...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
