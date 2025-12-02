"use client";

import { useMemo, useState } from "react";

type LanguageCode = "RU" | "EN" | "DE" | "IT";
type MenuEntry = { label: string; href?: string };

const menuItems: Record<LanguageCode, MenuEntry[]> = {
  DE: [
    { label: "Pianist", href: "/" },
    { label: "Komponist", href: "/composer" },
    { label: "Neuigkeiten", href: "/news" },
    { label: "pavels/music", href: "https://www.pavelsmusic.com" },
    { label: "Aqqquamarin", href: "/rapper" },
    { label: "Zusammenarbeit", href: "/collaboration" },
    { label: "Kontakt", href: "/contact" },
    { label: "Unterstützung", href: "/support" },
  ],
  EN: [
    { label: "Pianist", href: "/" },
    { label: "Composer", href: "/composer" },
    { label: "News", href: "/news" },
    { label: "pavels/music", href: "https://www.pavelsmusic.com" },
    { label: "Aqqquamarin", href: "/rapper" },
    { label: "Collaboration", href: "/collaboration" },
    { label: "Contact", href: "/contact" },
    { label: "Support", href: "/support" },
  ],
  RU: [
    { label: "Пианист", href: "/" },
    { label: "Композитор", href: "/composer" },
    { label: "Новости", href: "/news" },
    { label: "pavels/music", href: "https://www.pavelsmusic.com" },
    { label: "Aqqquamarin", href: "/rapper" },
    { label: "Сотрудничество", href: "/collaboration" },
    { label: "Связаться", href: "/contact" },
    { label: "Поддержка", href: "/support" },
  ],
  IT: [
    { label: "Pianista", href: "/" },
    { label: "Compositore", href: "/composer" },
    { label: "Notizie", href: "/news" },
    { label: "pavels/music", href: "https://www.pavelsmusic.com" },
    { label: "Aqqquamarin", href: "/rapper" },
    { label: "Collaborazione", href: "/collaboration" },
    { label: "Contatto", href: "/contact" },
    { label: "Supporto", href: "/support" },
  ],
};

const menuLabels: Record<LanguageCode, string> = {
  EN: "Menu",
  DE: "Menü",
  RU: "Меню",
  IT: "Menù",
};

type GlobalMenuProps = {
  activeLang: LanguageCode;
};

export default function GlobalMenu({ activeLang }: GlobalMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = menuItems[activeLang];

  const langParam = useMemo(() => activeLang.toLowerCase(), [activeLang]);
  const menuLabel = menuLabels[activeLang];
  const hrefWithLang = (href?: string) => {
    if (!href) return undefined;
    if (!href.startsWith("/")) return href;
    return `${href}?lang=${langParam}`;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        aria-controls="pavel-menu"
        aria-label={menuLabel}
        className="fixed left-3 top-3 z-30 flex h-10 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/40 bg-white/5 shadow-[0_18px_48px_-22px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.15)] backdrop-blur transition hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10 hover:shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.3)] md:left-1/2 md:top-6 md:h-20 md:w-36 md:-translate-x-1/2"
      >
        <span className="sr-only">{menuLabel}</span>
        <div className="relative h-full w-full">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-300/30 via-white/25 to-emerald-200/25 opacity-60 blur" />
            <div className="absolute inset-px rounded-2xl border border-white/25" />
          </div>
          <div className="absolute inset-x-2 bottom-3 grid h-5 grid-cols-8 gap-1 md:inset-x-3 md:bottom-8 md:h-9 md:grid-cols-10 md:gap-1.5">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden rounded bg-white/90 text-black shadow-[inset_0_-2px_4px_rgba(0,0,0,0.35)] transition duration-500 ${
                  idx >= 8 ? "hidden md:block" : ""
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-[35%] bg-white/65" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/25 to-transparent" />
          </div>
          <div className="absolute inset-x-0 top-1.5 flex justify-center md:top-3">
            <div className="flex gap-1.5 md:gap-2">
              {[14, 18, 12].map((w, idx) => (
                <div
                  key={idx}
                  className="h-4 rounded bg-zinc-100/85 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.35)] md:h-5"
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 -bottom-1 flex justify-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/85 md:text-sm md:tracking-[0.4em]">
              {menuLabel}
            </span>
          </div>
        </div>
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
              const href = hrefWithLang(item.href);
              const isExternal = href?.startsWith("http");

              return (
                <li key={item.label} className="border-b border-white/10 pb-3">
                  {href ? (
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer noopener" : undefined}
                      className="transition hover:text-white hover:underline"
                      onClick={() => setMenuOpen(false)}
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
    </>
  );
}
