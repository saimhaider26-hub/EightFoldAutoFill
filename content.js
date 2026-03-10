(function() {
  const test1 = {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "5551234567",
    "howDidYouHear": "LinkedIn",
    "disabilityStatus": "No",
    "veteranStatus": "I am not a protected veteran",
    "willingToRelocate": "Yes",
    "street": "123 Main Street",
    "city": "San Francisco",
    "state": "California",
    "zipCode": "94101",
    "country": "United States",
    "salary": "150000",
    "workPreference": "Hybrid",
    "authorizedToWork": "Yes",
    "requireSponsorship": "No",
    "fullName": "John Michael Doe",
    "lastUpdated": "2025-01-08",
    "startDate": "13 March 2026",
    "resumeUrl": "https://example.com/resume.pdf",
    "coverLetterUrl": "https://example.com/coverletter.pdf"
  };

  function setRval(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeInputValueSetter.call(element, value);
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function enter(selector, text) {
    const input = document.querySelector(selector);
    if (input) {
      input.focus();
      setRval(selector, text);
      setTimeout(() => {
        input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter', code: 'Enter', keyCode: 13 }));
        input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape', code: 'Escape', keyCode: 27 }));
        input.blur();
      }, 400);
    }
  }

  async function fileuploads(buttonAriaLabel, url, fileName) {
    const button = document.querySelector(`button[aria-label="${buttonAriaLabel}"]`);
    if (!button) return;
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], fileName, { type: 'application/pdf' });
      const dt = new DataTransfer();
      dt.items.add(file);
      const dropZone = button.closest('.stack-module_stack__LqslD') || button.parentElement;
      dropZone.dispatchEvent(new DragEvent('drop', { bubbles: true, dataTransfer: dt }));
    } catch (err) {}
  }

  fileuploads('Select file - Upload resume', test1.resumeUrl, 'Resume.pdf');
  fileuploads('Select file - Upload cover letter', test1.coverLetterUrl, 'CoverLetter.pdf');
  setRval('#Contact_Information_firstname', test1.firstName);
  setRval('#Contact_Information_lastname', test1.lastName);
  setRval('#Contact_Information_email', test1.email);
  setRval('#Contact_Information_phone', test1.phoneNumber);
  enter('input[placeholder="Select country code"]', 'United States');
  enter('input[aria-labelledby="Address_Country_Reference_label"]', test1.country);
  setRval('#Address_Address_Line_1', test1.street);
  setRval('#Address_City', test1.city);
  setRval('#Address_State', test1.state);
  setRval('#Address_Postal_Code', test1.zipCode);
  enter('input[aria-labelledby="Source_Applicant_Source_ID_label"]', test1.howDidYouHear);
  enter('input[aria-labelledby="Voluntary_Self_Identification_of_Disability_Disability_Status_label"]', test1.disabilityStatus);
  enter('input[aria-labelledby="_VEVRAA__Veteran_s_Self_Identification_Form__Pre_offer__PERSONAL_INFORMATION_COLLECTION_6_4_label"]', test1.veteranStatus);
  enter('input[aria-labelledby="Relocation_Relocation_label"]', test1.willingToRelocate);
  setRval('#Application_questions_us_annual_salary', test1.salary);
  enter('input[aria-labelledby="Application_questions_us_work_pref_label"]', test1.workPreference);
  enter('input[aria-labelledby="Position_Specific_Questions_QUESTION_SETUP_6_24_label"]', test1.authorizedToWork);
  enter('input[aria-labelledby="Position_Specific_Questions_QUESTION_SETUP_6_25_label"]', test1.requireSponsorship);
  setRval('#Voluntary_Self_Identification_of_Disability_CC305_Name', test1.fullName);
  enter('#Voluntary_Self_Identification_of_Disability_CC305_Date', test1.lastUpdated);
  enter('#Position_Specific_Questions_Question_Setup_1', test1.startDate);
})();