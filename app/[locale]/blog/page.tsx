import { setRequestLocale } from "next-intl/server";

import BlogPage from "@/components/BlogPage";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BlogRoute({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <BlogPage locale={locale} />
    </main>
  );
}
