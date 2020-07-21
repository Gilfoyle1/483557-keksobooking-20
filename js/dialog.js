'use strict';

(function () {
  var main = document.querySelector('main');

  var onSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);

    var removeDialog = function () {
      success.remove();

      success.removeEventListener('click', onDialogClick);
      document.removeEventListener('keydown', onDialogPressEsc);
    };

    var onDialogClick = function (evt) {
      if (!evt.target.classList.contains('success__message')) {
        removeDialog();
      }
    };

    var onDialogPressEsc = function (evt) {
      window.main.isEscEvent(evt, removeDialog);
    };

    window.map.onMapDeactivate();

    success.addEventListener('click', onDialogClick);
    document.addEventListener('keydown', onDialogPressEsc);

    main.insertAdjacentElement('afterbegin', success);
  };

  var onError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);

    var removeDialog = function () {
      error.remove();

      error.removeEventListener('click', onDialogButtonClick);
      document.removeEventListener('keydown', onDialogPressEsc);
    };

    var onDialogButtonClick = function (evt) {
      if (!evt.target.classList.contains('error__message')) {
        removeDialog();
      }
    };

    var onDialogPressEsc = function (evt) {
      window.main.isEscEvent(evt, removeDialog);
    };

    error.querySelector('.error__message').textContent = errorMessage;

    error.addEventListener('click', onDialogButtonClick);
    document.addEventListener('keydown', onDialogPressEsc);

    main.insertAdjacentElement('afterbegin', error);
  };

  window.dialog = {
    onSuccess: onSuccess,
    onError: onError
  };
})();
