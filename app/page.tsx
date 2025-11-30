"use client";

import Image from "next/image";
import { useState } from "react";

const languages = [
  {
    code: "RU",
    label: "Русский",
    title: "Обо мне",
    text: "Я Павел Кузнецов — пианист. Строю программы на диалоге классики и минимализма, ищу прозрачный звук, точный ритм и камерную близость с залом.",
    bullets: [
      "Сольные рециталы и камерные проекты",
      "Классика, современный минимализм, новые партитуры",
      "Доступен для концертов, записей и мастер-классов",
    ],
  },
  {
    code: "EN",
    label: "English",
    title: "About",
    text: "I am Pavel Kuznetsov, a pianist shaping programs where classical clarity meets contemporary calm. I chase a clean tone, steady pulse, and close connection with the audience.",
    bullets: [
      "Solo recitals and chamber collaborations",
      "Core repertoire, minimalism, and new commissions",
      "Available for performances, studio work, and residencies",
    ],
  },
  {
    code: "DE",
    label: "Deutsch",
    title: "Über mich",
    text: "Ich bin Pavel Kuznetsov, Pianist zwischen klassischer Klarheit und moderner Ruhe. Ich suche einen transparenten Klang, präzisen Puls und unmittelbare Nähe zum Publikum.",
    bullets: [
      "Soloprogramme und Kammermusik",
      "Kernrepertoire, Minimal Music und neue Werke",
      "Offen für Konzerte, Aufnahmen und Workshops",
    ],
  },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

const focus = [
  {
    label: "Ключевые темы",
    items: ["Пространство между нотами", "Архитектурная фразировка", "Собранный ритм"],
  },
  {
    label: "Performance focus",
    items: ["Transparent dynamics", "Structured breathing", "Inventive encores"],
  },
  {
    label: "Schwerpunkte",
    items: ["Klarer Anschlag", "Ruhige Spannung", "Dialog mit Komponisten"],
  },
];

export default function Home() {
  const [active, setActive] = useState<LanguageCode>("RU");

  const currentLanguage = languages.find((lang) => lang.code === active) ?? languages[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute left-0 right-0 top-10 h-24 opacity-50 bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_9%,#0a0a0a_9%,#0a0a0a_11%,#ffffff_11%,#ffffff_20%,#0a0a0a_20%,#0a0a0a_22%)]" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:py-24">
        <header className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.55em] text-zinc-400">Pianist</p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Pavel Kuznetsov</h1>
              <p className="text-lg text-zinc-200">Pianist</p>
            </div>
            <p className="max-w-2xl text-lg text-zinc-200">
              Чёрно-белая палитра, ясные линии и ритм как дыхание рояля. Я строю программы, где звук
              остаётся минималистичным, а эмоции — точными.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {languages.map((lang) => {
                const activeBtn = lang.code === active;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setActive(lang.code)}
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

            <div className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/5 px-6 py-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:max-w-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-300">Programs</p>
              <ul className="space-y-2 text-sm text-zinc-100">
                <li>• Bach / Beethoven — архитектура звука</li>
                <li>• Pärt / Glass — свет в минимализме</li>
                <li>• New music — живые премьеры и диалоги</li>
              </ul>
              <div className="h-px bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
              <p className="text-sm text-zinc-200">
                Доступен для сольных концертов, камерных проектов и студийных сессий.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-4 rounded-3xl border border-white/20 blur" />
            <div className="relative overflow-hidden rounded-3xl border border-white/25 bg-white/5 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_38%),radial-gradient(circle_at_80%_0,rgba(255,255,255,0.08),transparent_30%)]" />
              <Image
                src="/pavel-portrait.svg"
                alt="Pavel Kuznetsov portrait"
                width={900}
                height={1200}
                className="relative h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </header>

        <section className="grid gap-6 rounded-2xl bg-white text-black shadow-[0_24px_60px_-36px_rgba(0,0,0,0.9)] md:grid-cols-[1.2fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl bg-white">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.03),transparent_45%,rgba(0,0,0,0.06)_80%)]" />
            <div className="relative flex flex-col gap-4 p-6 sm:p-8">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-zinc-600">
                <span>{currentLanguage.title}</span>
                <span className="rounded-full bg-black px-3 py-1 text-white">
                  {currentLanguage.code}
                </span>
              </div>
              <p className="text-base leading-relaxed text-zinc-800">{currentLanguage.text}</p>
              <ul className="space-y-2 text-sm font-medium text-zinc-900">
                {currentLanguage.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-6 bg-black" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl bg-black text-white">
            <div className="flex flex-col gap-3 border-b border-white/15 px-6 pt-6 pb-4">
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Contact</p>
              <p className="text-sm text-zinc-100">
                Готов обсудить программу, сцену и записи. Напишите, чтобы выбрать формат и дату.
              </p>
            </div>
            <div className="grid gap-3 px-6 pb-6">
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-zinc-100">
                <span className="h-1 w-6 bg-white" />
                <span>Связаться: добавьте email или соцсети</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-zinc-100">
                <span className="h-1 w-6 bg-white" />
                <span>Локация / доступность: глобально</span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-60px_rgba(0,0,0,0.9)] backdrop-blur md:grid-cols-3">
          {focus.map((block) => (
            <div
              key={block.label}
              className="flex flex-col gap-3 border-white/5 md:border-l md:px-4 md:first:border-l-0 md:first:pl-0"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-300">{block.label}</p>
              <ul className="space-y-2 text-sm text-zinc-100">
                {block.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/30" />
                    <span className="min-w-[12rem]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <footer className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-zinc-300 sm:flex-row sm:items-center sm:justify-between">
          <p>Чёткий ритм, уважение к паузе и внимание к публике.</p>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 px-4 py-3 text-white">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-300">Связаться</span>
            <span className="text-sm">Готов обсудить программу и сцену</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
