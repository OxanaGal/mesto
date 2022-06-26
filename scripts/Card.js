//import { initialCards } from "../utils/constants.js";
export default class Card {
  constuctor({ name, link }, templateSelector) {
    this._cardLink = link;
    this._cardName = name;

    this._templateSelector = templateSelector;
  };


  _getTemplate() {
    console.log(this._templateSelector);
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card').cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._card = this._getTemplate();

    console.log(this._card)

    //this._card.querySelector('.card__title').textContent = this._cardName;

    //const cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');
    this._cardImage = this._card.querySelector('.card__image');

    this._likeButton = this._card.querySelector('.card__btn_action_like');
    this._deleteButton = this._card.querySelector('.card__btn_action_delete');

    this._cardTitle.textContext = this._cardName;
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

  /*
  _previewCard = () => { /*дописать


    openPopup(previewModal);
  };*/

  _setEventListeners = () => {
    this._likeButton.addEventListener('click', this._likeCard);
    this._deleteButton.addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', this._previewCard);
  };

}

/*initialCards.forEach((element) => {
  const cardItem = new Card(element.name, element.link, '#card-template');
  const card = cardItem.generateCard();
  document.querySelector('.cards__list').prepend(card);
});*/


