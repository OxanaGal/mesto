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
  cardDelConfirmSelector,
  profileOpenBtn,
  cardAddBtn,
  avatarUpdateBtn,
  trashBtn,
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
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';



/* Редактирование профиля */

const userProfile = new UserInfo({ nameSelector: profileTitleSelector, infoSelector: profileDescriptionSelector, avatarSelector: '.profile__image' });

/* Попап формы редактирования профиля */

const handleProfilePopupOpen = () => {

  const userData = userProfile.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;

  profileFormValidation.cleanForm();

  profilePopup.open();
};

const handleProfileSubmit = (userData) => {
  profilePopup._toggleBtnCaption(true);
  api.patchUserProfile(userData)
    .then((res) => {
      userProfile.setUserInfo(res)
    })
    .then(() => {
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup._toggleBtnCaption(false);
    })
};

const profilePopup = new PopupWithForm(profileFormSelector, (inputValues) => {

  handleProfileSubmit(inputValues);

}, profileBtnCap);
profilePopup.setEventListeners();


/* Попап формы редактирования аватара*/

const handleAvatarPopupOpen = () => {

  avatarFormValidation.cleanForm();
  avatarPopup.open();
}

const handleAvatarSubmit = (link) =>{
  avatarPopup._toggleBtnCaption(true);
  api.patchUserAvatar(link)
    .then((res) => {
      userProfile.setUserInfo(res);

    })
    .then(() => {
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup._toggleBtnCaption(false);//
    })
}


const avatarPopup = new PopupWithForm(avatarFormSelector, (inputValues) => {

  handleAvatarSubmit(inputValues);

}, profileBtnCap);
avatarPopup.setEventListeners();



/* Попап окна просмотра карточки */

//сначала создаем попап для просмотра карточки,
// так как нам нужна эта функция при создании карточки

const previewImageModal = new PopupWithImage(previewModal);
//previewImageModal.setEventListeners();

const handleCardClick = (name, link) => {

  previewImageModal.open(name, link);
};

const handleCardDelete = (cardId) => {
  api.deleteCard(cardId)
    .then((res) => {

    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupDeleteConf.close();
    })
}

const handleLikeCard = (cardId, isLiked, likeCardFunc) => {
  api.toggleLike(cardId, isLiked)
    .then(({ likes }) => {
      likeCardFunc(likes);
    })
    .catch((err) => {
      console.log(err);
    })
}

/* Попап удаления карточки*/

const popupDeleteConf = new PopupWithConfirmation(cardDelConfirmSelector, () => {

})
//popupDeleteConf.addEventListener();

/* Добавление карточек на страницу */

// Создание элемента карточки

function createCard(item) {

  const cardItem = new Card(item, userProfile.getUserId(), cardTemplateSelector, {
    clickCardCallback: handleCardClick,
    deleteCardCallback: handleCardDelete,
    likeCardCallback: handleLikeCard
  });

  return cardItem.generateCard();
};

// Отрисовываем начальный блок карточек из массива

const cardsContainer = new Section({
  renderer: (item) => {
    cardsContainer.addItem(createCard(item), 'append');
  }
}, cardsListSelector);

//cardsContainer.renderItems();

/* Попап формы добавления карточки */

const handleCardSubmit = (item) => {
  newCardPopup._toggleBtnCaption(true);
  api.postNewCard(item)
    .then((res) => {

      cardsContainer.addItem(createCard(res));
    })
    .then(() => {


    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newCardPopup.close();
      newCardPopup._toggleBtnCaption(false);
    })
  cardsContainer.addItem(createCard(item));

};

const newCardPopup = new PopupWithForm(cardFormSelector, (item) => {

  handleCardSubmit(item);

}, cardAddBtn);
newCardPopup.setEventListeners();


const handleAddCardOpen = () => {
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

//trashBtn.addEventListener('click', )

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    if (user) {
      userProfile.setUserInfo(user);
    } else {
      console.log('Нет данных пользователя');
    }

    if (cards) {
      cardsContainer.renderItems(cards);
    } else {
      console.log('Нет данных для отрисовки')
    }

  })
  .catch((err) => {
    console.log(err);
  })
