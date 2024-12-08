var AppScriptUrl = 'https://script.google.com/macros/s/AKfycbwO7Vmxsmwhblugq4aIwvoUN_IkZclK81XxJVYHNu2G0nAitxyFvGztj46CMKEpb2AE/exec';

function getData(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Request was successful
        var response = JSON.parse(xhr.responseText);
        // Handle the response data here
        handleData(response);
        console.log(response);
      } else {
        // Request failed
        console.error('Request failed:', xhr.status);
      }
    }
  };
  xhr.send();
}

// this function prints the data to the HTML page.
function handleData(response) {
  var sheetDataElement = document.getElementById("sheetData");
  sheetDataElement.innerHTML = ""; // Clear previous data

  // Sort the response array by Votes in descending order
  response.sort(function(a, b) {
    return b.Votes - a.Votes;
  });

  response.forEach(function(item) {
    // Create a new <li> element
    var listItem = document.createElement("li");

    // Add the team and votes to the <li>
    listItem.textContent = `${item.Team}: ${item.Votes} votes`;

    // Append the <li> element to the "sheetData" element
    sheetDataElement.appendChild(listItem);
  });
}

// Example usage:
getData(AppScriptUrl);
