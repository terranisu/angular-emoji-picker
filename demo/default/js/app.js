'use strict';

angular.module('vkEmojiDefaultExample', [
  'ngMaterial',
  'ngMessages',
  'vkEmojiPicker'
]).controller('EmojiController', [
  '$scope', function ($scope) {
    $scope.post = {
      author: '',
      title: '',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit... ' +
      'What else do you expect from me? 1f61d 1f170 :smile:'
    };
  }
]);
