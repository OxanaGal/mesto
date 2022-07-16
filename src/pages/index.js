import './index.css';

import {
  api,
  initialCards,
  validationConfig,
  cardTemplateSelector,
  cardsListSelector,
  profileFormSelector,
  cardFormSelector,
  previewModal,
  avatarFormSelector,
  profileOpenBtn,
  cardAddBtn,
  avatarUpdateBtn,
  profileEditForm,
  avatarUpdateForm,
  cardAddForm,
  nameInput,
  jobInput,
  profileTitleSelector,
  profileDescriptionSelector,
  profileBtnCap,
  cardAddBtnCap,
  cardDelBtnCap
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';



/* Редактирование профиля */

const userProfile = new UserInfo({nameSelector: profileTitleSelector, infoSelector: profileDescriptionSelector, avatarSelector: '.profile__image'});

/* Попап формы редактирования профиля */

const handleProfilePopupOpen = () =>{

  const userData = userProfile.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;

  profileFormValidation.cleanForm();

  profilePopup.open();
};

/*const handleProfileSubmit = (userData) =>{
  userProfile.setUserInfo(userData);
};*/

const profilePopup = new PopupWithForm(profileFormSelector, (inputValues) =>{
  console.log(inputValues)
  api.patchUserProfile(inputValues)
  .then((res) => {
    userProfile.setUserInfo(res)
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    profilePopup.close();
  })
 // handleProfileSubmit(inputValues);

}, profileBtnCap );
profilePopup.setEventListeners();


/* Попап формы редактирования аватара*/

const handleAvatarPopupOpen = () =>{

  avatarFormValidation.cleanForm();
  avatarPopup.open();
}

const avatarPopup = new PopupWithForm(avatarFormSelector, (inputValues) => {

  api.patchUserAvatar(inputValues)

  .then((res) =>{
    avatarPopup._toggleBtnCaption(true); // поглядеть в продлёнке как меняли
    userProfile.setUserInfo(res);

  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    avatarPopup.close();
    avatarPopup._toggleBtnCaption(true);
  })

}, profileBtnCap);
avatarPopup.setEventListeners();



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

  const cardItem = new Card(item, userProfile.getUserId(), cardTemplateSelector, {
    handleCardClick: handleCardClick,
    /*handleCardDelete: handleCardDelete,
  handleLikeCard: handleLikeCard*/});

  return cardItem.generateCard();
};

// Отрисовываем начальный блок карточек из массива

const cardsContainer = new Section({
    renderer: (item) => {
    cardsContainer.addItem(createCard(item));
  }
}, cardsListSelector);

//cardsContainer.renderItems();

/* Попап формы добавления карточки */

const handleCardSubmit = (item) => {

  cardsContainer.addItem(createCard(item));

};

const newCardPopup = new PopupWithForm(cardFormSelector, (item) => {

  api.postNewCard(item)
  .then((res) => {
    cardsContainer.addItem(createCard(item));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    newCardPopup.close();
  })

  //handleCardSubmit(item);

}, cardAddBtn);
newCardPopup.setEventListeners();


const handleAddCardOpen = () =>{
  cardFormValidation.cleanForm();
  newCardPopup.open();
}

/* Валидация форм */

const profileFormValidation = new FormValidator(validationConfig, profileEditForm);
profileFormValidation.enableValidation();

const cardFormValidation = new FormValidator(validationConfig, cardAddForm);
cardFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(validationConfig, avatarUpdateForm);
avatarFormValidation.enableValidation();

/*const formValidators = {}

Array.from(document.forms).forEach((formElement) => {
  formValidators[formElement.name] = new FormValidator(validationConfig, formElement);
  formValidators[formElement.name].enableValidation();
});*/

/* Обработка событий */

profileOpenBtn.addEventListener('click', handleProfilePopupOpen);

cardAddBtn.addEventListener('click', handleAddCardOpen);

avatarUpdateBtn.addEventListener('click', handleAvatarPopupOpen)

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([user, cards]) => {
  if (user){
    userProfile.setUserInfo(user);
  } else{
    console.log('Нет данных пользователя');
  }

  if(cards){
    cardsContainer.renderItems(cards);
  } else {
    console.log('Нет данных для отрисовки карточки')
  }

})
.catch((err) => {
  console.log(err);
})
.finally(() =>{
 // cardsContainer.renderItems(cards);
})
