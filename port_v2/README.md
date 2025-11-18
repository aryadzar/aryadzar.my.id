# Portofolio v2 - Dokumentasi Teknis

Versi terbaru dari portofolio pribadi saya, dibangun dari awal dengan tumpukan teknologi modern untuk memberikan kinerja, skalabilitas, dan pengalaman pengembang yang lebih baik. Proyek ini menggunakan Next.js dengan App Router, Sanity sebagai Headless CMS, dan di-deploy di Vercel.

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Arsitektur Proyek](#arsitektur-proyek)
- [Panduan Memulai](#panduan-memulai)
  - [Prasyarat](#prasyarat)
  - [Instalasi](#instalasi)
  - [Variabel Lingkungan](#variabel-lingkungan)
- [Skrip yang Tersedia](#skrip-yang-tersedia)
- [Integrasi API](#integrasi-api)
  - [Sanity.io](#sanityio)
  - [Spotify](#spotify)

## Fitur Utama

- **Next.js 15 App Router**: Menggunakan fitur terbaru React seperti Server Components untuk rendering optimal dan performa tinggi.
- **Headless CMS (Sanity)**: Semua konten (proyek, artikel blog, sertifikasi) dikelola secara dinamis melalui Sanity Studio.
- **Sanity Studio Terintegrasi**: Studio untuk mengelola konten dapat diakses langsung melalui route `/studio`.
- **Desain Modern dengan Shadcn/UI**: Dibangun di atas Tailwind CSS dan Radix UI untuk komponen antarmuka yang konsisten dan mudah diakses.
- **Animasi Halus**: Menggunakan `Framer Motion` untuk memberikan pengalaman pengguna yang lebih hidup melalui animasi dan transisi.
- **Dark Mode**: Dukungan tema terang dan gelap yang dapat diubah oleh pengguna.
- **Fetching Data Modern**: Menggunakan `React Query` dan `SWR` untuk caching data yang efisien dan pembaruan UI yang real-time.

## Arsitektur Proyek

Proyek ini mengikuti struktur standar Next.js App Router dengan beberapa kustomisasi untuk memisahkan logika dan komponen.

```
port_v2/
├── app/
│   ├── (public)/         # Grup route untuk halaman yang dapat diakses publik (Home, About, dll.).
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── studio/           # Route khusus untuk menjalankan Sanity Studio.
├── components/
│   ├── ui/               # Komponen UI dari Shadcn (Button, Card, dll.).
│   ├── about-brief.tsx   # Komponen spesifik untuk bagian-bagian halaman.
│   └── navbar.tsx
├── lib/
│   ├── api.ts            # Fungsi untuk berinteraksi dengan Sanity API.
│   ├── getNowPlaying.ts  # Logika untuk mengambil data "Now Playing" dari Spotify.
│   └── utils.ts          # Fungsi utilitas umum.
├── public/               # Aset statis seperti gambar, video, dan ikon.
├── sanity/               # Konfigurasi dan skema data untuk Sanity CMS.
│   ├── schema/           # Definisi model konten (misal: project, post).
│   └── sanity.config.ts  # Konfigurasi utama Sanity Studio.
└── types/                # Definisi tipe TypeScript untuk data model.
```

## Panduan Memulai

### Prasyarat

- Node.js (v18 atau lebih baru)
- npm atau pnpm

### Instalasi

1.  **Clone repository** (jika belum):
    ```bash
    git clone <URL_REPOSITORY>
    ```
2.  **Masuk ke direktori proyek**:
    ```bash
    cd port_v2
    ```
3.  **Install dependensi**:
    ```bash
    npm install
    ```

### Variabel Lingkungan

Untuk menjalankan proyek ini, Anda perlu mengatur beberapa variabel lingkungan. Buat file `.env.local` di dalam direktori `port_v2` dan isi dengan format berikut:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="..."
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-05-01"
SANITY_API_READ_TOKEN="..." # Diperlukan untuk fetching data di sisi server

# Spotify (Opsional, untuk fitur Now Playing)
SPOTIFY_CLIENT_ID="..."
SPOTIFY_CLIENT_SECRET="..."
SPOTIFY_REFRESH_TOKEN="..."
```

- Variabel `SANITY` dapat ditemukan di dasbor proyek Sanity Anda.
- Variabel `SPOTIFY` memerlukan penyiapan aplikasi di Spotify for Developers.

## Skrip yang Tersedia

- `npm run dev`: Menjalankan server pengembangan dengan Next.js Turbopack.
- `npm run build`: Membuat build produksi dari aplikasi.
- `npm run start`: Menjalankan server produksi setelah build.
- `npm run lint`: Menjalankan ESLint untuk memeriksa masalah pada kode.

## Integrasi API

### Sanity.io

Sanity digunakan sebagai sumber utama untuk semua konten dinamis. Skema data didefinisikan di direktori `/sanity/schema` dan dapat dikelola melalui Sanity Studio yang berjalan di `/studio`.

### Spotify

Fitur "Now Playing" di footer mengambil data lagu yang sedang diputar secara real-time dari akun Spotify saya menggunakan API resmi Spotify. Logika ini berada di `lib/getNowPlaying.ts`.