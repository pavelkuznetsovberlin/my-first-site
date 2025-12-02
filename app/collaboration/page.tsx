"use client";

import Image from "next/image";
import { Suspense, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GlobalMenu from "../components/GlobalMenu";
import LanguageSwitcher, { LanguageCode } from "../components/LanguageSwitcher";

const languageCopy: Record<
  LanguageCode,
  { title: string; subtitle: string; button: string; note: string }
> = {
  EN: {
    title: "Collaboration",
    subtitle: "Commissions, concerts, cross-genre ideas — let's build something together.",
    button: "Propose project/concert",
    note: "Write a short idea; Pavel will get back to you.",
  },
  DE: {
    title: "Zusammenarbeit",
    subtitle: "Auftragswerke, Konzerte, Genre-Grenzgänge — lass uns etwas gemeinsam gestalten.",
    button: "Projekt/Konzert vorschlagen",
    note: "Schick eine kurze Idee, Pavel meldet sich zurück.",
  },
  RU: {
    title: "Сотрудничество",
    subtitle: "Заказы, концерты, смелые коллаборации — давайте создадим это вместе.",
    button: "Предложить проект/концерт",
    note: "Опишите идею кратко — Павел свяжется с вами.",
  },
  IT: {
    title: "Collaborazione",
    subtitle: "Commissioni, concerti, idee crossover — costruiamo qualcosa insieme.",
    button: "Proponi progetto/concerto",
    note: "Scrivi un'idea breve: Pavel ti ricontatterà.",
  },
};

const backgrounds = [
  "/pavel-main.jpg",
  "/pavel-1.jpg",
  "/pavel-1-rotated.jpg",
  "/pavel-2.jpg",
  "/pavel-3.jpg",
  "/composer-1.jpg",
  "/composer-2.jpg",
  "/composer-3.jpg",
  "/pavel-portrait.jpg",
];

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "RU" || value === "EN" || value === "DE" || value === "IT";
}

function CollaborationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialLang = useMemo(() => {
    const lang = searchParams.get("lang")?.toUpperCase() ?? null;
    return isLanguageCode(lang) ? lang : "EN";
  }, [searchParams]);

  const [active, setActive] = useState<LanguageCode>(initialLang);
  const copy = languageCopy[active];
  const hrefWithLang = `/collaboration/propose?lang=${active.toLowerCase()}`;

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
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black" />
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
          {backgrounds.map((src, idx) => (
            <div
              key={src}
              className="relative overflow-hidden"
              style={{ animation: `fadeIn 1s ease ${idx * 80}ms both` }}
            >
              <Image
                src={src}
                alt="Pavel Kuznetsov"
                fill
                className="object-cover"
                sizes="33vw"
                priority={idx < 3}
              />
              <div className="absolute inset-0 bg-black/45 mix-blend-multiply" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/35 to-black/50" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-14 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-zinc-200 shadow-[0_12px_50px_-40px_rgba(255,255,255,0.9)]">
            {copy.title}
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{copy.subtitle}</h1>
          <p className="text-lg text-zinc-200">{copy.note}</p>
          <div className="flex justify-center">
            <a
              href={hrefWithLang}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/60 bg-white/10 px-8 py-4 text-lg font-semibold text-white shadow-[0_20px_80px_-45px_rgba(255,255,255,0.9)] transition hover:-translate-y-0.5 hover:border-white hover:bg-white/20"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-0 transition group-hover:opacity-100" />
              <span className="absolute inset-0 -z-10 blur-3xl bg-white/10" />
              <span className="relative">{copy.button}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollaborationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
          Loading...
        </div>
      }
    >
      <CollaborationContent />
    </Suspense>
  );
}
