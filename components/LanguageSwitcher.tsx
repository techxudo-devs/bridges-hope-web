"use client";

import { usePathname, useRouter } from "@/navigation";
import { useLocale } from "next-intl";

import { locales } from "@/i18n";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
      {locales.map((targetLocale) => (
        <button
          key={targetLocale}
          type="button"
          onClick={() =>
            router.replace(pathname, {
              locale: targetLocale,
            })
          }
          className={
            targetLocale === locale
              ? "text-primary border-b-2 border-primary"
              : "text-white/70 hover:text-white"
          }
        >
          {targetLocale}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
