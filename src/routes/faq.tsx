import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MagneticButton } from "@/components/site/MagneticButton";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "FAQ — Tarot Reading Questions | Hidden Oracle" },
      { name: "description", content: "Answers to common questions about tarot readings, session formats, confidentiality, and booking." },
      { property: "og:title", content: "FAQ | Hidden Oracle" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
});

const faqs = [
  { q: "How do online tarot readings work?", a: "You'll pick a time slot, complete a short intake form, and meet me via video, audio, or private chat. You'll receive a written summary after the session." },
  { q: "Are my readings confidential?", a: "Absolutely. Every session is 100% private. I never share names, questions, or reading details." },
  { q: "How accurate are tarot readings?", a: "Tarot works with the energies present at the moment of the reading. It reflects patterns and probabilities — your free will always shapes the outcome." },
  { q: "What should I prepare before my session?", a: "Come with an open heart and one or two focused questions. Water, journaling, and a quiet space help you receive the most." },
  { q: "Can you predict specific dates or names?", a: "Tarot is stronger with themes and timing windows than exact names or dates. I'll always be honest about what the cards can and cannot show." },
  { q: "Do you offer refunds?", a: "If you're unable to attend, we can reschedule once at no cost. Please review the full policy before booking." },
  { q: "How often should I get a reading?", a: "Once every 1-3 months is ideal for most seekers. Coming too often can cloud the guidance you've already received." },
  { q: "Do you take walk-in or same-day bookings?", a: "Yes, subject to availability. Reach out on WhatsApp or the contact form for urgent slots." },
];

function FAQ() {
  return (
    <Section
      eyebrow="Answers"
      title="Frequently asked questions"
      subtitle="Everything you need to know before booking your reading."
    >
      <div className="max-w-3xl mx-auto glass-gold rounded-3xl p-4 sm:p-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border/40">
              <AccordionTrigger className="text-left font-display text-lg text-foreground hover:text-primary py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">Still have questions?</p>
        <MagneticButton to="/contact">Reach Out</MagneticButton>
      </div>
    </Section>
  );
}
