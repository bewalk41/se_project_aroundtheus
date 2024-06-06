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
    this._handleDeleteClick = handleDeleteClick;
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

    this._setEventListeners();

    return this._cardElement;
  }
}
