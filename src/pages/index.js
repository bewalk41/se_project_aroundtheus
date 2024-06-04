import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { validationOptions } from "../utils/constants.js";
import "../pages/index.css"; // Ensure the CSS path is correct
import api from "../components/Api.js"; // Import the api instance

document.addEventListener("DOMContentLoaded", () => {
  const profileEditButton = document.querySelector("#profile-edit-button");
  const addCardButton = document.querySelector("#add-card-button");
  const profileImageButton = document.querySelector(".profile__image-button");

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
    document.querySelector("#add-card-modal .modal__form")
  );

  editFormValidator.enableValidation();
  addCardFormValidator.enableValidation();

  const handleImageClick = (link, name) => {
    imagePopup.open({ name, link });
  };

  const profileEditPopup = new PopupWithForm(
    "#profile-edit-modal",
    (formData) => {
      profileEditPopup.renderLoading(true);
      api
        .setUserInfo({
          name: formData.heading,
          about: formData.description,
        })
        .then(() => {
          userInfo.setUserInfo({
            name: formData.heading,
            job: formData.description,
          });
          profileEditPopup.close();
        })
        .catch((err) => console.error(err))
        .finally(() => profileEditPopup.renderLoading(false));
    }
  );

  const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
    addCardPopup.renderLoading(true);
    const cardData = { name: formData.heading, link: formData.description };
    api
      .addCard(cardData)
      .then((data) => {
        const cardElement = getCardElement(data);
        section.addItem(cardElement);
        addCardPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => addCardPopup.renderLoading(false));
  });

  const imagePopup = new PopupWithImage("#image-modal");

  const confirmPopup = new PopupWithConfirmation("#confirm-popup");
  confirmPopup.setEventListeners();

  confirmPopup.setConfirmationHandler(({ cardId, cardElement }) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        confirmPopup.close();
      })
      .catch((err) => console.error(err));
  });

  profileEditPopup.setEventListeners();
  addCardPopup.setEventListeners();
  imagePopup.setEventListeners();

  const updateAvatarPopup = new PopupWithForm("#profile-popup", (formData) => {
    updateAvatarPopup.renderLoading(true);
    api
      .setUserAvatar({ avatar: formData.description })
      .then(() => {
        const profileImageElement = document.querySelector(".profile__image");
        if (profileImageElement) {
          profileImageElement.src = formData.description;
        }
        updateAvatarPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => updateAvatarPopup.renderLoading(false));
  });

  updateAvatarPopup.setEventListeners();

  function getCardElement(data) {
    const card = new Card(
      data,
      "#card-template",
      handleImageClick,
      (cardId, cardElement) => {
        confirmPopup.open({ cardId, cardElement });
      }
    );
    return card.getView();
  }

  const section = new Section(
    {
      items: [],
      renderer: (cardData) => {
        const cardElement = getCardElement(cardData);
        section.addItem(cardElement);
      },
    },
    ".cards__list"
  );

  profileEditButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    profileEditPopup.setInputValues({
      heading: userData.name,
      description: userData.job,
    });
    profileEditPopup.open();
    editFormValidator.resetValidation(); // Reset validation when opening the profile edit form
  });

  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
    addCardFormValidator.toggleButtonState(); // Disable the submit button when opening the add card form
  });

  profileImageButton.addEventListener("click", () => {
    updateAvatarPopup.open();
  });

  // // Fetch and render initial cards
  // api
  //   .getInitialCards()
  //   .then((initialCards) => {
  //     section.renderItems(initialCards);
  //   })
  //   .catch((err) => console.error(err));

  api
    .getInitialCards()
    .then((initialCards) => {
      console.log("Initial Cards:", initialCards); // Log the initial cards data
      section.renderItems(initialCards);
    })
    .catch((err) => console.error("Error fetching initial cards:", err));
});
