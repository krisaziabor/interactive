let keySequence = '';
let timeoutId;

document.body.onkeydown = function(keypress_event) {
  var key = keypress_event.key;

  // Allow only number keys and limit to 2 digits
  if (!isNaN(key) && keySequence.length < 2) {
    keySequence += key;
    document.getElementById("key_display").innerHTML = keySequence;

    // Clear any existing timeout
    clearTimeout(timeoutId);

    // Set a new timeout to open the link after 2 seconds
    if (keySequence.length === 2) {
      timeoutId = setTimeout(() => {
        console.log(`Sequence activated: ${keySequence}`);
        window.location.href = `https://en.wikipedia.org/wiki/${keySequence}_(number)?useskin=vector`;
        keySequence = ''; // Reset the key sequence after navigating
      }, 2000);
    }
  }

  // Reset the sequence if Enter is pressed
  if (key === 'Enter') {
    clearTimeout(timeoutId);
    if (keySequence.length === 2) {
      // If Enter is pressed after two digits, activate the link immediately
      console.log(`Sequence activated by Enter: ${keySequence}`);
      window.location.href = `https://en.wikipedia.org/wiki/${keySequence}_(number)?useskin=vector`;
    }
    keySequence = ''; // Reset the key sequence
  } else if (keySequence.length === 2 && key !== 'Enter') {
    console.log(`Sequence not activated: ${keySequence}`);
    keySequence = ''; // Reset if not Enter
  }
};
