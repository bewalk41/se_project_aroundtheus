export default class Card {
  constructor(
    { name, link },
    cardSelector,
    handleImageClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick; // Add handleDeleteClick callback
  }

  _setEventListener() {
    // Set event listener for the like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // Set event listener for the delete button
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    // Set event listener for the card image
    const cardImageEl = this._cardElement.querySelector(".card__image");
    cardImageEl.addEventListener("click", () => {
      if (typeof this._handleImageClick === "function") {
        this._handleImageClick(this._link, this._name);
      }
    });
  }

  _handleLikeIcon() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    // Check if handleDeleteClick callback is defined
    if (typeof this._handleDeleteClick === "function") {
      this._handleDeleteClick(); // Call handleDeleteClick callback
    }
  }

  getView() {
    // Clone the card template content
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // Set the card title
    const cardTitle = this._cardElement.querySelector(".card__header");
    cardTitle.textContent = this._name;

    // Set the card image source and alt text
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    // Set event listeners
    this._setEventListener();

    return this._cardElement;
  }
}
