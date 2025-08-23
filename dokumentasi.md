# CORXLAB Website Documentation

## Ringkasan Proyek
- **Framework**: Astro (Static Site)
- **Fitur**: Blog, News, Games Showcase
- **Tanpa JavaScript klien**: Semua halaman dirender statis. Tidak ada React/Vue/Svelte.
- **Konten**: Markdown/MDX via `astro:content`
- **Branding**: `SITE_TITLE = "CORXLAB"`, deskripsi disetel.

## Struktur Direktori Utama
```
/ (root)
├─ astro.config.mjs
├─ package.json
├─ README.md
├─ dokumentasi.md  ← dokumen ini
├─ public/
│  └─ fonts/, favicon.svg
├─ src/
│  ├─ assets/                 (gambar aset umum)
│  ├─ components/             (komponen UI)
│  │  ├─ BaseHead.astro       (SEO meta, title, fonts, CSS global)
│  │  ├─ Header.astro         (navigasi responsif)
│  │  ├─ Footer.astro         (footer responsif + links)
│  │  ├─ FormattedDate.astro  (format tanggal)
│  ├─ content/                (konten Markdown)
│  │  ├─ blog/                (post blog bawaan astro)
│  │  ├─ news/                (post news)
│  │  └─ games/               (entri game)
│  ├─ layouts/
│  │  └─ BlogPost.astro       (layout halaman detail artikel)
│  ├─ pages/
│  │  ├─ index.astro          (homepage: intro + tech stack + showcase)
│  │  ├─ blog/index.astro
│  │  ├─ blog/[...slug].astro
│  │  ├─ news/index.astro
│  │  ├─ news/[...slug].astro
│  │  ├─ games/index.astro
│  │  └─ games/[...slug].astro
│  ├─ styles/
│  │  └─ global.css           (style global + utilities)
│  ├─ consts.ts               (SITE_TITLE, SITE_DESCRIPTION)
│  └─ content.config.ts       (definisi collections schema)
```

## Dependensi dan Script
`package.json`:
- Dependencies: `astro`, `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`, `sharp`
- Scripts:
  - `npm run dev` — jalankan server dev
  - `npm run build` — build produksi
  - `npm run preview` — preview hasil build

## Model Konten (Collections)
Didefinisikan di `src/content.config.ts`.

- `blog` (bawaan):
  - `title: string`
  - `description: string`
  - `pubDate: Date`
  - `updatedDate?: Date`
  - `heroImage?: Image`

- `news` (baru):
  - `title: string`
  - `description: string`
  - `pubDate: Date`
  - `updatedDate?: Date`
  - `heroImage?: Image`

- `games` (baru):
  - `title: string`
  - `description: string`
  - `pubDate: Date`
  - `updatedDate?: Date`
  - `coverImage?: Image`
  - `gallery: Image[]` (default: [])
  - `platforms: { name: 'Steam'|'Google Play'|'App Store'|'itch.io'|'Epic Games'|'Other', url: string }[]` (default: [])
  - `tags: string[]` (default: [])

Catatan: `Image` adalah referensi gambar yang diproses oleh Astro (mengaktifkan optimisasi aset).

## Halaman dan Routing
- `index.astro` (Homepage)
  - Section 1: Intro CORXLAB
  - Section 2: Tech stack badges (Unity, Unreal Engine, Godot)
  - Section 3: Game Showcase (menampilkan 6 game terbaru dari koleksi `games`)

- Blog
  - List: `src/pages/blog/index.astro`
  - Detail: `src/pages/blog/[...slug].astro` (layout `BlogPost.astro`)

- News
  - List: `src/pages/news/index.astro` (urut terbaru)
  - Detail: `src/pages/news/[...slug].astro` (layout `BlogPost.astro`)

- Games
  - List: `src/pages/games/index.astro` (grid cards, badge platform)
  - Detail: `src/pages/games/[...slug].astro` (cover, deskripsi, gallery, tombol download platform)

## Menambah Konten
- News: Tambahkan file `.md` di `src/content/news/`.
  Contoh:
  ```md
  ---
  title: "Rilis Devlog 01"
  description: "Update fitur AI musuh"
  pubDate: 2025-08-20
  heroImage: ../assets/devlog-01.jpg
  ---
  Isi news di sini...
  ```

- Games: Tambahkan file `.md` di `src/content/games/`.
  Contoh:
  ```md
  ---
  title: "Dungeon Runner"
  description: "Rogue-lite cepat dan menantang."
  pubDate: 2025-08-10
  coverImage: ../assets/dungeon-cover.jpg
  gallery:
    - ../assets/dungeon-1.jpg
    - ../assets/dungeon-2.jpg
  platforms:
    - name: Steam
      url: https://store.steampowered.com/app/xxxxx
    - name: Google Play
      url: https://play.google.com/store/apps/details?id=xxxxx
  tags: [roguelite, action]
  ---
  Detail deskripsi game yang lebih panjang...
  ```

Slug halaman otomatis mengikuti path file di dalam folder koleksi.

## Styling dan Responsiveness
- Global styles ada di `src/styles/global.css`.
- Utility classes ditambahkan:
  - `.grid-3` — grid 3 kolom dengan breakpoint 2/1 kolom
  - `.card` — kartu putih dengan radius dan shadow
  - `.card-link` — anchor bergaya kartu
  - `.cover-16x9` — placeholder gambar rasio 16:9
  - `.badge` — label kecil untuk platform/tech stack
- Komponen `Header.astro` memanfaatkan flex + wrap untuk menu responsif.
- `Footer.astro` menggunakan grid 2 kolom (otomatis menjadi 1 kolom di mobile).

## SEO & Aset
- `BaseHead.astro` menyisipkan meta tags dasar dan memuat `global.css`.
- Font `Atkinson` dimuat dari `public/fonts/`.

## Pengembangan Lokal
1. `npm install`
2. `npm run dev`
3. Buka `http://localhost:4321` (default Astro) dan navigasi:
   - `/` (Home)
   - `/blog/`
   - `/news/`
   - `/games/`

## Build & Deploy
- Build: `npm run build` menghasilkan output statis di `dist/`.
- Deploy ke static hosting (Netlify/Vercel/Cloudflare Pages/Nginx) dapat melayani folder `dist`.

## Git / Repository
- Remote: `https://github.com/yudichandra/corxlabv2.git`
- Perintah umum:
  ```bash
  git add -A
  git commit -m "feat: content + pages"
  git push # sudah set upstream ke master
  ```

## Prinsip Zero-JS (Client)
- Tidak ada komponen interaktif yang membutuhkan JS di browser.
- Semua halaman dirender server-side menjadi HTML + CSS saja.
- Keuntungan: performa tinggi, aman, SEO baik.

## Ide Peningkatan Selanjutnya
- Halaman "About" perusahaan dan tim.
- Ikon platform (Steam/Play Store/App Store) pada cards dan tombol CTA.
- RSS/Atom untuk `news` dan `blog` via `@astrojs/rss`.
- Sitemap otomatis via `@astrojs/sitemap`.
- Filtering/pencarian sederhana untuk Games/News (tanpa JS, menggunakan halaman per-tag).
- Halaman kategori/tag untuk game (`/games/tags/<tag>`).
- Komponen gallery yang lebih kaya (tetap tanpa JS, gunakan CSS-only lightbox sederhana bila perlu).

## FAQ Singkat
- "Bagaimana menambah gambar?" — Tempatkan di `src/assets/` dan referensikan di frontmatter relative path.
- "Apa nama slug halaman?" — Mengikuti path file Markdown. Misal `src/content/news/update-1.md` → `/news/update-1/`.
- "Bisakah menambahkan MDX?" — Ya, collections sudah support `md` dan `mdx` pattern.
