
/* sub Class: SwipeCarousel */
function SwipeCarousel() {
  Carousel.apply(this, arguments);
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
  this.container.addEventListener('touchstart', this._swipeStart.bind(this));
  this.container.addEventListener('touchend', this._swipeEnd.bind(this));
};

/* private, _swipeStart */
SwipeCarousel.prototype._swipeStart = function (e) {
  this.swipeStartX = e.changedTouches[0].pageX;
};

/* private, _swipeEnd */
SwipeCarousel.prototype._swipeEnd = function (e) {
  this.swipeEndX = e.changedTouches[0].pageX;
  this.swipeStartX - this.swipeEndX > 100 && this.next();
  this.swipeStartX - this.swipeEndX < -100 && this.prev();
};
