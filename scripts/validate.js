const config = {
  formSelector: 'form',
  inputSelector: 'form__item',
  submitButtonSelector: 'popup__btn_action_save',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}

/*Ошибки*/
const showInputError = (formElement, inputElement, errorMessage, inputErrorModifier, errorSelector) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorModifier);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorSelector);
};

const hideInputError = (formElement, inputElement, inputErrorModifier, errorSelector) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorModifier);
  errorElement.classList.remove(errorSelector);
  errorElement.textContent = '';
};

/*Валидация*/

const checkInputValidity = (formElement, inputElement, inputErrorModifier, errorSelector) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorModifier, errorSelector);
  } else {
    hideInputError(formElement, inputElement, inputErrorModifier, errorSelector);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/*Отключение кнопки*/
const toggleButtonState = (inputList, buttonElement, disabledSelector) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(disabledSelector);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(disabledSelector);
    buttonElement.disabled = false;
  }
};

/*Вешаем слушатели*/

const setEventListeners = (formElement, validConfig) => {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = validConfig;
  const inputList = Array.from(formElement.querySelectorAll(`.${inputSelector}`));
  const buttonElement = formElement.querySelector(`.${submitButtonSelector}`);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};

/*Запуск валидации*/

const enableValidation = (validationConfig) => {
  const { formSelector } = validationConfig;

  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(config);
