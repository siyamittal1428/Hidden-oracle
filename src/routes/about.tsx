import { createFileRoute } from "@tanstack/react-router";
import { Section, Reveal } from "@/components/site/Section";
import { Counter } from "@/components/site/Counter";
import { PhotoFrame } from "@/components/site/PhotoFrame";
import { MagneticButton } from "@/components/site/MagneticButton";
import aboutImg from "@/assets/siya-3.png.asset.json";
import img5 from "@/assets/siya-5.png.asset.json";
import { Sparkles, Compass, Heart, Feather } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Siya — Tarot Reader & Spiritual Guide | Hidden Oracle" },
      { name: "description", content: "Meet Siya — professional tarot reader with years of experience guiding seekers through love, career, and spiritual growth." },
      { property: "og:title", content: "About Siya — Hidden Oracle" },
      { property: "og:description", content: "The journey, mission, and experience of your spiritual guide." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <>
      <Section eyebrow="My Story" title={<>The soul behind <em className="not-italic text-foreground/80">the cards</em></>}>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <PhotoFrame src={aboutImg.url} alt="Siya reading tarot" />
          <div className="space-y-5 text-foreground/85 leading-relaxed">
            <Reveal><p>My name is <span className="text-gradient-gold font-semibold">Siya</span>. I've spent years walking the path of tarot, intuition, and spiritual healing — long before it became my life's work.</p></Reveal>
            <Reveal delay={0.1}><p>What began as private curiosity turned into a calling when the readings I gave friends began reshaping their lives. Today I hold space for seekers across the world, helping them meet themselves with honesty and grace.</p></Reveal>
            <Reveal delay={0.2}><p>Every session I offer is grounded in devotion — to the craft, to the querent, and to the truth the cards reveal.</p></Reveal>
            <Reveal delay={0.3}><MagneticButton to="/booking">Book a Private Reading</MagneticButton></Reveal>
          </div>
        </div>
      </Section>

      <Section eyebrow="What Guides Me" title="Journey, mission & vision">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Compass, title: "The Journey", text: "From childhood dreams to formal training — a decade of study in tarot, astrology, and energetic healing." },
            { icon: Heart, title: "The Mission", text: "To help every seeker feel safe, seen, and empowered — turning uncertainty into clarity, and pain into purpose." },
            { icon: Feather, title: "The Vision", text: "A world where spiritual guidance is accessible, ethical, and rooted in genuine intuitive practice." },
          ].map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="glass-gold rounded-3xl p-7 h-full">
                <div className="grid place-items-center w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 animate-glow-pulse">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-gradient-gold">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Milestones" title="Numbers that hold stories">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Counter to={2500} suffix="+" label="Happy Clients" />
          <Counter to={4800} suffix="+" label="Successful Readings" />
          <Counter to={8} suffix="+" label="Years of Experience" />
          <Counter to={99} suffix="%" label="Positive Reviews" />
        </div>
      </Section>

      <Section eyebrow="Practice" title="How I read">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div className="space-y-4 text-foreground/85 leading-relaxed">
            <Reveal><p>I combine <span className="text-primary">Rider-Waite</span> tradition with intuitive channeling, planetary timing, and gentle energetic clearing. Every spread is chosen for you — never scripted, never rushed.</p></Reveal>
            <Reveal delay={0.1}><p>Sessions are held online via video, audio, or private chat. You'll receive a summary after each reading so nothing is lost.</p></Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-4 space-y-2 text-sm">
                {["Ethical, judgement-free space", "Free-will centered guidance", "Follow-up support included", "100% confidential"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-primary" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <PhotoFrame src={img5.url} alt="Siya holding tarot cards" />
        </div>
      </Section>
    </>
  );
}
