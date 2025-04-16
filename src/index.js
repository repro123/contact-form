"use strict";

const form = document.getElementById("form");
const firstNameInput = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameError");

const lastNameInput = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameError");

const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

const radioInputs = document.getElementsByName("query");
const queryTypeError = document.getElementById("queryTypeError");

const textareaInput = document.getElementById("textarea");
const textareaError = document.getElementById("textareaError");

const checkboxInput = document.getElementById("consent");
const checkboxError = document.getElementById("checkboxError");

const dialog = document.querySelector("dialog");
const dialogParagraphOne = document.getElementById("dialogParagraphOne");
const dialogParagraphTwo = document.getElementById("dialogParagraphTwo");

function validateFirstName() {
  const firstName = firstNameInput.value.trim();
  const isValid = !!firstName;

  firstNameInput.removeAttribute("data-invalid");
  firstNameInput.removeAttribute("aria-invalid");
  firstNameInput.removeAttribute("aria-describedby");
  firstNameError.textContent = "";

  if (!isValid) {
    firstNameInput.setAttribute("data-invalid", "true");
    firstNameInput.setAttribute("aria-invalid", "true");
    firstNameInput.setAttribute("aria-describedby", "firstNameError");
    firstNameError.textContent = "This field is required";
  }

  return isValid;
}

function validateLastName() {
  const lastName = lastNameInput.value.trim();
  const isValid = !!lastName;

  lastNameInput.removeAttribute("data-invalid");
  lastNameInput.removeAttribute("aria-invalid");
  lastNameInput.removeAttribute("aria-describedby");
  lastNameError.textContent = "";

  if (!isValid) {
    lastNameInput.setAttribute("data-invalid", "true");
    lastNameInput.setAttribute("aria-invalid", "true");
    lastNameInput.setAttribute("aria-describedby", "lastNameError");
    lastNameError.textContent = "This field is required";
  }

  return isValid;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const isValidFormat = emailRegex.test(email);
  const isValid = !!email;

  emailInput.removeAttribute("data-invalid");
  emailInput.removeAttribute("aria-invalid");
  emailInput.removeAttribute("aria-describedby");

  if (!isValid || !isValidFormat) {
    emailInput.setAttribute("data-invalid", "true");
    emailInput.setAttribute("aria-invalid", "true");
    emailInput.setAttribute("aria-describedby", "emailError");
  }
  emailError.textContent = !isValid
    ? "This field is required"
    : !isValidFormat
    ? "Please enter a valid email address"
    : "";

  return isValid && isValidFormat;
}

function validateRadioInputs() {
  let isChecked = false;
  for (let radioInput of radioInputs) {
    if (radioInput.checked) {
      isChecked = true;
      break;
    }
  }

  queryTypeError.textContent = "";
  if (!isChecked) {
    queryTypeError.textContent = "Please select a query type";
  }

  return isChecked;
}

function validateTextarea() {
  const message = textareaInput.value.trim();
  const minLength = 30;
  const validLength = message.length > minLength;
  const isValid = !!message;

  textareaInput.removeAttribute("data-invalid");
  textareaInput.removeAttribute("aria-invalid");
  textareaInput.removeAttribute("aria-describedby");
  textareaError.textContent = "";

  let errorMessage = "";

  if (!isValid) {
    errorMessage = "This field is required";
  } else if (!validLength) {
    errorMessage = `Your message should be at least ${minLength} characters`;
  }

  if (errorMessage) {
    textareaInput.setAttribute("data-invalid", "true");
    textareaInput.setAttribute("aria-invalid", "true");
    textareaInput.setAttribute("aria-describedby", "textareaError");
    textareaError.textContent = errorMessage;
  }

  return isValid && validLength;
}

function validateCheckbox() {
  const isChecked = checkboxInput.checked;

  checkboxError.textContent = "";
  checkboxInput.removeAttribute("aria-invalid");
  checkboxInput.removeAttribute("aria-describedby");

  if (!isChecked) {
    checkboxInput.setAttribute("aria-invalid", "true");
    checkboxInput.setAttribute("aria-describedby", checkboxError);
    checkboxError.textContent =
      "To submit this form, please consent to being contacted";
  }

  return isChecked;
}

firstNameInput.addEventListener("input", validateFirstName);
firstNameInput.addEventListener("blur", validateFirstName);

lastNameInput.addEventListener("input", validateLastName);
lastNameInput.addEventListener("blur", validateLastName);

emailInput.addEventListener("input", validateEmail);
emailInput.addEventListener("blur", validateEmail);

textareaInput.addEventListener("input", validateTextarea);
textareaInput.addEventListener("blur", validateTextarea);

checkboxInput.addEventListener("change", validateCheckbox);
checkboxInput.addEventListener("blur", validateCheckbox);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isEmailValid = validateEmail();
  const isRadioValid = validateRadioInputs();
  const isTextareaValid = validateTextarea();
  const isCheckboxValid = validateCheckbox();

  const isFormValid =
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isRadioValid &&
    isTextareaValid &&
    isCheckboxValid;

  if (isFormValid) {
    dialogParagraphOne.textContent = "Message sent!";
    dialogParagraphTwo.textContent =
      "Thanks for completing the form. We'll be in touch soon";
    dialog.showModal();
    form.reset();
  }
});
