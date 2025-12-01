"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type LanguageCode = "RU" | "EN" | "DE";

const copy: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    columns: { project: string; projectHint: string; special: string; specialHint: string; contact: string; contactHint: string };
    button: string;
    mailSubject: string;
    thanks: string;
  }
> = {
  EN: {
    title: "Project / Concert Proposal",
    subtitle: "Tell Pavel about your idea — repertoire, venue, collaborators and timing.",
    columns: {
      project: "Project details",
      projectHint: "Repertoire, format, date, city/venue",
      special: "Special requests",
      specialHint: "Tech rider, staging ideas, collaborators",
      contact: "Contact",
      contactHint: "Name, email, phone or messenger",
    },
    button: "Send via email",
    mailSubject: "Project idea for Pavel",
    thanks: "We’ll open your email client with the details filled in.",
  },
  DE: {
    title: "Projekt- / Konzertvorschlag",
    subtitle: "Erzählen Sie Pavel von Ihrer Idee – Programm, Ort, Partner und Zeitplan.",
    columns: {
      project: "Projektdetails",
      projectHint: "Programm, Format, Datum, Stadt/Location",
      special: "Besondere Wünsche",
      specialHint: "Technical Rider, Bühnenideen, Mitwirkende",
      contact: "Kontakt",
      contactHint: "Name, E-Mail, Telefon oder Messenger",
    },
    button: "Per E-Mail senden",
    mailSubject: "Projektidee für Pavel",
    thanks: "Wir öffnen Ihr E-Mail-Programm mit den Angaben.",
  },
  RU: {
    title: "Предложение проекта / концерта",
    subtitle: "Опишите идею — программа, площадка, партнёры, сроки.",
    columns: {
      project: "Детали проекта",
      projectHint: "Репертуар, формат, дата, город/площадка",
      special: "Особые пожелания",
      specialHint: "Технический райдер, идеи по сцене, партнёры",
      contact: "Обратная связь",
      contactHint: "Имя, email, телефон или мессенджер",
    },
    button: "Отправить по email",
    mailSubject: "Проект для Павла",
    thanks: "Откроется ваш почтовый клиент с заполненными полями.",
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
  return value === "RU" || value === "EN" || value === "DE";
}

export default function CollaborationProposalPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialLang = useMemo(() => {
    const lang = searchParams.get("lang")?.toUpperCase() ?? null;
    return isLanguageCode(lang) ? lang : "EN";
  }, [searchParams]);

  const [active, setActive] = useState<LanguageCode>(initialLang);
  const [project, setProject] = useState("");
  const [special, setSpecial] = useState("");
  const [contact, setContact] = useState("");
  const [visible, setVisible] = useState(false);

  const t = copy[active];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
  }, []);

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const bodyLines = [
      `${t.columns.project}:`,
      project || "-",
      "",
      `${t.columns.special}:`,
      special || "-",
      "",
      `${t.columns.contact}:`,
      contact || "-",
    ];
    const mailto = `mailto:pavelkuznetsov.berlin@gmail.com?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
          {backgrounds.map((src, idx) => (
            <div
              key={src}
              className="relative overflow-hidden"
              style={{ animation: `fadeIn 1s ease ${idx * 70}ms both` }}
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/35 to-black/55" />
      </div>

      <div
        className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 transition duration-700 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="mb-6 flex gap-3">
          {(["EN", "DE", "RU"] as LanguageCode[]).map((lang) => {
            const activeBtn = lang === active;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => handleLanguageChange(lang)}
                aria-pressed={activeBtn}
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                  activeBtn
                    ? "border-white bg-white text-black shadow-[0_10px_40px_-30px_rgba(255,255,255,0.9)]"
                    : "border-white/40 text-white hover:border-white hover:bg-white/10"
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center space-y-6 text-center">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-zinc-200 shadow-[0_12px_50px_-40px_rgba(255,255,255,0.9)]">
            {t.title}
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{t.subtitle}</h1>
          <p className="text-lg text-zinc-200">{t.thanks}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm shadow-[0_24px_60px_-36px_rgba(0,0,0,0.8)]">
            <label className="text-sm uppercase tracking-[0.3em] text-zinc-300">
              {t.columns.project}
            </label>
            <textarea
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder={t.columns.projectHint}
              className="mt-3 h-40 w-full resize-none rounded-xl border border-white/20 bg-white/5 p-3 text-base text-white outline-none ring-0 transition focus:border-white/60 focus:bg-white/10"
            />
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm shadow-[0_24px_60px_-36px_rgba(0,0,0,0.8)]">
            <label className="text-sm uppercase tracking-[0.3em] text-zinc-300">
              {t.columns.special}
            </label>
            <textarea
              value={special}
              onChange={(e) => setSpecial(e.target.value)}
              placeholder={t.columns.specialHint}
              className="mt-3 h-40 w-full resize-none rounded-xl border border-white/20 bg-white/5 p-3 text-base text-white outline-none ring-0 transition focus:border-white/60 focus:bg-white/10"
            />
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm shadow-[0_24px_60px_-36px_rgba(0,0,0,0.8)]">
            <label className="text-sm uppercase tracking-[0.3em] text-zinc-300">
              {t.columns.contact}
            </label>
            <textarea
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={t.columns.contactHint}
              className="mt-3 h-40 w-full resize-none rounded-xl border border-white/20 bg-white/5 p-3 text-base text-white outline-none ring-0 transition focus:border-white/60 focus:bg-white/10"
            />
          </div>

          <div className="md:col-span-3 flex justify-center">
            <button
              type="submit"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/60 bg-white/10 px-10 py-4 text-lg font-semibold text-white shadow-[0_20px_80px_-45px_rgba(255,255,255,0.9)] transition hover:-translate-y-0.5 hover:border-white hover:bg-white/20"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-0 transition group-hover:opacity-100" />
              <span className="absolute inset-0 -z-10 blur-3xl bg-white/10" />
              <span className="relative">{t.button}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
