"use client";

import Image from "next/image";
import { useState } from "react";

type LanguageCode = "RU" | "EN" | "DE";

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

const languages: { code: LanguageCode; label: string }[] = [
  { code: "RU", label: "Русский" },
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
];

export default function Home() {
  const [active, setActive] = useState<LanguageCode>("RU");
  const paragraphs = biography[active];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute left-0 right-0 top-10 h-24 opacity-50 bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_9%,#0a0a0a_9%,#0a0a0a_11%,#ffffff_11%,#ffffff_20%,#0a0a0a_20%,#0a0a0a_22%)]" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:py-24">
        <header className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.55em] text-zinc-400">Pianist</p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Pavel Kuznetsov</h1>
              <p className="text-lg text-zinc-200">Pianist</p>
            </div>

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

            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.9)] backdrop-blur">
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-300">Biography</p>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-100">
                {paragraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-4 rounded-3xl border border-white/20 blur" />
            <div className="relative overflow-hidden rounded-3xl border border-white/25 bg-white/5 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_38%),radial-gradient(circle_at_80%_0,rgba(255,255,255,0.08),transparent_30%)]" />
              <Image
                src="/pavel-portrait.jpg"
                alt="Pavel Kuznetsov portrait"
                width={960}
                height={960}
                className="relative h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </header>
      </main>
    </div>
  );
}
