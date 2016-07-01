angular.module('vkEmojiPicker').filter('emojify', [
  'vkEmojiTransforms', function (vkEmojiTransforms) {
    return vkEmojiTransforms.emojify;
  }
]);
