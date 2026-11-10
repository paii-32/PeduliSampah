// Bank Data Materi Edukasi (Pop-up Modal)
const dataMateri = {
  "mengenal-sampah": {
    judul: "Mengenal Sampah",
    gambar: "mascotBelajar/mengenal_sampah.webp",
    deskripsi: "Sampah adalah sisa atau barang bekas dari aktivitas manusia sehari-hari yang sudah tidak digunakan lagi. Jika dibiarkan menumpuk, sampah bisa menjadi sumber penyakit dan mencemari lingkungan sekitar kita.",
  },
  
  "jenis-sampah": {
    judul: "Jenis-Jenis Sampah",
    gambar: "mascotBelajar/jenis_sampah.webp",
    deskripsi: "Sampah dikelompokkan menjadi 5 jenis utama: Organik (sisa makanan/daun), Anorganik (plastik/kaca/logam), B3 (baterai/obat-obatan berbahaya), Residu (tisu bekas/pembalut), dan E-Waste (elektronik rusak).",
  },
  
  "prinsip-3r": {
    judul: "Prinsip 3R (Reduce, Reuse, Recycle)",
    gambar: "mascotBelajar/prinsip_3r.webp",
    deskripsi: "Prinsip 3R adalah langkah hebat mengurangi sampah! Reduce berarti mengurangi penggunaan barang sekali pakai, Reuse berarti memakai kembali barang yang masih layak, dan Recycle adalah mendaur ulang sampah menjadi barang baru.",
  },
  
  "bahaya-sampah": {
    judul: "Bahaya Sampah Menumpuk",
    gambar: "mascotBelajar/bahaya_sampah.webp",
    deskripsi: "Membuang sampah sembarangan dapat menyumbat saluran air yang memicu banjir, mencemari tanah subur, serta membahayakan satwa laut yang tidak sengaja memakan limbah plastik.",
  },
  
  "cara-memilah": {
    judul: "Cara Memilah Sampah",
    gambar: "mascotBelajar/mengolah_sampah.webp",
    deskripsi: "Sediakan tempat sampah terpisah berdasarkan warnanya! Warna hijau untuk sampah organik, kuning untuk anorganik daur ulang, dan tempat khusus/merah untuk limbah B3.",
  },
  
  "pengolahan-sampah": {
    judul: "Pengolahan Sampah",
    gambar: "mascotBelajar/pengolahan_sampah.webp",
    deskripsi: "Daripada sampah dibiarkan menumpuk begitu saja dan bikin lingkungan kotor, kita bisa memilih, memilah, dan mengolahnya. Ada sampah yang bisa diubah jadi pupuk penyubur tanaman, dan ada juga yang didaur ulang jadi benda baru yang unik. Dengan mengolah sampah, kamu sudah jadi Pahlawan Lingkungan yang menjaga bumi tetap bersih dan sehat!",
  },
  
  "sampah-hewan": {
    judul: "Sampah dan Kelestarian Hewan",
    gambar: "mascotBelajar/sampah_hewan.webp",
    deskripsi: "Tahu nggak? Sampah yang kita buang sembarangan bisa tersapu angin dan air hujan sampai ke hutan, sungai, dan laut! Di sana, hewan-hewan tidak bisa membedakan mana makanan asli dan mana sampah. Banyak penyu dan burung laut yang mengira plastik transparan adalah ubur-ubur lezat, sehingga mereka tidak sengaja memakannya. Selain itu, sampah kantong atau tali plastik juga bisa mengikat tubuh mereka hingga sulit bergerak. Saat kita rajin memilah dan mengurangi sampah plastik dari rumah, kita sedang menyelamatkan teman-teman hewan agar bisa hidup aman dan bebas di alam liar!",
  },
  
  "gaya-hidup-hijau": {
    judul: "Gaya Hidup Hijau",
    gambar: "mascotBelajar/gaya_hidup_hijau.webp",
    deskripsi: "Mulai kebiasaan ramah lingkungan dari hal sederhana: selalu bawa botol minum (tumbler) sendiri, gunakan tas kain saat berbelanja, dan habiskan makananmu tanpa menyisakan sampah.",
  },
};

const modal = document.getElementById("modal-materi");

// Delegation Global untuk Membuka & Menutup Modal
document.addEventListener("click", (e) => {
  
  // Cek jika tombol buka materi diklik
  const openBtn = e.target.closest(".btn-open");
  if (openBtn) {
    const materi = dataMateri[openBtn.dataset.id];
    if (materi) {
      document.getElementById("modal-judul").textContent = materi.judul;
      document.getElementById("modal-gambar").src = materi.gambar;
      document.getElementById("modal-deskripsi").textContent = materi.deskripsi;
      modal.classList.add("active");
    }
  }

  // Cek jika tombol tutup (X, tombol bawah, atau area luar modal) diklik
  if (e.target.id === "close-modal" || e.target.id === "btn-tutup-modal" || e.target === modal) {
    modal.classList.remove("active");
  }
});