export default class Card {
  constructor(
    { name, link, _id, likes },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    api
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes || [];
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._api = api;
    this._isLiked = this._likes.length > 0; // assuming the card is liked if there are any likes
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
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

  _handleLikeIcon() {
    if (this.isLiked()) {
      this._dislikeCard();
    } else {
      this._likeCard();
    }
  }

  _likeCard() {
    this._api
      .likeCard(this._id)
      .then((data) => {
        this.setIsLiked(true);
        this._likes = data.likes;
        this._renderLikes();
      })
      .catch((err) => console.error(err));
  }

  _dislikeCard() {
    this._api
      .dislikeCard(this._id)
      .then((data) => {
        this.setIsLiked(false);
        this._likes = data.likes;
        this._renderLikes();
      })
      .catch((err) => console.error(err));
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

  _handleDeleteCard() {
    if (typeof this._handleDeleteClick === "function") {
      this._handleDeleteClick(this._id, this._cardElement);
    }
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardTitle = this._cardElement.querySelector(".card__header");
    cardTitle.textContent = this._name;

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._renderLikes();
    this._setEventListeners();

    return this._cardElement;
  }
}
