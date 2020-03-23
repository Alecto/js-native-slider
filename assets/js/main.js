(function(time) {
  let carousel = document.querySelector('.carousel');
  let slides = carousel.querySelectorAll('.slide');
  let indicatorsContainer = carousel.querySelector('.indicators');
  let indicators = indicatorsContainer.querySelectorAll('.indicator');
  let controls = carousel.querySelector('.controls');
  let pausePlayBtn = controls.querySelector('#pause-play-btn');
  let nextBtn = controls.querySelector('#next-btn');
  let prevBtn = controls.querySelector('#prev-btn');

  let currentSlide = 0;
  let interval = time;
  let isPlay = true;
  let timerID = null;
  let swipeStartX = null;
  let swipeEndX = null;

  const SPACE = ' ';
  const LEFT_ARROW = 'ArrowLeft';
  const RIGHT_ARROW = 'ArrowRight';
  const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
  const FA_PLAY = '<i class="far fa-play-circle"></i>';

// carousel basic engine
  let gotoNSlide = (n) => {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  };

  let gotoNextSlide = () => gotoNSlide(currentSlide + 1);

  let gotoPrevSlide = () => gotoNSlide(currentSlide - 1);

// controls
  let pause = () => {
    if (isPlay) {
      pausePlayBtn.innerHTML = FA_PLAY;
      isPlay = !isPlay;
      clearInterval(timerID);
    }
  };

  let play = () => {
    pausePlayBtn.innerHTML = FA_PAUSE;
    isPlay = !isPlay;
    timerID = setInterval(gotoNextSlide, interval);
  };

  let clickPause = () => isPlay ? pause() : play();

  let clickNext = () => {
    pause();
    gotoNextSlide();
  };

  let clickPrev = () => {
    pause();
    gotoPrevSlide();
  };

// indicators
  let clickIndicatorBtn = (e) => {
    let target = e.target;

    if (target.classList.contains('indicator')) {
      pause();
      gotoNSlide(+target.getAttribute('data-slide-to'));
    }
  };

// set keyboard controls
  let pressKey = (e) => {
    if (e.key === LEFT_ARROW) clickPrev();
    if (e.key === RIGHT_ARROW) clickNext();
    if (e.key === SPACE) clickPause();
  };

// add swipe support
  let swipeStart = (e) => {
    swipeStartX = e.changedTouches[0].pageX;
  };

  let swipeEnd = (e) => {
    swipeEndX = e.changedTouches[0].pageX;
    swipeStartX - swipeEndX >  100 && clickPrev();
    swipeStartX - swipeEndX < -100 && clickNext();
  };

  // listeners activation
  let setListeners = () => {
    pausePlayBtn.addEventListener('click', clickPause);
    nextBtn.addEventListener('click', clickNext);
    prevBtn.addEventListener('click', clickPrev);
    indicatorsContainer.addEventListener('click', clickIndicatorBtn);
    carousel.addEventListener('touchstart', swipeStart);
    carousel.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown', pressKey);
  };

  // activate controls, if javascript is enabled
  let init = () => {
    indicatorsContainer.style.display = 'flex'; // flex
    controls.style.display = 'block'; // block
    setListeners();
    timerID = setInterval(gotoNextSlide, interval);
  };

  init();

})(2000);
