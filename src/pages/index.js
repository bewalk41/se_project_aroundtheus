import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { validationOptions, initialCards } from "../utils/constants.js";
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

  const handleDeleteClick = (cardId, cardElement) => {
    // Handle delete card action
  };

  const handleLikeIcon = (cardId, isLiked, card) => {
    if (isLiked) {
      api
        .dislikeCard(cardId)
        .then((response) => {
          card.setIsLiked(false);
        })
        .catch((err) => console.error(err));
    } else {
      api
        .likeCard(cardId)
        .then((response) => {
          card.setIsLiked(true);
        })
        .catch((err) => console.error(err));
    }
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
    console.log(`Card ID to delete: ${cardId}`);
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
      handleDeleteClick,
      handleLikeIcon
    );
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

  profileEditButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    profileEditPopup.setInputValues({
      heading: userData.name,
      description: userData.job,
    });
    profileEditPopup.open();
    editFormValidator.resetValidation();
  });

  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
    addCardFormValidator.toggleButtonState();
  });

  profileImageButton.addEventListener("click", () => {
    updateAvatarPopup.open();
  });

  api
    .getUserInfo()
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch((err) => console.error("Error fetching user info:", err));

  api
    .getInitialCards()
    .then((initialCards) => {
      section.renderItems(initialCards);
    })
    .catch((err) => console.error("Error fetching initial cards:", err));
});
