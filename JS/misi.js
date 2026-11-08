document.addEventListener("DOMContentLoaded", () => {
    let missionsData = [];
    let completedMissions = [];
    let currentTab = "harian";

    // Elements
    const misiContainer = document.getElementById("misi-container");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const progressText = document.getElementById("progress-text");
    const progressFill = document.getElementById("progress-fill");
    const badgeCountText = document.getElementById("badge-count-text");
    const badgeShowcaseContainer = document.getElementById("badge-showcase-container");

    // Modal Elements
    const badgeModal = document.getElementById("badge-modal");
    const btnOpenBadgeModal = document.getElementById("btn-open-badge-modal");
    const btnCloseBadgeModal = document.getElementById("btn-close-badge-modal");

    // Fetch data dari folder DATA/missions.json
    fetch("DATA/missions.json")
        .then((res) => res.json())
        .then((data) => {
            missionsData = data.misi; // Mengambil array dari key "misi"

            let savedMissions = JSON.parse(localStorage.getItem("peduli_completed_missions")) || [];
            const validIds = missionsData.map(m => m.id);
            completedMissions = savedMissions.filter(id => validIds.includes(id));
            localStorage.setItem("peduli_completed_missions", JSON.stringify(completedMissions));

            renderMissions();
            updateStats();
            renderBadgeShowcase();
        })
        .catch((err) => console.error("Gagal memuat missions.json:", err));

    // 2. Render Kartu Misi berdasarkan Tab Aktif
    function renderMissions() {
        if (!misiContainer) return;
        misiContainer.innerHTML = "";
        
        // Memfilter berdasarkan properti 'jenis' di missions.json ("harian", "mingguan", "bulanan", "wajib")[cite: 14]
        const filteredMissions = missionsData.filter((m) => m.jenis === currentTab);

        if (filteredMissions.length === 0) {
            misiContainer.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted);">Belum ada misi untuk kategori ini.</p>`;
            return;
        }

        filteredMissions.forEach((misi) => {
            const isDone = completedMissions.includes(misi.id);
            const badgeText = misi.reward_badge ? misi.reward_badge : `🏆 +${misi.poin} Poin`;

            const card = document.createElement("div");
            card.className = `misi-card ${isDone ? "completed" : ""}`;
            card.innerHTML = `
                <div class="card-top">
                    <span class="badge-reward-tag">${badgeText}</span>
                    <h3>${misi.judul}</h3>
                    <p>${misi.deskripsi}</p>
                </div>
                
                <button class="btn-complete ${isDone ? "done" : ""}" data-id="${misi.id}">
                    ${isDone ? "✓ Selesai" : "Tandai Selesai"}
                </button>
            `;

            misiContainer.appendChild(card);
        });

        // Pasang Event Listener Tombol Selesai
        document.querySelectorAll(".btn-complete").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = e.target.getAttribute("data-id");
                toggleMissionComplete(id);
            });
        });
    }

    // 3. Logic Tandai Selesai / Simpan ke LocalStorage
    function toggleMissionComplete(id) {
        if (!completedMissions.includes(id)) {
            completedMissions.push(id);
        } else {
            completedMissions = completedMissions.filter((item) => item !== id);
        }

        localStorage.setItem("peduli_completed_missions", JSON.stringify(completedMissions));
        renderMissions();
        updateStats();
        renderBadgeShowcase();
    }

    // 4. Update Angka Statistik & Progress Bar
    function updateStats() {
        const total = missionsData.length;
        const completedCount = completedMissions.length;
        const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

        if (progressText) progressText.innerText = `${completedCount} / ${total} Misi Selesai`;
        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (badgeCountText) badgeCountText.innerText = `${completedCount} Lencana Terbuka`;

        // Update Angka Badge per Tab (harian, mingguan, bulanan, wajib)
        ["harian", "mingguan", "bulanan", "wajib"].forEach((tab) => {
            const totalTab = missionsData.filter((m) => m.jenis === tab).length;
            const doneTab = missionsData.filter((m) => m.jenis === tab && completedMissions.includes(m.id)).length;
            const badgeElem = document.getElementById(`badge-count-${tab}`);
            if (badgeElem) badgeElem.innerText = `${doneTab}/${totalTab}`;
        });
    }

    // 5. Render Modal Koleksi Lencana
    function renderBadgeShowcase() {
        if (!badgeShowcaseContainer) return;
        badgeShowcaseContainer.innerHTML = "";

        missionsData.forEach((misi) => {
            const isUnlocked = completedMissions.includes(misi.id);
            const badgeLabel = misi.reward_badge ? misi.reward_badge : `⭐ Misi ${misi.id}`;
            const icon = badgeLabel.split(" ")[0] || "🏆";
            const title = badgeLabel.split(" ").slice(1).join(" ") || misi.judul;

            const item = document.createElement("div");
            item.className = `badge-item ${isUnlocked ? "unlocked" : ""}`;
            item.innerHTML = `
                <div class="badge-item-icon">${icon}</div>
                <div class="badge-item-title">${title}</div>
            `;

            badgeShowcaseContainer.appendChild(item);
        });
    }

    // Event Listener Tab Click
    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            tabButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            currentTab = btn.getAttribute("data-tab");
            renderMissions();
        });
    });

    // Event Listener Modal Lencana
    if (btnOpenBadgeModal) {
        btnOpenBadgeModal.addEventListener("click", () => badgeModal.classList.add("active"));
    }
    if (btnCloseBadgeModal) {
        btnCloseBadgeModal.addEventListener("click", () => badgeModal.classList.remove("active"));
    }
    if (badgeModal) {
        badgeModal.addEventListener("click", (e) => {
            if (e.target === badgeModal) badgeModal.classList.remove("active");
        });
    }

    // Event Listener untuk Tombol Kembali ke Misi di dalam Modal Lencana
    const btnBackMission = document.getElementById("btn-back-mission");
    if (btnBackMission) {
        btnBackMission.addEventListener("click", () => {
            badgeModal.classList.remove("active");
        });
    }
});