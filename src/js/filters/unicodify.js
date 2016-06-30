angular.module('vkEmojiPicker').filter('unicodify', [
  'vkEmojiTransforms', function (vkEmojiTransforms) {
    return vkEmojiTransforms.unicodify;
  }
]);
