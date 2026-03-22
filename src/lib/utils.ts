// src/lib/utils.ts
// Responsabilidade: Utilitários de composição de classes e helpers

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// DECISÃO: tailwind-merge para evitar conflitos em classes dinâmicas do Framer Motion
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
