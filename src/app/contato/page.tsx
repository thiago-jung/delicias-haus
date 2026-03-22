"use client";
// src/app/contato/page.tsx
// Responsabilidade: Formulário de contato com validação Zod e feedback toast

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, MessageCircle, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SITE_CONFIG } from "@/constants/site-config";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  occasion: z.string().optional(),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const OCCASIONS = [
  "Aniversário",
  "Casamento",
  "Páscoa",
  "Natal",
  "Dia das Mães",
  "Corporativo",
  "Outro",
];

export default function ContatoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // DECISÃO: Simula envio (integrar com Resend, Nodemailer ou Formspree)
    // ALTERNATIVA: POST para /api/contact com fetch
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    toast.success("Mensagem enviada!", {
      description: "Entraremos em contato em breve. Obrigada! 🍪",
    });
    reset();
  };

  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-12 px-6">
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-brand-gold/4 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-brand-gold mb-3">
              Fale conosco
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-semibold">
              Vamos criar algo{" "}
              <span className="gradient-text">especial</span>
            </h1>
            <p className="mt-3 text-foreground-muted max-w-lg">
              Tem uma data especial chegando? Conta para a gente — vamos ajudar
              a tornar o momento ainda mais memorável.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-brand-gold/15 bg-surface-2 p-6 md:p-8">
                <h2 className="font-medium text-lg text-foreground mb-6">
                  Envie uma mensagem
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Nome *"
                      id="name"
                      placeholder="Seu nome"
                      error={errors.name?.message}
                      {...register("name")}
                    />
                    <Input
                      label="Email *"
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="WhatsApp"
                      id="phone"
                      placeholder="(51) 99999-9999"
                      {...register("phone")}
                    />

                    <div className="w-full space-y-1.5">
                      <label
                        htmlFor="occasion"
                        className="block text-sm font-medium text-foreground-muted"
                      >
                        Ocasião
                      </label>
                      <select
                        id="occasion"
                        className="w-full rounded-xl bg-surface border border-border-subtle px-4 py-3 text-sm text-foreground focus:outline-none focus:border-brand-gold/40 focus:ring-2 focus:ring-brand-gold/10 transition-all"
                        {...register("occasion")}
                      >
                        <option value="">Selecione...</option>
                        {OCCASIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="w-full space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground-muted"
                    >
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Me conta um pouco sobre o que você precisa: quantidade, data da entrega, tema..."
                      className="w-full rounded-xl bg-surface border border-border-subtle px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted/50 resize-none focus:outline-none focus:border-brand-gold/40 focus:ring-2 focus:ring-brand-gold/10 transition-all"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full"
                  >
                    <Send className="h-4 w-4" />
                    Enviar mensagem
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar info */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact methods */}
              <div className="rounded-2xl border border-border-subtle bg-surface p-6 space-y-5">
                <h3 className="font-medium text-foreground">Formas de contato</h3>

                <a
                  href={SITE_CONFIG.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-all">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-brand-gold transition-colors">WhatsApp</p>
                    <p className="text-xs text-foreground-muted">Resposta mais rápida</p>
                  </div>
                </a>

                <a
                  href={SITE_CONFIG.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="h-10 w-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:bg-pink-500/20 transition-all">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-brand-gold transition-colors">Instagram</p>
                    <p className="text-xs text-foreground-muted">{SITE_CONFIG.social.instagram}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="h-10 w-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold/20 transition-all">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-brand-gold transition-colors">Email</p>
                    <p className="text-xs text-foreground-muted">{SITE_CONFIG.contact.email}</p>
                  </div>
                </a>
              </div>

              {/* Info box */}
              <div className="rounded-2xl border border-brand-gold/15 bg-surface-2 p-6 space-y-4">
                <h3 className="font-medium text-foreground">Informações de encomenda</h3>
                <ul className="space-y-3 text-sm text-foreground-muted">
                  {[
                    "Encomendas com 7 dias de antecedência",
                    "Retirada ou entrega combinada",
                    "Pagamento via Pix ou cartão",
                    "Personalização disponível",
                    "Atendimento: Seg–Sáb, 9h–18h",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
