"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GlobalMenu from "../components/GlobalMenu";
import LanguageSwitcher, { LanguageCode } from "../components/LanguageSwitcher";
type StreamingLink = { label: string; href: string };

const headings: Record<LanguageCode, string> = {
  DE: "Aqqquamarin, Hobby-Rapper für echte Kenner.",
  EN: "Aqqquamarin, hobby rapper for true connoisseurs.",
  RU: "Aqqquamarin, хобби-рэпер для настоящих ценителей.",
  IT: "Aqqquamarin, rapper per veri intenditori.",
};

const streamingTitle: Record<LanguageCode, string> = {
  DE: "Jetzt streamen",
  EN: "Listen on streaming",
  RU: "Слушать на платформах",
  IT: "Ascolta sulle piattaforme",
};

const streamingLinks: StreamingLink[] = [
  { label: "Apple Music", href: "https://music.apple.com/de/artist/aqqquamarin/1771376151" },
  { label: "Spotify", href: "https://open.spotify.com/artist/5vNwXs9ZIs6EOWtD00mvFP?si=E7WQKjjuQTiqbtl_DnTeqg" },
  { label: "YouTube Music", href: "https://music.youtube.com/channel/UCrfgRPRjC0drbjrokWxsd9w?si=FOQ1D3v7ta2Rgb_D" },
  { label: "Deezer", href: "https://link.deezer.com/s/31KFec3DjWSGAm3qYZfmA" },
  { label: "Amazon Music", href: "https://music.amazon.de/artists/B0DJWQS9F1/aqqquamarin" },
];

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "RU" || value === "EN" || value === "DE" || value === "IT";
}

export default function RapperClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialLang = useMemo(() => {
    const lang = searchParams.get("lang")?.toUpperCase() ?? null;
    return isLanguageCode(lang) ? lang : "EN";
  }, [searchParams]);

  const [active, setActive] = useState<LanguageCode>(initialLang);

  useEffect(() => {
    const nextLang = searchParams.get("lang")?.toUpperCase() ?? null;
    if (isLanguageCode(nextLang) && nextLang !== active) {
      // Sync language with URL param when it changes.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(nextLang);
    }
  }, [searchParams, active]);

  const heading = headings[active];
  const streamHeading = streamingTitle[active];

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
        <div className="relative w-full min-h-screen md:min-h-[135vh]">
          <Image
            src="/rapper.jpg"
            alt="Pavel Kuznetsov rapper portrait"
            fill
            priority
            className="object-contain"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(68,255,213,0.22),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(68,255,213,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/80" />

            <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8">
              <div className="mb-4 max-w-4xl space-y-4">
                <p className="text-xs uppercase tracking-[0.5em] text-zinc-300">Aqqquamarin</p>
                <h1 className='font-["Snell_Roundhand",cursive] text-3xl font-semibold italic leading-tight drop-shadow-[0_12px_45px_rgba(0,0,0,0.65)] sm:text-4xl md:text-6xl'>
                  {heading}
                </h1>
              </div>
            </div>
        </div>
      </section>

      <section className="relative z-10 bg-black px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-2xl border border-emerald-200/20 bg-emerald-200/5 p-6 shadow-[0_20px_70px_-40px_rgba(0,255,200,0.5)]">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-200/80">{streamHeading}</p>
            <h2 className="text-2xl font-semibold text-emerald-100">Aqqquamarin</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {streamingLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center justify-between rounded-xl border border-emerald-200/25 bg-emerald-200/5 px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:border-emerald-200/60 hover:bg-emerald-200/10"
              >
                <span className="font-medium">{link.label}</span>
                <span className="text-emerald-200/80 transition group-hover:text-emerald-100">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
