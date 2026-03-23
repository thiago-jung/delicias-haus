// src/app/api/contact/route.ts
// Responsabilidade: Envio de email via Resend com rate limiting por IP

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { SITE_CONFIG } from "@/constants/site-config";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Rate Limiting ────────────────────────────────────────────────────────────
// Armazenamento em memória por instância serverless.
// NOTA: Em múltiplas instâncias paralelas (alta escala), cada instância tem seu
// próprio Map. Para rate limiting distribuído, use Vercel KV ou Upstash Redis.
// Para o volume atual da Delicias Haus, essa abordagem é suficiente.

interface RateLimitRecord {
    count: number;
    resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

const RATE_LIMIT_MAX = 3;          // máximo de envios por janela
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // janela de 1 hora

function getClientIp(req: NextRequest): string {
    // Vercel injeta o IP real via header x-forwarded-for
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const record = rateLimitStore.get(ip);

    // Janela expirada ou primeiro acesso — zera o contador
    if (!record || now > record.resetAt) {
        const newRecord: RateLimitRecord = {
            count: 1,
            resetAt: now + RATE_LIMIT_WINDOW_MS,
        };
        rateLimitStore.set(ip, newRecord);
        return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: newRecord.resetAt };
    }

    // Dentro da janela — verifica limite
    if (record.count >= RATE_LIMIT_MAX) {
        return { allowed: false, remaining: 0, resetAt: record.resetAt };
    }

    record.count++;
    return {
        allowed: true,
        remaining: RATE_LIMIT_MAX - record.count,
        resetAt: record.resetAt,
    };
}

// Limpa registros expirados periodicamente (evita vazamento de memória)
function pruneExpiredRecords() {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
        if (now > record.resetAt) rateLimitStore.delete(key);
    }
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    // Limpeza periódica (a cada request, mas é O(n) barato para volumes pequenos)
    pruneExpiredRecords();

    // Rate limit check
    const ip = getClientIp(req);
    const { allowed, remaining, resetAt } = checkRateLimit(ip);

    if (!allowed) {
        const retryAfterSec = Math.ceil((resetAt - Date.now()) / 1000);
        return NextResponse.json(
            { error: "Muitas tentativas. Tente novamente mais tarde ou use o WhatsApp." },
            {
                status: 429,
                headers: {
                    "Retry-After": String(retryAfterSec),
                    "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
                },
            }
        );
    }

    // Validação básica do body
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Body inválido" }, { status: 400 });
    }

    const { name, email, phone, occasion, message } = body as Record<string, string>;

    if (!name || !email || !message) {
        return NextResponse.json(
            { error: "Campos obrigatórios ausentes: nome, email e mensagem" },
            { status: 400 }
        );
    }

    // Sanitização mínima — remove tags HTML para evitar injection no email
    const sanitize = (str: string) => str?.replace(/<[^>]*>/g, "").trim() ?? "";

    try {
        const data = await resend.emails.send({
            from: `Delicias Haus <${process.env.SMTP_USER}>`,
            to: [SITE_CONFIG.contact.email],
            replyTo: sanitize(email),
            subject: `Nova Encomenda: ${sanitize(occasion) || "Contato Geral"} — ${sanitize(name)}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h1 style="color: #C9A84C; margin-bottom: 24px;">Novo contato do site</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Nome</td><td style="padding: 8px 0;">${sanitize(name)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td style="padding: 8px 0;">${sanitize(email)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">WhatsApp</td><td style="padding: 8px 0;">${sanitize(phone) || "Não informado"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Ocasião</td><td style="padding: 8px 0;">${sanitize(occasion) || "Não informada"}</td></tr>
          </table>
          <hr style="margin: 24px 0; border-color: #eee;" />
          <p style="font-weight: bold; margin-bottom: 8px;">Mensagem:</p>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-radius: 8px;">${sanitize(message)}</p>
          <hr style="margin: 24px 0; border-color: #eee;" />
          <p style="color: #999; font-size: 12px;">Enviado via formulário do site · IP: ${ip}</p>
        </div>
      `,
        });

        return NextResponse.json(data, {
            headers: {
                "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
                "X-RateLimit-Remaining": String(remaining),
            },
        });
    } catch (error) {
        console.error("[API /contact] Erro ao enviar email:", error);
        return NextResponse.json(
            { error: "Erro ao enviar e-mail. Tente pelo WhatsApp." },
            { status: 500 }
        );
    }
}