class Carousel {
  constructor(o) {
    const settings = { ...{ containerId: '#carousel', slideId: '.slide', interval: 5000, isPlaying: true }, ...o }

    this.container = document.querySelector(settings.containerId)
    this.slides = this.container.querySelectorAll(settings.slideId)
    this.TIMER_INTERVAL = settings.interval
    this.isPlaying = settings.isPlaying
  }

  _initProps() {
    this.slidesContainer = this.container.querySelector('#slides-container')

    this.SLIDES_COUNT = this.slides.length
    this.CODE_ARROW_RIGHT = 'ArrowRight'
    this.CODE_ARROW_LEFT = 'ArrowLeft'
    this.CODE_SPACE = 'Space'
    this.FA_PAUSE = '<i class="fas fa-pause"></i>'
    this.FA_PLAY = '<i class="fas fa-play"></i>'
    this.FA_PREV = '<i class="fas fa-chevron-left"></i>'
    this.FA_NEXT = '<i class="fas fa-chevron-right"></i>'
    this.SWIPE_THRESHOLD = 100

    this.currentSlide = 0
    this.isPlaying = true
    this.timerId = null
    this.swipeStartX = null
    this.swipeEndX = null
  }

  _initControls() {
    const controlsContainer = document.createElement('div')
    controlsContainer.classList.add('controls')
    controlsContainer.setAttribute('id', 'controls-container')

    const PAUSE_BTN = `<div class="control control-pause" id="pause-btn">${this.FA_PAUSE}</div>`
    const PREV_BTN = `<div class="control control-prev" id="prev-btn">${this.FA_PREV}</div>`
    const NEXT_BTN = `<div class="control control-next" id="next-btn">${this.FA_NEXT}</div>`

    controlsContainer.innerHTML = PAUSE_BTN + PREV_BTN + NEXT_BTN

    this.container.append(controlsContainer)

    this.pauseButton = this.container.querySelector('#pause-btn')
    this.nextButton = this.container.querySelector('#next-btn')
    this.prevButton = this.container.querySelector('#prev-btn')
  }

  _initIndicators() {
    const indicatorsContainer = document.createElement('div')
    indicatorsContainer.classList.add('indicators')
    indicatorsContainer.setAttribute('id', 'indicators-container')

    this.container.append(indicatorsContainer)

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div')
      indicator.setAttribute('class', i ? 'indicator' : 'indicator active')
      indicator.dataset.slideTo = `${i}`
      indicatorsContainer.append(indicator)
    }

    this.indicatorsContainer = this.container.querySelector('#indicators-container')
    this.indicators = this.container.querySelectorAll('.indicator')
  }

  _initEventListeners() {
    this.pauseButton.addEventListener('click', this.pausePlayHandler.bind(this))
    this.nextButton.addEventListener('click', this.nextHandler.bind(this))
    this.prevButton.addEventListener('click', this.prevHandler.bind(this))
    this.indicatorsContainer.addEventListener('click', this._indicatorClickHandler.bind(this))
    document.addEventListener('keydown', this._keydownHandler.bind(this))
  }

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active')
    this.indicators[this.currentSlide].classList.toggle('active')
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT
    this.slides[this.currentSlide].classList.toggle('active')
    this.indicators[this.currentSlide].classList.toggle('active')
  }

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1)
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1)
  }

  _tick() {
    this.timerId = setInterval(() => this._gotoNext(), this.TIMER_INTERVAL)
  }

  _indicatorClickHandler(e) {
    const { target } = e

    if (target && target.classList.contains('indicator')) {
      const slideTo = +target.dataset.slideTo
      this.pauseHandler()
      this._gotoNth(slideTo)
    }
  }

  _keydownHandler(e) {
    const { code } = e
    if (code === this.CODE_ARROW_RIGHT) this.nextHandler()
    if (code === this.CODE_ARROW_LEFT) this.prevHandler()
    if (code === this.CODE_SPACE) {
      e.preventDefault()
      this.pausePlayHandler()
    }
  }

  playHandler() {
    this.pauseButton.innerHTML = this.FA_PAUSE
    this.isPlaying = true
    this._tick()
  }

  pauseHandler() {
    if (!this.isPlaying) return
    this.isPlaying = false
    this.pauseButton.innerHTML = this.FA_PLAY
    clearInterval(this.timerId)
  }

  pausePlayHandler() {
    this.isPlaying ? this.pauseHandler() : this.playHandler()
  }

  prevHandler() {
    this.pauseHandler()
    this._gotoPrev()
  }

  nextHandler() {
    this.pauseHandler()
    this._gotoNext()
  }

  init() {
    this._initProps()
    this._initControls()
    this._initIndicators()
    this._initEventListeners()
    this._tick()
  }
}

class SwipeCorousel extends Carousel {
  constructor(options) {
    super(options)
  }

  _initEventListeners() {
    Carousel.prototype._initEventListeners.apply(this)
    this.slidesContainer.addEventListener('touchstart', this._swipeStartHandler.bind(this))
    this.slidesContainer.addEventListener('touchend', this._swipeEndHandler.bind(this))
    this.slidesContainer.addEventListener('mousedown', this._swipeStartHandler.bind(this))
    this.slidesContainer.addEventListener('mouseup', this._swipeEndHandler.bind(this))
  }

  _swipeStartHandler(e) {
    this.swipeStartX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
  }

  _swipeEndHandler(e) {
    this.swipeEndX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX

    const diffX = this.swipeEndX - this.swipeStartX

    if (diffX > this.SWIPE_THRESHOLD) this.prevHandler()
    if (diffX < -this.SWIPE_THRESHOLD) this.nextHandler()
  }
}

const carousel = new SwipeCorousel({
  slideId: '.item',
  interval: 1000
})

carousel.init()
