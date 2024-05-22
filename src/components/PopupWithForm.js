import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._submitButton = this._form.querySelector(".modal__button");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _toggleSubmitButtonState() {
    const isValid = Array.from(this._inputList).every(
      (input) => input.value.trim() !== ""
    );
    if (isValid) {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove("modal__button_disabled");
    } else {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add("modal__button_disabled");
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
      this._toggleSubmitButtonState(); // Ensure button is disabled after form reset
    });

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => this._toggleSubmitButtonState());
    });
  }

  open() {
    super.open();
    this._toggleSubmitButtonState(); // Ensure button is disabled when popup opens
  }

  close() {
    super.close();
    this._form.reset();
    this._toggleSubmitButtonState(); // Ensure button is disabled after closing
  }
}

export default PopupWithForm;
