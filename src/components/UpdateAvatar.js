import Popup from "./Popup.js";
import api from "./Api.js"; // Import the api instance

class UpdateAvatar extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._profileImageInput = this._popupElement.querySelector(
      "#profile-image-input"
    );
    this._profileImageButton = document.querySelector(".profile__image-button");
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  setEventListeners() {
    super.setEventListeners();
    const profileImageForm = this._popupElement.querySelector(
      "#profile-image-form"
    );
    profileImageForm.addEventListener("submit", this._handleFormSubmit);
    this._profileImageButton.addEventListener("click", () => {
      this.open();
    });
  }

  _handleFormSubmit(event) {
    event.preventDefault();
    const newImageUrl = this._profileImageInput.value;

    api
      .setUserAvatar({ avatar: newImageUrl })
      .then((data) => {
        const profileImageElement = document.querySelector(".profile__image");
        if (profileImageElement) {
          profileImageElement.src = data.avatar;
        }
        this.close();
      })
      .catch((err) => console.error(err));
  }
}

export default UpdateAvatar;
