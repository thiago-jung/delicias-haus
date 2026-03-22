# 🍪 Delicias Haus

Site profissional para a **Delicias Haus** — biscoitos de mel e manteiga artesanais, decorados à mão.

## Stack

- **Next.js 14+** com App Router e TypeScript strict
- **Tailwind CSS v3** com paleta "Midnight Cacao"
- **Framer Motion** para animações
- **React Hook Form + Zod** para validações
- **Sonner** para toasts
- **Geist Sans** + **Playfair Display** + **Cormorant Garamond**

## Sistema de Catálogo Sazonal

Para adicionar uma nova coleção (ex: Natal), edite `src/constants/catalog.ts`:

```typescript
// Adicione um novo objeto em COLLECTIONS com isActive: true
// Defina isActive: false nas outras coleções
{
  id: "natal-2026",
  title: "Coleção de Natal 2026",
  badge: "🎄 Natal · Edição Limitada",
  isActive: true,
  products: [...]
}
```

## Início Rápido

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Configuração Principal

- `src/constants/site-config.ts` — nome, WhatsApp, Instagram, email
- `src/constants/catalog.ts` — produtos e coleções sazonais
- `tailwind.config.ts` — paleta de cores
