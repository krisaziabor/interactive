(function() {
  // Get all data in the form and return as an object
  function getFormData(form) {
    const elements = form.elements;
    let honeypot;

    // Filter out honeypot field
    const fields = Object.keys(elements).filter(function(k) {
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

    const formData = {};
    fields.forEach(function(name) {
      const element = elements[name];
      formData[name] = element.value;

      // Handle multiple-selection form elements
      if (element.length) {
        const data = [];
        for (let i = 0; i < element.length; i++) {
          const item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // Add timestamp field
    formData.timestamp = new Date().toISOString();

    // Add additional form-specific values
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // Default to "responses" sheet
    formData.formGoogleSendEmail = form.dataset.email || ""; // No email by default

    return { data: formData, honeypot: honeypot };
  }

  // Handles form submission
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const form = event.target;
    const formData = getFormData(form);
    const data = formData.data;

    // Skip processing if honeypot field is filled
    if (formData.honeypot) {
      return false;
    }

    // Validate required fields
    if (!data.sport || !data.winner || !data.score) {
      alert("Please fill out all required fields (sport, winner, and score).");
      return false;
    }

    disableAllButtons(form);

    // Build the POST request
    const url = form.action;
    const xhr = new XMLHttpRequest();
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
    const encoded = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }

  // Show a thank you message upon successful submission
  function showThankYouMessage(form) {
    const formElements = form.querySelector(".form-elements");
    if (formElements) {
      formElements.style.display = "none"; // Hide the form
    }
    const thankYouMessage = form.querySelector(".thankyou_message");
    if (thankYouMessage) {
      thankYouMessage.style.display = "block"; // Show thank you message
    }
  }

  // Disable all buttons during submission
  function disableAllButtons(form) {
    const buttons = form.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }

  // Re-enable all buttons in case of failure
  function enableAllButtons(form) {
    const buttons = form.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = false;
    }
  }

  // Initialize form submission handling
  function loaded() {
    const forms = document.querySelectorAll("form.gform");
    for (let i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  }

  document.addEventListener("DOMContentLoaded", loaded, false);
})();