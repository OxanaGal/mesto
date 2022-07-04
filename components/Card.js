export default class Card {
  constructor({name, link}, templateSelector, handleCardClick) {
    this._cardLink = link;
    this._cardName = name;

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
  };


  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card').cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._card = this._getTemplate();

    this._cardTitle = this._card.querySelector('.card__title');
    this._cardImage = this._card.querySelector('.card__image');

    this._likeButton = this._card.querySelector('.card__btn_action_like');
    this._deleteButton = this._card.querySelector('.card__btn_action_delete');

    this._cardTitle.textContent = this._cardName;
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;

    this._setEventListeners();

    return this._card;
  };

  _likeCard = () => {
    this._likeButton.classList.toggle('card__btn_action_liked');
  };

  _deleteCard = () => {
    this._card.remove();
  };

  _previewCard = () => {

    this._handleCardClick(this._cardName, this._cardLink);
  };

  _setEventListeners = () => {
    this._likeButton.addEventListener('click', this._likeCard);
    this._deleteButton.addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', this._previewCard);
  };

}


