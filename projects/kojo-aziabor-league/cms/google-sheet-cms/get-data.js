var AppScriptUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=Nl6E6QJAbtflVfpcmJaK4cwd7vcj7859CyqpBe3_VgNFIb5wOvW81V9VqnqDLDNJrf3dKoS_ADBrTBgLRO2MXxIRRxg-Ebxem5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHKJH4Wt6u9sHehsLl-2EdKqWw_hUMVAcqGg0N8xJ0nbHDniOKFKbwG_xRJZMtKNwAowWQOk5Sv6wb0V0uaHRpu5NMOy6dfG9w&lib=MxqlxEaf2eAxi3Zz3GFm3KVBDFj5_MLQx';

function getData(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Parse the JSON response
        var response = JSON.parse(xhr.responseText);
        
        // Handle the aggregate and sport-specific data separately
        handleAggregateData(response.aggregate);
        handleSportSpecificData(response.sportSpecific);
        console.log(response);
      } else {
        console.error('Request failed:', xhr.status);
      }
    }
  };
  xhr.send();
}

// Function to display aggregate scores
function handleAggregateData(data) {
  var aggregateElement = document.getElementById("aggregateData");

  data.forEach(function(item) {
    var listItem = document.createElement("li");

    // Assuming the first column is "Name" and second is "Score"
    var name = document.createElement("div");
    name.className = "name";
    name.innerHTML = "Player: " + item[0];

    var score = document.createElement("div");
    score.className = "score";
    score.innerHTML = "Score: " + item[1];

    listItem.appendChild(name);
    listItem.appendChild(score);
    aggregateElement.appendChild(listItem);
  });
}

// Function to display sport-specific scores
function handleSportSpecificData(data) {
  var sportDataElement = document.getElementById("sportData");

  data.forEach(function(item) {
    var listItem = document.createElement("li");

    // Assuming the first column is "Sport", second is "Name", and third is "Score"
    var sport = document.createElement("div");
    sport.className = "sport";
    sport.innerHTML = "Sport: " + item[0];

    var name = document.createElement("div");
    name.className = "name";
    name.innerHTML = "Player: " + item[1];

    var score = document.createElement("div");
    score.className = "score";
    score.innerHTML = "Score: " + item[2];

    listItem.appendChild(sport);
    listItem.appendChild(name);
    listItem.appendChild(score);
    sportDataElement.appendChild(listItem);
  });
}

// Fetch data from the App Script URL
getData(AppScriptUrl);