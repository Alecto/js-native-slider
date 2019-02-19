let slideItems = document.querySelectorAll('.slides__item');
let indContainer = document.querySelector('.indicators');
let indItems = document.querySelectorAll('.indicators__item');
let currentSlide = 0;
let carouselInterval = 2000;

const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const FA_PAUSE = '<i class="fas fa-pause"></i>';
const FA_PLAY = '<i class="fas fa-play"></i>';

// activate controls, if javascript is enabled
indContainer.style.display = 'flex'; // flex
document.querySelector('.controls').style.display = 'block'; // block

// carousel basic engine
let gotoNSlide = (n) => {
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
    currentSlide = (n + slideItems.length) % slideItems.length;
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
};

let gotoNextSlide = () => gotoNSlide(currentSlide + 1);

let gotoPrevSlide = () => gotoNSlide(currentSlide - 1);

// controls
let playbackStatus = true;
let pausePlayBtn = document.querySelector('.indicators__pause');
let nextBtn = document.querySelector('.controls__next');
let prevBtn = document.querySelector('.controls__prev');
let slideInterval = setInterval(gotoNextSlide, carouselInterval);

let pauseSlideShow = () => {
    if (playbackStatus) {
        pausePlayBtn.innerHTML = FA_PAUSE;
        playbackStatus = !playbackStatus;
        clearInterval(slideInterval);
    }
};

let playSlideShow = () => {
    pausePlayBtn.innerHTML = FA_PLAY;
    playbackStatus = !playbackStatus;
    slideInterval = setInterval(gotoNextSlide, carouselInterval);
};

let clickPausePlayBtn = () => playbackStatus ? pauseSlideShow() : playSlideShow();

let clickNextBtn = () => {
    pauseSlideShow();
    gotoNextSlide();
};

let clickPrevBtn = () => {
    pauseSlideShow();
    gotoPrevSlide();
};

pausePlayBtn.addEventListener('click', clickPausePlayBtn);
nextBtn.addEventListener('click', clickNextBtn);
prevBtn.addEventListener('click', clickPrevBtn);

// indicators
let clickIndicatorBtn = (e) => {
    let target = e.target;

    if (target.classList.contains('indicators__item')) {
        pauseSlideShow();
        gotoNSlide(+target.getAttribute('data-slide-to'));
    }
};

// use delegation to optimize the event handler
indContainer.addEventListener('click', clickIndicatorBtn);

// set keyboard controls
let pressKeyControl = (e) => {
    if (e.key === LEFT_ARROW) clickPrevBtn();
    if (e.key === RIGHT_ARROW) clickNextBtn();
    if (e.key === SPACE) clickPausePlayBtn();
};

document.addEventListener('keydown', pressKeyControl);