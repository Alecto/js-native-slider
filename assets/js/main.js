(function (time) {
  const container = document.querySelector('#carousel');
  const slides = container.querySelectorAll('.slide');
  const indicatorsContainer = container.querySelector('#indicators-container');
  const indicators = indicatorsContainer.querySelectorAll('.indicator');
  const controls = container.querySelector('#controls-container');
  const pauseBtn = controls.querySelector('#pause-btn');
  const nextBtn = controls.querySelector('#next-btn');
  const prevBtn = controls.querySelector('#prev-btn');

  const slidesCount = slides.length;
  const CODE_LEFT_ARROW = 'ArrowLeft';
  const CODE_RIGHT_ARROW = 'ArrowRight';
  const CODE_SPACE = 'Space';
  const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
  const FA_PLAY = '<i class="far fa-play-circle"></i>';

  let currentSlide = 0;
  let isPlaying = true;
  let timerID = null;
  let swipeStartX = null;
  let swipeEndX = null;
  let interval = time;

  // carousel basic engine
  const gotoNth = (n) => {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + slidesCount) % slidesCount;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  };

  const gotoPrev = () => gotoNth(currentSlide - 1);

  const gotoNext = () => gotoNth(currentSlide + 1);

  // controls
  const pause = () => {
    if (isPlaying) {
      pauseBtn.innerHTML = FA_PLAY;
      isPlaying = !isPlaying;
      clearInterval(timerID);
    }
  };

  const play = () => {
    pauseBtn.innerHTML = FA_PAUSE;
    isPlaying = !isPlaying;
    timerID = setInterval(gotoNext, interval);
  };

  const pausePlay = () => isPlaying ? pause() : play();

  const prev = () => {
    pause();
    gotoPrev();
  };

  const next = () => {
    pause();
    gotoNext();
  };

  // indicators
  const indicate = (e) => {
    let target = e.target;

    if (target && target.classList.contains('indicator')) {
      pause();
      gotoNth(+target.dataset.slideTo);
    }
  };

  // set keyboard controls
  const pressKey = (e) => {
    if (e.code === CODE_LEFT_ARROW) prev();
    if (e.code === CODE_RIGHT_ARROW) next();
    if (e.code === CODE_SPACE) pausePlay();
  };

  // add swipe support
  const swipeStart = (e) => swipeStartX = e.changedTouches[0].pageX;

  const swipeEnd = (e) => {
    swipeEndX = e.changedTouches[0].pageX;
    swipeStartX - swipeEndX > 100 && next();
    swipeStartX - swipeEndX < -100 && prev();
  };

  // listeners activation
  const initListeners = () => {
    pauseBtn.addEventListener('click', pausePlay);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    indicatorsContainer.addEventListener('click', indicate);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown', pressKey);
  };

  // activate controls, if javascript is enabled
  const init = () => {
    initListeners();
    timerID = setInterval(gotoNext, interval);
  };

  init();

}(2000));
