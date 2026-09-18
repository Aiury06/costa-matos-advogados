console.log("SCRIPT.JS CARREGADO!");

const menuButton = document.querySelector('#menu-mobile');
const nav = document.querySelector('#nav');

menuButton.addEventListener('click', () => {

    nav.classList.toggle('active');

    const icon = menuButton.querySelector('i');

    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }

});


document.querySelectorAll('.nav a').forEach(link => {

    link.addEventListener('click', () => {

        nav.classList.remove('active');

    });

});

/* =========================
   CARROSSEL DE AVALIAÇÕES
========================= */

const track = document.querySelector('#reviews-track');
const cards = document.querySelectorAll('.review-card');
const prevBtn = document.querySelector('#review-prev');
const nextBtn = document.querySelector('#review-next');
const dotsBox = document.querySelector('#review-dots');

let currentSlide = 0;


/* Quantos cards aparecem na tela */

function cardsPerView() {

    if (window.innerWidth <= 600) {
        return 1;
    }

    if (window.innerWidth <= 900) {
        return 2;
    }

    return 3;
}


/* Número máximo de movimentos */

function maxSlide() {

    return Math.max(
        0,
        cards.length - cardsPerView()
    );

}


/* Move o carrossel */

function moveCarousel() {

    if (!cards.length) return;

    const cardWidth =
        cards[0].getBoundingClientRect().width;

    const gap = 20;

    const distance =
        currentSlide * (cardWidth + gap);

    track.style.transform =
        `translateX(-${distance}px)`;

    updateDots();

}


/* Próximo */

nextBtn.addEventListener('click', () => {

    if (currentSlide >= maxSlide()) {

        currentSlide = 0;

    } else {

        currentSlide++;

    }

    moveCarousel();

});


/* Anterior */

prevBtn.addEventListener('click', () => {

    if (currentSlide <= 0) {

        currentSlide = maxSlide();

    } else {

        currentSlide--;

    }

    moveCarousel();

});


/* DOTS */

function createDots() {

    dotsBox.innerHTML = '';

    for (let i = 0; i <= maxSlide(); i++) {

        const dot =
            document.createElement('button');

        dot.classList.add('review-dot');


        dot.addEventListener('click', () => {

            currentSlide = i;

            moveCarousel();

        });


        dotsBox.appendChild(dot);

    }

}


function updateDots() {

    const dots =
        document.querySelectorAll('.review-dot');


    dots.forEach((dot, index) => {

        dot.classList.toggle(
            'active',
            index === currentSlide
        );

    });

}


/* Redimensionamento */

window.addEventListener('resize', () => {

    currentSlide = 0;

    createDots();

    moveCarousel();

});


createDots();
moveCarousel();