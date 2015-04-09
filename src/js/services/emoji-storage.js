angular.module('vkEmojiPicker').factory('vkEmojiStorage', [
  '$window', 'vkEmojiLocalStorage', function ($window, emojiStorage) {
    var factory = {},
        storage = $window.localStorage || emojiStorage;

    factory.store = function (value) {
      var emojiString = storage.getItem('emojiPicker');

      if (emojiString == null) {
        var emojiObject = {};
      } else {
        var emojiObject = JSON.parse(emojiString);
      }

      emojiObject[value] = value;
      storage.setItem('emojiPicker', JSON.stringify(emojiObject));
    };

    factory.getFirst = function (count) {
      var length = 0,
          emoji = [],
          emojiString = storage.getItem('emojiPicker');

      if (emojiString == null) {
        return emoji;
      }

      var emojiObject = JSON.parse(emojiString);

      angular.forEach(emojiObject, function (value) {
        if (length === count) {
          return;
        }

        emoji.push(value);
        length += 1;
      });

      return emoji;
    };

    factory.clear = function () {
      storage.clear();
    };

    return factory;
  }
]);
