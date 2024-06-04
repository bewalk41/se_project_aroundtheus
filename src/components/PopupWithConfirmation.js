import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popupElement.querySelector(
      ".modal__button_confirm"
    );
  }

  setConfirmationHandler(handler) {
    this._handleConfirm = handler;
  }

  open(data) {
    super.open();
    this._data = data; // Store the data needed for confirmation
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      if (this._handleConfirm) {
        this._handleConfirm(this._data);
      }
    });
  }
}
