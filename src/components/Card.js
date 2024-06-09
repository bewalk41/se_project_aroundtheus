export default class Card {
  constructor(
    { _id, name, link, likes = [], owner },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    const deleteButton = this._cardElement.querySelector(".card__trash-button");
    deleteButton.addEventListener("click", () => {
      if (typeof this._handleDeleteClick === "function") {
        this._handleDeleteClick(this._id, this._cardElement);
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
        Promise.resolve(
          this._handleLikeClick(this._id, this.isLiked(), this)
        ).catch((error) => {
          console.error("Error occurred while handling like click:", error);
        });
      } else {
        console.error("handleLikeClick function is not defined.");
      }
    });
  }

  isLiked() {
    return this._isLiked;
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._isLiked) {
      likeButton.classList.add("card__like-button_filled");
    } else {
      likeButton.classList.remove("card__like-button_filled");
    }
  }

  getView(userId) {
    this._userId = userId;
    this._isLiked = this._likes.some((like) => like._id === this._userId); // Initialize _isLiked
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardTitle = this._cardElement.querySelector(".card__header");
    const cardImage = this._cardElement.querySelector(".card__image");
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._renderLikes(); // Render initial likes state
    this._setEventListeners();

    return this._cardElement;
  }
}
