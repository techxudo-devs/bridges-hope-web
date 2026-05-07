import { ArrowRight, ChevronLeft, ChevronRight, Package2 } from "lucide-react";

import { Link } from "@/navigation";
import type { FourthwallProduct } from "@/fourthwall/hooks/getProducts";

type ProductsCatalogSectionProps = {
  products: FourthwallProduct[];
  currentPage: number;
  hasNextPage: boolean;
  isRtl: boolean;
  labels: {
    eyebrow: string;
    title: string;
    description: string;
    pageLabel: string;
    showingLabel: string;
    previous: string;
    next: string;
    viewProduct: string;
    noProductsTitle: string;
    noProductsDescription: string;
    unavailableTitle: string;
    unavailableDescription: string;
    openStore: string;
    priceLabel: string;
  };
  error?: string | null;
};

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (value: string, maxLength: number) => {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
};

const formatPrice = (amount: string | null, currencyCode: string | null) => {
  if (!amount || !currencyCode) {
    return null;
  }

  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return `${amount} ${currencyCode}`;
  }

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(numericAmount);
};

const buildPageHref = (page: number) =>
  page <= 1 ? "/products" : `/products?page=${page}`;

const ProductsCatalogSection = ({
  products,
  currentPage,
  hasNextPage,
  isRtl,
  labels,
  error,
}: ProductsCatalogSectionProps) => {
  const hasProducts = products.length > 0;

  return (
    <section className="relative overflow-hidden bg-[#f8faf8] py-10">
      <div className="relative container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-xs font-bold text-primary">
            <Package2 className="h-4 w-4" />
            {labels.eyebrow}
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tight text-secondary sm:text-5xl">
            {labels.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            {labels.description}
          </p>
        </div>

        {!error ? (
          <div className="mt-12 flex flex-col gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-semibold text-primary">
                {labels.pageLabel}
              </span>
              <span className="text-2xl font-black text-secondary">
                {currentPage}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600">
              {labels.showingLabel}
            </p>
          </div>
        ) : null}

        {error ? (
          <div className="mt-12 rounded-[1.75rem] border border-amber-200 bg-amber-50 px-6 py-8 text-center">
            <h3 className="text-xl font-black text-secondary">
              {labels.unavailableTitle}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {labels.unavailableDescription}
            </p>
          </div>
        ) : null}

        {!error && !hasProducts ? (
          <div className="mt-12 rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
            <h3 className="text-xl font-black text-secondary">
              {labels.noProductsTitle}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {labels.noProductsDescription}
            </p>
          </div>
        ) : null}

        {hasProducts ? (
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => {
              const cleanDescription = truncate(
                stripHtml(product.description || ""),
                120,
              );
              const price = formatPrice(
                product.priceAmount,
                product.currencyCode,
              );

              return (
                <article
                  key={product.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-300 hover:border-primary/40"
                >
                  <div className="relative aspect-[4/4.3] overflow-hidden bg-slate-100">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#e9f7ec_0%,#f6f6f6_100%)] text-secondary">
                        <Package2 className="h-12 w-12 opacity-60" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col px-4 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span
                          key={`${product.id}-${tag}`}
                          className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="mt-4 text-xl font-black leading-tight text-secondary transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                      {cleanDescription || labels.openStore}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          {labels.priceLabel}
                        </p>
                        <p className="mt-1 text-lg font-black text-secondary">
                          {price ?? labels.openStore}
                        </p>
                      </div>

                      {product.productUrl ? (
                        <a
                          href={product.productUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
                        >
                          {labels.viewProduct}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}

        <div className="mt-14 flex items-center justify-center gap-3">
          <Link
            href={buildPageHref(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={`inline-flex min-w-28 items-center justify-center gap-2 rounded-full cursor-pointer px-5 py-3 text-sm font-semibold transition-colors ${
              currentPage <= 1
                ? "pointer-events-none border border-slate-200 bg-white text-slate-300"
                : "border border-slate-300 bg-white text-secondary hover:border-primary hover:text-primary"
            }`}
          >
            {isRtl ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
            {labels.previous}
          </Link>

          <div className="inline-flex min-w-24 items-center justify-center rounded-full border border-primary/15 bg-primary/8 px-5 py-3 text-sm font-semibold text-secondary">
            {labels.pageLabel} {currentPage}
          </div>

          <Link
            href={buildPageHref(currentPage + 1)}
            aria-disabled={!hasNextPage}
            className={`inline-flex min-w-28 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold cursor-pointer transition-colors ${
              !hasNextPage
                ? "pointer-events-none border border-slate-200 bg-white text-slate-300"
                : "bg-primary text-white hover:bg-secondary"
            }`}
          >
            {labels.next}
            {isRtl ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsCatalogSection;
