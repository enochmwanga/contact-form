document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email-address");
  const radioButtons = document.querySelectorAll("input[type=radio]");
  const message = document.getElementById("message");
  const checkbox = document.getElementById("consent");
  const emailRegExp =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})(?:\.[a-zA-Z]{2,})*$/;
  const textFields = [firstName, lastName, email, message];
  const submitButton = document.getElementById("submit-btn");
  const successContainer = document.getElementById("success-message");
  let checkCount = 0;
  let textFieldsInvalid;

  function handleBlanks(event) {
    if (event.target.value.length !== 0) {
      event.target.nextElementSibling.textContent = "";
      textFieldsInvalid = false;
    }
    if (event.target.value.length === 0) {
      event.target.nextElementSibling.textContent = "This field is required";
      textFieldsInvalid = true;
    }
  }

  function handleEmailErrors() {
    if (emailRegExp.test(email.value)) {
      email.nextElementSibling.textContent = "";
      textFieldsInvalid = false;
    }
    if (!emailRegExp.test(email.value) && email.value.length !== 0) {
      email.nextElementSibling.textContent =
        "Please enter a valid email address";
        textFieldsInvalid = true;
    }
  }

  function checkRadioGroup() {
    radioButtons.forEach((button) => {
      if (button.checked) {
        checkCount++;
        document.querySelector("fieldset").nextElementSibling.textContent = "";
        return;
      }
    });
    if (checkCount === 0) {
      document.querySelector("fieldset").nextElementSibling.textContent =
        "Please select a query type";
    }
  }

  function validateCheckBox() {
    if (checkbox.checked) {
      document.querySelector(
        'label[for="consent"]'
      ).nextElementSibling.textContent = "";
      return;
    }
    document.querySelector(
      'label[for="consent"]'
    ).nextElementSibling.textContent =
      "To submit this form, please consent to being contacted";
  }

  function validateForm() {
    textFields.forEach((element) => {
      if (element.value.length === 0) {
        element.nextElementSibling.textContent = "This field is required";
      }
    });
  }
  function showSuccessMessage() {
    if (textFieldsInvalid || !checkbox.checked || checkCount === 0){
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    successContainer.style.display = "grid";
    setTimeout(() => {
      successContainer.style.display = "none";
    }, 5000);
    form.reset();   
  }
  firstName.addEventListener("input", (event) => {
    handleBlanks(event);
  });
  lastName.addEventListener("input", (event) => {
    handleBlanks(event);
  });
  email.addEventListener("input", (event) => {
    handleBlanks(event);
    handleEmailErrors();
  });
  message.addEventListener("input", (event) => {
    handleBlanks(event);
  });
  checkbox.addEventListener("change", () => {
    validateCheckBox();
  });
  radioButtons.forEach((button) => {
    button.addEventListener("change", () => {
      checkRadioGroup();
    });
  });
  checkbox.addEventListener("change", () => {});
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    checkRadioGroup();
    validateCheckBox();
    validateForm();
    showSuccessMessage();
  });
});
