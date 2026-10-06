import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Instagram, Menu, Phone, X } from "lucide-react";
import { CONTACT, useI18n, type Lang, type ServiceCategory } from "@/lib/i18n";
import logo from "@/assets/logo.jpg.asset.json";
import handSvg from "@/assets/nail-hand.svg?raw";

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/services", label: t.nav.services },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-background focus:px-4 focus:py-2">
        {t.skipToContent}
      </a>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled || open ? "border-b border-border/70 bg-background/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <Logo className="h-10 w-10 max-sm:hidden" />
            <span className="whitespace-nowrap leading-none">
              <span className="block font-display text-[1.6rem] tracking-[0.04em] sm:text-[1.35rem]">NK</span>
              <span className="block text-[0.58rem] uppercase tracking-[0.3em] text-taupe sm:text-[0.6rem] sm:tracking-[0.34em]">Beauty Salon</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            {links.map((l) => (
              <Link key={l.to} to={l.to} activeOptions={{ exact: true }}
                className="link-line text-[0.78rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            <LangSwitch lang={lang} setLang={setLang} />
            <Link to="/book" className="btn btn-solid !px-5 !py-2.5">{t.nav.book}</Link>
          </div>

          {/* mobile & tablet */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:hidden">
            <LangPill lang={lang} setLang={setLang} />
            <a href={CONTACT.tel} aria-label={t.call} className="grid h-10 w-10 place-items-center rounded-full text-foreground/80 transition-colors hover:text-foreground">
              <Phone className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.4} />
            </a>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-sand bg-background/60 transition-colors hover:border-foreground" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.4} /> : <Menu className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.4} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="fade-up h-[calc(100dvh-73px)] overflow-y-auto bg-background px-5 pb-10 pt-4 sm:px-8 lg:hidden" aria-label="Mobile">
            {[...links, { to: "/book", label: t.nav.book } as const].map((l, i) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="flex items-baseline gap-5 border-b py-5">
                <span className="text-xs tracking-[0.2em] text-taupe">0{i + 1}</span>
                <span className="font-display text-4xl font-light">{l.label}</span>
              </Link>
            ))}
            <div className="mt-8 space-y-2 text-sm text-muted-foreground">
              <a href={CONTACT.tel} className="block">{CONTACT.phone}</a>
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="block">{CONTACT.handle}</a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center text-[0.72rem] tracking-[0.18em]" role="group" aria-label="Language">
      {(["el", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1.5 text-sand">/</span>}
          <button onClick={() => setLang(l)} aria-pressed={lang === l}
            className={`py-1 transition-colors ${lang === l ? "text-foreground" : "text-muted-foreground/70 hover:text-foreground"}`}>
            {l === "el" ? "ΕΛ" : "EN"}
          </button>
        </span>
      ))}
    </div>
  );
}

function LangPill({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex rounded-full border border-sand bg-background/60 p-[3px] text-[0.72rem] font-medium tracking-[0.08em]" role="group" aria-label="Language">
      {(["el", "en"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`rounded-full px-3 py-1.5 transition-all duration-300 ${lang === l ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
          {l === "el" ? "EL" : "EN"}
        </button>
      ))}
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  const [err, setErr] = useState(false);
  return err ? (
    <span className={`grid shrink-0 place-items-center rounded-full border border-sand font-display text-sm ${className}`}>NK</span>
  ) : (
    <img src={logo.url} alt="NK Beauty Salon" onError={() => setErr(true)}
      className={`shrink-0 rounded-full object-cover ring-1 ring-sand/60 ${className}`} />
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export function Footer() {
  const { t, lang } = useI18n();
  return (
    <footer className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-5xl font-light">NK <em className="text-taupe">Beauty</em></p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.footer}</p>
            <Link to="/book" className="btn btn-solid mt-8">{t.book}</Link>
          </div>
          <div className="text-sm">
            <p className="eyebrow">{t.findUs}</p>
            <a href={CONTACT.mapUrl} target="_blank" rel="noreferrer" className="mt-4 block text-muted-foreground hover:text-foreground">
              {lang === "el" ? CONTACT.addressEl : CONTACT.address}
            </a>
            <a href={CONTACT.tel} className="mt-2 block text-muted-foreground hover:text-foreground">{CONTACT.phone}</a>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="mt-2 block text-muted-foreground hover:text-foreground">{CONTACT.handle}</a>
          </div>
          <div className="text-sm">
            <p className="eyebrow">{t.hoursTitle}</p>
            <p className="mt-4 text-muted-foreground">{t.weekdays}<br /><span className="text-foreground">10:00 – 20:00</span></p>
            <p className="mt-3 text-muted-foreground">{t.weekend}<br /><span className="text-foreground">{t.closed}</span></p>
          </div>
        </div>
        <div className="hairline mt-16" />
        <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} NK Beauty Salon. {t.rights}</span>
          <span>Patras · Greece</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

export function CtaButtons({ center }: { center?: boolean }) {
  const { t } = useI18n();
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${center ? "sm:justify-center" : ""}`}>
      <Link to="/book" className="btn btn-solid">{t.book}</Link>
      <a href={CONTACT.tel} className="btn btn-ghost"><Phone className="h-3.5 w-3.5" strokeWidth={1.5} /> {CONTACT.phone}</a>
    </div>
  );
}

export function InstagramLink() {
  const { t } = useI18n();
  return (
    <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost">
      <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} /> {t.insta}
    </a>
  );
}

export function SmartImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [state, setState] = useState<"loading" | "ok" | "err">("loading");
  return (
    <div className={`group relative overflow-hidden bg-nude ${className}`}>
      {state !== "err" && (
        <img src={src} alt={alt} loading="lazy" onLoad={() => setState("ok")} onError={() => setState("err")}
          className={`h-full w-full object-cover transition-all duration-[1.6s] group-hover:scale-[1.04] ${state === "ok" ? "opacity-100" : "opacity-0"}`} />
      )}
      {state === "err" && (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#F7EEE6,#E7D6C8)]">
          <span className="font-display text-4xl font-light italic text-taupe/70">NK</span>
        </div>
      )}
    </div>
  );
}

export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: ReactNode }) {
  return (
    <section className="bg-silk -mt-[73px] pt-[73px]">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24 fade-up">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-5xl leading-[1.04] md:text-7xl">{title}</h1>
        {text && <p className="mt-7 max-w-xl leading-relaxed text-muted-foreground">{text}</p>}
      </div>
    </section>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { el.classList.add("is-in"); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("is-in"); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function ArrowLink({ to, children }: { to: "/services" | "/gallery" | "/book" | "/contact"; children: ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.2em]">
      <span className="link-line">{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.3} />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Animated hand + nail polish                                         */
/* ------------------------------------------------------------------ */

export function NailAnimation({ className = "" }: { className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: handSvg }} />;
}

/* ------------------------------------------------------------------ */
/* Thin line icons for service categories                              */
/* ------------------------------------------------------------------ */

export function ServiceIcon({ name, className = "h-10 w-10" }: { name: ServiceCategory["icon"]; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.1, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {name === "hand" && (
        <g {...common}>
          <path d="M16 44 C14 36 12 32 12 26 L12 16 a2.5 2.5 0 0 1 5 0 L17 24 M17 22 L17 9 a2.5 2.5 0 0 1 5 0 L22 22 M22 21 L22 7 a2.5 2.5 0 0 1 5 0 L27 22 M27 22 L27 10 a2.5 2.5 0 0 1 5 0 L32 26 L35 21 a2.5 2.5 0 0 1 4.3 2.5 L34 34 C32 39 31 41 31 44" />
          <path d="M23 8.5 C23 7 24 5.6 24.5 5 C25 5.6 26 7 26 8.5" />
        </g>
      )}
      {name === "foot" && (
        <g {...common}>
          <path d="M18 44 C16 36 14 30 15 22 C16 15 19 12 23 12 C28 12 30 16 30 22 C30 28 27 32 27 38 L27 44" />
          <circle cx="16" cy="7" r="2.6" /><circle cx="22" cy="5.5" r="2" /><circle cx="27" cy="6" r="1.7" /><circle cx="31" cy="8" r="1.4" /><circle cx="34" cy="11" r="1.2" />
        </g>
      )}
      {name === "nail" && (
        <g {...common}>
          <path d="M17 42 L17 18 C17 10 20 5 24 3 C28 5 31 10 31 18 L31 42" />
          <path d="M20 20 C20 14 22 10 24 8" />
          <path d="M36 10 l1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 3 -1 Z" />
        </g>
      )}
      {name === "wax" && (
        <g {...common}>
          <path d="M10 18 C10 14 14 12 24 12 C34 12 38 14 38 18 L36 38 C36 41 32 43 24 43 C16 43 12 41 12 38 Z" />
          <path d="M10 18 C10 22 16 23 24 23 C32 23 38 22 38 18" />
          <path d="M24 23 L24 30 C24 32 26 32 26 30" />
          <path d="M30 4 L22 20" />
        </g>
      )}
    </svg>
  );
}
