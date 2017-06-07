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
		
		scope.emojiClicked = function (emoji) {
		  scope.append(emoji);
		};

        $popover.$promise = loadTemplate(options.template);
        $popover.$promise.then(function (template) {
          if (angular.isObject(template)) {
            template = template.data;
          }

          popoverTemplate = template;
          popoverLinker = $compile(template);
		  
	      // Public scope interface


		  // Fetch a cloned element linked from template
		  popoverScope = $popover.$scope.$new();
		  popoverElement = popoverLinker(popoverScope, function (clonedElement, scope) {});

		  element.after(popoverElement);

		  popoverElement.addClass(options.placement);
		  $popover.$isShown = true;
        });


        return $popover;
      }

      return EmojiPopover;
    }
  ];
});
