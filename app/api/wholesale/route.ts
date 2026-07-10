import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, company, email, message } = body as {
    name?: string;
    company?: string;
    email?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[wholesale] RESEND_API_KEY not configured');
    return NextResponse.json({ error: 'Email service unavailable' }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  const lines = [
    `Name: ${name.trim()}`,
    company?.trim() ? `Company: ${company.trim()}` : null,
    `Email: ${email.trim()}`,
    '',
    message?.trim() || '(no message)',
  ].filter((l): l is string => l !== null);

  try {
    await resend.emails.send({
      // Swap to a verified @remobiletech.com address once domain is confirmed in Resend
      from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
      to: 'wholesale@remobiletech.com',
      replyTo: email.trim(),
      subject: `Wholesale inquiry — ${company?.trim() || name.trim()}`,
      text: lines.join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[wholesale] Resend error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
