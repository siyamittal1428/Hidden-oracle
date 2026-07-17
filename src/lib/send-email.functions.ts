import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const payloadSchema = z.object({
  kind: z.enum(["booking", "contact"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).optional().default(""),
  whatsapp: z.string().trim().max(60).optional().default(""),
  country: z.string().trim().max(80).optional().default(""),
  service: z.string().trim().max(120).optional().default(""),
  date: z.string().trim().max(40).optional().default(""),
  time: z.string().trim().max(40).optional().default(""),
  sessionType: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().max(4000).optional().default(""),
});

export type EmailPayload = z.infer<typeof payloadSchema>;

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function buildHtml(kind: "booking" | "contact", data: EmailPayload) {
  const rows: Array<[string, string]> = [
    ["Full Name", data.name],
    ["Email", data.email],
    ["Phone Number", data.phone || "—"],
    ["WhatsApp", data.whatsapp || "—"],
    ["Country", data.country || "—"],
    ["Selected Service", data.service || "—"],
    ["Preferred Date", data.date || "—"],
    ["Preferred Time", data.time || "—"],
    ["Session Type", data.sessionType || "—"],
    ["Message / Query", data.message || "—"],
    ["Submitted At", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"],
  ];

  const rowsHtml = rows
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;font-size:13px;color:#6b5f3b;font-weight:600;width:180px;">${escapeHtml(k)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;font-size:14px;color:#222;white-space:pre-wrap;">${escapeHtml(v)}</td>
        </tr>`,
    )
    .join("");

  const heading = kind === "booking" ? "New Tarot Consultation Booking" : "New Contact Message";

  return `
  <!doctype html>
  <html>
    <body style="margin:0;padding:32px 12px;background:#f6f1e7;font-family:Georgia,'Cormorant Garamond',serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 6px 30px rgba(120,90,20,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#3a1f5d,#7a5a24);padding:28px 30px;color:#fff;">
            <div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#f4d9a0;">Hidden Oracle by Siya</div>
            <div style="font-size:24px;margin-top:6px;font-weight:600;">${heading}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:22px 30px 8px;color:#3a2c10;font-size:14px;">
            A new ${kind === "booking" ? "booking request" : "message"} arrived via the website.
          </td>
        </tr>
        <tr>
          <td style="padding:8px 20px 24px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #eee;border-radius:12px;overflow:hidden;">
              ${rowsHtml}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 30px 26px;font-size:12px;color:#8a7a55;">
            Reply directly to ${escapeHtml(data.email)} to respond to the client.
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

export const sendInquiryEmail = createServerFn({ method: "POST" })
  .validator((input: unknown) => payloadSchema.parse(input))
  .handler(async ({ data }) => {
    let apiKey = process.env.RESEND_API_KEY;
    let fromAddress = process.env.MAIL_FROM || "onboarding@resend.dev";
    let rawToAddresses = process.env.MAIL_TO;

    try {
      const { env } = await import(/* @vite-ignore */ "cloudflare:workers");
      if (env) {
        if (env.RESEND_API_KEY) apiKey = env.RESEND_API_KEY;
        if (env.MAIL_FROM) fromAddress = env.MAIL_FROM;
        if (env.MAIL_TO) rawToAddresses = env.MAIL_TO;
      }
    } catch (e) {
      // Ignore during local development/build
    }

    if (!apiKey || apiKey === "your_resend_api_key_here") {
      throw new Error("Email service is not configured. Please set a valid RESEND_API_KEY.");
    }
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const toAddresses = rawToAddresses
      ? rawToAddresses.split(",").map(e => e.trim())
      : ["siyamittal1428@gmail.com"];

    const subject =
      data.kind === "booking"
        ? `New Tarot Consultation Booking — ${data.name}`
        : `New Contact Message — ${data.name}`;

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddresses,
      replyTo: data.email,
      subject,
      html: buildHtml(data.kind, data),
    });

    if (error) {
      console.error("Resend API error details:", error);
      throw new Error(`Resend Error: ${error.message || "Failed to send email"}`);
    }

    return { ok: true };
  });
