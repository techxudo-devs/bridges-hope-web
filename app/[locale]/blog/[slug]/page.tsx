import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/navigation";
import { getBlogPostBySlug } from "@/sanity/lib/getBlogPost";
import { urlFor } from "@/sanity/lib/image";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

type BlogPostBodyBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  children?: { text?: string }[];
};

const renderBlocks = (blocks?: BlogPostBodyBlock[]) => {
  if (!blocks?.length) return null;

  return blocks.map((block, index) => {
    if (block._type !== "block") return null;
    const text = block.children?.map((child) => child.text).join("") ?? "";
    if (!text) return null;

    switch (block.style) {
      case "h2":
        return (
          <h2 key={block._key ?? index} className="text-2xl font-bold mt-10">
            {text}
          </h2>
        );
      case "h3":
        return (
          <h3 key={block._key ?? index} className="text-xl font-semibold mt-8">
            {text}
          </h3>
        );
      case "blockquote":
        return (
          <blockquote
            key={block._key ?? index}
            className="border-l-4 border-primary pl-4 italic text-gray-600 mt-6"
          >
            {text}
          </blockquote>
        );
      default:
        return (
          <p
            key={block._key ?? index}
            className="text-gray-700 leading-relaxed mt-6"
          >
            {text}
          </p>
        );
    }
  });
};

export default async function BlogDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

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
      <section className="container mx-auto px-4 max-w-4xl pt-40 pb-16 text-start">
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

        <article className="mt-10">{renderBlocks(post.body)}</article>
      </section>
    </main>
  );
}
