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
const cardElement = document.querySelector('.popup_view_card-form');

/*Просмотр карточек */

/* Контент страницы */
const cardContainer = document.querySelector('.cards');
const cardList = cardContainer.querySelector('.cards__list');

/* Функционал попапа */
function openPopup(){
  popupEditProfile.classList.add('opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function closePopup(){
  popupEditProfile.classList.remove('opened')
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

/* Добавление карточек */

function addCard(titleValue, linkValue){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const trashBtn = cardTemplate.querySelector('.card__btn_action_delete');

  trashBtn.addEventListener('click', function(event){
    event.target.closest('.card').remove();
  });

  cardElement.querySelector('.card__title').textContent = titleValue;
  cardElement.querySelector('.card__image').alt = titleValue;
  cardElement.querySelector('.card__image').src = linkValue;

  return cardElement;
}

function renderNewCard(cardList, titleValue, linkValue){
  cardList.prepend(addCard(titleValue, linkValue));
}

initialCards.forEach((initialCards) => {
  renderNewCard(cardList, initialCards.name, initialCards.link)
});

function addNewCard(event){
  /*const image = ;*/
  event.preventDefault();

  const title = event.target.cardTitle.value;
  const link = event.target.cardLink.value;

  renderNewCard(cardList, title, link);

  closePopup();

  event.target.cardTitle.value = '';
  event.target.cardLink.value = '';
}

/* Просмотр картинки */


/* Обработка событий */
popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);

popupAddCard.addEventListener('click', addNewCard);


popupEditProfile.addEventListener('submit', formSubmitHandler);
cardElement.addEventListener('submit', addNewCard);
