'use strict';

(function () {
  var COUNT = 5;

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };


  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var generatePin = function (pin) {
    var advertPin = pinTemplate.cloneNode(true);

    advertPin.style.left = pin.location.x - Pin.WIDTH / 2 + 'px';
    advertPin.style.top = pin.location.y - Pin.HEIGHT + 'px';
    advertPin.querySelector('img').src = pin.author.avatar;
    advertPin.querySelector('img').alt = pin.offer.title;

    advertPin.addEventListener('click', function () {
      window.map.onAdOpen(pin);
      advertPin.classList.add('map__pin--active');
    });
    advertPin.addEventListener('keyup', function (evt) {
      window.main.isEnterEvent(evt, window.map.onAdOpen, pin);
    });

    return advertPin;
  };

  var renderAllPins = function (pinsAmount) {
    var fragment = document.createDocumentFragment();
    var filteredPins = window.filter(pinsAmount).slice(0, COUNT);

    filteredPins.forEach(function (advert) {
      if (advert.offer) {
        fragment.appendChild(generatePin(advert));
      }
    });

    window.data.mapPins.appendChild(fragment);
  };

  window.pin = {
    render: renderAllPins
  };
})();
