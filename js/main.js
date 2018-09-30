'use strict';

var $slides        = $('.slides__item');
var $indContainer  = $('.indicators');
var $indItems      = $('.indicators__item');
var currentSlide  = 0;

const LEFT_ARROW  = 37;
const RIGHT_ARROW = 39;
const SPACE       = 32;
const FA_PAUSE    = '<i class="fas fa-pause"></i>';
const FA_PLAY     = '<i class="fas fa-play"></i>';

// activate controls, if javascript is enabled
$indContainer.css('display', 'flex'); // flex
$('.controls').css('display', 'block'); // block

// carousel basic engine
var gotoSlide = function (n) {
  $($slides[currentSlide]).toggleClass('active');
  $($indItems[currentSlide]).toggleClass('active');
  currentSlide = (n + $slides.length) % $slides.length;
  $($slides[currentSlide]).toggleClass('active');
  $($indItems[currentSlide]).toggleClass('active');
};

var nextSlide = function () {
  gotoSlide(currentSlide + 1);
};

var previousSlide = function () {
  gotoSlide(currentSlide - 1);
};

var pauseSlideShow = function () {
  $pauseBtn.html(FA_PAUSE);
  playbackStatus = false;
  clearInterval(slideInterval);
};

var playSlideShow = function () {
  $pauseBtn.html(FA_PLAY);
  playbackStatus = true;
  slideInterval = setInterval(nextSlide, 2000);
};

var slideInterval = setInterval(nextSlide, 2000);

// controls
var playbackStatus = true;
var $pauseBtn = $('.indicators__pause');
var $nextBtn  = $('.controls__next');
var $prevBtn  = $('.controls__prev');

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

$pauseBtn.on('click', pauseClickHandler);
$nextBtn.on('click', nextClickHandler);
$prevBtn.on('click', prevClickHandler);

// indicators
var indClickHandler = function (e) {
  let n = $(this).attr('data-slide-to') - 1;
  pauseSlideShow();
  gotoSlide(n);
};

// use delegation to optimize the event handler
$indContainer.on('click', '.indicators__item', indClickHandler);

// set keyboard controls
var keyControlHandler = function (e) {
  if (e.keyCode === LEFT_ARROW) { prevClickHandler(); }
  if (e.keyCode === RIGHT_ARROW) { nextClickHandler(); }
  if (e.keyCode === SPACE) { pauseClickHandler(); }
};

$(document).on('keydown', keyControlHandler);
