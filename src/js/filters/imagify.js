angular.module('vkEmojiPicker').filter('imagify', [
  'vkEmojiTransforms', function (vkEmojiTransforms) {
    return vkEmojiTransforms.imagify;
  }
]);
