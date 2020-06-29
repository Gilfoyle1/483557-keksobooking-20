'use strict';

(function () {
  var MAX_PRICE = 1000000;
  var GUESTS = [0, 1, 2, 3];
  var ROOMS = [1, 2, 3, 100];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TIMES = ['12:00', '13:00', '14:00'];

  var Pin = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };

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


  var getAvatarSrc = function (index) {
    return 'img/avatars/user0' + (index + 1) + '.png';
  };

  var generateAd = function (i) {
    var locationX = window.utils.getRandomInt(Pin.MIN_X, Pin.MAX_X);
    var locationY = window.utils.getRandomInt(Pin.MIN_Y, Pin.MAX_Y);

    var addCard = {
      'author': {
        avatar: getAvatarSrc(i)
      },
      'offer': {
        'title': 'Идеальный вариант на выходные',
        'address': getRandomInt(1, 600) + ', ' + getRandomInt(1, 300),
        'price': getRandomInt(1000, MAX_PRICE),
        'type': TYPES[getRandomInt(0, TYPES.length - 1)],
        'rooms': ROOMS[getRandomInt(0, ROOMS.length - 1)],
        'guests': GUESTS[getRandomInt(0, GUESTS.length - 1)],
        'checkin': TIMES[getRandomInt(0, TIMES.length - 1)],
        'checkout': TIMES[getRandomInt(0, TIMES.length - 1)],
        'features': shuffleArray(FEATURES).slice(0, getRandomInt(0, FEATURES.length)),
        'description': 'Расположен в районе Тайто в Токио, в 200 метрах от храма Ичогаока-Хатиман, в 300 метрах от павильона и конференц-зала Hulic и в 500 метрах от храма Канаами-Инари.',
        'photos': shuffleArray(PHOTOS).slice(0, getRandomInt(1, PHOTOS.length)),
      },

      'location': {
        x: locationX,
        y: locationY
      }
    };

    return addCard;
  };

  window.data = {
    generateAd: generateAd
  };
})();
