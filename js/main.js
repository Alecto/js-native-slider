var controls = document.querySelectorAll('.controls');
var slides = document.querySelectorAll('.slides__item');
var indicators = document.querySelectorAll('.indicators__item');



var i;
for(i=0; i<controls.length; i++){
  controls[i].style.display = 'inline-block';
}

var currentSlide = 0;
var slideInterval = setInterval(nextSlide,2000);

function nextSlide(){
  goToSlide(currentSlide+1);
}

function previousSlide(){
  goToSlide(currentSlide-1);
}

function goToSlide(n){
  slides[currentSlide].className = 'slides__item';
  indicators[currentSlide].className = 'indicators__item';
  currentSlide = (n+slides.length)%slides.length;
  slides[currentSlide].className = 'slides__item active';
  indicators[currentSlide].className = 'indicators__item active';
}



var playing = true;
var pauseButton = document.getElementById('pause');

pauseButton.addEventListener('click', pauseButtonAction);

function pauseSlideshow(){
  pauseButton.innerHTML = '&#9658;'; // play character
  playing = false;
  clearInterval(slideInterval);
}

function playSlideshow(){
  pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
  playing = true;
  slideInterval = setInterval(nextSlide,2000);
}

function pauseButtonAction (){
  if (playing) {
    pauseSlideshow();
  } else {
    playSlideshow();
  }
}



var next = document.getElementById('next');
var previous = document.getElementById('previous');

next.addEventListener('click', nextSlideAction);
previous.addEventListener('click', previousSlideAction);

function nextSlideAction () {
  pauseSlideshow();
  nextSlide();
}

function previousSlideAction () {
  pauseSlideshow();
  previousSlide();
}



function goToSlideOnClick () {
  var n = this.getAttribute('data-slide-to') - 1;
  pauseSlideshow();
  goToSlide(n);
}

for(i=0; i<indicators.length; i++) {
  indicators[i].addEventListener('click', goToSlideOnClick);
}
