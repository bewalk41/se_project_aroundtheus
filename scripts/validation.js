// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEL, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEL.querySelector(`#${inputEl.id}-error`);
  if (errorMessageEl) {
    if (inputEl.type === "url") {
      errorMessageEl.textContent = "Please enter a web address."; // Error message for URL input
    } else {
      errorMessageEl.textContent = inputEl.validationMessage;
    }
    errorMessageEl.classList.add(errorClass);
  }
}

function hideInputError(formEL, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEL.querySelector(`#${inputEl.id}-error`);
  if (errorMessageEl) {
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
    disableButton(submitButton, inactiveButtonClass);
    return;
  }
  enableButton(submitButton, inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formEL, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEls = [...formEL.querySelectorAll(inputSelector)];
  const submitButton = formEL.querySelector(submitButtonSelector);

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
