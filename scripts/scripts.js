const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popUp = document.querySelector('.popup');

/* Кнопки */
const popupOpenBtn = document.querySelector('.profile__btn_action_edit');
const popupCloseBtn = document.querySelector('.form__btn_action_close');
const popupAddCard = document.querySelector('.profile__btn_action_add');

/* Форма профиля */
const popupEditProfile = document.querySelector('.popup_view_profile-form');
/*const profileElement = document.querySelector('.popup_edit_profile');*/
const nameInput = popupEditProfile.querySelector('.form__text-name');
const jobInput = popupEditProfile.querySelector('.form__text-info');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

/* Форма карточек*/
const cardForm = document.querySelector('.popup_view_card-form');
const titleInput = cardForm.querySelector('.form__card-title');
const linkInput = cardForm.querySelector('.form__image-link');
/*const cardTitle = document.querySelector();
const cardLink = document.querySelector();*/

/*Просмотр карточек */
const cardImage = document.querySelector('.card__image');
const cardTitle = document.querySelector('.card__title');
const previewModal = document.querySelector('.popup_view_image');

/* Контент страницы */
const cardContainer = document.querySelector('.cards');
const cardList = cardContainer.querySelector('.cards__list');

/* Открытие и закрытие попапа */
function openPopup(currentModal) {
  currentModal.classList.add('opened');
}

function closePopup(currentModal) {
  currentModal.classList.remove('opened');
}

/* Редактирование профиля*/

function openEditProfileForm() {
  openPopup(popupEditProfile);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function formSubmitHandler(event) {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

/* Добавление карточек */

function addCard(titleValue, linkValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = titleValue;
  cardElement.querySelector('.card__image').alt = titleValue;
  cardElement.querySelector('.card__image').src = linkValue;

  cardElement.querySelector('.card__btn_action_like').addEventListener('click', (event) =>{
    event.target.classList.toggle('card__btn_action_liked');
  });

  cardElement.querySelector('.card__btn_action_delete').addEventListener('click', (event) => {
    event.target.closest('.card').remove();
  });

  cardElement.querySelector('.card__image').addEventListener('click', () => openPopup(previewModal));

  return cardElement;
}

function renderNewCard(cardList, titleValue, linkValue) {
  cardList.prepend(addCard(titleValue, linkValue));
}

initialCards.forEach((initialCards) => {
  renderNewCard(cardList, initialCards.name, initialCards.link)
});

function addNewCard(event) {
  event.preventDefault();

  renderNewCard(cardList, titleInput.value, linkInput.value);

  closePopup(cardForm);

  titleInput.value = '';
  linkInput.value = '';
}

/* Окно просмотра */


/* Обработка событий */
popupOpenBtn.addEventListener('click', openEditProfileForm);
popupAddCard.addEventListener('click', () => openPopup(cardForm));

cardImage.addEventListener('click', (event) => {
  openPopup(previewModal);

});

popupCloseBtn.addEventListener('click', (event) => {
  const currentPopup = event.target.closest('.popup');
  currentPopup.classList.remove('opened');
});


popupEditProfile.addEventListener('submit', formSubmitHandler);
cardForm.addEventListener('submit', addNewCard);
