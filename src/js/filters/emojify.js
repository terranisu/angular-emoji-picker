angular.module('vkEmojiPicker').filter('emojify', [
  'EmojiGroups', function (emojiGroups) {
    var regex = new RegExp(':(' + emojiGroups.all.join('|') + '):', 'g');

    return function (input) {
      if (input == null) {
        return '';
      }

      return input.replace(regex, function (match, text) {
        var className = text.replace(/_/g, '-');

        return "<i class='emoji-picker emoji-" + className + "' title=':" + text + ":'></i>";
      });
    }
  }
]);
