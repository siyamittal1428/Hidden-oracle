function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(kind, data) {
  const rows = [
    ["Full Name", data.name],
    ["Email", data.email],
    ["Phone Number", data.phone || "—"],
    ["Country", data.country || "—"],
    ["Selected Service", data.service || "—"],
    ["Preferred Date", data.date || "—"],
    ["Preferred Time", data.time || "—"],
    ["Session Type", data.sessionType || "—"],
    ["Message / Query", data.message || "—"],
    ["Submitted At", new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) + " IST"],
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

export async function onRequest(context) {
  // Only handle POST requests
  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload = await context.request.json();

    // Environment variables from Cloudflare Pages Dashboard
    const apiKey = context.env.RESEND_API_KEY || "re_ZVWvzKYa_ETVfkNS5n7eFSL8yZiU6zibL";
    const mailTo = context.env.MAIL_TO || "siyamittal1428@gmail.com";
    const mailFrom = context.env.MAIL_FROM || "onboarding@resend.dev";

    const subject = payload.kind === "booking"
      ? `New Tarot Consultation Booking — ${payload.name}`
      : `New Contact Message — ${payload.name}`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: mailFrom,
        to: [mailTo],
        reply_to: payload.email,
        subject,
        html: buildHtml(payload.kind, payload)
      })
    });

    const result = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ ok: false, error: result.message || "Failed to send email" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
