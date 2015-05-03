angular.module('vkEmojiPicker').directive('emojiPicker', [
  'EmojiGroups', 'vkEmojiStorage', '$filter', function (emojiGroups, storage, $filter) {
    var RECENT_LIMIT = 54;
    var templateUrl = 'templates/emoji-button-bootstrap.html';

    try {
      angular.module('ui.bootstrap.popover');
    } catch (e) {
      try {
        angular.module('mgcrea.ngStrap.popover');
        templateUrl = 'templates/emoji-button-strap.html';
      } catch (e) {
        templateUrl = 'templates/emoji-button.html';
      }
    }

    return {
      restrict: 'A',
      templateUrl: templateUrl,
      scope: {
        model: '=emojiPicker',
        placement: '@',
        title: '@'
      },
      link: function ($scope, element, attrs) {
        var recentLimit = parseInt(attrs.recentLimit, 10) || RECENT_LIMIT;

        $scope.groups = emojiGroups.groups;
        $scope.selectedGroup = emojiGroups.groups[0];
        $scope.selectedGroup.emoji = storage.getFirst(recentLimit);

        $scope.append = function (emoji) {
          if ($scope.model == null) {
            $scope.model = '';
          }
          
          if (attrs.hasOwnProperty('output')) {
            switch (attrs.output) {
              case 'unicode':
                $scope.model += String.fromCodePoint('0x' + $filter('hexify')([' :', emoji, ':'].join('')).trim());
              break;
              default:
              $scope.model += [' :', emoji, ':'].join('').trim();
            }
          } else {
            $scope.model += [' :', emoji, ':'].join('').trim();
          }
          
          $scope.model = $scope.model.trim();
          storage.store(emoji);
        };

        $scope.toClassName = function (emoji) {
          return emoji.replace(/_/g, '-');
        };

        $scope.changeGroup = function (group) {
          $scope.selectedGroup = group;

          if ($scope.selectedGroup.name === 'recent') {
            $scope.selectedGroup.emoji = storage.getFirst(recentLimit);
          }
        };

        $scope.$on('$destroy', function () {
          element.remove();
        });
      }
    };
  }
]);
