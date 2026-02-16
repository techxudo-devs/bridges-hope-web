"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { locales, localeNames, type Locale } from "@/i18n";
import { ChevronDown, Globe } from "lucide-react";

const LanguageSwitcher = () => {
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
    <div ref={ref} className="relative hidden lg:block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/90 hover:text-white cursor-pointer"
      >
        <Globe className="w-4 h-4" />
        <span>{localeNames[locale]}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 min-w-[140px] bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden z-50">
          {locales.map((targetLocale) => (
            <button
              key={targetLocale}
              onClick={() => handleSwitch(targetLocale)}
              className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                targetLocale === locale
                  ? "text-primary font-semibold bg-primary/5"
                  : "text-gray-700"
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
