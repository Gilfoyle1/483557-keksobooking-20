'use strict';

var COUNT = 8;

var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12: 00', '13: 00', '14: 00'];
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
var shuffleArray = function (array) {
  return array;
};

var housingOptions = [];

// функция с циклом, который перебирает объект с пинами и добавляет его в массив housingOptions
var addHousingOptions = function () {
  for (var i = 0; i < COUNT; i++) {
    housingOptions.push({
      'author': {
        'avatar': 'img/avatars/user' + ('0' + (i + 1)) + '.png'
      },
      'offer': {
        'title': 'Идеальный вариант на выходные',
        'address': getRandomInt(1, 600) + ', ' + getRandomInt(1, 300),
        'price': getRandomInt(1000, 50000),
        'type': types[getRandomInt(0, types.length - 1)],
        'rooms': getRandomInt(1, 5),
        'guests': getRandomInt(1, 8),
        'checkin': times[getRandomInt(0, times.length - 1)],
        'checkout': times[getRandomInt(0, times.length - 1)],
        'features': shuffleArray(options).slice(0, getRandomInt(0, options.length - 1)),
        'description': 'Расположен в районе Тайто в Токио, в 200 метрах от храма Ичогаока-Хатиман, в 300 метрах от павильона и конференц-зала Hulic и в 500 метрах от храма Канаами-Инари.',
        'photos': shuffleArray(photos).slice(0, getRandomInt(1, photos.length - 1)),
      },
      'location': {
        'x': getRandomInt(0, document.querySelector('.map').offsetWidth),
        'y': getRandomInt(130, 630)
      }
    });
  }
};
addHousingOptions();

// создаем функцию клонирования

var renderPin = function (pin) {
  var clonePin = pinTemplate.cloneNode(true);
  clonePin.style.left = pin.location.x + 'px';
  clonePin.style.top = pin.location.y + 'px';
  pinTemplate.querySelector('img').src = pin.author.avatar;
  pinTemplate.querySelector('img').alt = pin.offer.title;

  return clonePin;
};


// создаем цикл добавления пинов
var fragment = document.createDocumentFragment();
for (var i = 0; i < housingOptions.length; i++) {
  fragment.appendChild(renderPin(housingOptions[i]));
}

// добавляем фрагмент в элемент страницы
pinsBlock.appendChild(fragment);
