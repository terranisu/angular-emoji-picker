'use strict';

angular.module('vkEmojiExample', [
  'ngMaterial',
  'ngMessages',
  'vkEmojiPicker'
]).controller('EmojiController', [
  '$scope', function ($scope) {
    $scope.post = {
      author: '',
      title: '',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit... ' +
               'What else do you expect from me? :trollface: :+1:'
    };
  }
]);
