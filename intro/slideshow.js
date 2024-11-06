let slideIndex = 0; // Initialize the index of the current slide

showSlides(); // Start the slideshow

// Function to show the slides in a slideshow
function showSlides() {
  const slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // Hide all slides
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1; // Reset to the first slide
  }
  slides[slideIndex - 1].style.display = "block"; // Show the current slide
  setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

function playMusic() {
  const audio = document.getElementById('audioPlayer');
  audio.play();
}

function pauseMusic() {
  const audio = document.getElementById('audioPlayer');
  audio.pause();
}

function stopMusic() {
  const audio = document.getElementById('audioPlayer');
  audio.pause();
  audio.currentTime = 0; // Reset the audio to the start
}
