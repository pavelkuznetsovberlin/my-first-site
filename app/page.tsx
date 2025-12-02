"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GlobalMenu from "./components/GlobalMenu";
import LanguageSwitcher, { LanguageCode } from "./components/LanguageSwitcher";
import MatrixReveal from "./components/MatrixReveal";

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
  IT: [
    "Pavel Kuznetsov è nato il 02.10.1992 a Emanjelinsk (Russia). Ha iniziato il pianoforte a sei anni e ha studiato dal 2000 al 2009 alla scuola musicale speciale di Čeljabinsk.",
    "Dal 2006 ha partecipato regolarmente a concorsi e ha ricevuto diverse borse di studio. Ha proseguito al State Ural Music College di Ekaterinburg (2009–2012) e poi all'Università delle Arti di Berlino (2012–2017). Ha debuttato da solista a quindici anni.",
    "Dal 2014 tiene concerti regolari a Berlino e si dedica anche alla musica da camera e al jazz. Nel 2019–2021 è stato maestro collaboratore di balletto e pianista ai teatri di Chemnitz. Nella stagione 21/22 ha accompagnato il balletto “Love me or leave me”, nel 22/23 “Winterreise” di Franz Schubert.",
    "Oltre all'attività concertistica, Pavel compone nuova musica per pianoforte.",
    "“Le sue opere per pianoforte poggiano sulla scuola classica, arricchita da colori tardo-romantici e un tocco di minimalismo — un tentativo di creare qualcosa di nuovo per lo strumento mantenendo viva la tradizione.”",
  ],
};

const homeCopy: Record<
  LanguageCode,
  { role: string; tagline: string; performance: string; performanceDesc: string; bioLabel: string }
> = {
  EN: {
    role: "Pianist",
    tagline: "Pianist & Composer",
    performance: "Performance",
    performanceDesc: "Solo, chamber music, ballet collaborations and original compositions.",
    bioLabel: "Biography",
  },
  DE: {
    role: "Pianist",
    tagline: "Pianist & Komponist",
    performance: "Auftritte",
    performanceDesc: "Solo, Kammermusik, Ballett-Kollaborationen und eigene Kompositionen.",
    bioLabel: "Biografie",
  },
  RU: {
    role: "Пианист",
    tagline: "Пианист и композитор",
    performance: "Выступления",
    performanceDesc: "Соло, камерная музыка, сотрудничество с балетом и собственные сочинения.",
    bioLabel: "Биография",
  },
  IT: {
    role: "Pianista",
    tagline: "Pianista e compositore",
    performance: "Performance",
    performanceDesc: "Recital, musica da camera, collaborazioni con balletto e composizioni originali.",
    bioLabel: "Biografia",
  },
};

const footerCopy: Record<LanguageCode, string> = {
  EN: "All rights reserved.",
  DE: "Alle Rechte vorbehalten.",
  RU: "Все права защищены.",
  IT: "Tutti i diritti riservati.",
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "RU" || value === "EN" || value === "DE" || value === "IT";
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
  const [visibleSections, setVisibleSections] = useState<Record<number, boolean>>({});
  const [heroVisible, setHeroVisible] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const paragraphs = biography[active];
  const photos = useMemo(() => ["/pavel-1.jpg", "/pavel-1-rotated.jpg", "/pavel-3.jpg"], []);
  const footerText = footerCopy[active];
  const copy = homeCopy[active];

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

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <GlobalMenu activeLang={active} />
      <LanguageSwitcher active={active} onChange={handleLanguageChange} />

      <main className="relative z-10">
        <section className="relative w-full overflow-hidden">
          <MatrixReveal active={heroVisible} variant="full">
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
                    <p className="text-xs uppercase tracking-[0.55em] text-zinc-300">{copy.role}</p>
                    <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Pavel Kuznetsov</h1>
                    <p className="text-lg text-zinc-200">{copy.tagline}</p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-[minmax(280px,340px)_minmax(320px,1fr)] items-end pb-8">
                  <div className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.35em] text-zinc-300">{copy.performance}</p>
                    <p className="text-lg text-zinc-100">{copy.performanceDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </MatrixReveal>
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
              <MatrixReveal active={!!visible} variant="full">
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
                    <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.9)] backdrop-blur">
                      <p className="text-sm uppercase tracking-[0.35em] text-zinc-300">{copy.bioLabel}</p>
                      <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-100">
                        {chunk.map((para) => (
                          <p key={para}>{para}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </MatrixReveal>
            </section>
          );
        })}
        <footer className="bg-black px-6 py-10 text-center text-sm text-zinc-400">
          {footerText}
        </footer>
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
