# PROJECT.md — PeduliSampah

**Dokumen Arsitektur Teknis & Panduan Pengembangan Web**

| Atribut             | Isi                                                         |
| ------------------- | ----------------------------------------------------------- |
| Produk              | PeduliSampah — Platform Edukasi Pemilahan Sampah            |
| Tim                 | UchanCyber                                                  |
| Subtema             | GreenTech & Sustainable Environment (SDG 12 & SDG 13)       |
| Versi               | 1.1 (Multi-Page Application Draft)                          |
| Terakhir diperbarui | 30 Oktober 2026                                             |
| Dokumen Induk       | PRD v1.0 & DESIGN.md v1.0                                   |
| Tech Stack          | HTML5 Multi-Page, CSS Murni Per-Halaman, Vanilla JavaScript |
| Manajemen Data      | Static JSON (`sampah.json`, `kuis.json`, `misi.json`)       |

## 1. Ringkasan Teknis Proyek

`PeduliSampah` adalah aplikasi web edukasi interaktif berbasis **Multi-Page Application (MPA)**. Setiap fitur/halaman utama berdiri sendiri dengan file HTML dan stylesheet CSS khusus agar pengerjaan modul halaman antar anggota tim menjadi lebih independen dan terisolasi.

### Prinsip Utama Pengembangan:

1. **Multi-Page Architecture (MPA):** Setiap halaman memiliki file `.html` dan file `.css` sendiri untuk memudahkan navigasi langsung dan pemisahan gaya.
2. **Zero External Runtime Dependencies:** Tanpa _framework_ JS/CSS eksternal, tanpa jQuery, dan tanpa _build tool_/bundler.
3. **Offline-Ready Static Data:** Konten dinamis seperti daftar sampah, kuis, dan misi diambil dari file JSON lokal lewat `fetch()`.
4. **Session-Only Memory State:** Skor kuis dan progres sementara dikelola lewat memori skrip JavaScript halaman terkait.

---

## 2. Struktur Folder Proyek

```
PeduliSampah/
├── README.md               # Dokumentasi cara menjalankan proyek & hosting
├── PROJECT.md              # Panduan arsitektur teknis
├── DESIGN.md               # Panduan sistem desain UI/UX
├── PRD.md                  # Dokumen Product Requirements Document
│
├── index.html              # Halaman Beranda
├── katalog.html            # Halaman Katalog Sampah
├── detail.html             # Halaman Detail Sampah (dinamis via query param)
├── panduan.html            # Halaman Panduan Pilah & Pohon Keputusan
├── kuis.html               # Halaman Kuis Interaktif
├── misi.html               # Halaman Misi Lingkungan
├── tips.html               # Halaman Tips Hijau 3R
├── 404.html                # Halaman Error 404
│
├── css/
│   ├── global.css          # Variable CSS dasar, reset, & komponen global (header/footer)
│   ├── beranda.css         # Style khusus Halaman Beranda
│   ├── katalog.css         # Style khusus Katalog, pencarian, & filter
│   ├── detail.css          # Style khusus Detail Sampah & banner B3
│   ├── panduan.css         # Style khusus Panduan Pilah
│   ├── kuis.css            # Style khusus Kuis & umpan balik
│   ├── misi.css            # Style khusus Misi & Poin
│   └── tips.css            # Style khusus Tips Hijau
│
├── js/
│   ├── global.js           # Navigation drawer, header/footer, & helper umum
│   ├── data.js             # Utility fetcher & caching JSON
│   ├── beranda.js          # Logic interaktif Beranda (Tips acak, CTA)
│   ├── katalog.js          # Logic pencarian, filter kategori, & render kartu
│   ├── detail.js           # Logic render detail sampah berdasarkan ID di URL
│   ├── kuis.js             # Engine kuis, pemutaran soal, & skor
│   ├── misi.js             # Logic penanganan misi & perhitungan poin
│   └── tips.js             # Logic filter tips 3R & tips acak
│
├── data/
│   ├── sampah.json         # Bank data 75 jenis sampah, kategori, & tips umum
│   ├── kuis.json           # Bank soal kuis (Level Tunas & Pohon)
│   └── misi.json           # Daftar tantangan aksi hijau & sistem peringkat
│
└── assets/
    ├── mascot/             # SVG Rani si Red Panda (7 varian ekspresi)
    └── icons/              # SVG Ikon Kategori & UI
```

---

## 3. Navigasi & Struktur Multi-Page

### 3.1 Pautan Antar-Halaman (HTML Links)

Navigasi antar halaman dilakukan menggunakan link HTML standar (`<a href="...">`):

| Halaman         | File HTML                     | File CSS khusus   | File JS khusus  |
| --------------- | ----------------------------- | ----------------- | --------------- |
| Beranda         | `index.html`                  | `css/beranda.css` | `js/beranda.js` |
| Katalog Sampah  | `katalog.html`                | `css/katalog.css` | `js/katalog.js` |
| Detail Sampah   | `detail.html?id=kulit-pisang` | `css/detail.css`  | `js/detail.js`  |
| Panduan Pilah   | `panduan.html`                | `css/panduan.css` | `js/panduan.js` |
| Kuis            | `kuis.html`                   | `css/kuis.css`    | `js/kuis.js`    |
| Misi Lingkungan | `misi.html`                   | `css/misi.css`    | `js/misi.js`    |
| Tips Hijau      | `tips.html`                   | `css/tips.css`    | `js/tips.js`    |

### 3.2 Menghubungkan CSS Global dan Khusus

Setiap file HTML wajib mengimpor `global.css` terlebih dahulu untuk konsistensi variabel warna/font, diikuti oleh file CSS khusus halaman tersebut:

```html
<!-- Contoh pada katalog.html -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Katalog Sampah — PeduliSampah</title>

  <!-- CSS Global (Sistem desain, Reset, Navigasi, & Footer) -->
  <link rel="stylesheet" href="css/global.css" />
  <!-- CSS Khusus Halaman -->
  <link rel="stylesheet" href="css/katalog.css" />
</head>
```

---

## 4. Manajemen Data JSON (`js/data.js`)

Setiap halaman yang membutuhkan data dari JSON dapat memanggil fungsi `fetchData` secara terisolasi:

```javascript
// js/data.js
export async function fetchData(fileName) {
  try {
    const response = await fetch(`./data/${fileName}.json`);
    if (!response.ok) throw new Error(`Gagal memuat ${fileName}.json`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

### Routing Dinamis Halaman Detail (`js/detail.js`):

Untuk halaman `detail.html`, data spesifik diambil berdasarkan _Query Parameter_ `id` di URL URL (`detail.html?id=baterai-bekas`):

```javascript
// Mengambil parameter 'id' dari URL
const urlParams = new URLSearchParams(window.location.search);
const sampahId = urlParams.get("id");

if (sampahId) {
  fetchData("sampah").then((data) => {
    const item = data.sampah.find((s) => s.id === sampahId);
    if (item) {
      renderDetail(item);
    } else {
      window.location.href = "404.html";
    }
  });
}
```

---

## 5. Panduan Deployment & Local Development

### Menjalankan di Lokal (Development):

Karena peramban memblokir `fetch()` jika file HTML dibuka langsung dari sistem file (`file://`), jalankan proyek menggunakan server HTTP lokal:

- **VS Code:** Gunakan ekstensi **Live Server** lalu buka `index.html`.
- **Python CLI:** Jalankan `python -m http.server 8000` di dalam root direktori proyek, lalu akses `http://localhost:8000`.

### Menjalankan di Hosting (Production):

Struktur Multi-Page Application ini sangat siap dideploy langsung ke hosting statis gratisan:

1. **GitHub Pages:** Pilih cabang `main` sebagai sumber publikasi. Navigasi halaman `.html` akan bekerja secara _native_.
2. **Vercel / Netlify:** Langsung hubungkan repositori tanpa memilih _build step_.
