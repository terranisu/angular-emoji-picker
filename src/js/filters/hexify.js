angular.module('vkEmojiPicker').filter('hexify', [
  'EmojiHex', function (emojiHex) {
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
        var emojiString = matches[i],
            property = emojiString.replace(/\:/g, '');

        if (emojiHex.emoji.hasOwnProperty(property)) {
          text = text.replace(emojiString, emojiHex.emoji[property]);
        }
      }

      return text;
    };
  }
]);
