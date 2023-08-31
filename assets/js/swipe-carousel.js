
/* sub Class: SwipeCarousel */
function SwipeCarousel() {
  Carousel.apply(this, arguments);
  this.slidesContainer = this.container.querySelector('.slides');
}

/*
 * let superClass = Object.create(Carousel.prototype);
 * let subClass = { method1: function() {console.log('method1')}, method2: function() {console.log('method2')} };
 * SwipeCarousel.prototype = Object.assign(superClass, subClass);
 */

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

/* private, _initListeners - set events to the elements */
SwipeCarousel.prototype._initListeners = function () {
  Carousel.prototype._initListeners.apply(this);
  this.slidesContainer.addEventListener('touchstart', this._swipeStart.bind(this));
  this.slidesContainer.addEventListener('mousedown', this._swipeStart.bind(this));
  this.slidesContainer.addEventListener('touchend', this._swipeEnd.bind(this));
  this.slidesContainer.addEventListener('mouseup', this._swipeEnd.bind(this));
};

/* private, _swipeStart */
SwipeCarousel.prototype._swipeStart = function (e) {
  this.startPosX = e instanceof MouseEvent
      ? e.pageX
      : e.changedTouches[0].pageX;
};

/* private, _swipeEnd */
SwipeCarousel.prototype._swipeEnd = function (e) {
  this.endPosX = e instanceof MouseEvent
      ? e.pageX
      : e.changedTouches[0].pageX;

  if (this.endPosX - this.startPosX > 100) this.prev();
  if (this.endPosX - this.startPosX < -100) this.next();
};