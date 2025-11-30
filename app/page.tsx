"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type LanguageCode = "RU" | "EN" | "DE";
type MenuEntry = { label: string; href?: string };

const biography: Record<LanguageCode, string[]> = {
  DE: [
    "Pavel Kuznetsov, geboren am 02.10.1992 in Emanjelinsk (Russland), erhielt mit sechs Jahren ersten Klavierunterricht und besuchte von 2000 bis 2009 die Spezialmusikschule in Tscheljabinsk.",
    "Ab 2006 nahm er regelmäßig an Wettbewerben teil und wurde mehrfach mit Stipendien ausgezeichnet. Von 2009 bis 2012 studierte er am Staatlichen Ural Music College Jekaterinburg, von 2012 bis 2017 an der Universität der Künste Berlin. Mit 15 Jahren debütierte er als Solist.",
    "Seit 2014 tritt er regelmäßig in Berlin auf, widmet sich außerdem der Kammermusik und dem Jazz. Von 2019 bis 2021 war er Ballettrepetitor und Pianist an den Theatern Chemnitz. In der Spielzeit 21/22 begleitete er den Ballettabend „Love me or leave me“, 22/23 „Winterreise“ von Franz Schubert.",
    "Neben seiner Klaviertätigkeit komponiert Pavel neue Musik für Klavier.",
    "„Seine Klavierwerke beruhen auf der klassischen Schule, erweitert um spätromantische Farben und eine Prise Minimalismus – ein Versuch, Neues für das Klavier zu schaffen und zugleich die Tradition zu bewahren.“",
  ],
  EN: [
    "Pavel Kuznetsov was born on 02.10.1992 in Emanjelinsk, Russia. He began piano lessons at six and studied from 2000 to 2009 at the special music school in Chelyabinsk.",
    "From 2006 he regularly entered competitions and received several scholarships. He continued at the State Ural Music College in Yekaterinburg (2009–2012) and studied at the Berlin University of the Arts (2012–2017). He made his solo debut at fifteen.",
    "Since 2014 he has given regular concerts in Berlin and also focuses on chamber music and jazz. From 2019 to 2021 he worked as ballet repetiteur and pianist at Theaters Chemnitz. In the 21/22 season he played the ballet evening “Love me or leave me,” and in 22/23 Schubert’s “Winterreise.”",
    "Alongside performing, Pavel composes new music for piano.",
    "“His piano works stand on a classical foundation, colored by late Romantic harmony and a touch of minimalism — an attempt to create something new for the instrument while honoring tradition.”",
  ],
  RU: [
    "Павел Кузнецов родился 02.10.1992 в Еманжелинске (Россия). Начал заниматься фортепиано в шесть лет и учился в специализированной музыкальной школе Челябинска с 2000 по 2009 год.",
    "С 2006 года регулярно участвовал в конкурсах и получал стипендии. Продолжил обучение в Государственном Уральском музыкальном колледже Екатеринбурга (2009–2012), затем в Берлинском университете искусств (2012–2017). В пятнадцать лет дебютировал как солист.",
    "С 2014 года регулярно выступает в Берлине, уделяет внимание камерной музыке и джазу. В 2019–2021 годах был концертмейстером балета и пианистом в театрах Хемница. В сезоне 21/22 аккомпанировал балетному вечеру «Love me or leave me», в 22/23 — «Winterreise» Франца Шуберта.",
    "Помимо концертной деятельности Павел сочиняет новую музыку для фортепиано.",
    "«Его пьесы опираются на классическую школу, дополнены позднеромантическими красками и оттенком минимализма — попытка создавать новое для фортепиано, сохраняя традицию.»",
  ],
};

const menuItems: Record<LanguageCode, MenuEntry[]> = {
  DE: [
    { label: "Pavel Kuznetsov – Pianist" },
    { label: "Pavel Kuznetsov – Komponist", href: "/composer" },
    { label: "Pavel Kuznetsov – Produzent", href: "https://www.pavelsmusic.com" },
    { label: "Pavel Kuznetsov – Andere", href: "/rapper" },
    { label: "Zusammenarbeit" },
    { label: "Kontakt zu Pavel Kuznetsov" },
    { label: "Unterstütze Pavel Kuznetsov" },
  ],
  EN: [
    { label: "Pavel Kuznetsov – Pianist" },
    { label: "Pavel Kuznetsov – Composer", href: "/composer" },
    { label: "Pavel Kuznetsov – Producer", href: "https://www.pavelsmusic.com" },
    { label: "Pavel Kuznetsov – Other", href: "/rapper" },
    { label: "Collaboration" },
    { label: "Contact Pavel Kuznetsov" },
    { label: "Support Pavel Kuznetsov" },
  ],
  RU: [
    { label: "Павел Кузнецов — Пианист" },
    { label: "Павел Кузнецов — Композитор", href: "/composer" },
    { label: "Павел Кузнецов — Продюсер", href: "https://www.pavelsmusic.com" },
    { label: "Павел Кузнецов — Другое", href: "/rapper" },
    { label: "Сотрудничество" },
    { label: "Связаться с Павлом Кузнецовым" },
    { label: "Поддержать Павла Кузнецова" },
  ],
};

const languages: { code: LanguageCode; label: string }[] = [
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
  { code: "RU", label: "Русский" },
];

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "RU" || value === "EN" || value === "DE";
}

function HomeContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initialLang = useMemo(() => {
    const lang = searchParams.get("lang")?.toUpperCase() ?? null;
    return isLanguageCode(lang) ? lang : "EN";
  }, [searchParams]);

  const [active, setActive] = useState<LanguageCode>(initialLang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<number, boolean>>({});
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const paragraphs = biography[active];
  const menu = menuItems[active];
  const photos = useMemo(() => ["/pavel-1.jpg", "/pavel-1-rotated.jpg", "/pavel-3.jpg"], []);

  useEffect(() => {
    const lang = searchParams.get("lang")?.toUpperCase() ?? null;
    if (isLanguageCode(lang) && lang !== active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(lang);
    }
  }, [searchParams, active]);

  const handleLanguageChange = (lang: LanguageCode) => {
    setActive(lang);
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang.toLowerCase());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const bioChunks = useMemo(() => {
    const perSection = Math.ceil(paragraphs.length / 3);
    const chunks: string[][] = [];
    for (let i = 0; i < paragraphs.length; i += perSection) {
      chunks.push(paragraphs.slice(i, i + perSection));
    }
    while (chunks.length < 3) {
      chunks.push([]);
    }
    return chunks.slice(0, 3);
  }, [paragraphs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-section"));
          if (entry.isIntersecting) {
            setVisibleSections((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [bioChunks]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        aria-controls="pavel-menu"
        className="fixed left-1/2 top-6 z-30 flex h-20 w-32 -translate-x-1/2 items-center justify-center overflow-hidden rounded-xl shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)] transition hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.7)]"
      >
        <span className="sr-only">Toggle menu</span>
        <div className="relative h-full w-full">
          <div className="absolute inset-x-3 bottom-8 grid h-9 grid-cols-10 gap-1.5">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded bg-white/90 text-black shadow-[inset_0_-2px_4px_rgba(0,0,0,0.35)]"
              >
                <div className="absolute inset-x-0 top-0 h-[35%] bg-white/65" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/25 to-transparent" />
          </div>
          <div className="absolute inset-x-0 top-3 flex justify-center">
            <div className="flex gap-2">
              {[18, 22, 14].map((w, idx) => (
                <div
                  key={idx}
                  className="rounded bg-zinc-100/85 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.35)]"
                  style={{ width: `${w}px`, height: "24px" }}
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 -bottom-1 flex justify-center">
            <span className="text-sm uppercase tracking-[0.4em] text-white/85">
              Menu
            </span>
          </div>
        </div>
      </button>

      <div
        className={`fixed inset-0 z-20 transition duration-500 ${
          menuOpen ? "pointer-events-auto bg-black/60 backdrop-blur-sm" : "pointer-events-none bg-black/0"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          id="pavel-menu"
          className={`absolute left-0 top-0 h-full w-80 max-w-[80vw] border-r border-white/15 bg-black/90 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] transition-transform duration-500 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Menu</p>
          <ul className="mt-6 space-y-4 text-lg leading-relaxed text-zinc-100">
            {menu.map((item) => {
              const href = item.href?.startsWith("/")
                ? `${item.href}?lang=${active.toLowerCase()}`
                : item.href;
              const isExternal = href?.startsWith("http");

              return (
                <li key={item.label} className="border-b border-white/10 pb-3">
                  {href ? (
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer noopener" : undefined}
                      className="transition hover:text-white hover:underline"
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <main className="relative z-10">
        <section className="relative w-full overflow-hidden">
          <div className="relative w-full min-h-screen md:min-h-[140vh]">
            <Image
              src="/pavel-main.jpg"
              alt="Pavel Kuznetsov portrait"
              fill
              priority
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_50%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />

            <div className="relative z-10 flex h-full flex-col justify-between px-6 py-10">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.55em] text-zinc-300">Pianist</p>
                  <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Pavel Kuznetsov</h1>
                  <p className="text-lg text-zinc-200">Pianist & Composer</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-24">
                  {languages.map((lang) => {
                    const activeBtn = lang.code === active;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleLanguageChange(lang.code)}
                        aria-pressed={activeBtn}
                        className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                          activeBtn
                            ? "border-white bg-white text-black shadow-[0_10px_40px_-30px_rgba(255,255,255,0.9)]"
                            : "border-white/40 text-white hover:border-white hover:bg-white/10"
                        }`}
                      >
                        {lang.code}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-[minmax(280px,340px)_minmax(320px,1fr)] items-end pb-8">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-zinc-300">Performance</p>
                  <p className="text-lg text-zinc-100">
                    Solo, chamber music, ballet collaborations and original compositions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {bioChunks.map((chunk, index) => {
          const photoSrc = photos[index] ?? photos[0];
          const alignRight = index % 2 === 1;
          const visible = visibleSections[index];

          return (
            <section
              key={photoSrc}
              data-section={index}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className="relative w-full overflow-hidden bg-black"
            >
              <div className="relative w-full min-h-[90vh] md:min-h-[110vh]">
                <Image
                  src={photoSrc}
                  alt={`Pavel Kuznetsov portrait ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_50%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/80" />

                <div
                  className={`absolute bottom-10 left-6 right-6 md:bottom-16 md:left-12 md:right-12 lg:max-w-3xl ${
                    alignRight ? "md:ml-auto" : ""
                  }`}
                >
                  <div
                    className={`rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.9)] backdrop-blur transition duration-700 ease-out ${
                      visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
                    }`}
                  >
                    <p className="text-sm uppercase tracking-[0.35em] text-zinc-300">Biography</p>
                    <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-100">
                      {chunk.map((para) => (
                        <p key={para}>{para}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
