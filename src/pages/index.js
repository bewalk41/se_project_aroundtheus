import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards, validationOptions } from "../utils/constants.js";
import "../pages/index.css";

document.addEventListener("DOMContentLoaded", () => {
  const profileEditButton = document.querySelector("#profile-edit-button");
  const addCardButton = document.querySelector("#add-card-button");

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

  const handleImageClick = (link, name) => {
    imagePopup.open({ name, link });
  };

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

  const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
    const cardData = { name: formData.heading, link: formData.description };
    const cardElement = getCardElement(cardData);
    section.addItem(cardElement);
    addCardPopup.close();
  });

  const imagePopup = new PopupWithImage("#image-modal");

  profileEditPopup.setEventListeners();
  addCardPopup.setEventListeners();
  imagePopup.setEventListeners();

  function getCardElement(data) {
    const card = new Card(data, "#card-template", handleImageClick);
    return card.getView();
  }

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

  section.renderItems();

  profileEditButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    profileEditPopup.setInputValues({
      heading: userData.name,
      description: userData.job,
    });
    profileEditPopup.open();
    editFormValidator.resetValidation(); // Reset validation state when popup opens
  });

  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
    addCardFormValidator.resetValidation(); // Reset validation state when popup opens
  });
});
