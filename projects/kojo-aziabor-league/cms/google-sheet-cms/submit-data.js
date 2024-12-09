(function() {
  // Get all data in the form and return as an object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function(k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value; // Honeypot field to catch spam bots
        return false;
      }
      return true;
    }).map(function(k) {
      if (elements[k].name !== undefined) {
        return elements[k].name;
      } else if (elements[k].length > 0) {
        return elements[k].item(0).name; // Handle Edge-specific cases
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) === pos && item;
    });

    var formData = {};
    fields.forEach(function(name) {
      var element = elements[name];
      
      // Singular form elements
      formData[name] = element.value;

      // Multiple selection form elements
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // Add additional form-specific values
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // Default to "responses" sheet
    formData.formGoogleSendEmail = form.dataset.email || ""; // No email by default

    return { data: formData, honeypot: honeypot };
  }

  // Handles form submission
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    // Skip processing if honeypot field is filled
    if (formData.honeypot) {
      return false;
    }

    disableAllButtons(form);

    // Build the POST request
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset(); // Reset the form
        showThankYouMessage(form); // Show thank you message
      } else if (xhr.readyState === 4) {
        alert("An error occurred while submitting the form. Please try again.");
        enableAllButtons(form); // Re-enable buttons in case of failure
      }
    };

    // URL encode the form data for POST submission
    var encoded = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }

  // Show a thank you message upon successful submission
  function showThankYouMessage(form) {
    var formElements = form.querySelector(".form-elements");
    if (formElements) {
      formElements.style.display = "none"; // Hide the form
    }
    var thankYouMessage = form.querySelector(".thankyou_message");
    if (thankYouMessage) {
      thankYouMessage.style.display = "block"; // Show thank you message
    }
  }

  // Disable all buttons during submission
  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }

  // Re-enable all buttons in case of failure
  function enableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = false;
    }
  }

  // Initialize form submission handling
  function loaded() {
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  }

  document.addEventListener("DOMContentLoaded", loaded, false);
})();