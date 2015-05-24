angular.module('vkEmojiPicker').filter('hexify', [
  'EmojiHex', function (EmojiHex) {
    return function (text) {
      if (text == null) {
        return '';
      }

      var emojiRegex = /\:([a-z0-9_+-]+)(?:\[((?:[^\]]|\][^:])*\]?)\])?\:/g;
      var matches = text.match(emojiRegex);

      if (matches === null) {
        return text;
      }

      for (var i = 0; i < matches.length; i++) {
        var emojiString = matches[i];
        var property = emojiString.replace(/\:/g, '');

        if (EmojiHex.emoji.hasOwnProperty(property)) {
          text = text.replace(emojiString, EmojiHex.emoji[property]);
        }
      }

      return text;
    };
  }
]);
