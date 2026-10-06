import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Check, Phone } from "lucide-react";
import { NailAnimation, PageHeader } from "@/components/site";
import { ALL_ITEMS, CONTACT, SERVICES, useI18n } from "@/lib/i18n";

type BookSearch = { service?: string };

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): BookSearch =>
    typeof s["service"] === "string" ? { service: s["service"] } : {},
  head: () => ({
    meta: [
      { title: "Ραντεβού — NK Beauty Salon Πάτρα" },
      { name: "description", content: "Ζήτησε ραντεβού online για μανικιούρ, πεντικιούρ, τεχνητά νύχια ή αποτρίχωση στο NK Beauty Salon." },
      { property: "og:title", content: "Book — NK Beauty Salon" },
      { property: "og:description", content: "Request an appointment online at NK Beauty Salon, Patras." },
    ],
  }),
  component: Book,
});

const TIMES = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function Book() {
  const { t, lang } = useI18n();
  const { service } = Route.useSearch();
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (service && ALL_ITEMS.some((i) => i.id === service)) setSelected([service]);
  }, [service]);

  const isWeekend = useMemo(() => {
    if (!date) return false;
    const day = new Date(`${date}T12:00:00`).getDay();
    return day === 0 || day === 6;
  }, [date]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (selected.length === 0) {
      setError(t.chooseService);
      return;
    }
    if (!date || !time || !name.trim() || phone.replace(/\D/g, "").length < 10 || isWeekend) {
      setError(isWeekend ? t.weekendNote : t.required);
      return;
    }
    setError("");
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setSent(false); setSelected([]); setDate(""); setTime(""); setNotes("");
  };

  const prettyDate = date
    ? new Date(`${date}T12:00:00`).toLocaleDateString(lang === "el" ? "el-GR" : "en-GB", { weekday: "long", day: "numeric", month: "long" })
    : "";
  const chosen = ALL_ITEMS.filter((i) => selected.includes(i.id));

  if (sent) {
    return (
      <section className="bg-silk -mt-[73px] min-h-[80vh] pt-[73px]">
        <div className="mx-auto max-w-xl px-5 py-20 text-center fade-up">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-sand bg-white text-taupe">
            <Check className="h-6 w-6" strokeWidth={1.3} />
          </span>
          <h1 className="mt-8 text-5xl md:text-6xl">{t.sentTitle}</h1>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted-foreground">{t.sentText}</p>
          <div className="mt-10 rounded-[var(--radius)] border bg-white/70 p-7 text-left text-sm">
            <p className="eyebrow">{t.summary}</p>
            <dl className="mt-4 space-y-3">
              <Row k={t.step1} v={chosen.map((c) => c.name[lang]).join(", ")} />
              <Row k={t.step2} v={`${prettyDate} · ${time}`} />
              <Row k={t.name} v={name} />
              <Row k={t.phone} v={phone} />
              {notes && <Row k={t.notes} v={notes} />}
            </dl>
          </div>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={reset} className="btn btn-ghost">{t.newRequest}</button>
            <Link to="/" className="btn btn-solid">{t.backHome}</Link>
          </div>
        </div>
      </section>
    );
  }

  const field = "w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground";

  return (
    <>
      <PageHeader eyebrow={t.bookEyebrow} title={t.bookTitle} text={t.bookText} />
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.5fr_1fr]">
        <form onSubmit={submit} noValidate className="space-y-16">
          {/* 1. services */}
          <fieldset>
            <legend className="flex items-baseline gap-4">
              <span className="font-display italic text-taupe">01</span>
              <span className="font-display text-3xl">{t.step1}</span>
            </legend>
            <div className="mt-8 space-y-8">
              {SERVICES.map((c) => (
                <div key={c.id}>
                  <p className="eyebrow !text-muted-foreground">{c.name[lang]}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.items.map((it) => {
                      const on = selected.includes(it.id);
                      return (
                        <button type="button" key={it.id} onClick={() => toggle(it.id)} aria-pressed={on}
                          className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300 ${
                            on ? "border-foreground bg-foreground text-background" : "border-sand bg-white hover:border-foreground"
                          }`}>
                          {on && <Check className="h-3.5 w-3.5" strokeWidth={1.6} />}
                          {it.name[lang]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          {/* 2. date & time */}
          <fieldset>
            <legend className="flex items-baseline gap-4">
              <span className="font-display italic text-taupe">02</span>
              <span className="font-display text-3xl">{t.step2}</span>
            </legend>
            <label className="mt-8 block max-w-xs">
              <span className="eyebrow !text-muted-foreground">{t.date}</span>
              <input type="date" min={todayISO()} value={date} onChange={(e) => setDate(e.target.value)} className={field} required />
            </label>
            {isWeekend && <p className="mt-3 text-sm text-destructive">{t.weekendNote}</p>}
            <p className="eyebrow mt-8 !text-muted-foreground">{t.time}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TIMES.map((tm) => (
                <button type="button" key={tm} onClick={() => setTime(tm)} aria-pressed={time === tm}
                  className={`min-w-[5.2rem] rounded-full border px-4 py-2.5 text-sm tabular-nums transition-all duration-300 ${
                    time === tm ? "border-foreground bg-foreground text-background" : "border-sand bg-white hover:border-foreground"
                  }`}>
                  {tm}
                </button>
              ))}
            </div>
          </fieldset>

          {/* 3. details */}
          <fieldset>
            <legend className="flex items-baseline gap-4">
              <span className="font-display italic text-taupe">03</span>
              <span className="font-display text-3xl">{t.step3}</span>
            </legend>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow !text-muted-foreground">{t.name}</span>
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} required />
              </label>
              <label className="block">
                <span className="eyebrow !text-muted-foreground">{t.phone}</span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" className={field} required />
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow !text-muted-foreground">{t.notes}</span>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.notesPh} className={`${field} resize-none`} />
              </label>
            </div>
          </fieldset>

          <div>
            {error && <p role="alert" className="mb-5 text-sm text-destructive">{error}</p>}
            <button type="submit" className="btn btn-solid w-full sm:w-auto">{t.submit}</button>
          </div>
        </form>

        {/* summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="arch border bg-ivory px-8 pb-10 pt-14 text-center">
            <NailAnimation className="mx-auto w-48" />
            <p className="eyebrow mt-4">{t.summary}</p>
            <ul className="mt-5 min-h-[3rem] space-y-1 font-display text-xl">
              {chosen.length ? chosen.map((c) => <li key={c.id}>{c.name[lang]}</li>) : <li className="text-muted-foreground/60">—</li>}
            </ul>
            <div className="hairline my-6" />
            <p className="text-sm text-muted-foreground">{prettyDate || "—"}{time && ` · ${time}`}</p>
          </div>
          <a href={CONTACT.tel} className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Phone className="h-3.5 w-3.5" strokeWidth={1.5} /> {t.orCall} · {CONTACT.phone}
          </a>
        </aside>
      </section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-6 border-b pb-3 last:border-b-0">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}
