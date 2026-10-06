import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ArrowLink, CtaButtons, InstagramLink, NailAnimation, Reveal, ServiceIcon, SmartImage } from "@/components/site";
import { CONTACT, SERVICES, useI18n } from "@/lib/i18n";
import { GALLERY } from "@/lib/gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NK Beauty Salon — Νύχια & ομορφιά στην Πάτρα" },
      { name: "description", content: "Μανικιούρ, πεδικιούρ, τεχνητά νύχια και αποτρίχωση στην Κανακάρη 83, Πάτρα. Κλείσε το ραντεβού σου online." },
      { property: "og:title", content: "NK Beauty Salon — Patras" },
      { property: "og:description", content: "Manicure, pedicure, artificial nails and waxing in Patras." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const marquee = SERVICES.flatMap((c) => c.items.map((i) => i.name[lang]));

  return (
    <>
      {/* HERO — mobile & tablet: picture first (Veranda-style); desktop (lg+): two columns */}
      <section className="bg-silk relative -mt-[73px] overflow-hidden pt-[73px]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pb-24 lg:pt-16">
          <div className="fade-up order-2 lg:order-none">
            <p className="eyebrow flex items-center gap-4 lg:block">
              <span className="block h-px w-12 bg-taupe/50 lg:hidden" aria-hidden="true" />
              {t.heroEyebrow}
            </p>
            <h1 className="mt-5 text-[2.75rem] leading-[1.04] sm:text-6xl lg:mt-6 lg:text-[5.4rem] lg:leading-[1.02]">
              {t.heroTitleA} <em className="text-taupe">{t.heroTitleB}</em>{" "}
              <span className="whitespace-nowrap">{t.heroTitleC}</span>
            </h1>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted-foreground lg:mt-8 lg:text-base">{t.heroText}</p>
            <div className="mt-8 flex flex-row gap-3 lg:mt-10">
              <Link to="/book" className="btn btn-solid max-lg:flex-1 max-lg:px-4 max-lg:py-4 max-lg:text-[0.95rem] max-lg:normal-case max-lg:tracking-normal sm:max-lg:flex-none sm:max-lg:px-8">{t.book}</Link>
              <Link to="/services" className="btn btn-ghost max-lg:flex-1 max-lg:px-4 max-lg:py-4 max-lg:text-[0.95rem] max-lg:normal-case max-lg:tracking-normal sm:max-lg:flex-none sm:max-lg:px-8">{t.viewServices}</Link>
            </div>
            <a href="#salon" className="mt-10 inline-block lg:hidden">
              <span className="font-display text-[1.7rem] font-light italic text-taupe">{t.tagline}</span>
              <svg viewBox="0 0 200 10" className="mt-1 block h-2.5 w-full text-sand" aria-hidden="true">
                <path d="M2 6 C50 2 120 2 198 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </a>
          </div>

          <div className="fade-up relative order-1 mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:order-none lg:max-w-[460px] lg:[animation-delay:250ms]">
            <div className="arch relative overflow-hidden border border-sand/60 bg-white/50 px-4 pb-4 pt-8 shadow-soft backdrop-blur-sm lg:px-6 lg:pb-8 lg:pt-12">
              <NailAnimation />
              <p className="mt-2 hidden text-center font-display text-3xl font-light italic text-taupe lg:block">{t.tagline}</p>
            </div>
          </div>
        </div>
        <a href="#salon" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.35em] text-muted-foreground lg:flex">
          {t.scroll}
          <span className="block h-10 w-px overflow-hidden bg-sand/50"><span className="block h-1/2 w-px animate-[scrollcue_2.2s_ease-in-out_infinite] bg-taupe" /></span>
        </a>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y bg-background py-5" aria-hidden="true">
        <div className="marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {marquee.map((m, i) => (
                <span key={i} className="flex items-center whitespace-nowrap font-display text-2xl font-light italic text-foreground/80 md:text-3xl">
                  <span className="px-8">{m}</span>
                  <span className="text-sm text-taupe">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SALON INTRO */}
      <section id="salon" className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
        <Reveal>
          <SmartImage src={GALLERY[2]!.src} alt={GALLERY[2]!.alt} className="arch aspect-[4/5] w-full max-w-md" />
        </Reveal>
        <Reveal delay={150}>
          <p className="eyebrow">{t.introEyebrow}</p>
          <h2 className="mt-5 text-4xl leading-tight md:text-6xl">{t.introTitle}</h2>
          <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">{t.introText}</p>
          <div className="mt-9"><ArrowLink to="/contact">{t.nav.contact}</ArrowLink></div>
        </Reveal>
      </section>

      {/* SERVICES */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">{t.servicesEyebrow}</p>
              <h2 className="mt-5 text-4xl md:text-6xl">{t.servicesTitle}</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t.servicesText}</p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius)] border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 90} className="h-full">
                <Link to="/services" hash={s.id}
                  className="group flex h-full flex-col bg-background p-8 transition-colors duration-500 hover:bg-white">
                  <div className="flex items-start justify-between">
                    <ServiceIcon name={s.icon} className="h-11 w-11 text-taupe" />
                    <span className="font-display text-sm italic text-muted-foreground">0{i + 1}</span>
                  </div>
                  <h3 className="mt-10 text-3xl">{s.name[lang]}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text[lang]}</p>
                  <ul className="mt-6 space-y-1.5 text-[0.8rem] text-foreground/75">
                    {s.items.map((it) => <li key={it.id}>— {it.name[lang]}</li>)}
                  </ul>
                  <span className="mt-auto flex items-center gap-2 pt-8 text-[0.7rem] uppercase tracking-[0.2em] text-taupe">
                    {t.request} <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.3} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="text-center">
            <p className="eyebrow">{t.galleryEyebrow} · {CONTACT.handle}</p>
            <h2 className="mt-5 text-4xl md:text-6xl">{t.galleryTitle}</h2>
            <p className="mx-auto mt-5 max-w-md text-muted-foreground">{t.galleryText}</p>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {GALLERY.slice(0, 4).map((g, i) => (
              <Reveal key={i} delay={i * 100} className={i % 2 ? "md:mt-14" : ""}>
                <SmartImage src={g.src} alt={g.alt} className={`aspect-[3/4] ${i === 0 || i === 3 ? "arch" : "rounded-[var(--radius)]"}`} />
              </Reveal>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/gallery" className="btn btn-solid">{t.nav.gallery}</Link>
            <InstagramLink />
          </div>
        </div>
      </section>

      {/* RITUAL */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
          <Reveal className="text-center">
            <p className="eyebrow">{t.ritualEyebrow}</p>
            <h2 className="mt-5 text-4xl md:text-6xl">{t.ritualTitle}</h2>
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {t.ritual.map((r, i) => (
              <Reveal key={r.t} delay={i * 120} className="text-center">
                <span className="font-display text-5xl font-light italic text-sand">{["I", "II", "III"][i]}</span>
                <h3 className="mt-4 text-2xl">{r.t}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{r.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-silk border-t">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center md:py-32">
          <Reveal>
            <h2 className="text-4xl leading-tight md:text-6xl">{t.ctaTitle}</h2>
            <p className="mx-auto mt-6 max-w-md text-muted-foreground">{t.ctaText}</p>
            <div className="mt-10"><CtaButtons center /></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
