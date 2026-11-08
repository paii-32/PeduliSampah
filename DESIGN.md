# DESIGN.md — PeduliSampah

**Sistem Desain "Eco-Tech Playful" untuk Platform Edukasi Pemilahan Sampah**

| Atribut             | Isi                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| Produk              | PeduliSampah — Platform Edukasi Pemilahan Sampah                                                        |
| Tim                 | UchanCyber                                                                                              |
| Subtema             | GreenTech & Sustainable Environment (SDG 12 & SDG 13)                                                   |
| Audiens             | Siswa SD hingga SMP                                                                                     |
| Versi               | 1.0 (Draft untuk review tim)                                                                            |
| Terakhir diperbarui | 30 Oktober 2026                                                                                         |
| Dokumen induk       | PRD PeduliSampah v1.0 (Bab 5 dan FR-001 s.d. FR-014)                                                    |
| Stack               | HTML5, CSS murni (CSS variables), Vanilla JavaScript; data dari `sampah.json`, `kuis.json`, `misi.json` |

---

## 0. Cara Memakai Dokumen Ini

### 0.1 Cakupan dan sumber

Dokumen ini menetapkan **keputusan visual dan interaksi** yang dapat langsung diimplementasikan: token, komponen, tata letak, perilaku, dan standar aksesibilitas. Kebutuhan fungsional tetap mengacu pada PRD; bila keduanya berbeda, bagian 0.4 menjelaskan perubahannya.

**Tentang referensi visual.** Brief menyebut referensi UI/UX interaktif ramah anak dengan maskot Red Panda. Berkas atau tautan referensi tersebut **belum dilampirkan** pada dokumen ini (lihat OQ-02 di PRD). Karena itu arah visual dirumuskan dari atribut yang disebutkan di brief: layout bersih dengan banyak ruang kosong, sudut membulat 16–24 px, emoji besar sebagai ikon katalog, maskot yang memandu, serta navigasi header lengket dan drawer. Setelah referensi dilampirkan, tinjau ulang Bagian 1 dan 6, dan gunakan referensi sebagai pembanding suasana, bukan untuk disalin.

### 0.2 Status verifikasi

- **Rasio kontras** pada Bagian 3 dan 6 **dihitung** dengan rumus _relative luminance_ WCAG pada 30 Oktober 2026 (bukan perkiraan).
- **Belum diverifikasi:** tampilan di peramban dan perangkat nyata, rendering emoji lintas OS, pembaca layar, serta kinerja. Item tersebut ditandai pada daftar QA di Lampiran B.
- Dokumen ini menetapkan **target** WCAG 2.2 AA. Klaim kepatuhan hanya boleh dibuat setelah pengujian.

### 0.3 Ringkasan cepat

| Aspek         | Keputusan                                                                          |
| ------------- | ---------------------------------------------------------------------------------- |
| Gaya          | Eco-Tech Playful: datar (flat), hangat, tanpa gradien, tanpa efek kaca, tanpa neon |
| Warna dasar   | Latar Cream `#FFF8EC`, permukaan putih, aksen Mint `#E6F6EC`, teks Ink `#1F2937`   |
| Aksi utama    | Hijau `#1F7A4D` (teks putih)                                                       |
| Aksen maskot  | Oranye `#F2762E` (teks Ink), Kuning `#FFC93C` (poin)                               |
| Font          | Judul **Baloo 2** (700/800), isi **Nunito** (400/700)                              |
| Ukuran isi    | 18 px, tinggi baris 1,6                                                            |
| Radius        | Kartu 20–24 px, tombol dan kolom isian 16 px, badge 10 px, chip filter pil penuh   |
| Jarak         | Skala 4/8 px                                                                       |
| Breakpoint    | 640 px dan 1024 px (+ batas lebar konten 1120 px)                                  |
| Navigasi      | < 1024 px: header lengket + drawer; ≥ 1024 px: sidebar permanen 264 px             |
| Target sentuh | ≥ 48×48 px (aksi utama), ≥ 44×44 px (lainnya)                                      |
| Gerak         | 150–300 ms, hanya `transform` dan `opacity`, patuh `prefers-reduced-motion`        |
| Aksesibilitas | Target WCAG 2.2 AA                                                                 |

### 0.4 Penyempurnaan terhadap PRD v1.0 **[Recommended]**

PRD perlu disinkronkan dengan poin-poin berikut setelah tim menyetujuinya.

| #   | PRD v1.0                                      | DESIGN.md                                                          | Alasan                                                                                       |
| --- | --------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| 1   | Bab 5.1: tombol berbentuk pil                 | Tombol memakai radius **16 px**; pil penuh hanya untuk chip filter | Menghindari pil di mana-mana; hierarki bentuk lebih jelas (tombol = aksi, chip = pilihan)    |
| 2   | Bab 5.4: isi ≥ 16 px, 18 px untuk Level Tunas | Isi **18 px untuk semua level**                                    | Satu skala tipografi lebih konsisten; Level hanya memengaruhi isi konten                     |
| 3   | Bab 5.8: WCAG 2.1 AA                          | Target **WCAG 2.2 AA**                                             | Menambah kriteria ukuran target, fokus tidak tertutup, dan lainnya                           |
| 4   | Bab 5.3: aturan kontras badge                 | Ditambah token `-strong` untuk Anorganik dan warna "coba lagi"     | Kuning `#F5B700` hanya 1,80:1 terhadap putih sehingga tidak dapat menjadi garis tepi pembeda |
| 5   | FR-012: jawaban salah memakai ikon ✖          | Jawaban salah memakai warna **ambar "coba lagi"**, bukan merah     | Merah dipakai untuk B3 (bahaya); anak tidak boleh mengaitkan "salah" dengan "bahaya"         |

---

## 1. Design Philosophy & Visual Tone (Eco-Tech Playful)

### 1.1 Pernyataan desain

PeduliSampah harus terasa seperti **ruang bermain yang rapi di taman kota yang hijau**: hangat dan ceria untuk anak, tetapi tidak berantakan; sedikit futuristik, tetapi tidak dingin. Setiap warna, bentuk, dan gerak punya tugas: membantu anak mengenali kategori sampah, memahami cara memilah, dan merasa aman untuk mencoba lagi.

### 1.2 Enam prinsip

1. **Belajar sambil bermain, bukan menghafal.** Setiap layar mengajak anak melakukan sesuatu (mencari, memilih, menjawab, mencentang), bukan hanya membaca.
2. **Satu layar, satu tujuan.** Setiap halaman memiliki satu aksi utama yang paling menonjol (lihat 1.6). Aksi lain dibuat lebih tenang.
3. **Aman dan hangat.** Tidak ada hukuman visual atau suara untuk jawaban salah. Pesan bahaya (B3) disampaikan tenang dan jelas, tidak menakutkan.
4. **Warna berarti sesuatu.** Lima warna kategori sampah hanya dipakai untuk makna kategori. Hijau tua dipakai untuk aksi, oranye dan kuning untuk maskot dan poin. Warna tidak pernah menjadi satu-satunya penanda.
5. **Teknologi yang halus.** Unsur futuristik hadir sebagai detail kecil dan fungsional, bukan efek (lihat 1.3).
6. **Ringan.** Performa adalah bagian dari desain: ilustrasi SVG kecil, emoji sebagai ikon item, tanpa pustaka animasi, tanpa gambar raster berat.

### 1.3 Menerjemahkan "Eco-Tech Playful"

| Unsur       | Wujud nyata dalam antarmuka                                                                                                                                      | Batas agar tidak berlebihan                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Eco**     | Palet hijau alami, bentuk daun pada maskot dan ornamen, bahasa yang mengaitkan aksi kecil dengan bumi                                                            | Tidak memakai foto stok atau ilustrasi hutan yang tidak berfungsi                                                      |
| **Playful** | Rani si Red Panda, emoji besar, sudut membulat, umpan balik kecil yang menyenangkan (bintang, konfeti)                                                           | Konfeti hanya pada momen perayaan dan hanya sekali; tidak ada elemen melayang acak                                     |
| **Tech**    | Ornamen **garis sirkuit yang berujung daun** (satu motif, satu warna `--color-teal`), bilah kemajuan bergaya HUD (segmen jelas), istilah _Level_, _Poin_, _Misi_ | Ornamen sirkuit hanya di latar hero Beranda, footer, dan halaman 404; kontras rendah dan tidak pernah di belakang teks |
| **Ceria**   | Aksen oranye dan kuning pada titik penting; maskot ekspresif                                                                                                     | Satu aksen hangat dominan per layar                                                                                    |
| **Bersih**  | Banyak ruang kosong, satu tingkat wadah (tidak ada kartu di dalam kartu)                                                                                         | Ruang kosong tidak boleh menyembunyikan aksi utama                                                                     |

### 1.4 Satu antarmuka untuk dua kelompok usia

| Aspek     | Level Tunas (SD)                | Level Pohon (SMP)               | Penerapan                                                                  |
| --------- | ------------------------------- | ------------------------------- | -------------------------------------------------------------------------- |
| Bahasa    | Kalimat pendek, ≤ 15 kata       | Istilah dasar ilmiah            | Diatur oleh **isi JSON** (`deskripsi_singkat` vs `deskripsi_lengkap`)      |
| Visual    | Emoji besar, tombol besar       | Sama                            | **Tidak ada tema visual terpisah**; antarmuka tidak dibuat kekanak-kanakan |
| Kuis      | Soal bergambar, pilihan singkat | Soal bersyarat penalaran        | Level dipilih di awal kuis                                                 |
| Nada Rani | Mengajak, hangat                | Mengajak, sedikit lebih ringkas | Teks balon ucapan dari JSON dan microcopy                                  |

Prinsipnya: **satu desain yang tidak memalukan bagi siswa SMP dan tidak membingungkan bagi siswa SD kelas bawah.** Karena itu dekorasi dijaga rendah dan hierarki tipografi dibuat tegas.

### 1.5 Aturan Anti-Generik (wajib)

Daftar ini mencegah tampilan "template AI" meskipun gayanya ceria.

| Pola                                                  | Aturan di PeduliSampah                                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Gradien                                               | **Tidak dipakai.** Semua latar berupa warna solid                                                            |
| Efek kaca (_glassmorphism_), blur                     | **Tidak dipakai**                                                                                            |
| Glow, neon, garis bercahaya                           | **Tidak dipakai**                                                                                            |
| Bentuk atau partikel melayang acak                    | **Tidak dipakai.** Dekorasi hanya ornamen sirkuit-daun di tempat yang ditentukan                             |
| Kartu di dalam kartu                                  | **Dilarang.** Maksimal satu tingkat wadah; elemen di dalam kartu (ubin emoji, badge) bukan kartu             |
| Tombol dan badge berbentuk pil di mana-mana           | Pil penuh **hanya** untuk chip filter; tombol radius 16 px; badge radius 10 px                               |
| Ikon dekoratif di samping setiap judul                | **Dilarang.** Emoji hanya dipakai bila berfungsi sebagai identitas item (katalog, kartu navigasi, misi)      |
| Bayangan                                              | Kartu tidak berbayangan saat diam; bayangan hanya saat hover, drawer, dan dialog                             |
| Paralaks dan animasi masuk berlebihan                 | **Tidak dipakai**                                                                                            |
| Statistik atau testimoni palsu                        | **Tidak ada.** Angka yang tampil harus berasal dari JSON atau perhitungan sesi                               |
| Hero generik (judul besar + dua tombol + hiasan acak) | Hero memuat **Rani** dan angka nyata dari data (jumlah sampah di katalog), dengan satu CTA utama             |
| Tata letak identik di semua halaman                   | Tiap halaman memiliki komposisi sesuai tugasnya (lihat Bagian 6) tetapi memakai token dan komponen yang sama |

### 1.6 Hierarki visual dan aksi utama per halaman

| Halaman       | Aksi utama (paling menonjol)                                   | Aksi sekunder                            | Dibuat tenang       |
| ------------- | -------------------------------------------------------------- | ---------------------------------------- | ------------------- |
| Beranda       | **Mulai Jelajah** (hijau)                                      | Main Kuis (oranye); kartu navigasi cepat | Ornamen, footer     |
| Katalog       | **Kolom pencarian**                                            | Chip kategori                            | Kartu item sampah   |
| Detail Sampah | Membaca **tong yang tepat** dan **banner keamanan** (bila ada) | Uji pengetahuanmu                        | Sampah terkait      |
| Panduan Pilah | Mengikuti **pohon keputusan**                                  | Membuka kartu kategori                   | Catatan warna tong  |
| Kuis          | **Pilihan jawaban**, lalu **Lanjut**                           | Keluar                                   | Skor berjalan       |
| Misi          | **Aku sudah melakukannya!**                                    | Lihat langkah; tab                       | Ringkasan peringkat |
| Tips Hijau    | Membaca satu tips                                              | Tab 3R; Tips Acak                        | Penjelasan 3R       |

---

## 2. Character & Mascot Guidelines — Rani si Red Panda

### 2.1 Profil karakter

- **Nama:** Rani. Nama adalah usulan **[Recommended]** dan menunggu keputusan tim (OQ-05 di PRD).
- **Peran:** pemandu dan teman belajar. Rani **tidak menggurui**, tidak pernah menyalahkan anak, dan tidak menjadi "penjaga hukuman".
- **Kepribadian:** penasaran, ramah, antusias, sabar. Berbicara dengan kalimat pendek dan sapaan "aku" dan "kamu".
- **Alasan Red Panda:** hewan hutan yang menarik secara visual dan dapat dikaitkan dengan pesan menjaga lingkungan. Bila konten menyebut status konservasinya, verifikasi dulu pada sumber resmi (misalnya IUCN).

### 2.2 Anatomi visual dan palet ilustrasi

Gaya ilustrasi: **flat**, bentuk dasar (lingkaran dan segitiga membulat), garis tepi tebal cokelat tua, tanpa gradien, tanpa bayangan, tanpa tekstur bulu.

| Bagian                           | Warna                                        | Keterangan                                             |
| -------------------------------- | -------------------------------------------- | ------------------------------------------------------ |
| Bulu utama                       | `#F2762E`                                    | Sama dengan token `--color-orange`                     |
| Bulu gelap (perut, kaki, tangan) | `#3B2A22`                                    | Cokelat sangat tua                                     |
| Wajah dan telinga dalam          | `#FFF8EC`                                    | Corak putih khas red panda                             |
| Garis tepi                       | `#5A2A12`                                    | Tebal 3 px pada ukuran 200 px, diskalakan proporsional |
| Mata dan hidung                  | `#1F2937`                                    | Mata besar dengan satu kilau putih                     |
| Pipi                             | `#F9A06B`                                    | Semburat lembut                                        |
| Ekor                             | Bulu utama dengan 4 cincin `#D9600F`         | Ekor tebal; menjadi elemen ekspresi                    |
| Aksesori                         | Syal daun `#3FA34D` dengan lipatan `#1F7A4D` | Satu aksesori tetap untuk semua ekspresi               |

Proporsi: kepala sekitar 55% tinggi tubuh (_chibi_). Untuk ukuran ≤ 96 px gunakan **versi setengah badan** (kepala dan bahu) agar tetap terbaca.

### 2.3 Ragam ekspresi (7)

| Ekspresi         | Mata                                    | Mulut                | Pose dan ekor                                       | Dipakai di                     |
| ---------------- | --------------------------------------- | -------------------- | --------------------------------------------------- | ------------------------------ |
| **Menyapa**      | Terbuka lebar, kilau                    | Senyum lebar         | Satu tangan melambai, ekor melengkung santai        | Hero Beranda, awal Panduan     |
| **Berpikir**     | Melirik ke atas                         | Mulut kecil membulat | Tangan di dagu, ekor melingkar                      | Loading, awal Kuis             |
| **Bingung**      | Alis naik sebelah, mata kecil           | Garis bergelombang   | Kepala miring, tanda tanya kecil                    | Pencarian kosong, 404          |
| **Senang**       | Mata melengkung ke atas (^ ^)           | Senyum terbuka       | Dua tangan terangkat                                | Jawaban benar, misi selesai    |
| **Menyemangati** | Mata terbuka, alis lurus                | Senyum tipis         | Tangan terkepal kecil, ekor tegak                   | Jawaban salah, skor rendah     |
| **Merayakan**    | Mata berbintang                         | Mulut terbuka lebar  | Melompat, topi kerucut kecil                        | Skor tinggi, naik peringkat    |
| **Waspada**      | Mata terbuka tenang, alis sedikit turun | Garis lurus lembut   | **Satu telapak tangan terangkat (stop)**, ekor diam | Banner keamanan B3 dan e-waste |

Aturan ekspresi **Waspada**: tenang dan tegas, **bukan marah atau menakutkan**. Tanpa taring, tanpa keringat, tanpa warna merah pada tubuh Rani.

### 2.4 Ukuran dan penempatan

| Konteks                                  | Ukuran tampil                     | Versi                      |
| ---------------------------------------- | --------------------------------- | -------------------------- |
| Hero Beranda                             | 200 px (mobile), 320 px (desktop) | Seluruh badan              |
| Empty state, 404, error                  | 160 px                            | Seluruh badan              |
| Hasil kuis                               | 160 px (mobile), 200 px (desktop) | Seluruh badan              |
| Dialog (konfirmasi misi, naik peringkat) | 96 px                             | Setengah badan             |
| Banner keamanan                          | 56 px (mobile), 72 px (desktop)   | Setengah badan             |
| Balon ucapan (fakta, tips, umpan balik)  | 56–64 px                          | Setengah badan             |
| Favicon                                  | 32 px                             | Wajah saja, disederhanakan |

Aturan penempatan: (1) **maksimal satu Rani besar per layar**; (2) Rani **tidak menutupi** teks atau tombol; (3) Rani menghadap ke arah konten (dicerminkan bila perlu); (4) Rani muncul di sisi kiri balon ucapan; (5) tidak ada Rani pada setiap kartu.

### 2.5 Kemunculan Rani per halaman

| Halaman       | Kemunculan                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------ |
| Beranda       | Hero (Menyapa) + balon _Tips Hari Ini_ (Senang)                                                  |
| Katalog       | Hanya pada empty state (Bingung) dan loading (Berpikir)                                          |
| Detail Sampah | Balon _Fakta seru_ (Senang); banner B3 (Waspada)                                                 |
| Panduan Pilah | Pengantar (Menyapa)                                                                              |
| Kuis          | Awal (Berpikir), umpan balik tiap soal (Senang / Menyemangati), hasil (Merayakan / Menyemangati) |
| Misi          | Dialog konfirmasi (Berpikir), selesai (Senang), naik peringkat (Merayakan)                       |
| Tips Hijau    | Balon _Tips Acak_                                                                                |
| 404 dan error | Bingung                                                                                          |

### 2.6 Gerak Rani

- **Diam secara bawaan.** Satu-satunya animasi _idle_ yang diperbolehkan: ekor bergoyang halus (rotasi ±4°, siklus 4 detik) pada hero Beranda saja.
- Perpindahan ekspresi: _crossfade_ 150 ms. Tidak ada animasi berulang yang mengalihkan perhatian dari konten.
- Dengan `prefers-reduced-motion: reduce`, semua animasi Rani dimatikan (gambar statis).

### 2.7 Aturan keselamatan dan etika karakter

- Rani **tidak pernah digambarkan menyentuh, membuka, atau membongkar** benda B3 atau e-waste. Ilustrasi pendamping B3 hanya menunjukkan benda dari jarak aman.
- Rani tidak digambarkan membuang sampah sembarangan.
- Rani tidak menakut-nakuti dan tidak menyalahkan.
- Rani tidak meminta data pribadi, nama, atau foto anak.
- Ilustrasi **orisinal**. Jangan menyalin karakter atau aset dari referensi atau pustaka berlisensi tanpa izin; catat sumber aset di README.

### 2.8 Suara dan nada Rani (microcopy)

Prinsip: pendek, positif, mengajak, tidak menghakimi.

| Situasi          | Contoh yang dianjurkan                                            | Hindari                                                |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------------------------ |
| Sapaan           | "Hai! Aku Rani. Yuk, kita pilah sampah bareng!"                   | "Selamat datang di platform edukasi pemilahan sampah." |
| Benar            | "Keren! Kamu paham banget."                                       | "Jawaban Anda benar."                                  |
| Salah            | "Hampir! Yuk lihat kenapa jawabannya begini."                     | "Salah!", "Gagal"                                      |
| Pencarian kosong | "Hmm, Rani belum menemukan itu. Coba kata lain, ya!"              | "Data tidak ditemukan."                                |
| B3               | "Stop dulu! Jangan disentuh sendiri. Minta bantuan orang dewasa." | "BAHAYA!!!", kata-kata yang menakutkan                 |
| Misi selesai     | "Hore! Kamu menjaga bumi hari ini."                               | "Poin ditambahkan."                                    |

### 2.8.1 Istilah baru

Setiap istilah baru (B3, residu, e-waste) dijelaskan satu kalimat saat pertama muncul. Contoh balon Rani: "B3 artinya Bahan Berbahaya dan Beracun."

### 2.9 Spesifikasi aset teknis

- **Format:** satu berkas SVG per ekspresi: `assets/mascot/rani-menyapa.svg`, `rani-berpikir.svg`, `rani-bingung.svg`, `rani-senang.svg`, `rani-menyemangati.svg`, `rani-merayakan.svg`, `rani-waspada.svg`. Setiap berkas **≤ 6 KB**; total **≤ 40 KB**.
- **Pemakaian:** `<img src="..." alt="" width= height=>` dengan dimensi eksplisit agar tidak menggeser tata letak. Hero boleh memakai SVG inline bila ekor dianimasikan.
- **Alt text:** `alt=""` bila dekoratif (hampir semua kasus karena teks di dekatnya sudah menjelaskan). Beri alt bermakna hanya bila gambar menyampaikan informasi yang tidak ada dalam teks.
- **Koherensi:** semua ekspresi memakai kerangka (_rig_) dan palet yang sama sehingga tampak satu karakter.
- Versi setengah badan dan wajah-saja dibuat dari kerangka yang sama.

---

## 3. Color System

### 3.1 Peran warna

Palet dibatasi pada empat kelompok dengan tugas yang jelas:

| Kelompok                            | Warna                                                            | Tugas                                             |
| ----------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------- |
| **Hijau (merek dan aksi)**          | Forest, Primary, Leaf, Mint                                      | Identitas, tombol utama, latar lembut             |
| **Hangat (maskot dan penghargaan)** | Orange, Yellow                                                   | Rani, CTA sekunder, bintang dan poin              |
| **Netral**                          | Cream, Surface (putih), Ink, Muted, Border                       | Latar, teks, pembatas                             |
| **Makna**                           | 5 warna kategori + status (sukses, coba lagi, hati-hati, bahaya) | Menyampaikan makna; selalu disertai ikon dan teks |

Teal `#2BB3C0` hanya untuk **ornamen eco-tech dekoratif** dan tidak boleh dipakai untuk teks, ikon fungsional, atau batas kontrol (kontrasnya terhadap Cream hanya 2,39:1).

### 3.2 Token inti

```css
:root {
  /* — Hijau (merek dan aksi) — */
  --color-forest: #14532d; /* judul, sidebar, penekanan */
  --color-primary: #1f7a4d; /* tombol utama, tautan, tab aktif ghost */
  --color-primary-hover: #186540;
  --color-primary-active: #134d32;
  --color-leaf: #3fa34d; /* isi bilah kemajuan, ilustrasi */
  --color-mint: #e6f6ec; /* latar lembut, hover permukaan */
  --color-mint-hover: #d3eedb;

  /* — Latar dan permukaan — */
  --color-bg: #fff8ec; /* Cream: latar halaman */
  --color-surface: #ffffff; /* kartu, kolom isian, balon ucapan */

  /* — Hangat (maskot dan penghargaan) — */
  --color-orange: #f2762e; /* CTA sekunder; teks di atasnya: --color-text */
  --color-orange-hover: #f58a47;
  --color-orange-active: #f9a06b;
  --color-yellow: #ffc93c; /* bintang, poin; teks di atasnya: --color-text */
  --color-yellow-hover: #ffd45c;

  /* — Dekoratif saja — */
  --color-teal: #2bb3c0; /* ornamen sirkuit-daun; DILARANG untuk teks */

  /* — Teks — */
  --color-text: #1f2937; /* Ink */
  --color-text-muted: #4b5563;
  --color-text-on-primary: #ffffff;
  --color-text-on-dark: #fff8ec; /* di atas forest (sidebar) */
  --color-placeholder: #5f6b64;

  /* — Garis — */
  --color-border-subtle: #d8e5db; /* hanya dekoratif (pemisah, tepi kartu) */
  --color-border-strong: #7a8b80; /* kolom isian, chip, kontrol (≥ 3:1) */
  --color-focus: #14532d; /* cincin fokus pada latar terang */
  --color-focus-on-dark: #ffc93c; /* cincin fokus pada sidebar forest */

  /* — Status — */
  --color-success-bg: #e6f6ec;
  --color-success-border: #1f7a4d;
  --color-success-ink: #14532d;
  --color-retry-bg: #ffefd9;
  --color-retry-border: #a94a08;
  --color-retry-ink: #7c2d12;
  --color-warning-bg: #fff4cc;
  --color-warning-border: #a67500;
  --color-warning-ink: #5c4300;
  --color-danger-bg: #fdecec;
  --color-danger-border: #d64545;
  --color-danger-ink: #7f1d1d;

  /* — Kategori sampah (wajib konsisten) — */
  --cat-organik: #3fa34d;
  --cat-organik-tint: #e4f2e6;
  --cat-organik-strong: #3fa34d;
  --cat-anorganik: #f5b700;
  --cat-anorganik-tint: #fef5db;
  --cat-anorganik-strong: #a67500;
  --cat-b3: #d64545;
  --cat-b3-tint: #f9e5e5;
  --cat-b3-strong: #d64545;
  --cat-residu: #6b7280;
  --cat-residu-tint: #eaebed;
  --cat-residu-strong: #6b7280;
  --cat-ewaste: #3b82f6;
  --cat-ewaste-tint: #e4eefe;
  --cat-ewaste-strong: #3b82f6;
}
```

### 3.3 Warna 5 kategori sampah

Warna di bawah adalah **sumber kebenaran tunggal**. Nilai yang sama harus ada pada properti `warna` di `sampah.json`, pada badge, garis tepi, chip, label tong, dan pita judul di Panduan.

| Kategori      | Fill / label tong | Tint (latar badge) | Strong (garis tepi dan ikon pada latar terang) | Label tong               | Ikon SVG                                                                         |
| ------------- | ----------------- | ------------------ | ---------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------- |
| **Organik**   | `#3FA34D`         | `#E4F2E6`          | `#3FA34D`                                      | Tong Hijau               | `icon-organik` (daun)                                                            |
| **Anorganik** | `#F5B700`         | `#FEF5DB`          | **`#A67500`**                                  | Tong Kuning              | `icon-anorganik` (botol + panah daur ulang)                                      |
| **B3**        | `#D64545`         | `#F9E5E5`          | `#D64545`                                      | Tempat khusus B3 (Merah) | `icon-b3` (labu kimia dalam segitiga; **tanpa tengkorak** agar tidak menakutkan) |
| **Residu**    | `#6B7280`         | `#EAEBED`          | `#6B7280`                                      | Tong Abu-abu             | `icon-residu` (kantong)                                                          |
| **E-Waste**   | `#3B82F6`         | `#E4EEFE`          | `#3B82F6`                                      | Tong Biru                | `icon-ewaste` (chip sirkuit)                                                     |

Nama warna tong adalah **usulan umum** dan perlu disesuaikan dengan acuan resmi yang dipilih tim (OQ-03 di PRD). Panduan Pilah menyertakan catatan "Cek tong di sekolahmu!".

### 3.4 Anatomi penerapan warna kategori

| Elemen                       | Susunan                                                                                              | Catatan kontras                                                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Badge kategori**           | Latar `tint`, garis tepi 1,5 px `strong`, ikon SVG 16 px `strong`, label 14 px/700 `--color-text`    | Teks Ink di atas tint: 12,1–13,5:1                                  |
| **Chip filter (aktif)**      | Latar `tint`, garis tepi 2 px `strong`, ikon centang, label `--color-text`                           | Penanda aktif bukan hanya warna: ada centang                        |
| **Label tong**               | Kotak kecil 20×20 px berisi fill kategori + garis tepi 2 px `strong`, diikuti teks "Tong Hijau" dst. | Teks tetap Ink; swatch dengan garis tepi agar kuning tetap terlihat |
| **Ubin emoji item**          | Latar `tint`                                                                                         | Emoji menyampaikan benda; warna hanya latar                         |
| **Pita judul kartu Panduan** | Latar `tint`, garis bawah 4 px `strong`, teks Ink                                                    | Bukan teks putih di atas fill                                       |
| **Strip kategori Beranda**   | Chip yang sama dengan chip filter, mode tautan                                                       | —                                                                   |

### 3.5 Aturan kontras (dihitung)

Target: teks biasa ≥ 4,5:1; teks besar (≥ 24 px, atau ≥ 18,66 px tebal) ≥ 3:1; ikon dan batas kontrol ≥ 3:1. Seluruh angka dihitung dengan rumus WCAG.

**Teks dan latar utama**

| Pasangan                                                 | Rasio                | Hasil |
| -------------------------------------------------------- | -------------------- | ----- |
| Ink `#1F2937` di atas Cream                              | 13,90:1              | Lulus |
| Ink di atas putih                                        | 14,68:1              | Lulus |
| Ink di atas Mint                                         | 13,11:1              | Lulus |
| Muted `#4B5563` di atas Cream / putih / Mint             | 7,16 / 7,56 / 6,75:1 | Lulus |
| Forest `#14532D` di atas Cream / Mint                    | 8,63 / 8,14:1        | Lulus |
| Putih di atas Primary `#1F7A4D`                          | 5,32:1               | Lulus |
| Putih di atas Primary hover `#186540` / active `#134D32` | 7,06 / 9,83:1        | Lulus |
| Primary sebagai teks tautan di atas Cream / putih / Mint | 5,04 / 5,32 / 4,75:1 | Lulus |
| Ink di atas Orange `#F2762E`                             | 5,18:1               | Lulus |
| Ink di atas Orange hover `#F58A47` / active `#F9A06B`    | 6,02 / 7,18:1        | Lulus |
| Ink di atas Yellow `#FFC93C` / hover `#FFD45C`           | 9,56 / 10,36:1       | Lulus |
| Cream di atas Forest (sidebar)                           | 8,63:1               | Lulus |
| Yellow di atas Forest (fokus, penanda)                   | 5,93:1               | Lulus |
| Placeholder `#5F6B64` di atas putih                      | 5,56:1               | Lulus |

**Status**

| Pasangan                                                                      | Rasio                | Hasil         |
| ----------------------------------------------------------------------------- | -------------------- | ------------- |
| Teks bahaya `#7F1D1D` di atas `#FDECEC`                                       | 8,77:1               | Lulus         |
| Teks hati-hati `#5C4300` di atas `#FFF4CC`                                    | 8,44:1               | Lulus         |
| Teks coba lagi `#7C2D12` di atas `#FFEFD9`                                    | 8,30:1               | Lulus         |
| Teks sukses Forest di atas `#E6F6EC`                                          | 8,14:1               | Lulus         |
| Garis bahaya `#D64545` terhadap putih / Cream                                 | 4,38 / 4,15:1        | Lulus (≥ 3:1) |
| Garis coba lagi `#A94A08` terhadap Cream                                      | 5,42:1               | Lulus         |
| Garis hati-hati `#A67500` terhadap Cream                                      | 3,85:1               | Lulus (≥ 3:1) |
| Garis kontrol `--color-border-strong` `#7A8B80` terhadap putih / Cream / Mint | 3,60 / 3,41 / 3,22:1 | Lulus (≥ 3:1) |

**Warna kategori**

| Kategori  | Fill terhadap putih / Cream | Teks Ink di atas **tint** | Strong terhadap putih / Cream | Teks putih di atas fill solid | Teks Ink di atas fill solid |
| --------- | --------------------------- | ------------------------- | ----------------------------- | ----------------------------- | --------------------------- |
| Organik   | 3,20 / 3,03                 | 12,68                     | 3,20 / 3,03                   | 3,20 ✗                        | 4,58 ✓                      |
| Anorganik | **1,80 / 1,71 ✗**           | 13,49                     | **4,07 / 3,85 ✓**             | 1,80 ✗                        | 8,15 ✓                      |
| B3        | 4,38 / 4,15                 | 12,14                     | 4,38 / 4,15                   | 4,38 ✗                        | 3,35 ✗                      |
| Residu    | 4,83 / 4,58                 | 12,31                     | 4,83 / 4,58                   | 4,83 ✓                        | 3,04 ✗                      |
| E-Waste   | 3,68 / 3,48                 | 12,55                     | 3,68 / 3,48                   | 3,68 ✗                        | 3,99 ✗                      |

**Keputusan yang diturunkan dari angka di atas**

1. **Tidak ada teks di atas fill solid kategori.** Tidak ada satu pun arah teks (putih atau Ink) yang lulus untuk kelima warna, sehingga badge selalu memakai _tint_ + garis `strong` + teks Ink.
2. **Kuning `#F5B700` tidak boleh menjadi garis tepi atau ikon di atas putih/Cream** (1,80:1). Pakai `--cat-anorganik-strong` `#A67500`. Fill kuning `#F5B700` boleh dipakai sebagai swatch hanya bila dikelilingi garis `strong` dan disertai teks.
3. **Isi bilah kemajuan Leaf `#3FA34D` hanya di atas trek putih** (3,20:1). Di atas Mint hanya 2,86:1. Selalu tampilkan angka pendamping ("3/10").
4. **Orange hover dan active menjadi lebih terang**, bukan lebih gelap, karena Ink di atas `#E0651C` hanya 4,23:1.
5. **Teal tidak boleh membawa informasi** (putih di atasnya 2,53:1; terhadap Cream 2,39:1).

### 3.6 Pasangan yang dilarang

| Dilarang                                                                        | Alasan                             |
| ------------------------------------------------------------------------------- | ---------------------------------- |
| Teks putih di atas Orange, Yellow, Leaf, Teal, atau fill kategori selain Residu | Kontras tidak cukup                |
| Teks Ink di atas fill solid B3, Residu, E-Waste                                 | 3,04–3,99:1                        |
| Garis tepi atau ikon `#F5B700` di atas putih/Cream                              | 1,80:1                             |
| Teks atau tautan berwarna Orange, Yellow, atau Teal di atas latar terang        | Kontras tidak cukup                |
| Merah B3 untuk umpan balik jawaban salah                                        | Mengaitkan "salah" dengan "bahaya" |
| Warna sebagai satu-satunya penanda                                              | Wajib ada ikon dan teks            |

### 3.7 Warna status dan tumpang tindih makna

| Status                    | Latar                | Garis                    | Teks                  | Ikon dan kata kunci                  |
| ------------------------- | -------------------- | ------------------------ | --------------------- | ------------------------------------ |
| Sukses / benar            | `--color-success-bg` | `--color-success-border` | `--color-success-ink` | ✔ "Benar!", "Selesai"                |
| Coba lagi (jawaban salah) | `--color-retry-bg`   | `--color-retry-border`   | `--color-retry-ink`   | Ikon panah putar ↻ dan "Belum tepat" |
| Hati-hati                 | `--color-warning-bg` | `--color-warning-border` | `--color-warning-ink` | Segitiga ⚠ dan "Hati-hati"           |
| Bahaya                    | `--color-danger-bg`  | `--color-danger-border`  | `--color-danger-ink`  | Tangan berhenti dan "Stop dulu!"     |

**Risiko desain yang dikelola:** kuning dipakai untuk Anorganik, banner Hati-hati, dan bintang poin; hijau dipakai untuk Organik, sukses, dan aksi. Pemisah maknanya adalah **ikon dan kata**: Anorganik selalu menampilkan ikon daur ulang + teks "Anorganik"; banner hati-hati selalu memuat segitiga + judul "Hati-hati" dan hanya berada di area banner; poin selalu berbentuk ⭐ + angka. Uji pemahaman ini pada uji coba dengan anak.

---

## 4. Typography & Iconography

### 4.1 Keluarga font

| Peran              | Font        | Bobot    | Alasan                                                     |
| ------------------ | ----------- | -------- | ---------------------------------------------------------- |
| Judul              | **Baloo 2** | 700, 800 | Bulat, ramah, dukungan aksara Latin untuk bahasa Indonesia |
| Isi, tombol, label | **Nunito**  | 400, 700 | Ujung membulat, sangat terbaca, selaras dengan Baloo 2     |

Hanya **4 berkas bobot**. Keduanya berlisensi terbuka (OFL); sertakan berkas lisensi pada repositori.

```css
:root {
  --font-display: "Baloo 2", "Nunito", system-ui, sans-serif;
  --font-body:
    "Nunito", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-emoji:
    "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
}
```

**Pemuatan (selaras NFR performa PRD):**

- _Self-host_ WOFF2 subset Latin (tanpa Google Fonts langsung); total font ≤ 60 KB.
- `font-display: swap`; `preload` hanya untuk Nunito 400 dan Baloo 2 800.
- Tambahkan `@font-face` cadangan dengan `size-adjust` agar pergantian font tidak menggeser tata letak (CLS ≤ 0,1).

### 4.2 Skala tipografi

| Peran                             | Font / bobot  | Ukuran (mobile → desktop)                               | Tinggi baris | Pemakaian                        |
| --------------------------------- | ------------- | ------------------------------------------------------- | ------------ | -------------------------------- |
| **Display**                       | Baloo 2 / 800 | `clamp(2rem, 1.4rem + 3vw, 3.25rem)` (32 → 52 px)       | 1,1          | H1 hero Beranda                  |
| **Judul halaman**                 | Baloo 2 / 800 | `clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)` (28 → 40 px)   | 1,15         | `<h1>` halaman lain              |
| **Judul seksi**                   | Baloo 2 / 700 | `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)` (22 → 28 px) | 1,2          | `<h2>`                           |
| **Sub-judul**                     | Baloo 2 / 700 | 1,25 rem (20 px)                                        | 1,25         | `<h3>` bagian detail             |
| **Judul kartu**                   | Nunito / 700  | 1,125 rem (18 px)                                       | 1,3          | Nama item, judul misi            |
| **Lead**                          | Nunito / 400  | 1,25 rem (20 px)                                        | 1,5          | Subjudul hero, pengantar halaman |
| **Isi**                           | Nunito / 400  | 1,125 rem (18 px)                                       | 1,6          | Paragraf, daftar                 |
| **Isi tebal / tombol / navigasi** | Nunito / 700  | 1,125 rem (18 px)                                       | 1,2          | Tombol, menu, label isian        |
| **Keterangan / badge**            | Nunito / 700  | 0,875 rem (14 px)                                       | 1,4          | Badge, caption, penghitung       |
| **Angka skor**                    | Baloo 2 / 800 | `clamp(3rem, 2rem + 4vw, 4rem)` (48 → 64 px)            | 1            | Skor kuis, poin                  |

### 4.3 Aturan tipografi

1. **Tidak ada teks di bawah 14 px.**
2. Tidak memakai huruf kapital semua (`text-transform: uppercase`), rata kanan-kiri (_justify_), atau miring untuk teks panjang.
3. Panjang baris maksimum **65 karakter (`max-width: 65ch`)** pada paragraf; kolom baca halaman detail maksimum 720 px.
4. Heading mengikuti **hierarki semantik** (satu `<h1>` per rute; jangan melompati level). Ukuran diambil dari kelas, bukan dari pemilihan tag.
5. `text-wrap: balance` pada judul (peningkatan progresif); `overflow-wrap: anywhere` untuk kata panjang.
6. **Tidak ada pemotongan teks** (`ellipsis`) pada nama sampah, soal, atau misi. Teks boleh membungkus ke baris berikutnya; tinggi kartu mengikuti isi.
7. Angka skor dan poin memakai `font-variant-numeric: tabular-nums` agar tidak "bergoyang" saat bertambah.
8. Tautan di dalam paragraf bergaris bawah dan berwarna Primary; tautan navigasi tidak bergaris bawah tetapi punya penanda aktif.
9. Istilah bahasa Inggris (**Reduce, Reuse, Recycle**, **E-Waste**) diberi `lang="en"`.
10. Rata kiri sebagai bawaan; rata tengah hanya untuk judul pendek hero hasil kuis dan empty state.

### 4.4 Tiga lapis ikonografi

PeduliSampah memakai tiga lapis ikon dengan pembagian tugas yang tegas.

| Lapis                    | Dipakai untuk                                                                             | Teknik                                                |
| ------------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **Emoji** (konten)       | Ikon item sampah, kartu navigasi cepat di Beranda, misi, tips, level, peringkat, poin, 3R | Karakter Unicode di dalam ubin; ringan (tanpa berkas) |
| **SVG flat** (antarmuka) | Menu, tombol, status, ikon kategori, navigasi sidebar/drawer                              | `<symbol>` sprite inline, `currentColor`              |
| **Ilustrasi**            | Rani dan ornamen sirkuit-daun                                                             | Berkas SVG kecil                                      |

Aturan pembeda: **konten = emoji, "chrome" antarmuka = SVG.** Dengan begitu warna ikon antarmuka dapat mengikuti state (hover, aktif, dinonaktifkan), sedangkan emoji tetap menjadi identitas benda.

### 4.5 Emoji

- **Ubin emoji:** kotak membulat (radius 16 px) berlatar `tint` kategori atau Mint; emoji di tengah dengan `line-height: 1`. Ukuran ubin dan emoji:

| Konteks                      | Ubin     | Emoji                 |
| ---------------------------- | -------- | --------------------- |
| Kartu katalog                | 56×56 px | 32 px                 |
| Kartu navigasi Beranda       | 56×56 px | 32 px                 |
| Kartu misi dan tips          | 48×48 px | 28 px                 |
| Header halaman detail        | 96×96 px | 56 px                 |
| Soal kuis bergambar          | 96×96 px | 56 px                 |
| Dalam teks (peringkat, poin) | —        | mengikuti ukuran teks |

- Emoji **selalu `aria-hidden="true"`**; nama benda selalu ada sebagai teks di dekatnya.
- Gunakan `font-family: var(--font-emoji)`.
- **Kompatibilitas:** pilih emoji dari Unicode ≤ 12.0 (2019) agar tampil di Android dan iOS yang lebih lama, lalu uji pada Android 10 dan iOS 15. Bila ada emoji yang tampil sebagai kotak kosong, ganti dengan emoji lain. Karena teks nama selalu ada, kegagalan tampil tidak menghilangkan informasi.
- Tampilan emoji berbeda per sistem operasi; ini diterima sebagai konsekuensi dari keputusan memakai emoji demi performa. Jangan mengandalkan detail halus emoji (misalnya warna spesifik) untuk makna.

**Emoji baku untuk antarmuka (konten):**

| Konteks                | Emoji                                                                |
| ---------------------- | -------------------------------------------------------------------- |
| Kartu navigasi Beranda | 🔍 Katalog · 🧭 Panduan · 🎯 Kuis · 🏅 Misi · 💡 Tips                |
| Level kuis             | 🌱 Tunas · 🌳 Pohon                                                  |
| Poin                   | ⭐                                                                   |
| Peringkat              | 🐼 Panda Pemula · 🍃 Penjaga Daun · 🌏 Pahlawan Hijau · 🏆 Duta Bumi |
| 3R                     | 🛍️ Reduce · 🔁 Reuse · ♻️ Recycle                                    |
| Pendamping             | 👨‍👩‍👧                                                                   |

### 4.6 SVG flat (ikon antarmuka)

- **Grid** 24×24; **garis** 2 px; ujung dan sambungan membulat; `fill: none`, `stroke: currentColor`. Pengecualian: bintang poin berisi.
- **Ukuran:** 16 (dalam badge), 20 (dalam teks), 24 (standar), 32 (kartu), 40 (banner keamanan).
- **Hit area:** tombol ikon minimal 48×48 px dengan ikon di tengah.
- Sprite inline di `index.html`, total ≤ 6 KB, dipanggil dengan `<use href="#icon-...">`.
- Ikon dekoratif atau yang berdampingan dengan teks: `aria-hidden="true"`. Tombol hanya-ikon wajib `aria-label` (contoh: "Buka menu").

**Daftar ikon yang dibutuhkan:** `menu`, `close`, `search`, `clear`, `home`, `catalog`, `guide`, `quiz`, `mission`, `tips`, `check`, `retry`, `alert-triangle`, `stop-hand`, `info`, `chevron-right`, `chevron-down`, `arrow-left`, `star`, `users` (pendamping), serta lima ikon kategori: `icon-organik`, `icon-anorganik`, `icon-b3`, `icon-residu`, `icon-ewaste`.

### 4.7 Ornamen eco-tech

- **Motif:** garis sirkuit tipis (siku-siku 90° dengan titik simpul) yang berujung daun kecil.
- **Warna:** `--color-teal` pada opasitas 14–18% di atas Mint atau Cream; tebal garis 1,5 px; ubin pola 120×120 px.
- **Penggunaan terbatas:** latar hero Beranda (sudut kanan bawah), footer, halaman 404. **Tidak** di belakang teks isi, kuis, atau kartu.
- **Implementasi:** latar CSS dari SVG _data URI_ ≤ 1,5 KB, `aria-hidden` (karena berupa latar), tanpa animasi.

---

## 5. Layout & Responsive Grid

### 5.1 Fondasi tata letak

```css
:root {
  /* Jarak: skala 4/8 px */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  /* Radius */
  --radius-sm: 10px; /* badge */
  --radius-md: 16px; /* tombol, kolom isian, ubin emoji */
  --radius-lg: 20px; /* kartu */
  --radius-xl: 24px; /* dialog, panel besar, drawer */
  --radius-full: 999px; /* HANYA chip filter */

  /* Bayangan: hanya hover dan overlay */
  --shadow-hover: 0 4px 12px rgba(20, 83, 45, 0.12);
  --shadow-overlay: 0 12px 32px rgba(20, 83, 45, 0.2);

  /* Lapisan (z-index) */
  --z-header: 40;
  --z-overlay: 50;
  --z-drawer: 60;
  --z-dialog: 70;

  /* Lebar */
  --w-content: 1120px; /* area konten maksimum */
  --w-reading: 720px; /* kolom baca: detail, kuis, misi, panduan */
  --w-dialog: 440px;
  --w-sidebar: 264px;
  --h-header: 56px;
}
```

**Ritme vertikal:** antarseksi 48 px (mobile) dan 64 px (desktop); di dalam seksi 24 px; antara judul dan isinya 16 px.

### 5.2 Breakpoint dan kontainer

Pendekatan **mobile-first**: gaya dasar untuk 320 px ke atas, ditambah `min-width`.

| Nama        | Rentang     | Margin halaman | Perilaku utama                                                                     |
| ----------- | ----------- | -------------- | ---------------------------------------------------------------------------------- |
| **Dasar**   | 320–639 px  | 16 px          | Satu kolom; header lengket + drawer; grid katalog 2 kolom                          |
| **Tablet**  | 640–1023 px | 24 px          | Grid 3 kolom; hero dua kolom bila muat; drawer tetap dipakai                       |
| **Desktop** | ≥ 1024 px   | 32 px          | Sidebar permanen 264 px; konten maksimum 1120 px di tengah area sisa; grid 4 kolom |

Titik 640 dan 1024 dipilih karena kebutuhan isi (3 kolom kartu mulai muat di 640 px; sidebar permanen membutuhkan ≥ 1024 px agar area konten ≥ 760 px), bukan nama perangkat.

### 5.3 Kerangka halaman (shell)

**Mobile dan tablet (< 1024 px)**

```
┌──────────────────────────────┐
│ ☰  [Rani] PeduliSampah   ⭐ 20   │  ← header lengket, tinggi 56 px
├──────────────────────────────┤
│                              │
│   <main> (margin 16/24 px)   │
│                              │
│   …konten halaman…           │
│                              │
├──────────────────────────────┤
│   footer                     │
└──────────────────────────────┘
        Drawer: meluncur dari kiri, menutupi 80% lebar
```

**Desktop (≥ 1024 px)**

```
┌───────────┬──────────────────────────────────────────────┐
│ [Rani]    │                                              │
│ PeduliSampah  │   <main> maks 1120 px, margin 32 px          │
│           │                                              │
│ 🏠 Beranda│   …konten halaman…                           │
│ 🔍 Katalog│                                              │
│ 🧭 Panduan│                                              │
│ 🎯 Kuis   │                                              │
│ 🏅 Misi   │                                              │
│ 💡 Tips   │                                              │
│           ├──────────────────────────────────────────────┤
│ [Poin ⭐] │   footer                                     │
└───────────┴──────────────────────────────────────────────┘
  264 px, tetap (sticky, tinggi layar)
```

(Ikon pada diagram hanya ilustrasi; menu sebenarnya memakai ikon SVG, lihat 4.4.)

### 5.4 Header lengket (mobile dan tablet)

| Properti            | Spesifikasi                                                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Posisi              | `position: sticky; top: 0; z-index: var(--z-header)`                                                                                               |
| Tinggi              | 56 px + `env(safe-area-inset-top)`                                                                                                                 |
| Latar               | `--color-bg` solid (tanpa blur, tanpa transparansi); garis bawah 1 px `--color-border-subtle`                                                      |
| Isi (kiri ke kanan) | Tombol hamburger 48×48 px (`icon-menu`, Forest) · wajah Rani 32 px + wordmark "PeduliSampah" (Baloo 2 800, 20 px, Forest) · **chip Poin** di kanan |
| Chip Poin           | Tinggi 44 px, radius 12 px, latar `--color-yellow`, teks Ink 700 "⭐ 20"; tautan ke `#/misi`; `aria-label="Poin Lingkungan 20, buka Misi"`         |
| Hamburger           | `aria-label="Buka menu"`, `aria-expanded`, `aria-controls="menu-utama"`                                                                            |
| Perilaku gulir      | Selalu terlihat. Tidak mengecil, tidak berganti warna                                                                                              |

Header tidak memuat pencarian; pencarian berada pada halaman Katalog agar header tetap sederhana.

### 5.5 Drawer menu (mobile dan tablet)

| Properti         | Spesifikasi                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lebar            | `min(80vw, 304px)`; tinggi penuh (`100dvh`)                                                                                                           |
| Latar            | Forest `#14532D`; teks Cream (kontras 8,63:1)                                                                                                         |
| Sudut            | Sisi kanan `--radius-xl` (24 px)                                                                                                                      |
| Bayangan         | `--shadow-overlay`                                                                                                                                    |
| Overlay          | Latar Forest pada opasitas 55% (warna efektif di atas Cream ≈ `#7E9D83`); mengisi sisa layar                                                          |
| Animasi          | Drawer `translateX(-100%) → 0`, 220 ms, `ease-out`; overlay `opacity 0 → 1`, 180 ms. Saat menutup, 180 ms `ease-in`                                   |
| Susunan          | (1) Baris atas: logo + tombol tutup 48×48 · (2) Daftar menu (6 item) · (3) Panel Poin di bagian bawah                                                 |
| Item menu        | Tinggi 56 px, radius 16 px, padding horizontal 16 px, ikon SVG 24 px + label Nunito 700 18 px, jarak ikon–label 12 px                                 |
| Item aktif       | Latar Mint, teks Forest (8,14:1), `aria-current="page"`                                                                                               |
| Item hover/tekan | Latar `#1D6B3D` (Cream di atasnya 6,17:1)                                                                                                             |
| Fokus            | Cincin 3 px `--color-focus-on-dark` (Yellow; 4,24:1 terhadap `#1D6B3D`), offset 2 px                                                                  |
| Panel Poin       | Latar Cream, teks Ink, radius 20 px, padding 16 px; berisi "Poin Lingkungan", angka ⭐ (Baloo 2 800 28 px), nama peringkat; Rani setengah badan 48 px |

**Perilaku:**

1. **Membuka:** ketuk hamburger. Fokus pindah ke item menu aktif (atau item pertama). Konten utama diberi `inert`; gulir latar dikunci.
2. **Menutup:** tombol ✕, ketuk overlay, tombol `Esc`, memilih menu, perubahan hash, atau lebar layar ≥ 1024 px. Fokus kembali ke hamburger.
3. **Fokus terkunci** di dalam drawer saat terbuka (_focus trap_).
4. Geser ke kiri untuk menutup adalah P2 (tidak wajib).
5. Dengan `prefers-reduced-motion`, drawer muncul tanpa geser (`opacity` saja, ≤ 100 ms).

### 5.6 Sidebar permanen (desktop)

| Properti              | Spesifikasi                                                                             |
| --------------------- | --------------------------------------------------------------------------------------- |
| Lebar dan posisi      | 264 px; `position: sticky; top: 0; height: 100dvh`; isi dapat digulir bila layar pendek |
| Latar dan teks        | Forest `#14532D`, teks Cream                                                            |
| Susunan               | Logo (Rani 40 px + wordmark Cream) → 6 menu → panel Poin menempel di bawah              |
| Item menu             | Spesifikasi sama dengan drawer (komponen tunggal, dua presentasi)                       |
| Padding               | 16 px sisi; jarak antaritem 4 px                                                        |
| Tidak ada header atas | Judul halaman berada di `<h1>` pada konten                                              |

### 5.7 Satu komponen navigasi, dua presentasi

| Aspek                        | Mobile / tablet (< 1024 px)                          | Desktop (≥ 1024 px)                     |
| ---------------------------- | ---------------------------------------------------- | --------------------------------------- |
| Elemen                       | `<nav id="menu-utama">` sebagai drawer di luar layar | `<nav id="menu-utama">` sebagai sidebar |
| Pemicu                       | Tombol hamburger di header                           | Tidak ada (selalu terlihat)             |
| Overlay dan penguncian fokus | Ya                                                   | Tidak                                   |
| Item menu, urutan, ikon      | **Sama**                                             | **Sama**                                |
| Poin                         | Chip di header + panel di drawer                     | Panel di sidebar                        |

Satu markup `<nav>` dipakai untuk keduanya; CSS dan sedikit JavaScript yang membedakan presentasinya. Urutan menu: Beranda · Katalog Sampah · Panduan Pilah · Kuis · Misi · Tips Hijau.

### 5.8 Grid konten per halaman

| Halaman                      | Mobile (320–639)                                  | Tablet (640–1023)                           | Desktop (≥ 1024)                            |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| **Beranda — hero**           | Rani di atas, teks lalu CTA (CTA penuh lebar)     | Dua kolom bila muat (teks kiri, Rani kanan) | Dua kolom 55/45, Rani kanan                 |
| **Beranda — kartu navigasi** | 2 kolom (kartu ke-5 selebar penuh)                | 3 kolom                                     | 5 kolom                                     |
| **Katalog — kartu item**     | 2 kolom                                           | 3 kolom                                     | 4 kolom                                     |
| **Detail Sampah**            | Satu kolom ≤ 720 px                               | Satu kolom ≤ 720 px                         | Satu kolom 720 px di tengah                 |
| **Panduan — kartu kategori** | 1 kolom                                           | 2 kolom                                     | 2 kolom (kartu B3 dan E-Waste berdampingan) |
| **Kuis**                     | Satu kolom penuh; tombol Lanjut menempel di bawah | Satu kolom ≤ 720 px                         | Satu kolom 720 px                           |
| **Misi — kartu**             | 1 kolom                                           | 1 kolom                                     | 2 kolom                                     |
| **Tips — kartu**             | 1 kolom                                           | 2 kolom                                     | 3 kolom                                     |

**Aturan grid katalog:** `grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px` (mobile), `gap: 16px` (≥ 640 px), `gap: 20px` (≥ 1024 px). Pada 360 px lebar, dua kolom 150 px dengan margin 16 px dan jarak 12 px tetap muat.

### 5.9 Area aman, fokus tidak tertutup, dan gulir

- Terapkan `env(safe-area-inset-*)` pada header, drawer, dan bilah aksi bawah kuis (perangkat berponi).
- **Fokus tidak boleh tertutup** header lengket atau bilah bawah (WCAG 2.2, kriteria 2.4.11): beri `scroll-padding-top: calc(var(--h-header) + 16px)` dan `scroll-padding-bottom: 96px` pada `html`.
- Gunakan `100dvh` (bukan `100vh`) agar tidak terpotong bilah alamat peramban seluler.
- Gulir horizontal **hanya** pada baris chip filter dan tabel/komponen yang sengaja disiapkan; halaman tidak boleh bergulir ke samping.

### 5.10 Perilaku responsif lain

- **Baris chip filter (mobile):** satu baris yang dapat digeser dengan `scroll-snap-type: x proximity`. Chip terakhir yang terlihat sebagian menjadi petunjuk bahwa daftar dapat digeser (tanpa gradien).
- **Teks panjang:** wajib membungkus; tidak ada pemotongan. Uji dengan nama sampah panjang (misalnya "Kemasan produk pembersih rumah tangga").
- **Landscape pada ponsel:** hero memakai dua kolom; tinggi header tetap 56 px; dialog memakai `max-height: 90dvh` dan dapat digulir.
- **Zoom dan reflow:** pada lebar 320 px dan zoom teks 200%, tidak ada kehilangan konten atau gulir dua arah.
- **Input:** `:hover` tidak pernah menjadi satu-satunya jalan ke fungsi; semua fungsi tersedia lewat sentuhan dan keyboard.

---

## 6. UI Component Specifications

### 6.0 Komponen bersama

#### 6.0.1 Tombol

| Varian                | Latar             | Teks                               | Garis        | Hover                   | Aktif (ditekan)                                    | Dipakai untuk                                                                              |
| --------------------- | ----------------- | ---------------------------------- | ------------ | ----------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Primer**            | `--color-primary` | Putih (5,32:1)                     | —            | `--color-primary-hover` | `--color-primary-active`, geser turun 1 px         | Satu aksi utama per layar: Mulai Jelajah, Mulai Kuis, Lanjut, Ya!, Aku sudah melakukannya! |
| **Sekunder (oranye)** | `--color-orange`  | Ink (5,18:1)                       | —            | `--color-orange-hover`  | `--color-orange-active`                            | CTA pendamping di hero (Main Kuis), Tips Acak                                              |
| **Garis (outline)**   | Transparan        | Primary (5,04:1 di Cream)          | 2 px Primary | Latar Mint              | Latar `--color-mint-hover`, teks beralih ke Forest | Aksi tambahan: Ganti Level, Belum, Batalkan, Reset                                         |
| **Teks**              | Transparan        | Primary, bergaris bawah saat hover | —            | Latar Mint              | —                                                  | Kembali, Lihat langkah, Pelajari lebih lanjut                                              |

- **Bentuk:** radius 16 px; padding horizontal 24 px; font Nunito 700 18 px; ikon 20 px dengan jarak 8 px.
- **Tinggi minimum:** 52 px (aksi utama), 48 px (standar), 44 px (kecil, misalnya Batalkan).
- **Lebar:** penuh pada layar < 640 px untuk aksi utama (hero, kuis, dialog); mengikuti isi pada layar lebih lebar.
- **Fokus:** cincin 3 px `--color-focus` (Forest), offset 2 px. Pada latar gelap: `--color-focus-on-dark`.
- **Nonaktif:** latar `#D5DDD7`, teks `#5B6760`, `aria-disabled="true"`, tanpa hover. Jangan memakai tombol nonaktif untuk aksi yang membuat anak bingung; lebih baik sembunyikan atau jelaskan alasannya.
- Satu layar **hanya satu** tombol primer yang terlihat penuh.

#### 6.0.2 Kartu

| Properti             | Spesifikasi                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Latar                | `--color-surface` (putih)                                                                                                                        |
| Garis                | 1 px `--color-border-subtle`                                                                                                                     |
| Radius               | `--radius-lg` (20 px)                                                                                                                            |
| Padding              | 16 px (mobile), 20 px (≥ 640 px)                                                                                                                 |
| Bayangan             | **Tidak ada** saat diam                                                                                                                          |
| Hover (kartu tautan) | Naik 2 px (`translateY(-2px)`) + `--shadow-hover`, 150 ms                                                                                        |
| Fokus                | Cincin 3 px Forest, offset 2 px                                                                                                                  |
| Aktif                | Kembali ke posisi awal                                                                                                                           |
| Aturan               | Seluruh kartu adalah **satu** `<a>` atau satu `<button>`; tidak ada kontrol interaktif di dalam kartu tautan; **tidak ada kartu di dalam kartu** |

#### 6.0.3 Badge kategori dan label tong

- **Badge kategori:** tinggi 28 px, radius 10 px, padding 0 10 px; latar `tint`, garis 1,5 px `strong`; ikon SVG kategori 16 px `strong` + label 14 px/700 Ink (urutan: ikon, label).
- **Label tong:** swatch 20×20 px (fill kategori, garis 2 px `strong`, radius 6 px) + teks "Tong Hijau" 18 px/700 Ink.
- **Badge poin:** latar `--color-yellow`, teks Ink 700, radius 10 px, tinggi 28 px, isi "+10 ⭐".
- **Badge pendamping:** latar putih, garis 2 px Forest, teks Forest, ikon `users` 16 px, isi "Ajak orang dewasa".

#### 6.0.4 Chip filter

| Properti              | Spesifikasi                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| Bentuk                | Pil penuh (`--radius-full`) — **satu-satunya** komponen berbentuk pil                              |
| Tinggi                | 44 px; padding 0 16 px                                                                             |
| Isi                   | Ikon kategori 20 px (`strong`) + nama (Nunito 700 18 px, Ink) + jumlah (Muted)                     |
| Default               | Latar putih, garis 2 px `--color-border-strong`                                                    |
| Hover                 | Latar Mint                                                                                         |
| Aktif                 | Latar `tint` kategori, garis 2 px `strong`, **ikon centang** di depan label, `aria-pressed="true"` |
| Chip "Semua" aktif    | Latar Mint, garis 2 px Forest, centang                                                             |
| Mode tautan (Beranda) | Tampilan sama tanpa `aria-pressed`; elemen `<a>`                                                   |

#### 6.0.5 Kolom pencarian

- Tinggi 56 px, radius 16 px, garis 2 px `--color-border-strong`, latar putih.
- Ikon `search` 24 px (Muted) di kiri; tombol `clear` 44×44 px di kanan (muncul bila ada teks).
- Teks isian Nunito 400 18 px; placeholder `--color-placeholder` (5,56:1): "Cari: botol, baterai, kulit pisang…".
- Label "Cari sampah" ada di DOM tetapi tersembunyi secara visual; placeholder **bukan** pengganti label.
- Fokus: garis menjadi Primary, ditambah cincin 3 px Forest dengan offset 2 px.
- Lebar maksimum 640 px.

#### 6.0.6 Balon ucapan Rani

- Susunan: Rani setengah badan 56–64 px di kiri; balon di kanan.
- Balon: latar putih, garis 2 px `--color-border-strong`... **bukan** garis dekoratif: garis 1 px `--color-border-subtle` sudah cukup karena teks yang membawa makna. Radius 20 px, padding 16 px, ekor segitiga 12 px menunjuk ke Rani.
- Teks: judul kecil (Nunito 700 18 px) dan isi (Nunito 400 18 px), Ink.
- Mobile: Rani dan balon tetap berdampingan; bila teks sangat panjang, Rani berada di atas balon.

#### 6.0.7 Dialog

| Properti   | Spesifikasi                                                                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wadah      | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` ke judul; lebar `min(92vw, 440px)`; radius 24 px; padding 24 px; latar putih; `--shadow-overlay`  |
| Overlay    | Forest 55%                                                                                                                                                |
| Isi        | Rani setengah badan 96 px di atas, judul (Baloo 2 700 24 px), isi, tombol                                                                                 |
| Tombol     | Mobile: bertumpuk, aksi primer di atas; ≥ 640 px: berdampingan                                                                                            |
| Fokus awal | Judul dialog (`tabindex="-1"`); fokus terkunci di dalam; `Esc` menutup (kecuali dialog perayaan yang hanya menutup lewat tombol); fokus kembali ke pemicu |
| Tinggi     | `max-height: 90dvh`, dapat digulir                                                                                                                        |

#### 6.0.8 Tab (kontrol tersegmentasi)

- Wadah: latar putih, garis 2 px `--color-border-strong`, radius 16 px, padding 4 px.
- Tab: tinggi min 48 px, radius 12 px, teks Nunito 700 18 px.
- **Terpilih:** latar Forest, teks Cream (8,63:1). **Tidak terpilih:** teks Forest; hover latar Mint.
- Pola ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`; panah kiri/kanan berpindah, `Home`/`End`; hanya tab terpilih dalam urutan `Tab`.
- Pada lebar < 480 px dengan 4 tab, tab dibungkus menjadi dua baris (2×2) agar label tidak terpotong.

#### 6.0.9 Bilah kemajuan

- Tinggi 12 px, radius 6 px, **trek putih** dengan garis 2 px `--color-border-strong`; isi `--color-leaf` (3,20:1 terhadap putih).
- Selalu disertai angka atau kalimat ("Soal 3 dari 10"). Elemen `<progress>` atau `role="progressbar"` dengan `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- Perubahan isi memakai animasi lebar 250 ms (dimatikan saat `prefers-reduced-motion`).

#### 6.0.10 Keadaan: loading, kosong, error

| Keadaan                | Visual                                                                                                                | Teks (contoh)                                        | Aksi                                                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Loading** (> 150 ms) | Skeleton: blok abu-hijau (`--color-mint`) berbentuk ubin + 2 baris; denyut opasitas 1 → 0,6, 1,2 detik; Rani Berpikir | "Rani sedang mengambil datanya…"                     | —                                                                                                                               |
| **Kosong**             | Rani Bingung 160 px                                                                                                   | "Hmm, Rani belum menemukan itu. Coba kata lain, ya!" | Tombol Garis: Reset Pencarian                                                                                                   |
| **Error data**         | Rani Bingung 160 px                                                                                                   | "Ups, Rani belum bisa mengambil datanya."            | Primer: Coba Lagi; teks bantuan yang dapat dibuka: "Buka PeduliSampah lewat alamat web (http/https), bukan langsung dari file." |
| **404**                | Rani Bingung + ornamen sirkuit                                                                                        | "Halaman ini tidak ketemu."                          | Primer: Kembali ke Beranda                                                                                                      |

Pesan error ditempatkan di dalam area konten (bukan _alert_ yang menutup layar) dan diumumkan dengan `role="status"`.

#### 6.0.11 Footer

- Latar Mint, garis atas 1 px `--color-border-subtle`, padding 32 px, ornamen sirkuit-daun di sudut.
- Isi: "PeduliSampah oleh Tim UchanCyber", kalimat "Tanpa login. Tanpa data pribadi." serta dua **badge teks** "SDG 12" dan "SDG 13" (latar putih, garis 2 px Forest, teks Forest, radius 10 px) dengan keterangan singkat "Konsumsi dan Produksi yang Bertanggung Jawab" dan "Penanganan Perubahan Iklim".
- Memakai badge teks buatan sendiri; bila tim ingin memakai ikon resmi SDG PBB, baca dan patuhi pedoman penggunaannya terlebih dahulu.
- Tidak ada tautan keluar pada antarmuka anak.

---

### 6.1 Beranda (FR-001)

**Tujuan halaman:** satu ketukan menuju aktivitas inti.

**Sketsa mobile (≈ 360 px)**

```
┌──────────────────────────┐
│ ☰ [R] PeduliSampah     ⭐ 0  │
├──────────────────────────┤
│  (latar Mint + ornamen)  │
│       [ RANI 200px ]     │
│  Yuk, Pilah Sampah       │
│  Bareng Rani!            │
│  Belajar memilah lewat   │
│  pencarian, kuis, misi.  │
│  Sudah ada 40 jenis      │
│  sampah menunggumu!      │
│  [   Mulai Jelajah   ]   │
│  [   Main Kuis       ]   │
├──────────────────────────┤
│  Kenapa harus memilah?   │
│  🌍 Bumi lebih bersih    │
│  ♻️ Dipakai lagi         │
│  🌱 Ikut jaga iklim      │
├──────────────────────────┤
│  Mau ngapain hari ini?   │
│  [🔍 Katalog][🧭 Panduan]│
│  [🎯 Kuis   ][🏅 Misi   ]│
│  [💡 Tips Hijau         ]│
├──────────────────────────┤
│  Lima jenis sampah       │
│  (Organik)(Anorganik)…   │
├──────────────────────────┤
│  [R] Tips Hari Ini …     │
├──────────────────────────┤
│  Footer                  │
└──────────────────────────┘
```

| Blok                     | Spesifikasi                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero**                 | Latar Mint; padding 24 px (mobile) / 48 px (desktop); ornamen sirkuit-daun di sudut kanan bawah. Susunan mobile: Rani (200 px) → H1 → lead → dua tombol penuh lebar. Desktop: dua kolom 55/45, teks kiri, Rani 320 px kanan.                                                                                                                                                                              |
| **H1 (Display)**         | "Yuk, Pilah Sampah Bareng Rani!" Baloo 2 800, Forest.                                                                                                                                                                                                                                                                                                                                                     |
| **Lead**                 | Nunito 400 20 px, Ink: "Belajar memilah sampah lewat pencarian, kuis, dan misi seru. Sudah ada **{N}** jenis sampah menunggumu!" **{N} dihitung dari `sampah.json`**; bila data belum termuat, kalimat tanpa angka.                                                                                                                                                                                       |
| **CTA**                  | **Mulai Jelajah** (primer, ikon `arrow-right`) → `#/katalog`; **Main Kuis** (sekunder oranye) → `#/kuis`. Hanya dua tombol.                                                                                                                                                                                                                                                                               |
| **Performa**             | Gambar Rani hero adalah kandidat LCP: dimensi eksplisit, `fetchpriority="high"`, bukan _lazy_.                                                                                                                                                                                                                                                                                                            |
| **Kenapa memilah?**      | `<h2>` + tiga butir. Tiap butir: emoji 40 px + satu judul tebal + satu kalimat. **Bukan kartu**; dipisah ruang kosong 24 px (mobile bertumpuk, desktop tiga kolom). Isi: "Bumi lebih bersih — sampah yang dipilah lebih mudah diolah kembali." · "Dipakai lagi — banyak sampah anorganik bisa didaur ulang." · "Ikut jaga iklim — mengurangi sampah membantu mengurangi gas metana dari tumpukan sampah." |
| **Kartu navigasi cepat** | `<h2>` "Mau ngapain hari ini?". Lima kartu tautan (6.0.2): ubin emoji 56 px berlatar Mint, judul kartu 18 px/700, deskripsi maks. 6 kata (Isi 18 px): Katalog "Cari sampahmu", Panduan "Belajar memilah", Kuis "Uji pengetahuan", Misi "Kumpulkan poin", Tips "Kebiasaan hijau". Mobile 2 kolom (kartu ke-5 selebar penuh); tablet 3 kolom; desktop 5 kolom.                                              |
| **Strip kategori**       | `<h2>` "Lima jenis sampah"; chip mode tautan (6.0.4) ke `#/katalog/{id}`; membungkus ke baris berikutnya di mobile.                                                                                                                                                                                                                                                                                       |
| **Tips Hari Ini**        | Balon Rani (6.0.6): judul tips tebal + isi, dan teks tautan "Lihat semua tips →". Satu tips acak dari `tips_umum` setiap halaman dimuat.                                                                                                                                                                                                                                                                  |
| **Footer**               | 6.0.11                                                                                                                                                                                                                                                                                                                                                                                                    |

**Bila JSON gagal dimuat:** hero, kartu navigasi, dan strip kategori tetap tampil (konten statis di HTML); hanya angka {N} dan Tips Hari Ini disembunyikan.

---

### 6.2 Katalog Sampah (FR-004, FR-005, FR-006)

**Aksi utama:** mencari. Kolom pencarian menjadi elemen terkuat di halaman.

**Sketsa mobile**

```
┌──────────────────────────┐
│ ☰ [R] PeduliSampah     ⭐ 0  │
├──────────────────────────┤
│ Katalog Sampah           │
│ Cari benda, lalu lihat   │
│ tong yang tepat.         │
│ ┌──────────────────────┐ │
│ │ 🔍 Cari: botol…   ✕ │ │
│ └──────────────────────┘ │
│ (✔Semua)(Organik 8)(An…→ │  ← baris chip, dapat digeser
│ Menampilkan 40 dari 40   │
│ ┌────────┐ ┌────────┐    │
│ │ [🍌]   │ │ [🔋] ⚠│    │
│ │ Kulit  │ │ Baterai│    │
│ │ Pisang │ │ Bekas  │    │
│ │ Organik│ │ B3     │    │
│ └────────┘ └────────┘    │
└──────────────────────────┘
```

| Blok            | Spesifikasi                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Judul**       | `<h1>` "Katalog Sampah" + satu kalimat Lead.                                                                                                        |
| **Pencarian**   | 6.0.5. Pembaruan dengan _debounce_ 200 ms; `Enter` seketika.                                                                                        |
| **Chip filter** | Baris: Semua + 5 kategori (6.0.4). Mobile: satu baris dapat digeser (`scroll-snap`), desktop: membungkus.                                           |
| **Penghitung**  | Keterangan 14 px Muted: "Menampilkan 12 dari 40 sampah" di dalam `aria-live="polite"`. Bila ada filter atau kata kunci, tampil tombol teks "Reset". |
| **Grid**        | 5.8: 2 / 3 / 4 kolom.                                                                                                                               |

**Kartu item sampah**

| Elemen               | Spesifikasi                                                                                                                                                                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Susunan              | Vertikal, jarak 12 px: ubin emoji → nama → badge kategori                                                                                                                                                                                                                                                                                                       |
| Ubin emoji           | 56×56 px, radius 16 px, latar `tint` kategori; emoji 32 px, `aria-hidden`                                                                                                                                                                                                                                                                                       |
| Nama                 | Judul kartu (Nunito 700 18 px, Ink). **Tidak dipotong**; boleh 2–3 baris                                                                                                                                                                                                                                                                                        |
| Badge kategori       | 6.0.3                                                                                                                                                                                                                                                                                                                                                           |
| **Penanda keamanan** | Bila `keamanan.level` ≠ `aman`: lingkaran 32 px di pojok kanan atas. _Hati-hati_: latar `--color-warning-bg`, garis 2 px `--color-warning-border`, ikon `alert-triangle`. _Bahaya_: latar `--color-danger-bg`, garis 2 px `--color-danger-border`, ikon `stop-hand`. Teks tersembunyi bagi pembaca layar: "Hati-hati" atau "Bahaya, perlu bantuan orang dewasa" |
| Perilaku             | Seluruh kartu = tautan ke `#/sampah/{id}` (6.0.2)                                                                                                                                                                                                                                                                                                               |
| Ketinggian           | Mengikuti isi; kartu satu baris disamakan tingginya oleh grid                                                                                                                                                                                                                                                                                                   |

**Keadaan:** _loading_ = 8 kartu skeleton; _kosong_ = Rani Bingung + "Reset Pencarian" (6.0.10); _error_ = 6.0.10. Pembaruan hasil pencarian atau filter **tanpa animasi** agar terasa instan (target ≤ 50 ms).

---
