var slideContainer = document.querySelector('.slideshow-container');
var slides = document.querySelector('.slides');
var slideWidth = slideContainer.offsetWidth / 3; // Larghezza di una singola slide
var prevButton = document.querySelector('.prev');
var nextButton = document.querySelector('.next');
var slideIndex = 0;

prevButton.addEventListener('click', showPreviousSlides);
nextButton.addEventListener('click', showNextSlides);

function showPreviousSlides() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.children.length - 3;
  }
  updateSlides();
}

function showNextSlides() {
  slideIndex++;
  if (slideIndex >= slides.children.length - 2) {
    slideIndex = 0;
  }
  updateSlides();
}

function updateSlides() {
  for (var i = 0; i < slides.children.length; i++) {
    var slide = slides.children[i];
    if (i >= slideIndex && i < slideIndex + 3) {
      slide.classList.remove('hidden');
    } else {
      slide.classList.add('hidden');
    }
  }
  slides.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}