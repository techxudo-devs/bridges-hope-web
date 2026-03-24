import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/navigation";
import { getBlogPostBySlug } from "@/sanity/lib/getBlogPost";
import { urlFor } from "@/sanity/lib/image";
import PageHero from "@/components/shared/PageHero";
import RichText from "@/components/ui/RichText";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function BlogDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const t = await getTranslations({ locale, namespace: "Blog" });

  const post = await getBlogPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
    : "";

  return (
    <main className="bg-white">
      <PageHero title={t("heroTitle")} homeLabel={nav("home")} />
      <section className="container mx-auto px-4 max-w-4xl py-20 text-start">
        <Link
          href="/blog"
          className="text-sm font-semibold text-primary hover:text-secondary"
        >
          ← Back to blog
        </Link>

        <h1 className="text-4xl font-black text-secondary mt-6">
          {post.title}
        </h1>

        {formattedDate ? (
          <p className="text-sm uppercase tracking-wide text-gray-400 mt-3">
            {formattedDate}
          </p>
        ) : null}

        {post.excerpt ? (
          <p className="text-lg text-gray-600 mt-6">{post.excerpt}</p>
        ) : null}

        {post.image ? (
          <div className="mt-10 overflow-hidden rounded-3xl">
            <img
              src={urlFor(post.image).width(1200).quality(90).url()}
              alt={post.title ?? "Blog image"}
              className="w-full h-[420px] object-cover"
            />
          </div>
        ) : null}

        <article className="mt-10"><RichText blocks={post.body} /></article>
      </section>
    </main>
  );
}
