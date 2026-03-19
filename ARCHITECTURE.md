# Project Architecture Guide

> **Purpose**: Help future developers understand this Next.js + Sanity CMS charity website

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Key Concepts](#key-concepts)
4. [Sanity CMS Integration](#sanity-cms-integration)
5. [Multi-Language Support](#multi-language-support)
6. [Data Flow Patterns](#data-flow-patterns)
7. [Common Patterns](#common-patterns)

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: Version 19
- **CMS**: Sanity v3
- **i18n**: next-intl (3 languages: en, tr, ar)
- **Styling**: Tailwind CSS v4 + Styled Components
- **Data Fetching**: React Query (TanStack Query)
- **Forms**: React Hook Form
- **Animation**: Framer Motion

---

## Project Structure

```
helpest-charity/
├── app/
│   ├── [locale]/           # Internationalized routes (en/tr/ar)
│   │   ├── layout.tsx      # Root layout with i18n setup
│   │   ├── page.tsx        # Homepage
│   │   ├── donate/         # Donation pages
│   │   ├── projects/       # Projects pages
│   │   ├── blog/           # Blog pages
│   │   └── ...
│   └── api/                # API routes (Sanity data fetchers)
│       ├── campaigns/
│       ├── donate-page/
│       └── contact/
│
├── components/
│   ├── sections/           # Page sections (Hero, About, etc.)
│   │   ├── homepage/       # Homepage-specific sections
│   │   ├── donate/         # Donation-specific sections
│   │   └── ...
│   ├── shared/             # Shared components (Header, Footer)
│   └── ui/                 # Reusable UI components
│
├── sanity/
│   ├── schema/             # Sanity content schemas (49 files)
│   │   ├── hero.ts
│   │   ├── donatePage.ts
│   │   └── ...
│   ├── lib/
│   │   ├── client.ts       # Sanity client configuration
│   │   ├── queries/        # **NEW**: Organized GROQ queries
│   │   │   ├── index.ts
│   │   │   ├── homepage.queries.ts
│   │   │   ├── donation.queries.ts
│   │   │   ├── projects.queries.ts
│   │   │   ├── blog.queries.ts
│   │   │   ├── volunteer.queries.ts
│   │   │   ├── gallery.queries.ts
│   │   │   └── legal.queries.ts
│   │   └── queries.ts      # Legacy export (re-exports from queries/)
│   └── deskStructure.ts    # Sanity Studio organization
│
├── lib/
│   ├── api/                # API client functions
│   └── utils/
│       └── data-fallback.ts # **NEW**: Dual data source helpers
│
├── messages/               # i18n translations
│   ├── en.json
│   ├── tr.json
│   └── ar.json
│
└── i18n/                   # i18n configuration
    ├── request.ts
    └── routing.ts
```

---

## Key Concepts

### 1. Dual Data Source Pattern

**This is the most important pattern to understand.**

Every section component in this project can pull data from **TWO sources**:

1. **Sanity CMS** (primary) - Real-time data managed by content editors
2. **i18n JSON messages** (fallback) - Static translations as backup

**Why?**
- **Flexibility**: Content managers update data without code deploys
- **Reliability**: Site works even if Sanity is unavailable
- **Development**: Work with i18n messages before Sanity content is ready

**How it looks in code:**

```typescript
// Example from DonationPreviewSection.tsx

const campaigns = {
  title: donatePageData?.campaigns?.title ?? donateContent.campaigns.title,
  //     ↑ Sanity data (primary)           ↑ i18n fallback
};
```

**Rule**: Sanity data takes precedence if available (`??` operator).

### 2. Server vs Client Components

The app uses Next.js App Router with mixed rendering:

**Server Components** (default):
- Fetch data at build/request time
- No JavaScript sent to client
- Examples: `AboutSection.tsx`, `MissionVision.tsx`

```typescript
// Server component pattern
export default async function AboutSection({ locale }: Props) {
  const data = await getAboutSection(locale); // Direct Sanity fetch
  return <AboutSectionClient data={data} />;
}
```

**Client Components** (`"use client"`):
- Use React hooks (useState, useQuery, etc.)
- Fetch data client-side via API routes
- Examples: `DonationPreviewSection.tsx`, `Header.tsx`

```typescript
// Client component pattern
"use client";

export default function DonationPreviewSection({ locale }: Props) {
  const { data } = useQuery({
    queryKey: ["donatePage", locale],
    queryFn: () => fetchDonatePage(locale), // API route
  });
  // ...
}
```

**When to use which?**
- **Server**: Static content that doesn't change often
- **Client**: Dynamic content, real-time updates, user interactions

---

## Sanity CMS Integration

### Schema Organization (49 files)

Sanity schemas define the content structure. They're organized into categories:

**Core Reusable Types** (`/sanity/schema/`):
- `localizedString.ts` - String in 3 languages (en/tr/ar)
- `localizedBlockContent.ts` - Rich text in 3 languages

**Homepage Sections**:
- `hero.ts`, `aboutSection.ts`, `missionVision.ts`, `coreValues.ts`, etc.

**Donation System**:
- `donatePage.ts` - Main donate page (VERY complex, 150+ lines)
- `donationPost.ts` - Individual campaigns
- `donateDetail.ts` - Donation form configuration

**Projects**: `project.ts`, `projectsPage.ts`, `projectDetail.ts`

**Content**: `blogPost.ts`, `galleryItem.ts`, `privacyPolicy.ts`

### Query Organization (NEW)

Queries are now split into category files for easier maintenance:

**Before** (old structure):
```
sanity/lib/queries.ts (523 lines - hard to navigate)
```

**After** (new structure):
```
sanity/lib/queries/
├── index.ts                 # Central exports
├── homepage.queries.ts      # Hero, About, Mission, Contact, Footer
├── donation.queries.ts      # Donate page, campaigns
├── projects.queries.ts      # Projects page, project details
├── blog.queries.ts          # Blog posts, blog section
├── volunteer.queries.ts     # Volunteer pages, CTAs
├── gallery.queries.ts       # Gallery pages, sliders
└── legal.queries.ts         # Privacy policy, legal docs
```

**Import unchanged** - you can still use:
```typescript
import { heroQuery } from '@/sanity/lib/queries';
```

### GROQ Query Language

All queries use Sanity's GROQ language with `$lang` parameter:

```groq
*[_type == "hero"][0]{
  "slides": slides[]{
    "title": title[$lang],    // Localized field
    "image": image
  }
}
```

**Key patterns**:
- `[$lang]` - Access localized field (becomes `.en`, `.tr`, or `.ar`)
- `[0]` - Get first result (singleton documents)
- `[]->` - Follow reference to another document
- `| order(date desc)` - Sort results

---

## Multi-Language Support

### 3 Languages with RTL Support

- **English** (`en`) - Default, LTR
- **Turkish** (`tr`) - LTR
- **Arabic** (`ar`) - RTL (right-to-left)

### How Localization Works

**1. Sanity Level** (Content):
Every string field is a `localizedString` object:

```typescript
{
  title: {
    en: "Welcome",
    tr: "Hoş geldiniz",
    ar: "مرحبا"
  }
}
```

**2. Query Level** (Data Fetching):
Queries use `$lang` parameter:

```typescript
const data = await client.fetch(heroQuery, { lang: locale });
```

**3. Component Level** (UI):
Use `next-intl` for UI strings:

```typescript
const t = useTranslations("Common");
<button>{t("learnMore")}</button>
```

**4. Layout Level** (Direction):
Arabic automatically gets RTL:

```typescript
// app/[locale]/layout.tsx
<html dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

---

## Data Flow Patterns

### Pattern 1: Server Component → Sanity Direct

**Used for**: Static sections that don't update frequently

```
Component (Server)
   ↓
getAboutSection(locale)  [/sanity/lib/getAboutSection.ts]
   ↓
Sanity Client  [client.fetch()]
   ↓
Data returned → Render
```

**Example**: `AboutSection.tsx`

### Pattern 2: Client Component → API Route → Sanity

**Used for**: Dynamic content with real-time updates

```
Component (Client)
   ↓
useQuery → fetch("/api/campaigns?locale=en")
   ↓
API Route  [/app/api/campaigns/route.ts]
   ↓
getDonationPosts(locale)  [/sanity/lib/getDonationPosts.ts]
   ↓
Sanity Client
   ↓
JSON response → Component
```

**Example**: `DonationPreviewSection.tsx`

**Why API routes?**
- Centralized Sanity credentials (not exposed to client)
- Error handling layer
- Can add caching/rate limiting

### Pattern 3: Client Component with Polling

**Used for**: Data that updates frequently (donations)

```typescript
useQuery({
  queryKey: ["donationPosts", locale],
  queryFn: () => fetchCampaigns(locale),
  refetchInterval: 8000,  // Refetch every 8 seconds
  refetchIntervalInBackground: true,
});
```

**Why 8 seconds?**
Donation amounts update as users contribute. Frequent refetching shows near-real-time progress, creating momentum for more donations.

---

## Common Patterns

### 1. Locale Prop Threading

Locale is passed through component tree:

```typescript
// app/[locale]/page.tsx
<DonationPreviewSection locale={locale} />

// DonationPreviewSection.tsx
const DonationPreviewSection = ({ locale }: Props) => {
  // Use locale for API calls, formatting, etc.
};
```

**Why not Context?**
Simple prop passing works for this project's depth. Could be refactored to use React Context if needed.

### 2. Currency Formatting

Use `Intl.NumberFormat` with current locale:

```typescript
const formatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

formatter.format(5000); // "$5,000" (en) or "5.000 $" (tr)
```

### 3. Image Optimization

Sanity images use `@sanity/image-url`:

```typescript
import { urlFor } from '@/sanity/lib/image';

const imageUrl = urlFor(image).width(1200).quality(80).url();
```

### 4. Slugs for URLs

Projects, blog posts, and campaigns use slugs:

```typescript
// Sanity schema
slug: {
  type: 'slug',
  options: { source: 'title' }
}

// URL: /projects/clean-water-initiative
```

---

## Environment Variables

Multiple fallback patterns exist for Sanity credentials:

```typescript
// Checks these in order:
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
process.env.SANITY_STUDIO_PROJECT_ID ||
process.env.SANITY_PROJECT_ID
```

**Required variables**:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Dataset (usually "production")
- `SANITY_API_TOKEN` - Read/write token for API
- Email variables for contact form (SMTP)

---

## Tips for Future Developers

### Understanding Data Sources

When you see data in a component, ask:
1. **Where does this come from?** Sanity or i18n?
2. **When is it fetched?** Server-side or client-side?
3. **How often does it update?** Static or polling?

Look for these clues:
- `useQuery` + `refetchInterval` = Client-side polling
- `await get*()` = Server-side fetch
- `?? donateContent.*` = Dual source pattern

### Modifying Content

**To change labels/text**:
1. Check if it's in Sanity Studio first
2. If not in Sanity, check `/messages/{locale}.json`

**To add a new section**:
1. Create Sanity schema in `/sanity/schema/`
2. Add query in `/sanity/lib/queries/`
3. Create getter function in `/sanity/lib/`
4. Build component in `/components/sections/`
5. Update i18n messages as fallback

### Debugging

**Sanity data not showing?**
1. Check Sanity Studio - is content published?
2. Check API route - is it returning data?
3. Check query - is `$lang` parameter passed?
4. Check i18n fallback - is it working?

**Language switching broken?**
1. Check `localizedString` fields in schema
2. Check `[$lang]` in queries
3. Check locale prop is passed correctly

---

## Further Reading

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Sanity GROQ Reference](https://www.sanity.io/docs/groq)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [React Query Guide](https://tanstack.com/query/latest)

---

**Questions?** Check these files:
- Queries: `/sanity/lib/queries/`
- Data fetching: `/sanity/lib/get*.ts`
- Components: `/components/sections/`
- API routes: `/app/api/`
