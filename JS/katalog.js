// Variable State Katalog
let dataSampah = [];
let dataKategori = [];
let filteredSampah = [];
let currentCategory = 'semua';
let currentSearchQuery = '';
let isSortedAsc = false;

// Element DOM
const gridContainer = document.getElementById('katalog-grid');
const inputSearch = document.getElementById('input-pencarian');
const btnClearSearch = document.getElementById('btn-clear-search');
const btnSort = document.getElementById('btn-sort');
const btnReset = document.getElementById('btn-reset');
const btnResetEmpty = document.getElementById('btn-reset-empty');
const emptyState = document.getElementById('empty-state');
const resultsCountText = document.getElementById('results-count-text');
const chipFilters = document.querySelectorAll('.chip-filter');

// Modal Detail Elements
const modalDetail = document.getElementById('modal-detail-sampah');
const btnCloseDetail = document.getElementById('close-modal-detail');

// Menghubungkan Data JSON dari sampah.json
async function loadSampahData() {
  try {
    const response = await fetch('data/sampah.json');
    const data = await response.json();
    
    dataSampah = data.sampah;
    dataKategori = data.kategori;
    
    updateCategoryCounts();
    renderKatalog();
  } catch (error) {
    console.error('Gagal memuat data sampah:', error);
    gridContainer.innerHTML = '<p class="error-msg">Gagal memuat data katalog. Pastikan file sampah.json tersedia.</p>';
  }
}

// Angka Penghitung pada Chip Filter
function updateCategoryCounts() {
  document.getElementById('count-semua').textContent = dataSampah.length;
  
  const counts = {
    organik: 0,
    anorganik: 0,
    b3: 0,
    residu: 0,
    ewaste: 0
  };

  dataSampah.forEach(item => {
    if (counts[item.kategori_id] !== undefined) {
      counts[item.kategori_id]++;
    }
  });

  for (const [key, count] of Object.entries(counts)) {
    const el = document.getElementById(`count-${key}`);
    if (el) el.textContent = count;
  }
}

// Render Kartu Katalog Sampah ke Grid
function renderKatalog() {
  // Filter berdasarkan kategori dan pencarian
  filteredSampah = dataSampah.filter(item => {
    const matchCategory = (currentCategory === 'semua') || (item.kategori_id === currentCategory);
    
    const query = currentSearchQuery.toLowerCase().trim();
    const matchSearch = query === '' || 
      item.nama.toLowerCase().includes(query) ||
      item.deskripsi_singkat.toLowerCase().includes(query) ||
      (item.kata_kunci && item.kata_kunci.some(k => k.toLowerCase().includes(query)));

    return matchCategory && matchSearch;
  });

  // Sortir A-Z jika aktif
  if (isSortedAsc) {
    filteredSampah.sort((a, b) => a.nama.localeCompare(b.nama));
  }

  resultsCountText.textContent = `Menampilkan ${filteredSampah.length} dari ${dataSampah.length} jenis sampah terdaftar`;

  // Menampilkan Empty State jika tidak ada hasil di pencarian
  if (filteredSampah.length === 0) {
    gridContainer.style.display = 'none';
    emptyState.hidden = false;
    return;
  }

  gridContainer.style.display = 'grid';
  emptyState.hidden = true;

  // Render Kartu HTML
  gridContainer.innerHTML = filteredSampah.map(item => {
    const catInfo = getCategoryInfo(item.kategori_id);
    
    return `
      <article class="sampah-card" onclick="bukaModalDetail('${item.id}')">
        <div class="card-top-tags">
          <span class="tag-kategori tag-${item.kategori_id}">
            ${item.kategori_id.toUpperCase()}
          </span>
          <span class="tag-tong-swatch" style="background-color: ${catInfo.warna}">
            ${item.tong}
          </span>
        </div>

        <div class="card-image-box box-${item.kategori_id}">
          <span class="card-emoji">${item.ikon}</span>
        </div>

        <h3 class="card-title">${item.nama}</h3>
        <p class="card-desc">${item.deskripsi_singkat}</p>

        <div class="card-footer-info">
          <span class="tong-name">🗑️ ${item.tong}</span>
          <span class="btn-detail-link">Lihat Detail &rarr;</span>
        </div>
      </article>
    `;
  }).join('');
}

// Helper Mendorong Info Kategori
function getCategoryInfo(catId) {
  const found = dataKategori.find(c => c.id === catId);
  return found || { warna: '#6B7280', nama: catId };
}

// Event Handler Pencarian (Debounce)
let searchTimeout;
inputSearch.addEventListener('input', (e) => {
  currentSearchQuery = e.target.value;
  btnClearSearch.hidden = currentSearchQuery === '';

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    renderKatalog();
  }, 200);
});

// Clear Search
btnClearSearch.addEventListener('click', () => {
  inputSearch.value = '';
  currentSearchQuery = '';
  btnClearSearch.hidden = true;
  renderKatalog();
});

// Event Handler Chip Filter
chipFilters.forEach(chip => {
  chip.addEventListener('click', () => {
    chipFilters.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    currentCategory = chip.dataset.kategori;
    renderKatalog();
  });
});

// Sort A-Z Toggle
btnSort.addEventListener('click', () => {
  isSortedAsc = !isSortedAsc;
  btnSort.classList.toggle('active', isSortedAsc);
  btnSort.innerHTML = isSortedAsc ? '<span class="btn-icon">✓</span> Urut A-Z' : '<span class="btn-icon">⇅</span> Urut A-Z';
  renderKatalog();
});

// Reset Handler
function resetAllFilters() {
  currentCategory = 'semua';
  currentSearchQuery = '';
  isSortedAsc = false;

  inputSearch.value = '';
  btnClearSearch.hidden = true;
  btnSort.classList.remove('active');
  btnSort.innerHTML = '<span class="btn-icon">⇅</span> Urut A-Z';

  chipFilters.forEach(c => c.classList.remove('active'));
  document.querySelector('.chip-filter[data-kategori="semua"]').classList.add('active');

  renderKatalog();
}

btnReset.addEventListener('click', resetAllFilters);
btnResetEmpty.addEventListener('click', resetAllFilters);

// Pop-Up Modal Detail Handler
window.bukaModalDetail = function(id) {
  const item = dataSampah.find(s => s.id === id);
  if (!item) return;

  document.getElementById('detail-emoji').textContent = item.ikon;
  document.getElementById('detail-nama').textContent = item.nama;
  document.getElementById('detail-tong').textContent = item.tong;
  document.getElementById('detail-terurai').textContent = item.waktu_terurai;
  document.getElementById('detail-deskripsi').textContent = item.deskripsi_lengkap || item.deskripsi_singkat;
  document.getElementById('detail-fakta-seru').textContent = item.fakta_seru || 'Satu aksi kecilmu memilah sampah sangat berarti untuk bumi!';

  const badgeKategori = document.getElementById('detail-badge-kategori');
  badgeKategori.textContent = item.kategori_id.toUpperCase();
  badgeKategori.className = `badge-cat-modal tag-${item.kategori_id}`;

  const warningBox = document.getElementById('detail-peringatan-b3');
  const warningText = document.getElementById('detail-peringatan-text');

  if (item.keamanan && item.keamanan.level !== 'aman') {
    // Menampilkan banner
    warningBox.removeAttribute('hidden');
    warningBox.style.display = 'flex';

    if (item.keamanan.level === 'bahaya') {
      warningBox.className = 'warning-banner-modal level-bahaya';
    } else if (item.keamanan.level === 'hati-hati') {
      warningBox.className = 'warning-banner-modal level-hati-hati';
    }

    warningText.textContent = item.keamanan.peringatan || 'Perlu pendampingan orang dewasa!';
  } else {
    warningBox.setAttribute('hidden', 'true');
    warningBox.style.display = 'none';
  }

  const caraList = document.getElementById('detail-cara-tangani');
  caraList.innerHTML = (item.cara_tangani || ['Buang ke tempat sampah yang sesuai.'])
    .map(c => `<li>${c}</li>`).join('');

  modalDetail.classList.add('active');
};

if (btnCloseDetail) {
  btnCloseDetail.addEventListener('click', () => {
    modalDetail.classList.remove('active');
  });
}

if (modalDetail) {
  modalDetail.addEventListener('click', (e) => {
    if (e.target === modalDetail) modalDetail.classList.remove('active');
  });
}

// Inisialisasi Pertama
document.addEventListener('DOMContentLoaded', loadSampahData);