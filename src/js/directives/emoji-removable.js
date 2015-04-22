angular.module('vkEmojiPicker').directive('emojiRemovable', [function () {
  return {
    restrict: 'A',
    scope: {
      model: '=emojiRemovable'
    },
    link: function ($scope, element) {
      var rebindClick = function (_newLength, _oldLength) {
        var emojis = element[0].querySelectorAll('i.emoji-picker');
        angular.forEach(emojis, function (emoji) {
          var emojiElement = angular.element(emoji);
          emojiElement.off();
          emojiElement.on('click', function () {
            $scope.model = $scope.model.replace(emojiElement.attr('title'), '');
            emojiElement.off();
            emojiElement.remove();
            $scope.$apply();
          });
        });
      };

      $scope.$watch(
        function () { return element[0].querySelectorAll('i.emoji-picker').length; },
        rebindClick
      );

      $scope.$on('$destroy', function () {
        element.remove();
      });
    }
  };
}]);
