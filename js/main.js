'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var isEscEvent = function (evt, operation) {
    if (evt.key === ESC_KEY) {
      operation();
    }
  };

  var isEnterEvent = function (evt, action, parametr) {
    if (evt.key === ENTER_KEY) {
      action(parametr);
    }
  };

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

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomLengthArray = function (array) {
    var randomIndex = Math.floor(Math.random() * array.length + 1);

    return array.slice(0, randomIndex);
  };

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    getRandomLengthArray: getRandomLengthArray,
    getNoun: getNoun
  };
})();
