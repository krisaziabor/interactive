// Select elements
const adText = document.querySelector('.ad-text');
const artText = document.querySelector('.art-text');
const adImage = document.querySelector('#ad-side img');
const artImage = document.querySelector('#art-side img');
const toggleButton = document.getElementById('toggle-text-button');

// Track the current state of the text (visible/invisible)
let textVisible = true;

// Toggle text visibility and image brightness
toggleButton.addEventListener('click', () => {
  textVisible = !textVisible;

  if (textVisible) {
    adText.style.opacity = 1;
    artText.style.opacity = 1;
    adImage.style.filter = 'brightness(0.5)';
    artImage.style.filter = 'brightness(0.5)';
    toggleButton.innerText = 'Hide Text';
  } else {
    adText.style.opacity = 0;
    artText.style.opacity = 0;
    adImage.style.filter = 'brightness(1)';
    artImage.style.filter = 'brightness(1)';
    toggleButton.innerText = 'Show Text';
  }
});

// Get the current page number from the URL
const currentPage = parseInt(window.location.pathname.match(/\d+/)[0], 10);

// Calculate the next page number
const nextPage = currentPage === 15 ? 1 : currentPage + 1;

// Set up the Next button click event
document.getElementById('next-button').addEventListener('click', () => {
  window.location.href = `/${String(nextPage).padStart(2, '0')}.html`;
});