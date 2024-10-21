// script.js

// Get the "or" element and the description element
const orElement = document.getElementById('or-element');
const description = document.getElementById('description');
const temporaryTip = document.getElementById('temporary-tip');

// Add click event listener to the "or" element
orElement.addEventListener('click', () => {
    // Toggle the visibility of the description
    description.classList.remove('hidden');
    temporaryTip.classList.add('hidden');
});