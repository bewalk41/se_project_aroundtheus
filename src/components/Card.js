export default class Card {
  constructor(
    { name, link, _id, likes = [] }, // Default to an empty array if likes is not provided
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._cardId = _id;
    this._likes = likes; // Initialize likes
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    const deleteButton = this._cardElement.querySelector(".card__trash-button");
    deleteButton.addEventListener("click", () => {
      if (typeof this._handleDeleteClick === "function") {
        this._handleDeleteClick(this._cardId, this._cardElement);
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
      if (typeof this._handleLikeClick === "function") {
        this._handleLikeClick(
          this._cardId,
          this._isLiked(),
          this._toggleLikeIcon.bind(this)
        );
      }
    });
  }

  _isLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  _toggleLikeIcon() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.classList.toggle("card__like-button_active");
  }

  getView(userId) {
    this._userId = userId; // Store the userId for like checking
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardTitle = this._cardElement.querySelector(".card__header");
    cardTitle.textContent = this._name;

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._isLiked()) {
      likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners();

    return this._cardElement;
  }
}
