"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { locales } from "@/i18n";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
      {locales.map((targetLocale) => {
        // Replace the current locale in the pathname with the target locale
        const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "/";
        const href = `/${targetLocale}${pathWithoutLocale}`;

        return (
          <a
            key={targetLocale}
            href={href}
            className={
              targetLocale === locale
                ? "text-primary border-b-2 border-primary cursor-default"
                : "text-white/70 hover:text-white cursor-pointer"
            }
          >
            {targetLocale}
          </a>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
