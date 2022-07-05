export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector('.popup__btn_action_close');
  };

  open() {

    this._popup.addEventListener('mousedown', this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup__opened');
  };

  close() {

    this._popup.classList.remove('popup__opened');
    this._popup.removeEventListener('mousedown', this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose = (event) => {

    if (event.key === 'Escape') {
      this.close();
    }
  };

  _handleOverlayClose = (event) => {

    if (event.target === event.currentTarget || event.target.classList.contains('popup__btn_action_close')) {
      this.close();
    }
  };

  setEventListeners() {

    this._popupCloseBtn.addEventListener('click', this.close);
  };

}
