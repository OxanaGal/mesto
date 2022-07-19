import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitCallback, { defaultTextDisplay, progressTextDisplay }) {
    super(popupSelector, submitCallback);
    this._form = this._popup.querySelector('.form');
    this._submitBtnElement = this._form.querySelector('.popup__btn_action_save');
    this._defaultTextDisplay = defaultTextDisplay;
    this._progressTextDisplay = progressTextDisplay;
    this._submitFunc = submitCallback;
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    this._submitFunc(this._cardId, this._deleteCardCallback);
  }

  toggleBtnText(isSaving) {
    this._submitBtnElement.textContent = isSaving ? this._progressTextDisplay : this._defaultTextDisplay;
  }

  setEventListeners = () => {
    this._form.addEventListener('submit', this._handleSubmit);
  };

  open(cardId, deleteCardCallback) {
    this._cardId = cardId;
    this._deleteCardCallback = deleteCardCallback;
    super.open();
  }
}
