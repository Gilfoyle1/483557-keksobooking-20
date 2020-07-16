'use strict';

(function () {
  var COUNT = 5;

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };


  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var generatePin = function (pin) {
    var adElement = pinTemplate.cloneNode(true);

    adElement.style.left = pin.location.x - Pin.WIDTH / 2 + 'px';
    adElement.style.top = pin.location.y - Pin.HEIGHT + 'px';
    adElement.querySelector('img').src = pin.author.avatar;
    adElement.querySelector('img').alt = pin.offer.title;

    adElement.addEventListener('click', function () {
      window.map.onAdOpen(pin);
      adElement.classList.add('map__pin--active');
    });
    adElement.addEventListener('keyup', function (evt) {
      window.utils.isEnterEvent(evt, window.map.onAdOpen, pin);
    });

    return adElement;
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
