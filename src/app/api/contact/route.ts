// src/app/api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/constants/site-config';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, occasion, message } = body;

    const data = await resend.emails.send({
      from: `Delicias Haus <${process.env.SMTP_USER}>`,
      to: [SITE_CONFIG.contact.email],
      subject: `Nova Encomenda: ${occasion || 'Contato Geral'} - ${name}`,
      html: `
        <h1>Novo contato do site</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${phone || 'Não informado'}</p>
        <p><strong>Ocasião:</strong> ${occasion || 'Não informada'}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao enviar e-mail' }, { status: 500 });
  }
}