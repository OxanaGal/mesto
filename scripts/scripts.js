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
const previewModal = document.querySelector('.popup_view_image');
const imagePreview = previewModal.querySelector('.preview__image');
const titlePreview = previewModal.querySelector('.preview__description');


/* Контент страницы */
const cardContainer = document.querySelector('.cards');
const cardList = cardContainer.querySelector('.cards__list');

/* Кнопки */
const popupOpenBtn = document.querySelector('.profile__btn_action_edit');
const popupAddCard = document.querySelector('.profile__btn_action_add');
const editProfileCloseBtn = popupEditProfile.querySelector('.form__btn_action_close');
const addCardCloseBtn = cardForm.querySelector('.form__btn_action_close');
const previewCloseBtn = previewModal.querySelector('.form__btn_action_close');

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
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardTitle.textContent = titleValue;
  cardImage.alt = titleValue;
  cardImage.src = linkValue;

  cardElement.querySelector('.card__btn_action_like').addEventListener('click', (event) =>{
    event.target.classList.toggle('card__btn_action_liked');
  });

  cardElement.querySelector('.card__btn_action_delete').addEventListener('click', (event) => {
    event.target.closest('.card').remove();
  });

  cardImage.addEventListener('click', () => {
    openPopup(previewModal)

    imagePreview.src = cardImage.src;
    imagePreview.alt = cardTitle.textContent;
    titlePreview.textContent = cardTitle.textContent;
  });

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

  event.target.reset();
}

/* Окно просмотра */


/* Обработка событий */
popupOpenBtn.addEventListener('click', openEditProfileForm);
popupAddCard.addEventListener('click', () => openPopup(cardForm));

editProfileCloseBtn.addEventListener('click', (event) => {
  const currentPopup = event.target.closest('.popup');
  currentPopup.classList.remove('opened');
});



popupEditProfile.addEventListener('submit', formSubmitHandler);
cardForm.addEventListener('submit', addNewCard);
