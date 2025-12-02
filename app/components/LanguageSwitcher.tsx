"use client";

export type LanguageCode = "RU" | "EN" | "DE" | "IT";

type Props = {
  active: LanguageCode;
  onChange: (lang: LanguageCode) => void;
  className?: string;
};

const languages: { code: LanguageCode; label: string }[] = [
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
  { code: "RU", label: "Русский" },
  { code: "IT", label: "Italiano" },
];

export default function LanguageSwitcher({ active, onChange, className }: Props) {
  return (
    <div
      className={`fixed right-4 top-4 z-30 flex max-w-[calc(100vw-120px)] flex-wrap justify-end gap-2 md:right-6 md:top-6 md:gap-3 ${className ?? ""}`}
    >
      {languages.map((lang) => {
        const activeBtn = lang.code === active;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => onChange(lang.code)}
            aria-pressed={activeBtn}
            className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] transition md:px-4 md:py-2 md:text-xs ${
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
  );
}
