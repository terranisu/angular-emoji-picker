angular.module('vkEmojiPicker').filter('hexify', [
  'vkEmojiTransforms', function (vkEmojiTransforms) {
    return vkEmojiTransforms.hexify;
  }
]);
