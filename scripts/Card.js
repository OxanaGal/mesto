export default class Card {
  constuctor({name, link}, templateSelector) {
    this._cardLink = link;
    this._cardName = name;

    this._templateSelector = templateSelector;
  };

  _getTemplate = () => {
    console.log(this._templateSelector);
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.
    querySelector('.card').cloneNode(true);

    return cardElement;
  };

  generateCard = () => {
    this._card = this._getTemplate();

    this._card.querySelector('.card__title').textContent =  this._cardName;

    const cardImage = this._card.querySelector('.card__image');

    cardImage.src = this._cardLink;
    cardImage.alt = this._cardName;

    this._setEventListeners();

    return this._card;
  };

  _likeCard = () => {
    this._card.querySelector('.card__btn_action_like').classList.toggle('card__btn_action_liked');
  };

  _deleteCard = () => {
    this._card.remove();
  };

  /*
  _previewCard = () => { /*дописать
    imagePreview.src = this._cardLink;
    imagePreview.alt = this._cardName;
    titlePreview.textContent = this._cardName;

    openPopup(previewModal);
  };*/

  _setEventListeners = () => {
    this._card.querySelector('.card__btn_action_like').addEventListener('click', this._likeCard);
    this._card.querySelector('.card__btn_action_delete').addEventListener('click', this._deleteCard);
    this._card.querySelector('.card__image').addEventListener('click', this._previewCard);
  };

}
