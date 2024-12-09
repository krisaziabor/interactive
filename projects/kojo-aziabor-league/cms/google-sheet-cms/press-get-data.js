var AppScriptUrl =
  "https://script.googleusercontent.com/macros/echo?user_content_key=Nl6E6QJAbtflVfpcmJaK4cwd7vcj7859CyqpBe3_VgNFIb5wOvW81V9VqnqDLDNJrf3dKoS_ADBrTBgLRO2MXxIRRxg-Ebxem5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHKJH4Wt6u9sHehsLl-2EdKqWw_hUMVAcqGg0N8xJ0nbHDniOKFKbwG_xRJZMtKNwAowWQOk5Sv6wb0V0uaHRpu5NMOy6dfG9w&lib=MxqlxEaf2eAxi3Zz3GFm3KVBDFj5_MLQx";

// const data = {"aggregate":[["Name","Score"],["Kris",5],["Jay",6]],"sportSpecific":[["Sport","Name","Count"],["TENNIS","Kris",2],["TENNIS","Jay",1],["PING-PONG","Kris",0],["PING-PONG","Jay",3],["FIFA","Kris",2],["FIFA","Jay",0],["FM","Kris",1],["FM","Jay",2]]}
 
// window.getData = function getData(url) {
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", url, true);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//       if (xhr.status === 200) {
//         var response = JSON.parse(xhr.responseText);
//         updateScoresAndHeadline(response.aggregate, response.sportSpecific);
//       } else {
//         console.error("Request failed:", xhr.status);
//       }
//     }
//   };
//   xhr.send();
// };


function getLastMatchData(data) {
    const lastMatch = data[data.length - 1];
    const sport = lastMatch[0];
    const winner = lastMatch[1];
    const count = parseInt(lastMatch[2], 10);
    const loser = winner === "Kris" ? "Jay" : "Kris";
    return {
        sport: sport,
        winner: winner,
        loser: loser,
        score: `${count}-${count - 1}`,
    };
};

console.log(getLastMatchData(data.sportSpecific));


// // Function to update the scores, subheading, and question dynamically
// function updateScoresAndHeadline(aggregate, sportSpecific) {
//   const scores = {};
//   let lastGame = null;

//   // Extract scores from the aggregate data
//   aggregate.slice(1).forEach((row) => {
//     const name = row[0].toLowerCase(); // Player's name
//     const score = parseInt(row[1], 10); // Player's score
//     scores[name] = isNaN(score) ? 0 : score; // Handle NaN values
//   });

//   // Extract the last game's result from sport-specific data
//   if (sportSpecific.length > 1) {
//     const lastGameData = sportSpecific[sportSpecific.length - 1];
//     const sport = lastGameData[0]; // Sport name
//     const winner = lastGameData[1]; // Winner's name
//     const count = parseInt(lastGameData[2], 10); // Count (assumed winner)
//     const loser = winner === "Kris" ? "Jay" : "Kris"; // Infer loser
//     lastGame = {
//       sport: sport,
//       winner: winner,
//       loser: loser,
//       score: `${scores[winner.toLowerCase()]}-${scores[loser.toLowerCase()]}`,
//     };
//   }

//   // Update the scoreboard directly
//   const jayScore = scores.jay || 0;
//   const krisScore = scores.kris || 0;

//   document.getElementById("score-jay").textContent = jayScore;
//   document.getElementById("score-kris").textContent = krisScore;

//   // Update subheading based on the last game's result
//   const subHeading = document.getElementById("sub-heading");
//   if (lastGame) {
//     const { sport, winner, loser, score } = lastGame;
//     const resultText = winner === "Kris" ? "defeats" : "defeated by";
//     subHeading.textContent = `Kris ${resultText} Jay in ${sport}, ${score}`;
//   } else {
//     subHeading.textContent = "Game details are currently unavailable.";
//   }

//   // Update the headline and question dynamically
//   const questionContainer = document.querySelector(".question-container p:nth-child(2)");
//   if (lastGame) {
//     const { winner } = lastGame;
//     if (winner === "Kris") {
//       // Positive question if Kris won
//       questionContainer.textContent =
//         "A fantastic victory today, Kris. How did you do it and what gave you the edge over Jay?";
//     } else {
//       // Negative question if Kris lost
//       questionContainer.textContent =
//         "A defeat for you today, Kris. Do you have faith in turning this around next time or do you think Jay might just have you beaten?";
//     }
//   } else {
//     questionContainer.textContent = "No recent game data available.";
//   }
// }

// // Fetch data on page load
// document.addEventListener("DOMContentLoaded", function () {
//   getData(AppScriptUrl);
// });