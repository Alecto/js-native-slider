/*!
 @description
  Creates a slide-show for structure .carousel>.slides>.slide[style=background-image:url()].
 @author  Andrii.A.Fomenko
 @revised	2018-02-06
 */

/* Carousel object */
function Carousel(containerID) {
  this.container = document.querySelector(containerID);
  this.slideItems = this.container.querySelectorAll('.slide');

  this.slidesCount = this.slideItems.length;
  this.currentSlide = 0;
  this.carouselInterval = 2000;
  this.playbackStatus = true;
  this.intervalID = null;

  this.SPACE = ' ';
  this.LEFT_ARROW = 'ArrowLeft';
  this.RIGHT_ARROW = 'ArrowRight';
  this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
  this.FA_PLAY = '<i class="far fa-play-circle"></i>';

  this.swipeStartX = null;
  this.swipeEndX = null;
}

/* gotoNSlide */
Carousel.prototype.gotoNSlide = function (n) {
  this.slideItems[this.currentSlide].classList.toggle('active');
  this.indItems[this.currentSlide].classList.toggle('active');
  this.currentSlide = (n + this.slidesCount) % this.slidesCount;
  this.slideItems[this.currentSlide].classList.toggle('active');
  this.indItems[this.currentSlide].classList.toggle('active');
};

/* gotoNextSlide */
Carousel.prototype.gotoNextSlide = function () {
  this.gotoNSlide(this.currentSlide + 1);
};

/* gotoNextSlide */
Carousel.prototype.gotoPrevSlide = function () {
  this.gotoNSlide(this.currentSlide - 1);
};

/* pauseSlideShow */
Carousel.prototype.pauseSlideShow = function () {
  if (this.playbackStatus) {
    this.pausePlayBtn.innerHTML = this.FA_PLAY;
    this.playbackStatus = !this.playbackStatus;
    clearInterval(this.intervalID);
  }
};

/* playSlideShow */
Carousel.prototype.playSlideShow = function () {
  this.pausePlayBtn.innerHTML = this.FA_PAUSE;
  this.playbackStatus = !this.playbackStatus;

  let self = this;

  this.intervalID = setInterval(function () {
    self.gotoNextSlide();
  }, this.carouselInterval);
};

/* clickPausePlayBtn */
Carousel.prototype.clickPausePlayBtn = function () {
  this.playbackStatus ? this.pauseSlideShow() : this.playSlideShow();
};

/* clickNextBtn */
Carousel.prototype.clickNextBtn = function () {
  this.pauseSlideShow();
  this.gotoNextSlide();
};

/* clickPrevBtn */
Carousel.prototype.clickPrevBtn = function () {
  this.pauseSlideShow();
  this.gotoPrevSlide();
};

/* clickIndicatorBtn */
Carousel.prototype.clickIndicatorBtn = function (e) {
  let target = e.target;

  if (target.classList.contains('indicator')) {
    this.pauseSlideShow();
    this.gotoNSlide(+target.getAttribute('data-slide-to'));
  }
};

/* pressKeyControl */
Carousel.prototype.pressKeyControl = function (e) {
  if (e.key === this.LEFT_ARROW) this.clickPrevBtn();
  if (e.key === this.RIGHT_ARROW) this.clickNextBtn();
  if (e.key === this.SPACE) this.clickPausePlayBtn();
};

/* swipeStart */
Carousel.prototype.swipeStart = function (e) {
  this.swipeStartX = e.changedTouches[0].pageX;
};

/* swipeEnd */
Carousel.prototype.swipeEnd = function (e) {
  this.swipeEndX = e.changedTouches[0].pageX;
  this.swipeStartX - this.swipeEndX >  100 && this.clickPrevBtn();
  this.swipeStartX - this.swipeEndX < -100 && this.clickNextBtn();
};

/* createIndicators - dynamic creation of indicators */
Carousel.prototype.createIndicators = function () {
  let indicators = document.createElement('ol');

  indicators.setAttribute('class', 'indicators');

  for (let i = 0, n = this.slidesCount; i < n; i++ ) {
    let indicator = document.createElement('li');

    indicator.setAttribute('class', 'indicator');
    indicator.setAttribute('data-slide-to', '' + i);
    i === 0 && indicator.classList.add('active');

    indicators.appendChild(indicator);
  }
  this.container.appendChild(indicators);

  this.indContainer = this.container.querySelector('.indicators');
  this.indItems = this.container.querySelectorAll('.indicator');
};

/* createControls - dynamic creation of controls */
Carousel.prototype.createControls = function () {
  let controls = document.createElement('div');
  const pause = '<span id="pause-play-btn" class="control-pause"><i class="far fa-pause-circle"></i></span>';
  const prev = '<span id="prev-btn" class="control-prev"><i class="fas fa-angle-left"></i></span>';
  const next = '<span id="next-btn" class="control-next"><i class="fas fa-angle-right"></i></span>';

  controls.setAttribute('class', 'controls');
  controls.innerHTML = pause + prev + next;

  this.container.appendChild(controls);

  this.pausePlayBtn = document.querySelector('#pause-play-btn');
  this.nextBtn = document.querySelector('#next-btn');
  this.prevBtn = document.querySelector('#prev-btn');
};

Carousel.prototype.elemListener = function () {
  document.addEventListener('keydown', this.pressKeyControl.bind((this)));
  this.pausePlayBtn.addEventListener('click', this.clickPausePlayBtn.bind((this)));
  this.nextBtn.addEventListener('click', this.clickNextBtn.bind((this)));
  this.prevBtn.addEventListener('click', this.clickPrevBtn.bind((this)));
  this.indContainer.addEventListener('click', this.clickIndicatorBtn.bind((this)));
  this.container.addEventListener('touchstart', this.swipeStart.bind((this)));
  this.container.addEventListener('touchend', this.swipeEnd.bind((this)));
};

/* init carousel */
Carousel.prototype.init = function () {
  this.createIndicators();
  this.createControls();

  let self = this;

  this.intervalID = setInterval(function () {
    self.gotoNextSlide();
  }, this.carouselInterval);

  this.elemListener();
};

carousel = new Carousel('.carousel');
