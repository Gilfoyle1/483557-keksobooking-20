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
    WIDTH: 65,
    HEIGHT: 82,
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 1
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
    var coordinateX = parseInt(mapPinMain.style.left, 10);
    var coordinateY = parseInt(mapPinMain.style.top, 10);

    var x = map.classList.contains('map--faded') ? PinMain.X + Math.floor(PinMain.WIDTH / 2) : coordinateX + Math.floor(Pin.WIDTH / 2);
    var y = map.classList.contains('map--faded') ? PinMain.Y + Math.floor(PinMain.HEIGHT / 2) : coordinateY + Pin.HEIGHT;

    return x + ', ' + y;
  };

  var onPinClick = function (evt) {
    if (evt.which === LEFT_BUTTON_MOUSE) {
      if (map.classList.contains('map--faded')) {
        activateMap();
      }

      var referencePoint = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var minСoordinatesX = Pin.MIN_X - PinMain.WIDTH / 2;
        var maxСoordinatesX = map.offsetWidth - PinMain.WIDTH / 2;
        var minСoordinatesY = Pin.MIN_Y - Pin.HEIGHT;
        var maxСoordinatesY = Pin.MAX_Y - Pin.HEIGHT;

        var glidePin = {
          x: referencePoint.x - moveEvt.clientX,
          y: referencePoint.y - moveEvt.clientY
        };

        referencePoint = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinMain.style.top = (mapPinMain.offsetTop - glidePin.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - glidePin.x) + 'px';

        if (mapPinMain.offsetLeft < minСoordinatesX) {
          mapPinMain.style.left = minСoordinatesX + 'px';
        } else if (mapPinMain.offsetLeft > maxСoordinatesX) {
          mapPinMain.style.left = maxСoordinatesX + 'px';
        }

        if (mapPinMain.offsetTop < minСoordinatesY) {
          mapPinMain.style.top = minСoordinatesY + 'px';
        } else if (mapPinMain.offsetTop > maxСoordinatesY) {
          mapPinMain.style.top = maxСoordinatesY + 'px';
        }

        getAddressValue();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var onPinEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, activateMap);
  };

  var getAddressValue = function () {
    adFormAddress.value = getPinCoordinates();
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
