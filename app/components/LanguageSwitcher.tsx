"use client";

export type LanguageCode = "RU" | "EN" | "DE";

type Props = {
  active: LanguageCode;
  onChange: (lang: LanguageCode) => void;
  className?: string;
};

const languages: { code: LanguageCode; label: string }[] = [
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
  { code: "RU", label: "Русский" },
];

export default function LanguageSwitcher({ active, onChange, className }: Props) {
  return (
    <div className={`fixed right-6 top-6 z-30 flex flex-wrap justify-end gap-3 ${className ?? ""}`}>
      {languages.map((lang) => {
        const activeBtn = lang.code === active;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => onChange(lang.code)}
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
  );
}
