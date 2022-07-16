export default class Card {
  constructor({ name, link, _id, likes, owner: { _id: ownerId } }, userId, templateSelector, { handleCardClick, handleCardDelete, handleLikeCard }) {
    this._cardLink = link;
    this._cardName = name;
    this._id = _id;
    this._likes = likes;
    this._isOwner = userId === ownerId;
    this._userId = userId;

    this._templateSelector = templateSelector;

    this._cardClickFunc = handleCardClick;
    this._cardDeleteFunc = handleCardDelete;
    this._cardLikeFunc = handleLikeCard;
  };


  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card').cloneNode(true);

    return cardElement;
  };

  generateCard = () => {
    this._card = this._getTemplate();

    this._cardTitle = this._card.querySelector('.card__title');
    this._cardImage = this._card.querySelector('.card__image');

    this._likeButton = this._card.querySelector('.card__btn_action_like');
    this._deleteButton = this._card.querySelector('.card__btn_action_delete');
    this._likeCounter = this._card.querySelector('.card__like-counter');

    this._cardTitle.textContent = this._cardName;
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;

    this._renderLikes();

    this._setEventListeners();

    return this._card;
  };

  _isLiked = () => {
    return this._likes.map((item) => item._id).includes(this._userId);
  }

  _renderLikes = () => {
    if (this._isLiked()) {
      this._likeButton.classList.add('card__btn_action_liked');
    } else {
      this._likeButton.classList.remove('card__btn_action_liked');
    }

    this._likeCounter.textContent = this._likes.length;
  }

  setLikes = (likesArray) => {
    this._likes = likesArray;
    this._renderLikes();
  }

  _likeCard = () => {
    this._cardLikeFunc(this._id, this._isLiked(), this.setLikes)
    this._likeButton.classList.toggle('card__btn_action_liked');
  };

  _deleteCard = () => {
    this._card.remove();
    this._card = null;
  };

  _previewCard = () => {

    this._cardClickFunc(this._cardName, this._cardLink);
  };

  _handleDeleteClick = () => {
    this._cardDeleteFunc(this._id, this._deleteCard);
  }

  _setEventListeners = () => {
    this._likeButton.addEventListener('click', this._likeCard);

    if (this._isOwner) {
      //  this._deleteButton.addEventListener('click', this._deleteCard);

      this._deleteButton.addEventListener('click', this._handleDeleteClick);
    } else {
      this._deleteButton.remove();
    }

    this._cardImage.addEventListener('click', this._previewCard);
  };

}


