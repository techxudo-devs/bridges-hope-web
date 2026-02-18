"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { defaultLocale } from "@/i18n";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <p>Redirecting to your language...</p>
      <a href={`/${defaultLocale}`}>Go to the site</a>
    </main>
  );
}
