class FormValidator {
  constructor(options, formElement) {
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;

    this._formElement = formElement;
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _showInputError(inputEl) {
    const errorEl = this._formElement.querySelector(`#${inputEl.id}-error`);
    errorEl.textContent = inputEl.validationMessage;
    inputEl.classList.add(this._inputErrorClass);
    errorEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorEl = this._formElement.querySelector(`#${inputEl.id}-error`);
    errorEl.textContent = "";
    inputEl.classList.remove(this._inputErrorClass);
    errorEl.classList.remove(this._errorClass);
  }

  _toggleButtonState() {
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    if (this._hasInvalidInput()) {
      this._disableButton(submitButton);
    } else {
      this._enableButton(submitButton);
    }
  }

  _hasInvalidInput() {
    return this._inputEls.some((inputEl) => !inputEl.validity.valid);
  }

  _disableButton(submitButton) {
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.disabled = true;
  }

  _enableButton(submitButton) {
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _setEventListeners() {
    this._inputEls = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }
  toggleButtonState() {
    this._toggleButtonState();
  }
}

export default FormValidator;
