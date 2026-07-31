import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(160),
  company: z.string().trim().max(200).optional().default(""),
  email: z.string().trim().max(320).pipe(z.email()).transform((value) => value.toLowerCase()),
  message: z.string().trim().max(5000).optional().default(""),
  website: z.string().max(500).optional().default(""),
});

function json(errorOrData: Record<string, unknown>, status = 200) {
  return Response.json(errorOrData, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Please check the form and try again." }, 400);
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: "Please check the highlighted fields and try again.", fields: z.treeifyError(parsed.error) }, 400);
  }
  if (parsed.data.website) {
    return json({ error: "We could not submit this inquiry." }, 400);
  }

  const { name, company, email, message } = parsed.data;
  const to = process.env.INQUIRY_TO ?? "hallo@remobiletech.com";
  const from = process.env.INQUIRY_FROM ?? "website@remobiletech.com";
  const emailPayload = {
    from,
    to: [to],
    reply_to: email,
    subject: `Wholesale inquiry — ${company || name}`,
    text: [
      `Full name: ${name}`,
      `Company: ${company || "(not provided)"}`,
      `Business email: ${email}`,
      "",
      message || "(no message)",
    ].join("\n"),
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[inquiry] RESEND_API_KEY is unset; development payload:", emailPayload);
      return json({ ok: true });
    }
    console.error("[inquiry] RESEND_API_KEY is not configured in production");
    return json({ error: "Email is temporarily unavailable. Please email hallo@remobiletech.com directly." }, 503);
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      console.error("[inquiry] Resend rejected the request:", response.status, await response.text());
      return json({ error: "We could not send your inquiry. Please try again or email hallo@remobiletech.com." }, 502);
    }
    return json({ ok: true });
  } catch (error) {
    console.error("[inquiry] Resend request failed:", error);
    return json({ error: "We could not send your inquiry. Please try again or email hallo@remobiletech.com." }, 502);
  }
}
