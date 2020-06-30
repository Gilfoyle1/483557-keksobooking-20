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
  var formElements = document.querySelectorAll('.map__filter, fieldset');
  var adFormAddress = adForm.querySelector('input[name=address]');

  var toggleDisabledElements = function () {
    formElements.forEach(function (formElement) {
      formElement.disabled = !formElement.disabled;
    });
  };

  var getAddressValue = function (coords) {
    adFormAddress.value = coords[0] + ', ' + coords[1];
  };

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
    var housingMinPrice = window.data.typesoOffers[activeTypeOption.value].minPrice;

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
    addValidation: addValidation,
    toggleDisabledElements: toggleDisabledElements,
    getAddressValue: getAddressValue
  };
})();
