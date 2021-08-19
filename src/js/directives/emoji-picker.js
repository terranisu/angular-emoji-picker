angular.module("vkEmojiPicker").directive("emojiPicker", [
  "EmojiGroups",
  "vkEmojiStorage",
  "vkEmojiTransforms",
  function (emojiGroups, storage, vkEmojiTransforms) {
    var RECENT_LIMIT = 54;
    var DEFAULT_OUTPUT_FORMAT = "";
    var templateUrl = "templates/emoji-button-bootstrap.html";

    try {
      angular.module("ui.bootstrap.popover");
    } catch (e) {
      try {
        angular.module("mgcrea.ngStrap.popover");
        templateUrl = "templates/emoji-button-strap.html";
      } catch (e) {
        templateUrl = "templates/emoji-button.html";
      }
    }

    return {
      restrict: "A",
      templateUrl: templateUrl,
      scope: {
        model: "=emojiPicker",
        placement: "@",
        title: "@",
        onChangeFunc: "=",
        customGroups: "=",
      },
      link: function ($scope, element, attrs) {
        var recentLimit = parseInt(attrs.recentLimit, 10) || RECENT_LIMIT;
        var outputFormat = attrs.outputFormat || DEFAULT_OUTPUT_FORMAT;

        if ($scope.customGroups) {
          $scope.groups = $scope.customGroups;
        } else {
          $scope.groups = emojiGroups.groups;
        }
        $scope.selectedGroup = $scope.groups[0];
        $scope.selectedGroup.emoji = storage.getFirst(recentLimit);

        $scope.append = function (emoji) {
          if ($scope.model == null) {
            $scope.model = "";
          }

          $scope.model += formatSelectedEmoji(emoji, outputFormat);
          $scope.model = $scope.model.trim();
          storage.store(emoji);

          fireOnChangeFunc();
        };

        $scope.remove = function () {
          if (angular.isDefined($scope.model)) {
            var words = $scope.model.split(" ");
            words.pop();
            $scope.model = words.join(" ").trim();

            fireOnChangeFunc();
          }
        };

        $scope.toClassName = function (emoji) {
          return emoji.replace(/_/g, "-");
        };

        $scope.changeGroup = function (group) {
          $scope.selectedGroup = group;

          if ($scope.selectedGroup.name === "recent") {
            $scope.selectedGroup.emoji = storage.getFirst(recentLimit);
          }
        };

        $scope.$on("$destroy", function () {
          element.remove();
        });

        function formatSelectedEmoji(emoji, type) {
          emoji = [" :", emoji, ":"].join("");
          if (type == "unicode") {
            return vkEmojiTransforms.emojify(emoji);
          } else {
            return emoji;
          }
        }

        function fireOnChangeFunc() {
          if (
            $scope.onChangeFunc &&
            typeof $scope.onChangeFunc === "function"
          ) {
            setTimeout($scope.onChangeFunc);
          }
        }
      },
    };
  },
]);
