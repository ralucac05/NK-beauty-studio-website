import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CtaButtons, PageHeader, Reveal, ServiceIcon, SmartImage } from "@/components/site";
import { SERVICES, useI18n } from "@/lib/i18n";
import { GALLERY } from "@/lib/gallery";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Υπηρεσίες — NK Beauty Salon Πάτρα" },
      { name: "description", content: "Μανικιούρ, πεντικιούρ, τεχνητά νύχια και αποτρίχωση στο NK Beauty Salon. Ζήτησε ραντεβού online." },
      { property: "og:title", content: "Services — NK Beauty Salon" },
      { property: "og:description", content: "Manicure, pedicure, artificial nails and waxing in Patras." },
    ],
  }),
  component: Services,
});

const imgs = [1, 5, 0, 3].map((n) => GALLERY[n]!);

function Services() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t.nav.services} title={<>{t.servicesTitle}</>} text={t.servicesText} />

      {/* quick jump */}
      <div className="sticky top-[73px] z-30 border-y bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-5 py-4 md:px-8">
          {SERVICES.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="link-line shrink-0 whitespace-nowrap text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
              0{i + 1} · {s.name[lang]}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {SERVICES.map((s, i) => (
          <section key={s.id} id={s.id} className="grid scroll-mt-40 gap-12 border-b py-20 last:border-b-0 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:py-28">
            <Reveal className={i % 2 ? "md:order-2" : ""}>
              <SmartImage src={imgs[i]!.src} alt={imgs[i]!.alt} className="arch aspect-[4/5] w-full max-w-md" />
            </Reveal>
            <Reveal delay={120} className="self-center">
              <div className="flex items-center gap-4 text-taupe">
                <ServiceIcon name={s.icon} className="h-9 w-9" />
                <span className="font-display italic">0{i + 1}</span>
              </div>
              <h2 className="mt-6 text-5xl md:text-6xl">{s.name[lang]}</h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{s.text[lang]}</p>

              <ul className="mt-10 border-t">
                {s.items.map((it) => (
                  <li key={it.id} className="border-b">
                    <Link to="/book" search={{ service: it.id }}
                      className="group flex items-center justify-between gap-6 py-5 transition-colors hover:bg-ivory/60 sm:px-2">
                      <span>
                        <span className="block font-display text-2xl">{it.name[lang]}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">{it.text[lang]}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-taupe">
                        <span className="hidden sm:inline">{t.request}</span>
                        <span className="grid h-9 w-9 place-items-center rounded-full border border-sand transition-all duration-500 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                          <ArrowUpRight className="h-4 w-4" strokeWidth={1.3} />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        ))}
      </div>

      <section className="bg-silk border-t py-24 text-center">
        <Reveal>
          <h2 className="px-5 text-4xl md:text-5xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-5 max-w-md px-5 text-muted-foreground">{t.ctaText}</p>
          <div className="mt-10 px-5"><CtaButtons center /></div>
        </Reveal>
      </section>
    </>
  );
}
