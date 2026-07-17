import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { Section, Reveal } from "@/components/site/Section";
import { PhotoFrame } from "@/components/site/PhotoFrame";
import { sendInquiryEmail } from "@/lib/send-email.functions";
import { MessageCircle, Instagram, Youtube, Mail, Loader2 } from "lucide-react";
import { PhoneInput } from "@/components/site/PhoneInput";
import contactImg from "@/assets/siya-2.png.asset.json";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Ask a Question | Hidden Oracle" },
      { name: "description", content: "Get in touch with Siya on WhatsApp, Instagram, email, or through the contact form for tarot bookings and questions." },
      { property: "og:title", content: "Contact | Hidden Oracle" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const socials = [
  { icon: MessageCircle, label: "WhatsApp", value: "+91 78147 94852", href: "", color: "oklch(0.7 0.17 150)" },
  { icon: Instagram, label: "Instagram", value: "@hiddenoracle._14", href: "https://www.instagram.com/hiddenoracle._14?igsh=MWRoeGtyZnB6eHpuYw%3D%3D&utm_source=qr", color: "oklch(0.6 0.2 20)" },
  { icon: Youtube, label: "YouTube", value: "Weekly readings", href: "https://youtube.com/@hiddenoracle_14?si=BO3w8mPCdGvCEXf8", color: "oklch(0.6 0.22 25)" },
  { icon: Mail, label: "Email", value: "Siyamittal1428@gmail.com", href: "", color: "oklch(0.75 0.15 85)" },
];

function Contact() {
  const send = useServerFn(sendInquiryEmail);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const upd = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");
    try {
      await send({ data: { kind: "contact", name: form.name, email: form.email, phone: form.phone, message: form.message } });
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "Unable to send. Please try again.");
    }
  };

  return (
    <>
      <Section
        eyebrow="Get in Touch"
        title="Let's connect"
        subtitle="Reach out through any channel — I read every message personally."
      >
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div>
            <PhotoFrame src={contactImg.url} alt="Siya smiling at reading table" aspect="aspect-[4/5]" />
          </div>

          <div className="space-y-4">
            {socials.map((s, i) => {
              const Icon = s.icon;
              const isLink = !!s.href;
              const CardComponent = isLink ? motion.a : motion.div;

              return (
                <CardComponent
                  key={s.label}
                  {...(isLink ? { href: s.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={isLink ? { x: 8 } : undefined}
                  className={`group flex items-center gap-4 glass ${
                    isLink ? "hover:glass-gold cursor-pointer" : "cursor-default"
                  } rounded-2xl p-5 transition-all`}
                >
                  <div className="grid place-items-center w-14 h-14 rounded-2xl relative"
                    style={{ background: `${s.color.replace(")", " / 0.15)")}`, border: `1px solid ${s.color.replace(")", " / 0.4)")}` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: s.color }} />
                    {isLink && (
                      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `0 0 30px ${s.color.replace(")", " / 0.4)")}` }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-widest text-primary/80">{s.label}</div>
                    <div className="text-foreground truncate select-all">{s.value}</div>
                  </div>
                  {isLink && (
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  )}
                </CardComponent>
              );
            })}
          </div>
        </div>
      </Section>

      <Section eyebrow="Send a Message" title="Or write a note">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto glass-gold rounded-3xl p-8"
        >
          {sent ? (
            <div className="text-center py-6">
              <div className="font-display text-3xl text-gradient-gold">Message received ✨</div>
              <p className="mt-2 text-muted-foreground">Thank you. Siya will reply within 24 hours.</p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-5 text-xs uppercase tracking-widest text-primary hover:text-primary/80"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              <input required value={form.name} onChange={(e) => upd("name", e.target.value)} placeholder="Your Name" className="sm:col-span-2 bg-transparent border border-border rounded-2xl px-4 py-3.5 focus:outline-none focus:border-primary" />
              <input required type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} placeholder="Email" className="bg-transparent border border-border rounded-2xl px-4 py-3.5 focus:outline-none focus:border-primary" />
              <PhoneInput label="Phone / WhatsApp" name="phone" value={form.phone} onChange={upd} />
              <textarea required rows={5} value={form.message} onChange={(e) => upd("message", e.target.value)} placeholder="Your message..." className="sm:col-span-2 bg-transparent border border-border rounded-2xl px-4 py-3.5 focus:outline-none focus:border-primary" />
              {status === "error" && (
                <div className="sm:col-span-2 rounded-2xl border border-destructive/40 bg-destructive/10 text-sm text-destructive px-4 py-3">
                  {errMsg}
                </div>
              )}
              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3.5 text-sm font-medium hover:scale-105 transition-transform glow-gold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>) : "Send Message"}
                </button>
              </div>
            </div>
          )}
        </motion.form>
      </Section>
    </>
  );
}
