/**
 * Data Fallback Utilities
 *
 * This project uses a "dual data source" pattern:
 * 1. **Primary source**: Sanity CMS (real-time data)
 * 2. **Fallback source**: i18n JSON messages (static translations)
 *
 * ## Why This Pattern?
 *
 * - **Flexibility**: Content managers can update data in Sanity without code deploys
 * - **Reliability**: If Sanity is down or data is missing, fallback to i18n ensures the site still works
 * - **Development**: Developers can work with i18n messages before Sanity content is ready
 *
 * ## How It Works
 *
 * Components fetch data from Sanity via API, but use `??` (nullish coalescing) to
 * fall back to i18n messages if Sanity data is unavailable:
 *
 * ```typescript
 * const title = sanityData?.title ?? i18nMessages.title
 * ```
 *
 * @example
 * ```typescript
 * const campaigns = useFallbackData(
 *   sanityData?.campaigns,
 *   i18nMessages.campaigns
 * );
 * ```
 */

/**
 * Merges Sanity data with i18n fallback messages.
 * For each property, Sanity data takes precedence if available.
 *
 * @template T - The shape of the data object
 * @param sanityData - Data fetched from Sanity CMS (may be undefined)
 * @param fallbackData - Fallback data from i18n JSON messages
 * @returns Merged object with Sanity data taking precedence
 *
 * @example
 * ```typescript
 * const content = useFallbackData(
 *   sanityResponse?.campaigns,
 *   translationMessages.campaigns
 * );
 * // Returns: { title: sanityData.title ?? fallback.title, ... }
 * ```
 */
export function useFallbackData<T extends Record<string, any>>(
  sanityData: Partial<T> | undefined,
  fallbackData: T
): T {
  if (!sanityData) return fallbackData;

  const result = { ...fallbackData };

  for (const key in fallbackData) {
    if (sanityData[key] !== undefined && sanityData[key] !== null) {
      result[key] = sanityData[key];
    }
  }

  return result;
}

/**
 * Type-safe way to extract nested data from i18n messages.
 * This is a helper for components using `useTranslations().raw()`.
 *
 * @template T - The expected shape of the extracted data
 * @param translations - The translations object from useTranslations()
 * @param path - Dot-notation path to the data (e.g., "Pages.donate.campaigns")
 * @returns Typed data from i18n messages
 *
 * @example
 * ```typescript
 * const tPages = useTranslations("Pages");
 * const donateContent = extractI18nData<DonateContent>(tPages, "donate");
 * ```
 */
export function extractI18nData<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: any,
  path: string
): T {
  return translations.raw(path) as T;
}

/**
 * Configuration for React Query refetch intervals.
 * Centralized to avoid "magic numbers" scattered throughout the codebase.
 */
export const REFETCH_INTERVALS = {
  /**
   * 8 seconds - For donation campaigns that update frequently
   * (used when donors make new contributions)
   */
  DONATIONS: 8000,

  /**
   * 30 seconds - For blog posts and general content
   */
  CONTENT: 30000,

  /**
   * 60 seconds - For rarely-changing data like projects
   */
  SLOW: 60000,
} as const;

/**
 * Standard React Query configuration for Sanity data fetching.
 *
 * @param interval - Refetch interval in milliseconds (use REFETCH_INTERVALS constants)
 * @returns React Query configuration object
 *
 * @example
 * ```typescript
 * const { data } = useQuery({
 *   queryKey: ["donatePage", locale],
 *   queryFn: () => fetchDonatePage(locale),
 *   ...getQueryConfig(REFETCH_INTERVALS.DONATIONS)
 * });
 * ```
 */
export function getQueryConfig(interval?: number) {
  return {
    refetchInterval: interval,
    refetchIntervalInBackground: interval ? true : false,
    retry: 1,
    staleTime: interval ? interval / 2 : 5000,
  };
}
