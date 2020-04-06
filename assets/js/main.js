(function(time) {
  let container = document.querySelector('#carousel');
  let slides = container.querySelectorAll('.slide');
  let indicatorsContainer = container.querySelector('#indicators-container');
  let indicators = indicatorsContainer.querySelectorAll('.indicator');
  let controls = container.querySelector('#controls-container');
  let pausePlayBtn = controls.querySelector('#pause-btn');
  let nextBtn = controls.querySelector('#next-btn');
  let prevBtn = controls.querySelector('#prev-btn');

  let currentSlide = 0;
  let slidesCount = slides.length;
  let interval = time;
  let isPlaying = true;
  let timerID = null;
  let swipeStartX = null;
  let swipeEndX = null;

  const SPACE = ' ';
  const LEFT_ARROW = 'ArrowLeft';
  const RIGHT_ARROW = 'ArrowRight';
  const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
  const FA_PLAY = '<i class="far fa-play-circle"></i>';

// carousel basic engine
  const gotoNth = (n) => {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + slidesCount) % slidesCount;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  };

  const gotoNext = () => gotoNth(currentSlide + 1);

  const gotoPrev = () => gotoNth(currentSlide - 1);

// controls
  const pause = () => {
    if (isPlaying) {
      pausePlayBtn.innerHTML = FA_PLAY;
      isPlaying = !isPlaying;
      clearInterval(timerID);
    }
  };

  const play = () => {
    pausePlayBtn.innerHTML = FA_PAUSE;
    isPlaying = !isPlaying;
    timerID = setInterval(gotoNext, interval);
  };

  const pausePlay = () => isPlaying ? pause() : play();

  const next = () => {
    pause();
    gotoNext();
  };

  const prev = () => {
    pause();
    gotoPrev();
  };

// indicators
  const indicate = (e) => {
    let target = e.target;

    if (target.classList.contains('indicator')) {
      pause();
      gotoNth(+target.getAttribute('data-slide-to'));
    }
  };

// set keyboard controls
  const pressKey = (e) => {
    if (e.key === LEFT_ARROW) prev();
    if (e.key === RIGHT_ARROW) next();
    if (e.key === SPACE) pausePlay();
  };

// add swipe support
  const swipeStart = (e) => swipeStartX = e.changedTouches[0].pageX;

  const swipeEnd = (e) => {
    swipeEndX = e.changedTouches[0].pageX;
    swipeStartX - swipeEndX >  100 && prev();
    swipeStartX - swipeEndX < -100 && next();
  };

  // listeners activation
  const setListeners = () => {
    pausePlayBtn.addEventListener('click', pausePlay);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    indicatorsContainer.addEventListener('click', indicate);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown', pressKey);
  };

  // activate controls, if javascript is enabled
  const init = () => {
    indicatorsContainer.style.display = 'flex'; // flex
    controls.style.display = 'block'; // block
    setListeners();
    timerID = setInterval(gotoNext, interval);
  };

  init();

})(2000);
