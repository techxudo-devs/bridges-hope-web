export type FourthwallProduct = {
  id: string;
  name: string;
  description: string;
  handle: string;
  tags: string[];
  imageUrl: string | null;
  priceAmount: string | null;
  currencyCode: string | null;
  productUrl: string | null;
};

export type FourthwallProductsResult = {
  products: FourthwallProduct[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
  currentPage: number;
  pageSize: number;
  error: string | null;
};

type FourthwallApiProduct = {
  id: string;
  name: string;
  description?: string | null;
  slug?: string | null;
  tags?: string[] | null;
  images?: Array<{ url?: string | null }> | null;
  variants?: Array<{
    unitPrice?: {
      value?: number | string | null;
      currency?: string | null;
    } | null;
  }> | null;
};

type FourthwallProductsApiResponse = {
  results?: FourthwallApiProduct[] | null;
  paging?: {
    pageNumber?: number | null;
    pageSize?: number | null;
    elementsSize?: number | null;
    elementsTotal?: number | null;
    totalPages?: number | null;
    hasNextPage?: boolean | null;
  } | null;
};

const normalizeStoreDomain = (value: string) =>
  value
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");

const mapProduct = (
  product: FourthwallApiProduct,
  domain: string,
): FourthwallProduct => {
  const firstImage = product.images?.[0];
  const firstVariant = product.variants?.[0];
  const rawPrice = firstVariant?.unitPrice?.value;

  return {
    id: product.id,
    name: product.name,
    description: product.description?.trim() ?? "",
    handle: product.slug ?? "",
    tags: product.tags ?? [],
    imageUrl: firstImage?.url ?? null,
    priceAmount:
      rawPrice === null || rawPrice === undefined ? null : String(rawPrice),
    currencyCode: firstVariant?.unitPrice?.currency ?? null,
    productUrl: product.slug ? `https://${domain}/products/${product.slug}` : null,
  };
};

const fetchProductsPage = async ({
  token,
  page,
  size,
}: {
  token: string;
  page: number;
  size: number;
}) => {
  const endpoint = new URL(
    "https://storefront-api.fourthwall.com/v1/collections/all/products",
  );
  endpoint.searchParams.set("storefront_token", token);
  endpoint.searchParams.set("page", String(page));
  endpoint.searchParams.set("size", String(size));

  const response = await fetch(endpoint.toString(), {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Fourthwall request failed with status ${response.status}: ${errorText}`);
  }

  const json = (await response.json()) as FourthwallProductsApiResponse;

  console.log("Fourthwall Storefront Debug:", {
    page,
    size,
    resultsCount: json.results?.length ?? 0,
    paging: json.paging ?? null,
    sampleProduct: json.results?.[0]
      ? {
          id: json.results[0].id,
          name: json.results[0].name,
          slug: json.results[0].slug,
        }
      : null,
  });

  return json;
};

export const getFourthwallProducts = async ({
  page = 1,
  pageSize = 20,
}: { page?: number; pageSize?: number } = {}): Promise<FourthwallProductsResult> => {
  const rawDomain = process.env.NEXT_PUBLIC_FOURTHWALL_STORE_URL || "";
  const domain = normalizeStoreDomain(rawDomain);
  const token = process.env.NEXT_PUBLIC_FOURTHWALL_STOREFRONT_TOKEN;
  const normalizedPage = Math.max(1, Math.floor(page));
  const normalizedPageSize = Math.max(1, Math.min(50, Math.floor(pageSize)));

  const resultTemplate: FourthwallProductsResult = {
    products: [],
    pageInfo: { hasNextPage: false, endCursor: null },
    currentPage: normalizedPage,
    pageSize: normalizedPageSize,
    error: null,
  };

  if (!token || !domain) {
    return {
      ...resultTemplate,
      error: "Fourthwall storefront configuration is missing.",
    };
  }

  try {
    const data = await fetchProductsPage({
      token,
      page: normalizedPage - 1,
      size: normalizedPageSize,
    });

    return {
      ...resultTemplate,
      products: (data.results ?? []).map((product) => mapProduct(product, domain)),
      pageInfo: {
        hasNextPage: Boolean(data.paging?.hasNextPage),
        endCursor: data.paging?.hasNextPage ? String(normalizedPage + 1) : null,
      },
    };
  } catch (error) {
    console.error("Fourthwall Fetch Error:", error);
    return { ...resultTemplate, error: "Unable to load products from Fourthwall." };
  }
};
