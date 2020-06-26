'use strict';

(function () {
  var COUNT = 8;
  var LEFT_BUTTON_MOUSE = 1;

  var PinMain = {
    WIDTH: 65,
    HEIGHT: 65,
    X: 570,
    Y: 375
  };

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var formElements = document.querySelectorAll('.map__filter, fieldset');

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('input[name=address]');

  var toggleDisabledElements = function () {
    formElements.forEach(function (formElement) {
      formElement.disabled = !formElement.disabled;
    });
  };

  var getPinCoordinates = function () {
    var x = map.classList.contains('map--faded') ? PinMain.X + PinMain.WIDTH / 2 : PinMain.X + Pin.WIDTH / 2;
    var y = map.classList.contains('map--faded') ? PinMain.Y + PinMain.HEIGHT / 2 : PinMain.Y + Pin.HEIGHT;

    return x + ', ' + y;
  };

  var onPinClick = function (evt) {
    if (evt.which === LEFT_BUTTON_MOUSE) {
      activateMap();
    }
  };

  var getAddressValue = function () {
    adFormAddress.value = getPinCoordinates();
  };

  var onPinEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, activateMap);
  };

  var onAdOpen = function (ad) {
    onCardRemove();
    window.card.render(ad);
  };

  var onCardEscPress = function (evt) {
    window.utils.isEscEvent(evt, onCardRemove);
  };

  var removePinActive = function () {
    var pins = map.querySelectorAll('.map__pin');

    pins.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  var onCardRemove = function () {
    var card = map.querySelector('.map__card');

    if (card) {
      var popupClose = card.querySelector('.popup__close');

      card.remove();

      popupClose.removeEventListener('click', onCardRemove);
      document.removeEventListener('keyup', onCardEscPress);
    }
    removePinActive();
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    toggleDisabledElements();
    getAddressValue();
    window.pin.render(COUNT);
    window.form.addValidation();

    mapPinMain.removeEventListener('mousedown', onPinClick);
    mapPinMain.removeEventListener('keyup', onPinEnterPress);
  };

  toggleDisabledElements();
  getAddressValue();

  mapPinMain.addEventListener('mousedown', onPinClick);
  mapPinMain.addEventListener('keyup', onPinEnterPress);

  window.map = {
    onAdOpen: onAdOpen,
    onCardRemove: onCardRemove,
    onCardEscPress: onCardEscPress
  };
})();