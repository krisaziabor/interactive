let keySequence = '';
const keyDisplay = document.getElementById("key_display");

// Set initial text
keyDisplay.innerText = "a snowy day - type a hex color code";

function createAsterisk(color) {
  const asterisk = document.createElement('div');
  asterisk.className = 'asterisk';
  asterisk.innerText = '*';
  asterisk.style.color = `#${color}`;
  asterisk.style.fontSize = '100px';
  asterisk.style.position = 'absolute';
  asterisk.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
  asterisk.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
  document.body.appendChild(asterisk);
}

document.body.onkeydown = function(keypress_event) {
  const key = keypress_event.key;

  // Allow only hexadecimal characters and limit to 6 characters
  if (/^[a-fA-F0-9]$/.test(key) && keySequence.length < 6) {
    keySequence += key;
    keyDisplay.innerText = keySequence;

    // Change the background color immediately after 6 characters
    if (keySequence.length === 6) {
      console.log(`HEX code activated: #${keySequence}`);
      createAsterisk(keySequence);
      keySequence = ''; // Reset the key sequence after creating the asterisk
      keyDisplay.innerText = ""; // Clear the display text
    }
  }

  // Reset the sequence if Enter is pressed
  if (key === 'Enter') {
    if (keySequence.length === 6) {
      // If Enter is pressed after six characters, change the color immediately
      console.log(`HEX code activated by Enter: #${keySequence}`);
      createAsterisk(keySequence);
    }
    keySequence = ''; // Reset the key sequence
    keyDisplay.innerText = ""; // Clear the display text
  } else if (keySequence.length === 6 && key !== 'Enter') {
    console.log(`HEX code not activated: ${keySequence}`);
    keySequence = ''; // Reset if not Enter
    keyDisplay.innerText = ""; // Clear the display text
  }
};