var controls = document.querySelectorAll('.controls');
for(var i=0; i<controls.length; i++){
  controls[i].style.display = 'inline-block';
}

var slides = document.querySelectorAll('.slides__item');
var indicators = document.querySelectorAll('.indicators__item');
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

pauseButton.onclick = function(){
  if(playing){ pauseSlideshow(); }
  else{ playSlideshow(); }
};

var next = document.getElementById('next');
var previous = document.getElementById('previous');

var slide1 = document.getElementById('slide-1');
var slide2 = document.getElementById('slide-2');
var slide3 = document.getElementById('slide-3');

next.onclick = function(){
  pauseSlideshow();
  nextSlide();
};
previous.onclick = function(){
  pauseSlideshow();
  previousSlide();
};

slide1.onclick = function(){
  pauseSlideshow();
  goToSlide(0);
};

slide2.onclick = function(){
  pauseSlideshow();
  goToSlide(1);
};

slide3.onclick = function(){
  pauseSlideshow();
  goToSlide(2);
};