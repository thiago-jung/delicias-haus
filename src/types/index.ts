// src/types/index.ts
// Responsabilidade: Tipos e interfaces globais da aplicação

export type { Product, Collection } from "@/constants/catalog";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  occasion?: string;
  message: string;
}

export interface NavLink {
  label: string;
  href: string;
}
