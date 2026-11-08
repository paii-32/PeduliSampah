
// ==========================================
// PEDULI SAMPAH - SISTEM KUIS
// Fokus: Kuis SD (Tunas)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. KONFIGURASI
    // ==========================================

    const DATA_SD = "DATA/kuis_sd.json";
    const DATA_SMP = "DATA/kuis_smp.json";

    let quizData = null;
    let questions = [];
    let currentQuestionIndex = 0;
    let selectedAnswer = null;
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let isAnswered = false;
    let currentLevel = "tunas";
    let isQuizFinished = false;

    // ==========================================
    // 2. ELEMENT HTML
    // ==========================================

    const questionText = document.getElementById("question-text");
    const questionItemName = document.getElementById("question-item-name");
    const quizProgress = document.getElementById("quiz-progress");
    const sessionScore = document.getElementById("session-score");
    const optionsContainer = document.getElementById("options-container");

    const feedbackBanner = document.getElementById("feedback-banner");
    const feedbackTitle = document.getElementById("feedback-title");
    const feedbackDesc = document.getElementById("feedback-desc");

    const btnSubmit = document.getElementById("btn-submit");
    const btnExit = document.getElementById("btn-exit");

    const resultModal = document.getElementById("result-modal");
    const finalScore = document.getElementById("final-score");
    const statTotal = document.getElementById("stat-total");
    const statCorrect = document.getElementById("stat-correct");
    const statWrong = document.getElementById("stat-wrong");
    const raniResultText = document.getElementById("rani-result-text");

    const btnRestart = document.getElementById("btn-restart");
    const btnHome = document.getElementById("btn-home");

    const questionImage = document.querySelector(".question-image");
    const questionImageContainer = document.querySelector(
        ".question-image-container"
    );
    const feedbackMascot = document.getElementById("feedback-mascot");

    const levelButtons = document.querySelectorAll(".btn-level");

    // ==========================================
    // 3. MEMUAT DATA KUIS
    // ==========================================

    async function loadQuiz(level = "tunas") {
        currentLevel = level;

        const filePath = level === "pohon" ? DATA_SMP : DATA_SD;

        try {
            const response = await fetch(filePath);

            if (!response.ok) {
                throw new Error("File kuis tidak ditemukan: " + filePath);
            }

            quizData = await response.json();

            if (!quizData.soal || !Array.isArray(quizData.soal)) {
                throw new Error("Format data soal tidak sesuai.");
            }

            startQuiz();

        } catch (error) {
            console.error("Gagal memuat kuis:", error);

            if (questionText) {
                questionText.textContent =
                    "Kuis gagal dimuat. Periksa file JSON dan lokasi folder.";
            }
        }
    }

    // ==========================================
    // 4. MENGACAK DATA
    // ==========================================

    function shuffleArray(array) {
        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[randomIndex]] =
                [shuffled[randomIndex], shuffled[i]];
        }

        return shuffled;
    }

    // ==========================================
    // 5. MEMULAI KUIS
    // ==========================================

    function startQuiz() {
        if (!quizData || !quizData.soal) return;

        const aturan = quizData.aturan || {};

        const jumlahSoal = Number(aturan.soal_per_sesi) || 10;

        const kumpulanSoal = aturan.acak_soal
            ? shuffleArray(quizData.soal)
            : [...quizData.soal];

        questions = kumpulanSoal.slice(0, jumlahSoal);

        currentQuestionIndex = 0;
        selectedAnswer = null;
        score = 0;
        correctCount = 0;
        wrongCount = 0;
        isAnswered = false;
        isQuizFinished = false;

        hideFeedback();
        hideResult();

        if (sessionScore) {
            sessionScore.textContent = score;
        }

        if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.textContent = "Periksa Jawaban";
        }

        if (questions.length === 0) {
            if (questionText) {
                questionText.textContent = "Belum ada soal tersedia.";
            }
            return;
        }

        renderQuestion();
    }

    // ==========================================
    // 6. MENAMPILKAN SOAL
    // ==========================================

    function renderQuestion() {
        if (currentQuestionIndex >= questions.length) {
            showResult();
            return;
        }

        const question = questions[currentQuestionIndex];

        selectedAnswer = null;
        isAnswered = false;

        hideFeedback();

        if (questionText) {
            questionText.textContent = question.pertanyaan || "";
        }

        if (questionItemName) {
            questionItemName.textContent =
                question.nama ||
                question.nama_sampah ||
                question.sampah_id ||
                "";
        }

        if (quizProgress) {
            quizProgress.textContent =
                `${currentQuestionIndex + 1}/${questions.length}`;
        }

        if (sessionScore) {
            sessionScore.textContent = score;
        }

        showQuestionImage(question);

        renderOptions(question);

        if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.textContent = "Periksa Jawaban";
        }
    }

    // ==========================================
    // 7. MENAMPILKAN GAMBAR SOAL
    // ==========================================

    function showQuestionImage(question) {
        if (!questionImage) return;

        const imagePath = question.gambar || "";

        if (imagePath) {
            questionImage.src = imagePath;
            questionImage.alt = question.nama || "Gambar soal kuis";
            questionImage.style.display = "block";

            if (questionImageContainer) {
                questionImageContainer.style.display = "block";
            }

            questionImage.onerror = function () {
                this.style.display = "none";
            };

        } else {
            questionImage.removeAttribute("src");
            questionImage.style.display = "none";

            if (questionImageContainer) {
                questionImageContainer.style.display = "none";
            }
        }
    }

    // ==========================================
    // 8. MENAMPILKAN PILIHAN JAWABAN
    // ==========================================

    function renderOptions(question) {
        if (!optionsContainer) return;

        optionsContainer.innerHTML = "";

        let pilihan = [...(question.pilihan || [])];

        if (
            quizData.aturan &&
            quizData.aturan.acak_pilihan
        ) {
            pilihan = shuffleArray(pilihan);
        }

        pilihan.forEach((option) => {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "option-btn";
            button.textContent = option.teks || "";
            button.dataset.answer = option.id;

            button.addEventListener("click", () => {
                selectOption(button, option.id);
            });

            optionsContainer.appendChild(button);
        });
    }

    // ==========================================
    // 9. MEMILIH JAWABAN
    // ==========================================

    function selectOption(button, answerId) {
        if (isAnswered) return;

        selectedAnswer = answerId;

        const allOptions =
            optionsContainer.querySelectorAll(".option-btn");

        allOptions.forEach((option) => {
            option.classList.remove("selected");
        });

        button.classList.add("selected");
    }

    // ==========================================
    // 10. MEMERIKSA JAWABAN
    // ==========================================

    function checkAnswer() {
        if (isAnswered) return;

        if (selectedAnswer === null) {
            alert("Silakan pilih jawaban terlebih dahulu.");
            return;
        }

        const question = questions[currentQuestionIndex];

        const isCorrect =
            String(selectedAnswer) ===
            String(question.jawaban_benar);

        isAnswered = true;

        const allOptions =
            optionsContainer.querySelectorAll(".option-btn");

        allOptions.forEach((button) => {
            button.disabled = true;

            const answerId = button.dataset.answer;

            if (
                String(answerId) ===
                String(question.jawaban_benar)
            ) {
                button.classList.add("correct");
            }

            if (
                String(answerId) ===
                String(selectedAnswer) &&
                !isCorrect
            ) {
                button.classList.add("wrong");
            }
        });

        if (isCorrect) {
            const poin =
                Number(quizData.aturan?.poin_per_benar) || 10;

            score += poin;
            correctCount++;

            showFeedback(question, true);

        } else {
            wrongCount++;
            showFeedback(question, false);
        }

        if (sessionScore) {
            sessionScore.textContent = score;
        }

        if (btnSubmit) {
            btnSubmit.disabled = false;

            if (currentQuestionIndex === questions.length - 1) {
                btnSubmit.textContent = "Lihat Hasil";
            } else {
                btnSubmit.textContent = "Soal Berikutnya";
            }
        }
    }

    // ==========================================
    // 11. UMPAN BALIK JAWABAN
    // ==========================================

    function showFeedback(question, isCorrect) {
    if (!feedbackBanner) return;

    const feedback = question.umpan_balik || {};

    if (isCorrect) {
        feedbackTitle.textContent = "Jawaban Benar!";
        feedbackDesc.textContent =
            feedback.benar || "Bagus! Jawaban kamu benar!";

        feedbackMascot.src = "ASSETS/Maskot/maskot3.png";

        feedbackBanner.classList.remove("wrong");
        feedbackBanner.classList.add("correct");

    } else {
        feedbackTitle.textContent = "Jawaban Belum Tepat";
        feedbackDesc.textContent =
            feedback.salah || "Tetap semangat belajar!";

        feedbackMascot.src = "ASSETS/Maskot/maskot7.png";

        feedbackBanner.classList.remove("correct");
        feedbackBanner.classList.add("wrong");
    }

    feedbackBanner.classList.add("show");
    feedbackBanner.style.display = "block";
}

    function hideFeedback() {
        if (!feedbackBanner) return;

        feedbackBanner.classList.remove(
            "show",
            "correct",
            "wrong"
        );

        feedbackBanner.style.display = "none";
    }

    // ==========================================
    // 12. PINDAH SOAL / LIHAT HASIL
    // ==========================================

    function nextQuestion() {
        if (!isAnswered) return;

        // Jika sudah menjawab soal terakhir,
        // langsung tampilkan hasil kuis.

        if (currentQuestionIndex >= questions.length - 1) {
            showResult();
            return;
        }

        currentQuestionIndex++;

        renderQuestion();
    }

    // ==========================================
    // 13. MENAMPILKAN HASIL KUIS
    // ==========================================

    function showResult() {
        if (isQuizFinished) return;

        isQuizFinished = true;

        hideFeedback();

        const totalSoal = questions.length;

        const persentase = totalSoal > 0
            ? Math.round((correctCount / totalSoal) * 100)
            : 0;

        // Menampilkan nilai akhir

        if (finalScore) {
            finalScore.textContent = score;
        }

        if (statTotal) {
            statTotal.textContent = totalSoal;
        }

        if (statCorrect) {
            statCorrect.textContent = correctCount;
        }

        if (statWrong) {
            statWrong.textContent = wrongCount;
        }

        // Mengambil pesan hasil dari JSON

        const daftarPesan = quizData.pesan_hasil || [];

        let pesanTerpilih = null;

        if (Array.isArray(daftarPesan)) {
            const pesanUrut = [...daftarPesan].sort(
                (a, b) =>
                    Number(b.min_persen || 0) -
                    Number(a.min_persen || 0)
            );

            pesanTerpilih = pesanUrut.find(
                (pesan) =>
                    persentase >= Number(pesan.min_persen || 0)
            );

        } else if (typeof daftarPesan === "object") {
            const semuaPesan = Object.values(daftarPesan);

            const pesanUrut = semuaPesan.sort(
                (a, b) =>
                    Number(b.min_persen || 0) -
                    Number(a.min_persen || 0)
            );

            pesanTerpilih = pesanUrut.find(
                (pesan) =>
                    persentase >= Number(pesan.min_persen || 0)
            );
        }

        if (raniResultText) {
            raniResultText.textContent =
                pesanTerpilih?.isi ||
                "Terima kasih sudah belajar memilah sampah bersama RANI!";
        }

        // Menampilkan modal hasil

        if (resultModal) {
            resultModal.classList.add("active");
            resultModal.style.display = "flex";
            resultModal.setAttribute("aria-hidden", "false");
        } else {
            console.error(
                'Elemen dengan ID "result-modal" tidak ditemukan.'
            );
        }

        if (btnSubmit) {
            btnSubmit.disabled = true;
        }

        console.log("Kuis selesai:", {
            nilai: score,
            benar: correctCount,
            salah: wrongCount,
            total: totalSoal,
            persentase: persentase
        });
    }

    // ==========================================
    // 14. MENUTUP MODAL HASIL
    // ==========================================

    function hideResult() {
        if (!resultModal) return;

        resultModal.classList.remove("active");
        resultModal.style.display = "none";
        resultModal.setAttribute("aria-hidden", "true");
    }

    // ==========================================
    // 15. EVENT TOMBOL
    // ==========================================

    if (btnSubmit) {
        btnSubmit.addEventListener("click", () => {
            if (isQuizFinished) return;

            if (isAnswered) {
                nextQuestion();
            } else {
                checkAnswer();
            }
        });
    }

    if (btnRestart) {
        btnRestart.addEventListener("click", () => {
            startQuiz();
        });
    }

    if (btnHome) {
        btnHome.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    if (btnExit) {
        btnExit.addEventListener("click", () => {
            const confirmExit = confirm(
                "Apakah kamu yakin ingin keluar dari kuis?"
            );

            if (confirmExit) {
                window.location.href = "index.html";
            }
        });
    }

    // ==========================================
    // 16. EVENT TOMBOL LEVEL
    // ==========================================

    levelButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const level = button.dataset.level;

            if (!level) return;

            levelButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            loadQuiz(level);
        });
    });

    // ==========================================
    // 17. MEMULAI KUIS PERTAMA KALI
    // ==========================================

    const activeLevelButton =
        document.querySelector(".btn-level.active");

    const initialLevel =
        activeLevelButton?.dataset.level || "tunas";

    loadQuiz(initialLevel);

});



// ==========================================
// MUSIK LATAR KUIS
// ==========================================

const quizMusic = document.getElementById("quiz-music");

if (quizMusic) {
    quizMusic.volume = 0.35;

    quizMusic.play()
        .then(() => {
            // Musik berhasil diputar
            quizMusic.muted = false;
        })
        .catch((error) => {
            console.log("Browser menolak autoplay:", error);
        });
}

