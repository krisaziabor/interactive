var AppScriptUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=Nl6E6QJAbtflVfpcmJaK4cwd7vcj7859CyqpBe3_VgNFIb5wOvW81V9VqnqDLDNJrf3dKoS_ADBrTBgLRO2MXxIRRxg-Ebxem5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHKJH4Wt6u9sHehsLl-2EdKqWw_hUMVAcqGg0N8xJ0nbHDniOKFKbwG_xRJZMtKNwAowWQOk5Sv6wb0V0uaHRpu5NMOy6dfG9w&lib=MxqlxEaf2eAxi3Zz3GFm3KVBDFj5_MLQx';

window.getData = function getData(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        updateScoresAndHeadline(response.aggregate);
      } else {
        console.error('Request failed:', xhr.status);
      }
    }
  };
  xhr.send();
};

// Function to update the scores, headline, image, and caption dynamically
function updateScoresAndHeadline(data) {
  const scores = {};
  data.forEach(row => {
    const name = row[0]; // Player's name
    const score = parseInt(row[1], 10); // Player's score
    scores[name.toLowerCase()] = isNaN(score) ? 0 : score; // Handle NaN values
  });

  // Update the scoreboard directly
  const jayScore = scores.jay || 0;
  const krisScore = scores.kris || 0;

  // Debugging logs to ensure correct data parsing
  console.log('Jay Score:', jayScore, 'Kris Score:', krisScore);

  document.getElementById('score-jay').textContent = jayScore;
  document.getElementById('score-kris').textContent = krisScore;

  // Determine the leader and margin
  let headline, imageSrc, imageCaption;
  if (jayScore === krisScore) {
    headline = `Things could not be any more tense as Kris and Jay are currently deadlocked at ${krisScore} apiece in the Kojo Aziabor League.`;
    imageSrc = '/assets/deadlock.webp';
    imageCaption = 'Kris and Jay are deadlocked in the Kojo Aziabor League.';
  } else {
    const leader = jayScore > krisScore ? 'Jay' : 'Kris';
    const loser = jayScore > krisScore ? 'Kris' : 'Jay';
    const margin = Math.abs(jayScore - krisScore);
    if (margin < 3) {
      headline = `${leader} holds a narrow ${margin} game lead over ${loser}. Will ${leader} improve his run or do we have a competition on our hands?`;
    } else {
      headline = `${leader} currently has an impressive ${margin} lead over ${loser} in the Kojo Aziabor League.`;
    }
    if (leader === 'Jay') {
      imageSrc = '../assets/jay.jpg';
      imageCaption = 'Fans of Jay Aziabor Sporting Club cheer on as Jay takes the lead.';
    } else {
      imageSrc = '../assets/kris.png';
      imageCaption = 'Fans of Kris Aziabor Sporting Club cheer on as Kris takes the lead.';
    }
  }

  // Update the headline, image, and caption
  document.getElementById('headline').textContent = headline;
  document.getElementById('dynamic-image').src = imageSrc;
  document.getElementById('image-caption').textContent = imageCaption;
}

// Fetch data on page load
document.addEventListener("DOMContentLoaded", function () {
  getData(AppScriptUrl);
});