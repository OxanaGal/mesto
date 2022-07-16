import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, {normalCaption, activeCaption}) {
    super(popupSelector);
    this._submitFunc = submitCallback;
    this._form = this._popup.querySelector('.form');
    this.close = this.close.bind(this);
    this._inputList = this._form.querySelectorAll('.form__item');
    this._normalCaption = normalCaption;
    this._activeCaption = activeCaption;
    this._submitBtnElement = this._form.querySelector('.popup__btn_action_save')
  };

  _getInputValues = () => {

    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;

    });

    return this._inputValues;
  };

  _toggleBtnCaption(isSaving){
    this._submitBtnElement.textContent = isSaving ? this._activeCaption : this._normalCaption;
  }
  /* перезвписывает родительский _setEventListeners */
  setEventListeners() {

    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);

  };

  _handleFormSubmit = (event) => {
    event.preventDefault();

    this._submitFunc(this._getInputValues(), this._toggleBtnCaption);
  }

  /* перезаписывает родительский close */
  close() {

    super.close();
    this._form.reset(); //форма?
  };
}
