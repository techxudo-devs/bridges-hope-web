import { getTranslations, setRequestLocale } from "next-intl/server";

import ProductsCatalogSection from "@/components/sections/products/ProductsCatalogSection";
import PageHero from "@/components/shared/PageHero";
import { getFourthwallProducts } from "@/fourthwall/hooks/getProducts";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

const ProductsPage = async ({ params, searchParams }: PageProps) => {
  const [{ locale }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  setRequestLocale(locale);

  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const t = await getTranslations({ locale, namespace: "ProductsPage" });

  const requestedPage = Number.parseInt(resolvedSearchParams.page ?? "1", 10);
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const result = await getFourthwallProducts({ page, pageSize: 20 });

  return (
    <main className="bg-[#FAFAFA]">
      <PageHero title={nav("products")} homeLabel={nav("home")} />
      <ProductsCatalogSection
        products={result.products}
        currentPage={result.currentPage}
        hasNextPage={result.pageInfo.hasNextPage}
        isRtl={locale === "ar"}
        error={result.error}
        labels={{
          eyebrow: t("eyebrow"),
          title: t("title"),
          description: t("description"),
          pageLabel: t("pageLabel"),
          showingLabel: t("showingLabel", { count: result.products.length }),
          previous: t("previous"),
          next: t("next"),
          viewProduct: t("viewProduct"),
          noProductsTitle: t("noProductsTitle"),
          noProductsDescription: t("noProductsDescription"),
          unavailableTitle: t("unavailableTitle"),
          unavailableDescription: t("unavailableDescription"),
          openStore: t("openStore"),
          priceLabel: t("priceLabel"),
        }}
      />
    </main>
  );
};

export default ProductsPage;
