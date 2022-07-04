import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.preview__image');
    this._figcaption = this._popup.querySelector('.preview__description');
    this.open = this.open.bind(this);
    console.log(this._image)
  };
  /* должен перезаписать родительский open */

  open(name, link) {
    console.log(this._image.src)
    this._image.src = link;
    this._image.alt = name;
    this._figcaption.textContent = name;
    super.open();
  };
}
