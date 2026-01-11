# Arya Dzra's Portfolio

Portofolio pribadi open source yang dibangun menggunakan **Next.js**, dirancang untuk menampilkan karya, pengalaman, dan keahlian dalam pengembangan web modern.

## 📁 Struktur Repository

Repository ini berisi beberapa versi proyek portofolio:

- **`/port_v2`** ⭐ **(AKTIF - Production)**
  - Versi terbaru yang sedang aktif dikembangkan
  - Dibangun dengan Next.js 16 (App Router), Tailwind CSS, dan Sanity CMS
  - **Live URL:** [https://aryadzar.my.id](https://aryadzar.my.id)
  - Server-side rendering untuk SEO optimal
  - Full TypeScript dengan modern architecture

- **`/site`** 🔒 **(Legacy - Deprecated)**
  - Versi lama yang dibangun dengan React (Create React App)
  - Tidak lagi aktif dikembangkan
  - **Live URL:** [https://legacy.aryadzar.my.id](https://legacy.aryadzar.my.id)

- **`/next-react-convert`** 🔒 **(Deprecated)**
  - Versi awal migrasi ke Next.js
  - Tidak lagi dikelola

## 🚀 Quick Start (Proyek Aktif `/port_v2`)

### Prasyarat

- Node.js v18 atau lebih baru
- npm, pnpm, atau yarn

### Instalasi

1. **Masuk ke direktori proyek:**
   ```bash
   cd port_v2
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**

   Buat file `.env.local` di dalam direktori `port_v2`:

   ```env
   # Sanity CMS
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2024-05-01"
   SANITY_API_READ_TOKEN="your_read_token"

   # Spotify (Opsional - untuk fitur Now Playing)
   SPOTIFY_CLIENT_ID="your_client_id"
   SPOTIFY_CLIENT_SECRET="your_client_secret"
   SPOTIFY_REFRESH_TOKEN="your_refresh_token"
   ```

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```

5. **Buka browser:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## 🛠️ Teknologi yang Digunakan (`/port_v2`)

### Core Framework
- **Next.js 16** - React framework dengan App Router
- **React 19** - UI library
- **TypeScript** - Type safety dan developer experience

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/UI** - Component library berbasis Radix UI
- **Radix UI** - Accessible UI primitives
- **Framer Motion** - Animation library
- **next-themes** - Dark mode support

### CMS & Data
- **Sanity CMS** - Headless CMS untuk konten management
- **next-intl** - Internationalization (i18n)
- **@tanstack/react-query** - Data fetching dan caching
- **SWR** - Data fetching alternative

### Monitoring & Analytics
- **Sentry** - Error tracking dan monitoring
- **Vercel Analytics** - Web analytics
- **@bprogress/next** - Custom progress bar

## ✨ Fitur Utama

- 🌙 **Dark Mode** - Theme switcher dengan persistensi
- 🌍 **Multi-language** - Dukungan bahasa Indonesia dan Inggris
- 💫 **Smooth Animations** - Framer Motion untuk UX yang halus
- 📱 **Responsive Design** - Optimal di semua ukuran layar
- 🔍 **SEO Optimized** - Server-side rendering untuk search engine visibility
- ⚡ **Performance** - Image optimization, lazy loading, dan caching
- 📝 **Dynamic Content** - Konten dikelola melalui Sanity CMS
- 🎨 **Modern UI** - Komponen yang accessible dan customizable

## 📂 Struktur Proyek (`/port_v2`)

```
port_v2/
├── app/
│   ├── (public)/              # Route group untuk halaman publik
│   │   ├── [locale]/          # Dynamic route untuk bahasa
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/         # About page
│   │   │   ├── projects/      # Projects pages
│   │   │   └── blog/          # Blog pages
│   │   └── layout.tsx         # Root layout
│   ├── api/                   # API routes
│   │   ├── [lang]/            # Language-specific endpoints
│   │   └── spotify-now-playing/
│   └── studio/                # Sanity Studio route
├── components/
│   ├── ui/                    # Shadcn/UI components
│   ├── hero-video.tsx         # Hero section
│   ├── projects-showcase.tsx  # Projects section
│   ├── blog-preview.tsx       # Blog section
│   └── ...                    # Other components
├── lib/
│   ├── getHome.ts             # Server-side data fetching
│   ├── api.ts                 # API client
│   └── utils.ts               # Utility functions
├── sanity/
│   ├── schema/                # Sanity schema definitions
│   └── sanity.config.ts       # Sanity configuration
├── types/                     # TypeScript type definitions
└── public/                    # Static assets
```

## 📜 Skrip yang Tersedia

```bash
# Development
npm run dev          # Menjalankan dev server dengan Turbopack

# Production
npm run build        # Build untuk production
npm run start        # Jalankan production server

# Code Quality
npm run lint         # Cek kode dengan ESLint
```

## 🌐 Deployment

Proyek di-deploy menggunakan **Vercel** dengan optimasi otomatis:
- Automatic deployments dari Git
- Preview deployments untuk pull requests
- Edge network untuk CDN global
- Image optimization

## 📚 Dokumentasi Lengkap

Untuk dokumentasi teknis yang lebih detail, lihat [README.md di `/port_v2`](./port_v2/README.md)

## 🤝 Kontribusi

Kontribusi sangat terbuka! Silakan:
1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

## 📝 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detailnya.

## 👨‍💻 Author

**Arya Dzra** - [aryadzar.my.id](https://aryadzar.my.id)

---

⭐ Jika Anda menyukai proyek ini, jangan lupa untuk memberi star!
