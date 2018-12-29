let slideItems = document.querySelectorAll('.slides__item');
let indContainer = document.querySelector('.indicators');
let indItems = document.querySelectorAll('.indicators__item');
let currentSlide = 0;
let carouselInterval = 2000;

const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const FA_PAUSE = '<i class="fas fa-pause"></i>';
const FA_PLAY = '<i class="fas fa-play"></i>';

// activate controls, if javascript is enabled
indContainer.style.display = 'flex'; // flex
document.querySelector('.controls').style.display = 'block'; // block

// carousel basic engine
let gotoSlide = (n) => {
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
    currentSlide = (n + slideItems.length) % slideItems.length;
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
};

let nextSlide = () => gotoSlide(currentSlide + 1);

let previousSlide = () => gotoSlide(currentSlide - 1);

// controls
let playbackStatus = true;
let pausePlayBtn = document.querySelector('.indicators__pause');
let nextBtn = document.querySelector('.controls__next');
let prevBtn = document.querySelector('.controls__prev');
let slideInterval = setInterval(nextSlide, carouselInterval);

let pauseSlideShow = () => {
    pausePlayBtn.innerHTML = FA_PAUSE;
    playbackStatus = false;
    clearInterval(slideInterval);
};

let playSlideShow = () => {
    pausePlayBtn.innerHTML = FA_PLAY;
    playbackStatus = true;
    slideInterval = setInterval(nextSlide, carouselInterval);
};

let pausePlayClickHandler = () => playbackStatus ? pauseSlideShow() : playSlideShow();

let nextClickHandler = () => {
    pauseSlideShow();
    nextSlide();
};

let prevClickHandler = () => {
    pauseSlideShow();
    previousSlide();
};

pausePlayBtn.addEventListener('click', pausePlayClickHandler);
nextBtn.addEventListener('click', nextClickHandler);
prevBtn.addEventListener('click', prevClickHandler);

// indicators
let indClickHandler = (e) => {
    let target = e.target;

    if (target.classList.contains('indicators__item')) {
        pauseSlideShow();
        gotoSlide(+target.getAttribute('data-slide-to'));
    }
};

// use delegation to optimize the event handler
indContainer.addEventListener('click', indClickHandler);

// set keyboard controls
let keyControlHandler = (e) => {
    if (e.key === LEFT_ARROW) prevClickHandler();
    if (e.key === RIGHT_ARROW) nextClickHandler();
    if (e.key === SPACE) pausePlayClickHandler();
};

document.addEventListener('keydown', keyControlHandler);