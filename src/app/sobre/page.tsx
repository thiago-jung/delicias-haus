// src/app/sobre/page.tsx
// Responsabilidade: Página Manifesto — história e valores da Delicias Haus

import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a história por trás dos biscoitos artesanais Delicias Haus.",
};

const VALORES = [
  {
    title: "Artesanal de verdade",
    description:
      "Cada biscoito é feito à mão, do início ao fim. Nenhuma linha de produção, nenhum atalho.",
  },
  {
    title: "Ingredientes que respeitamos",
    description:
      "Mel puro, manteiga de qualidade, sem conservantes. Servimos o que serviríamos à nossa própria família.",
  },
  {
    title: "Decoração como arte",
    description:
      "O glacê real é nossa tela. Cada traço é intencional. Cada cor, escolhida com cuidado.",
  },
  {
    title: "Afeto embutido",
    description:
      "Quando alguém abre uma caixa Delicias Haus, queremos que sinta que alguém pensou nela.",
  },
];

export default function SobrePage() {
  return (
    <>
      {/* Hero Manifesto */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-gold/4 blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-gold mb-4">
            Manifesto
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold leading-tight">
            Delicias Haus
          </h1>
          <p className="mt-2 font-display text-3xl md:text-4xl text-foreground-muted font-normal">
            Uma história de mel, paciência e afeto.
          </p>

          <div className="mt-10 space-y-6 text-foreground-muted leading-relaxed text-lg">
            <p>
              A Delicias Haus nasceu de uma tradição familiar. As primeiras receitas
              foram testadas em uma cozinha pequena, com muito tempo e pouco pressa.
              O mel era local, a manteiga era boa, e o resultado era inevitável: biscoitos
              que faziam as pessoas pararem.
            </p>
            <p>
              Com o tempo, a decoração passou a ser parte igual da experiência. Um biscoito
              bem feito merece ser lindo também. Aprendemos que o ato de presentear começa
              antes da primeira mordida — começa na embalagem, no cheiro, no detalhe que
              alguém notou.
            </p>
            <p>
              Hoje fazemos encomendas para aniversários, casamentos, datas comemorativas
              e simplesmente porque alguém merece. Cada pedido é tratado como único —
              porque é.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 px-6 border-y border-border-subtle">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-gold mb-8 text-center">
            O que acreditamos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {VALORES.map((valor) => (
              <div key={valor.title} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-6 rounded-full bg-brand-gold" />
                  <h3 className="font-medium text-foreground">{valor.title}</h3>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed pl-9">
                  {valor.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-gold mb-4">
            Nosso processo
          </p>
          <h2 className="font-display text-4xl font-semibold mb-10">
            Do forno à sua mão
          </h2>

          <div className="space-y-0">
            {[
              {
                step: "01",
                title: "Receita e ingredientes",
                desc: "Selecionamos mel puro e manteiga de qualidade. A massa descansa o tempo necessário — nunca apressamos esse processo.",
              },
              {
                step: "02",
                title: "Corte e assagem",
                desc: "Cada formato é cortado à mão ou com cortadores próprios. O forno é monitorado para que a textura seja sempre perfeita.",
              },
              {
                step: "03",
                title: "Decoração com glacê real",
                desc: "A parte mais trabalhosa e mais bonita. O glacê é preparado na hora, as cores são misturadas com corantes naturais.",
              },
              {
                step: "04",
                title: "Embalagem e entrega",
                desc: "Cada peça seca e é embalada com cuidado. A entrega ou retirada é combinada pessoalmente.",
              },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-brand-gold">{item.step}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px flex-1 bg-border-subtle my-2" />
                  )}
                </div>
                <div className={`pb-10 ${i === arr.length - 1 ? "" : ""}`}>
                  <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
