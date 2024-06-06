import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popupElement.querySelector(
      ".modal__button_confirm"
    );
    this._confirmButtonText = this._confirmButton.textContent; // Store the initial button text
  }

  setConfirmationHandler(handler) {
    this._handleConfirm = handler;
  }

  open(data) {
    super.open();
    this._data = data; // Store the data needed for confirmation
    console.log("PopupWithConfirmation open data:", this._data); // Debugging line
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      if (this._handleConfirm) {
        console.log("Confirmation button clicked with data:", this._data); // Debugging line
        this._handleConfirm(this._data);
      }
    });
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._confirmButton.textContent = loadingText;
    } else {
      this._confirmButton.textContent = this._confirmButtonText;
    }
  }
}
