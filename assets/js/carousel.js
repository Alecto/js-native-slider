/*
 * @description
 *          Script creates a slide-show for structure .carousel>.slides>.slide[style=background-image:url()].
 * @author  Andrii.A.Fomenko
 * @revised 2018-02-06
 */

/* carousel object */
function Carousel(containerID = '#carousel', slideID = '.slide') {
  this.container = document.querySelector(containerID);
  this.slideItems = this.container.querySelectorAll(slideID);

  this.interval = 2000;

  this._initProps();
  this._initControls();
  this._initIndicators();
  this._setListeners();
}

/* _initProps */
Carousel.prototype._initProps = function () {
  this.slidesCount = this.slideItems.length;
  this.currentSlide = 0;
  this.isPlaying = true;

  this.KEY_SPACE = ' ';
  this.KEY_LEFT_ARROW = 'ArrowLeft';
  this.KEY_RIGHT_ARROW = 'ArrowRight';
  this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
  this.FA_PLAY = '<i class="far fa-play-circle"></i>';
  this.FA_PREV = '<i class="fas fa-angle-left"></i>';
  this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
};

/* _initControls - dynamic creation of controls */
Carousel.prototype._initControls = function () {
  let controls = document.createElement('div');
  const PAUSE = `<span id="pause-btn" class="control-pause">${this.FA_PAUSE}</span>`;
  const PREV = `<span id="prev-btn" class="control-prev">${this.FA_PREV}</span>`;
  const NEXT = `<span id="next-btn" class="control-next">${this.FA_NEXT}</span>`;

  controls.setAttribute('class', 'controls');
  controls.innerHTML = PAUSE + PREV + NEXT;

  this.container.appendChild(controls);

  this.pauseBtn = document.querySelector('#pause-btn');
  this.nextBtn = document.querySelector('#next-btn');
  this.prevBtn = document.querySelector('#prev-btn');
};

/* _initIndicators - dynamic creation of indicators */
Carousel.prototype._initIndicators = function () {
  let generate = () => {
    let indicators = document.createElement('ol');

    indicators.setAttribute('class', 'indicators');

    for (let i = 0, n = this.slidesCount; i < n; i++) {
      let indicator = document.createElement('li');

      indicator.setAttribute('class', 'indicator');
      indicator.setAttribute('data-slide-to', `${i}`);
      i === 0 && indicator.classList.add('active');
      indicators.appendChild(indicator);
    }

    return indicators;
  };

  this.container.appendChild(generate());

  this.indContainer = this.container.querySelector('.indicators');
  this.indItems = this.container.querySelectorAll('.indicator');
};

/* _setListeners - adding events to the elements */
Carousel.prototype._setListeners = function () {
  document.addEventListener('keydown', this._pressKey.bind(this));
  this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
  this.nextBtn.addEventListener('click', this.next.bind(this));
  this.prevBtn.addEventListener('click', this.prev.bind(this));
  this.indContainer.addEventListener('click', this._indicate.bind(this));
  this.container.addEventListener('touchstart', this._swipeStart.bind(this));
  this.container.addEventListener('touchend', this._swipeEnd.bind(this));
};

/* _gotoNth */
Carousel.prototype._gotoNth = function (n) {
  this.slideItems[this.currentSlide].classList.toggle('active');
  this.indItems[this.currentSlide].classList.toggle('active');
  this.currentSlide = (n + this.slidesCount) % this.slidesCount;
  this.slideItems[this.currentSlide].classList.toggle('active');
  this.indItems[this.currentSlide].classList.toggle('active');
};

/* _gotoNext */
Carousel.prototype._gotoNext = function () {
  this._gotoNth(this.currentSlide + 1);
};

/* _gotoNext */
Carousel.prototype._gotoPrev = function () {
  this._gotoNth(this.currentSlide - 1);
};

/* _pause */
Carousel.prototype._pause = function () {
  if (this.isPlaying) {
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlaying = !this.isPlaying;
    clearInterval(this.timerID);
  }
};

/* _play */
Carousel.prototype._play = function () {
  this.pauseBtn.innerHTML = this.FA_PAUSE;
  this.isPlaying = !this.isPlaying;

  let that = this;

  this.timerID = setInterval(() => {
    that._gotoNext();
  }, this.interval);
};

/* _indicate */
Carousel.prototype._indicate = function (e) {
  let target = e.target;

  if (target.classList.contains('indicator')) {
    this._pause();
    this._gotoNth(+target.getAttribute('data-slide-to'));
  }
};

/* _pressKey */
Carousel.prototype._pressKey = function (e) {
  if (e.key === this.KEY_LEFT_ARROW) this.prev();
  if (e.key === this.KEY_RIGHT_ARROW) this.next();
  if (e.key === this.KEY_SPACE) this.pausePlay();
};

/* _swipeStart */
Carousel.prototype._swipeStart = function (e) {
  this.swipeStartX = e.changedTouches[0].pageX;
};

/* _swipeEnd */
Carousel.prototype._swipeEnd = function (e) {
  this.swipeEndX = e.changedTouches[0].pageX;
  this.swipeStartX - this.swipeEndX > 100 && this.next();
  this.swipeStartX - this.swipeEndX < -100 && this.prev();
};

/* pausePlay */
Carousel.prototype.pausePlay = function () {
  this.isPlaying ? this._pause() : this._play();
};

/* next */
Carousel.prototype.next = function () {
  this._pause();
  this._gotoNext();
};

/* prev */
Carousel.prototype.prev = function () {
  this._pause();
  this._gotoPrev();
};

/* init carousel */
Carousel.prototype.init = function () {
  let that = this;

  this.timerID = setInterval(() => {
    that._gotoNext();
  }, this.interval);
};
