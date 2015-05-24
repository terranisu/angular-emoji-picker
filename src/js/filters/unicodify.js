angular.module('vkEmojiPicker').filter('unicodify', [
  'EmojiHex', function (EmojiHex) {
    var swappedHex = {};
    var unicodes = [];

    angular.forEach(EmojiHex.emoji, function (value, key) {
      swappedHex[value] = key;
      unicodes.push(value);
    });
    unicodes = unicodes.reverse();
    var regexHex = new RegExp('(' + unicodes.join('|') + ')', 'g');

    return function (text) {
      if (text == null) {
        return '';
      }

      var matches = text.match(regexHex);

      if (matches === null) {
        return text;
      }

      for (var i = 0, len = matches.length; i < len; i++) {
        var hexString = matches[i];

        if (hexString.indexOf('-') > -1) {
          var codePoints = hexString.split('-');
          var unicode = eval('String.fromCodePoint(0x' + codePoints.join(', 0x') + ')');
        } else {
          var codePoint = ['0x', hexString].join('');
          var unicode = String.fromCodePoint(codePoint);
        }

        text = text.replace(hexString, unicode);
      }

      return text;
    };
  }
]);
