export default class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._nameField = document.querySelector(nameSelector);
    this._infoField = document.querySelector(infoSelector);
  }

  getUserInfo() {

    this._data = {};

    this._data.name = this._nameField.textContent;
    this._data.info = this._infoField.textContent;
    console.log(this._data)
    return this._data ;
  }

  setUserInfo(data) {
    console.log(data)
    this._nameField.textContent = data.name;
    this._infoField.textContent = data.info;
  }
}
