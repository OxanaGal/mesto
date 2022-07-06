import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.preview__image');
    this._figcaption = this._popup.querySelector('.preview__description');

  };
  /* должен перезаписать родительский open */

  open(name, link) {

    this._image.src = link;
    this._image.alt = name;
    this._figcaption.textContent = name;
    super.open();
  };
}
