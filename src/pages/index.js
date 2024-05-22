import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards, validationOptions } from "../utils/constants.js";
import "../pages/index.css";

document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const profileEditButton = document.querySelector("#profile-edit-button");
  const addCardButton = document.querySelector("#add-card-button");

  // UserInfo instance
  const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__description",
  });

  const editFormValidator = new FormValidator(
    validationOptions,
    document.querySelector("#profile-edit-modal .modal__form")
  );
  const addCardFormValidator = new FormValidator(
    validationOptions,
    document.querySelector("#add-card-form")
  );

  editFormValidator.enableValidation();
  addCardFormValidator.enableValidation();

  // Define the handleImageClick function to open the image modal
  const handleImageClick = (link, name) => {
    imagePopup.open({ name, link });
  };

  // Instantiate the PopupWithForm for profile editing
  const profileEditPopup = new PopupWithForm(
    "#profile-edit-modal",
    (formData) => {
      userInfo.setUserInfo({
        name: formData.heading,
        job: formData.description,
      });
      profileEditPopup.close();
    }
  );

  // Instantiate the PopupWithForm for adding new cards
  const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
    const cardData = { name: formData.heading, link: formData.description };
    const cardElement = getCardElement(cardData);
    section.addItem(cardElement); // Use section to add the card
    addCardPopup.close();
  });

  // Instantiate the PopupWithImage for image modal
  const imagePopup = new PopupWithImage("#image-modal");

  // Set event listeners for the popups
  profileEditPopup.setEventListeners();
  addCardPopup.setEventListeners();
  imagePopup.setEventListeners();

  // Function to get a card element
  function getCardElement(data) {
    const card = new Card(data, "#card-template", handleImageClick);
    return card.getView();
  }

  // Instantiate the Section class
  const section = new Section(
    {
      items: initialCards,
      renderer: (cardData) => {
        const cardElement = getCardElement(cardData);
        section.addItem(cardElement);
      },
    },
    ".cards__list"
  );

  // Render initial cards
  section.renderItems();

  // Event listeners
  profileEditButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    profileEditPopup.setInputValues({
      heading: userData.name,
      description: userData.job,
    });
    profileEditPopup.open();
  });

  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
  });
});
