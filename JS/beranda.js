const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", function() {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });
});


// PARALLAX HERO


const hero = document.querySelector(".hero");

const sky = document.querySelector(".hero-sky");
const trees = document.querySelector(".hero-trees");
const trash = document.querySelector(".hero-trash");
const maskot = document.querySelector(".hero-maskot");


let currentScroll = 0;
let targetScroll = 0;

function animateParallax() {

    const heroHeight = hero.offsetHeight;

    targetScroll = Math.min(
        window.scrollY,
        heroHeight
    );

    // Membuat gerakan lebih halus
    currentScroll +=
        (targetScroll - currentScroll) * 0.08;

    // Langit bergerak sangat lambat
    sky.style.transform =
        `translate3d(0, ${currentScroll * 0.05}px, 0)`;

    // Pohon bergerak sedang
    trees.style.transform =
        `translate3d(0, ${currentScroll * 0.15}px, 0)`;

    // Tempat sampah bergerak lebih cepat
    trash.style.transform =
        `translate3d(0, ${currentScroll * 0.25}px, 0)`;

    maskot.style.transform =
        `translate3d(0, ${currentScroll * 0.35}px, 0)`;

    requestAnimationFrame(animateParallax);
}

if (hero && sky && trees && trash && maskot) {
    animateParallax();
}