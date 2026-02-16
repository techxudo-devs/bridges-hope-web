import type { Metadata } from "next";
import { Caveat, Nunito, Figtree } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Helpest - Non-Profit Charity Organization",
  description:
    "Join us in making a difference. Support our mission to provide education, healthcare, and hope to communities in need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${figtree.variable} ${caveat.variable} font-figtree antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
