import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitFunc = submitCallback;
    this._form = this._popup.querySelector('.form');
    this.close = this.close.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  };

  _getInputValues = () => {

    this._inputValues = {};

    this._inputList = Array.from(this._form.querySelectorAll('.form__item'));
    console.log(this._inputList)
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
      console.log(input.name)
    });

    console.log(this._inputValues)
    return this._inputValues;
  };

  /* перезвписывает родительский _setEventListeners */
  setEventListeners() {

    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(this._getInputValues())
      this._submitFunc(this._getInputValues());
    });

  };

  /* перезаписывает родительский close */
  close() {

    super.close();
    this._form.reset(); //форма?
  };
}
