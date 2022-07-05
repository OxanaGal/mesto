import {
  initialCards,
  validationConfig,
  cardTemplateSelector,
  cardsListSelector,
  profileFormSelector,
  cardFormSelector,
  previewModal,
  profileOpenBtn,
  cardAddBtn,
  profileEditForm,
  cardAddForm,
  nameInput,
  jobInput,
  profileTitleSelector,
  profileDescriptionSelector,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

/* Редактирование профиля */

const userProfile = new UserInfo({nameSelector: profileTitleSelector, infoSelector: profileDescriptionSelector});
console.log(`'объект для профиля ${userProfile}'`)
/* Попап формы редактирования профиля */

const handleProfilePopupOpen = () =>{

  profileFormValidation.cleanForm();

  const userData = userProfile.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;


  profilePopup.open();
};

const handleProfileSubmit = (userData) =>{
  userProfile.setUserInfo(userData);
};

const profilePopup = new PopupWithForm(profileFormSelector, (inputValues) =>{
  handleProfileSubmit(inputValues);
  profilePopup.close();
} );
profilePopup.setEventListeners();



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
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsContainer.addItem(cardElement);
  }
}, cardsListSelector);

cardsContainer.render();

/* Попап формы добавления карточки */

const handleCardSubmit = (item) => {
  console.log(`'объект для карточки ${item}'`)
  cardsContainer.addItem(item);
};

const newCardPopup = new PopupWithForm(cardFormSelector, handleCardSubmit);
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

/*const formValidators = {}

Array.from(document.forms).forEach((formElement) => {
  formValidators[formElement.name] = new FormValidator(validationConfig, formElement);
  formValidators[formElement.name].enableValidation();
});*/

/* Обработка событий */

profileOpenBtn.addEventListener('click', () =>{
  console.log(profileEditForm)

  handleProfilePopupOpen();
});
cardAddBtn.addEventListener('click', () =>{

  handleAddCardOpen();
});

profileEditForm.addEventListener('submit', handleProfileSubmit);
cardAddForm.addEventListener('submit', handleCardSubmit);
