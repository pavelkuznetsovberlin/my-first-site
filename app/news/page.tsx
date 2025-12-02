"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GlobalMenu from "../components/GlobalMenu";
import LanguageSwitcher, { LanguageCode } from "../components/LanguageSwitcher";
import MatrixReveal from "../components/MatrixReveal";

type NewsCard = {
  id: string;
  image: string;
  copy: Record<LanguageCode, { title: string; summary: string; tag: string; date: string }>;
};

const newsCopy: Record<LanguageCode, { title: string; subtitle: string; note: string }> = {
  EN: {
    title: "News",
    subtitle: "Updates from the stage, studio, and tours.",
    note: "Fresh posts will appear here — check back for new dates, releases, and stories.",
  },
  DE: {
    title: "Neuigkeiten",
    subtitle: "Aktuelles von Bühne, Studio und unterwegs.",
    note: "Neue Beiträge landen hier – Termine, Releases und Geschichten.",
  },
  RU: {
    title: "Новости",
    subtitle: "Сцена, студия, гастроли — что происходит сейчас.",
    note: "Здесь будут новые записи: даты, релизы и истории.",
  },
  IT: {
    title: "Notizie",
    subtitle: "Aggiornamenti da palco, studio e tour.",
    note: "Qui appariranno i nuovi post: date, uscite e storie.",
  },
};

const newsCards: NewsCard[] = [
  {
    id: "berlin-sessions",
    image: "/pavel-1-rotated.jpg",
    copy: {
      EN: { title: "Berlin night sessions", summary: "Recording late-night takes for the next piano cycle.", tag: "Studio", date: "Feb 2025" },
      DE: { title: "Nacht-Sessions in Berlin", summary: "Späte Aufnahmen für den nächsten Klavierzyklus.", tag: "Studio", date: "Feb 2025" },
      RU: { title: "Ночные сессии в Берлине", summary: "Записываю ночные тейки для нового цикла.", tag: "Студия", date: "Фев 2025" },
      IT: { title: "Sessioni notturne a Berlino", summary: "Take notturne per il prossimo ciclo pianistico.", tag: "Studio", date: "Feb 2025" },
    },
  },
  {
    id: "chemnitz-return",
    image: "/pavel-main.jpg",
    copy: {
      EN: { title: "Return to Chemnitz", summary: "Rehearsing with ballet company for a spring program.", tag: "Live", date: "Mar 2025" },
      DE: { title: "Zurück in Chemnitz", summary: "Proben mit dem Ballettensemble für das Frühlingsprogramm.", tag: "Live", date: "Mär 2025" },
      RU: { title: "Возвращение в Хемниц", summary: "Репетиции с балетной труппой к весенней программе.", tag: "Сцена", date: "Март 2025" },
      IT: { title: "Ritorno a Chemnitz", summary: "Prove con la compagnia di balletto per il programma di primavera.", tag: "Live", date: "Mar 2025" },
    },
  },
  {
    id: "new-score",
    image: "/composer-1.jpg",
    copy: {
      EN: { title: "New score draft", summary: "Sketching a minimalist étude inspired by city rhythms.", tag: "Writing", date: "Apr 2025" },
      DE: { title: "Neuer Partitur-Entwurf", summary: "Skizze einer minimalistischen Etüde, inspiriert von Stadtrhythmen.", tag: "Komposition", date: "Apr 2025" },
      RU: { title: "Новая партитура", summary: "Набрасываю минималистическое этюдное ядро в ритме города.", tag: "Пишу", date: "Апр 2025" },
      IT: { title: "Bozza di nuova partitura", summary: "Abbozzo un étude minimalista ispirato ai ritmi della città.", tag: "Scrittura", date: "Apr 2025" },
    },
  },
];

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "RU" || value === "EN" || value === "DE" || value === "IT";
}

export default function NewsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialLang = useMemo(() => {
    const lang = searchParams.get("lang")?.toUpperCase() ?? null;
    return isLanguageCode(lang) ? lang : "EN";
  }, [searchParams]);

  const [active, setActive] = useState<LanguageCode>(initialLang);
  const [ready, setReady] = useState(false);
  const t = newsCopy[active];

  useEffect(() => {
    const lang = searchParams.get("lang")?.toUpperCase() ?? null;
    if (isLanguageCode(lang) && lang !== active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(lang);
    }
  }, [searchParams, active]);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (lang: LanguageCode) => {
    setActive(lang);
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang.toLowerCase());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <GlobalMenu activeLang={active} />
      <LanguageSwitcher active={active} onChange={handleLanguageChange} />

      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(130,255,198,0.16),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(120,188,255,0.14),transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
      </div>

      <main className="relative z-10 px-6 py-12 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <MatrixReveal active={ready} variant="card">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-8 shadow-[0_30px_90px_-60px_rgba(0,0,0,1)] backdrop-blur">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-300/15 blur-3xl" />
              <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl" />
              <div className="relative space-y-3">
                <p className="text-xs uppercase tracking-[0.45em] text-zinc-300">{t.title}</p>
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{t.subtitle}</h1>
                <p className="text-lg text-zinc-200">{t.note}</p>
              </div>
            </div>
          </MatrixReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsCards.map((item, idx) => {
              const copy = item.copy[active];
              return (
                <MatrixReveal key={item.id} active={ready} className="h-full" variant="card">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/5 shadow-[0_24px_70px_-55px_rgba(0,0,0,0.9)] transition hover:-translate-y-1 hover:border-white/35 hover:bg-white/10">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={copy.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-105"
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 90vw"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/85 backdrop-blur">
                        {copy.tag}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <div className="text-sm uppercase tracking-[0.3em] text-zinc-400">{copy.date}</div>
                      <h2 className="text-xl font-semibold leading-snug text-white">{copy.title}</h2>
                      <p className="text-sm leading-relaxed text-zinc-200">{copy.summary}</p>
                      <div className="mt-auto flex items-center gap-2 text-sm font-medium text-emerald-200/90">
                        <span>+</span>
                        <span>
                          {active === "EN"
                            ? "More soon"
                            : active === "DE"
                              ? "Mehr bald"
                              : active === "RU"
                                ? "Скоро больше"
                                : "Altro presto"}
                        </span>
                      </div>
                    </div>
                  </article>
                </MatrixReveal>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
