import { createFileRoute } from "@tanstack/react-router";
import { CtaButtons, InstagramLink, PageHeader, Reveal, SmartImage } from "@/components/site";
import { useI18n } from "@/lib/i18n";
import { GALLERY } from "@/lib/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Οι δουλειές μας — NK Beauty Salon" },
      { name: "description", content: "Nail art, French και τεχνητά νύχια από το NK Beauty Salon στην Πάτρα. Δες περισσότερα στο Instagram @nkbeauty_salon." },
      { property: "og:title", content: "Our Work — NK Beauty Salon" },
      { property: "og:description", content: "Nail art and artificial nails from NK Beauty Salon, Patras." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t.galleryEyebrow} title={t.galleryTitle} text={t.galleryText} />
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="columns-2 gap-4 md:columns-3 md:gap-6 [&>*]:mb-4 md:[&>*]:mb-6">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 100} className="break-inside-avoid">
              <SmartImage src={g.src} alt={g.alt} className={`${i % 3 === 0 ? "arch aspect-[3/4]" : i % 3 === 1 ? "aspect-square rounded-[var(--radius)]" : "aspect-[4/5] rounded-[var(--radius)]"}`} />
            </Reveal>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center gap-3">
          <CtaButtons center />
          <InstagramLink />
        </div>
      </section>
    </>
  );
}
