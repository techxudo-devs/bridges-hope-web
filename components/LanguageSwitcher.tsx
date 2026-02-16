"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
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
          onClick={() => router.replace(pathname, { locale: targetLocale })}
          className={
            targetLocale === locale
              ? "text-primary border-b-2 border-primary cursor-default"
              : "text-white/70 hover:text-white cursor-pointer"
          }
        >
          {targetLocale}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
