(function (time) {
  const container = document.querySelector('#carousel');
  const slides = container.querySelectorAll('.slide');
  const indicatorsContainer = container.querySelector('#indicators-container');
  const indicatorItems = indicatorsContainer.querySelectorAll('.indicator');
  const controlsContainer = container.querySelector('#controls-container');
  const pauseBtn = controlsContainer.querySelector('#pause-btn');
  const nextBtn = controlsContainer.querySelector('#next-btn');
  const prevBtn = controlsContainer.querySelector('#prev-btn');

  const SLIDES_COUNT = slides.length;
  const CODE_ARROW_LEFT = 'ArrowLeft';
  const CODE_ARROW_RIGHT = 'ArrowRight';
  const CODE_SPACE = 'Space';
  const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
  const FA_PLAY = '<i class="far fa-play-circle"></i>';

  let currentSlide = 0;
  let isPlaying = true;
  let timerID = null;
  let startPosX = null;
  let endPosX = null;
  let interval = time;

  // carousel basic engine
  const gotoNth = (n) => {
    slides[currentSlide].classList.toggle('active');
    indicatorItems[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
    slides[currentSlide].classList.toggle('active');
    indicatorItems[currentSlide].classList.toggle('active');
  };

  const gotoPrev = () => gotoNth(currentSlide - 1);

  const gotoNext = () => gotoNth(currentSlide + 1);

  // tick -> setInterval
  function tick() {
    timerID = setInterval(gotoNext, interval);
  }

  // controls
  const pauseHandler = () => {
    if (isPlaying) {
      pauseBtn.innerHTML = FA_PLAY;
      isPlaying = !isPlaying;
      clearInterval(timerID);
    }
  };

  const playHandler = () => {
    pauseBtn.innerHTML = FA_PAUSE;
    isPlaying = !isPlaying;
    tick();
  };

  const pausePlayHandler = () => isPlaying ? pauseHandler() : playHandler();

  const prevHandler = () => {
    pauseHandler();
    gotoPrev();
  };

  const nextHandler = () => {
    pauseHandler();
    gotoNext();
  };

  // indicators
  const indicate = (e) => {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
      pauseHandler();
      gotoNth(+target.dataset.slideTo);
    }
  };

  // set keyboard controls
  const pressKey = (e) => {
    if (e.code === CODE_ARROW_LEFT) prevHandler();
    if (e.code === CODE_ARROW_RIGHT) nextHandler();
    if (e.code === CODE_SPACE) pausePlayHandler();
  };

  // add swipe support
  const swipeStart = (e) => {
    // if (e instanceof MouseEvent) {
    //   startPosX = e.pageX;
    //   return;
    // }
    //
    // if (e instanceof TouchEvent) {
    //   startPosX = e.changedTouches[0].pageX;
    // }
    startPosX = e instanceof MouseEvent
        ? e.pageX // MouseEvent
        : e.changedTouches[0].pageX; // TouchEvent
  };

  // add swipe support
  function swipeEnd(e) {
    // if (e instanceof MouseEvent) {
    //   endPosX = e.pageX;
    // } else if (e instanceof TouchEvent) {
    //   endPosX = e.changedTouches[0].pageX;
    // }
    endPosX = e instanceof MouseEvent
        ? e.pageX // MouseEvent
        : e.changedTouches[0].pageX; // TouchEvent

    if (endPosX - startPosX > 100) prevHandler();
    if (endPosX - startPosX < -100) nextHandler();
  }

  // listeners activation
  const initListeners = () => {
    pauseBtn.addEventListener('click', pausePlayHandler);
    nextBtn.addEventListener('click', nextHandler);
    prevBtn.addEventListener('click', prevHandler);
    indicatorsContainer.addEventListener('click', indicate);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('mousedown', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    container.addEventListener('mouseup', swipeEnd);
    document.addEventListener('keydown', pressKey);
  };

  // activate controls, if javascript is enabled
  const initApp = () => {
    initListeners();
    tick();
  };

  initApp();

}(2000));
