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
  const profileEditModal = document.querySelector("#profile-edit-modal");
  const profilecloseButton = profileEditModal.querySelector(
    "#profile-close-button"
  );
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");
  const profileNameInput = document.querySelector("#profile-title-input");
  const profileDescriptionInput = document.querySelector(
    "#profile-description-input"
  );
  const addCardButton = document.querySelector("#add-card-button");
  const addCardModal = document.querySelector("#add-card-modal");
  const addCardForm = document.querySelector("#add-card-form");
  const profileEditForm = profileEditModal.querySelector(".modal__form");
  const cardListEl = document.querySelector(".cards__list");
  const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;
  const addCardCloseButton = document.querySelector("#add-card-close-button");

  // Functions
  function closeModal() {
    profileEditModal.classList.remove("modal_opened");
  }

  function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
  }

  function handleAddCardSubmit(e) {
    e.preventDefault();
    const cardName = document.querySelector("#card-title-input").value;
    const cardImageLink = document.querySelector("#card-image-input").value;
    const cardData = { name: cardName, link: cardImageLink };
    const cardElement = getcardElement(cardData);
    cardListEl.prepend(cardElement);
    closeAddCardModal();
  }

  function getcardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardHeaderEl = cardElement.querySelector(".card__header");
    const likeButton = cardElement.querySelector(".card__like-button");
    const trashButton = cardElement.querySelector(".card__trash-button");

    //function image modal
    const cardImages = document.querySelectorAll(".card__image");
    const imageModal = document.querySelector("#image-modal");
    const modalImage = document.querySelector("#modal-image");
    const imageModalCloseButton = document.querySelector(
      "#image-modal-close-button"
    );
    function openImageModal(imageSrc) {
      modalImage.src = imageSrc;
      imageModal.classList.add("modal_opened");
    }

    function closeImageModal() {
      imageModal.classList.remove("modal_opened");
    }

    cardImages.forEach((image) => {
      image.addEventListener("click", () => {
        openImageModal(image.src);
      });
    });

    imageModalCloseButton.addEventListener("click", closeImageModal);

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    trashButton.addEventListener("click", () => {
      cardElement.remove();
    });

    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;
    cardHeaderEl.textContent = data.name;

    return cardElement;
  }

  initialCards.forEach((cardData) => {
    const cardElement = getcardElement(cardData);
    cardListEl.append(cardElement);
  });

  function openAddCardModal() {
    addCardModal.classList.add("modal_opened");
  }

  function closeAddCardModal() {
    addCardModal.classList.remove("modal_opened");
  }

  // Event listeners
  profileEditButton.addEventListener("click", () => {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileEditModal.classList.add("modal_opened");
  });

  profilecloseButton.addEventListener("click", closeModal);
  profileEditForm.addEventListener("submit", handleProfileEditSubmit);

  addCardForm.addEventListener("submit", handleAddCardSubmit);
  addCardButton.addEventListener("click", openAddCardModal);
  addCardCloseButton.addEventListener("click", closeAddCardModal);
});
