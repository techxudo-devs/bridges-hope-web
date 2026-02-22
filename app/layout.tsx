import "./globals.css";
import { Cairo, Caveat, Nunito, Figtree } from "next/font/google";

import { defaultLocale } from "@/i18n";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={defaultLocale}>
      <body
        className={`${nunito.variable} ${figtree.variable} ${caveat.variable} ${cairo.variable} font-cairo antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
