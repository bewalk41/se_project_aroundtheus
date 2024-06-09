import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { validationOptions } from "../utils/constants.js";
import "../pages/index.css";
import api from "../components/Api.js";

document.addEventListener("DOMContentLoaded", () => {
  const profileEditButton = document.querySelector("#profile-edit-button");
  const addCardButton = document.querySelector("#add-card-button");
  const profileImageButton = document.querySelector(".profile__image-button");

  const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__description",
    avatarSelector: ".profile__image",
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
        .setUserInfo({ name: formData.heading, about: formData.description })
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
        section.addItem(cardElement); // Use the `section` variable
        addCardPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => addCardPopup.renderLoading(false));
  });

  const imagePopup = new PopupWithImage("#image-modal");
  const confirmPopup = new PopupWithConfirmation("#confirm-popup");

  confirmPopup.setEventListeners();

  confirmPopup.setConfirmationHandler(({ cardId, cardElement }) => {
    confirmPopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        confirmPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => confirmPopup.renderLoading(false));
  });

  profileEditPopup.setEventListeners();
  addCardPopup.setEventListeners();
  imagePopup.setEventListeners();

  const updateAvatarPopup = new PopupWithForm("#profile-popup", (formData) => {
    updateAvatarPopup.renderLoading(true);
    api
      .setUserAvatar({ avatar: formData.description })
      .then((data) => {
        userInfo.setUserAvatar(data.avatar);
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
      },
      (cardId, isLiked, card) => {
        if (isLiked) {
          api
            .dislikeCard(cardId)
            .then((response) => {
              card.setIsLiked(false);
              // Optionally update likes count if needed
            })
            .catch((err) => console.error(err));
        } else {
          api
            .likeCard(cardId)
            .then((response) => {
              card.setIsLiked(true);
              // Optionally update likes count if needed
            })
            .catch((err) => console.error(err));
        }
      }
    );
    return card.getView(userInfo.getUserInfo()._id);
  }

  let section; // Declare the `section` variable

  // Fetch and display user info and initial cards
  api
    .getAppInfo()
    .then(({ userInfo: userData, initialCards }) => {
      userInfo.setUserInfo(userData);

      section = new Section(
        {
          items: initialCards, // Pass initial cards to Section
          renderer: (cardData) => {
            const cardElement = getCardElement(cardData);
            section.addItem(cardElement);
          },
        },
        ".cards__list"
      );

      section.renderItems(); // Render the initial cards
    })
    .catch((err) =>
      console.error("Error fetching user info or initial cards:", err)
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
});
