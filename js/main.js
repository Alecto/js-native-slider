
var controls = document.querySelectorAll('.controls');
var slides = document.querySelectorAll('.slides__item');
var indicators = document.querySelectorAll('.indicators__item');

// carousel basic engine
var currentSlide = 0;


var gotoSlide = function (n) {
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
  currentSlide = (n+slides.length)%slides.length;
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
};

var nextSlide = function () {
  gotoSlide(currentSlide+1);
};

var previousSlide = function () {
  gotoSlide(currentSlide-1);
};

var pauseSlideShow = function () {
  pauseButton.innerHTML = '&#9658;'; // play character
  playing = false;
  clearInterval(slideInterval);
};

var playSlideShow = function () {
  pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
  playing = true;
  slideInterval = setInterval(nextSlide,2000);
};

var slideInterval = setInterval(nextSlide, 2000);

// controls and indicators
var playing = true;
var pauseButton = document.getElementById('pause');
var nextButton = document.getElementById('next');
var previousButton = document.getElementById('previous');

var pauseClickHandler = function () {
  if (playing) {
    pauseSlideShow();
  } else {
    playSlideShow();
  }
};

var nextClickHandler = function () {
  pauseSlideShow();
  nextSlide();
};

var previousClickHandler = function () {
  pauseSlideShow();
  previousSlide();
};

pauseButton.addEventListener('click', pauseClickHandler);
nextButton.addEventListener('click', nextClickHandler);
previousButton.addEventListener('click', previousClickHandler);

var indicatorClickHandler = function () {
  var n = this.getAttribute('data-slide-to') - 1;
  pauseSlideShow();
  gotoSlide(n);
};


for(var i = indicators.length; i--;) {
  indicators[i].addEventListener('click', indicatorClickHandler);
}
