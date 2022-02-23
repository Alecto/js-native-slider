/* eslint-disable prefer-rest-params,sort-keys,prefer-reflect,no-underscore-dangle,max-statements */
/*
 * @description
 *          Script creates a slide-show for structure .carousel>.slides>.slide[style=background-image:url()].
 * @author  Andrii.A.Fomenko
 * @revised 2020-09-23
 */

/* super Class: Carousel */
function Carousel(containerID = '#carousel', slideID = '.slide') {
  this.container = document.querySelector(containerID);
  this.slideItems = this.container.querySelectorAll(slideID);

  this.interval = 2000;
}

Carousel.prototype = {

  /* private, _initProps */
  _initProps: function () {
    this.currentSlide = 0;
    this.isPlaying = true;

    this.SLIDES_COUNT = this.slideItems.length;
    this.CODE_SPACE = 'Space';
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  },

  /* private, _initControls - dynamic creation of controls */
  _initControls: function () {
    const controls = document.createElement('div');
    const PAUSE = `<span id="pause-btn" class="control-pause">${this.FA_PAUSE}</span>`;
    const PREV = `<span id="prev-btn" class="control-prev">${this.FA_PREV}</span>`;
    const NEXT = `<span id="next-btn" class="control-next">${this.FA_NEXT}</span>`;

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.nextBtn = this.container.querySelector('#next-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
  },

  /* private, _initIndicators - dynamic creation of indicators */
  _initIndicators: function () {
    const indicators = document.createElement('div');

    indicators.setAttribute('class', 'indicators');

    for (let i = 0, n = this.SLIDES_COUNT; i < n; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
      indicator.dataset.slideTo = `${i}`;
      indicators.append(indicator);
    }

    this.container.append(indicators);

    this.indContainer = this.container.querySelector('.indicators');
    this.indItems = this.container.querySelectorAll('.indicator');
  },

  /* private, _initListeners - set events to the elements */
  _initListeners: function () {
    document.addEventListener('keydown', this._pressKey.bind(this));
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.indContainer.addEventListener('click', this._indicate.bind(this));
  },

  /* private, _gotoNth */
  _gotoNth: function (n) {
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
  },

  /* private, _gotoNext */
  _gotoPrev: function () {
    this._gotoNth(this.currentSlide - 1);
  },

  /* private, _gotoNext */
  _gotoNext: function () {
    this._gotoNth(this.currentSlide + 1);
  },

  /* private, _pause */
  _pause: function () {
    if (this.isPlaying) {
      this.pauseBtn.innerHTML = this.FA_PLAY;
      this.isPlaying = !this.isPlaying;
      clearInterval(this.timerID);
    }
  },

  /* private, _play */
  _play: function () {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = !this.isPlaying;
    this._tick();
  },

  /* private, _indicate */
  _indicate: function (e) {
    let target = e.target;

    if (target && target.classList.contains('indicator')) {
      this._pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  },

  /* private, _pressKey */
  _pressKey: function (e) {
    if (e.key === this.CODE_LEFT_ARROW) this.prev();
    if (e.key === this.CODE_RIGHT_ARROW) this.next();
    if (e.key === this.CODE_SPACE) this.pausePlay();
  },

  /* private, _tick */
  _tick() {
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  },

  /* public, pausePlay */
  pausePlay: function () {
    this.isPlaying ? this._pause() : this._play();
  },

  /* public, next */
  next: function () {
    this._pause();
    this._gotoNext();
  },

  /* public, prev */
  prev: function () {
    this._pause();
    this._gotoPrev();
  },

  /* public, init carousel */
  init: function () {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick();
  }
};

Carousel.prototype.constructor = Carousel;
