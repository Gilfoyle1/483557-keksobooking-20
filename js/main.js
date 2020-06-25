'use strict';

var COUNT = 8;
var SIZE_PIN_X = 50 / 2;
var SIZE_PIN_Y = 70;
var ROOM_VALUE_100 = '100';
var CAPACITY_VALUE_0 = '0';
var CAPACITY_VALUE_1 = '1';
var LEFT_BUTTON_MOUSE = 1;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsBlock = map.querySelector('.map__pins');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var shuffleArray = function (a) {
  var j;
  var x;
  var i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

var housingOptions = [];


var addHousingOptions = function () {
  for (var i = 0; i < COUNT; i++) {
    housingOptions.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Идеальный вариант на выходные',
        'address': getRandomInt(1, 600) + ', ' + getRandomInt(1, 300),
        'price': getRandomInt(1000, 50000),
        'type': TYPES[getRandomInt(0, TYPES.length - 1)],
        'rooms': getRandomInt(1, 5),
        'guests': getRandomInt(1, 8),
        'checkin': TIMES[getRandomInt(0, TIMES.length - 1)],
        'checkout': TIMES[getRandomInt(0, TIMES.length - 1)],
        'features': shuffleArray(OPTIONS).slice(0, getRandomInt(0, OPTIONS.length)),
        'description': 'Расположен в районе Тайто в Токио, в 200 метрах от храма Ичогаока-Хатиман, в 300 метрах от павильона и конференц-зала Hulic и в 500 метрах от храма Канаами-Инари.',
        'photos': shuffleArray(PHOTOS).slice(0, getRandomInt(1, PHOTOS.length)),
      },
      'location': {
        'x': getRandomInt(0, map.offsetWidth),
        'y': getRandomInt(130, 630)
      }
    });
  }
};
addHousingOptions();


var renderPin = function (pin) {
  var clonePin = pinTemplate.cloneNode(true);
  clonePin.style.left = pin.location.x - SIZE_PIN_X + 'px';
  clonePin.style.top = pin.location.y - SIZE_PIN_Y + 'px';

  var img = clonePin.querySelector('img');
  img.src = pin.author.avatar;
  img.alt = pin.offer.title;

  clonePin.addEventListener('click', function () {
    onPinOpen(pin);
  });
  clonePin.addEventListener('keyup', function (evt) {
    if (evt.key === ENTER_KEY) {
      onPinOpen(pin);
    }
  });

  return clonePin;
};


var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < housingOptions.length; i++) {
    fragment.appendChild(renderPin(housingOptions[i]));
  }

  pinsBlock.appendChild(fragment);
};


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

var PinMain = {
  WIDTH: 62,
  HEIGHT: 62,
  X: 570,
  Y: 375
};

var filtersContainer = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


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


var getCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  var photoElement = cardElement.querySelector('.popup__photos');
  var popupClose = cardElement.querySelector('.popup__close');

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typesoOffers[card.offer.type].ru;
  cardElement.querySelector('.popup__text--capacity').textContent = getNoun(card.offer.rooms, 'комната', 'комнаты', 'комнат') + ' для ' + getNoun(card.offer.guests, 'гостя', 'гостей', 'гостей');
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

  var featuresBlock = cardElement.querySelector('.popup__features');
  var features = featuresBlock.querySelectorAll('.popup__feature');

  if (features.length > 0) {
    for (var i = 0; i < features.length; i++) {
      if (card.offer.features.indexOf(features[i].classList[1].replace('popup__feature--', '')) < 0) {
        features[i].remove();
      }
    }
  }

  var photo = photoElement.querySelector('img');

  if (card.offer.photos.length > 0) {
    photo.src = card.offer.photos[0];
    for (i = 1; i < card.offer.photos.length; i++) {
      var photoClone = photo.cloneNode(true);
      photoClone.src = card.offer.photos[i];
      photoElement.appendChild(photoClone);
    }
  } else {
    photo.remove();
  }

  popupClose.addEventListener('click', onCardRemove);
  document.addEventListener('keyup', onCardEscPress);

  return cardElement;
};


map.insertBefore(getCard(housingOptions[0]), filtersContainer);

var renderCard = function (pin) {
  filtersContainer.insertAdjacentElement('beforebegin', getCard(pin));
};

var mapCard = document.querySelector('.map__card');
var formElements = document.querySelectorAll('.map__filter, fieldset');
var mapPinMain = pinsBlock.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('input[name=address]');
var selectRooms = adForm.querySelector('select[name=rooms]');
var selectCapacity = adForm.querySelector('select[name=capacity]');
var typeOfHousing = adForm.querySelector('select[name=type]');
var priceInput = adForm.querySelector('input[name=price]');
var selectCheckIn = adForm.querySelector('select[name=timein]');
var selectCheckOut = adForm.querySelector('select[name=timeout]');
var capacityOptions = selectCapacity.querySelectorAll('option');
var typeOptions = typeOfHousing.querySelectorAll('option');
mapCard.classList.add('visually-hidden');

var numberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};


var toggleDisabledElements = function () {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = !formElements[i].disabled;
  }
};

var activateMap = function () {
  map.classList.remove('map--faded');
  mapCard.classList.remove('visually-hidden');
  adForm.classList.remove('ad-form--disabled');
  selectRooms.addEventListener('change', onRoomNumberChange);
  typeOfHousing.addEventListener('change', onTypeHousingChange);
  selectCheckIn.addEventListener('change', onCheckOutChange);
  selectCheckOut.addEventListener('change', onCheckInChange);
  mapPinMain.removeEventListener('mousedown', onPinClick);
  mapPinMain.removeEventListener('keyup', onPinEnterPress);
  toggleDisabledElements();
  validateRooms();
  validateMinPrice();
  getAddressValue();
  renderPins();
};

var getAddressValue = function () {
  var x = map.classList.contains('map--faded') ? PinMain.X + PinMain.WIDTH / 2 : PinMain.X + SIZE_PIN_X;
  var y = map.classList.contains('map--faded') ? PinMain.Y + PinMain.HEIGHT : PinMain.Y + SIZE_PIN_Y;

  adFormAddress.value = x + ', ' + y;
};
getAddressValue();


var validateRooms = function () {
  var roomValue = selectRooms.value;

  for (var i = 0; i < capacityOptions.length; i++) {
    capacityOptions[i].disabled = !numberOfGuests[roomValue].includes(capacityOptions[i].value);
  }

  if (selectRooms.value === ROOM_VALUE_100) {
    selectCapacity.value = CAPACITY_VALUE_0;
  } else {
    selectCapacity.value = CAPACITY_VALUE_1;
  }
};

var validateMinPrice = function () {
  var indexSelected = typeOfHousing.selectedIndex;
  var activeTypeOption = typeOptions[indexSelected];
  var housingMinPrice = typesoOffers[activeTypeOption.value].minPrice;

  priceInput.min = housingMinPrice;
  priceInput.placeholder = housingMinPrice;
};


var onRoomNumberChange = function () {
  validateRooms();
};

var onTypeHousingChange = function () {
  validateMinPrice();
};

var onCheckOutChange = function () {
  selectCheckOut.value = selectCheckIn.value;
};

var onCheckInChange = function () {
  selectCheckIn.value = selectCheckOut.value;
};

var onPinClick = function (evt) {
  if (evt.which === LEFT_BUTTON_MOUSE) {
    activateMap();
  }
};

var onPinEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    activateMap();
  }
};

var onCardEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    onCardRemove();
  }
};

var onPinOpen = function (pin) {
  onCardRemove();
  renderCard(pin);
};

var onCardRemove = function () {
  var card = map.querySelector('.map__card');

  if (card) {
    var popupClose = card.querySelector('.popup__close');

    card.remove();

    popupClose.removeEventListener('click', onCardRemove);
    document.removeEventListener('keyup', onCardEscPress);
  }
};

toggleDisabledElements();
mapPinMain.addEventListener('mousedown', onPinClick);
mapPinMain.addEventListener('keyup', onPinEnterPress);
onCardRemove();
