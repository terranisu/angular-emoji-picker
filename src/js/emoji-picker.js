'use strict';

angular.module('vkEmojiPicker', [
  'ngSanitize',
  //'ui.bootstrap',
  'mgcrea.ngStrap'
]).run([
  '$templateCache', function ($templateCache) {
    //$templateCache.put('template/emoji-picker/button-bootstrap.html',
    //  '<i class="emoji-picker emoji-smile" tooltip-html-unsafe="{{ content }}"' +
    //  'tooltip-placement="{{ !placement && \'left\' || placement }}" tooltip-trigger="click"></i>'
    //);
    //'<i class=\"emoji-picker emoji-{{ emoji }}\" ng-repeat=\"emoji in groups\" ng-click=\"append(emoji)\"></i>'+

    $templateCache.put('template/emoji-picker/button-strap.html',
      '<i class="emoji-picker emoji-smile" bs-popover '+
      'data-template="template/emoji-picker/popover-strap.html" '+
      'data-placement="{{ !placement && \'left\' || placement }}" '+
      'title="{{ title }}"></i>'
    );
    //$templateCache.put('template/smilies/popover-a.html',
    //  '<div ng-model="smilies" class="smilies-selector-content">'+
    //  '<i class="smiley-{{smiley}}" ng-repeat="smiley in smilies" ng-click="append(smiley)"></i>'+
    //  '</div>'
    //);
    $templateCache.put('template/emoji-picker/popover-strap.html',
      '<div class="popover" tabindex="-1">' +
        '<div class="arrow"></div>' +
        '<h3 class="popover-title" ng-bind-html="title" ng-show="title"></h3>' +
        '<div class="popover-content">' +
          '<div class="emoji-container">' +
            '<div class="emoji-groups">' +
              '<i class="emoji-group {{ ::group.icon.name }}"' +
              ' ng-class="(group.icon.selected === selectedGroup.icon.selected) ? selectedGroup.icon.selected : \'\'"' +
              ' ng-repeat="group in ::groups" ng-click="changeGroup(group)"></i>' +
              '<div class="pull-right close-button-holder">' +
                '<button type="button" class="close" ng-click="$hide()">&times;</button>' +
              '</div>' +
            '</div>' +
            '<i class="emoji-picker emoji-{{ ::toClassName(emoji) }}" ng-repeat="emoji in selectedGroup.emoji" ng-click="append(emoji)"></i>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }
]);
