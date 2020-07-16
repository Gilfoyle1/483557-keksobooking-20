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

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var mapPins = map.querySelector('.map__pins');


  window.data = {
    typesoOffers: typesoOffers,
    adForm: adForm,
    map: map,
    mapFilters: mapFilters,
    mapPins: mapPins
  };
})();
