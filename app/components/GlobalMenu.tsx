"use client";

import { useMemo, useState } from "react";

type LanguageCode = "RU" | "EN" | "DE";
type MenuEntry = { label: string; href?: string };

const menuItems: Record<LanguageCode, MenuEntry[]> = {
  DE: [
    { label: "Pianist", href: "/" },
    { label: "Komponist", href: "/composer" },
    { label: "pavels/music", href: "https://www.pavelsmusic.com" },
    { label: "Aqqquamarin", href: "/rapper" },
    { label: "Zusammenarbeit", href: "/collaboration" },
    { label: "Kontakt", href: "/contact" },
    { label: "Unterstützung", href: "/support" },
  ],
  EN: [
    { label: "Pianist", href: "/" },
    { label: "Composer", href: "/composer" },
    { label: "pavels/music", href: "https://www.pavelsmusic.com" },
    { label: "Aqqquamarin", href: "/rapper" },
    { label: "Collaboration", href: "/collaboration" },
    { label: "Contact", href: "/contact" },
    { label: "Support", href: "/support" },
  ],
  RU: [
    { label: "Пианист", href: "/" },
    { label: "Композитор", href: "/composer" },
    { label: "pavels/music", href: "https://www.pavelsmusic.com" },
    { label: "Aqqquamarin", href: "/rapper" },
    { label: "Сотрудничество", href: "/collaboration" },
    { label: "Связаться", href: "/contact" },
    { label: "Поддержка", href: "/support" },
  ],
};

type GlobalMenuProps = {
  activeLang: LanguageCode;
};

export default function GlobalMenu({ activeLang }: GlobalMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = menuItems[activeLang];

  const langParam = useMemo(() => activeLang.toLowerCase(), [activeLang]);
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
        className="fixed left-1/2 top-6 z-30 flex h-20 w-32 -translate-x-1/2 items-center justify-center overflow-hidden rounded-xl shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)] transition hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.7)]"
      >
        <span className="sr-only">Toggle menu</span>
        <div className="relative h-full w-full">
          <div className="absolute inset-x-3 bottom-8 grid h-9 grid-cols-10 gap-1.5">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded bg-white/90 text-black shadow-[inset_0_-2px_4px_rgba(0,0,0,0.35)]"
              >
                <div className="absolute inset-x-0 top-0 h-[35%] bg-white/65" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/25 to-transparent" />
          </div>
          <div className="absolute inset-x-0 top-3 flex justify-center">
            <div className="flex gap-2">
              {[18, 22, 14].map((w, idx) => (
                <div
                  key={idx}
                  className="rounded bg-zinc-100/85 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.35)]"
                  style={{ width: `${w}px`, height: "24px" }}
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 -bottom-1 flex justify-center">
            <span className="text-sm uppercase tracking-[0.4em] text-white/85">Menu</span>
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
