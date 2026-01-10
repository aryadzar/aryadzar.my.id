# Portofolio v2 - Dokumentasi Teknis

> **Live URL:** [https://aryadzar.my.id](https://aryadzar.my.id)

Versi terbaru dari portofolio pribadi, dibangun dari awal dengan tumpukan teknologi modern untuk memberikan kinerja, skalabilitas, dan pengalaman pengembang yang lebih baik. Proyek ini menggunakan Next.js 16 dengan App Router, Sanity sebagai Headless CMS, dan di-deploy di Vercel.

## 📑 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi Stack](#teknologi-stack)
- [Arsitektur Proyek](#arsitektur-proyek)
- [Panduan Memulai](#panduan-memulai)
  - [Prasyarat](#prasyarat)
  - [Instalasi](#instalasi)
  - [Variabel Lingkungan](#variabel-lingkungan)
- [Skrip yang Tersedia](#skrip-yang-tersedia)
- [Struktur Data & API](#struktur-data--api)
  - [Sanity CMS](#sanity-cms)
  - [API Routes](#api-routes)
  - [Server-Side Rendering](#server-side-rendering)
- [Internasionalisasi (i18n)](#internasionalisasi-i18n)
- [Deployment](#deployment)

---

## ✨ Fitur Utama

### Performance & SEO
- **Server-Side Rendering (SSR)** - Semua data di-fetch di server untuk optimal SEO
- **Incremental Static Regeneration (ISR)** - Hybrid rendering strategy
- **Image Optimization** - Otomatis via Next.js Image component
- **Code Splitting** - Automatic code splitting untuk reduced bundle size

### User Experience
- **Dark Mode** - Theme switcher dengan persistensi menggunakan `next-themes`
- **Smooth Animations** - Framer Motion untuk micro-interactions dan page transitions
- **Responsive Design** - Mobile-first approach dengan Tailwind CSS
- **Accessibility** - WCAG compliant dengan Radix UI primitives

### Developer Experience
- **TypeScript** - Full type safety
- **Server Actions** - Mutations dan form handling
- **Error Tracking** - Sentry integration
- **Analytics** - Vercel Analytics

---

## 🛠️ Teknologi Stack

### Core Framework
```json
{
  "next": "^16.1.1",           // Next.js with App Router
  "react": "^19.2.3",          // React 19
  "typescript": "^5"           // TypeScript 5
}
```

### Styling
```json
{
  "tailwindcss": "^4.1.9",             // Utility-first CSS
  "@radix-ui/*": "various",             // Unstyled components
  "framer-motion": "12.23.22",           // Animation library
  "next-themes": "^0.4.6"                // Theme management
}
```

### CMS & Data Fetching
```json
{
  "sanity": "^4.14.2",                      // Headless CMS
  "next-sanity": "^11.6.5",                 // Sanity integration
  "next-intl": "^4.5.3",                    // Internationalization
  "@tanstack/react-query": "^5.90.9",       // Data fetching & caching
  "swr": "2.3.6"                            // Alternative data fetching
}
```

### Monitoring & Analytics
```json
{
  "@sentry/nextjs": "^10.32.1",     // Error tracking
  "@vercel/analytics": "1.3.1",      // Web analytics
  "@bprogress/next": "^3.2.12"       // Progress bar
}
```

---

## 📂 Arsitektur Proyek

Proyek ini mengikuti struktur standar Next.js App Router dengan beberapa kustomisasi:

```
port_v2/
├── app/
│   ├── (public)/                      # Route group untuk halaman publik
│   │   └── [locale]/                  # Dynamic route untuk bahasa (id/en)
│   │       ├── page.tsx               # Homepage (SSR)
│   │       ├── about/
│   │       │   └── page.tsx           # About page
│   │       ├── projects/
│   │       │   ├── page.tsx           # Projects listing
│   │       │   └── [slug]/
│   │       │       └── page.tsx       # Project detail
│   │       └── blog/
│   │           ├── page.tsx           # Blog listing
│   │           └── [slug]/
│   │               └── page.tsx       # Blog post detail
│   ├── api/                           # API routes
│   │   ├── [lang]/                    # Language-specific endpoints
│   │   │   ├── hero/route.ts
│   │   │   ├── about/route.ts
│   │   │   ├── project/route.ts
│   │   │   ├── blog/route.ts
│   │   │   ├── experience/route.ts
│   │   │   └── education/route.ts
│   │   ├── certificate/route.ts
│   │   └── spotify-now-playing/route.ts
│   ├── studio/                        # Sanity Studio
│   │   └── [[...tool]]/page.tsx
│   ├── globals.css                    # Global styles
│   ├── layout.tsx                     # Root layout
│   └── favicon.ico
│
├── components/
│   ├── ui/                            # Shadcn/UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...                        # Other UI primitives
│   ├── navbar/                        # Navigation components
│   │   ├── desktop-nav.tsx
│   │   ├── mobile-nav.tsx
│   │   └── theme-toggle.tsx
│   ├── hero-video.tsx                 # Hero section (client)
│   ├── about-brief.tsx                # About section (client)
│   ├── projects-showcase.tsx          # Projects preview (client)
│   ├── blog-preview.tsx               # Blog preview (client)
│   ├── certifications-section.tsx     # Certifications (client)
│   ├── education-section.tsx          # Education (client)
│   ├── experience-section.tsx         # Experience (client)
│   ├── contact-section.tsx            # Contact form
│   └── cv/                            # CV download components
│       └── cvModal.tsx
│
├── lib/
│   ├── getHome.ts                     # Server-side data fetching functions
│   ├── api.ts                         # Axios API client configuration
│   ├── utils.ts                       # Utility functions (cn, etc.)
│   └── getNowPlaying.ts               # Spotify integration
│
├── sanity/
│   ├── config.ts                      # Sanity client configuration
│   ├── schema.ts                      # Root schema import
│   └── schema/                        # Sanity schema definitions
│       ├── hero.ts                    # Hero section schema
│       ├── about.ts                   # About section schema
│       ├── project.ts                 # Project schema
│       ├── blog.ts                    # Blog post schema
│       ├── experience.ts              # Work experience schema
│       ├── education.ts               # Education schema
│       └── certification.ts           # Certification schema
│
├── types/                             # TypeScript type definitions
│   ├── homeType.ts
│   ├── aboutType.ts
│   ├── projectTypes.ts
│   ├── blogTypes.ts
│   ├── experienceType.ts
│   ├── educationType.ts
│   └── certificateType.ts
│
├── public/                            # Static assets
│   ├── images/
│   ├── videos/
│   └── icons/
│
├── messages/                          # i18n translation files
│   ├── en.json
│   └── id.json
│
├── middleware.ts                      # Next.js middleware (i18n)
├── next.config.mjs                    # Next.js configuration
├── tailwind.config.ts                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies
```

---

## 🚀 Panduan Memulai

### Prasyarat

- **Node.js** v18 atau lebih baru
- **npm**, **pnpm**, atau **yarn**
- **Akun Sanity** (untuk CMS setup)

### Instalasi

1. **Clone repository:**
   ```bash
   git clone <URL_REPOSITORY>
   ```

2. **Masuk ke direktori proyek:**
   ```bash
   cd port_v2
   ```

3. **Install dependensi:**
   ```bash
   npm install
   ```

### Variabel Lingkungan

Buat file `.env.local` di root direktori `port_v2`:

```env
# ================================
# Sanity CMS Configuration
# ================================
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-05-01"

# Required for server-side fetching
SANITY_API_READ_TOKEN="your_read_token_from_sanity_dashboard"

# ================================
# Spotify Integration (Optional)
# ================================
# Untuk fitur "Now Playing" di footer
SPOTIFY_CLIENT_ID="your_spotify_client_id"
SPOTIFY_CLIENT_SECRET="your_spotify_client_secret"
SPOTIFY_REFRESH_TOKEN="your_spotify_refresh_token"

# ================================
# Sentry (Optional - Production)
# ================================
NEXT_PUBLIC_SENTRY_DSN="your_sentry_dsn"
SENTRY_AUTH_TOKEN="your_sentry_auth_token"

# ================================
# Vercel (Auto-configured)
# ================================
# Vercel automatically provides these in deployment
# NEXT_PUBLIC_VERCEL_URL
# VERCEL_ENV
```

#### Cara Mendapatkan Sanity Credentials:

1. Login ke [sanity.io](https://sanity.io)
2. Buat proyek baru atau gunakan existing
3. Go to **Project Settings** → **API** → **Tokens**
4. Copy **Project ID** dan buat **Read Token** dengan permission "Read"

#### Cara Mendapatkan Spotify Credentials (Optional):

1. Login ke [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Buat aplikasi baru
3. Set redirect URI ke: `http://localhost:3000/api/spotify-now-playing/callback`
4. Gunakan [spotify-token-refresh](https://github.com/kylecorbell31/spotify-token-refresh) untuk refresh token

---

## 📜 Skrip yang Tersedia

```bash
# Development
npm run dev          # Menjalankan dev server dengan Turbopack (faster)

# Production
npm run build        # Build optimasi untuk production
npm run start        # Jalankan production server (setelah build)

# Code Quality
npm run lint         # Cek kode dengan ESLint
```

---

## 💾 Struktur Data & API

### Sanity CMS

Semua konten dikelola melalui Sanity Studio yang bisa diakses di `/studio`:

#### Schema Types:

1. **Hero** - Konten hero section di homepage
   ```typescript
   {
     title: string
     subtitle: string
     video: asset
     cvFile: asset
     language: 'id' | 'en'
   }
   ```

2. **About** - Informasi personal
   ```typescript
   {
     name: string
     jobTitle: string
     description: string
     profileImage: asset
     cvFile: asset
     certificateFile: asset
     language: 'id' | 'en'
   }
   ```

3. **Project** - Portofolio projects
   ```typescript
   {
     title: string
     slug: slug
     shortDesc: string
     content: portableText
     thumbnail: asset
     categories: reference[]
     publishedAt: date
     language: 'id' | 'en'
   }
   ```

4. **Blog** - Blog posts
   ```typescript
   {
     title: string
     slug: slug
     excerpt: string
     content: portableText
     coverImage: asset
     categories: reference[]
     publishedAt: date
     language: 'id' | 'en'
   }
   ```

5. **Experience** - Pengalaman kerja
   ```typescript
   {
     title: string
     company: string
     duration: string
     description: string
     logo: asset
     skills: reference[]
     language: 'id' | 'en'
   }
   ```

6. **Education** - Riwayat pendidikan
   ```typescript
   {
     degree: string
     school: string
     field: string
     date: string
     logo: asset
     language: 'id' | 'en'
   }
   ```

7. **Certification** - Sertifikasi
   ```typescript
   {
     title: string
     issuer: string
     date: string
     certId: string
     logo: asset
     certificateFile: asset
   }
   ```

### API Routes

API routes tersedia di `/api/[lang]/[endpoint]` dan menggunakan GROQ query:

```typescript
// Example: GET /api/en/hero
{
  title: string
  subtitle: string
  videoUrl: string
  cvUrl: string
}

// Example: GET /api/en/project?page=1&limit=6
{
  success: true
  page: 1
  limit: 6
  total: 12
  totalPages: 2
  projects: Array<Project>
}
```

### Server-Side Rendering

Semua data di-fetch di server menggunakan fungsi di `lib/getHome.ts`:

```typescript
// lib/getHome.ts
export const getHero = async (lang?: string): Promise<Hero> => {
  const data = await client.fetch(
    `*[_type == "hero" && language == $lang][0]{
      title,
      subtitle,
      "videoUrl": video.asset->url,
      "cvUrl": cvFile.asset->url
    }`,
    { lang }
  );
  return data;
};
```

Lalu di-render di server component:

```typescript
// app/(public)/[locale]/page.tsx
export default async function Page({ params }) {
  const { locale } = await params;
  const heroData = await getHero(locale);

  return <HeroVideoBackground data={heroData} />;
}
```

Client components tetap menggunakan Framer Motion untuk animasi, tapi data di-pass dari server:

```typescript
// components/hero-video.tsx
"use client";

export function HeroVideoBackground({ data }: { data: Hero }) {
  // Data sudah ada dari server, tidak perlu fetch lagi
  return <motion.div>{data.title}</motion.div>;
}
```

---

## 🌍 Internasionalisasi (i18n)

Proyek menggunakan `next-intl` untuk multi-language support:

### Supported Languages:
- 🇮🇩 **Indonesian (id)** - Default
- 🇬🇧 **English (en)**

### Implementation:

**Middleware** (`middleware.ts`):
```typescript
export default middleware(request: NextRequest) {
  const locale = negotiateLocale(
    request.headers.get('accept-language') || '',
    ['id', 'en']
  );
  // Redirect ke /locale
}
```

**Translation Files** (`messages/`):
```json
{
  "home": {
    "hero": {
      "ariaLabel": "Hero section",
      "title": "Welcome"
    }
  }
}
```

**Usage in Components**:
```typescript
"use client";
import { useTranslations } from 'next-intl';

export function Component() {
  const t = useTranslations('home.hero');
  return <h1>{t('title')}</h1>; // "Welcome" or "Selamat Datang"
}
```

**Server Components**:
```typescript
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('home.hero');
  return <h1>{t('title')}</h1>;
}
```

---

## 🌐 Deployment

### Vercel (Recommended)

Proyek sudah di-optimalkan untuk Vercel:

1. **Push ke GitHub** (Vercel akan auto-deploy)
2. **Set Environment Variables** di Vercel Dashboard
3. **Done!** 🚀

### Environment Variables di Vercel:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_READ_TOKEN

# Spotify (Optional)
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
SPOTIFY_REFRESH_TOKEN

# Sentry (Optional)
NEXT_PUBLIC_SENTRY_DSN
SENTRY_AUTH_TOKEN
```

### Build Configuration

`next.config.mjs` sudah include:
- Sanity image optimization
- i18n routing
- Sentry integration
- Vercel Analytics

### Performance Checklist:

- ✅ Server-side rendering untuk SEO
- ✅ Image optimization
- ✅ Lazy loading components
- ✅ Code splitting
- ✅ Edge runtime readiness
- ✅ CDN caching headers

---

## 📊 Monitoring & Analytics

### Sentry (Error Tracking)

Error tracking di-setup menggunakan `@sentry/nextjs`:

```typescript
// sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Vercel Analytics

Web analytics otomatis dari Vercel:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🐛 Troubleshooting

### Common Issues:

1. **Sanity images tidak muncul**
   - Pastikan `SANITY_API_READ_TOKEN` sudah di-set
   - Cek dataset name di Sanity dashboard

2. **Build gagal**
   - Cek TypeScript errors: `npm run lint`
   - Pastikan semua environment variables ada

3. **i18n tidak berfungsi**
   - Pastikan `middleware.ts` sudah benar
   - Cek `messages/` files

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Shadcn/UI](https://ui.shadcn.com)
- [next-intl](https://next-intl-docs.vercel.app/)

---

## 📝 Lisensi

MIT License - lihat [LICENSE](LICENSE) untuk detail.

---

**Built with ❤️ by [Arya Dzra](https://aryadzar.my.id)**
