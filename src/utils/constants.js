import Api from '../components/Api';

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: 'f4adbd05-b875-4ca6-87f0-5ee77caa205a',
    'Content-Type': 'application/json'
  }
});

/* Конфиг валидации */

export const validationConfig = {
  inputSelector: 'form__item',
  submitButtonSelector: 'popup__btn_action_save',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
};

/* Текст кнопок */

export const profileBtnCap = {
  defaultTextDisplay: 'Сохранить',
  progressTextDisplay: 'Сохранение...'
}
export const cardAddBtnCap = {
  defaultTextDisplay: 'Создать',
  progressTextDisplay: 'Создаю...'
}
export const cardDelBtnCap = {
  defaultTextDisplay: 'Да',
  progressTextDisplay: 'Удаляю...'
}

/* Селекторы профиля */

export const profileTitleSelector = '.profile__title';
export const profileDescriptionSelector = '.profile__description';

/* Селекторы карточек */
export const cardTemplateSelector = '#card-template';
export const cardsListSelector = '.cards__list';

/* Селекторы попапов */
export const profileFormSelector = '.popup_view_profile-form';
export const cardFormSelector = '.popup_view_card-form';
export const previewModal = '.popup_view_image';
export const avatarFormSelector = '.popup_view_avatar-form';
export const cardDelConfirmSelector = '.popup_view_delete-comfirmation';

/* Попапы */

const popupEditProfile = document.querySelector('.popup_view_profile-form');
const cardEditForm = document.querySelector('.popup_view_card-form');
const avatarEditForm = document.querySelector('.popup_view_avatar-form');


/* Формы */

export const profileEditForm = popupEditProfile.querySelector('.form');
export const cardAddForm = cardEditForm.querySelector('.form');
export const avatarUpdateForm = avatarEditForm.querySelector('.form');

/* Селекторы полей */

export const profileFormNameSelector = '.form__text-name';
export const profileFormInfoSelector = '.form__text-info';
export const cardFormNameSelector = '.form__card-title';
export const cardFormLinkSelector = '.form__card-link';


/* Поля форм */

export const nameInput = profileEditForm.querySelector('.form__text-name');
export const jobInput = profileEditForm.querySelector('.form__text-info');

/* Кнопки */

export const profileOpenBtn = document.querySelector('.profile__btn_action_edit');
export const cardAddBtn = document.querySelector('.profile__btn_action_add');
export const avatarUpdateBtn = document.querySelector('.profile__avatar');
export const trashBtn = document.querySelector('.card__btn_action_delete')
