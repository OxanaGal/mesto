const popUp = document.querySelector('.popup');

/* Форма профиля */
const popupEditProfile = document.querySelector('.popup_view_profile-form');
const nameInput = popupEditProfile.querySelector('.form__text-name');
const jobInput = popupEditProfile.querySelector('.form__text-info');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

/* Форма карточек*/
const cardForm = document.querySelector('.popup_view_card-form');
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
const profileFormCloseBtn = popupEditProfile.querySelector('.popup__btn_action_close');
const cardFormCloseBtn = cardForm.querySelector('.popup__btn_action_close');
const previewCloseBtn = previewModal.querySelector('.popup__btn_action_close');

/* Открытие и закрытие попапа */
const openPopup = (currentModal) => { currentModal.classList.add('opened'); }

const closePopup = (currentModal) => { currentModal.classList.remove('opened'); }

/* Редактирование профиля*/

const openEditProfileForm = () => {

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
}

const submitFormHandler = (event) => {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

/* Добавление карточек */

const addCard = (titleValue, linkValue) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardTitle.textContent = titleValue;
  cardImage.alt = titleValue;
  cardImage.src = linkValue;

  /*cardElement.querySelector('.card__btn_action_like').addEventListener('click', (event) => {
    event.target.classList.toggle('card__btn_action_liked');
  });*/

  /* cardElement.querySelector('.card__btn_action_delete').addEventListener('click', (event) => {
     event.target.closest('.card').remove();
   });*/

  cardImage.addEventListener('click', () => {
    openPopup(previewModal)

    imagePreview.src = cardImage.src;
    imagePreview.alt = cardTitle.textContent;
    titlePreview.textContent = cardTitle.textContent;
  });

  return cardElement;
}

const renderNewCard = (cardList, titleValue, linkValue) => { cardList.prepend(addCard(titleValue, linkValue)); }

initialCards.forEach((element) => {
  renderNewCard(cardList, element.name, element.link)
});

const addNewCard = (event) => {
  event.preventDefault();

  renderNewCard(cardList, titleInput.value, linkInput.value);

  closePopup(cardForm);

  event.target.reset();
}

/*Функционал карточек*/
const likeCard = (event) => {
  if (event.target.classList.contains('card__btn_action_like')) {
    event.target.classList.toggle('card__btn_action_liked');
  }
}

const deleteCard = (event) => {
  if (event.target.classList.contains('card__btn_action_delete')) {
    event.target.closest('.card').remove();
  }
}


/* Обработка событий */
popupOpenBtn.addEventListener('click', openEditProfileForm);
popupAddCard.addEventListener('click', () => openPopup(cardForm));



profileFormCloseBtn.addEventListener('click', () => closePopup(popupEditProfile));
cardFormCloseBtn.addEventListener('click', () => closePopup(cardForm));
previewCloseBtn.addEventListener('click', () => closePopup(previewModal));

cardList.addEventListener('click', likeCard);
cardList.addEventListener('click', deleteCard);

popupEditProfile.addEventListener('submit', submitFormHandler);
cardForm.addEventListener('submit', addNewCard);
