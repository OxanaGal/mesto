const popupOpenBtn = document.querySelector('.profile__btn_action_edit');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.form__btn_action_close');

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__text-name');
const jobInput = formElement.querySelector('.form__text-info');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function openPopup(){
  popup.classList.add('opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function closePopup(){
  popup.classList.remove('opened')
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
