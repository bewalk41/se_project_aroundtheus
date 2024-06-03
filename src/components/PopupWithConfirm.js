import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._confirmButton = null; // Initialize _confirmButton to null
  }

  initialize() {
    this._confirmButton = this._popup.querySelector(".modal__button_confirm");
  }

  open(card) {
    super.open();
    this.initialize(); // Call initialize method
    this._card = card;
    this.setEventListeners(); // Call setEventListeners after _confirmButton is initialized
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._confirmButton) {
      // Check if _confirmButton is initialized
      this._confirmButton.addEventListener("click", () => {
        this._handleConfirm(this._card);
      });
    }
  }
}
