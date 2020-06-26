'use strict';

(function () {
  var numberOfGuests = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var adForm = document.querySelector('.ad-form');
  var selectCapacity = adForm.querySelector('select[name=capacity]');
  var selectRooms = adForm.querySelector('select[name=rooms]');
  var typeOfHousing = adForm.querySelector('select[name=type]');
  var selectCheckIn = adForm.querySelector('select[name=timein]');
  var selectCheckOut = adForm.querySelector('select[name=timeout]');
  var capacityOptions = selectCapacity.querySelectorAll('option');
  var typeOptions = typeOfHousing.querySelectorAll('option');
  var priceInput = adForm.querySelector('input[name=price]');

  var validateRooms = function () {
    var roomValue = selectRooms.value;

    capacityOptions.forEach(function (option) {
      option.selected = numberOfGuests[roomValue][0] === option.value;
      option.disabled = !(numberOfGuests[roomValue].indexOf(option.value) >= 0);
    });
  };

  var validateMinPrice = function () {
    var indexSelected = typeOfHousing.selectedIndex;
    var activeTypeOption = typeOptions[indexSelected];
    var housingMinPrice = window.card.typesoOffers[activeTypeOption.value].minPrice;

    priceInput.min = housingMinPrice;
    priceInput.placeholder = housingMinPrice;
  };

  var onTypeHousingChange = function () {
    validateMinPrice();
  };

  var onCheckInChange = function () {
    selectCheckIn.value = selectCheckOut.value;
  };

  var onRoomNumberChange = function () {
    validateRooms();
  };

  var onCheckOutChange = function () {
    selectCheckOut.value = selectCheckIn.value;
  };

  var addValidation = function () {
    validateMinPrice();
    validateRooms();

    typeOfHousing.addEventListener('change', onTypeHousingChange);
    selectRooms.addEventListener('change', onRoomNumberChange);
    selectCheckIn.addEventListener('change', onCheckOutChange);
    selectCheckOut.addEventListener('change', onCheckInChange);
  };

  window.form = {
    addValidation: addValidation
  };
})();
