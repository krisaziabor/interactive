let keySequence = '';
const keyDisplay = document.getElementById("key_display");

// Set initial text
keyDisplay.innerText = "color maker";

document.body.onkeydown = function(keypress_event) {
  const key = keypress_event.key;

  // Allow only hexadecimal characters and limit to 6 characters
  if (/^[a-fA-F0-9]$/.test(key) && keySequence.length < 6) {
    keySequence += key;
    keyDisplay.innerText = keySequence;

    // Change the background color immediately after 6 characters
    if (keySequence.length === 6) {
      console.log(`HEX code activated: #${keySequence}`);
      document.body.style.backgroundColor = `#${keySequence}`;
      keySequence = ''; // Reset the key sequence after changing color
    }
  }

  // Reset the sequence if Enter is pressed
  if (key === 'Enter') {
    if (keySequence.length === 6) {
      // If Enter is pressed after six characters, change the color immediately
      console.log(`HEX code activated by Enter: #${keySequence}`);
      document.body.style.backgroundColor = `#${keySequence}`;
    }
    keySequence = ''; // Reset the key sequence
    keyDisplay.innerText = "color maker"; // Reset the display text
  } else if (keySequence.length === 6 && key !== 'Enter') {
    console.log(`HEX code not activated: ${keySequence}`);
    keySequence = ''; // Reset if not Enter
    keyDisplay.innerText = "color maker";; // Reset the display text
  }
};