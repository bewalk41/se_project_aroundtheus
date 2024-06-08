export default class Card {
  constructor(
    { name, link, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeIcon
  ) {
    this._name = name;
    this._link = link;
    this._isLiked = isLiked; // Initialize the like status
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeIcon = handleLikeIcon;
  }

  _setEventListeners() {
    const deleteButton = this._cardElement.querySelector(".card__trash-button");
    deleteButton.addEventListener("click", () => {
      if (typeof this._handleDeleteClick === "function") {
        this._handleDeleteClick(); // Call the handleDeleteClick callback
      }
    });

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      if (typeof this._handleImageClick === "function") {
        this._handleImageClick(this._link, this._name);
      }
    });

    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      if (typeof this._handleLikeIcon === "function") {
        this._handleLikeIcon(!this._isLiked); // Toggle the like status
      }
    });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardTitle = this._cardElement.querySelector(".card__header");
    const cardImage = this._cardElement.querySelector(".card__image");
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    // Set initial like status
    this._renderLikes();

    this._setEventListeners();

    return this._cardElement;
  }

  // Method to update the like status
  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
  }

  // Method to get the current like status
  isLiked() {
    return this._isLiked;
  }

  // Method to render the like button state based on the current like status
  _renderLikes() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._isLiked) {
      likeButton.classList.add("card__like-button_filled");
    } else {
      likeButton.classList.remove("card__like-button_filled");
    }
  }
}
