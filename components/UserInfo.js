export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._nameField = document.querySelector(nameSelector);
    this._infoField = document.querySelector(infoSelector);
  }

  getUserInfo() {

    const data = {};

    this._data.name = this._nameField.textContent;
    this._data.info = this._infoField.textContent;

    return data;
  }

  setUserInfo(data) {

    this._nameField.textContent = data.name;
    this._infoField.textContent = data.info;
  }
}
