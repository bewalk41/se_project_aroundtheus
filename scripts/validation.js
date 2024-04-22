// enabling validation by calling enableValidation()
// pass all the settings on call

function hideInputError(formEL, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEL.querySelector(`#${inputEl.id}-error`);
  if (errorMessageEl) {
    // Check if error message element exists
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }
}

function hideInputError(formEL, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEL.querySelector(`#${inputEl.id}-error`);
  if (errorMessageEl) {
    // Check if error message element exists
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }
}

function checkInputValidity(formEL, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEL, inputEl, options);
  }

  hideInputError(formEL, inputEl, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

//disable button

function disableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

//enable button

function enableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formEL, options) {
  const { inputSelector } = options;
  const inputEls = [...formEL.querySelectorAll(inputSelector)];
  const submitButton = formEL.querySelector(".modal__button");

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEL, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formELs = [...document.querySelectorAll(options.formSelector)];
  formELs.forEach((formEL) => {
    formEL.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEL, options);
    //     // look for all inputs inside of the form
    //     // loop through all inputs to see if all are valid
    //     //if input not valid
    //     // get validation message
    //     //add error class to input
    //     // display error mesage
    //     // disable button
    //     //if all inputs are valid
    //     // enable button
    //     // reset error meesages
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
