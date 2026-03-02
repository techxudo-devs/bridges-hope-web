"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { locales, localeNames, type Locale } from "@/i18n";
import { ChevronDown, Globe } from "lucide-react";

const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitch = (targetLocale: Locale) => {
    router.replace(pathname, { locale: targetLocale });
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/90 hover:text-white cursor-pointer"
      >
        <Globe className="w-4 h-4" />
        <span>{localeNames[locale]}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 min-w-[160px] bg-[#092a24] rounded-md shadow-lg border border-white/10 overflow-hidden z-50">
          {locales.map((targetLocale) => (
            <button
              key={targetLocale}
              onClick={() => handleSwitch(targetLocale)}
              className={`w-full px-4 py-2.5 text-sm text-left hover:bg-white/10 transition-colors cursor-pointer ${
                targetLocale === locale
                  ? "text-white font-semibold bg-white/10"
                  : "text-white/80"
              }`}
            >
              {localeNames[targetLocale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
