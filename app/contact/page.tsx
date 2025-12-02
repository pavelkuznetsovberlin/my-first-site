"use client";

import Image from "next/image";
import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GlobalMenu from "../components/GlobalMenu";
import LanguageSwitcher, { LanguageCode } from "../components/LanguageSwitcher";

const copy: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    fields: { name: string; email: string; message: string };
    placeholder: { name: string; email: string; message: string };
    button: string;
    thanks: string;
    subject: string;
  }
> = {
  EN: {
    title: "Contact",
    subtitle: "Write a short note — Pavel will read it personally.",
    fields: { name: "Name", email: "Email", message: "Message" },
    placeholder: {
      name: "Your name / organization",
      email: "you@example.com",
      message: "What would you like to discuss?",
    },
    button: "Send to Pavel",
    thanks: "We’ll open your email app with the details filled in.",
    subject: "Message for Pavel Kuznetsov",
  },
  DE: {
    title: "Kontakt",
    subtitle: "Schreib eine kurze Nachricht – Pavel liest sie persönlich.",
    fields: { name: "Name", email: "E-Mail", message: "Nachricht" },
    placeholder: {
      name: "Ihr Name / Organisation",
      email: "sie@example.com",
      message: "Worum geht es?",
    },
    button: "An Pavel senden",
    thanks: "Wir öffnen Ihr E-Mail-Programm mit den Angaben.",
    subject: "Nachricht an Pavel Kuznetsov",
  },
  RU: {
    title: "Связаться",
    subtitle: "Напишите короткое сообщение — Павел прочитает его лично.",
    fields: { name: "Имя", email: "Email", message: "Сообщение" },
    placeholder: {
      name: "Ваше имя / организация",
      email: "you@example.com",
      message: "О чём хотите поговорить?",
    },
    button: "Отправить Павлу",
    thanks: "Откроется ваш почтовый клиент с заполненными полями.",
    subject: "Сообщение для Павла Кузнецова",
  },
  IT: {
    title: "Contatti",
    subtitle: "Scrivi un breve messaggio — Pavel lo leggerà personalmente.",
    fields: { name: "Nome", email: "Email", message: "Messaggio" },
    placeholder: {
      name: "Il tuo nome / organizzazione",
      email: "tu@example.com",
      message: "Di cosa vorresti parlare?",
    },
    button: "Invia a Pavel",
    thanks: "Apriremo la tua app email con i dati già compilati.",
    subject: "Messaggio per Pavel Kuznetsov",
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

function ContactContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialLang = useMemo(() => {
    const lang = searchParams.get("lang")?.toUpperCase() ?? null;
    return isLanguageCode(lang) ? lang : "EN";
  }, [searchParams]);

  const [active, setActive] = useState<LanguageCode>(initialLang);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [visible] = useState(true);

  const t = copy[active];

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
      `${t.fields.name}:`,
      name || "-",
      "",
      `${t.fields.email}:`,
      email || "-",
      "",
      `${t.fields.message}:`,
      message || "-",
    ];
    const mailto = `mailto:pavelkuznetsov.berlin@gmail.com?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <GlobalMenu activeLang={active} />
      <LanguageSwitcher active={active} onChange={handleLanguageChange} />
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
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center space-y-4 text-center">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{t.subtitle}</h1>
          <p className="text-lg text-zinc-200">{t.thanks}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm shadow-[0_24px_60px_-36px_rgba(0,0,0,0.8)]">
              <span className="text-sm uppercase tracking-[0.3em] text-zinc-300">{t.fields.name}</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.placeholder.name}
                className="mt-3 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-base text-white outline-none transition focus:border-white/60 focus:bg-white/10"
              />
            </label>

            <label className="block rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm shadow-[0_24px_60px_-36px_rgba(0,0,0,0.8)]">
              <span className="text-sm uppercase tracking-[0.3em] text-zinc-300">{t.fields.email}</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder.email}
                type="email"
                className="mt-3 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-base text-white outline-none transition focus:border-white/60 focus:bg-white/10"
              />
            </label>
          </div>

          <label className="block rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm shadow-[0_24px_60px_-36px_rgba(0,0,0,0.8)]">
            <span className="text-sm uppercase tracking-[0.3em] text-zinc-300">{t.fields.message}</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.placeholder.message}
              className="mt-3 h-40 w-full resize-none rounded-xl border border-white/20 bg-white/5 p-3 text-base text-white outline-none transition focus:border-white/60 focus:bg-white/10"
            />
          </label>

          <div className="flex justify-center">
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

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
          Loading...
        </div>
      }
    >
      <ContactContent />
    </Suspense>
  );
}
