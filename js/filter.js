'use strict';

(function () {

  var mapFilters = window.data.mapFilters;
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

  var priceToRoom = {
    cheap: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    expensive: {
      min: 50000,
      max: Infinity
    }
  };

  var filterHousing = function (data, filterElement) {
    return filterElement.value === 'any' ? true : data.toString() === filterElement.value;
  };

  var filterHousingPrice = function (data, filterElement) {
    return filterElement.value === 'any' ? true : priceToRoom[filterElement.value].min <= data && data < priceToRoom[filterElement.value].max;
  };

  var filterHousingCheckbox = function (data) {
    var housingCheckbox = mapFilters.querySelectorAll('.map__checkbox:checked');

    return Array.from(housingCheckbox).every(function (feature) {
      return data.indexOf(feature.value) >= 0;
    });

  };

  window.filter = function (ads) {
    return ads.filter(function (element) {
      return filterHousing(element.offer.type, housingType) &&
        filterHousingPrice(element.offer.price, housingPrice) &&
        filterHousing(element.offer.rooms, housingRooms) &&
        filterHousing(element.offer.guests, housingGuests) &&
        filterHousingCheckbox(element.offer.features);
    });
  };
})();
