'use strict';

var COUNT = 8;
var SIZE_PIN_X = 50 / 2;
var SIZE_PIN_Y = 70;
var ROOM_VALUE_100 = '100';
var CAPACITY_VALUE_0 = '0';
var CAPACITY_VALUE_1 = '1';
var LEFT_BUTTON_MOUSE = 1;
var ENTER_KEY = 'Enter';


var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// ищем элемент с классом map и удаляем у него класс map--faded
var map = document.querySelector('.map');


// ищем шаблон для копирования пинов и элемент, в который будем вставлять их
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsBlock = map.querySelector('.map__pins');

// функция рандомного числа в промежутке
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция создания массива случайной длины
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

// функция с циклом, который перебирает объект объявлений и добавляет его в массив housingOptions
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

// создаем функцию клонирования
var renderPin = function (pin) {
  var clonePin = pinTemplate.cloneNode(true);
  clonePin.style.left = pin.location.x - SIZE_PIN_X + 'px';
  clonePin.style.top = pin.location.y - SIZE_PIN_Y + 'px';

  var img = clonePin.querySelector('img');
  img.src = pin.author.avatar;
  img.alt = pin.offer.title;

  return clonePin;
};

// создаем цикл добавления пинов
var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < housingOptions.length; i++) {
    fragment.appendChild(renderPin(housingOptions[i]));
  }

  // добавляем фрагмент в элемент страницы
  pinsBlock.appendChild(fragment);
};
renderPins();

/* -----задание 2------ */

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

// функция склонения
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


// Функция карточки объявления
var getCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  var photoElement = cardElement.querySelector('.popup__photos');

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

  return cardElement;
};


map.insertBefore(getCard(housingOptions[0]), filtersContainer);


/* доверяй, но проверяй (часть 1) */
var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
var mapCard = document.querySelector('.map__card');
var formElements = document.querySelectorAll('.map__filter, fieldset');
var mapPinMain = pinsBlock.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('input[name=address]');
var selectRooms = adForm.querySelector('select[name=rooms]');
var selectCapacity = adForm.querySelector('select[name=capacity]');
var typeOfHousing = adForm.querySelector('select[name=type]');
var priceInput = adForm.querySelector('input[name=price]');
var capacityOptions = selectCapacity.querySelectorAll('option');
var typeOptions = typeOfHousing.querySelectorAll('option');
mapCard.classList.add('visually-hidden');
var numberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};


var toggleHiddenPins = function () {
  for (var i = 0; i < mapPin.length; i++) {
    pinsBlock.removeChild(mapPin[i]);
  }
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
  mapPinMain.removeEventListener('mousedown', onPinClick);
  mapPinMain.removeEventListener('keydown', onPinEnterPress);
  toggleDisabledElements();
  validateRooms();
  validateMinPrice();
  getAddressValue();
  toggleHiddenPins();
};

var getPinCoordinates = function () {
  var x = map.classList.contains('map--faded') ? PinMain.X + PinMain.WIDTH / 2 : PinMain.X + SIZE_PIN_X;
  var y = map.classList.contains('map--faded') ? PinMain.Y + PinMain.HEIGHT / 2 : PinMain.Y + SIZE_PIN_Y;

  return x + ', ' + y;
};

var getAddressValue = function () {
  adFormAddress.value = getPinCoordinates();
};

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

selectCapacity.value = CAPACITY_VALUE_1;

toggleDisabledElements();
mapPinMain.addEventListener('mousedown', onPinClick);
mapPinMain.addEventListener('keydown', onPinEnterPress);
