import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { services, ServiceCard } from "@/components/site/services-data";
import { MagneticButton } from "@/components/site/MagneticButton";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Tarot Services & Readings | Hidden Oracle" },
      { name: "description", content: "Explore tarot readings for love, career, finance, family, spiritual growth, energy healing, and monthly forecasts." },
      { property: "og:title", content: "Tarot Services | Hidden Oracle" },
      { property: "og:description", content: "Personalized readings for every chapter of your life." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

function Services() {
  return (
    <>
      <Section
        eyebrow="Sacred Offerings"
        title="Readings for every chapter of your life"
        subtitle="Choose the reading that calls to your heart — every session is personalized, private, and rooted in intuitive truth."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => <ServiceCard key={s.slug} s={s} index={i} />)}
        </div>

        <div className="mt-16 text-center glass-gold rounded-3xl p-10 glow-gold">
          <h3 className="font-display text-3xl md:text-4xl text-gradient-gold">Not sure which reading is right?</h3>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Reach out for a quick consult — I'll help you choose the reading that best fits your question and energy.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <MagneticButton to="/contact">Contact Me</MagneticButton>
            <MagneticButton to="/booking" variant="ghost">Book Now</MagneticButton>
          </div>
        </div>
      </Section>
    </>
  );
}
