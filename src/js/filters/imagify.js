angular.module('vkEmojiPicker').filter('imagify', [
  'EmojiGroups', function (EmojiGroups) {
    var regex = new RegExp(':(' + EmojiGroups.all.join('|') + '):', 'g');

    return function (input) {
      if (input == null) {
        return '';
      }

      return input.replace(regex, function (match, text) {
        var className = text.replace(/_/g, '-');
        var output = ['<i class="emoji-picker emoji-', className, '" alt="', text, '" title=":', text, ':"></i>'];

        return output.join('');
      });
    };
  }
]);
