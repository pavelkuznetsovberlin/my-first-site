"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GlobalMenu from "../components/GlobalMenu";
import LanguageSwitcher, { LanguageCode } from "../components/LanguageSwitcher";

const composerBio: Record<LanguageCode, string[]> = {
  DE: [
    "Pavel Kuznetsov schreibt Klaviermusik, die zwischen klassischer Schule, spätromantischen Farben und einer Prise Minimalismus balanciert.",
    "Seine Stücke entstehen oft aus Improvisation: ein Motiv, ein unerwarteter Akkord, daraus wächst ein dramaturgischer Bogen.",
    "Aktuell arbeitet Pavel an einem Zyklus Miniaturen, die den Dialog zwischen Tanz und Klavier ausloten.",
  ],
  EN: [
    "Pavel Kuznetsov composes piano music rooted in classical training, colored by late-Romantic harmony and a hint of minimalism.",
    "Many pieces start from improvisation: a motif, a surprising chord, then a narrative arc unfolds.",
    "He is currently writing a cycle of miniatures exploring the dialogue between dance and piano.",
  ],
  RU: [
    "Павел Кузнецов сочиняет музыку для фортепиано, соединяя классическую школу, позднеромантическое звучание и лёгкий минимализм.",
    "Часто пьесы рождаются из импровизации: мотив, неожиданный аккорд, затем выстраивается драматургия.",
    "Сейчас Павел работает над циклом миниатюр о диалоге танца и фортепиано.",
  ],
  IT: [
    "Pavel Kuznetsov compone musica per pianoforte radicata nella formazione classica, colorata da armonie tardo-romantiche e un tocco di minimalismo.",
    "Molti brani nascono dall'improvvisazione: un motivo, un accordo sorprendente, poi prende forma un arco narrativo.",
    "Sta scrivendo un ciclo di miniature che esplora il dialogo tra danza e pianoforte.",
  ],
};

const streamingLinks = [
  { label: "Apple Music", href: "https://music.apple.com/de/artist/pavel-kuznetsov/517103521" },
  { label: "Spotify", href: "https://open.spotify.com/artist/2ymvYOtD6YEAGs8DouERyh?si=M3cvt-a-TTSOj-R9EaNHRg" },
  { label: "YouTube Music", href: "https://music.youtube.com/channel/UCkLsGBKqaPFVmAQDtG9R1vw?si=gbs8YepllMuOVZvg" },
  { label: "Amazon Music", href: "https://music.amazon.de/artists/B007S0JZVU/pavel-kuznetsov" },
  { label: "Deezer", href: "https://link.deezer.com/s/31LfbzKKnd2ZJvfEem0iR" },
];

const streamingCaption: Record<LanguageCode, string> = {
  EN: "Listen on every platform:",
  DE: "Auf allen Plattformen hören:",
  RU: "Слушать на всех площадках:",
  IT: "Ascolta su tutte le piattaforme:",
};

const composerCopy: Record<LanguageCode, { role: string; tagline: string; card: string }> = {
  EN: { role: "Composer", tagline: "Pianist & Composer", card: "Composer" },
  DE: { role: "Komponist", tagline: "Pianist & Komponist", card: "Komponist" },
  RU: { role: "Композитор", tagline: "Пианист и композитор", card: "Композитор" },
  IT: { role: "Compositore", tagline: "Pianista e compositore", card: "Compositore" },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "RU" || value === "EN" || value === "DE" || value === "IT";
}

export default function ComposerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialLang = useMemo(() => {
    const lang = searchParams.get("lang")?.toUpperCase() ?? null;
    return isLanguageCode(lang) ? lang : "EN";
  }, [searchParams]);

  const [active, setActive] = useState<LanguageCode>(initialLang);
  const [visibleSections, setVisibleSections] = useState<Record<number, boolean>>({});
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const paragraphs = composerBio[active];
  const photos = useMemo(() => ["/composer-1.jpg", "/composer-2.jpg", "/composer-3.jpg"], []);
  const copy = composerCopy[active];

  useEffect(() => {
    const lang = searchParams.get("lang")?.toUpperCase() ?? null;
    if (isLanguageCode(lang) && lang !== active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(lang);
    }
  }, [searchParams, active]);

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
  }, [photos]);

  const handleLanguageChange = (lang: LanguageCode) => {
    setActive(lang);
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang.toLowerCase());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <GlobalMenu activeLang={active} />
      <LanguageSwitcher active={active} onChange={handleLanguageChange} />
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-screen md:min-h-[140vh]">
          <Image
            src={photos[0]}
            alt="Pavel Kuznetsov composer portrait"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />

          <div className="relative z-10 flex h-full flex-col justify-between px-6 pt-16 pb-10 md:pt-24 md:pb-12">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">Pavel Kuznetsov</h1>
                <p className="text-base text-zinc-200 sm:text-lg">{copy.tagline}</p>
                <p className="mt-6 text-sm text-zinc-200">{streamingCaption[active]}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {streamingLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/60 hover:bg-white/15"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {paragraphs.map((para, index) => {
        const visible = visibleSections[index];
        const photoSrc = photos[(index + 1) % photos.length];
        const alignRight = index % 2 === 1;

        return (
          <section
            key={para}
            data-section={index}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className="relative w-full overflow-hidden bg-black"
          >
            <div className="relative w-full min-h-[85vh] md:min-h-[110vh]">
              <Image
                src={photoSrc}
                alt="Pavel Kuznetsov composer"
                fill
                className="object-contain md:object-cover"
                style={{ objectPosition: "center top" }}
                priority={index === 0}
              />
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
                  <p className="text-sm uppercase tracking-[0.35em] text-zinc-300">{copy.card}</p>
                  <p className="mt-4 text-base leading-relaxed text-zinc-100">{para}</p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
