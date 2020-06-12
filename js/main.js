'use strict';

var COUNT = 8;
var SIZE_PIN_X = 50 / 2;
var SIZE_PIN_Y = 70;

var type = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var options = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// ищем элемент с классом map и удаляем у него класс map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
        'type': type[getRandomInt(0, type.length - 1)],
        'rooms': getRandomInt(1, 5),
        'guests': getRandomInt(1, 8),
        'checkin': times[getRandomInt(0, times.length - 1)],
        'checkout': times[getRandomInt(0, times.length - 1)],
        'features': shuffleArray(options).slice(0, getRandomInt(0, options.length)),
        'description': 'Расположен в районе Тайто в Токио, в 200 метрах от храма Ичогаока-Хатиман, в 300 метрах от павильона и конференц-зала Hulic и в 500 метрах от храма Канаами-Инари.',
        'photos': shuffleArray(photos).slice(0, getRandomInt(1, photos.length)),
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

var types = {
  palace: {
    ru: 'Дворец'
  },
  flat: {
    ru: 'Квартира'
  },
  house: {
    ru: 'Дом'
  },
  bungalo: {
    ru: 'Бунгало'
  },
};

var filtersContainer = document.querySelector('.map__filters-container');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// Функция клонирования карточки объявления
var getCard = function (value) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = value.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = value.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = value.offer.price + '₽/ночь';
  cardElement.querySelector('.offer.type').textContent = types[value.type].ru;
  cardElement.querySelector('.popup__text--capacity').textContent = value.offer.rooms + ' комнаты для ' + value.offer.guests + ' гостей'; // решить как изменять склонения
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + value.offer.checkin + ', выезд до ' + value.offer.checkout;
  cardElement.querySelector('.offer.description').textContent = value.offer.description;

  var featureElement = cardElement.querySelectorAll('.popup__features');

  for (var i = 0; i < value.offer.features.length; i++) {

    featureElement.textContent = value.offer.features[i];
  }

  return cardElement;
};

map.insertBefore(getCard(housingOptions[0]), filtersContainer);
