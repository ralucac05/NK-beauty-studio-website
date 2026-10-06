import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "el" | "en";

export const CONTACT = {
  phone: "261 400 0886",
  tel: "tel:+302614000886",
  address: "Kanakari 83, Patra 262 21",
  addressEl: "Κανακάρη 83, Πάτρα 262 21",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Kanakari+83+Patra+262+21",
  instagram: "https://www.instagram.com/nkbeauty_salon/",
  handle: "@nkbeauty_salon",
};

const dict = {
  el: {
    nav: { home: "Αρχική", services: "Υπηρεσίες", gallery: "Δουλειές μας", contact: "Επικοινωνία", book: "Ραντεβού" },
    book: "Κλείσε ραντεβού",
    request: "Ζήτησε ραντεβού",
    viewServices: "Δες τις υπηρεσίες",
    call: "Κάλεσε το σαλόνι",
    insta: "Δες μας στο Instagram",
    skipToContent: "Μετάβαση στο περιεχόμενο",
    scroll: "Κύλιση",
    heroEyebrow: "Σαλόνι ομορφιάς · Πάτρα",
    heroTitleA: "Η ομορφιά",
    heroTitleB: "κρύβεται",
    heroTitleC: "στη λεπτομέρεια.",
    heroText: "Μανικιούρ, πεδικιούρ, τεχνητά νύχια και αποτρίχωση σε έναν ήρεμο, φωτεινό χώρο στην καρδιά της Πάτρας.",
    tagline: "Πάμε για νύχια;",
    introEyebrow: "Το σαλόνι",
    introTitle: "Ένας χώρος για να χαλαρώσεις",
    introText: "Στο NK Beauty Salon κάθε ραντεβού ξεκινά με μια κουβέντα. Επιλέγουμε μαζί σχήμα, απόχρωση και σχέδιο, και δουλεύουμε με υπομονή ώστε τα νύχια σου να μείνουν όμορφα για εβδομάδες.",
    servicesEyebrow: "Υπηρεσίες",
    servicesTitle: "Οι υπηρεσίες μας",
    servicesText: "Απλές, προσεγμένες και πάντα με αποστειρωμένα εργαλεία. Διάλεξε αυτό που θέλεις και ζήτησε ραντεβού.",
    seeAll: "Όλες οι υπηρεσίες",
    galleryEyebrow: "Instagram",
    galleryTitle: "Από το τραπέζι μας",
    galleryText: "Μερικά από τα αγαπημένα μας σχέδια. Περισσότερα καθημερινά στο Instagram.",
    ritualEyebrow: "Η εμπειρία",
    ritualTitle: "Το τελετουργικό NK",
    ritual: [
      { t: "Συζήτηση", d: "Ακούμε τι θέλεις και προτείνουμε σχήμα και απόχρωση που σου ταιριάζουν." },
      { t: "Φροντίδα", d: "Προετοιμασία με αποστειρωμένα εργαλεία και ήπια περιποίηση επωνυμιών." },
      { t: "Φινίρισμα", d: "Καθαρές γραμμές, λάμψη που κρατά και μια λεπτομέρεια που σε κάνει να χαμογελάς." },
    ],
    hoursTitle: "Ωράριο",
    weekdays: "Δευτέρα – Παρασκευή",
    weekend: "Σάββατο – Κυριακή",
    closed: "Κλειστά",
    findUs: "Βρες μας",
    openMap: "Άνοιγμα στον χάρτη",
    copy: "Αντιγραφή αριθμού",
    copied: "Ο αριθμός αντιγράφηκε",
    contactTitle: "Έλα να γνωριστούμε",
    contactText: "Κλείσε ραντεβού online, τηλεφώνησέ μας ή στείλε μας μήνυμα στο Instagram. Θα χαρούμε να σε φιλοξενήσουμε.",
    ctaTitle: "Έτοιμη για τα επόμενα νύχια σου;",
    ctaText: "Διάλεξε υπηρεσία και ώρα — εμείς σε καλούμε για επιβεβαίωση.",
    footer: "Με αγάπη για τη λεπτομέρεια, στην καρδιά της Πάτρας.",
    rights: "Με επιφύλαξη παντός δικαιώματος.",
    bookEyebrow: "Online ραντεβού",
    bookTitle: "Ζήτησε το ραντεβού σου",
    bookText: "Συμπλήρωσε τη φόρμα και θα σε καλέσουμε για να επιβεβαιώσουμε την ώρα.",
    step1: "Υπηρεσία",
    step2: "Ημέρα & ώρα",
    step3: "Τα στοιχεία σου",
    date: "Ημερομηνία",
    time: "Προτιμώμενη ώρα",
    weekendNote: "Σάββατο και Κυριακή είμαστε κλειστά — διάλεξε καθημερινή.",
    name: "Ονοματεπώνυμο",
    phone: "Τηλέφωνο",
    notes: "Σημειώσεις (προαιρετικό)",
    notesPh: "π.χ. σχέδιο που σου αρέσει, αφαίρεση παλιού ημιμόνιμου…",
    submit: "Αποστολή αιτήματος",
    required: "Συμπλήρωσε τα πεδία που λείπουν.",
    chooseService: "Διάλεξε τουλάχιστον μία υπηρεσία.",
    sentTitle: "Ευχαριστούμε!",
    sentText: "Λάβαμε το αίτημά σου. Θα σε καλέσουμε σύντομα για να επιβεβαιώσουμε το ραντεβού.",
    summary: "Σύνοψη",
    newRequest: "Νέο αίτημα",
    backHome: "Επιστροφή στην αρχική",
    orCall: "Βιάζεσαι; Πάρε μας τηλέφωνο",
  },
  en: {
    nav: { home: "Home", services: "Services", gallery: "Our Work", contact: "Contact", book: "Book" },
    book: "Book an appointment",
    request: "Request appointment",
    viewServices: "View services",
    call: "Call the salon",
    insta: "See us on Instagram",
    skipToContent: "Skip to content",
    scroll: "Scroll",
    heroEyebrow: "Beauty salon · Patras",
    heroTitleA: "Beauty",
    heroTitleB: "lives",
    heroTitleC: "in the details.",
    heroText: "Manicure, pedicure, artificial nails and waxing in a calm, light-filled space in the heart of Patras.",
    tagline: "Shall we do your nails?",
    introEyebrow: "The salon",
    introTitle: "A place to slow down",
    introText: "At NK Beauty Salon every appointment begins with a conversation. We choose shape, shade and design together, and work patiently so your nails stay beautiful for weeks.",
    servicesEyebrow: "Services",
    servicesTitle: "Our services",
    servicesText: "Simple, thoughtful and always with sterilised tools. Choose what you'd like and request an appointment.",
    seeAll: "All services",
    galleryEyebrow: "Instagram",
    galleryTitle: "From our table",
    galleryText: "A few of our favourite sets. Fresh work every day on Instagram.",
    ritualEyebrow: "The experience",
    ritualTitle: "The NK ritual",
    ritual: [
      { t: "Conversation", d: "We listen first, then suggest a shape and shade that suit you." },
      { t: "Care", d: "Preparation with sterilised tools and gentle cuticle care." },
      { t: "Finish", d: "Clean lines, a shine that lasts and one little detail that makes you smile." },
    ],
    hoursTitle: "Opening hours",
    weekdays: "Monday – Friday",
    weekend: "Saturday – Sunday",
    closed: "Closed",
    findUs: "Find us",
    openMap: "Open in maps",
    copy: "Copy number",
    copied: "Number copied",
    contactTitle: "Come and meet us",
    contactText: "Request an appointment online, give us a call, or send us a message on Instagram. We'd love to welcome you.",
    ctaTitle: "Ready for your next set?",
    ctaText: "Choose a service and a time — we'll call you to confirm.",
    footer: "With love for detail, in the heart of Patras.",
    rights: "All rights reserved.",
    bookEyebrow: "Online booking",
    bookTitle: "Request your appointment",
    bookText: "Fill in the form and we'll call you to confirm the time.",
    step1: "Service",
    step2: "Day & time",
    step3: "Your details",
    date: "Date",
    time: "Preferred time",
    weekendNote: "We're closed on Saturdays and Sundays — please choose a weekday.",
    name: "Full name",
    phone: "Phone",
    notes: "Notes (optional)",
    notesPh: "e.g. a design you love, removal of old gel polish…",
    submit: "Send request",
    required: "Please fill in the missing fields.",
    chooseService: "Please choose at least one service.",
    sentTitle: "Thank you!",
    sentText: "We've received your request. We'll call you shortly to confirm your appointment.",
    summary: "Summary",
    newRequest: "New request",
    backHome: "Back to home",
    orCall: "In a hurry? Give us a call",
  },
};

type L = { el: string; en: string };
export type ServiceItem = { id: string; name: L; text: L };
export type ServiceCategory = { id: string; icon: "hand" | "foot" | "nail" | "wax"; name: L; text: L; items: ServiceItem[] };

/* Service menu — confirm names with the salon before going live. */
export const SERVICES: ServiceCategory[] = [
  {
    id: "manicure",
    icon: "hand",
    name: { el: "Μανικιούρ", en: "Manicure" },
    text: { el: "Περιποίηση επωνυμιών, σχήμα και βερνίκι με διάρκεια.", en: "Cuticle care, shaping and long-lasting polish." },
    items: [
      { id: "classic-manicure", name: { el: "Κλασικό μανικιούρ", en: "Classic manicure" }, text: { el: "Λίμαρισμα, επωνυχίδες και απλό βερνίκι.", en: "Filing, cuticle care and regular polish." } },
      { id: "gel-manicure", name: { el: "Ημιμόνιμο μανικιούρ", en: "Gel polish manicure" }, text: { el: "Λάμψη και αντοχή για εβδομάδες.", en: "Shine and durability for weeks." } },
      { id: "strengthening", name: { el: "Ενδυνάμωση φυσικού νυχιού", en: "Natural nail strengthening" }, text: { el: "Βάση ενδυνάμωσης για λεπτά, εύθραυστα νύχια.", en: "A strengthening base for thin, brittle nails." } },
    ],
  },
  {
    id: "pedicure",
    icon: "foot",
    name: { el: "Πεδικιούρ", en: "Pedicure" },
    text: { el: "Απαλή φροντίδα για ξεκούραστα, περιποιημένα πόδια.", en: "Gentle care for soft, rested, polished feet." },
    items: [
      { id: "classic-pedicure", name: { el: "Κλασικό πεδικιούρ", en: "Classic pedicure" }, text: { el: "Καθαρισμός, σχήμα και απλό βερνίκι.", en: "Cleansing, shaping and regular polish." } },
      { id: "gel-pedicure", name: { el: "Ημιμόνιμο πεδικιούρ", en: "Gel polish pedicure" }, text: { el: "Τέλειο χρώμα που κρατά όλο το καλοκαίρι.", en: "Perfect colour that lasts all summer." } },
    ],
  },
  {
    id: "nails",
    icon: "nail",
    name: { el: "Τεχνητά νύχια", en: "Artificial nails" },
    text: { el: "Gel & ακρυλικό, French, nail art και λεπτομέρειες με κρύσταλλα.", en: "Gel & acrylic, French, nail art and crystal details." },
    items: [
      { id: "gel-extensions", name: { el: "Τεχνητά νύχια gel", en: "Gel extensions" }, text: { el: "Φυσικό αποτέλεσμα στο μήκος και σχήμα που θέλεις.", en: "A natural look in the length and shape you want." } },
      { id: "acrylic-extensions", name: { el: "Ακρυλικά νύχια", en: "Acrylic extensions" }, text: { el: "Ανθεκτικά και κομψά, για κάθε περίσταση.", en: "Strong and elegant, for every occasion." } },
      { id: "fill-in", name: { el: "Συντήρηση", en: "Fill-in" }, text: { el: "Ανανέωση της ανάπτυξης για άψογα νύχια.", en: "Refresh the regrowth for flawless nails." } },
      { id: "nail-art", name: { el: "Nail art & French", en: "Nail art & French" }, text: { el: "Σχέδια, πέρλες, κρύσταλλα και κλασικό French.", en: "Designs, pearls, crystals and the classic French." } },
    ],
  },
  {
    id: "waxing",
    icon: "wax",
    name: { el: "Αποτρίχωση", en: "Waxing" },
    text: { el: "Γρήγορα και με φροντίδα για το δέρμα.", en: "Quick and kind to your skin." },
    items: [
      { id: "wax-arms", name: { el: "Αποτρίχωση χεριών", en: "Arm waxing" }, text: { el: "Απαλό δέρμα με ήπιες κινήσεις.", en: "Smooth skin with a gentle touch." } },
      { id: "wax-legs", name: { el: "Αποτρίχωση ποδιών", en: "Leg waxing" }, text: { el: "Καθαρό αποτέλεσμα που διαρκεί.", en: "A clean result that lasts." } },
    ],
  },
];

export const ALL_ITEMS = SERVICES.flatMap((c) => c.items.map((i) => ({ ...i, category: c })));

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof dict)["el"] };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("el");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nk-lang");
      if (saved === "en" || saved === "el") setLangState(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("nk-lang", l);
    } catch {
      /* storage unavailable */
    }
  };
  return <I18nContext.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const c = useContext(I18nContext);
  if (!c) throw new Error("useI18n outside provider");
  return c;
}
