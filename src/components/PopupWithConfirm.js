import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._confirmButton = null;
    this._cardId = null; // Added initialization for cardId
    this._cardElement = null; // Added initialization for cardElement
  }

  initialize() {
    this._confirmButton = this._popupElement.querySelector(
      ".modal__button_confirm"
    );
    if (!this._confirmButton) {
      console.error("Confirm button not found in the popup.");
    }
  }

  open(cardId, cardElement) {
    super.open();
    this.initialize();
    this._cardId = cardId;
    this._cardElement = cardElement;
    this._setEventListeners();
  }

  _setEventListeners() {
    super.setEventListeners();

    if (this._confirmButton) {
      this._confirmButton.addEventListener("click", () => {
        console.log("Delete request initiated for Card ID:", this._cardId); // Debug log
        fetch(
          `https://around-api.en.tripleten-services.com/v1/cards/${this._cardId}`,
          {
            method: "DELETE",
            headers: {
              authorization: "Bearer f2772a6b-ab7a-4d91-8e26-99a73e7be810", // Replace with your actual token
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Error: ${response.status}`);
          })
          .then((data) => {
            if (data.message === "This post has been deleted") {
              this._cardElement.remove(); // Remove the card element from the DOM
              this.close();
            } else {
              console.error("Failed to delete card:", data);
            }
          })
          .catch((error) => console.error("Error:", error));
      });
    }
  }
}
