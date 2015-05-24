angular.module('vkEmojiPicker').filter('emojify', [
  '$filter', function ($filter) {
    var hexify = $filter('hexify');
    var unicodify = $filter('unicodify');

    return function (input) {
      return unicodify(hexify(input));
    };
  }
]);
