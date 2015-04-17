'use strict';

angular.module('vkEmojiUiBootstrapExample', [
  'ngMaterial',
  'ngMessages',
  'vkEmojiPicker',
  'ui.bootstrap.popover'
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
