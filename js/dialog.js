'use strict';

(function () {
  var main = document.querySelector('main');

  var onSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);

    var removeDialog = function () {
      successElement.remove();

      successElement.removeEventListener('click', onDialogClick);
      document.removeEventListener('keydown', onDialogPressEsc);
    };

    var onDialogClick = function (evt) {
      if (!evt.target.classList.contains('success__message')) {
        removeDialog();
      }
    };

    var onDialogPressEsc = function (evt) {
      window.utils.isEscEvent(evt, removeDialog);
    };

    window.map.onMapDeactivate();

    successElement.addEventListener('click', onDialogClick);
    document.addEventListener('keydown', onDialogPressEsc);

    main.insertAdjacentElement('afterbegin', successElement);
  };

  var onError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);

    var removeDialog = function () {
      errorElement.remove();

      errorElement.removeEventListener('click', onDialogButtonClick);
      document.removeEventListener('keydown', onDialogPressEsc);
    };

    var onDialogButtonClick = function (evt) {
      if (!evt.target.classList.contains('error__message')) {
        removeDialog();
      }
    };

    var onDialogPressEsc = function (evt) {
      window.utils.isEscEvent(evt, removeDialog);
    };

    errorElement.querySelector('.error__message').textContent = errorMessage;

    errorElement.addEventListener('click', onDialogButtonClick);
    document.addEventListener('keydown', onDialogPressEsc);

    main.insertAdjacentElement('afterbegin', errorElement);
  };

  window.dialog = {
    onSuccess: onSuccess,
    onError: onError
  };
})();
