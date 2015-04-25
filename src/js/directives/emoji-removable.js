// TODO: it is needed to check this directive for memory leaks.
angular.module('vkEmojiPicker').directive('emojiRemovable', function () {
  return {
    restrict: 'A',
    scope: {
      model: '=emojiRemovable'
    },
    link: function ($scope, element) {
      var createMapping = function (words, emojis) {
        var map = [];
        var offset = 0;

        angular.forEach(emojis, function (emoji) {
          var emojiElement = angular.element(emoji);
          var regexp = new RegExp('^:?' + emojiElement.attr('alt') + ':?$');

          for (var i = offset; i < words.length; i++) {
            if (regexp.test(words[i])) {
              map.push(i);
              offset = i + 1;
              break;
            }
          }
        });

        return map;
      };

      var rebindClick = function () {
        if ($scope.model == null) {
          return;
        }

        var words = $scope.model.split(/\s+/);
        var emojis = element[0].querySelectorAll('i.emoji-picker');
        var mapping = createMapping(words, emojis);

        angular.forEach(emojis, function (emoji, key) {
          var emojiElement = angular.element(emoji);
          emojiElement.off();
          emojiElement.on('click', function () {
            words.splice(mapping[key], 1);
            $scope.model = words.join(' ');
            emojiElement.off();
            emojiElement.remove();
            $scope.$apply();
          });
        });
      };

      $scope.$watch(
        function () {
          return element[0].querySelectorAll('i.emoji-picker').length;
        },
        rebindClick
      );

      $scope.$on('$destroy', function () {
        element.off();
        element.remove();
      });
    }
  };
});
