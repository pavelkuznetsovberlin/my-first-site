"use client";

import Image from "next/image";
import { useState } from "react";

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
    { label: "Pavel Kuznetsov – Komponist" },
    { label: "Pavel Kuznetsov – Produzent", href: "https://www.pavelsmusic.com" },
    { label: "Pavel Kuznetsov – Rapper", href: "/rapper" },
    { label: "Pavel Kuznetsov – Pisun" },
  ],
  EN: [
    { label: "Pavel Kuznetsov – Pianist" },
    { label: "Pavel Kuznetsov – Composer" },
    { label: "Pavel Kuznetsov – Producer", href: "https://www.pavelsmusic.com" },
    { label: "Pavel Kuznetsov – Rapper", href: "/rapper" },
    { label: "Pavel Kuznetsov – Pisun" },
  ],
  RU: [
    { label: "Павел Кузнецов — Пианист" },
    { label: "Павел Кузнецов — Композитор" },
    { label: "Павел Кузнецов — Продюсер", href: "https://www.pavelsmusic.com" },
    { label: "Павел Кузнецов — Рэпер", href: "/rapper" },
    { label: "Павел Кузнецов — Писюн" },
  ],
};

const languages: { code: LanguageCode; label: string }[] = [
  { code: "RU", label: "Русский" },
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
];

export default function Home() {
  const [active, setActive] = useState<LanguageCode>("RU");
  const [menuOpen, setMenuOpen] = useState(false);
  const paragraphs = biography[active];
  const menu = menuItems[active];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute left-0 right-0 top-10 h-24 opacity-50 bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_9%,#0a0a0a_9%,#0a0a0a_11%,#ffffff_11%,#ffffff_20%,#0a0a0a_20%,#0a0a0a_22%)]" />

      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        aria-controls="pavel-menu"
        className="fixed left-6 top-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-white/10 text-[10px] uppercase tracking-[0.25em] transition hover:border-white hover:bg-white/20"
      >
        <span className="sr-only">Toggle menu</span>
        <span className="flex flex-col items-center justify-center gap-1.5">
          <span className="block h-0.5 w-6 rounded-full bg-white" />
          <span className="block h-0.5 w-6 rounded-full bg-white" />
          <span className="block h-0.5 w-6 rounded-full bg-white" />
        </span>
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
              const href = item.href === "/rapper" ? `/rapper?lang=${active.toLowerCase()}` : item.href;
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
              className="object-contain"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_50%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />

            <div className="relative z-10 flex h-full flex-col justify-between px-6 py-10">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.55em] text-zinc-300">Pianist</p>
                  <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Pavel Kuznetsov</h1>
                  <p className="text-lg text-zinc-200">Pianist & Composer</p>
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
              </div>

              <div className="grid gap-8 md:grid-cols-[minmax(280px,340px)_minmax(320px,1fr)] items-end pb-8">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-zinc-300">Performance</p>
                  <p className="text-lg text-zinc-100">
                    Solo, chamber music, ballet collaborations and original compositions.
                  </p>
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
