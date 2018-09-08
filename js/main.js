
var slides = document.querySelectorAll('.slides__item');
var indContainer = document.querySelector('.indicators');
var indicators = document.querySelectorAll('.indicators__item');

var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var SPACE = 32;

// activate controls, if javascript is enabled
indContainer.style.display = 'flex'; // flex
document.querySelector('.controls').style.display = 'block'; // block

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
  pauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // fa-pause
  playing = false;
  clearInterval(slideInterval);
};

var playSlideShow = function () {
  pauseButton.innerHTML = '<i class="fas fa-play"></i>'; // fa-play
  playing = true;
  slideInterval = setInterval(nextSlide,2000);
};

var slideInterval = setInterval(nextSlide, 2000);

// controls and indicators
var playing = true;
var pauseButton = document.querySelector('#pause');
var nextButton = document.querySelector('#next');
var previousButton = document.querySelector('#previous');

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

// используем делегирование для оптимизации обработчика событий
indContainer.addEventListener('click', function (e) {
  var target = e.target;

  if ( target.classList.contains('indicators__item') ) {
    var n = target.getAttribute('data-slide-to') - 1;
    pauseSlideShow();
    gotoSlide(n);
  }
});

// клавиатурное управление
var keyControlHandler = function (e) {
  if (e.keyCode === LEFT_ARROW) { previousClickHandler(); }
  if (e.keyCode === RIGHT_ARROW) { nextClickHandler(); }
  if (e.keyCode === SPACE) { pauseClickHandler(); }
};

document.addEventListener('keydown', keyControlHandler);
