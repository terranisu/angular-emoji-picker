angular.module('vkEmojiPicker').directive('emojiPicker', [
  'EmojiGroups', function (emojiGroups) {
    try {
      angular.module('ui.bootstrap.popover');
      var templateUrl = 'template/emoji-picker/button-bootstrap.html';
    } catch(e) {
      try {
        angular.module('mgcrea.ngStrap.popover');
        var templateUrl = 'template/emoji-picker/button-strap.html';
      } catch(e) {
        var templateUrl = '../src/templates/emoji-button.html';
      }
    }

    //var storeEmoji = function (emoji) {
    //
    //};


    return {
      restrict: 'A',
      templateUrl: templateUrl,
      scope: {
        model: '=emojiPicker',
        placement: '@emojiPlacement',
        title: '@emojiTitle'
      },
      link: function($scope) {
        $scope.groups = emojiGroups.groups;
        $scope.selectedGroup = emojiGroups.groups[0];

        $scope.append = function (emoji) {
          $scope.model += [' :', emoji, ':'].join('');
        };

        $scope.toClassName = function (emoji) {
          return emoji.replace(/_/g, '-');
        };

        $scope.changeGroup = function (group) {
          $scope.selectedGroup = group;
        }
      }
    };
  }
]);
