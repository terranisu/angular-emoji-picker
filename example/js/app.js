'use strict';

angular.module('vkEmojiExample', [
  'vkEmojiPicker',
  //'mgcrea.ngStrap',
  //'ui.bootstrap'
]).controller('EmojiController', [
  '$scope', function ($scope) {
    $scope.message = 'this is a test message :smile: :+1: :trollface:';
  }
]);
