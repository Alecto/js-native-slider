function Carousel() {}

Carousel.prototype = {
  _initProps() {
    this.container = document.querySelector('#carousel')
    this.slidesContainer = this.container.querySelector('#slides-container')
    this.slides = this.slidesContainer.querySelectorAll('.slide')

    this.CODE_SPACE = 'Space'
    this.CODE_ARROW_LEFT = 'ArrowLeft'
    this.CODE_ARROW_RIGHT = 'ArrowRight'
    this.SLIDES_COUNT = this.slides.length
    this.TIMER_INTERVAL = 2000

    this.currentSlide = 0
    this.isPaused = true
    this.timerId = null
    this.swipeStartX = null
    this.swipeEndX = null
  },

  _initControls() {
    const controlsContainer = document.createElement('div')
    controlsContainer.setAttribute('id', 'controls-container')
    controlsContainer.classList.add('controls')

    const PAUSE_BTN = '<div id="pause-btn" class="control control-pause">Pause</div>'
    const PREV_BTN = '<div id="prev-btn" class="control control-prev">Prev</div>'
    const NEXT_BTN = '<div id="next-btn" class="control control-next">Next</div>'
    controlsContainer.innerHTML = PAUSE_BTN + PREV_BTN + NEXT_BTN

    this.container.append(controlsContainer)

    this.pauseBtn = this.container.querySelector('#pause-btn')
    this.prevBtn = this.container.querySelector('#prev-btn')
    this.nextBtn = this.container.querySelector('#next-btn')
  },

  _initIndicators() {
    const indicatorsContainer = document.createElement('div')
    indicatorsContainer.setAttribute('id', 'indicators-container')
    indicatorsContainer.classList.add('indicators')

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div')
      indicator.setAttribute('class', i ? 'indicator' : 'indicator active')
      indicator.dataset.slideTo = `${i}`
      indicatorsContainer.append(indicator)
    }

    this.container.append(indicatorsContainer)

    this.indicatorsContainer = this.container.querySelector('#indicators-container')
    this.indicators = this.indicatorsContainer.querySelectorAll('.indicator')
  },

  _initEventListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlayHandler.bind(this))
    this.prevBtn.addEventListener('click', this.prevHandler.bind(this))
    this.nextBtn.addEventListener('click', this.nextHandler.bind(this))
    this.indicatorsContainer.addEventListener('click', this.indicatorClickHandler.bind(this))
    document.addEventListener('keydown', this._keydownHandler.bind(this))
  },

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active')
    this.indicators[this.currentSlide].classList.toggle('active')
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT
    this.slides[this.currentSlide].classList.toggle('active')
    this.indicators[this.currentSlide].classList.toggle('active')
  },

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1)
  },

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1)
  },

  _tick() {
    this.timerId = setInterval(() => this._gotoNext(), this.TIMER_INTERVAL)
  },

  _keydownHandler(e) {
    if (e.code === this.CODE_SPACE) {
      e.preventDefault()
      this.pausePlayHandler()
    }
    if (e.code === this.CODE_ARROW_LEFT) this.prevHandler()
    if (e.code === this.CODE_ARROW_RIGHT) this.nextHandler()
  },

  playHandler() {
    this.pauseBtn.textContent = 'Pause'
    this.isPaused = true
    this._tick()
  },

  pauseHandler() {
    if (!this.isPaused) return
    this.pauseBtn.textContent = 'Play'
    this.isPaused = false
    clearInterval(this.timerId)
  },

  pausePlayHandler() {
    this.isPaused ? this.pauseHandler() : this.playHandler()
  },

  prevHandler() {
    this.pauseHandler()
    this._gotoPrev()
  },

  nextHandler() {
    this.pauseHandler()
    this._gotoNext()
  },

  indicatorClickHandler(e) {
    const target = e.target
    if (target.classList.contains('indicator')) {
      this.pauseHandler()
      this._gotoNth(+target.dataset.slideTo)
    }
  },

  init() {
    this._initProps()
    this._initControls()
    this._initIndicators()
    this._initEventListeners()
    this._tick()
  }
}

Carousel.prototype.constructor = Carousel

function SwipeCarousel() {
  Carousel.apply(this)
}

SwipeCarousel.prototype = Object.create(Carousel.prototype)
SwipeCarousel.prototype.constructor = SwipeCarousel

SwipeCarousel.prototype._initEventListeners = function () {
  Carousel.prototype._initEventListeners.apply(this)
  this.slidesContainer.addEventListener('touchstart', this._swipeStartHandler.bind(this), { passive: true })
  this.slidesContainer.addEventListener('mousedown', this._swipeStartHandler.bind(this))
  this.slidesContainer.addEventListener('touchend', this._swipeEndHandler.bind(this))
  this.slidesContainer.addEventListener('mouseup', this._swipeEndHandler.bind(this))
}

SwipeCarousel.prototype._swipeStartHandler = function (e) {
  this.swipeStartX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
}

SwipeCarousel.prototype._swipeEndHandler = function (e) {
  this.swipeEndX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX

  if (this.swipeEndX - this.swipeStartX > 100) this.prevHandler()
  if (this.swipeEndX - this.swipeStartX < -100) this.nextHandler()
}

const carousel = new SwipeCarousel()

console.log(carousel)

carousel.init()
