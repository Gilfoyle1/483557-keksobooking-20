'use strict';

(function () {
  var COUNT = 5;

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };


  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var generatePin = function (pin) {
    var advertElementnt = pinTemplate.cloneNode(true);

    advertElementnt.style.left = pin.location.x - Pin.WIDTH / 2 + 'px';
    advertElementnt.style.top = pin.location.y - Pin.HEIGHT + 'px';
    advertElementnt.querySelector('img').src = pin.author.avatar;
    advertElementnt.querySelector('img').alt = pin.offer.title;

    advertElementnt.addEventListener('click', function () {
      window.map.onAdOpen(pin);
      advertElementnt.classList.add('map__pin--active');
    });
    advertElementnt.addEventListener('keyup', function (evt) {
      window.main.isEnterEvent(evt, window.map.onAdOpen, pin);
    });

    return advertElementnt;
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
