import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector, submitCallback);
    this._form = this._popup.querySelector('.form');
    this._submitFunc = submitCallback;
   // this._submitBtn = this._popup.querySelector('.popup__btn_action_submit');
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    this._submitFunc(this._toggleBtnCaption);
  }

  setEventListeners = () => {

    this._form.addEventListener('submit', this._handleSubmit);
  };
}
