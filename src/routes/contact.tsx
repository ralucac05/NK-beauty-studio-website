import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { PageHeader, Reveal } from "@/components/site";
import { CONTACT, useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Επικοινωνία — NK Beauty Salon, Κανακάρη 83 Πάτρα" },
      { name: "description", content: "Κάλεσε στο 261 400 0886 για ραντεβού. Κανακάρη 83, Πάτρα. Δευτέρα–Παρασκευή 10:00–20:00." },
      { property: "og:title", content: "Contact — NK Beauty Salon" },
      { property: "og:description", content: "Call 261 400 0886 to book. Kanakari 83, Patras. Mon–Fri 10:00–20:00." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t, lang } = useI18n();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(CONTACT.phone); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* ignore */ }
  };
  return (
    <>
      <PageHeader eyebrow={t.nav.contact} title={t.contactTitle} text={t.contactText} />
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
        <Reveal className="space-y-12">
          <div>
            <p className="eyebrow">{t.call}</p>
            <a href={CONTACT.tel} className="mt-4 block font-display text-5xl font-light hover:text-taupe md:text-6xl">{CONTACT.phone}</a>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/book" className="btn btn-solid">{t.book}</Link>
              <button onClick={copy} className="btn btn-ghost">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />}
                <span aria-live="polite">{copied ? t.copied : t.copy}</span>
              </button>
            </div>
          </div>
          <div className="hairline" />
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="eyebrow">{t.findUs}</p>
              <p className="mt-4 font-display text-2xl">{lang === "el" ? CONTACT.addressEl : CONTACT.address}</p>
              <a href={CONTACT.mapUrl} target="_blank" rel="noreferrer" className="link-line mt-3 inline-block text-[0.72rem] uppercase tracking-[0.2em] text-taupe">{t.openMap}</a>
            </div>
            <div>
              <p className="eyebrow">Instagram</p>
              <p className="mt-4 font-display text-2xl">{CONTACT.handle}</p>
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="link-line mt-3 inline-block text-[0.72rem] uppercase tracking-[0.2em] text-taupe">{t.insta}</a>
            </div>
          </div>
          <div className="hairline" />
          <div>
            <p className="eyebrow">{t.hoursTitle}</p>
            <dl className="mt-5 max-w-sm space-y-3 text-sm">
              <div className="flex justify-between border-b pb-3"><dt>{t.weekdays}</dt><dd>10:00 – 20:00</dd></div>
              <div className="flex justify-between"><dt>{t.weekend}</dt><dd className="text-muted-foreground">{t.closed}</dd></div>
            </dl>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="arch h-full min-h-[420px] overflow-hidden border">
            <iframe title="Map" className="h-full min-h-[420px] w-full grayscale-[0.6] sepia-[0.15]" loading="lazy"
              src="https://www.google.com/maps?q=Kanakari+83,+Patra+262+21&output=embed" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
