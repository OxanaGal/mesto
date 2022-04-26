const popupOpenBtn = document.querySelector('.profile__btn_action_edit');
const popup = document.querySelector('.form');
const popupCloseBtn = document.querySelector('.form__btn_action_close');

popupOpenBtn.addEventListener('click', function(){
  togglePopup()
});

popupCloseBtn.addEventListener('click', function(){
  togglePopup()
});

function togglePopup(){
  popup.classList.toggle('hidden')
};


const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__text-name');
const jobInput = formElement.querySelector('.form__text-info');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let profileTitle = document.querySelector('.profile__title');
    let profileDescription = document.querySelector('.profile__description');


    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
