'use strict';

(function () {

  var mapFiltersContainer = window.data.map.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


  var generateFeatures = function (features, cardElement) {
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupFeature = popupFeatures.querySelector('.popup__feature');

    popupFeatures.innerHTML = '';

    if (features.length === 0) {
      popupFeatures.style.display = 'none';
    } else {
      features.forEach(function (featureAdvert) {
        var feature = popupFeature.cloneNode(true);

        feature.className = 'popup__feature popup__feature--' + featureAdvert;

        popupFeatures.appendChild(feature);
      });
    }
  };

  var generatePhotos = function (photos, cardElement) {
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');

    popupPhotos.innerHTML = '';

    if (photos.length === 0) {
      popupPhotos.style.display = 'none';
    } else {

      photos.forEach(function (photo) {
        var photoElement = popupPhoto.cloneNode(true);

        photoElement.src = photo;

        popupPhotos.appendChild(photoElement);
      });
    }
  };

  var generateCard = function (cardRender) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupClose = cardElement.querySelector('.popup__close');


    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardType = cardElement.querySelector('.popup__type');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardDescription = cardElement.querySelector('.popup__description');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var cardAvatar = cardElement.querySelector('.popup__avatar');

    if (cardRender.offer.title !== '') {
      cardTitle.textContent = cardRender.offer.title;
    } else {
      cardTitle.style.display = 'none';
    }

    if (cardRender.offer.address !== '') {
      cardAddress.textContent = cardRender.offer.address;
    } else {
      cardAddress.style.display = 'none';
    }

    if (cardRender.offer.price !== '') {
      cardPrice.textContent = cardRender.offer.price + '₽/ночь';
    } else {
      cardPrice.style.display = 'none';
    }

    if (cardRender.offer.type !== '') {
      cardType.textContent = window.data.typesOffers[cardRender.offer.type].ru;
    } else {
      cardType.style.display = 'none';
    }

    if (cardRender.offer.rooms !== '' && cardRender.offer.guests !== '') {
      cardCapacity.textContent = window.main.getNoun(cardRender.offer.rooms, ' комната', ' комнаты', ' комнат') + ' для ' + window.main.getNoun(cardRender.offer.guests, ' гостя', ' гостей', ' гостей');
    } else {
      cardCapacity.style.display = 'none';
    }

    if (cardRender.offer.checkin !== '' && cardRender.offer.checkout !== '') {
      cardTime.textContent = 'Заезд после ' + cardRender.offer.checkin + ', выезд до ' + cardRender.offer.checkout;
    } else {
      cardTime.style.display = 'none';
    }

    if (cardRender.offer.description !== '') {
      cardDescription.textContent = cardRender.offer.description;
    } else {
      cardDescription.style.display = 'none';
    }

    if (cardRender.author.avatar !== '') {
      cardAvatar.src = cardRender.author.avatar;
    } else {
      cardAvatar.style.display = 'none';
    }

    generateFeatures(cardRender.offer.features, cardElement);
    generatePhotos(cardRender.offer.photos, cardElement);

    popupClose.addEventListener('click', window.map.onCardRemove);
    document.addEventListener('keyup', window.map.onCardEscPress);

    return cardElement;
  };

  var renderCard = function (pin) {
    mapFiltersContainer.insertAdjacentElement('beforebegin', generateCard(pin));
  };

  window.cardRender = {
    render: renderCard
  };
})();
