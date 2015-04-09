angular.module('vkEmojiPicker').provider('$emojiPopover', function() {
  var defaultSettings = {
    title: '',
    placement: 'top'
  };

  this.$get = [
    '$rootScope', '$http', '$sce', '$templateCache', '$compile',
    function ($rootScope, $http, $sce, $templateCache, $compile) {
      function EmojiPopover(element, config) {
        var $popover = {},
            fetchPromises = {},
            popoverLinker,
            popoverTemplate,
            popoverElement,
            popoverScope,
            options = angular.extend({}, defaultSettings, config),
            scope = $popover.$scope = options.scope && options.scope.$new() || $rootScope.$new();

        $popover.$promise = fetchTemplate(options.template);

        if (options.title) {
          scope.title = $sce.trustAsHtml(options.title);
        }

        scope.$hide = function() {
          scope.$$postDigest(function() {
            $popover.hide();
          });
        };

        $popover.$isShown = false;

        $popover.show = function() {
          if ($popover.$isShown) {
            return;
          }

          var parent = null, after = element;

          // Hide any existing popoverElement
          if (popoverElement) {
            destroyPopoverElement();
          }

          // Fetch a cloned element linked from template
          popoverScope = $popover.$scope.$new();
          popoverElement = popoverLinker(popoverScope, function (clonedElement, scope) {});

          //// Set the initial positioning.  Make the tooltip invisible
          //// so IE doesn't try to focus on it off screen.
          //tipElement.css({top: '-9999px', left: '-9999px', display: 'block', visibility: 'hidden'});

          after ? after.after(popoverElement) : parent.prepend(popoverElement);
          $popover.$isShown = true;
          scope.$digest();

          popoverElement.addClass(options.placement);
        };

        $popover.hide = function () {
          if (!$popover.$isShown) {
            return;
          }

          destroyPopoverElement();
          $popover.$isShown = false;
        };

        $popover.toggle = function () {
          $popover.$isShown ? $popover.hide() : $popover.show();
        };

        $popover.destroy = function() {
          element.off('click', $popover.toggle);
          // Remove element
          destroyPopoverElement();
          // Destroy scope
          scope.$destroy();
        };

        $popover.$promise.then(function (template) {
          if (angular.isObject(template)) {
            template = template.data;
          }
          //if(options.html) template = template.replace(htmlReplaceRegExp, 'ng-bind-html="');
          //template = trim.apply(template);
          popoverTemplate = template;
          popoverLinker = $compile(template);
          element.on('click', $popover.toggle);
        });

        function fetchTemplate(template) {
          if (fetchPromises[template]) {
            return fetchPromises[template];
          }

          return (fetchPromises[template] = $http.get(template, { cache: $templateCache }).then(function (response) {
            return response.data;
          }));
        }

        function destroyPopoverElement() {
          if (popoverScope) {
            popoverScope.$destroy();
            popoverScope = null;
          }

          if (popoverElement) {
            popoverElement.remove();
            popoverElement = null;
          }
        }

        return $popover;
      }

      return EmojiPopover;
    }
  ];
});
