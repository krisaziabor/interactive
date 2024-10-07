// script.js

// Get the "or" element and the description element
const orElement = document.getElementById('or-element');
const description = document.getElementById('description');

// Add click event listener to the "or" element
orElement.addEventListener('click', () => {
    // Toggle the visibility of the description
    description.classList.toggle('hidden');
});