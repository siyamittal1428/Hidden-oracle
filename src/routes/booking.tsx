import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { Section } from "@/components/site/Section";
import { services } from "@/components/site/services-data";
import { sendInquiryEmail } from "@/lib/send-email.functions";
import { Check, Loader2 } from "lucide-react";
import { PhoneInput } from "@/components/site/PhoneInput";

export const Route = createFileRoute("/booking")({
  component: Booking,
  head: () => ({
    meta: [
      { title: "Book a Tarot Reading | Hidden Oracle" },
      { name: "description", content: "Reserve a private, personalized tarot session with Siya. Video, audio, or chat sessions available." },
      { property: "og:title", content: "Book a Reading | Hidden Oracle" },
      { property: "og:url", content: "/booking" },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
});

type FormState = {
  name: string; email: string; phone: string; whatsapp: string; country: string;
  service: string; date: string; time: string; sessionType: string; message: string;
};

const empty: FormState = {
  name: "", email: "", phone: "", whatsapp: "", country: "",
  service: "", date: "", time: "", sessionType: "", message: "",
};

function Input({ label, name, value, onChange, type = "text", required }: {
  label: string; name: keyof FormState; value: string;
  onChange: (n: keyof FormState, v: string) => void;
  type?: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0 || type === "date" || type === "time";
  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full bg-transparent border border-border rounded-2xl px-4 pt-5 pb-2 text-foreground focus:outline-none focus:border-primary focus:glow-gold transition-all"
      />
      <label className={`absolute left-4 pointer-events-none transition-all ${floating ? "top-2 text-[11px] tracking-widest uppercase text-primary/80" : "top-4 text-sm text-muted-foreground"}`}>
        {label}{required && " *"}
      </label>
    </div>
  );
}

function Booking() {
  const send = useServerFn(sendInquiryEmail);
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  const update = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const serviceLabel = services.find((s) => s.slug === form.service)?.title || form.service;
      await send({ data: { kind: "booking", ...form, service: serviceLabel } });
      setStatus("sent");
      setForm(empty);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <Section
      eyebrow="Reserve Your Space"
      title="Book a private reading"
      subtitle="Fill in your details below — I'll respond within 24 hours to confirm your session on WhatsApp or email."
    >
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 max-w-6xl mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={onSubmit}
          className="glass-gold rounded-3xl p-6 sm:p-10 space-y-5"
        >
          {status === "sent" ? (
            <div className="text-center py-10">
              <div className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-primary text-primary-foreground glow-gold">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="mt-5 font-display text-3xl text-gradient-gold">Request received</h3>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                Thank you for booking. Siya will reach out on WhatsApp or email within 24 hours to confirm your session.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-xs uppercase tracking-widest text-primary hover:text-primary/80"
              >
                Send another request
              </button>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Full Name" name="name" value={form.name} onChange={update} required />
                <Input label="Email" name="email" type="email" value={form.email} onChange={update} required />
                <PhoneInput label="Phone / WhatsApp Number" name="phone" value={form.phone} onChange={update} required />
                <Input label="Country" name="country" value={form.country} onChange={update} />
                <div className="relative">
                  <label className="absolute left-4 top-2 text-[11px] uppercase tracking-widest text-primary/80 pointer-events-none">Reading Type</label>
                  <select
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className="w-full bg-transparent border border-border rounded-2xl px-4 pt-5 pb-2 text-foreground focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="" className="bg-card">Select a reading</option>
                    {services.map((s) => <option key={s.slug} value={s.slug} className="bg-card">{s.title}</option>)}
                  </select>
                </div>
                <Input label="Preferred Date" name="date" type="date" value={form.date} onChange={update} />
                <Input label="Preferred Time" name="time" type="time" value={form.time} onChange={update} />
                <div className="sm:col-span-2 relative">
                  <label className="absolute left-4 top-2 text-[11px] uppercase tracking-widest text-primary/80 pointer-events-none">Session Type</label>
                  <select
                    value={form.sessionType}
                    onChange={(e) => update("sessionType", e.target.value)}
                    className="w-full bg-transparent border border-border rounded-2xl px-4 pt-5 pb-2 text-foreground focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="" className="bg-card">Choose format</option>
                    <option value="video" className="bg-card">Video Call</option>
                    <option value="audio" className="bg-card">Audio Call</option>
                    <option value="chat" className="bg-card">Private Chat</option>
                  </select>
                </div>
                <div className="sm:col-span-2 relative">
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="peer w-full bg-transparent border border-border rounded-2xl px-4 pt-5 pb-2 text-foreground focus:outline-none focus:border-primary transition-all"
                  />
                  <label className={`absolute left-4 pointer-events-none transition-all ${form.message ? "top-2 text-[11px] tracking-widest uppercase text-primary/80" : "top-4 text-sm text-muted-foreground"}`}>
                    Your Message / Questions
                  </label>
                </div>
              </div>

              {status === "error" && (
                <div className="rounded-2xl border border-destructive/40 bg-destructive/10 text-sm text-destructive px-4 py-3">
                  {error || "Unable to send your request. Please try again."}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3.5 text-sm font-medium hover:scale-105 transition-transform glow-gold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>) : "Request Booking"}
                </button>
                <p className="mt-3 text-xs text-muted-foreground">
                  By submitting you agree to be contacted about your reading. Payment details will be shared upon confirmation.
                </p>
              </div>
            </>
          )}
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass rounded-3xl p-8 h-fit"
        >
          <h3 className="font-display text-2xl text-gradient-gold">What happens next</h3>
          <ol className="mt-5 space-y-4 text-sm">
            {[
              "You submit this form with your preferred date & session type.",
              "Siya personally reviews and confirms your slot within 24 hours.",
              "You'll receive payment details and a private meeting link.",
              "We meet at your scheduled time — a written summary follows.",
            ].map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid place-items-center w-7 h-7 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs shrink-0">{i + 1}</span>
                <span className="text-foreground/85 leading-relaxed">{t}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 pt-6 border-t border-border/40 text-xs text-muted-foreground space-y-1">
            <p>✦ 100% confidential sessions</p>
            <p>✦ Reschedule up to 24 hours before</p>
            <p>✦ Sessions in English & Hindi</p>
          </div>
        </motion.aside>
      </div>
    </Section>
  );
}
