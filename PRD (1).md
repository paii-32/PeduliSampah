# Product Requirements Document

# PeduliSampah — Platform Edukasi Pemilahan Sampah

**Tim UchanCyber** · Kompetisi Web Design · Subtema _GreenTech & Sustainable Environment_ (SDG 12 & SDG 13)

| Atribut             | Isi                                                                   |
| ------------------- | --------------------------------------------------------------------- |
| Nama Produk         | PeduliSampah                                                          |
| Jenis Produk        | Website edukasi statis (client-side only), responsif mobile & desktop |
| Versi Dokumen       | 1.0 (Draft untuk review tim)                                          |
| Status              | Draft — siap dipakai sebagai acuan implementasi MVP                   |
| Terakhir Diperbarui | 30 Oktober 2026                                                       |
| Pemilik Dokumen     | Tim UchanCyber                                                        |

**Cara membaca label keputusan di dokumen ini:**

- **\[Confirmed\]** — sudah ditetapkan oleh tim pada brief awal.
- **\[Recommended\]** — usulan penulis PRD; boleh diubah tim.
- **\[Assumption\]** — asumsi sementara yang belum diverifikasi.
- **\[Open Question\]** — keputusan yang masih perlu dijawab tim (dirangkum di Bab 7).

**Prioritas fitur:** **P0** = wajib agar MVP bernilai · **P1** = masuk MVP bila waktu cukup, jika tidak menjadi rilis pertama setelah pengumpulan · **P2** = rencana pengembangan berikutnya.

---

## 1. Product Overview & Goals

### 1.1 Ringkasan Produk

PeduliSampah adalah website edukasi interaktif yang mengajarkan pemilahan sampah kepada siswa SD hingga SMP melalui tiga pengalaman utama: **menjelajah** katalog sampah beserta cara menanganinya, **bermain kuis** dengan umpan balik langsung, dan **menjalankan misi lingkungan** untuk mengumpulkan poin. Seluruh konten dipandu maskot **Red Panda** agar terasa ramah, ceria, dan tidak menggurui.

Produk berjalan sepenuhnya di sisi klien (browser) dengan data dari tiga file JSON statis, tanpa login, tanpa database, dan tanpa localStorage **\[Confirmed\]**.

### 1.2 Problem Statement

- **Masalah utama:** pemilahan sampah sering diajarkan lewat poster atau teks yang statis. Istilah seperti _B3_, _residu_, dan _e-waste_ membingungkan anak, dan mereka tidak mendapat umpan balik ketika salah memilah.
- **Dampak:** kebiasaan memilah tidak terbentuk sejak dini, padahal pencampuran sampah organik dan anorganik mempersulit daur ulang dan pengomposan, serta menambah beban tempat pembuangan akhir.
- **Status validasi masalah:** **\[Assumption\]** — belum didukung riset primer. Karena itu PRD ini sengaja tidak mencantumkan statistik. Bila tim ingin menyebut angka pada presentasi juri, gunakan sumber resmi (misalnya data SIPSN milik KLHK) dan catat sumbernya.

### 1.3 Solusi yang Diusulkan

Platform edukasi ringan yang bisa dibuka di ponsel maupun laptop, dengan prinsip:

1. **Cari cepat** — anak mengetik nama benda (misalnya “botol”) dan langsung tahu kategorinya.
2. **Belajar singkat** — setiap sampah punya kartu detail: kategori, tong yang tepat, langkah menangani, dan fakta seru.
3. **Uji dan ulangi** — kuis dengan umpan balik edukatif, bukan sekadar benar atau salah.
4. **Aksi nyata** — misi harian dan mingguan yang mendorong kebiasaan di rumah dan sekolah.
5. **Aman** — peringatan khusus untuk sampah B3 dan e-waste agar anak tidak menyentuh atau membongkarnya sendiri.

### 1.4 Keselarasan dengan SDG

| SDG                                                     | Target yang relevan                                                                                         | Kontribusi PeduliSampah                                                                                                 |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **SDG 12** — Konsumsi & Produksi yang Bertanggung Jawab | Target 12.5: mengurangi timbulan sampah melalui pencegahan, pengurangan, daur ulang, dan penggunaan kembali | Katalog & panduan pemilahan, konsep 3R (Reduce, Reuse, Recycle) pada setiap sampah, misi mengurangi sampah sekali pakai |
| **SDG 13** — Penanganan Perubahan Iklim                 | Target 13.3: meningkatkan pendidikan dan kesadaran tentang mitigasi perubahan iklim                         | Tips ramah lingkungan, fakta seru yang mengaitkan sampah organik dan emisi gas metana, misi aksi iklim harian           |

### 1.5 Tujuan Produk (Goals)

| ID  | Tujuan                                                                           | Indikator keberhasilan (usulan awal)                                                     |
| --- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| G1  | **Pengetahuan:** anak mengenali 5 kategori sampah dan cara memilahnya            | Anak uji dapat menyebut minimal 4 dari 5 kategori setelah ±10 menit memakai produk       |
| G2  | **Kesadaran:** anak bisa memutuskan tong yang tepat untuk suatu benda            | Dari beranda, anak menemukan kategori suatu benda dalam maksimal 3 interaksi             |
| G3  | **Kepedulian:** anak terdorong melakukan aksi nyata                              | Pada uji coba, anak memilih dan menyelesaikan minimal 1 misi                             |
| G4  | **Keselamatan:** anak tidak diarahkan menyentuh atau membongkar sampah berbahaya | 100% item B3 dan e-waste menampilkan peringatan dan anjuran meminta bantuan orang dewasa |
| G5  | **Teknis:** produk ringan, cepat, dan jalan tanpa backend                        | Skor Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95                             |

Seluruh angka di atas adalah **target awal usulan** dan perlu divalidasi saat uji coba dengan pengguna nyata.

### 1.6 Non-Goals (di Luar Cakupan)

- Login, registrasi akun, atau profil pengguna **\[Confirmed\]**.
- Database, backend, atau API pihak ketiga **\[Confirmed\]**.
- Penyimpanan di localStorage **\[Confirmed\]**. Penulis PRD juga mengasumsikan sessionStorage, cookie, dan IndexedDB tidak dipakai **\[Assumption\]**.
- Papan peringkat antarpengguna, komentar, forum, atau chat (membutuhkan backend dan moderasi konten anak).
- Unggah foto atau klasifikasi sampah dengan AI.
- Iklan, pelacak analitik pihak ketiga, dan pengumpulan data pribadi anak.
- Panel admin. Konten diperbarui dengan mengedit file JSON langsung.

### 1.7 Ruang Lingkup MVP dan Prioritas

| Kode | Fitur                                                                | Prioritas | Alasan                                                                |
| ---- | -------------------------------------------------------------------- | --------- | --------------------------------------------------------------------- |
| A1   | Beranda (hero maskot, penjelasan singkat, kartu navigasi cepat, CTA) | P0        | Pintu masuk dan kesan pertama bagi juri dan anak                      |
| A2   | Navigasi responsif + sidebar drawer mobile                           | P0        | Syarat akses di ponsel, tanpa ini produk tidak bisa dipakai           |
| B1   | Katalog sampah                                                       | P0        | Inti nilai edukasi                                                    |
| B2   | Pencarian sampah                                                     | P0        | Cara tercepat bagi anak menemukan jawaban                             |
| B3   | Filter kategori                                                      | P0        | Mendukung eksplorasi dan pemahaman 5 kategori                         |
| B4   | Detail informasi sampah                                              | P0        | Tempat panduan penanganan disampaikan                                 |
| B5   | Panduan pemilahan                                                    | P0        | Ringkasan konsep 5 kategori dan tongnya                               |
| B6   | Catatan keamanan sampah (B3 / e-waste)                               | P0        | Kewajiban keselamatan untuk audiens anak                              |
| B7   | Tips ramah lingkungan                                                | P1        | Memperkuat SDG 12 dan 13, tetapi tidak menghalangi alur belajar utama |
| C1   | Kuis interaktif                                                      | P0        | Diferensiasi utama (interaktivitas)                                   |
| C2   | Skor dan umpan balik real-time                                       | P0        | Bagian tak terpisahkan dari kuis                                      |
| C3   | Misi lingkungan + poin                                               | P0        | Mendorong aksi nyata dan gamifikasi                                   |
| —    | Mini-game “Tebak Tong” (seret dan lepas)                             | P2        | Menarik, tetapi menambah kompleksitas                                 |
| —    | Tombol “Salin ringkasan hasil” (clipboard)                           | P1        | Solusi ringan karena progres tidak disimpan                           |
| —    | Mode gelap, multi-bahasa, PWA offline                                | P2        | Di luar kebutuhan inti                                                |

### 1.8 Ringkasan Keputusan Produk

| Keputusan                                                                    | Label           |
| ---------------------------------------------------------------------------- | --------------- |
| Target pengguna: siswa SD–SMP                                                | \[Confirmed\]   |
| Stack: HTML5, CSS (atau Tailwind), Vanilla JavaScript                        | \[Confirmed\]   |
| Data: 3 file JSON statis (`sampah.json`, `kuis.json`, `misi.json`)           | \[Confirmed\]   |
| Lima kategori: Organik, Anorganik, B3, Residu, E-Waste                       | \[Confirmed\]   |
| Maskot Red Panda; desain ceria, bersih, modern, eco-tech                     | \[Confirmed\]   |
| Navigasi berbasis hash (`#/katalog`) pada satu `index.html` (SPA ringan)     | \[Recommended\] |
| CSS murni dengan CSS variables, bukan Tailwind (alasan di Bab 6)             | \[Recommended\] |
| Tips ramah lingkungan disimpan dalam `sampah.json` (tanpa file JSON keempat) | \[Recommended\] |
| Dua tingkat konten: **Level Tunas** (SD) dan **Level Pohon** (SMP)           | \[Recommended\] |
| Nama maskot “Rani”                                                           | \[Recommended\] |

---

## 2. Target Audience & User Persona

### 2.1 Segmentasi Pengguna

| Segmen                                   | Usia (perkiraan) | Kemampuan membaca                  | Implikasi desain                                                                        |
| ---------------------------------------- | ---------------- | ---------------------------------- | --------------------------------------------------------------------------------------- |
| SD kelas 1–3                             | 6–9 th           | Terbatas, sering perlu pendamping  | Ikon dan emoji besar, kalimat sangat pendek, tombol besar, pendamping dewasa disarankan |
| SD kelas 4–6                             | 9–12 th          | Cukup mandiri                      | Bahasa sederhana, kuis dan misi bergambar                                               |
| SMP kelas 7–9                            | 12–15 th         | Mandiri, bisa istilah ilmiah dasar | Detail tambahan (waktu terurai, alasan ilmiah), kuis level lebih tinggi                 |
| **Sekunder:** guru dan orang tua         | Dewasa           | Mandiri                            | Memakai PeduliSampah sebagai alat bantu kelas atau di rumah; tanpa akun                 |
| **Stakeholder evaluasi:** juri kompetisi | Dewasa           | Mandiri                            | Menilai konsep, desain, responsivitas, kualitas kode, dan keselarasan SDG               |

### 2.2 Persona

> Persona berikut bersifat **hipotetis** untuk memandu desain. Persona ini bukan hasil riset lapangan dan tidak boleh disajikan sebagai data penelitian.

**Persona 1 — Dika, 8 tahun, kelas 3 SD**

- **Konteks:** memakai tablet atau ponsel orang tua, kadang bersama guru di kelas.
- **Kebutuhan:** tampilan penuh gambar, tombol besar, penjelasan sangat singkat, hadiah visual setelah berhasil.
- **Pain points:** teks panjang membuatnya bosan; istilah “B3” tidak dimengerti; takut “salah”.
- **Perilaku yang diharapkan:** menjelajah kartu sampah, menjawab kuis dengan umpan balik hangat dari Rani, menyelesaikan misi sederhana seperti “Bawa botol minum sendiri hari ini”.

**Persona 2 — Nadia, 12 tahun, kelas 7 SMP**

- **Konteks:** memakai ponsel sendiri atau laptop sekolah, sering mencari bahan tugas IPA atau projek P5.
- **Kebutuhan:** jawaban cepat lewat pencarian, penjelasan ilmiah singkat (waktu terurai, alasan pemilahan), tantangan yang terasa “naik level”.
- **Pain points:** konten yang terlalu kekanak-kanakan; tidak tahu cara menangani e-waste dan baterai.
- **Perilaku yang diharapkan:** mencari “baterai”, membaca peringatan keamanan, mengerjakan kuis Level Pohon, mengejar peringkat poin.

**Persona 3 (sekunder) — Bu Rina, 38 tahun, guru kelas**

- **Konteks:** memproyeksikan PeduliSampah di kelas, tanpa kemampuan atau waktu untuk membuat akun siswa.
- **Kebutuhan:** konten yang akurat dan aman untuk anak, alur kuis yang bisa dimulai dalam hitungan detik, layar yang terbaca dari belakang kelas.
- **Pain points:** situs edukasi yang penuh iklan, meminta login, atau lambat di jaringan sekolah.

### 2.3 Prinsip Konten untuk Anak

1. Level Tunas: kalimat maksimal sekitar 15 kata; satu ide per kalimat.
2. Nada positif dan mengajak (“Yuk pilah!”), tidak menakut-nakuti atau menyalahkan.
3. Tidak meminta data pribadi, tidak ada tautan keluar ke situs lain pada antarmuka anak.
4. Instruksi untuk benda berbahaya selalu berbentuk “jangan sentuh, beri tahu orang dewasa”, tidak pernah langkah membongkar atau menangani sendiri.
5. Istilah baru (B3, residu, e-waste) selalu disertai penjelasan satu kalimat saat pertama muncul.

### 2.4 User Stories

| ID    | User Story                                                                                                                                       | Prioritas |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| US-01 | Sebagai siswa, saya ingin membuka menu lewat tombol hamburger di ponsel, sehingga saya bisa berpindah halaman dengan mudah.                      | P0        |
| US-02 | Sebagai siswa, saya ingin mengetik nama benda di kolom pencarian, sehingga saya cepat tahu benda itu termasuk sampah apa.                        | P0        |
| US-03 | Sebagai siswa, saya ingin menyaring katalog berdasarkan kategori, sehingga saya bisa mempelajari satu jenis sampah sekaligus.                    | P0        |
| US-04 | Sebagai siswa, saya ingin membuka detail sebuah sampah, sehingga saya tahu tong yang tepat dan cara menanganinya.                                | P0        |
| US-05 | Sebagai siswa, saya ingin melihat peringatan jelas pada sampah berbahaya, sehingga saya tidak menyentuhnya sembarangan.                          | P0        |
| US-06 | Sebagai siswa, saya ingin membaca panduan lima kategori sampah, sehingga saya paham perbedaannya sebelum bermain.                                | P0        |
| US-07 | Sebagai siswa, saya ingin mengerjakan kuis dan langsung tahu jawabanku benar atau salah beserta alasannya, sehingga saya belajar dari kesalahan. | P0        |
| US-08 | Sebagai siswa, saya ingin melihat skor akhir dan pesan penyemangat, sehingga saya termotivasi mengulang.                                         | P0        |
| US-09 | Sebagai siswa, saya ingin memilih misi harian atau mingguan dan mendapat poin saat menyelesaikannya, sehingga saya terdorong beraksi nyata.      | P0        |
| US-10 | Sebagai siswa, saya ingin membaca tips ramah lingkungan, sehingga saya tahu kebiasaan kecil yang bisa saya mulai.                                | P1        |
| US-11 | Sebagai guru, saya ingin memakai PeduliSampah tanpa akun dan tanpa iklan, sehingga saya bisa langsung memakainya di kelas.                       | P0        |
| US-12 | Sebagai siswa SD kelas bawah, saya ingin tampilan bergambar dengan tulisan pendek, sehingga saya tidak kesulitan membaca.                        | P0        |

---

## 3. Information Architecture & File JSON Structure

### 3.1 Sitemap dan Routing

PeduliSampah berupa satu `index.html` dengan routing berbasis hash **\[Recommended\]**. Alasannya: tidak perlu konfigurasi server untuk rute, tautan langsung ke detail sampah tetap bisa dibagikan, dan tombol Back peramban berfungsi.

| Rute            | Halaman                                                 | Sumber data                                | Fitur      |
| --------------- | ------------------------------------------------------- | ------------------------------------------ | ---------- |
| `#/`            | Beranda                                                 | `sampah.json` (tips hari ini, jumlah item) | A1         |
| `#/katalog`     | Katalog Sampah                                          | `sampah.json`                              | B1, B2, B3 |
| `#/sampah/{id}` | Detail Sampah                                           | `sampah.json`                              | B4, B6     |
| `#/panduan`     | Panduan Pemilahan                                       | `sampah.json` (bagian `kategori`)          | B5, B6     |
| `#/tips`        | Tips Ramah Lingkungan                                   | `sampah.json` (bagian `tips_umum`)         | B7         |
| `#/kuis`        | Kuis Edukasi (pilih level, bermain, hasil)              | `kuis.json`                                | C1, C2     |
| `#/misi`        | Misi Lingkungan                                         | `misi.json`                                | C3         |
| rute lain       | Halaman 404 ramah anak dengan tombol kembali ke Beranda | —                                          | —          |

**Menu navigasi (urutan):** Beranda · Katalog Sampah · Panduan Pilah · Kuis · Misi · Tips Hijau.

### 3.2 Struktur Folder Proyek

```
PeduliSampah/
├── index.html
├── css/
│   └── style.css            # CSS variables, komponen, responsif
├── js/
│   ├── app.js               # inisialisasi, state sesi (memori)
│   ├── router.js            # routing hash
│   ├── data.js              # fetch + cache JSON di memori + validasi
│   ├── ui/
│   │   ├── nav.js           # sidebar / drawer
│   │   ├── katalog.js       # pencarian, filter, kartu
│   │   ├── detail.js
│   │   ├── kuis.js
│   │   └── misi.js
│   └── utils.js             # debounce, normalisasi teks, acak (Fisher–Yates)
├── data/
│   ├── sampah.json
│   ├── kuis.json
│   └── misi.json
└── assets/
    ├── mascot/              # SVG Rani (beberapa ekspresi)
    └── icons/               # SVG ikon kategori
```

**Alur data (ringkas):**

1. Halaman dibuka → `router.js` membaca hash → memuat modul halaman yang diperlukan.
2. `data.js` memanggil `fetch()` ke file JSON yang dibutuhkan halaman itu, memvalidasi bentuk datanya, lalu menyimpan hasil parse di variabel memori (`Map`) selama tab terbuka.
3. Navigasi berikutnya memakai data di memori sehingga tidak ada fetch ulang.
4. Skor kuis dan poin misi disimpan hanya di objek state sesi di memori; hilang saat halaman dimuat ulang atau ditutup **\[Confirmed oleh larangan localStorage\]**.

### 3.3 Struktur File JSON

Ketentuan umum: encoding UTF-8, teks polos (tanpa HTML), nama properti memakai `snake_case` bahasa Indonesia, dan `id` memakai `kebab-case` yang unik serta tidak berubah. Contoh di bawah dipersingkat; entri lain mengikuti pola yang sama. Isi konten pada contoh adalah ilustrasi struktur dan harus ditinjau kembali kebenarannya sebelum dipakai.

#### 3.3.1 `sampah.json` — katalog, kategori, dan tips

Berisi empat bagian: `meta`, `kategori` (5 entri), `tips_umum`, dan `sampah` (daftar item). Panduan Pemilahan dibangun dari bagian `kategori`, sedangkan halaman Tips dibangun dari `tips_umum`.

```json
{
  "meta": { "versi": "1.0", "diperbarui": "2026-10-30", "bahasa": "id" },
  "kategori": [
    {
      "id": "organik",
      "nama": "Organik",
      "ikon": "assets/icons/organik.svg",
      "warna": "#3FA34D",
      "tong": { "warna": "Hijau", "label": "Tong Hijau" },
      "deskripsi_singkat": "Sampah dari tumbuhan atau hewan yang bisa membusuk.",
      "deskripsi_lengkap": "Sampah organik berasal dari sisa makhluk hidup. Mikroorganisme dapat menguraikannya menjadi kompos.",
      "ciri": ["Mudah membusuk", "Berasal dari tumbuhan atau hewan"],
      "contoh": ["Sisa sayur", "Kulit buah", "Daun kering"],
      "level_keamanan": "aman"
    },
    {
      "id": "b3",
      "nama": "B3",
      "ikon": "assets/icons/b3.svg",
      "warna": "#D64545",
      "tong": { "warna": "Merah", "label": "Tempat khusus B3" },
      "deskripsi_singkat": "B3 artinya Bahan Berbahaya dan Beracun. Jangan disentuh sendiri!",
      "deskripsi_lengkap": "Sampah B3 dapat mencemari tanah dan air atau membahayakan kesehatan jika salah ditangani.",
      "ciri": [
        "Mengandung bahan kimia atau logam berat",
        "Ada tanda peringatan pada kemasan"
      ],
      "contoh": ["Baterai bekas", "Lampu neon bekas", "Kemasan pestisida"],
      "level_keamanan": "bahaya"
    }
  ],
  "tips_umum": [
    {
      "id": "tip-botol-minum",
      "judul": "Bawa botol minum sendiri",
      "isi": "Botol minum isi ulang mengurangi sampah botol plastik sekali pakai.",
      "ikon": "💧",
      "kaitan_3r": "reduce",
      "tingkat": ["SD", "SMP"]
    }
  ],
  "sampah": [
    {
      "id": "kulit-pisang",
      "nama": "Kulit Pisang",
      "kategori_id": "organik",
      "ikon": "🍌",
      "kata_kunci": ["pisang", "kulit buah", "sisa makanan"],
      "deskripsi_singkat": "Kulit pisang bisa membusuk dan menjadi kompos.",
      "deskripsi_lengkap": "Kulit pisang kaya bahan organik. Bila dikomposkan, ia berubah menjadi pupuk untuk tanaman.",
      "waktu_terurai": "Perkiraan beberapa minggu, tergantung kondisi",
      "tong": "Hijau",
      "cara_tangani": [
        "Kumpulkan bersama sisa sayur dan buah.",
        "Masukkan ke tong hijau atau tempat kompos."
      ],
      "tips_3r": [
        {
          "jenis": "recycle",
          "isi": "Jadikan kompos untuk menyuburkan tanaman."
        }
      ],
      "fakta_seru": "Sampah organik yang menumpuk di tempat pembuangan dapat menghasilkan gas metana.",
      "keamanan": {
        "level": "aman",
        "perlu_pendamping": false,
        "peringatan": null
      }
    },
    {
      "id": "baterai-bekas",
      "nama": "Baterai Bekas",
      "kategori_id": "b3",
      "ikon": "🔋",
      "kata_kunci": ["baterai", "aki", "batu baterai"],
      "deskripsi_singkat": "Baterai bekas mengandung bahan berbahaya.",
      "deskripsi_lengkap": "Baterai mengandung logam dan bahan kimia yang dapat mencemari lingkungan bila dibuang sembarangan.",
      "waktu_terurai": "Sangat lama dan berbahaya bagi lingkungan",
      "tong": "Tempat khusus B3",
      "cara_tangani": [
        "Jangan dibongkar, dibakar, atau digigit.",
        "Minta orang dewasa menaruhnya di wadah tertutup, terpisah dari sampah lain.",
        "Serahkan ke tempat pengumpulan B3 atau e-waste terdekat."
      ],
      "tips_3r": [
        {
          "jenis": "reduce",
          "isi": "Pilih baterai isi ulang bila memungkinkan."
        }
      ],
      "fakta_seru": "Satu jenis baterai yang sama bisa diisi ulang ratusan kali.",
      "keamanan": {
        "level": "bahaya",
        "perlu_pendamping": true,
        "peringatan": "Jangan disentuh bila bocor atau terasa panas. Jauhi dan beri tahu orang dewasa."
      }
    }
  ]
}
```

| Properti item `sampah`                             | Wajib | Catatan                                                       |
| -------------------------------------------------- | ----- | ------------------------------------------------------------- |
| `id`, `nama`, `kategori_id`                        | Ya    | `kategori_id` harus ada di `kategori[].id`                    |
| `ikon`                                             | Ya    | Emoji agar ringan; tidak butuh file gambar                    |
| `kata_kunci`                                       | Ya    | Dipakai pencarian (sinonim, nama populer)                     |
| `deskripsi_singkat`                                | Ya    | Level Tunas; maksimal sekitar 15 kata per kalimat             |
| `deskripsi_lengkap`                                | Ya    | Level Pohon; ditampilkan lewat tombol “Pelajari lebih lanjut” |
| `tong`, `cara_tangani`                             | Ya    | `cara_tangani` berupa array langkah pendek                    |
| `waktu_terurai`, `tips_3r`, `fakta_seru`           | Tidak | Bila ada, ditampilkan; bila tidak ada, bagian disembunyikan   |
| `keamanan.level`                                   | Ya    | `aman` \| `hati-hati` \| `bahaya`                             |
| `keamanan.perlu_pendamping`, `keamanan.peringatan` | Ya    | Wajib `true` dan terisi untuk level `bahaya`                  |

#### 3.3.2 `kuis.json` — bank soal

```json
{
  "meta": { "versi": "1.0", "diperbarui": "2026-10-30" },
  "aturan": {
    "soal_per_sesi": 10,
    "poin_per_benar": 10,
    "acak_soal": true,
    "acak_pilihan": true
  },
  "level": [
    {
      "id": "tunas",
      "nama": "Level Tunas",
      "untuk": "SD",
      "deskripsi": "Soal singkat dan bergambar."
    },
    {
      "id": "pohon",
      "nama": "Level Pohon",
      "untuk": "SMP",
      "deskripsi": "Soal dengan alasan ilmiah dasar."
    }
  ],
  "pesan_hasil": [
    {
      "min_persen": 0,
      "judul": "Ayo semangat!",
      "isi": "Tidak apa-apa salah. Yuk baca panduan lalu coba lagi.",
      "ekspresi_maskot": "semangat"
    },
    {
      "min_persen": 60,
      "judul": "Kerja bagus!",
      "isi": "Kamu sudah paham banyak hal tentang memilah sampah.",
      "ekspresi_maskot": "senang"
    },
    {
      "min_persen": 90,
      "judul": "Pahlawan Hijau!",
      "isi": "Hampir sempurna! Ajak temanmu ikut memilah.",
      "ekspresi_maskot": "merayakan"
    }
  ],
  "soal": [
    {
      "id": "q-001",
      "level": "tunas",
      "kategori_id": "organik",
      "sampah_id": "kulit-pisang",
      "pertanyaan": "Kulit pisang termasuk sampah apa?",
      "pilihan": [
        { "id": "a", "teks": "Organik" },
        { "id": "b", "teks": "Anorganik" },
        { "id": "c", "teks": "B3" }
      ],
      "jawaban_benar": "a",
      "umpan_balik": {
        "benar": "Hebat! Kulit pisang berasal dari tumbuhan dan bisa membusuk, jadi termasuk sampah organik.",
        "salah": "Hampir! Kulit pisang berasal dari tumbuhan dan bisa membusuk, jadi termasuk sampah organik."
      }
    },
    {
      "id": "q-021",
      "level": "pohon",
      "kategori_id": "b3",
      "sampah_id": "baterai-bekas",
      "pertanyaan": "Mengapa baterai bekas tidak boleh dibuang bersama sampah rumah tangga biasa?",
      "pilihan": [
        { "id": "a", "teks": "Karena bentuknya kecil dan mudah hilang" },
        {
          "id": "b",
          "teks": "Karena mengandung bahan berbahaya yang dapat mencemari lingkungan"
        },
        { "id": "c", "teks": "Karena baterai selalu bisa dikomposkan" },
        { "id": "d", "teks": "Karena baterai tidak punya warna" }
      ],
      "jawaban_benar": "b",
      "umpan_balik": {
        "benar": "Tepat! Baterai termasuk B3 sehingga harus dikumpulkan di tempat khusus.",
        "salah": "Belum tepat. Baterai mengandung bahan berbahaya sehingga harus diserahkan ke tempat pengumpulan khusus."
      }
    }
  ]
}
```

Ketentuan soal **\[Recommended\]**: 3–4 pilihan; tepat satu jawaban benar; `umpan_balik.salah` harus menjelaskan _mengapa_, bukan hanya “salah”; hindari soal yang jawabannya bergantung pada warna tong lokal tanpa menyebut warnanya di bank materi (lihat Open Question OQ-03).

#### 3.3.3 `misi.json` — tantangan dan poin

```json
{
  "meta": { "versi": "1.0", "diperbarui": "2026-10-30" },
  "peringkat": [
    { "min_poin": 0, "nama": "Panda Pemula", "ikon": "🐼" },
    { "min_poin": 50, "nama": "Penjaga Daun", "ikon": "🍃" },
    { "min_poin": 150, "nama": "Pahlawan Hijau", "ikon": "🌏" },
    { "min_poin": 300, "nama": "Duta Bumi", "ikon": "🏆" }
  ],
  "misi": [
    {
      "id": "m-h-001",
      "jenis": "harian",
      "judul": "Bawa Botol Minum Sendiri",
      "deskripsi": "Hari ini minum dari botol isi ulang, bukan botol plastik sekali pakai.",
      "langkah": [
        "Isi botol minum di rumah.",
        "Bawa ke sekolah.",
        "Isi ulang saat habis."
      ],
      "poin": 10,
      "tingkat": ["SD", "SMP"],
      "butuh_pendamping": false,
      "kaitan_sdg": [12],
      "kategori_id": "anorganik",
      "tips_keamanan": null
    },
    {
      "id": "m-m-003",
      "jenis": "mingguan",
      "judul": "Siapkan Dua Wadah Sampah di Rumah",
      "deskripsi": "Bersama keluarga, pisahkan sampah organik dan anorganik selama seminggu.",
      "langkah": [
        "Siapkan dua wadah dan beri label.",
        "Pilah sampah setiap hari.",
        "Ceritakan hasilnya ke guru atau teman."
      ],
      "poin": 40,
      "tingkat": ["SD", "SMP"],
      "butuh_pendamping": true,
      "kaitan_sdg": [12, 13],
      "kategori_id": null,
      "tips_keamanan": "Jangan menyentuh pecahan kaca atau benda tajam. Minta bantuan orang dewasa."
    }
  ]
}
```

**Aturan poin (digabung untuk seluruh produk) \[Recommended\]:**

- **Poin Lingkungan** = jumlah poin misi yang ditandai selesai + skor kuis terbaik pada sesi yang sedang berjalan.
- Setiap misi hanya bisa diselesaikan satu kali per sesi; mengulang kuis tidak menjumlahkan skor, hanya mengambil yang terbaik, agar poin tidak bisa diperbesar dengan mengulang tanpa belajar.
- Misi bersifat **kejujuran diri** (anak mencentang sendiri). Sistem tidak memverifikasi karena tidak ada backend; ini sengaja dijelaskan kepada anak dengan bahasa sederhana.
- Misi yang melibatkan benda tajam, benda berbahaya, atau area di luar rumah wajib memiliki `butuh_pendamping: true`.
- Ambang `peringkat` disesuaikan agar peringkat tertinggi dapat dicapai tetapi tidak instan; angka di atas perlu diuji dan dikalibrasi ulang setelah isi misi final.

### 3.4 Aturan Integritas dan Validasi Data

1. **ID unik** di setiap file; tidak dipakai ulang walau entri dihapus.
2. **Integritas referensi:** `sampah[].kategori_id` harus ada di `kategori[].id`; `soal[].sampah_id` (bila ada) harus ada di `sampah[].id`; `soal[].jawaban_benar` harus ada di `pilihan[].id`; `misi[].kategori_id` (bila ada) harus valid.
3. **Keselamatan:** setiap item berkategori `b3` atau `e-waste` wajib memiliki `keamanan.level = bahaya` atau `hati-hati`, `perlu_pendamping = true`, dan `peringatan` terisi.
4. **Render aman:** seluruh teks dari JSON ditampilkan dengan `textContent`, bukan `innerHTML`, sehingga isi file tidak dapat menyuntikkan skrip.
5. **Validasi saat dimuat:** `data.js` memeriksa properti wajib. Entri yang rusak dilewati dan dicatat di console; bila file gagal total, halaman terkait menampilkan _error state_ (lihat FR-003).
6. **Volume konten minimum \[Recommended\]:** ≥ 40 item sampah (≥ 6 per kategori), ≥ 30 soal (15 Tunas dan 15 Pohon), ≥ 12 misi (6 harian dan 6 mingguan).
7. **Batas ukuran (sebelum minifikasi) \[Recommended\]:** `sampah.json` ≤ 80 KB, `kuis.json` ≤ 50 KB, `misi.json` ≤ 20 KB.
8. **Akurasi konten:** sebelum final, isi katalog sebaiknya ditinjau oleh guru atau dibandingkan dengan sumber resmi. Cantumkan sumber pada properti opsional `meta.sumber`.
9. **B3 dan e-waste:** dalam banyak regulasi, e-waste termasuk bagian dari B3. PeduliSampah memisahkannya menjadi dua kategori agar anak lebih mudah memahami. Panduan Pemilahan harus menjelaskan hubungan ini dengan satu kalimat.

### 3.5 Analisis Kebutuhan Penyimpanan

| Pertanyaan              | Jawaban                                                                                                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Database Required**   | **No**                                                                                                                                                                                                       |
| **Recommended Storage** | File JSON statis yang dimuat lewat `fetch()`, ditambah state sesi di memori JavaScript                                                                                                                       |
| **Reasoning**           | Konten bersifat hanya-baca; tidak ada akun; tidak ada data pribadi anak; tidak ada kebutuhan sinkronisasi antarperangkat                                                                                     |
| **Trade-off 1**         | Skor dan poin hilang saat halaman dimuat ulang atau ditutup. Mitigasi: tampilkan pesan “Poinmu berlaku selama halaman ini terbuka”, buat sesi kuis singkat, dan sediakan tombol _Salin ringkasan hasil_ (P1) |
| **Trade-off 2**         | Tidak ada papan peringkat atau progres lintas hari. Ini sesuai dengan batasan privasi anak                                                                                                                   |
| **Trade-off 3**         | Memperbarui konten berarti mengedit JSON lalu men-deploy ulang                                                                                                                                               |

**Batasan teknis penting — `fetch()` dan `file://`:** banyak peramban memblokir `fetch()` ke file lokal bila `index.html` dibuka langsung dengan alamat `file://`. Produk karenanya harus dijalankan lewat server HTTP. Saat pengembangan, gunakan ekstensi Live Server atau `python -m http.server`; untuk produksi, gunakan hosting statis (misalnya GitHub Pages, Netlify, Vercel, atau Cloudflare Pages). Aplikasi harus menampilkan pesan error yang menjelaskan hal ini jika JSON tidak dapat dimuat.

---

## 4. Functional Requirements & Feature Specifications

### 4.1 Indeks Requirement dan Keterlacakan

| ID     | Fitur                                          | Kode MVP | User Story   | Tujuan | Prioritas |
| ------ | ---------------------------------------------- | -------- | ------------ | ------ | --------- |
| FR-001 | Beranda                                        | A1       | US-11, US-12 | G2, G3 | P0        |
| FR-002 | Navigasi responsif & sidebar drawer            | A2       | US-01        | G5     | P0        |
| FR-003 | Pemuatan data, loading, empty, dan error state | —        | US-11        | G5     | P0        |
| FR-004 | Katalog sampah                                 | B1       | US-04, US-12 | G1, G2 | P0        |
| FR-005 | Pencarian sampah                               | B2       | US-02        | G2     | P0        |
| FR-006 | Filter kategori                                | B3       | US-03        | G1     | P0        |
| FR-007 | Detail informasi sampah                        | B4       | US-04        | G1, G2 | P0        |
| FR-008 | Panduan pemilahan                              | B5       | US-06        | G1     | P0        |
| FR-009 | Catatan keamanan (B3 / e-waste)                | B6       | US-05        | G4     | P0        |
| FR-010 | Tips ramah lingkungan                          | B7       | US-10        | G3     | P1        |
| FR-011 | Kuis edukasi interaktif                        | C1       | US-07        | G1     | P0        |
| FR-012 | Skor & umpan balik real-time                   | C2       | US-07, US-08 | G1, G3 | P0        |
| FR-013 | Misi lingkungan & poin                         | C3       | US-09        | G3     | P0        |
| FR-014 | Routing, halaman 404, dan state sesi           | —        | US-01        | G5     | P0        |

### 4.2 State Sesi (hanya di memori)

Seluruh state aplikasi berada dalam satu objek JavaScript dan **tidak** ditulis ke penyimpanan apa pun.

```js
const state = {
  data: { sampah: null, kuis: null, misi: null }, // hasil parse JSON (cache memori)
  katalog: { kataKunci: "", kategoriId: "semua" },
  kuis: {
    levelId: "tunas",
    soal: [],
    indeks: 0,
    skor: 0,
    jawaban: [],
    selesai: false,
  },
  skorKuisTerbaik: 0,
  misiSelesai: new Set(), // id misi yang diselesaikan
};
```

### 4.3 Spesifikasi Fitur

#### FR-001 — Beranda (A1) · P0

- **Tujuan:** memberi kesan pertama yang ramah dan mengarahkan anak ke aktivitas inti dalam satu ketukan.
- **Prasyarat:** tidak ada; halaman dapat tampil walaupun JSON gagal dimuat (konten statis ada di HTML).
- **Deskripsi perilaku — urutan bagian:**
  1. **Hero:** ilustrasi Rani (SVG), judul _“Yuk, Pilah Sampah Bareng Rani!”_, subjudul 1–2 kalimat, CTA utama **Mulai Jelajah** → `#/katalog`, CTA sekunder **Main Kuis** → `#/kuis`.
  2. **Kenapa memilah?** tiga poin bergambar: bumi lebih bersih, sampah bisa dipakai lagi, mengurangi sampah ikut menjaga iklim.
  3. **Kartu navigasi cepat:** Katalog, Panduan, Kuis, Misi, Tips — masing-masing berisi ikon, judul, dan satu baris deskripsi; seluruh kartu dapat diklik.
  4. **Strip 5 kategori:** chip berwarna; mengetuk satu chip membuka `#/katalog/{kategori_id}`.
  5. **Tips Hari Ini:** satu tips acak dari `tips_umum` setiap halaman dimuat.
  6. **Footer:** lencana SDG 12 dan SDG 13, nama tim UchanCyber, catatan “Tanpa login. Tanpa data pribadi.”
- **Business rules:** kedua CTA terlihat tanpa menggulir pada layar 360×640 px; jumlah item sampah pada teks pengantar diambil dari JSON, bukan ditulis manual.
- **Error handling:** bila `sampah.json` gagal dimuat, hanya bagian _Tips Hari Ini_ yang disembunyikan; sisa halaman tetap berfungsi.
- **Acceptance criteria:**
  - _Given_ pengguna membuka `#/` di layar 360 px, _When_ halaman selesai dimuat, _Then_ hero, judul, dan kedua CTA terlihat tanpa menggulir.
  - _Given_ pengguna mengetuk kartu **Kuis**, _When_ kartu diketuk, _Then_ rute berubah menjadi `#/kuis`.

#### FR-002 — Navigasi Responsif & Sidebar Drawer (A2) · P0

- **Tujuan:** navigasi konsisten di semua ukuran layar.
- **Deskripsi perilaku:**
  - **Desktop (≥ 1024 px):** sidebar kiri permanen selebar sekitar 260 px berisi logo, 6 menu, dan ringkasan **Poin Lingkungan**. Menu aktif ditandai visual dan `aria-current=page`.
  - **Mobile/tablet (< 1024 px):** header lengket setinggi sekitar 56 px berisi tombol hamburger, logo, dan chip poin. Sidebar yang sama berubah menjadi **drawer** yang meluncur dari kiri selebar `min(80vw, 300px)` dengan overlay gelap semi-transparan.
  - **Membuka drawer:** ketuk hamburger. Tombol memakai `aria-expanded` dan `aria-controls`.
  - **Menutup drawer:** ketuk tombol “✕”, ketuk overlay, tekan `Esc`, pilih salah satu menu, atau ubah ukuran layar menjadi ≥ 1024 px.
- **Business rules:** fokus pindah ke drawer saat dibuka dan dikunci di dalamnya (focus trap); fokus kembali ke tombol hamburger saat ditutup; konten utama diberi atribut `inert` dan gulir latar dikunci selama drawer terbuka; animasi 200–250 ms dan dimatikan bila pengguna memilih `prefers-reduced-motion`.
- **Acceptance criteria:**
  - _Given_ layar 390 px, _When_ hamburger diketuk, _Then_ drawer terbuka, overlay tampil, dan fokus berada pada item menu pertama.
  - _Given_ drawer terbuka, _When_ pengguna menekan `Esc`, _Then_ drawer tertutup dan fokus kembali ke hamburger.
  - _Given_ drawer terbuka, _When_ pengguna memilih **Kuis**, _Then_ drawer tertutup dan halaman Kuis tampil.
  - _Given_ layar 1280 px, _Then_ sidebar permanen tampil dan hamburger tidak tampil.

#### FR-003 — Pemuatan Data, Loading, Empty, dan Error State · P0

- **Deskripsi perilaku:**
  - **Pemuatan lazy per halaman:** Beranda, Katalog, Detail, Panduan, Tips → `sampah.json`; Kuis → `kuis.json`; Misi → `misi.json`. Hasil parse disimpan di `state.data`, sehingga setiap file hanya diambil satu kali per sesi.
  - **Loading:** bila pemuatan melebihi 150 ms, tampilkan _skeleton_ kartu dan Rani berekspresi berpikir; di bawah 150 ms tidak ada kedipan loading.
  - **Error:** tampilkan _“Ups, Rani belum bisa mengambil datanya”_, tombol **Coba Lagi**, dan teks bantuan yang dapat dibuka: _“Buka PeduliSampah lewat alamat web (http/https), bukan langsung dari file.”_
  - **Empty state:** setiap daftar (hasil pencarian, filter, misi) memiliki pesan kosong dengan Rani dan tombol aksi (lihat FR-005).
- **Validasi:** entri data yang tidak memenuhi skema Bab 3.4 dilewati, dicatat dengan `console.warn`, dan tidak memutus halaman.
- **Acceptance criteria:** _Given_ `sampah.json` tidak dapat diambil, _When_ pengguna membuka `#/katalog`, _Then_ error state tampil dan **Coba Lagi** memicu pengambilan ulang tanpa memuat ulang halaman.

#### FR-004 — Katalog Sampah (B1) · P0

- **Deskripsi perilaku:** grid kartu dengan 2 kolom (< 640 px), 3 kolom (640–1023 px), dan 4 kolom (≥ 1024 px, di samping sidebar). Isi kartu: emoji besar, nama, badge kategori (**warna + ikon + teks**, tidak hanya warna), dan ikon ⚠ bila `keamanan.level` bukan `aman`. Mengetuk kartu membuka `#/sampah/{id}`.
- **Business rules:** urutan awal alfabetis menurut `nama` (`localeCompare('id')`); penghitung _“Menampilkan X dari Y sampah”_ diperbarui tiap perubahan pencarian atau filter; seluruh daftar dirender sekaligus lewat `DocumentFragment` (jumlah item ≤ sekitar 100 sehingga tidak perlu virtualisasi).
- **Acceptance criteria:** _Given_ katalog berisi 40 item, _When_ halaman dibuka tanpa filter, _Then_ penghitung menampilkan 40 dari 40 dan semua kartu dapat diakses lewat keyboard (`Tab`, `Enter`).

#### FR-005 — Pencarian Sampah (B2) · P0

- **Input:** satu kolom `type=search` dengan label tersembunyi untuk pembaca layar, placeholder _“Cari: botol, baterai, kulit pisang…”_, tombol hapus (✕), maksimal 40 karakter.
- **Business rules:**
  - Teks dinormalisasi: huruf kecil, `trim`, spasi ganda dihilangkan, dan diakritik dibuang (`normalize('NFD')`).
  - Pencocokan _substring_ pada `nama` dan `kata_kunci`. Urutan hasil: nama diawali kata kunci → nama mengandung kata kunci → hanya cocok di `kata_kunci`.
  - Pembaruan dengan _debounce_ 200 ms; `Enter` memicu pembaruan seketika.
  - Pencarian dan filter kategori digabung dengan logika **AND**.
- **Expected result:** hasil diperbarui tanpa memuat ulang halaman; area `aria-live=polite` mengumumkan _“Ditemukan N sampah”_.
- **Empty state:** Rani berekspresi bingung dengan teks _“Hmm, Rani belum menemukan ‘xyz’. Coba kata lain atau lihat semua kategori.”_ dan tombol **Reset Pencarian**.
- **Validasi:** teks diperlakukan sebagai data, tidak pernah disisipkan sebagai HTML.
- **Acceptance criteria:**
  - _Given_ pengguna mengetik “bateray” atau “baterai”, _Then_ untuk “baterai” item **Baterai Bekas** muncul; untuk ejaan keliru tanpa kecocokan, empty state tampil (toleransi salah ketik adalah P2).
  - _Given_ kata kunci menghasilkan 0 hasil, _When_ pengguna menekan **Reset Pencarian**, _Then_ kolom kosong dan seluruh katalog tampil kembali.

#### FR-006 — Filter Kategori (B3) · P0

- **Deskripsi perilaku:** baris chip: **Semua** + 5 kategori (Organik, Anorganik, B3, Residu, E-Waste), masing-masing menampilkan ikon, nama, dan jumlah item. Pilihan tunggal. Di mobile baris dapat digeser horizontal dengan _scroll snap_.
- **Business rules:** chip aktif ditandai dengan warna kategori, ikon centang, dan `aria-pressed=true`; membuka `#/katalog/{kategori_id}` langsung mengaktifkan filter tersebut; tombol **Reset Filter** mengembalikan ke **Semua**.
- **Acceptance criteria:** _Given_ pengguna memilih chip **B3**, _Then_ hanya item berkategori `b3` yang tampil dan penghitung sesuai; _Given_ kata kunci aktif, _Then_ daftar adalah irisan kata kunci dan kategori.

#### FR-007 — Detail Informasi Sampah (B4) · P0

- **Deskripsi perilaku — urutan bagian pada `#/sampah/{id}`:**
  1. Tombol **← Kembali** (kembali ke katalog dengan filter dan pencarian sebelumnya tetap aktif karena state memori).
  2. Header: emoji besar, nama, badge kategori, label tong.
  3. **Catatan keamanan** (FR-009) bila level bukan `aman`, ditempatkan di atas langkah penanganan.
  4. Deskripsi singkat dan tombol **Pelajari lebih lanjut** yang membuka `deskripsi_lengkap`.
  5. **Dibuang ke mana?** kotak berwarna sesuai tong.
  6. **Cara menanganinya:** langkah bernomor.
  7. **3R:** chip Reduce / Reuse / Recycle dari `tips_3r` (disembunyikan bila kosong), serta `waktu_terurai` bila ada.
  8. **Fakta seru** dalam balon ucapan Rani.
  9. **Sampah terkait:** hingga 3 item sekategori, dan CTA **Uji pengetahuanmu** → `#/kuis`.
- **Error handling:** `id` tidak ditemukan → halaman 404 ramah anak (FR-014).
- **Acceptance criteria:** _Given_ pengguna membuka `#/sampah/baterai-bekas`, _Then_ banner keamanan merah tampil sebelum bagian **Cara menanganinya**.

#### FR-008 — Panduan Pemilahan (B5) · P0

- **Deskripsi perilaku:** (1) pengantar 2 kalimat; (2) **Pohon Keputusan** statis “Langkah memilah”; (3) lima kartu kategori (dari `kategori[]`) berisi ikon, nama, warna tong, deskripsi singkat, ciri, dan contoh yang menaut ke item katalog bila cocok; (4) catatan _“Warna tong bisa berbeda di tiap tempat. Cek tong di sekolahmu!”_; (5) satu kalimat yang menjelaskan hubungan B3 dan E-Waste (Bab 3.4 butir 9).
- **Urutan Pohon Keputusan (keselamatan lebih dulu):**
  1. Apakah berbahaya, beracun, atau mengandung bahan kimia? → **B3** (jangan disentuh sendiri).
  2. Apakah alat elektronik atau bagian dari alat berbaterai? → **E-Waste**.
  3. Apakah berasal dari tumbuhan atau hewan dan bisa membusuk? → **Organik**.
  4. Apakah bisa dipakai atau didaur ulang (bersih dan kering)? → **Anorganik**.
  5. Selain itu → **Residu**.
- **Acceptance criteria:** _Given_ pengguna mengetuk chip contoh “Kulit pisang” di kartu Organik, _Then_ halaman detail `kulit-pisang` terbuka.

#### FR-009 — Catatan Keamanan Sampah / Peringatan B3 untuk Anak (B6) · P0

- **Tujuan:** memastikan anak tidak menyentuh, membongkar, membakar, atau menguji sampah berbahaya.
- **Business rules berdasarkan `keamanan.level`:**

| Level       | Tampilan                                                                                       | Isi pesan                                                                     |
| ----------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `aman`      | Tanpa banner                                                                                   | —                                                                             |
| `hati-hati` | Banner kuning dengan ikon ⚠                                                                    | Isi `peringatan` (contoh: benda tajam), anjuran hati-hati                     |
| `bahaya`    | Banner merah dengan ikon tangan berhenti + Rani berekspresi waspada (tenang, tidak menakutkan) | **“Jangan disentuh sendiri. Minta bantuan orang dewasa.”** + isi `peringatan` |

- **Tempat tampil:** halaman detail (di atas langkah penanganan), ikon ⚠ pada kartu katalog, kartu kategori B3 dan E-Waste di Panduan, serta lencana **Ajak orang dewasa** pada misi dengan `butuh_pendamping = true`.
- **Larangan konten:** tidak boleh ada langkah membongkar, memecahkan, membakar, atau menguji isi suatu benda; instruksi untuk benda berbahaya hanya boleh berbentuk _jangan sentuh → beri tahu orang dewasa → serahkan ke tempat pengumpulan_.
- **Aksesibilitas:** pesan tidak mengandalkan warna saja; ikon dan teks selalu menyertai.
- **Acceptance criteria:** _Given_ seluruh item dengan `kategori_id` `b3` atau `e-waste`, _Then_ 100% menampilkan banner `bahaya` atau `hati-hati`. Pemeriksaan dilakukan lewat skrip validasi data dan uji manual.

#### FR-010 — Tips Ramah Lingkungan (B7) · P1

- **Deskripsi perilaku:** halaman `#/tips` berisi kotak penjelasan singkat 3R (Reduce, Reuse, Recycle), tab filter **Semua / Reduce / Reuse / Recycle**, dan grid kartu tips (ikon, judul, isi). Tombol **Tips Acak** menampilkan satu tips secara acak dalam balon Rani. Beranda menampilkan satu _Tips Hari Ini_.
- **Acceptance criteria:** _Given_ pengguna memilih tab **Reuse**, _Then_ hanya tips dengan `kaitan_3r = reuse` yang tampil.

#### FR-011 — Kuis Edukasi Interaktif (C1) · P0

- **Alur layar:**
  1. **Mulai:** pilih level (Tunas atau Pohon; Tunas terpilih secara bawaan) lalu tekan **Mulai Kuis**.
  2. **Soal:** bilah kemajuan _“Soal 3 dari 10”_, skor berjalan, teks pertanyaan, dan pilihan jawaban sebagai tombol besar (tinggi ≥ 48 px) berlabel A/B/C/D.
  3. **Umpan balik per soal** (FR-012), lalu tombol **Lanjut**.
  4. **Hasil** (FR-012).
- **Business rules:**
  - Sesi mengambil `soal_per_sesi` soal acak dari level terpilih tanpa duplikat (Fisher–Yates); bila bank soal kurang, seluruh soal dipakai.
  - Urutan pilihan diacak bila `acak_pilihan = true`.
  - Satu jawaban per soal; setelah dikunci tidak dapat diubah.
  - **Tidak ada timer** agar anak tidak tertekan **\[Recommended\]**; mode berwaktu masuk P2.
  - Pindah ke halaman lain di tengah sesi menampilkan dialog _“Keluar dari kuis? Skor sesi ini akan hilang.”_
  - Dukungan keyboard: tombol `1–4` atau `A–D` memilih jawaban; `Enter` melanjutkan.
- **Error handling:** soal yang tidak valid dilewati; bila `kuis.json` gagal dimuat, tampil error state (FR-003).
- **Acceptance criteria:**
  - _Given_ level Tunas dengan ≥ 10 soal, _When_ sesi dimulai, _Then_ tepat 10 soal berbeda ditampilkan satu per satu.
  - _Given_ sebuah soal sudah dijawab, _When_ pengguna mengetuk pilihan lain, _Then_ tidak terjadi perubahan.

#### FR-012 — Skor & Umpan Balik Real-Time (C2) · P0

- **Umpan balik instan (< 100 ms setelah memilih):**
  - **Benar:** pilihan menjadi hijau dengan ikon ✔ dan teks _“Benar!”_, muncul `umpan_balik.benar`, Rani senang, skor bertambah `poin_per_benar`.
  - **Salah:** pilihan anak ditandai dengan ikon ✖ dan teks _“Belum tepat”_ (nada lembut), **jawaban yang benar disorot**, muncul `umpan_balik.salah`, Rani menyemangati, skor tetap.
  - Skor berjalan di header diumumkan lewat `aria-live=polite`.
- **Layar hasil:** skor total (contoh _80 dari 100_), jumlah benar, `pesan_hasil` yang sesuai (ambang `min_persen` tertinggi yang ≤ persentase anak), ekspresi maskot sesuai, dan **tinjauan jawaban**: daftar soal yang salah dengan jawaban benar, penjelasan, dan tautan **Pelajari: {nama sampah}** ke halaman detail.
- **Aksi:** **Main Lagi** (soal baru), **Ganti Level**, **Lihat Misi**, **Ke Katalog**.
- **Business rules:** `state.skorKuisTerbaik` diperbarui hanya bila skor sesi lebih tinggi dari rekor sesi ini; skor ikut menyumbang Poin Lingkungan (Bab 3.3.3).
- **Acceptance criteria:** _Given_ 7 dari 10 jawaban benar dengan `poin_per_benar = 10`, _When_ sesi selesai, _Then_ tampil 70 dari 100 dan pesan hasil dari ambang 60%.

#### FR-013 — Misi Lingkungan & Sistem Poin (C3) · P0

- **Deskripsi perilaku:**
  - **Panel ringkasan** (atas): Poin Lingkungan, peringkat saat ini, bilah kemajuan ke peringkat berikutnya, dan penghitung misi selesai (_x dari y_).
  - **Tab Harian / Mingguan.** Kartu misi menampilkan ikon, judul, deskripsi, lencana poin (_+10 ⭐_), lencana **Ajak orang dewasa** bila perlu, tombol **Lihat Langkah** (membuka daftar langkah dan `tips_keamanan`), dan tombol **Aku sudah melakukannya!**.
  - **Menyelesaikan misi:** dialog konfirmasi _“Kamu benar-benar sudah melakukannya?”_ (**Ya!** / **Belum**). Bila Ya: poin bertambah, kartu berstatus **Selesai ✔**, Rani merayakan. Tombol kecil **Batalkan** menarik kembali poin untuk koreksi salah ketuk.
  - **Naik peringkat:** dialog perayaan singkat memuat nama dan ikon peringkat baru.
- **Business rules:**
  - Satu misi hanya dapat diselesaikan sekali per sesi.
  - **Harian** dan **Mingguan** hanyalah label frekuensi yang dianjurkan. Tanpa penyimpanan dan tanpa akun, sistem **tidak** mereset misi berdasarkan tanggal. Hal ini harus dijelaskan di halaman.
  - Peringkat = entri `peringkat` dengan `min_poin` tertinggi yang ≤ Poin Lingkungan.
  - Penjelasan permanen di halaman: _“Poin dan misi tersimpan selama halaman ini terbuka.”_
- **Empty state:** tab tanpa misi menampilkan pesan dan tombol **Lihat tab lain**.
- **Acceptance criteria:**
  - _Given_ misi bernilai 10 poin belum selesai, _When_ pengguna menekan **Aku sudah melakukannya!** lalu **Ya!**, _Then_ Poin Lingkungan bertambah 10, kartu menjadi **Selesai**, dan chip poin di header ikut diperbarui.
  - _Given_ misi sudah selesai, _When_ pengguna menekan **Batalkan**, _Then_ poin berkurang 10 dan misi dapat diselesaikan lagi.
  - _Given_ pengguna memuat ulang halaman, _Then_ seluruh poin kembali 0 dan hal ini sesuai spesifikasi.

#### FR-014 — Routing, Halaman 404, dan State Sesi · P0

- **Deskripsi perilaku:** `router.js` membaca `location.hash` saat dimuat dan pada `hashchange`. Rute yang tidak dikenal menampilkan halaman 404 dengan Rani dan tombol **Kembali ke Beranda**. Setiap perpindahan rute: gulir ke atas, fokus dipindah ke `<h1>` halaman, dan `document.title` diperbarui (contoh: _“Katalog Sampah — PeduliSampah”_).
- **Rute tambahan:** `#/katalog/{kategori_id}` (filter awal).
- **Acceptance criteria:** _Given_ alamat `#/halaman-aneh`, _Then_ halaman 404 tampil dan tombol **Kembali ke Beranda** membuka `#/`.

### 4.4 Alur Pengguna Utama

**Alur 1 — Mencari tahu cara membuang suatu benda**

1. Anak membuka Beranda lalu mengetuk **Mulai Jelajah**.
2. Di Katalog, anak mengetik “botol” → hasil diperbarui.
3. Anak mengetuk kartu **Botol Plastik** → halaman detail terbuka.
4. Anak membaca tong yang tepat dan langkahnya; _alternatif:_ bila tidak ada hasil, empty state menawarkan **Reset Pencarian**; bila `id` salah, 404.
5. **Berhasil:** anak tahu kategori dan tong dalam ≤ 3 interaksi dari beranda.

**Alur 2 — Bermain kuis**

1. Anak memilih **Kuis** dari menu atau kartu navigasi.
2. Memilih level → **Mulai Kuis**.
3. Menjawab soal → melihat umpan balik instan → **Lanjut**; diulang hingga soal terakhir.
4. Melihat skor, pesan hasil, dan tinjauan jawaban.
5. Memilih **Main Lagi**, **Pelajari: {sampah}**, atau **Lihat Misi**. _Alternatif:_ bila keluar di tengah sesi, dialog konfirmasi muncul.

**Alur 3 — Menyelesaikan misi**

1. Anak membuka **Misi** → memilih tab Harian atau Mingguan.
2. Membuka **Lihat Langkah**; bila ada lencana pendamping, mengajak orang dewasa.
3. Setelah melakukan misi di dunia nyata, mengetuk **Aku sudah melakukannya!** → **Ya!**.
4. Poin dan peringkat diperbarui; _alternatif:_ **Belum** menutup dialog tanpa perubahan.

**Alur 4 — Membuka menu di ponsel**

1. Anak mengetuk hamburger → drawer terbuka.
2. Memilih menu → drawer tertutup otomatis dan halaman tujuan tampil. _Alternatif:_ menutup lewat overlay, ✕, atau `Esc`.

---

## 5. UI/UX & Design Guidelines

### 5.1 Arah Visual: _Eco-Tech Playful_

Gaya visual: **ceria, bersih, modern, dan bernuansa eco-tech** **\[Confirmed\]**. Diterjemahkan menjadi:

- Bentuk membulat (radius kartu 16–24 px, tombol berbentuk pil), bayangan lembut, dan banyak ruang kosong.
- Ilustrasi _flat_ berbasis SVG dengan garis tebal dan warna solid.
- Sentuhan eco-tech: ornamen latar bermotif garis sirkuit tipis yang berujung daun (kontras rendah, tidak mengganggu bacaan) dan ikon ala _chip_ atau _panel surya_ pada elemen dekoratif.
- Satu ide per layar; teks pendek; tombol besar.

**Referensi desain:** brief menyebut referensi desain interaktif ramah anak dengan maskot Red Panda. Tim sebaiknya melampirkan tautan atau tangkapan layar referensinya (lihat OQ-02). Referensi dipakai sebagai _moodboard_ untuk suasana dan tata letak; seluruh ilustrasi, ikon, dan teks harus **orisinal atau berlisensi bebas**, bukan salinan dari referensi.

### 5.2 Maskot: Rani si Red Panda

Nama “Rani” adalah usulan **\[Recommended\]**. Alasan pemilihan Red Panda dapat dipakai sebagai bahan cerita: spesies ini hidup di hutan dan berstatus _Endangered_ (terancam) menurut IUCN, sehingga selaras dengan pesan menjaga lingkungan. Verifikasi ulang status ini dari situs IUCN sebelum dicantumkan di konten.

- **Karakter:** ramah, penasaran, penyemangat; tidak menggurui dan tidak pernah menyalahkan anak.
- **Ciri visual:** bulu oranye kemerahan, wajah dengan corak putih, ekor bergaris, mata besar. Aksesori tema hijau (syal daun atau topi tunas).
- **Format:** SVG inline, satu _rig_ dasar dengan beberapa ekspresi, ukuran berkas total ≤ 40 KB.
- **Aturan pemakaian:** maskot tidak menutupi konten; di halaman B3 ekspresinya waspada namun tenang; di empty state ia memberi petunjuk jalan keluar; dekoratif (`aria-hidden`) kecuali bila gambarnya menyampaikan informasi.

| Ekspresi     | Dipakai di                     |
| ------------ | ------------------------------ |
| Menyapa      | Hero Beranda                   |
| Berpikir     | Loading, awal kuis             |
| Bingung      | Pencarian tanpa hasil, 404     |
| Senang       | Jawaban benar, misi selesai    |
| Menyemangati | Jawaban salah, skor rendah     |
| Merayakan    | Skor tinggi, naik peringkat    |
| Waspada      | Banner bahaya (B3 dan e-waste) |

### 5.3 Palet Warna

| Token             | Hex       | Penggunaan                                                 |
| ----------------- | --------- | ---------------------------------------------------------- |
| `--forest`        | `#14532D` | Judul, sidebar, teks penekanan                             |
| `--green-primary` | `#1F7A4D` | Tombol utama (teks putih), tautan                          |
| `--green-leaf`    | `#3FA34D` | Aksen, ilustrasi, bilah kemajuan                           |
| `--mint`          | `#E6F6EC` | Latar kartu dan seksi                                      |
| `--cream`         | `#FFF8EC` | Latar halaman                                              |
| `--orange-panda`  | `#F2762E` | CTA sekunder, maskot (teks di atasnya memakai `--ink`)     |
| `--yellow-sun`    | `#FFC93C` | Bintang poin, banner hati-hati                             |
| `--teal-tech`     | `#2BB3C0` | Aksen eco-tech, garis sirkuit                              |
| `--ink`           | `#1F2937` | Teks isi                                                   |
| `--danger`        | `#D64545` | Bahaya, B3 (banner memakai latar `#FDECEC` dan teks gelap) |

**Warna kategori sampah** (konsisten di JSON, badge, chip, dan Panduan):

| Kategori  | Hex       | Tong (usulan, lihat OQ-03) |
| --------- | --------- | -------------------------- |
| Organik   | `#3FA34D` | Hijau                      |
| Anorganik | `#F5B700` | Kuning                     |
| B3        | `#D64545` | Merah                      |
| Residu    | `#6B7280` | Abu-abu                    |
| E-Waste   | `#3B82F6` | Biru                       |

**Aturan kontras:** badge dan chip memakai latar _tint_ muda, garis tepi berwarna kategori, ikon, dan teks `--ink`, bukan teks putih di atas warna kategori, agar kontras terjaga. Semua pasangan warna teks dan latar wajib mencapai rasio ≥ 4,5:1 (teks biasa) atau ≥ 3:1 (teks besar dan ikon) dan diverifikasi dengan alat pengecek kontras sebelum rilis. Warna tidak boleh menjadi satu-satunya pembeda makna.

### 5.4 Tipografi

- **Judul:** _Baloo 2_ atau _Nunito_ ExtraBold; **isi:** _Nunito_ Regular dan Bold **\[Recommended\]**. Keduanya berlisensi terbuka (OFL).
- Font di-_host_ sendiri dalam format WOFF2 (subset Latin, maksimal 2–3 bobot) dengan `font-display: swap` dan cadangan `system-ui, sans-serif`. Tidak memakai Google Fonts langsung karena menambah permintaan pihak ketiga (lihat Bab 6).
- Ukuran: isi ≥ 16 px (disarankan 18 px untuk Level Tunas); tombol ≥ 18 px; `line-height` 1,5–1,6; `h1` memakai `clamp(28px, 5vw, 44px)`.

### 5.5 Layout dan Responsivitas

| Breakpoint     | Rentang     | Perilaku                                                                                     |
| -------------- | ----------- | -------------------------------------------------------------------------------------------- |
| Dasar (mobile) | 320–639 px  | Satu kolom; header lengket + drawer; grid katalog 2 kolom; chip filter dapat digeser         |
| Tablet         | 640–1023 px | Grid katalog 3 kolom; hero dua kolom bila muat; drawer tetap dipakai                         |
| Desktop        | ≥ 1024 px   | Sidebar permanen 260 px; grid katalog 4 kolom; konten maksimum sekitar 1200 px dan di tengah |

- **Pendekatan:** _mobile-first_; skala jarak berbasis kelipatan 8 px.
- **Target sentuh:** ≥ 48×48 px untuk tombol utama dan pilihan kuis (minimal 44 px untuk elemen lain); jarak antartarget ≥ 8 px.
- **Hero:** di mobile maskot di atas teks lalu CTA; di desktop teks dan CTA di kiri, maskot di kanan.
- **Orientasi:** lanskap pada ponsel tetap dapat dipakai (tidak ada konten terpotong); dukungan zoom hingga 200% tanpa gulir horizontal.
- **Header lengket mobile:** hamburger kiri, logo, chip Poin Lingkungan kanan.

### 5.6 Komponen UI

| Komponen                           | Keterangan                                                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Tombol                             | Primer (hijau, teks putih), sekunder (oranye, teks gelap), ghost; status default, hover, fokus, aktif, nonaktif |
| Kartu sampah                       | Emoji besar, nama, badge kategori, ikon ⚠ bila perlu                                                            |
| Badge dan chip kategori            | Tint + garis tepi + ikon + teks                                                                                 |
| Kolom pencarian                    | Ikon kaca pembesar, tombol hapus, label tersembunyi                                                             |
| Banner keamanan                    | Dua varian: kuning (hati-hati) dan merah (bahaya)                                                               |
| Balon ucapan Rani                  | Dipakai untuk fakta seru, tips, dan umpan balik                                                                 |
| Kartu soal dan pilihan jawaban     | Tombol besar berlabel A–D, status benar, salah, dan terkunci                                                    |
| Bilah kemajuan                     | Soal ke-n dari N; kemajuan menuju peringkat berikutnya                                                          |
| Kartu misi                         | Lencana poin, lencana pendamping, tombol langkah                                                                |
| Dialog konfirmasi                  | Fokus terkunci di dalam dialog, `Esc` untuk menutup                                                             |
| Skeleton, empty state, error state | Lihat FR-003 dan FR-005                                                                                         |

### 5.7 Gerak dan Umpan Balik

- Mikro-animasi 150–300 ms: kartu naik 2 px saat hover, bintang berkilau saat poin bertambah, perayaan konfeti ringan berbasis CSS (tanpa pustaka).
- Hanya properti `transform` dan `opacity` yang dianimasikan agar mulus pada ponsel kelas menengah.
- Tidak ada kedipan lebih dari 3 kali per detik; seluruh animasi dihentikan bila `prefers-reduced-motion: reduce`.
- Tidak ada audio otomatis. Efek suara (P2) harus nonaktif secara bawaan.

### 5.8 Aksesibilitas (target WCAG 2.1 AA)

- HTML semantik: `header`, `nav`, `main`, `footer`; hierarki heading berurutan; `lang="id"`.
- Seluruh fungsi dapat dipakai dengan keyboard; indikator fokus tebal (≥ 3 px) dan kontras tinggi.
- Area `aria-live` untuk jumlah hasil pencarian, skor kuis, dan perubahan poin.
- Label untuk semua kontrol; teks alternatif untuk gambar informatif; tidak ada teks yang tertanam dalam gambar.
- Pesan keamanan dan status tidak bergantung pada warna semata.
- Uji manual dengan pembaca layar (TalkBack atau VoiceOver) pada alur 1–4.

### 5.9 Gaya Bahasa (Microcopy)

| Situasi          | Contoh teks                                                       |
| ---------------- | ----------------------------------------------------------------- |
| Sapaan           | “Hai! Aku Rani. Yuk, kita pilah sampah bareng!”                   |
| Jawaban benar    | “Keren! Kamu paham banget.”                                       |
| Jawaban salah    | “Hampir! Yuk lihat kenapa jawabannya begini.”                     |
| Pencarian kosong | “Hmm, Rani belum menemukan itu. Coba kata lain, ya!”              |
| Peringatan B3    | “Stop dulu! Jangan disentuh sendiri. Minta bantuan orang dewasa.” |
| Misi selesai     | “Hore! Kamu menjaga bumi hari ini.”                               |

---

## 6. Non-Functional Requirements

Fokus utama: **client-side yang ringan dan cepat**, karena produk dipakai anak di ponsel dengan koneksi dan perangkat yang beragam.

### 6.1 Performa

| ID      | Requirement                                                                  | Target terukur           | Cara uji                          |
| ------- | ---------------------------------------------------------------------------- | ------------------------ | --------------------------------- |
| NFR-P1  | _Largest Contentful Paint_ halaman awal                                      | ≤ 2,5 detik              | Lighthouse mobile (profil bawaan) |
| NFR-P2  | _Interaction to Next Paint_                                                  | ≤ 200 ms                 | Lighthouse / DevTools             |
| NFR-P3  | _Cumulative Layout Shift_                                                    | ≤ 0,1                    | Lighthouse                        |
| NFR-P4  | Skor Lighthouse mobile                                                       | Performance ≥ 90         | Lighthouse                        |
| NFR-P5  | Total transfer pemuatan awal (HTML, CSS, JS, font, aset kritis, terkompresi) | ≤ 300 KB                 | Tab Network                       |
| NFR-P6  | JavaScript total tanpa framework                                             | ≤ 60 KB terkompresi      | Tab Network                       |
| NFR-P7  | CSS total                                                                    | ≤ 30 KB terkompresi      | Tab Network                       |
| NFR-P8  | Pembaruan hasil pencarian atau filter (≤ 200 item)                           | ≤ 50 ms                  | DevTools Performance              |
| NFR-P9  | Umpan balik jawaban kuis                                                     | < 100 ms setelah ketukan | DevTools Performance              |
| NFR-P10 | Ukuran file JSON (sebelum kompresi)                                          | Sesuai Bab 3.4 butir 7   | Pemeriksaan manual                |

Target di atas adalah **usulan awal**; kalibrasi ulang setelah pengujian pada perangkat nyata.

**Strategi implementasi:**

1. **Nol dependensi runtime:** tanpa framework, tanpa jQuery, tanpa pustaka animasi. Tailwind **tidak boleh** dimuat lewat skrip CDN di produksi (kompilasi di peramban dan ukuran besar). Bila tim tetap memilih Tailwind, gunakan CLI dengan _purge_ sehingga CSS akhir ≤ 30 KB.
2. **Pemuatan:** `<script type="module">` (otomatis _defer_); pecah modul per halaman dan muat dengan `import()` saat rute dibuka; JSON diambil lazy per halaman lalu disimpan di memori sehingga tidak ada `fetch` ulang.
3. **Aset:** ilustrasi dan ikon berupa SVG inline atau sprite; ikon item sampah memakai emoji (tanpa berkas); bila ada gambar raster, gunakan WebP dengan `width` dan `height` eksplisit serta `loading="lazy"` untuk yang di bawah lipatan.
4. **Font:** _self-host_ WOFF2 subset, `preload` untuk satu bobot kritis, `font-display: swap`.
5. **Rendering:** _event delegation_ pada elemen akar, `DocumentFragment` untuk daftar, `content-visibility: auto` untuk bagian panjang, animasi hanya `transform` dan `opacity`.
6. **Caching:** nama berkas aset berversi (misalnya `app.js?v=1.0`) dan _header_ cache bawaan hosting statis; tanpa localStorage, tanpa _service worker_ di MVP (PWA masuk P2).
7. **Memori:** pasang dan lepas _listener_ dengan benar saat berpindah halaman agar tidak bocor selama sesi panjang.

### 6.2 Kompatibilitas

- Peramban modern terbaru: Chrome, Edge, Firefox, Safari (iOS 15+), Samsung Internet **\[Assumption\]**.
- Lebar layar minimum 320 px; orientasi potret dan lanskap.
- Memakai fitur standar (ES Modules, `fetch`, CSS Grid, CSS variables); tanpa fitur eksperimental.
- Bila JavaScript dinonaktifkan, tampilkan pesan `<noscript>` yang ramah.

### 6.3 Keamanan dan Privasi

- **Tanpa pengumpulan data pribadi**; tanpa cookie, tanpa pelacak, tanpa analitik pihak ketiga.
- **Tanpa permintaan pihak ketiga:** font, ikon, dan skrip semuanya _self-hosted_.
- _Header_ yang disarankan di hosting: `Content-Security-Policy: default-src 'self'` serta HTTPS wajib.
- Seluruh data dari JSON dirender memakai `textContent`; tidak memakai `eval` maupun `innerHTML` untuk data.
- Tidak ada tautan keluar pada antarmuka anak; bila ada tautan kredit, gunakan `rel="noopener noreferrer"`.
- Konten ditinjau agar aman untuk anak (lihat FR-009 dan Bab 2.3).

### 6.4 Keandalan

- Setiap halaman memiliki loading, empty, dan error state.
- Data rusak tidak boleh menjatuhkan seluruh aplikasi (validasi dan _skip_ entri).
- Koneksi dibutuhkan untuk pemuatan pertama; mode luring penuh adalah P2.

### 6.5 Maintainability dan Pengujian

- Kode modular (ES Modules), penamaan konsisten, komentar JSDoc pada fungsi publik, format memakai Prettier.
- Konten dapat diperbarui hanya dengan mengedit JSON, tanpa mengubah kode.
- Sediakan skrip validasi integritas JSON (Bab 3.4) yang dapat dijalankan di peramban atau Node.
- **Matriks uji minimum:** Chrome Android, Safari iOS, Chrome dan Firefox desktop; lebar 360, 768, dan 1280 px; uji keyboard; uji pembaca layar pada alur utama; uji dengan jaringan _Slow 4G_.

---

## 7. Risks, Assumptions, Dependencies, and Open Questions

### 7.1 Risiko

| ID  | Risiko                                                                 | Dampak                                 | Mitigasi                                                                              |
| --- | ---------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------- |
| R1  | `fetch()` gagal bila `index.html` dibuka langsung dari `file://`       | Juri melihat halaman kosong atau error | Hosting online; README cara menjalankan server lokal; pesan error yang jelas (FR-003) |
| R2  | Poin dan skor hilang saat halaman dimuat ulang                         | Anak kecewa                            | Pesan jelas di UI, sesi singkat, tombol salin ringkasan (P1)                          |
| R3  | Misi bersifat _self-report_ sehingga mudah dicurangi                   | Poin tidak bermakna                    | Fokus pada edukasi, tanpa papan peringkat; bahasa kejujuran diri                      |
| R4  | Akurasi konten dan aturan pemilahan berbeda antardaerah                | Informasi keliru                       | Tinjau oleh guru atau sumber resmi; catatan “aturan daerah bisa berbeda”              |
| R5  | Anak mencoba menangani B3 atau e-waste sendiri                         | Risiko keselamatan                     | FR-009, tanpa instruksi pembongkaran, lencana pendamping                              |
| R6  | Aset maskot atau ikon melanggar hak cipta atau terlalu mirip referensi | Masalah legal dan penilaian            | Buat orisinal atau gunakan lisensi bebas; catat sumber di README                      |
| R7  | Font atau CSS eksternal (termasuk Tailwind CDN) memperlambat halaman   | Gagal target performa                  | Aturan Bab 6.1                                                                        |
| R8  | Cakupan terlalu luas untuk waktu kompetisi                             | MVP tidak selesai                      | Prioritas P0, P1, P2; Tips (P1) dapat menyusul                                        |
| R9  | Warna tong berbeda antar sekolah atau daerah                           | Kebingungan                            | Catatan di Panduan dan soal kuis tidak bergantung warna lokal                         |

### 7.2 Asumsi

- **A1** Pengguna memiliki koneksi internet saat pertama kali membuka situs. **\[Assumption\]**
- **A2** Perangkat utama adalah ponsel Android kelas menengah dan laptop sekolah. **\[Assumption\]**
- **A3** Siswa SD kelas bawah dibantu pendamping. **\[Assumption\]**
- **A4** Seluruh konten berbahasa Indonesia. **\[Assumption\]**
- **A5** Hosting statis HTTPS gratis dapat dipakai. **\[Assumption\]**
- **A6** sessionStorage, cookie, dan IndexedDB tidak digunakan. **\[Assumption\]**

### 7.3 Dependensi

- Hosting statis (GitHub Pages, Netlify, Vercel, atau Cloudflare Pages).
- Aset ilustrasi: maskot Rani dan ikon kategori (siapa yang membuat dan dalam format apa).
- Konten awal untuk tiga file JSON beserta reviewer akurasi.
- Font berlisensi OFL yang di-_host_ sendiri.
- Perangkat uji nyata (minimal satu ponsel Android dan satu iOS bila tersedia).

### 7.4 Pertanyaan Terbuka

| ID    | Pertanyaan                                                                               | Usulan bawaan bila tidak dijawab                                                                            |
| ----- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| OQ-01 | Bagaimana juri mengakses produk: URL online atau berkas lokal?                           | URL online ditambah arsip kode dengan README                                                                |
| OQ-02 | Referensi desain interaktif mana yang dimaksud (tautan atau tangkapan layar)?            | Moodboard sendiri bertema Red Panda dan eco-tech                                                            |
| OQ-03 | Acuan warna tong apa yang dipakai (peraturan resmi, SNI, atau kebiasaan sekolah)?        | Hijau, kuning, merah, abu-abu, biru ditambah catatan “cek tong di sekolahmu”; verifikasi dengan acuan resmi |
| OQ-04 | CSS murni atau Tailwind?                                                                 | CSS murni dengan CSS variables                                                                              |
| OQ-05 | Nama maskot dan sumber ilustrasi (gambar sendiri, aset berlisensi, atau alat generatif)? | Nama Rani; SVG orisinal buatan tim                                                                          |
| OQ-06 | Bolehkah sessionStorage dipakai agar progres bertahan selama tab terbuka?                | Tidak; hanya memori                                                                                         |
| OQ-07 | Perlu efek suara atau narasi audio untuk anak kelas bawah?                               | Tidak di MVP (P2)                                                                                           |
| OQ-08 | Perlu halaman cetak atau lembar kerja untuk guru?                                        | Tidak di MVP (P2)                                                                                           |
| OQ-09 | Apakah kuis perlu timer?                                                                 | Tidak (anak tidak ditekan)                                                                                  |
| OQ-10 | Siapa yang meninjau akurasi konten sampah dan soal?                                      | Satu guru atau pembimbing tim                                                                               |

---

## 8. Release Plan dan Kriteria Kesiapan

Durasi tidak dicantumkan karena belum ada estimasi tim; tahapan di bawah menunjukkan **urutan** pengerjaan.

1. **Fase 0 — Persiapan:** struktur proyek, token desain (warna, tipografi), maskot dan ikon, skema JSON final, dan konten awal.
2. **Fase 1 — Fondasi:** `router.js`, `data.js`, state sesi, navigasi dan drawer, Beranda, loading, error, dan 404 (FR-001 sampai FR-003, FR-014).
3. **Fase 2 — Edukasi:** katalog, pencarian, filter, detail, panduan, dan catatan keamanan (FR-004 sampai FR-009).
4. **Fase 3 — Gamifikasi:** kuis, skor dan umpan balik, misi, dan poin (FR-011 sampai FR-013).
5. **Fase 4 — Penyempurnaan:** tips (FR-010), aksesibilitas, optimasi performa, uji perangkat, finalisasi konten, README, dan deploy.

**Kriteria kesiapan MVP:**

- Seluruh requirement P0 lulus acceptance criteria.
- 100% item B3 dan e-waste memiliki peringatan keamanan.
- Konten memenuhi volume minimum Bab 3.4 butir 6.
- Lighthouse mobile: Performance ≥ 90 dan Accessibility ≥ 95.
- Lulus uji pada lebar 360, 768, dan 1280 px dan pada Chrome Android serta Safari iOS.
- Tidak ada penggunaan localStorage, cookie, atau permintaan pihak ketiga (diperiksa lewat tab Application dan Network).
- Situs dapat diakses lewat URL HTTPS dan README tersedia.

**Kriteria rilis:** kriteria MVP terpenuhi, seluruh Pertanyaan Terbuka yang berdampak (OQ-01, OQ-03, OQ-05) telah dijawab tim, dan satu putaran uji coba dengan minimal 3 anak atau guru tanpa temuan keamanan konten.

---

## 9. Glosarium

| Istilah          | Arti                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| **B3**           | Bahan Berbahaya dan Beracun; sampah yang dapat membahayakan kesehatan atau mencemari lingkungan |
| **E-Waste**      | Sampah elektronik, misalnya ponsel, kabel, dan pengisi daya bekas                               |
| **Organik**      | Sampah dari makhluk hidup yang dapat membusuk                                                   |
| **Anorganik**    | Sampah yang tidak mudah membusuk, banyak yang dapat didaur ulang                                |
| **Residu**       | Sampah yang tidak dapat dipilah atau didaur ulang lebih lanjut                                  |
| **3R**           | _Reduce_ (kurangi), _Reuse_ (pakai ulang), _Recycle_ (daur ulang)                               |
| **SDG**          | _Sustainable Development Goals_, tujuan pembangunan berkelanjutan PBB                           |
| **Drawer**       | Panel menu yang meluncur dari sisi layar pada tampilan mobile                                   |
| **Hash routing** | Perpindahan halaman memakai bagian `#` pada alamat tanpa memuat ulang                           |
| **Skeleton**     | Kerangka abu-abu sementara yang tampil selagi konten dimuat                                     |
| **Debounce**     | Teknik menunda proses hingga pengguna berhenti mengetik sejenak                                 |
