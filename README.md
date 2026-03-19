# Helpest Charity Website

Multi-language charity website built with Next.js 15 and Sanity CMS.

> **👨‍💻 For Developers**: Read [ARCHITECTURE.md](./ARCHITECTURE.md) first to understand the project structure and key patterns.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run Sanity Studio (CMS)
npm run sanity:dev

# Build for production
npm run build
```

## Tech Stack

- **Next.js 15** - React framework with App Router
- **Sanity v3** - Headless CMS for content management
- **next-intl** - Multi-language support (English, Turkish, Arabic with RTL)
- **React Query** - Data fetching and caching
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations

## Project Structure

```
├── app/[locale]/          # Internationalized pages (en/tr/ar)
├── components/            # React components
│   ├── sections/          # Page sections
│   ├── shared/            # Shared components (Header, Footer)
│   └── ui/                # Reusable UI components
├── sanity/                # Sanity CMS configuration
│   ├── schema/            # Content schemas (49 files)
│   └── lib/queries/       # Organized GROQ queries (NEW)
├── lib/                   # Utilities and helpers
├── messages/              # i18n translations (en.json, tr.json, ar.json)
└── i18n/                  # i18n configuration
```

## Key Features

### Multi-Language Support

- **3 Languages**: English (default), Turkish, Arabic
- **RTL Support**: Automatic right-to-left layout for Arabic
- **Localized Content**: All content available in 3 languages

### Dual Data Source Pattern

Components fetch data from **two sources** with automatic fallback:

1. **Sanity CMS** (primary) - Real-time content managed by editors
2. **i18n JSON** (fallback) - Static translations as backup

```typescript
// Example: Sanity data takes precedence, falls back to i18n
const title = sanityData?.title ?? i18nMessages.title;
```

**Why?** Ensures site works even if Sanity is unavailable.

### Real-Time Donation Updates

Donation campaign amounts update every 8 seconds using React Query polling to show near-real-time progress.

## Important Files

### Configuration

- `sanity.config.ts` - Sanity Studio setup
- `sanity/lib/client.ts` - Sanity client configuration
- `i18n.ts` - Language configuration
- `.env.local` - Environment variables (Sanity credentials, SMTP)

### Queries (Organized)

Sanity queries are organized by category for easier maintenance:

- `sanity/lib/queries/homepage.queries.ts` - Hero, About, Mission, Footer
- `sanity/lib/queries/donation.queries.ts` - Donate page, campaigns
- `sanity/lib/queries/projects.queries.ts` - Projects pages
- `sanity/lib/queries/blog.queries.ts` - Blog posts
- `sanity/lib/queries/volunteer.queries.ts` - Volunteer pages
- `sanity/lib/queries/gallery.queries.ts` - Gallery pages
- `sanity/lib/queries/legal.queries.ts` - Privacy policy

### API Routes

- `app/api/campaigns/` - Fetch donation campaigns
- `app/api/donate-page/` - Fetch donate page configuration
- `app/api/projects/` - Fetch projects
- `app/api/contact/` - Send contact form emails

## Data Flow Patterns

### Pattern 1: Server Components (Static Content)

```
Server Component → Sanity Direct Fetch → Render
```

Used for: Static sections (About, Mission, Footer)

### Pattern 2: Client Components (Dynamic Content)

```
Client Component → API Route → Sanity → JSON Response
```

Used for: Real-time content (Donation campaigns, Blog posts)

### Pattern 3: Polling (Frequently Updated)

```
Client Component → useQuery with refetchInterval → API → Sanity
```

Used for: Donation amounts that update in real-time

## Environment Variables

Create a `.env.local` file:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token

# Email (Contact Form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

## Common Tasks

### Adding a New Page Section

1. **Create Sanity Schema**: `sanity/schema/yourSection.ts`
2. **Add Query**: `sanity/lib/queries/{category}.queries.ts`
3. **Create Getter**: `sanity/lib/getYourSection.ts`
4. **Build Component**: `components/sections/YourSection.tsx`
5. **Add i18n Messages**: `messages/en.json` (fallback)

### Changing Text Content

1. **Check Sanity Studio First**: Most content is in Sanity
2. **Check i18n Files**: UI labels are in `messages/{locale}.json`
3. **Update Both**: For dual-source sections

### Adding a New Language

1. Add locale to `i18n.ts`: `locales: ["en", "tr", "ar", "fr"]`
2. Create message file: `messages/fr.json`
3. Update Sanity schemas: Add `fr` to `localizedString` types
4. Update all queries: Queries already support new locales via `$lang`

## Development

### Running Locally

```bash
npm run dev           # Next.js dev server (localhost:3000)
npm run sanity:dev    # Sanity Studio (localhost:3333)
```

### Building

```bash
npm run build         # Build Next.js app
npm run sanity:build  # Build Sanity Studio
```

### Seeding Data

```bash
npm run seed:*        # Various seed scripts for Sanity content
```

## Learn More

- **📖 [Architecture Guide](./ARCHITECTURE.md)** - Deep dive into project structure
- **🔧 [Data Fallback Utils](./lib/utils/data-fallback.ts)** - Dual data source helpers
- **📝 [Sanity Queries](./sanity/lib/queries/)** - All GROQ queries organized

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**For Developers**: Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the project structure and patterns before making changes.
