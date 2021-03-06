'use strict';

(function () {
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
    MIN_X: 0,
    MAX_X: 1200
  };

  var adverts = [];

  var map = window.data.map;
  var mapPins = window.data.mapPins;
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapFilters = window.data.mapFilters;

  var adForm = window.data.adForm;
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var avatarSelection = adForm.querySelector('.ad-form-header__input');
  var pictureSelection = adForm.querySelector('.ad-form__input');


  var getPinCoordinates = function () {
    var coordinateX = parseInt(mapPinMain.style.left, 10);
    var coordinateY = parseInt(mapPinMain.style.top, 10);

    var x = map.classList.contains('map--faded') ? PinMain.X + Math.floor(PinMain.WIDTH / 2) : coordinateX + Math.floor(Pin.WIDTH / 2);
    var y = map.classList.contains('map--faded') ? PinMain.Y + Math.floor(PinMain.HEIGHT / 2) : coordinateY + Pin.HEIGHT;

    return [x, y];
  };

  var setDefaultMainPin = function () {
    mapPinMain.style.left = PinMain.X + 'px';
    mapPinMain.style.top = PinMain.Y + 'px';

    window.form.getAddressValue(getPinCoordinates());
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
        var maxСoordinatesX = Math.ceil(map.offsetWidth - PinMain.WIDTH / 2);
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

        window.form.getAddressValue(getPinCoordinates());
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
    window.main.isEnterEvent(evt, activateMap);
  };

  var onAdOpen = function (advert) {
    onCardRemove();
    window.cardRender.render(advert);
  };

  var onCardEscPress = function (evt) {
    window.main.isEscEvent(evt, onCardRemove);
  };

  var removePinActive = function () {
    var pinActive = mapPins.querySelector('.map__pin--active');

    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  var onCardRemove = function () {
    var cardRender = map.querySelector('.map__card');

    if (cardRender) {
      var popupClose = cardRender.querySelector('.popup__close');

      cardRender.remove();
      removePinActive();

      popupClose.removeEventListener('click', onCardRemove);
      document.removeEventListener('keyup', onCardEscPress);
    }

  };

  var removePins = function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var onFilterFormChange = window.debounce(function () {
    removePins();
    onCardRemove();

    window.pin.render(adverts);
  });

  var onSuccess = function (data) {
    adverts = data;

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.form.togglesDisabled();
    window.form.getAddressValue(getPinCoordinates());
    window.pin.render(data);
    window.form.addValidation();

    mapFilters.addEventListener('change', onFilterFormChange);
    avatarSelection.addEventListener('change', window.preview.onAvatarLoad);
    pictureSelection.addEventListener('change', window.preview.onPhotosLoad);
    adForm.addEventListener('submit', window.form.onSubmit);
    adFormReset.addEventListener('click', onMapDeactivate);
    mapPinMain.removeEventListener('keyup', onPinEnterPress);
  };

  var activateMap = function () {
    window.backend.load(onSuccess, window.dialog.onError);
  };

  var onMapDeactivate = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    window.form.togglesDisabled();
    adForm.reset();
    setDefaultMainPin();
    mapFilters.reset();
    removePins();
    onCardRemove();
    window.form.removeValidation();
    window.preview.resetPictures();

    mapFilters.removeEventListener('change', onFilterFormChange);
    avatarSelection.removeEventListener('change', window.preview.onAvatarLoad);
    pictureSelection.removeEventListener('change', window.preview.onPhotosLoad);

    adForm.removeEventListener('submit', window.form.onSubmit);
    adFormReset.removeEventListener('click', onMapDeactivate);
  };

  window.form.getAddressValue(getPinCoordinates());

  mapPinMain.addEventListener('mousedown', onPinClick);
  mapPinMain.addEventListener('keyup', onPinEnterPress);

  window.map = {
    onAdOpen: onAdOpen,
    onCardRemove: onCardRemove,
    onCardEscPress: onCardEscPress,
    onMapDeactivate: onMapDeactivate
  };
})();
