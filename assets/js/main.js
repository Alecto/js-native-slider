'use strict';

let slideItems    = document.querySelectorAll('.slides__item'),
    indContainer  = document.querySelector('.indicators'),
    indItems      = document.querySelectorAll('.indicators__item'),
    currentSlide  = 0;

const LEFT_ARROW  = 'ArrowLeft',
      RIGHT_ARROW = 'ArrowRight',
      SPACE       = ' ',
      FA_PAUSE    = '<i class="fas fa-pause"></i>',
      FA_PLAY     = '<i class="fas fa-play"></i>';

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

let nextSlide = () => {
    gotoSlide(currentSlide + 1);
};

let previousSlide = () => {
    gotoSlide(currentSlide - 1);
};

let pauseSlideShow = () => {
    pausePlayBtn.innerHTML = FA_PAUSE;
    playbackStatus = false;
    clearInterval(slideInterval);
};

let playSlideShow = () => {
    pausePlayBtn.innerHTML = FA_PLAY;
    playbackStatus = true;
    slideInterval = setInterval(nextSlide, 2000);
};

let slideInterval = setInterval(nextSlide, 2000);

// controls
let playbackStatus = true,
    pausePlayBtn = document.querySelector('.indicators__pause'),
    nextBtn  = document.querySelector('.controls__next'),
    prevBtn  = document.querySelector('.controls__prev');

let pauseClickHandler = () => {
    playbackStatus ? pauseSlideShow() : playSlideShow();
};

let nextClickHandler = () => {
    pauseSlideShow();
    nextSlide();
};

let prevClickHandler = () => {
    pauseSlideShow();
    previousSlide();
};

pausePlayBtn.addEventListener('click', pauseClickHandler);
nextBtn.addEventListener('click', nextClickHandler);
prevBtn.addEventListener('click', prevClickHandler);

// indicators
let indClickHandler = (e) => {
    let target = e.target;

    if ( target.classList.contains('indicators__item') ) {
        pauseSlideShow();
        gotoSlide(+target.getAttribute('data-slide-to'));
    }
};

// use delegation to optimize the event handler
indContainer.addEventListener('click', indClickHandler);

// set keyboard controls
let keyControlHandler = (e) => {
    if (e.key === LEFT_ARROW) { prevClickHandler(); }
    if (e.key === RIGHT_ARROW) { nextClickHandler(); }
    if (e.key === SPACE) { pauseClickHandler(); }
};

document.addEventListener('keydown', keyControlHandler);