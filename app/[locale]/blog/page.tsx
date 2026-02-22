import { setRequestLocale } from "next-intl/server";

import BlogPage from "@/components/BlogPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BlogRoute({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <BlogPage locale={locale} />
      </main>
      <Footer />
    </>
  );
}
