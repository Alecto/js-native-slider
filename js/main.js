'use strict';

var slides        = document.querySelectorAll('.slides__item');
var indContainer  = document.querySelector('.indicators');
var indItems      = document.querySelectorAll('.indicators__item');
var currentSlide  = 0;

const LEFT_ARROW  = 37;
const RIGHT_ARROW = 39;
const SPACE       = 32;
const FA_PAUSE    = '<i class="fas fa-pause"></i>';
const FA_PLAY     = '<i class="fas fa-play"></i>';

// activate controls, if javascript is enabled
indContainer.style.display = 'flex'; // flex
document.querySelector('.controls').style.display = 'block'; // block

// carousel basic engine
var gotoSlide = function (n) {
  slides[currentSlide].classList.toggle('active');
  indItems[currentSlide].classList.toggle('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.toggle('active');
  indItems[currentSlide].classList.toggle('active');
};

var nextSlide = function () {
  gotoSlide(currentSlide + 1);
};

var previousSlide = function () {
  gotoSlide(currentSlide - 1);
};

var pauseSlideShow = function () {
  pauseBtn.innerHTML = FA_PAUSE;
  playbackStatus = false;
  clearInterval(slideInterval);
};

var playSlideShow = function () {
  pauseBtn.innerHTML = FA_PLAY;
  playbackStatus = true;
  slideInterval = setInterval(nextSlide, 2000);
};

var slideInterval = setInterval(nextSlide, 2000);

// controls
var playbackStatus = true;
var pauseBtn = document.querySelector('.indicators__pause');
var nextBtn  = document.querySelector('.controls__next');
var prevBtn  = document.querySelector('.controls__prev');

var pauseClickHandler = function () {
  playbackStatus ? pauseSlideShow() : playSlideShow();
};

var nextClickHandler = function () {
  pauseSlideShow();
  nextSlide();
};

var prevClickHandler = function () {
  pauseSlideShow();
  previousSlide();
};

pauseBtn.addEventListener('click', pauseClickHandler);
nextBtn.addEventListener('click', nextClickHandler);
prevBtn.addEventListener('click', prevClickHandler);

// indicators
var indClickHandler = function (e) {
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
var keyControlHandler = function (e) {
  if (e.keyCode === LEFT_ARROW) { prevClickHandler(); }
  if (e.keyCode === RIGHT_ARROW) { nextClickHandler(); }
  if (e.keyCode === SPACE) { pauseClickHandler(); }
};

document.addEventListener('keydown', keyControlHandler);
