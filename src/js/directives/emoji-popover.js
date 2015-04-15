angular.module('vkEmojiPicker').directive('emojiPopover', [
  '$emojiPopover', function ($emojiPopover) {
    return {
      restrict: 'A',
      link: function ($scope, element, attrs) {
        var config = {
          scope: $scope
        };

        config.title = attrs.title || '';
        config.placement = attrs.placement || 'top';
        config.template = attrs.template || 'templates/emoji-popover.html';

        var popover = $emojiPopover(element, config);

        $scope.$on('$destroy', function () {
          if (popover) {
            popover.destroy();
          }

          config = null;
          popover = null;
        });
      }
    };
  }
]);
