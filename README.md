# Project Portofolio

Portofolio pribadi open source yang dibangun menggunakan **Next.js**, dirancang untuk menampilkan karya, pengalaman, dan keahlian dalam pengembangan web modern.

## STATUS PROYEK

- **`/port_v2` (Aktif):** Versi terbaru dan aktif dikembangkan. Dibangun dengan Next.js 15, Tailwind CSS, dan Sanity sebagai CMS.
- **`/site` (Deprecated):** Versi lama yang dibangun dengan React (Create React App). Tidak lagi dikelola.
- **`/next-react-convert` (Deprecated):** Versi awal migrasi ke Next.js. Tidak lagi dikelola.

Dokumentasi di bawah ini berfokus pada proyek `/port_v2`.

## 🔧 Teknologi yang Digunakan (`/port_v2`)

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **CMS:** Sanity
- **UI Components:** Shadcn/UI, Radix UI
- **Animasi:** Framer Motion
- **Data Fetching:** React Query, SWR
- **Deployment:** Vercel

## 🌐 Demo

- **Versi Terbaru (v2):** [https://portofolio-v2.aryadzar.my.id](https://portofolio-v2.aryadzar.my.id)
- **Versi Lama (React):** [https://aryadzar.my.id](https://aryadzar.my.id)

## 📂 Struktur Folder (`/port_v2`)

```
port_v2/
├── app/                  # Halaman dan layout (App Router)
│   ├── (public)/         # Grup route untuk halaman publik
│   └── studio/           # Route untuk Sanity Studio
├── components/           # Komponen React yang dapat digunakan kembali
├── lib/                  # Fungsi bantuan, koneksi API, dan utilitas
├── public/               # Aset statis (gambar, ikon, video)
├── sanity/               # Skema dan konfigurasi Sanity Studio
└── types/                # Definisi tipe TypeScript
```

## ✨ Fitur Unggulan

- 🌙 Dark mode
- 💫 Animasi antarmuka dengan Framer Motion
- 📱 Desain responsif untuk berbagai perangkat
- 📝 Konten dinamis yang dikelola melalui Sanity CMS
- 🧩 Struktur kode modular & modern

## 🚀 Cara Menjalankan Secara Lokal (`/port_v2`)

1.  Masuk ke direktori proyek:
    ```bash
    cd port_v2
    ```
2.  Install dependensi:
    ```bash
    npm install
    ```
3.  Jalankan server pengembangan:
    ```bash
    npm run dev
    ```
4.  Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📝 Lisensi
Proyek ini dilisensikan di bawah MIT License.

## 🙌 Kontribusi
Kontribusi sangat terbuka! Silakan fork, buat pull request, atau ajukan isu jika menemukan bug atau memiliki ide pengembangan.