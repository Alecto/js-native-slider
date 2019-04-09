var slideItems = document.querySelectorAll('.slide');
var indContainer = document.querySelector('.indicators');
var indItems = document.querySelectorAll('.indicator');
var btnPausePlay = document.querySelector('#pause-play-btn');
var btnPrev = document.querySelector('#prev-btn');
var btnNext = document.querySelector('#next-btn');
var playingStatus = true;
var currentSlide = 0;
var timerId = null;
var slideInterval = 2000;

timerId = setInterval(nextSlide, slideInterval);

function goToSlide (n) {
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
    currentSlide = (n + slideItems.length) % slideItems.length;
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
}

function nextSlide () {
    goToSlide(currentSlide + 1);
}

function prevSlide () {
    goToSlide(currentSlide - 1);
}

function setPause () {
    clearInterval(timerId);
    playingStatus = false;
    btnPausePlay.innerHTML = '<i class="far fa-play-circle"></i>';
}

function setPlay () {
    playingStatus = true;
    btnPausePlay.innerHTML = '<i class="far fa-pause-circle"></i>';
    timerId = setInterval(nextSlide, slideInterval);
}

function clickPausePlay () {
    if (playingStatus) setPause();
    else setPlay();
}

function clickPrev () {
    setPause();
    prevSlide();
}

function clickNext () {
    setPause();
    nextSlide();
}

btnPausePlay.addEventListener('click', clickPausePlay);
btnPrev.addEventListener('click', clickPrev);
btnNext.addEventListener('click', clickNext);

function clickIndicator (e) {
    var target = e.target;

    if (target.classList.contains('indicator')) {
        setPause();
        goToSlide(+target.getAttribute('data-slide-to'));
    }
}

indContainer.addEventListener('click', clickIndicator);

function keyControls (event) {
    if (event.key === 'ArrowLeft') clickPrev();
    if (event.key === 'ArrowRight') clickNext();
    if (event.key === ' ') clickPausePlay();
}

document.addEventListener('keydown', keyControls);