import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

// Initial card data
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const profileEditButton = document.querySelector("#profile-edit-button");
  const addCardButton = document.querySelector("#add-card-button");
  const cardListEl = document.querySelector(".cards__list");

  // UserInfo instance
  const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__description",
  });

  // Validation options
  const validationOptions = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };
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
    document.querySelector("#profile-title-input").value = userData.name;
    document.querySelector("#profile-description-input").value = userData.job;
    profileEditPopup.open();
  });

  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
  });
});
