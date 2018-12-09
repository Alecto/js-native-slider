'use strict';

let $slides        = $('.slides__item'),
    $indContainer  = $('.indicators'),
    $indItems      = $('.indicators__item'),
    currentSlide  = 0;

const LEFT_ARROW  = 37,
      RIGHT_ARROW = 39,
      SPACE       = 32,
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

let nextSlide = () => {
  gotoSlide(currentSlide + 1);
};

let previousSlide = () => {
  gotoSlide(currentSlide - 1);
};

let pauseSlideShow = () => {
  $pauseBtn.html(FA_PAUSE);
  playbackStatus = false;
  clearInterval(slideInterval);
};

let playSlideShow = () => {
  $pauseBtn.html(FA_PLAY);
  playbackStatus = true;
  slideInterval = setInterval(nextSlide, 2000);
};

let slideInterval = setInterval(nextSlide, 2000);

// controls
let playbackStatus = true,
    $pauseBtn = $('.indicators__pause'),
    $nextBtn  = $('.controls__next'),
    $prevBtn  = $('.controls__prev');

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

$pauseBtn.on('click', pauseClickHandler);
$nextBtn.on('click', nextClickHandler);
$prevBtn.on('click', prevClickHandler);

// indicators
let indClickHandler = (e) => {
  const target = e.target;
  pauseSlideShow();
  gotoSlide(+target.getAttribute('data-slide-to'));
};

// use delegation to optimize the event handler
$indContainer.on('click', '.indicators__item', indClickHandler);

// set keyboard controls
let keyControlHandler = (e) => {
  if (e.keyCode === LEFT_ARROW) { prevClickHandler(); }
  if (e.keyCode === RIGHT_ARROW) { nextClickHandler(); }
  if (e.keyCode === SPACE) { pauseClickHandler(); }
};

$(document).on('keydown', keyControlHandler);
