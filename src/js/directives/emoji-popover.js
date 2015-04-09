angular.module('vkEmojiPicker')
  .directive('emojiPopover', ['$emojiPopover', function ($emojiPopover) {
    return {
      restrict: 'A',
      //templateUrl: '../src/templates/emoji-popover.html',
      //scope: {
      //  model: '=emojiPopover',
      //  placement: '@emojiPlacement',
      //  title: '@emojiTitle'
      //},
      link: function($scope, element, attrs) {
        var config = { scope: $scope };

        config.title = attrs.title || '';
        config.placement = attrs.placement || 'top';
        config.template = attrs.template || '../src/templates/emoji-popover.html';

        var popover = $emojiPopover(element, config);
        //popover.show();
        //$scope.groups = emojiGroups.groups;
        //$scope.selectedGroup = emojiGroups.groups[0];
        //
        //$scope.append = function (emoji) {
        //  $scope.model += [' :', emoji, ':'].join('');
        //};
        //
        //$scope.toClassName = function (emoji) {
        //  return emoji.replace(/_/g, '-');
        //};
        //
        //$scope.changeGroup = function (group) {
        //  $scope.selectedGroup = group;
        //}

        $scope.$on('$destroy', function() {
          if (popover) {
            popover.destroy();
          }

          config = null;
          popover = null;
        });
      }
    };
  }]);
