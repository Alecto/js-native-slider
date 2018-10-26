'use strict';

let slideItems    = document.querySelectorAll('.slides__item'),
    indContainer  = document.querySelector('.indicators'),
    indItems      = document.querySelectorAll('.indicators__item'),
    currentSlide  = 0;

const LEFT_ARROW  = 37,
      RIGHT_ARROW = 39,
      SPACE       = 32,
      FA_PAUSE    = '<i class="fas fa-pause"></i>',
      FA_PLAY     = '<i class="fas fa-play"></i>';

// activate controls, if javascript is enabled
indContainer.style.display = 'flex'; // flex
document.querySelector('.controls').style.display = 'block'; // block

// carousel basic engine
let gotoSlide = function (n) {
  slideItems[currentSlide].classList.toggle('active');
  indItems[currentSlide].classList.toggle('active');
  currentSlide = (n + slideItems.length) % slideItems.length;
  slideItems[currentSlide].classList.toggle('active');
  indItems[currentSlide].classList.toggle('active');
};

let nextSlide = function () {
  gotoSlide(currentSlide + 1);
};

let previousSlide = function () {
  gotoSlide(currentSlide - 1);
};

let pauseSlideShow = function () {
  pauseBtn.innerHTML = FA_PAUSE;
  playbackStatus = false;
  clearInterval(slideInterval);
};

let playSlideShow = function () {
  pauseBtn.innerHTML = FA_PLAY;
  playbackStatus = true;
  slideInterval = setInterval(nextSlide, 2000);
};

let slideInterval = setInterval(nextSlide, 2000);

// controls
let playbackStatus = true,
    pauseBtn = document.querySelector('.indicators__pause'),
    nextBtn  = document.querySelector('.controls__next'),
    prevBtn  = document.querySelector('.controls__prev');

let pauseClickHandler = function () {
  playbackStatus ? pauseSlideShow() : playSlideShow();
};

let nextClickHandler = function () {
  pauseSlideShow();
  nextSlide();
};

let prevClickHandler = function () {
  pauseSlideShow();
  previousSlide();
};

pauseBtn.addEventListener('click', pauseClickHandler);
nextBtn.addEventListener('click', nextClickHandler);
prevBtn.addEventListener('click', prevClickHandler);

// indicators
let indClickHandler = function (e) {
  let target = e.target;

  if ( target.classList.contains('indicators__item') ) {
    let n = +target.getAttribute('data-slide-to');
    pauseSlideShow();
    gotoSlide(n);
  }
};

// use delegation to optimize the event handler
indContainer.addEventListener('click', indClickHandler);

// set keyboard controls
let keyControlHandler = function (e) {
  if (e.keyCode === LEFT_ARROW) { prevClickHandler(); }
  if (e.keyCode === RIGHT_ARROW) { nextClickHandler(); }
  if (e.keyCode === SPACE) { pauseClickHandler(); }
};

document.addEventListener('keydown', keyControlHandler);
