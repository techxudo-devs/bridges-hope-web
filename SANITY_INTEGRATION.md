# Sanity + Next.js (App Router) + i18n + TanStack Query Guide

This project is already wired for **field-level translations** (en/tr/ar) and
client-side data fetching via **TanStack Query**. Follow the steps below to
finish setup and start authoring content.

## 1) Install dependencies

From the project root:

```bash
npm install
```

This will install the dependencies already added in `package.json`:

- `sanity`
- `@sanity/client`
- `next-sanity`
- `@tanstack/react-query`

## 2) Environment variables

Create `.env.local` in the root (or update it):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=yourProjectId
SANITY_STUDIO_DATASET=production
```

## 3) Sanity Studio config

Sanity Studio config lives at the root for easy CLI usage:

- `sanity.config.ts`
- `sanity.cli.ts`

Schemas live inside `sanity/schema`:

```
sanity/schema/localizedString.ts
sanity/schema/hero.ts
sanity/schema/index.ts
```

### Localized String Schema

```ts
// sanity/schema/localizedString.ts
export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "string" },
    { name: "tr", title: "Turkish", type: "string" },
    { name: "ar", title: "Arabic", type: "string" },
  ],
});
```

### Hero Document Schema (Matches `components/Hero.tsx`)

```ts
// sanity/schema/hero.ts
export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Background Image", type: "image" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localizedString" }),
    defineField({ name: "title", title: "Title", type: "localizedString" }),
  ],
});

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [{ type: "heroSlide" }],
    }),
    defineField({
      name: "donateNowLabel",
      title: "Donate Now Label",
      type: "localizedString",
    }),
  ],
});
```

## 4) Run Sanity Studio

From the root:

```bash
npx sanity dev
```

Open: `http://localhost:3333` and create a **Hero Section** document.

## 5) GROQ Query with Language Projection

This query flattens the localized object to a plain string:

```ts
// sanity/lib/queries.ts
export const heroQuery = `
  *[_type == "hero"][0]{
    "slides": slides[]{
      "title": title[$lang],
      "subtitle": subtitle[$lang],
      "image": image
    },
    "donateNowLabel": donateNowLabel[$lang]
  }
`;
```

## 6) TanStack Query Fetching (Client Component)

Sanity client:

```ts
// sanity/lib/client.ts
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
```

Fetcher:

```ts
// sanity/lib/getHeroSection.ts
export async function getHeroSection(lang: string) {
  return client.fetch(heroQuery, { lang });
}
```

TanStack Query component:

```tsx
// components/SanityHeroSection.tsx
const { data } = useQuery({
  queryKey: ["hero", locale],
  queryFn: () => getHeroSection(locale),
});
```

## 6.1) Image Upload + Rendering

Images are stored in Sanity as an `image` field (already in the schema). To
render them, use the Sanity image URL builder:

```ts
// sanity/lib/image.ts
const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);
```

Usage in the hero component:

```tsx
const imageUrl = data.image
  ? urlFor(data.image).width(1400).quality(80).url()
  : null;

{imageUrl ? <img src={imageUrl} alt={data.title ?? "Hero image"} /> : null}
```

## 7) Provider Setup

`QueryProvider` is registered in `app/[locale]/layout.tsx` so you can use
TanStack Query anywhere:

```tsx
<QueryProvider>
  <InitialPageLoader>{children}</InitialPageLoader>
</QueryProvider>
```

## 8) Arabic RTL Handling

`app/[locale]/layout.tsx` already sets `dir="rtl"` for Arabic. The Sanity hero
component also applies `text-right` when `locale === "ar"`.

---

## Files Added/Updated

- `sanity.config.ts`
- `sanity.cli.ts`
- `sanity/schema/localizedString.ts`
- `sanity/schema/hero.ts`
- `sanity/schema/index.ts`
- `sanity/lib/client.ts`
- `sanity/lib/queries.ts`
- `sanity/lib/getHeroSection.ts`
- `components/QueryProvider.tsx`
- `components/SanityHeroSection.tsx`
- `app/[locale]/layout.tsx`
- `app/[locale]/page.tsx`

If you want image rendering next, we can add the Sanity image URL builder.
