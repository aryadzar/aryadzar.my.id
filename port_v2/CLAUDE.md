# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 portfolio website using the App Router, deployed to Vercel at [aryadzar.my.id](https://aryadzar.my.id). The site uses Sanity CMS for content management and supports English and Indonesian languages with server-side rendering for optimal SEO.

**Important:** The `/port_v2` folder is the active project. The `/site` folder is legacy code (React CRA) deployed at legacy.aryadzar.my.id.

## Common Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack (faster than default)

# Production
npm run build            # Create production build
npm run start            # Run production server (after build)

# Code Quality
npm run lint             # Run ESLint

# Sanity CMS
# Access Sanity Studio at http://localhost:3000/studio during development
# Or at https://<your-project>.sanity.studio/ for production
```

**Note:** The `dev` script uses `--turbopack` flag for significantly faster development builds. Turbopack is Next.js's new bundler (in beta).

## Architecture

### Data Fetching Strategy: Server-Side Rendering

This project uses **server-side rendering** for all content. Data is fetched on the server using functions in `lib/getHome.ts` that directly query Sanity CMS.

**Key pattern:** Server components fetch data, then pass it to client components that handle animations.

```typescript
// Server component (app/(public)/[locale]/page.tsx)
export default async function Page({ params }) {
  const { locale } = await params;

  // Fetch all data server-side for SEO
  const [heroData, aboutData, ...] = await Promise.all([
    getHero(locale),
    getAbout(locale),
    // ...
  ]);

  // Pass data to client components
  return <HeroVideoBackground data={heroData} />;
}
```

**Client components** (marked with `"use client"`) receive data as props and use Framer Motion for animations. They do NOT fetch data themselves.

### Internationalization (i18n)

The project uses `next-intl` for localization:

- **Supported locales:** `en` (English, default), `id` (Indonesian)
- **Locale routing:** All pages are prefixed with locale: `/en/...` or `/id/...`
- **Configuration:** `i18n/routing.ts`, `i18n/navigation.ts`, `i18n/request.ts`, `constants/i18n-config.ts`
- **Translation files:** `messages/en.json`, `messages/id.json`

**Note:** There is no `middleware.ts` file. Locale routing is handled automatically by `next-intl` through its configuration.

When working with translations:
- In server components: `import { getTranslations } from 'next-intl/server'`
- In client components: `import { useTranslations } from 'next-intl'`

### Sanity CMS Integration

Sanity is used as a headless CMS with the following patterns:

1. **Content schemas** defined in `sanity/schema/`
2. **Direct client queries** in `lib/getHome.ts` (uses `sanity/lib/client.ts`)
3. **GROQ queries** with language filtering: `language == $lang`

**Important:** Most content types (Hero, About, Project, Blog, Experience, Education) have language-specific versions. Always include `language == $lang` in GROQ queries. **Exception:** Certifications do NOT have language filtering and are shared across all locales.

### Folder Structure (Key Directories)

```
app/
├── (public)/[locale]/        # Localized pages (server components)
│   ├── page.tsx              # Homepage - fetches all data server-side
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   └── blog/page.tsx
├── api/[lang]/               # API routes (legacy, mostly unused)
└── studio/[[...tool]]/       # Sanity Studio admin interface

components/
├── ui/                       # Shadcn/UI components (Radix UI primitives)
├── navbar/                   # Navigation components
├── hero-video.tsx            # Client component with SSR data
├── about-brief.tsx           # Client component with SSR data
└── ...                       # Other section components

lib/
├── getHome.ts                # ⭐ Server-side data fetching functions
├── api.ts                    # Axios client (legacy, not recommended)
└── utils.ts                  # Utility functions

sanity/
├── schema/                   # Sanity content schemas
├── lib/client.ts             # Sanity client configuration
└── env.ts                    # Environment variables (projectId, dataset, apiVersion)

constants/
└── i18n-config.ts            # Locale configuration array

types/                        # TypeScript types matching Sanity schemas

messages/                     # i18n translation JSON files
```

### Component Architecture

**Server Components** (default in Next.js 16):
- Page components in `app/(public)/[locale]/`
- Fetch data from Sanity using `lib/getHome.ts` functions
- Pass data to client components as props

**Client Components** (marked `"use client"`):
- Interactive components (navbar, theme toggle)
- Animation components using Framer Motion
- All section components on homepage receive server-fetched data as props

**Example:**
```typescript
// components/hero-video.tsx
"use client";

export function HeroVideoBackground({ data }: { data: Hero }) {
  // data is passed from server, no fetching here
  return <motion.div>{data.title}</motion.div>;
}
```

### Important Configuration Files

- `next.config.ts`: Sentry integration, image domains (Sanity CDN, Spotify), next-intl plugin wrapper
- `sanity/env.ts`: Sanity environment variables (projectId, dataset, apiVersion)
- `sanity/lib/client.ts`: Sanity client with CDN enabled
- `tailwind.config.ts`: Custom theme with CSS variables for theming
- `constants/i18n-config.ts`: Supported locale array (["en", "id"])
- `i18n/routing.ts`: next-intl routing configuration

### Adding New Content Sections

When adding a new section that displays Sanity content:

1. **Define schema** in `sanity/schema/` (if new content type)
2. **Create type** in `types/` matching the schema
3. **Add fetch function** in `lib/getHome.ts`:
   ```typescript
   export const getNewContent = async (lang: string) => {
     return await client.fetch(
       `*[_type == "newContent" && language == $lang]`,
       { lang }
     );
   };
   ```
4. **Fetch in server component** (e.g., `page.tsx`)
5. **Create client component** that receives data as props
6. **Add translations** to `messages/en.json` and `messages/id.json`

### Environment Variables

Required for development:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Sanity dataset (usually "production")
- `SANITY_API_READ_TOKEN`: Required for server-side fetching

Optional:
- Spotify credentials for "Now Playing" feature
- Sentry credentials for error tracking

### Common Patterns

**Fetching filtered content:**
```typescript
// Language-specific + published date filter
*[_type == "project" && language == $lang && publishedAt <= now()]
```

**Pagination in GROQ:**
```typescript
{
  "items": *[_type == "content" && language == $lang]
    | order(publishedAt desc) [${start}...${start + limit}],
  "total": count(*[_type == "content" && language == $lang])
}
```

**Image references in Sanity:**
```typescript
"imageUrl": imageField.asset->url  // Direct URL
"image": { "src": imageField.asset->url, "alt": imageField.alt }  // Object
```

### Deployment

The project uses Vercel for deployment with automatic builds from Git. Key configurations from `next.config.ts`:
- Sentry error tracking enabled with tunnel route `/monitoring` (bypasses ad-blockers)
- Automatic Vercel Cron Monitors instrumentation
- Source map uploads in CI environment only
- Webpack tree-shaking for Sentry debug logging
- Image optimization configured for Sanity CDN (`cdn.sanity.io`) and Spotify (`i.scdn.co`)

### Legacy Code Notes

- `lib/api.ts` and `app/api/` routes exist but are not the primary data fetching method
- The project previously used client-side fetching with TanStack Query, but now uses SSR
- API routes remain for potential external use or specific needs
