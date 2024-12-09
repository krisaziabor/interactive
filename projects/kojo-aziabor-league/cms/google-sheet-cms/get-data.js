var AppScriptUrl =
  "https://script.googleusercontent.com/macros/echo?user_content_key=Nl6E6QJAbtflVfpcmJaK4cwd7vcj7859CyqpBe3_VgNFIb5wOvW81V9VqnqDLDNJrf3dKoS_ADBrTBgLRO2MXxIRRxg-Ebxem5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHKJH4Wt6u9sHehsLl-2EdKqWw_hUMVAcqGg0N8xJ0nbHDniOKFKbwG_xRJZMtKNwAowWQOk5Sv6wb0V0uaHRpu5NMOy6dfG9w&lib=MxqlxEaf2eAxi3Zz3GFm3KVBDFj5_MLQx";

window.getData = function getData(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        updateScoresAndHeadline(response.aggregate);
        displayTennis(response);
        displayPingPong(response);
        displayFifa(response);
        displayFM(response);
      } else {
        console.error("Request failed:", xhr.status);
      }
    }
  };
  xhr.send();
};

// Function to update the scores, headline, image, and caption dynamically
function updateScoresAndHeadline(data) {
  const scores = {};
  data.forEach((row) => {
    const name = row[0]; // Player's name
    const score = parseInt(row[1], 10); // Player's score
    scores[name.toLowerCase()] = isNaN(score) ? 0 : score; // Handle NaN values
  });

  // Update the scoreboard directly
  const jayScore = scores.jay || 0;
  const krisScore = scores.kris || 0;

  // Debugging logs to ensure correct data parsing
  console.log("Jay Score:", jayScore, "Kris Score:", krisScore);

  document.getElementById("score-jay").textContent = jayScore;
  document.getElementById("score-kris").textContent = krisScore;

  // Determine the leader and margin
  let headline, imageSrc, imageCaption;
  if (jayScore === krisScore) {
    headline = `Things could not be any more tense as Kris and Jay are currently deadlocked at ${krisScore} apiece in the Kojo Aziabor League.`;
    imageSrc = "assets/deadlock.webp";
    imageCaption = "Kris and Jay are deadlocked in the Kojo Aziabor League.";
  } else {
    const leader = jayScore > krisScore ? "Jay" : "Kris";
    const loser = jayScore > krisScore ? "Kris" : "Jay";
    const margin = Math.abs(jayScore - krisScore);
    if (margin < 3) {
      headline = `${leader} holds a narrow ${margin} game lead over ${loser}. Will ${leader} improve his run or do we have a competition on our hands?`;
    } else {
      headline = `${leader} currently has an impressive ${margin} lead over ${loser} in the Kojo Aziabor League. ${loser} has lots of work to do.`;
    }
    if (leader === "Jay") {
      imageSrc = "assets/jay.jpg";
      imageCaption =
        "Fans of Jay Aziabor Sporting Club cheer on as Jay takes the lead.";
    } else {
      imageSrc = "assets/kris.png";
      imageCaption =
        "Fans of Kris Aziabor Sporting Club cheer on as Kris takes the lead.";
    }
  }

  // Update the headline, image, and caption
  document.getElementById("headline").textContent = headline;
  document.getElementById("dynamic-image").src = imageSrc;
  document.getElementById("image-caption").textContent = imageCaption;
}
function displayTennis(data) {
  const tennisScores = { kris: 0, jay: 0 };
  for (let i = 1; i < 3; i++) {
    const row = data.sportSpecific[i];
    const sport = row[0];
    const player = row[1];
    const count = parseInt(row[2], 10);
    if (sport === "TENNIS") {
      tennisScores[player.toLowerCase()] += count;
    }
  }

  const jayScore = tennisScores.jay || 0;
  const krisScore = tennisScores.kris || 0;

  if (krisScore === jayScore) {
    headline = `Kris and Jay are tied in ${sport} with ${krisScore} points each.`;
  } else {
    const leader = krisScore > jayScore ? "Kris" : "Jay";
    const loser = krisScore > jayScore ? "Jay" : "Kris";
    const margin = Math.abs(krisScore - jayScore);
    headline = `${loser} issued $10K fine from ATA (Aziabor Tennis Association) as his loss means he trails ${leader} by ${margin} in the tennis aggregate.`;
  }

  document.getElementById("tennis-score").textContent = headline;
}

function displayPingPong(data) {
  const pingpongscores = { kris: 0, jay: 0 };
  for (let i = 3; i < 5; i++) {
    const row = data.sportSpecific[i];
    const sport = row[0];
    const player = row[1];
    const count = parseInt(row[2], 10);
    if (sport === "PING-PONG") {
      pingpongscores[player.toLowerCase()] += count;
    }
  }

  const jayScore = pingpongscores.jay || 0;
  const krisScore = pingpongscores.kris || 0;

  if (krisScore === jayScore) {
    headline = `Kris and Jay are tied in ${sport} with ${krisScore} points each.`;
  } else {
    const leader = krisScore > jayScore ? "Kris" : "Jay";
    const loser = krisScore > jayScore ? "Jay" : "Kris";
    const margin = Math.abs(krisScore - jayScore);
    headline = `${leader} jubilant after massive win: leads ${loser} by ${margin} in ping-pong.`;
  }

  document.getElementById("pingpong-score").textContent = headline;
}

function displayFifa(data) {
  const fifascores = { kris: 0, jay: 0 };
  for (let i = 5; i < 7; i++) {
    const row = data.sportSpecific[i];
    const sport = row[0];
    const player = row[1];
    const count = parseInt(row[2], 10);
    if (sport === "FIFA") {
      fifascores[player.toLowerCase()] += count;
    }
  }

  const jayScore = fifascores.jay || 0;
  const krisScore = fifascores.kris || 0;

  if (krisScore === jayScore) {
    headline = `Kris and Jay are tied in ${sport} with ${krisScore} points each.`;
  } else {
    const leader = krisScore > jayScore ? "Kris" : "Jay";
    const loser = krisScore > jayScore ? "Jay" : "Kris";
    const margin = Math.abs(krisScore - jayScore);
    headline = `"Game is game": ${leader} ambivalent about ${loser}'s accusations of 'dirty play' as he wins nervy matchup in FIFA.`;
  }

  document.getElementById("fifa-score").textContent = headline;
}

function displayFM(data) {
  const fmscores = { kris: 0, jay: 0 };
  for (let i = 7; i < 9; i++) {
    const row = data.sportSpecific[i];
    const sport = row[0];
    const player = row[1];
    const count = parseInt(row[2], 10);
    if (sport === "FM") {
      fmscores[player.toLowerCase()] += count;
    }
  }

  const jayScore = fmscores.jay || 0;
  const krisScore = fmscores.kris || 0;

  if (krisScore === jayScore) {
    headline = `Kris and Jay are tied in ${sport} with ${krisScore} points each.`;
  } else {
    const leader = krisScore > jayScore ? "Kris" : "Jay";
    const loser = krisScore > jayScore ? "Jay" : "Kris";
    const margin = Math.abs(krisScore - jayScore);
    headline = `Fans of ${loser} Football Club sing "you're getting sacked in the morning" as ${loser} loses once more to ${leader} FC.`;
  }

  document.getElementById("fm-score").textContent = headline;
}

// Fetch data on page load
document.addEventListener("DOMContentLoaded", function () {
  getData(AppScriptUrl);
});
