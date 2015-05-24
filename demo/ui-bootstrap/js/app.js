'use strict';

angular.module('vkEmojiUiBootstrapExample', [
  'ngMaterial',
  'ngMessages',
  'vkEmojiPicker',
  'ui.bootstrap.popover',
  'template/popover/popover-template.html'
]).controller('EmojiController', [
  '$scope', function ($scope) {
    $scope.post = {
      author: '',
      title: '',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit... :smile: :thumbsup: :sushi:'
    };
  }
]);
