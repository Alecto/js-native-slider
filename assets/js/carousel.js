/*
 * @description
 *          Creates a slide-show for structure .carousel>.slides>.slide[style=background-image:url()].
 * @author  Andrii.A.Fomenko
 * @revised 2018-02-06
 */

/* carousel object */
function Carousel(containerID = '.carousel', slideID = '.slide') {
  this.container = document.querySelector(containerID);
  this.slideItems = this.container.querySelectorAll(slideID);

  this.interval = 2000;

  this.initConst();
  this.initVar();
  this.initControl();
  this.initIndicator();
  this.addElemListener();
}

/* initConst */
Carousel.prototype.initConst = function () {
  this.C_SPACE = ' ';
  this.C_LEFT_ARROW = 'ArrowLeft';
  this.C_RIGHT_ARROW = 'ArrowRight';
  this.C_FA_PAUSE = '<i class="far fa-pause-circle"></i>';
  this.C_FA_PLAY = '<i class="far fa-play-circle"></i>';
};

/* initConst */
Carousel.prototype.initVar = function () {
  this.slidesCount = this.slideItems.length;
  this.currentSlide = 0;
  this.playbackStatus = true;
};

/* initControl - dynamic creation of controls */
Carousel.prototype.initControl = function () {
  let controls = document.createElement('div');
  const pause =
    '<span id="pause-btn" class="control-pause"><i class="far fa-pause-circle"></i></span>';
  const prev =
    '<span id="prev-btn" class="control-prev"><i class="fas fa-angle-left"></i></span>';
  const next =
    '<span id="next-btn" class="control-next"><i class="fas fa-angle-right"></i></span>';

  controls.setAttribute('class', 'controls');
  controls.innerHTML = pause + prev + next;

  this.container.appendChild(controls);

  this.pauseBtn = document.querySelector('#pause-btn');
  this.nextBtn = document.querySelector('#next-btn');
  this.prevBtn = document.querySelector('#prev-btn');
};

/* initIndicator - dynamic creation of indicators */
Carousel.prototype.initIndicator = function () {
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

/* addElemListener - adding events to the elements */
Carousel.prototype.addElemListener = function () {
  document.addEventListener('keydown', this.keyPress.bind(this));
  this.pauseBtn.addEventListener('click', this.clickPause.bind(this));
  this.nextBtn.addEventListener('click', this.clickNext.bind(this));
  this.prevBtn.addEventListener('click', this.clickPrev.bind(this));
  this.indContainer.addEventListener('click', this.clickIndicator.bind(this));
  this.container.addEventListener('touchstart', this.swipeStart.bind(this));
  this.container.addEventListener('touchend', this.swipeEnd.bind(this));
};

/* gotoNth */
Carousel.prototype.gotoNth = function (n) {
  this.slideItems[this.currentSlide].classList.toggle('active');
  this.indItems[this.currentSlide].classList.toggle('active');
  this.currentSlide = (n + this.slidesCount) % this.slidesCount;
  this.slideItems[this.currentSlide].classList.toggle('active');
  this.indItems[this.currentSlide].classList.toggle('active');
};

/* gotoNext */
Carousel.prototype.gotoNext = function () {
  this.gotoNth(this.currentSlide + 1);
};

/* gotoNext */
Carousel.prototype.gotoPrev = function () {
  this.gotoNth(this.currentSlide - 1);
};

/* pause */
Carousel.prototype.pause = function () {
  if (this.playbackStatus) {
    this.pauseBtn.innerHTML = this.C_FA_PLAY;
    this.playbackStatus = !this.playbackStatus;
    clearInterval(this.intervalID);
  }
};

/* play */
Carousel.prototype.play = function () {
  this.pauseBtn.innerHTML = this.C_FA_PAUSE;
  this.playbackStatus = !this.playbackStatus;

  let that = this;

  this.intervalID = setInterval(() => {
    that.gotoNext();
  }, this.interval);
};

/* clickPause */
Carousel.prototype.clickPause = function () {
  this.playbackStatus ? this.pause() : this.play();
};

/* clickNext */
Carousel.prototype.clickNext = function () {
  this.pause();
  this.gotoNext();
};

/* clickPrev */
Carousel.prototype.clickPrev = function () {
  this.pause();
  this.gotoPrev();
};

/* clickIndicator */
Carousel.prototype.clickIndicator = function (e) {
  let target = e.target;

  if (target.classList.contains('indicator')) {
    this.pause();
    this.gotoNth(+target.getAttribute('data-slide-to'));
  }
};

/* keyPress */
Carousel.prototype.keyPress = function (e) {
  if (e.key === this.C_LEFT_ARROW) this.clickPrev();
  if (e.key === this.C_RIGHT_ARROW) this.clickNext();
  if (e.key === this.C_SPACE) this.clickPause();
};

/* swipeStart */
Carousel.prototype.swipeStart = function (e) {
  this.swipeStartX = e.changedTouches[0].pageX;
};

/* swipeEnd */
Carousel.prototype.swipeEnd = function (e) {
  this.swipeEndX = e.changedTouches[0].pageX;
  this.swipeStartX - this.swipeEndX > 100 && this.clickPrev();
  this.swipeStartX - this.swipeEndX < -100 && this.clickNext();
};

/* init carousel */
Carousel.prototype.init = function () {
  let that = this;

  this.intervalID = setInterval(() => {
    that.gotoNext();
  }, this.interval);
};

let carousel = new Carousel();
