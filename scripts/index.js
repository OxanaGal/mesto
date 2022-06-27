import { initialCards, validationConfig } from '../utils/constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

/* Форма профиля */

const popupEditProfile = document.querySelector('.popup_view_profile-form');
const profileForm = popupEditProfile.querySelector('.form');
const nameInput = popupEditProfile.querySelector('.form__text-name');
const jobInput = popupEditProfile.querySelector('.form__text-info');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

/* Форма карточек*/

const cardForm = document.querySelector('.popup_view_card-form');
const cardEditForm = cardForm.querySelector('.form');
const titleInput = cardForm.querySelector('.form__card-title');
const linkInput = cardForm.querySelector('.form__card-link');

/*Просмотр карточек */

const previewModal = document.querySelector('.popup_view_image');
const imagePreview = previewModal.querySelector('.preview__image');
const titlePreview = previewModal.querySelector('.preview__description');

/* Контент страницы */

const cardContainer = document.querySelector('.cards');
const cardList = cardContainer.querySelector('.cards__list');

/* Кнопки */

const popupOpenBtn = document.querySelector('.profile__btn_action_edit');
const popupAddCard = document.querySelector('.profile__btn_action_add');
const popupSaveBtn = cardForm.querySelector('.popup__btn_action_save');
const profileFormCloseBtn = popupEditProfile.querySelector('.popup__btn_action_close');
const cardFormCloseBtn = cardForm.querySelector('.popup__btn_action_close');
const previewCloseBtn = previewModal.querySelector('.popup__btn_action_close');

/* Открытие и закрытие попапа */

const openPopup = (currentModal) => {
  currentModal.classList.add('popup__opened');

  currentModal.addEventListener('mousedown', closeByOverlayClick);

  document.addEventListener('keydown', closebyEsc);
}

const closePopup = (currentModal) => {

  currentModal.classList.remove('popup__opened');

  currentModal.removeEventListener('mousedown', closeByOverlayClick);
  document.removeEventListener('keydown', closebyEsc);
}

const closebyEsc = (event) => {
  if (event.key === 'Escape') {

    const modal = document.querySelector('.popup__opened');

    closePopup(modal);
  }
};

const closeByOverlayClick = (event) => {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__btn_action_close')) {
    closePopup(event.currentTarget);
  }
}

const previewFullImage = (name, link) => {
  imagePreview.src = link;
  imagePreview.alt = name;
  titlePreview.textContent = name;
  openPopup(previewModal);
}

/* Редактирование профиля*/

const openEditProfileForm = () => {

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  formValidators[profileForm.name].cleanForm();

  openPopup(popupEditProfile);
}

const submitProfileFormHandler = (event) => {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

/* Добавление карточек */

function createCard(name, link) {
  const cardItem = new Card(name, link, '#card-template', previewFullImage);
  const card = cardItem.generateCard();
  return card;
};

function renderNewCard(card) {
  cardList.prepend(card);
}

initialCards.forEach((element) => {
  renderNewCard(createCard(element.name, element.link));
});

const addNewCard = (event) => {
  event.preventDefault();

  const newCard = createCard(titleInput.value, linkInput.value);

  renderNewCard(newCard);

  closePopup(cardForm);

  event.target.reset();
}

/* Валидация */

const formValidators = {}

Array.from(document.forms).forEach((formElement) => {
  formValidators[formElement.name] = new FormValidator(validationConfig, formElement);
  formValidators[formElement.name].enableValidation();
});

/* Обработка событий */

popupOpenBtn.addEventListener('click', openEditProfileForm);
popupAddCard.addEventListener('click', () => {
  formValidators[cardEditForm.name].cleanForm();
  openPopup(cardForm)
});

popupEditProfile.addEventListener('submit', submitProfileFormHandler);
cardForm.addEventListener('submit', addNewCard);
