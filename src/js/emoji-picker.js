'use strict';

angular.module('vkEmojiPicker', ['ngSanitize', 'templates-dist']).run([
  '$templateCache', function ($templateCache) {
    // Angular-UI Bootstrap templates
    $templateCache.put('templates/emoji-button-bootstrap.html',
      '<i class="emoji-picker emoji-smile" popover-template="templates/emoji-popover-bootstrap.html"' +
      ' popover-placement="{{ !placement && \'left\' || placement }}" popover-title="{{ title }}"></i>'
    );

    // TODO: compile this template by html2js
    $templateCache.put('template/popover/popover-template.html',
      '<div class="popover" tooltip-animation-class="fade" tooltip-classes ng-class="{ in: isOpen() }">' +
        '<div class="arrow"></div>' +
        '<div class="popover-inner">' +
          '<h3 class="popover-title" ng-bind="title" ng-if="title"></h3>' +
          '<div class="popover-content" ' +
            'tooltip-template-transclude="content" ' +
            'tooltip-template-transclude-scope="originScope()">' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    $templateCache.put('templates/emoji-popover-bootstrap.html',
      '<div class="emoji-container">' +
        '<div class="emoji-groups">' +
          '<i class="emoji-group {{ ::group.icon.name }}"' +
          ' ng-class="(group.icon.selected === selectedGroup.icon.selected) ? selectedGroup.icon.selected : \'\'"' +
          ' ng-repeat="group in ::groups" ng-click="changeGroup(group)"></i>' +
        '</div>' +
        '<i class="emoji-picker emoji-{{ ::toClassName(emoji) }}"' +
        ' ng-repeat="emoji in selectedGroup.emoji" ng-click="append(emoji)"></i>' +
      '</div>'
    );

    // Angular Strap templates
    $templateCache.put('templates/emoji-button-strap.html',
      '<i class="emoji-picker emoji-smile" bs-popover template="templates/emoji-popover-strap.html" ' +
      'placement="{{ !placement && \'left\' || placement }}" title="{{ title }}"></i>'
    );

    $templateCache.put('templates/emoji-popover-strap.html',
      '<div class="popover" tabindex="-1">' +
        '<div class="arrow"></div>' +
        '<div class="close-button-holder">' +
          '<i class="close-button" ng-click="$hide()">&times;</i>' +
        '</div>' +
        '<h3 class="popover-title" ng-bind-html="title" ng-show="title"></h3>' +
        '<div class="popover-content">' +
          '<div class="emoji-container">' +
            '<div class="emoji-groups">' +
              '<i class="emoji-group {{ ::group.icon.name }}"' +
              ' ng-class="(group.icon.selected === selectedGroup.icon.selected) ? selectedGroup.icon.selected : \'\'"' +
              ' ng-repeat="group in ::groups" ng-click="changeGroup(group)"></i>' +
            '</div>' +
            '<i class="emoji-picker emoji-{{ ::toClassName(emoji) }}"' +
            ' ng-repeat="emoji in selectedGroup.emoji" ng-click="append(emoji)"></i>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }
]);
