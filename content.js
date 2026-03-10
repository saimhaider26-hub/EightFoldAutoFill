const testData = {
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "5551234567"
};

function setReactValue(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(element, value);
    
    
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    console.log(`Successfully filled: ${selector}`);
  } else {
    console.log(`Could not find field for selector: ${selector}`);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "autofill") {
    console.log("Starting Eightfold autofill...");
    
    // Target the input fields using standard attributes
    setReactValue('input[name="firstName"], input[autocomplete="given-name"]', testData.firstName);
    setReactValue('input[name="lastName"], input[autocomplete="family-name"]', testData.lastName);
    setReactValue('input[name="email"], input[type="email"]', testData.email);
    setReactValue('input[name="phone"], input[type="tel"]', testData.phoneNumber);
    
    alert("Autofill injected! Please check the text boxes.");
  }
});