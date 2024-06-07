export default class Card {
  constructor(
    { name, link, _id, likes = [], isLiked = false },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeIcon
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeIcon = handleLikeIcon;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListener() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon(this._id, this._isLiked, this);
      });

    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    const cardImageEl = this._cardElement.querySelector(".card__image");
    cardImageEl.addEventListener("click", () => {
      if (typeof this._handleImageClick === "function") {
        this._handleImageClick(this._link, this._name);
      }
    });
  }

  _handleDeleteCard() {
    if (typeof this._handleDeleteClick === "function") {
      this._handleDeleteClick(this._id, this._cardElement);
    }
  }

  getView() {
    this._cardElement = this._getTemplate();

    const cardTitle = this._cardElement.querySelector(".card__header");
    cardTitle.textContent = this._name;

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._setEventListener();
    this._renderLikes(); // Render initial likes

    return this._cardElement;
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
  }

  isLiked() {
    return this._isLiked;
  }

  _renderLikes() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._isLiked) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  }
}
