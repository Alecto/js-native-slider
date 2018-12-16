'use strict';

let $slides     = $('.slides__item'),
    $indContainer = $('.indicators'),
    $indItems   = $('.indicators__item'),
    currentSlide = 0,
    carouselInterval = 2000;

const SPACE     = ' ',
    LEFT_ARROW  = 'ArrowLeft',
    RIGHT_ARROW = 'ArrowRight',
    FA_PAUSE    = '<i class="fas fa-pause"></i>',
    FA_PLAY     = '<i class="fas fa-play"></i>';

// activate controls, if javascript is enabled
$indContainer.css('display', 'flex'); // flex
$('.controls').css('display', 'block'); // block

// carousel basic engine
let gotoSlide = (n) => {
    $($slides[currentSlide]).toggleClass('active');
    $($indItems[currentSlide]).toggleClass('active');
    currentSlide = (n + $slides.length) % $slides.length;
    $($slides[currentSlide]).toggleClass('active');
    $($indItems[currentSlide]).toggleClass('active');
};

let nextSlide = () => gotoSlide(currentSlide + 1);

let previousSlide = () => gotoSlide(currentSlide - 1);

let pauseSlideShow = () => {
    $pausePlayBtn.html(FA_PAUSE);
    playbackStatus = false;
    clearInterval(slideInterval);
};

let playSlideShow = () => {
    $pausePlayBtn.html(FA_PLAY);
    playbackStatus = true;
    slideInterval = setInterval(nextSlide, carouselInterval);
};

let slideInterval = setInterval(nextSlide, carouselInterval);

// controls
let playbackStatus = true,
    $pausePlayBtn = $('.indicators__pause'),
    $nextBtn = $('.controls__next'),
    $prevBtn = $('.controls__prev');

let pausePlayClickHandler = () => playbackStatus ? pauseSlideShow() : playSlideShow();

let nextClickHandler = () => {
    pauseSlideShow();
    nextSlide();
};

let prevClickHandler = () => {
    pauseSlideShow();
    previousSlide();
};

$pausePlayBtn.on('click', pausePlayClickHandler);
$nextBtn.on('click', nextClickHandler);
$prevBtn.on('click', prevClickHandler);

// indicators
let indClickHandler = (e) => {
    pauseSlideShow();
    gotoSlide(+e.target.getAttribute('data-slide-to'));
};

// use delegation to optimize the event handler
$indContainer.on('click', '.indicators__item', indClickHandler);

// set keyboard controls
let keyControlHandler = (e) => {
    if (e.key === LEFT_ARROW) prevClickHandler();
    if (e.key === RIGHT_ARROW) nextClickHandler();
    if (e.key === SPACE) pausePlayClickHandler();
};

$(document).on('keydown', keyControlHandler);
