'use strict';

(function () {
  var typesoOffers = {
    palace: {
      ru: 'Дворец',
      minPrice: '10000'
    },
    flat: {
      ru: 'Квартира',
      minPrice: '1000'
    },
    house: {
      ru: 'Дом',
      minPrice: '5000'
    },
    bungalo: {
      ru: 'Бунгало',
      minPrice: '0'
    },
  };

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFilters = map.querySelector('.map__filters-container');


  var generateFeatures = function (features, cardElement) {
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupFeature = popupFeatures.querySelector('.popup__feature');

    popupFeatures.innerHTML = '';

    features.forEach(function (feature) {
      var featureElement = popupFeature.cloneNode(true);

      featureElement.className = 'popup__feature popup__feature--' + feature;

      popupFeatures.appendChild(featureElement);
    });
  };

  var generatePhotos = function (photos, cardElement) {
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');

    popupPhotos.innerHTML = '';

    photos.forEach(function (photo) {
      var photoElement = popupPhoto.cloneNode(true);

      photoElement.src = photo;

      popupPhotos.appendChild(photoElement);
    });
  };

  var getNoun = function (number, one, two, five) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
      return number + five;
    }
    number %= 10;
    if (number === 1) {
      return number + one;
    }
    if (number >= 2 && number <= 4) {
      return number + two;
    }
    return number + five;
  };

  var generateCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupClose = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typesoOffers[card.offer.type].ru;
    cardElement.querySelector('.popup__text--capacity').textContent = getNoun(card.offer.rooms, ' комната', ' комнаты', ' комнат') + ' для ' + getNoun(card.offer.guests, ' гостя', ' гостей', ' гостей');
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    generateFeatures(card.offer.features, cardElement);
    generatePhotos(card.offer.photos, cardElement);

    popupClose.addEventListener('click', window.map.onCardRemove);
    document.addEventListener('keyup', window.map.onCardEscPress);

    return cardElement;
  };

  var renderCard = function (pin) {
    mapFilters.insertAdjacentElement('beforebegin', generateCard(pin));
  };

  window.card = {
    render: renderCard,
    typesoOffers: typesoOffers
  };
})();
