'use strict';

(function () {

  var mapFilters = window.data.mapFilters;
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

  var priceToRoom = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var filterHousing = function (data, filter) {
    return filter.value === 'any' ? true : data.toString() === filter.value;
  };

  var filterHousingPrice = function (data, filter) {
    return filter.value === 'any' ? true : priceToRoom[filter.value].min <= data && data < priceToRoom[filter.value].max;
  };

  var filterHousingCheckbox = function (data) {
    var housingCheckbox = mapFilters.querySelectorAll('.map__checkbox:checked');

    return Array.from(housingCheckbox).every(function (featureAdvert) {
      return data.indexOf(featureAdvert.value) >= 0;
    });

  };
  window.filter = function (adverts) {
    var filteredAdverts = [];
    for (var i = 0; i < adverts.length; i++) {
      if (filterHousing(adverts[i].offer.type, housingType) &&
        filterHousingPrice(adverts[i].offer.price, housingPrice) &&
        filterHousing(adverts[i].offer.rooms, housingRooms) &&
        filterHousing(adverts[i].offer.guests, housingGuests) &&
        filterHousingCheckbox(adverts[i].offer.features)) {
        filteredAdverts.push(adverts[i]);
      }

      if (filteredAdverts.length === 5) {
        break;
      }
    }

    return filteredAdverts;
  };
})();
