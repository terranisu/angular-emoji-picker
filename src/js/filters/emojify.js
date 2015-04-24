angular.module('vkEmojiPicker').filter('emojify', [
  'EmojiGroups', 'EmojiHex', function (emojiGroups, emojiHex) {
    var regex = new RegExp(':(' + emojiGroups.all.join('|') + '):', 'g');
    var swappedHex = {};
    var unicodes = [];

    angular.forEach(emojiHex.emoji, function (value, key) {
      swappedHex[value] = key;
      unicodes.push(value);
    });

    var regexHex = new RegExp('(' + unicodes.join('|') + ')', 'g');

    return function (input) {
      if (input == null) {
        return '';
      }

      input = input.replace(regex, function (match, text) {
        var className = text.replace(/_/g, '-');
        var output = ['<i class="emoji-picker emoji-', className, '" alt="', text, '" title=":', text, ':"></i>'];

        return output.join('');
      });

      return input.replace(regexHex, function (match, hex) {
        var text = swappedHex[hex];

        var className = text.replace(/_/g, '-');
        var output = ['<i class="emoji-picker emoji-', className, '" alt="', hex, '" title=":', text, ':"></i>'];

        return output.join('');
      });
    };
  }
]);
