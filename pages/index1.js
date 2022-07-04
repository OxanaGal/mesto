import {
  initialCards,
  validationConfig,
  cardTemplateSelector,
  cardsListSelector,
  profileFormSelector,
  cardFormSelector,
  previewModal,
  profileFormNameSelector,
  profileFormInfoSelector,
  cardFormNameSelector,
  cardFormLinkSelector,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

/* Редактирование профиля */

const userProfile = new UserInfo(profileFormNameSelector, profileFormInfoSelector);

/* Попап формы редактирования профиля */

const handleProfileSubmit = (data) =>{
  userProfile.setUserInfo(data);
};

const profilePopup = new PopupWithForm(profileFormSelector, handleProfileSubmit);
profilePopup.setEventListeners();

const handleProfilePopupOpen = () =>{
  profilePopup.getUserInfo();
  profilePopup.open();
};

/* Попап окна просмотра карточки */

//сначала создаем попап для просмотра карточки,
// так как нам нужна эта функция при создании карточки

const previewImageModal = new PopupWithImage(previewModal);
previewImageModal.setEventListeners();

const handleCardClick = (name, link) => {

  previewImageModal.open(name, link);
};

/* Добавление карточек на страницу */

// Создание элемента карточки

function createCard(item) {
  const cardItem = new Card(item, cardTemplateSelector, handleCardClick);
  return cardItem.generateCard();
};

// Отрисовываем начальный блок карточек из массива

const cardsContainer = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    createCard(item)
  },
}, cardsListSelector);

cardsContainer.render();

/* Попап формы добавления карточки */

const handleCardSubmit = (item) => {

  cardsContainer.addItem(item);
};

const newCardPopup = new PopupWithForm(cardFormSelector, handleCardSubmit);
newCardPopup.setEventListeners();


const handleAddCardOpen = () =>{

  newCardPopup.open();
}

/* Валидация форм */

const formValidators = {}

Array.from(document.forms).forEach((formElement) => {
  formValidators[formElement.name] = new FormValidator(validationConfig, formElement);
  formValidators[formElement.name].enableValidation();
});

/* Обработка событий */
