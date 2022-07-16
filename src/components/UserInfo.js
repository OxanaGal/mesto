export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {

    this._nameField = document.querySelector(nameSelector);
    this._infoField = document.querySelector(infoSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo = () => {

    const data = {};

    data.name = this._nameField.textContent;
    data.about = this._infoField.textContent;
    data.avatar = this._userAvatar.src;

    return data;
  }

  setUserInfo = ({ name, about, avatar, _id }) => {

    this._nameField.textContent = name;
    this._infoField.textContent = about;
    this._userAvatar.src = avatar;
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;
  }

  getUserAvatar(){
    return {
      avatar: this._avatar
    }
  }

  getUserId(){
    return this._id;
  }


}
