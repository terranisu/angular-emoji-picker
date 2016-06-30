angular.module('vkEmojiPicker').provider('$emojiPopover', function () {
  var defaultSettings = {
    title: '',
    placement: 'top',
    template: 'src/templates/emoji-popover.html'
  };

  this.$get = [
    '$rootScope', '$http', '$sce', '$templateCache', '$compile',
    function ($rootScope, $http, $sce, $templateCache, $compile) {
      function EmojiPopover(element, config) {
        var $popover = {};
        var fetchPromises = {};
        var popoverLinker;
        var popoverTemplate;
        var popoverElement;
        var popoverScope;
        var options = angular.extend({}, defaultSettings, config);
        var scope = $popover.$scope = options.scope && options.scope.$new() || $rootScope.$new();

        // Private functions

        var loadTemplate = function (template) {
          if (fetchPromises[template]) {
            return fetchPromises[template];
          }

          fetchPromises[template] = $http.get(template, {
            cache: $templateCache
          });

          return fetchPromises[template].then(function (response) {
            return response.data;
          });
        };

        var applyPlacement = function (parentElement, popoverElement) {
          var elem = parentElement[0];
          var clientRect = elem.getBoundingClientRect();
          var popoverWidth = popoverElement.prop('offsetWidth');
          var popoverHeight = popoverElement.prop('offsetHeight');
          var offset = getPopoverOffset(options.placement, clientRect, popoverWidth, popoverHeight);

          popoverElement.css({
            top: offset.top + 'px',
            left: offset.left + 'px'
          });
        };

        var getPopoverOffset = function (placement, position, popoverWidth, popoverHeight) {
          var offset;

          switch (placement) {
            case 'right':
              offset = {
                top: position.top - popoverHeight / 4,
                left: position.left + position.width
              };
              break;
            case 'bottom':
              offset = {
                top: position.top - position.height * 2,
                left: position.left
              };
              break;
            case 'left':
              offset = {
                top: position.top - popoverHeight / 4,
                left: position.left - popoverWidth
              };
              break;
            case 'right-relative':
              offset = {
                top: 12,
                left: 24
              };
              break;
            case 'top':
            default:
              offset = {
                top: position.top - popoverHeight - position.height * 3,
                left: position.left
              };
              break;
          }

          return offset;
        };

        var destroyPopoverElement = function (scope, element) {
          if (scope) {
            scope.$destroy();
            scope = null;
          }

          if (element) {
            element.remove();
            element = null;
          }
        };

        // Public scope interface

        if (options.title) {
          scope.title = $sce.trustAsHtml(options.title);
        }

        scope.placement = options.placement;

        scope.$hide = function () {
          $popover.hide();
        };

        scope.emojiClicked = function (emoji) {
          scope.append(emoji);
          $popover.hide();
        };

        // Public popover interface

        $popover.$isShown = false;
        $popover.$promise = loadTemplate(options.template);
        $popover.$promise.then(function (template) {
          if (angular.isObject(template)) {
            template = template.data;
          }

          popoverTemplate = template;
          popoverLinker = $compile(template);
          element.on('click', $popover.toggle);
        });

        $popover.show = function () {
          if ($popover.$isShown) {
            return;
          }

          // Hide any existing popoverElement
          if (popoverScope && popoverElement) {
            destroyPopoverElement(popoverScope, popoverElement);
          }

          // Fetch a cloned element linked from template
          popoverScope = $popover.$scope.$new();
          popoverElement = popoverLinker(popoverScope, function (clonedElement, scope) {});

          element.after(popoverElement);
          $popover.$isShown = true;
          scope.$digest();

          popoverElement.addClass(options.placement);
          applyPlacement(element, popoverElement);
        };

        $popover.hide = function () {
          if (!$popover.$isShown) {
            return;
          }

          destroyPopoverElement(popoverScope, popoverElement);
          $popover.$isShown = false;
        };

        $popover.toggle = function () {
          $popover.$isShown ? $popover.hide() : $popover.show();
        };

        $popover.destroy = function () {
          element.off('click', $popover.toggle);
          destroyPopoverElement(popoverScope, popoverElement);
          scope.$destroy();
        };

        return $popover;
      }

      return EmojiPopover;
    }
  ];
});
