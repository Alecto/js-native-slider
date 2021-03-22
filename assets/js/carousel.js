/* eslint-disable max-classes-per-file,no-underscore-dangle,no-unused-vars,class-methods-use-this,object-property-newline */
/*
 * @description
 *          Script creates a slide-show for structure .carousel>.slides>.slide[style=background-image:url()].
 * @author  Andrii.A.Fomenko
 * @revised 2021-01-12
 */

/* carousel Class */
class Carousel {
  constructor(p) {
    let settings = (() => ({...{containerID: '#carousel', interval: 5000, isPlaying: true, slideID: '.slide'}, ...p}))();
    // let settings = this._initConfig(params);

    this.container = document.querySelector(settings.containerID);
    this.slideItems = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;
  }

  /*
   *
   *_initConfig(o) {
   *
   * Вариант 1
   *
   * let settings = {
   *   containerID: '#carousel',
   *   interval: 5000,
   *   slideID: '.slide'
   * };
   *
   * if (typeof o !== 'undefined') {
   *   settings.containerID = o.containerID || settings.containerID;
   *   settings.interval = o.interval || settings.interval;
   *   settings.slideID = o.slideID || settings.slideID;
   * }
   *
   * return settings;
   *
   *
   * Вариант 2
   *
   * const p = {containerID: '#carousel', interval: 5000, slideID: '.slide'};
   *
   * return {...p, ...o};
   *
   *
   * Вариант 3
   *
   * return {...{containerID: '#carousel', interval: 5000, slideID: '.slide'}, ...o};
   *
   * }
   *
   */

  /* private, _initProps - initialization properties */
  _initProps() {
    this.slidesCount = this.slideItems.length;
    this.currentSlide = 0;

    this.KEY_SPACE = ' ';
    this.KEY_LEFT_ARROW = 'ArrowLeft';
    this.KEY_RIGHT_ARROW = 'ArrowRight';
    this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="far fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  }

  /* private, _initControls - dynamic creation of controls */
  _initControls() {
    let controls = document.createElement('div');
    const PAUSE = `<span id="pause-btn" class="control-pause">${this.isPlaying ? this.FA_PAUSE : this.FA_PLAY}</span>`;
    const PREV = `<span id="prev-btn" class="control-prev">${this.FA_PREV}</span>`;
    const NEXT = `<span id="next-btn" class="control-next">${this.FA_NEXT}</span>`;

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.nextBtn = this.container.querySelector('#next-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
  }

  /* private, _initIndicators - dynamic creation of indicators */
  _initIndicators() {
    let indicators = document.createElement('ol');

    indicators.setAttribute('class', 'indicators');

    for (let i = 0, n = this.slidesCount; i < n; i++) {
      let indicator = document.createElement('li');

      indicator.setAttribute('class', 'indicator');
      indicator.dataset.slideTo = `${i}`;
      i === 0 && indicator.classList.add('active');
      indicators.append(indicator);
    }
    this.container.append(indicators);

    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicatorItems = this.container.querySelectorAll('.indicator');
  }

  /* private, _addElemListener - adding events to the elements */
  _initListeners() {
    document.addEventListener('keydown', this._keyPress.bind(this));
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    this.container.addEventListener('mouseenter', this._pause.bind(this));
    this.container.addEventListener('mouseleave', this._play.bind(this));
  }

  /* private, _gotoNth function */
  _gotoNth(n) {
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.slidesCount) % this.slidesCount;
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
  }

  /* private, _gotoNext function */
  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  }

  /* private, _gotoNext function */
  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  }

  /* private, _pause function */
  _pause() {
    if (this.isPlaying) {
      this.pauseBtn.innerHTML = this.FA_PLAY;
      this.isPlaying = !this.isPlaying;
      clearInterval(this.timerID);
    }
  }

  /* private, _play function */
  _play() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = !this.isPlaying;
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }

  /* private,  _indicate function */
  _indicate(e) {
    let target = e.target;

    if (target && target.matches('li.indicator')) {
      this._pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  }

  /* private, _keyPress function */
  _keyPress(e) {
    if (e.key === this.KEY_LEFT_ARROW) this.prev();
    if (e.key === this.KEY_RIGHT_ARROW) this.next();
    if (e.key === this.KEY_SPACE) this.pausePlay();
  }

  /* public, pausePlay function */
  pausePlay() {
    this.isPlaying ? this._pause() : this._play();
  }

  /* public, next function */
  next() {
    this._pause();
    this._gotoNext();
  }

  /* public, prev function */
  prev() {
    this._pause();
    this._gotoPrev();
  }

  /* public, init carousel function */
  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    console.log(this.isPlaying);
    if (this.isPlaying) this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }
}

class SwipeCarousel extends Carousel {

  /*
   * в данном случае переопределение конструктора не требуется
   *
   * constructor(...args) {
   *   super(...args);
   *   В ES6 ключевое слово extends позволяет классу-потомку
   *   наследовать от родительского класса.
   *   Важно отметить, что конструктор класса-потомка
   *   должен вызывать super().
   * }
   */

  _initListeners() {
    super._initListeners(); // в классе-потомке можно вызвать метод родительского класса с помощью super.имяМетодаРодителя().
    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeEnd.bind(this));
  }

  /* private, _swipeStart function */
  _swipeStart(e) {
    this.swipeStartX = e.changedTouches[0].pageX;
  }

  /* private, _swipeEnd function */
  _swipeEnd(e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    this.swipeStartX - this.swipeEndX > 100 && this.next();
    this.swipeStartX - this.swipeEndX < -100 && this.prev();
  }
}
