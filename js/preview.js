'use strict';

(function () {
  var FILE_TYPES = ['jpeg', 'jpg', 'png'];
  var SIZE_PHOTOS = 70;


  var pinAvatar = window.data.adForm.querySelector('.ad-form-header__preview img');

  var photoRooms = window.data.adForm.querySelector('.ad-form__photo');

  var loadPhotos = function (evt, picture) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        picture.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onAvatarLoad = function (evt) {
    loadPhotos(evt, pinAvatar);
  };

  var onPhotosLoad = function (evt) {
    var roomsImg = document.createElement('img');

    roomsImg.width = SIZE_PHOTOS;
    roomsImg.height = SIZE_PHOTOS;

    photoRooms.appendChild(roomsImg);

    loadPhotos(evt, roomsImg);
  };

  var resetPictures = function () {
    pinAvatar.src = 'img/muffin-grey.svg';
    photoRooms.innerHTML = '';
  };

  window.preview = {
    onAvatarLoad: onAvatarLoad,
    onPhotosLoad: onPhotosLoad,
    resetPictures: resetPictures
  };
})();
