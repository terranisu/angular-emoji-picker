angular.module('templates-dist', ['templates/emoji-button.html', 'templates/emoji-popover.html']);

angular.module("templates/emoji-button.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/emoji-button.html",
    "<i class=\"emoji-picker emoji-smile\" emoji-popover template=\"templates/emoji-popover.html\" placement=\"{{ ::placement }}\" title=\"{{ ::title }}\"></i>\n" +
    "");
}]);

angular.module("templates/emoji-popover.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/emoji-popover.html",
    "<div class=\"emoji-popover\" tabindex=\"-1\">\n" +
    "  <div class=\"close-button-holder\">\n" +
    "    <i class=\"close-button\" ng-click=\"$hide()\">&times;</i>\n" +
    "  </div>\n" +
    "  <h3 class=\"emoji-popover-title\" ng-bind-html=\"title\" ng-show=\"title\"></h3>\n" +
    "  <div class=\"emoji-popover-content\">\n" +
    "    <div class=\"emoji-container\">\n" +
    "      <div class=\"emoji-groups\">\n" +
    "        <i class=\"emoji-group {{ ::group.icon.name }}\"\n" +
    "           ng-class=\"(group.icon.selected === selectedGroup.icon.selected) ? selectedGroup.icon.selected : ''\"\n" +
    "           ng-repeat=\"group in ::groups\" ng-click=\"changeGroup(group)\"></i>\n" +
    "      </div>\n" +
    "      <i class=\"emoji-picker emoji-{{ ::toClassName(emoji) }}\" ng-repeat=\"emoji in selectedGroup.emoji\" ng-click=\"append(emoji)\"></i>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

'use strict';

angular.module('vkEmojiPicker', ['ngSanitize', 'templates-dist']).config(function () {
  /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
  if (!String.fromCodePoint) {
    (function () {
      var defineProperty = (function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
        try {
          var object = {};
          var $defineProperty = Object.defineProperty;
          var result = $defineProperty(object, object, object) && $defineProperty;
        } catch (error) {}
        return result;
      }());

      var stringFromCharCode = String.fromCharCode;
      var floor = Math.floor;

      var fromCodePoint = function () {
        var MAX_SIZE = 0x4000;
        var codeUnits = [];
        var highSurrogate;
        var lowSurrogate;
        var index = -1;
        var length = arguments.length;

        if (!length) {
          return '';
        }

        var result = '';

        while (++index < length) {
          var codePoint = Number(arguments[index]);
          if (
            !isFinite(codePoint) ||       // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 ||              // not a valid Unicode code point
            codePoint > 0x10FFFF ||       // not a valid Unicode code point
            floor(codePoint) != codePoint // not an integer
          ) {
            throw RangeError('Invalid code point: ' + codePoint);
          }
          if (codePoint <= 0xFFFF) { // BMP code point
            codeUnits.push(codePoint);
          } else { // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000;
            highSurrogate = (codePoint >> 10) + 0xD800;
            lowSurrogate = (codePoint % 0x400) + 0xDC00;
            codeUnits.push(highSurrogate, lowSurrogate);
          }
          if (index + 1 == length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits);
            codeUnits.length = 0;
          }
        }
        return result;
      };

      if (defineProperty) {
        defineProperty(String, 'fromCodePoint', {
          value: fromCodePoint,
          configurable: true,
          writable: true
        });
      } else {
        String.fromCodePoint = fromCodePoint;
      }
    }());
  }
})
.run([
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

angular.module('vkEmojiPicker').constant('EmojiGroups', (function () {
  var faces = ['smile', 'laughing', 'blush', 'smiley', 'relaxed',
    'smirk', 'heart_eyes', 'kissing_heart', 'kissing_closed_eyes', 'flushed',
    'relieved', 'satisfied', 'grin', 'wink', 'stuck_out_tongue_winking_eye',
    'stuck_out_tongue_closed_eyes', 'grinning', 'kissing', 'winky_face',
    'kissing_smiling_eyes', 'stuck_out_tongue', 'sleeping', 'worried',
    'frowning', 'anguished', 'open_mouth', 'grimacing', 'confused', 'hushed',
    'expressionless', 'unamused', 'sweat_smile', 'sweat', 'wow',
    'disappointed_relieved', 'weary', 'pensive', 'disappointed', 'confounded',
    'fearful', 'cold_sweat', 'persevere', 'cry', 'sob', 'joy', 'astonished',
    'scream', 'neckbeard', 'tired_face', 'angry', 'rage', 'triumph', 'sleepy',
    'yum', 'mask', 'sunglasses', 'dizzy_face', 'imp', 'smiling_imp',
    'neutral_face', 'no_mouth', 'innocent', 'alien', 'yellow_heart',
    'blue_heart', 'purple_heart', 'heart', 'green_heart', 'broken_heart',
    'heartbeat', 'heartpulse', 'two_hearts', 'revolving_hearts', 'cupid',
    'sparkling_heart', 'sparkles', 'star', 'star2', 'dizzy', 'boom',
    'collision', 'anger', 'exclamation', 'question', 'grey_exclamation',
    'grey_question', 'zzz', 'dash', 'sweat_drops', 'notes', 'musical_note',
    'fire', 'hankey', 'thumbsup', 'thumbsdown',
    'ok_hand', 'punch', 'fist', 'v', 'wave', 'hand', 'raised_hand',
    'open_hands', 'point_up', 'point_down', 'point_left', 'point_right',
    'raised_hands', 'pray', 'point_up_2', 'clap', 'muscle', 'metal', 'fu',
    'walking', 'runner', 'couple', 'family', 'two_men_holding_hands',
    'two_women_holding_hands', 'dancer', 'dancers', 'ok_woman', 'no_good',
    'information_desk_person', 'raising_hand', 'bride_with_veil',
    'person_with_pouting_face', 'person_frowning', 'bow', 'couplekiss',
    'couple_with_heart', 'massage', 'haircut', 'nail_care', 'boy', 'girl',
    'woman', 'man', 'baby', 'older_woman', 'older_man',
    'person_with_blond_hair', 'man_with_gua_pi_mao', 'man_with_turban',
    'construction_worker', 'cop', 'angel', 'princess', 'smiley_cat',
    'smile_cat', 'heart_eyes_cat', 'kissing_cat', 'smirk_cat', 'scream_cat',
    'crying_cat_face', 'joy_cat', 'pouting_cat', 'japanese_ogre',
    'japanese_goblin', 'see_no_evil', 'hear_no_evil', 'speak_no_evil',
    'guardsman', 'skull', 'feet', 'lips', 'kiss', 'droplet', 'ear', 'eyes',
    'nose', 'tongue', 'love_letter', 'bust_in_silhouette',
    'busts_in_silhouette', 'speech_balloon', 'thought_balloon'];

  var nature = ['sunny', 'umbrella', 'cloud',
    'snowflake', 'snowman', 'zap', 'cyclone', 'foggy', 'ocean', 'cat', 'dog',
    'mouse', 'hamster', 'rabbit', 'wolf', 'frog', 'tiger', 'koala', 'bear',
    'pig', 'pig_nose', 'cow', 'boar', 'monkey_face', 'monkey', 'horse',
    'racehorse', 'camel', 'sheep', 'elephant', 'panda_face', 'snake', 'bird',
    'baby_chick', 'hatched_chick', 'hatching_chick', 'chicken', 'penguin',
    'turtle', 'bug', 'honeybee', 'ant', 'beetle', 'snail', 'octopus',
    'tropical_fish', 'fish', 'whale', 'whale2', 'dolphin', 'cow2', 'ram', 'rat',
    'water_buffalo', 'tiger2', 'rabbit2', 'dragon', 'goat', 'rooster', 'dog2',
    'pig2', 'mouse2', 'ox', 'dragon_face', 'blowfish', 'crocodile',
    'dromedary_camel', 'leopard', 'cat2', 'poodle', 'paw_prints', 'bouquet',
    'cherry_blossom', 'tulip', 'four_leaf_clover', 'rose', 'sunflower',
    'hibiscus', 'maple_leaf', 'leaves', 'fallen_leaf', 'herb', 'mushroom',
    'cactus', 'palm_tree', 'evergreen_tree', 'deciduous_tree', 'chestnut',
    'seedling', 'blossom', 'ear_of_rice', 'shell', 'globe_with_meridians',
    'sun_with_face', 'full_moon_with_face', 'new_moon_with_face', 'new_moon',
    'waxing_crescent_moon', 'first_quarter_moon', 'waxing_gibbous_moon',
    'full_moon', 'waning_gibbous_moon', 'last_quarter_moon',
    'waning_crescent_moon', 'last_quarter_moon_with_face',
    'first_quarter_moon_with_face', 'moon', 'earth_africa', 'earth_americas',
    'earth_asia', 'volcano', 'milky_way', 'partly_sunny'];

  var life = ['bamboo', 'gift_heart', 'dolls', 'school_satchel', 'mortar_board', 'flags',
    'fireworks', 'sparkler', 'wind_chime', 'rice_scene', 'jack_o_lantern',
    'ghost', 'santa', 'christmas_tree', 'gift', 'bell', 'no_bell',
    'tanabata_tree', 'tada', 'confetti_ball', 'balloon', 'crystal_ball', 'cd',
    'dvd', 'floppy_disk', 'camera', 'video_camera', 'movie_camera', 'computer',
    'tv', 'iphone', 'phone', 'telephone', 'telephone_receiver', 'pager', 'fax',
    'minidisc', 'vhs', 'sound', 'speaker', 'mute', 'loudspeaker', 'mega',
    'hourglass', 'hourglass_flowing_sand', 'alarm_clock', 'watch', 'radio',
    'satellite', 'loop', 'mag', 'mag_right', 'unlock', 'lock',
    'lock_with_ink_pen', 'closed_lock_with_key', 'key', 'bulb', 'flashlight',
    'high_brightness', 'low_brightness', 'electric_plug', 'battery', 'calling',
    'email', 'mailbox', 'postbox', 'bath', 'bathtub', 'shower', 'toilet',
    'wrench', 'nut_and_bolt', 'hammer', 'seat', 'moneybag', 'yen', 'dollar',
    'pound', 'euro', 'credit_card', 'money_with_wings', 'e-mail', 'inbox_tray',
    'outbox_tray', 'envelope', 'incoming_envelope', 'postal_horn',
    'mailbox_closed', 'mailbox_with_mail', 'mailbox_with_no_mail', 'door',
    'smoking', 'bomb', 'gun', 'hocho', 'pill', 'syringe', 'page_facing_up',
    'page_with_curl', 'bookmark_tabs', 'bar_chart', 'chart_with_upwards_trend',
    'chart_with_downwards_trend', 'scroll', 'clipboard', 'calendar', 'date',
    'card_index', 'file_folder', 'open_file_folder', 'scissors', 'pushpin',
    'paperclip', 'black_nib', 'pencil2', 'straight_ruler', 'triangular_ruler',
    'closed_book', 'green_book', 'blue_book', 'orange_book', 'notebook',
    'notebook_with_decorative_cover', 'ledger', 'books', 'bookmark',
    'name_badge', 'microscope', 'telescope', 'newspaper', 'football',
    'basketball', 'soccer', 'baseball', 'tennis', '8ball', 'rugby_football',
    'bowling', 'golf', 'mountain_bicyclist', 'bicyclist', 'horse_racing',
    'snowboarder', 'swimmer', 'surfer', 'ski', 'spades', 'hearts', 'clubs',
    'diamonds', 'gem', 'ring', 'trophy', 'musical_score', 'musical_keyboard',
    'violin', 'space_invader', 'video_game', 'black_joker',
    'flower_playing_cards', 'game_die', 'dart', 'mahjong', 'clapper', 'memo',
    'book', 'art', 'microphone', 'headphones', 'trumpet', 'saxophone',
    'guitar', 'shoe', 'sandal', 'high_heel', 'lipstick', 'boot', 'shirt',
    'necktie', 'womans_clothes', 'dress', 'running_shirt_with_sash',
    'jeans', 'kimono', 'bikini', 'ribbon', 'tophat', 'crown', 'womans_hat',
    'mans_shoe', 'closed_umbrella', 'briefcase', 'handbag', 'pouch', 'purse',
    'eyeglasses', 'fishing_pole_and_fish', 'coffee', 'tea', 'sake',
    'baby_bottle', 'beer', 'beers', 'cocktail', 'tropical_drink', 'wine_glass',
    'fork_and_knife', 'pizza', 'hamburger', 'fries', 'poultry_leg',
    'meat_on_bone', 'spaghetti', 'curry', 'fried_shrimp', 'bento', 'sushi',
    'fish_cake', 'rice_ball', 'rice_cracker', 'rice', 'ramen', 'stew', 'oden',
    'dango', 'egg', 'bread', 'doughnut', 'custard', 'icecream', 'ice_cream',
    'shaved_ice', 'birthday', 'cake', 'cookie', 'chocolate_bar', 'candy',
    'lollipop', 'honey_pot', 'apple', 'green_apple', 'tangerine', 'lemon',
    'cherries', 'grapes', 'watermelon', 'strawberry', 'peach', 'melon',
    'banana', 'pear', 'pineapple', 'sweet_potato', 'eggplant', 'tomato', 'corn'];

  var travel = ['house', 'house_with_garden', 'school', 'office', 'post_office', 'hospital',
    'bank', 'convenience_store', 'love_hotel', 'hotel', 'wedding', 'church',
    'department_store', 'european_post_office', 'city_sunrise', 'city_sunset',
    'japanese_castle', 'european_castle', 'tent', 'factory', 'tokyo_tower',
    'japan', 'mount_fuji', 'sunrise_over_mountains', 'sunrise', 'stars',
    'statue_of_liberty', 'bridge_at_night', 'carousel_horse', 'rainbow',
    'ferris_wheel', 'fountain', 'roller_coaster', 'ship', 'speedboat', 'boat',
    'rowboat', 'anchor', 'rocket', 'airplane', 'helicopter',
    'steam_locomotive', 'tram', 'mountain_railway', 'bike', 'aerial_tramway',
    'suspension_railway', 'mountain_cableway', 'tractor', 'blue_car',
    'oncoming_automobile', 'car', 'taxi', 'oncoming_taxi',
    'articulated_lorry', 'bus', 'oncoming_bus', 'rotating_light', 'police_car',
    'oncoming_police_car', 'fire_engine', 'ambulance', 'minibus', 'truck',
    'train', 'station', 'bullettrain_front', 'bullettrain_side',
    'light_rail', 'monorail', 'railway_car', 'trolleybus', 'ticket', 'fuelpump',
    'vertical_traffic_light', 'traffic_light', 'warning', 'construction',
    'beginner', 'atm', 'slot_machine', 'busstop', 'barber', 'hotsprings',
    'checkered_flag', 'crossed_flags', 'izakaya_lantern', 'moyai',
    'circus_tent', 'performing_arts', 'round_pushpin',
    'triangular_flag_on_post', 'jp', 'kr', 'cn', 'us', 'fr', 'es', 'it', 'ru', 'uk', 'de'];

  var signs = ['one', 'two', 'three', 'four', 'five', 'six', 'seven',
    'eight', 'nine', 'keycap_ten', '1234', 'zero', 'hash', 'symbols',
    'arrow_backward', 'arrow_down', 'arrow_forward', 'arrow_left',
    'capital_abcd', 'abcd', 'abc', 'arrow_lower_left', 'arrow_lower_right',
    'arrow_right', 'arrow_up', 'arrow_upper_left', 'arrow_upper_right',
    'arrow_double_down', 'arrow_double_up', 'arrow_down_small',
    'arrow_heading_down', 'arrow_heading_up', 'leftwards_arrow_with_hook',
    'arrow_right_hook', 'left_right_arrow', 'arrow_up_down', 'arrow_up_small',
    'arrows_clockwise', 'arrows_counterclockwise', 'rewind', 'fast_forward',
    'information_source', 'ok', 'twisted_rightwards_arrows', 'repeat',
    'repeat_one', 'new', 'top', 'up', 'cool', 'free', 'ng', 'cinema', 'koko',
    'signal_strength', 'u5272', 'u5408', 'u55b6', 'u6307', 'u6708', 'u6709',
    'u6e80', 'u7121', 'u7533', 'u7a7a', 'u7981', 'sa', 'restroom', 'mens',
    'womens', 'baby_symbol', 'no_smoking', 'parking', 'wheelchair', 'metro',
    'baggage_claim', 'accept', 'wc', 'potable_water', 'put_litter_in_its_place',
    'secret', 'congratulations', 'm', 'passport_control', 'left_luggage',
    'customs', 'ideograph_advantage', 'cl', 'sos', 'id', 'no_entry_sign',
    'underage', 'no_mobile_phones', 'do_not_litter', 'non-potable_water',
    'no_bicycles', 'no_pedestrians', 'children_crossing', 'no_entry',
    'eight_spoked_asterisk', 'eight_pointed_black_star', 'heart_decoration',
    'vs', 'vibration_mode', 'mobile_phone_off', 'chart', 'currency_exchange',
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpius',
    'sagittarius', 'capricorn', 'aquarius', 'pisces', 'ophiuchus',
    'six_pointed_star', 'negative_squared_cross_mark', 'a', 'b', 'ab', 'o2',
    'diamond_shape_with_a_dot_inside', 'recycle', 'end', 'on', 'soon', 'clock1',
    'clock130', 'clock10', 'clock1030', 'clock11', 'clock1130', 'clock12',
    'clock1230', 'clock2', 'clock230', 'clock3', 'clock330', 'clock4',
    'clock430', 'clock5', 'clock530', 'clock6', 'clock630', 'clock7',
    'clock730', 'clock8', 'clock830', 'clock9', 'clock930', 'heavy_dollar_sign',
    'copyright', 'registered', 'tm', 'x', 'heavy_exclamation_mark', 'bangbang',
    'interrobang', 'o', 'heavy_multiplication_x', 'heavy_plus_sign',
    'heavy_minus_sign', 'heavy_division_sign', 'white_flower', '100',
    'heavy_check_mark', 'ballot_box_with_check', 'radio_button', 'link',
    'curly_loop', 'wavy_dash', 'part_alternation_mark', 'trident',
    'black_square', 'white_square', 'white_check_mark', 'black_square_button',
    'white_square_button', 'black_circle', 'white_circle', 'red_circle',
    'large_blue_circle', 'large_blue_diamond', 'large_orange_diamond',
    'small_blue_diamond', 'small_orange_diamond', 'small_red_triangle',
    'small_red_triangle_down'];

  var all = faces.concat(nature, life, travel, signs);

  return {
    groups: [
      {
        name: 'recent',
        icon: {
          name: 'icon-recent',
          selected: 'icon-recent-selected'
        },
        emoji: []
      }, {
        name: 'smile',
        icon: {
          name: 'icon-smile',
          selected: 'icon-smile-selected'
        },
        emoji: faces
      }, {
        name: 'flower',
        icon: {
          name: 'icon-flower',
          selected: 'icon-flower-selected'
        },
        emoji: nature
      }, {
        name: 'bell',
        icon: {
          name: 'icon-bell',
          selected: 'icon-bell-selected'
        },
        emoji: life
      }, {
        name: 'car',
        icon: {
          name: 'icon-car',
          selected: 'icon-car-selected'
        },
        emoji: travel
      }, {
        name: 'grid',
        icon: {
          name: 'icon-grid',
          selected: 'icon-grid-selected'
        },
        emoji: signs
      }
    ],
    all: all
  };
})());

angular.module('vkEmojiPicker').constant('EmojiHex', (function () {
  var codes = {
    copyright:'00a9',
    registered:'00ae',
    bangbang:'203c',
    interrobang:'2049',
    tm:'2122',
    information_source:'2139',
    left_right_arrow:'2194',
    arrow_up_down:'2195',
    arrow_upper_left:'2196',
    arrow_upper_right:'2197',
    arrow_lower_right:'2198',
    arrow_lower_left:'2199',
    leftwards_arrow_with_hook:'21a9',
    arrow_right_hook:'21aa',
    watch:'231a',
    hourglass:'231b',
    fast_forward:'23e9',
    rewind:'23ea',
    arrow_double_up:'23eb',
    arrow_double_down:'23ec',
    alarm_clock:'23f0',
    hourglass_flowing_sand:'23f3',
    m:'24c2',
    black_small_square:'25aa',
    white_small_square:'25ab',
    arrow_forward:'25b6',
    arrow_backward:'25c0',
    white_medium_square:'25fb',
    black_medium_square:'25fc',
    white_medium_small_square:'25fd',
    black_medium_small_square:'25fe',
    sunny:'2600',
    cloud:'2601',
    phone:'260e',
    telephone:'260e',
    ballot_box_with_check:'2611',
    umbrella:'2614',
    coffee:'2615',
    point_up:'261d',
    relaxed:'263a',
    aries:'2648',
    taurus:'2649',
    gemini:'264a',
    cancer:'264b',
    leo:'264c',
    virgo:'264d',
    libra:'264e',
    scorpius:'264f',
    sagittarius:'2650',
    capricorn:'2651',
    aquarius:'2652',
    pisces:'2653',
    spades:'2660',
    clubs:'2663',
    hearts:'2665',
    diamonds:'2666',
    hotsprings:'2668',
    recycle:'267b',
    wheelchair:'267f',
    anchor:'2693',
    warning:'26a0',
    zap:'26a1',
    white_circle:'26aa',
    black_circle:'26ab',
    soccer:'26bd',
    baseball:'26be',
    snowman:'26c4',
    partly_sunny:'26c5',
    ophiuchus:'26ce',
    no_entry:'26d4',
    church:'26ea',
    fountain:'26f2',
    golf:'26f3',
    boat:'26f5',
    sailboat:'26f5',
    tent:'26fa',
    fuelpump:'26fd',
    scissors:'2702',
    white_check_mark:'2705',
    airplane:'2708',
    email:'2709',
    envelope:'2709',
    fist:'270a',
    hand:'270b',
    raised_hand:'270b',
    v:'270c',
    pencil2:'270f',
    black_nib:'2712',
    heavy_check_mark:'2714',
    heavy_multiplication_x:'2716',
    sparkles:'2728',
    eight_spoked_asterisk:'2733',
    eight_pointed_black_star:'2734',
    snowflake:'2744',
    sparkle:'2747',
    x:'274c',
    negative_squared_cross_mark:'274e',
    question:'2753',
    grey_question:'2754',
    grey_exclamation:'2755',
    exclamation:'2757',
    heavy_exclamation_mark:'2757',
    heart:'2764',
    heavy_plus_sign:'2795',
    heavy_minus_sign:'2796',
    heavy_division_sign:'2797',
    arrow_right:'27a1',
    curly_loop:'27b0',
    loop:'27bf',
    arrow_heading_up:'2934',
    arrow_heading_down:'2935',
    arrow_left:'2b05',
    arrow_up:'2b06',
    arrow_down:'2b07',
    black_large_square:'2b1b',
    white_large_square:'2b1c',
    star:'2b50',
    o:'2b55',
    wavy_dash:'3030',
    part_alternation_mark:'303d',
    congratulations:'3297',
    secret:'3299',
    mahjong:'1f004',
    black_joker:'1f0cf',
    a:'1f170',
    b:'1f171',
    o2:'1f17e',
    parking:'1f17f',
    ab:'1f18e',
    cl:'1f191',
    cool:'1f192',
    free:'1f193',
    id:'1f194',
    new:'1f195',
    ng:'1f196',
    ok:'1f197',
    sos:'1f198',
    up:'1f199',
    vs:'1f19a',
    koko:'1f201',
    sa:'1f202',
    u7121:'1f21a',
    u6307:'1f22f',
    u7981:'1f232',
    u7a7a:'1f233',
    u5408:'1f234',
    u6e80:'1f235',
    u6709:'1f236',
    u6708:'1f237',
    u7533:'1f238',
    u5272:'1f239',
    u55b6:'1f23a',
    ideograph_advantage:'1f250',
    accept:'1f251',
    cyclone:'1f300',
    foggy:'1f301',
    closed_umbrella:'1f302',
    night_with_stars:'1f303',
    sunrise_over_mountains:'1f304',
    sunrise:'1f305',
    city_sunset:'1f306',
    city_sunrise:'1f307',
    rainbow:'1f308',
    bridge_at_night:'1f309',
    ocean:'1f30a',
    volcano:'1f30b',
    milky_way:'1f30c',
    earth_africa:'1f30d',
    earth_americas:'1f30e',
    earth_asia:'1f30f',
    globe_with_meridians:'1f310',
    new_moon:'1f311',
    waxing_crescent_moon:'1f312',
    first_quarter_moon:'1f313',
    moon:'1f314',
    waxing_gibbous_moon:'1f314',
    full_moon:'1f315',
    waning_gibbous_moon:'1f316',
    last_quarter_moon:'1f317',
    waning_crescent_moon:'1f318',
    crescent_moon:'1f319',
    new_moon_with_face:'1f31a',
    first_quarter_moon_with_face:'1f31b',
    last_quarter_moon_with_face:'1f31c',
    full_moon_with_face:'1f31d',
    sun_with_face:'1f31e',
    star2:'1f31f',
    stars:'1f320',
    chestnut:'1f330',
    seedling:'1f331',
    evergreen_tree:'1f332',
    deciduous_tree:'1f333',
    palm_tree:'1f334',
    cactus:'1f335',
    tulip:'1f337',
    cherry_blossom:'1f338',
    rose:'1f339',
    hibiscus:'1f33a',
    sunflower:'1f33b',
    blossom:'1f33c',
    corn:'1f33d',
    ear_of_rice:'1f33e',
    herb:'1f33f',
    four_leaf_clover:'1f340',
    maple_leaf:'1f341',
    fallen_leaf:'1f342',
    leaves:'1f343',
    mushroom:'1f344',
    tomato:'1f345',
    eggplant:'1f346',
    grapes:'1f347',
    melon:'1f348',
    watermelon:'1f349',
    tangerine:'1f34a',
    lemon:'1f34b',
    banana:'1f34c',
    pineapple:'1f34d',
    apple:'1f34e',
    green_apple:'1f34f',
    pear:'1f350',
    peach:'1f351',
    cherries:'1f352',
    strawberry:'1f353',
    hamburger:'1f354',
    pizza:'1f355',
    meat_on_bone:'1f356',
    poultry_leg:'1f357',
    rice_cracker:'1f358',
    rice_ball:'1f359',
    rice:'1f35a',
    curry:'1f35b',
    ramen:'1f35c',
    spaghetti:'1f35d',
    bread:'1f35e',
    fries:'1f35f',
    sweet_potato:'1f360',
    dango:'1f361',
    oden:'1f362',
    sushi:'1f363',
    fried_shrimp:'1f364',
    fish_cake:'1f365',
    icecream:'1f366',
    shaved_ice:'1f367',
    ice_cream:'1f368',
    doughnut:'1f369',
    cookie:'1f36a',
    chocolate_bar:'1f36b',
    candy:'1f36c',
    lollipop:'1f36d',
    custard:'1f36e',
    honey_pot:'1f36f',
    cake:'1f370',
    bento:'1f371',
    stew:'1f372',
    egg:'1f373',
    fork_and_knife:'1f374',
    tea:'1f375',
    sake:'1f376',
    wine_glass:'1f377',
    cocktail:'1f378',
    tropical_drink:'1f379',
    beer:'1f37a',
    beers:'1f37b',
    baby_bottle:'1f37c',
    ribbon:'1f380',
    gift:'1f381',
    birthday:'1f382',
    jack_o_lantern:'1f383',
    christmas_tree:'1f384',
    santa:'1f385',
    fireworks:'1f386',
    sparkler:'1f387',
    balloon:'1f388',
    tada:'1f389',
    confetti_ball:'1f38a',
    tanabata_tree:'1f38b',
    crossed_flags:'1f38c',
    bamboo:'1f38d',
    dolls:'1f38e',
    flags:'1f38f',
    wind_chime:'1f390',
    rice_scene:'1f391',
    school_satchel:'1f392',
    mortar_board:'1f393',
    carousel_horse:'1f3a0',
    ferris_wheel:'1f3a1',
    roller_coaster:'1f3a2',
    fishing_pole_and_fish:'1f3a3',
    microphone:'1f3a4',
    movie_camera:'1f3a5',
    cinema:'1f3a6',
    headphones:'1f3a7',
    art:'1f3a8',
    tophat:'1f3a9',
    circus_tent:'1f3aa',
    ticket:'1f3ab',
    clapper:'1f3ac',
    performing_arts:'1f3ad',
    video_game:'1f3ae',
    dart:'1f3af',
    slot_machine:'1f3b0',
    '8ball':'1f3b1',
    game_die:'1f3b2',
    bowling:'1f3b3',
    flower_playing_cards:'1f3b4',
    musical_note:'1f3b5',
    notes:'1f3b6',
    saxophone:'1f3b7',
    guitar:'1f3b8',
    musical_keyboard:'1f3b9',
    trumpet:'1f3ba',
    violin:'1f3bb',
    musical_score:'1f3bc',
    running_shirt_with_sash:'1f3bd',
    tennis:'1f3be',
    ski:'1f3bf',
    basketball:'1f3c0',
    checkered_flag:'1f3c1',
    snowboarder:'1f3c2',
    runner:'1f3c3',
    running:'1f3c3',
    surfer:'1f3c4',
    trophy:'1f3c6',
    horse_racing:'1f3c7',
    football:'1f3c8',
    rugby_football:'1f3c9',
    swimmer:'1f3ca',
    house:'1f3e0',
    house_with_garden:'1f3e1',
    office:'1f3e2',
    post_office:'1f3e3',
    european_post_office:'1f3e4',
    hospital:'1f3e5',
    bank:'1f3e6',
    atm:'1f3e7',
    hotel:'1f3e8',
    love_hotel:'1f3e9',
    convenience_store:'1f3ea',
    school:'1f3eb',
    department_store:'1f3ec',
    factory:'1f3ed',
    izakaya_lantern:'1f3ee',
    lantern:'1f3ee',
    japanese_castle:'1f3ef',
    european_castle:'1f3f0',
    'skin-tone-2':'1f3fb',
    'skin-tone-3':'1f3fc',
    'skin-tone-4':'1f3fd',
    'skin-tone-5':'1f3fe',
    'skin-tone-6':'1f3ff',
    rat:'1f400',
    mouse2:'1f401',
    ox:'1f402',
    water_buffalo:'1f403',
    cow2:'1f404',
    tiger2:'1f405',
    leopard:'1f406',
    rabbit2:'1f407',
    cat2:'1f408',
    dragon:'1f409',
    crocodile:'1f40a',
    whale2:'1f40b',
    snail:'1f40c',
    snake:'1f40d',
    racehorse:'1f40e',
    ram:'1f40f',
    goat:'1f410',
    sheep:'1f411',
    monkey:'1f412',
    rooster:'1f413',
    chicken:'1f414',
    dog2:'1f415',
    pig2:'1f416',
    boar:'1f417',
    elephant:'1f418',
    octopus:'1f419',
    shell:'1f41a',
    bug:'1f41b',
    ant:'1f41c',
    bee:'1f41d',
    honeybee:'1f41d',
    beetle:'1f41e',
    fish:'1f41f',
    tropical_fish:'1f420',
    blowfish:'1f421',
    turtle:'1f422',
    hatching_chick:'1f423',
    baby_chick:'1f424',
    hatched_chick:'1f425',
    bird:'1f426',
    penguin:'1f427',
    koala:'1f428',
    poodle:'1f429',
    dromedary_camel:'1f42a',
    camel:'1f42b',
    dolphin:'1f42c',
    flipper:'1f42c',
    mouse:'1f42d',
    cow:'1f42e',
    tiger:'1f42f',
    rabbit:'1f430',
    cat:'1f431',
    dragon_face:'1f432',
    whale:'1f433',
    horse:'1f434',
    monkey_face:'1f435',
    dog:'1f436',
    pig:'1f437',
    frog:'1f438',
    hamster:'1f439',
    wolf:'1f43a',
    bear:'1f43b',
    panda_face:'1f43c',
    pig_nose:'1f43d',
    feet:'1f43e',
    paw_prints:'1f43e',
    eyes:'1f440',
    ear:'1f442',
    nose:'1f443',
    lips:'1f444',
    tongue:'1f445',
    point_up_2:'1f446',
    point_down:'1f447',
    point_left:'1f448',
    point_right:'1f449',
    facepunch:'1f44a',
    punch:'1f44a',
    wave:'1f44b',
    ok_hand:'1f44c',
    '+1':'1f44d',
    thumbsup:'1f44d',
    '-1':'1f44e',
    thumbsdown:'1f44e',
    clap:'1f44f',
    open_hands:'1f450',
    crown:'1f451',
    womans_hat:'1f452',
    eyeglasses:'1f453',
    necktie:'1f454',
    shirt:'1f455',
    tshirt:'1f455',
    jeans:'1f456',
    dress:'1f457',
    kimono:'1f458',
    bikini:'1f459',
    womans_clothes:'1f45a',
    purse:'1f45b',
    handbag:'1f45c',
    pouch:'1f45d',
    mans_shoe:'1f45e',
    shoe:'1f45e',
    athletic_shoe:'1f45f',
    high_heel:'1f460',
    sandal:'1f461',
    boot:'1f462',
    footprints:'1f463',
    bust_in_silhouette:'1f464',
    busts_in_silhouette:'1f465',
    boy:'1f466',
    girl:'1f467',
    man:'1f468',
    woman:'1f469',
    family:'1f46a',
    couple:'1f46b',
    two_men_holding_hands:'1f46c',
    two_women_holding_hands:'1f46d',
    cop:'1f46e',
    dancers:'1f46f',
    bride_with_veil:'1f470',
    person_with_blond_hair:'1f471',
    man_with_gua_pi_mao:'1f472',
    man_with_turban:'1f473',
    older_man:'1f474',
    older_woman:'1f475',
    baby:'1f476',
    construction_worker:'1f477',
    princess:'1f478',
    japanese_ogre:'1f479',
    japanese_goblin:'1f47a',
    ghost:'1f47b',
    angel:'1f47c',
    alien:'1f47d',
    space_invader:'1f47e',
    imp:'1f47f',
    skull:'1f480',
    information_desk_person:'1f481',
    guardsman:'1f482',
    dancer:'1f483',
    lipstick:'1f484',
    nail_care:'1f485',
    massage:'1f486',
    haircut:'1f487',
    barber:'1f488',
    syringe:'1f489',
    pill:'1f48a',
    kiss:'1f48b',
    love_letter:'1f48c',
    ring:'1f48d',
    gem:'1f48e',
    couplekiss:'1f48f',
    bouquet:'1f490',
    couple_with_heart:'1f491',
    wedding:'1f492',
    heartbeat:'1f493',
    broken_heart:'1f494',
    two_hearts:'1f495',
    sparkling_heart:'1f496',
    heartpulse:'1f497',
    cupid:'1f498',
    blue_heart:'1f499',
    green_heart:'1f49a',
    yellow_heart:'1f49b',
    purple_heart:'1f49c',
    gift_heart:'1f49d',
    revolving_hearts:'1f49e',
    heart_decoration:'1f49f',
    diamond_shape_with_a_dot_inside:'1f4a0',
    bulb:'1f4a1',
    anger:'1f4a2',
    bomb:'1f4a3',
    zzz:'1f4a4',
    boom:'1f4a5',
    collision:'1f4a5',
    sweat_drops:'1f4a6',
    droplet:'1f4a7',
    dash:'1f4a8',
    hankey:'1f4a9',
    poop:'1f4a9',
    shit:'1f4a9',
    muscle:'1f4aa',
    dizzy:'1f4ab',
    speech_balloon:'1f4ac',
    thought_balloon:'1f4ad',
    white_flower:'1f4ae',
    100:'1f4af',
    moneybag:'1f4b0',
    currency_exchange:'1f4b1',
    heavy_dollar_sign:'1f4b2',
    credit_card:'1f4b3',
    yen:'1f4b4',
    dollar:'1f4b5',
    euro:'1f4b6',
    pound:'1f4b7',
    money_with_wings:'1f4b8',
    chart:'1f4b9',
    seat:'1f4ba',
    computer:'1f4bb',
    briefcase:'1f4bc',
    minidisc:'1f4bd',
    floppy_disk:'1f4be',
    cd:'1f4bf',
    dvd:'1f4c0',
    file_folder:'1f4c1',
    open_file_folder:'1f4c2',
    page_with_curl:'1f4c3',
    page_facing_up:'1f4c4',
    date:'1f4c5',
    calendar:'1f4c6',
    card_index:'1f4c7',
    chart_with_upwards_trend:'1f4c8',
    chart_with_downwards_trend:'1f4c9',
    bar_chart:'1f4ca',
    clipboard:'1f4cb',
    pushpin:'1f4cc',
    round_pushpin:'1f4cd',
    paperclip:'1f4ce',
    straight_ruler:'1f4cf',
    triangular_ruler:'1f4d0',
    bookmark_tabs:'1f4d1',
    ledger:'1f4d2',
    notebook:'1f4d3',
    notebook_with_decorative_cover:'1f4d4',
    closed_book:'1f4d5',
    book:'1f4d6',
    open_book:'1f4d6',
    green_book:'1f4d7',
    blue_book:'1f4d8',
    orange_book:'1f4d9',
    books:'1f4da',
    name_badge:'1f4db',
    scroll:'1f4dc',
    memo:'1f4dd',
    pencil:'1f4dd',
    telephone_receiver:'1f4de',
    pager:'1f4df',
    fax:'1f4e0',
    satellite:'1f4e1',
    loudspeaker:'1f4e2',
    mega:'1f4e3',
    outbox_tray:'1f4e4',
    inbox_tray:'1f4e5',
    package:'1f4e6',
    'e-mail':'1f4e7',
    incoming_envelope:'1f4e8',
    envelope_with_arrow:'1f4e9',
    mailbox_closed:'1f4ea',
    mailbox:'1f4eb',
    mailbox_with_mail:'1f4ec',
    mailbox_with_no_mail:'1f4ed',
    postbox:'1f4ee',
    postal_horn:'1f4ef',
    newspaper:'1f4f0',
    iphone:'1f4f1',
    calling:'1f4f2',
    vibration_mode:'1f4f3',
    mobile_phone_off:'1f4f4',
    no_mobile_phones:'1f4f5',
    signal_strength:'1f4f6',
    camera:'1f4f7',
    video_camera:'1f4f9',
    tv:'1f4fa',
    radio:'1f4fb',
    vhs:'1f4fc',
    twisted_rightwards_arrows:'1f500',
    repeat:'1f501',
    repeat_one:'1f502',
    arrows_clockwise:'1f503',
    arrows_counterclockwise:'1f504',
    low_brightness:'1f505',
    high_brightness:'1f506',
    mute:'1f507',
    speaker:'1f508',
    sound:'1f509',
    loud_sound:'1f50a',
    battery:'1f50b',
    electric_plug:'1f50c',
    mag:'1f50d',
    mag_right:'1f50e',
    lock_with_ink_pen:'1f50f',
    closed_lock_with_key:'1f510',
    key:'1f511',
    lock:'1f512',
    unlock:'1f513',
    bell:'1f514',
    no_bell:'1f515',
    bookmark:'1f516',
    link:'1f517',
    radio_button:'1f518',
    back:'1f519',
    end:'1f51a',
    on:'1f51b',
    soon:'1f51c',
    top:'1f51d',
    underage:'1f51e',
    keycap_ten:'1f51f',
    capital_abcd:'1f520',
    abcd:'1f521',
    1234:'1f522',
    symbols:'1f523',
    abc:'1f524',
    fire:'1f525',
    flashlight:'1f526',
    wrench:'1f527',
    hammer:'1f528',
    nut_and_bolt:'1f529',
    hocho:'1f52a',
    knife:'1f52a',
    gun:'1f52b',
    microscope:'1f52c',
    telescope:'1f52d',
    crystal_ball:'1f52e',
    six_pointed_star:'1f52f',
    beginner:'1f530',
    trident:'1f531',
    black_square_button:'1f532',
    white_square_button:'1f533',
    red_circle:'1f534',
    large_blue_circle:'1f535',
    large_orange_diamond:'1f536',
    large_blue_diamond:'1f537',
    small_orange_diamond:'1f538',
    small_blue_diamond:'1f539',
    small_red_triangle:'1f53a',
    small_red_triangle_down:'1f53b',
    arrow_up_small:'1f53c',
    arrow_down_small:'1f53d',
    clock1:'1f550',
    clock2:'1f551',
    clock3:'1f552',
    clock4:'1f553',
    clock5:'1f554',
    clock6:'1f555',
    clock7:'1f556',
    clock8:'1f557',
    clock9:'1f558',
    clock10:'1f559',
    clock11:'1f55a',
    clock12:'1f55b',
    clock130:'1f55c',
    clock230:'1f55d',
    clock330:'1f55e',
    clock430:'1f55f',
    clock530:'1f560',
    clock630:'1f561',
    clock730:'1f562',
    clock830:'1f563',
    clock930:'1f564',
    clock1030:'1f565',
    clock1130:'1f566',
    clock1230:'1f567',
    mount_fuji:'1f5fb',
    tokyo_tower:'1f5fc',
    statue_of_liberty:'1f5fd',
    japan:'1f5fe',
    moyai:'1f5ff',
    grinning:'1f600',
    grin:'1f601',
    joy:'1f602',
    smiley:'1f603',
    smile:'1f604',
    sweat_smile:'1f605',
    laughing:'1f606',
    satisfied:'1f606',
    innocent:'1f607',
    smiling_imp:'1f608',
    wink:'1f609',
    blush:'1f60a',
    yum:'1f60b',
    relieved:'1f60c',
    heart_eyes:'1f60d',
    sunglasses:'1f60e',
    smirk:'1f60f',
    neutral_face:'1f610',
    expressionless:'1f611',
    unamused:'1f612',
    sweat:'1f613',
    pensive:'1f614',
    confused:'1f615',
    confounded:'1f616',
    kissing:'1f617',
    kissing_heart:'1f618',
    kissing_smiling_eyes:'1f619',
    kissing_closed_eyes:'1f61a',
    stuck_out_tongue:'1f61b',
    stuck_out_tongue_winking_eye:'1f61c',
    stuck_out_tongue_closed_eyes:'1f61d',
    disappointed:'1f61e',
    worried:'1f61f',
    angry:'1f620',
    rage:'1f621',
    cry:'1f622',
    persevere:'1f623',
    triumph:'1f624',
    disappointed_relieved:'1f625',
    frowning:'1f626',
    anguished:'1f627',
    fearful:'1f628',
    weary:'1f629',
    sleepy:'1f62a',
    tired_face:'1f62b',
    grimacing:'1f62c',
    sob:'1f62d',
    open_mouth:'1f62e',
    hushed:'1f62f',
    cold_sweat:'1f630',
    scream:'1f631',
    astonished:'1f632',
    flushed:'1f633',
    sleeping:'1f634',
    dizzy_face:'1f635',
    no_mouth:'1f636',
    mask:'1f637',
    smile_cat:'1f638',
    joy_cat:'1f639',
    smiley_cat:'1f63a',
    heart_eyes_cat:'1f63b',
    smirk_cat:'1f63c',
    kissing_cat:'1f63d',
    pouting_cat:'1f63e',
    crying_cat_face:'1f63f',
    scream_cat:'1f640',
    no_good:'1f645',
    ok_woman:'1f646',
    bow:'1f647',
    see_no_evil:'1f648',
    hear_no_evil:'1f649',
    speak_no_evil:'1f64a',
    raising_hand:'1f64b',
    raised_hands:'1f64c',
    person_frowning:'1f64d',
    person_with_pouting_face:'1f64e',
    pray:'1f64f',
    rocket:'1f680',
    helicopter:'1f681',
    steam_locomotive:'1f682',
    railway_car:'1f683',
    bullettrain_side:'1f684',
    bullettrain_front:'1f685',
    train2:'1f686',
    metro:'1f687',
    light_rail:'1f688',
    station:'1f689',
    tram:'1f68a',
    train:'1f68b',
    bus:'1f68c',
    oncoming_bus:'1f68d',
    trolleybus:'1f68e',
    busstop:'1f68f',
    minibus:'1f690',
    ambulance:'1f691',
    fire_engine:'1f692',
    police_car:'1f693',
    oncoming_police_car:'1f694',
    taxi:'1f695',
    oncoming_taxi:'1f696',
    car:'1f697',
    red_car:'1f697',
    oncoming_automobile:'1f698',
    blue_car:'1f699',
    truck:'1f69a',
    articulated_lorry:'1f69b',
    tractor:'1f69c',
    monorail:'1f69d',
    mountain_railway:'1f69e',
    suspension_railway:'1f69f',
    mountain_cableway:'1f6a0',
    aerial_tramway:'1f6a1',
    ship:'1f6a2',
    rowboat:'1f6a3',
    speedboat:'1f6a4',
    traffic_light:'1f6a5',
    vertical_traffic_light:'1f6a6',
    construction:'1f6a7',
    rotating_light:'1f6a8',
    triangular_flag_on_post:'1f6a9',
    door:'1f6aa',
    no_entry_sign:'1f6ab',
    smoking:'1f6ac',
    no_smoking:'1f6ad',
    put_litter_in_its_place:'1f6ae',
    do_not_litter:'1f6af',
    potable_water:'1f6b0',
    'non-potable_water':'1f6b1',
    bike:'1f6b2',
    no_bicycles:'1f6b3',
    bicyclist:'1f6b4',
    mountain_bicyclist:'1f6b5',
    walking:'1f6b6',
    no_pedestrians:'1f6b7',
    children_crossing:'1f6b8',
    mens:'1f6b9',
    womens:'1f6ba',
    restroom:'1f6bb',
    baby_symbol:'1f6bc',
    toilet:'1f6bd',
    wc:'1f6be',
    shower:'1f6bf',
    bath:'1f6c0',
    bathtub:'1f6c1',
    passport_control:'1f6c2',
    customs:'1f6c3',
    baggage_claim:'1f6c4',
    left_luggage:'1f6c5',
    hash:'0023-20e3',
    zero:'0030-20e3',
    one:'0031-20e3',
    two:'0032-20e3',
    three:'0033-20e3',
    four:'0034-20e3',
    five:'0035-20e3',
    six:'0036-20e3',
    seven:'0037-20e3',
    eight:'0038-20e3',
    nine:'0039-20e3',
    ae:'1f1e6-1f1ea',
    at:'1f1e6-1f1f9',
    au:'1f1e6-1f1fa',
    be:'1f1e7-1f1ea',
    br:'1f1e7-1f1f7',
    ca:'1f1e8-1f1e6',
    ch:'1f1e8-1f1ed',
    cn:'1f1e8-1f1f3',
    co:'1f1e8-1f1f4',
    de:'1f1e9-1f1ea',
    dk:'1f1e9-1f1f0',
    es:'1f1ea-1f1f8',
    fi:'1f1eb-1f1ee',
    fr:'1f1eb-1f1f7',
    gb:'1f1ec-1f1e7',
    uk:'1f1ec-1f1e7',
    hk:'1f1ed-1f1f0',
    ie:'1f1ee-1f1ea',
    il:'1f1ee-1f1f1',
    in:'1f1ee-1f1f3',
    it:'1f1ee-1f1f9',
    jp:'1f1ef-1f1f5',
    kr:'1f1f0-1f1f7',
    mo:'1f1f2-1f1f4',
    mx:'1f1f2-1f1fd',
    my:'1f1f2-1f1fe',
    nl:'1f1f3-1f1f1',
    no:'1f1f3-1f1f4',
    nz:'1f1f3-1f1ff',
    ph:'1f1f5-1f1ed',
    pl:'1f1f5-1f1f1',
    pr:'1f1f5-1f1f7',
    pt:'1f1f5-1f1f9',
    ru:'1f1f7-1f1fa',
    se:'1f1f8-1f1ea',
    sg:'1f1f8-1f1ec',
    tr:'1f1f9-1f1f7',
    us:'1f1fa-1f1f8',
    vn:'1f1fb-1f1f3',
    za:'1f1ff-1f1e6',
    'man-man-boy':'1f468-1f468-1f466',
    'man-man-boy-boy':'1f468-1f468-1f466-1f466',
    'man-man-girl':'1f468-1f468-1f467',
    'man-man-girl-boy':'1f468-1f468-1f467-1f466',
    'man-man-girl-girl':'1f468-1f468-1f467-1f467',
    'man-woman-boy':'1f468-1f469-1f466',
    'man-woman-boy-boy':'1f468-1f469-1f466-1f466',
    'man-woman-girl':'1f468-1f469-1f467',
    'man-woman-girl-girl':'1f468-1f469-1f467-1f467',
    'man-heart-man':'1f468-2764-fe0f-1f468',
    'man-kiss-man':'1f468-2764-fe0f-1f48b-1f468',
    'woman-woman-boy':'1f469-1f469-1f466',
    'woman-woman-boy-boy':'1f469-1f469-1f466-1f466',
    'woman-woman-girl':'1f469-1f469-1f467',
    'woman-woman-girl-boy':'1f469-1f469-1f467-1f466',
    'woman-woman-girl-girl':'1f469-1f469-1f467-1f467',
    'woman-heart-woman':'1f469-2764-fe0f-1f469',
    'woman-kiss-woman':'1f469-2764-fe0f-1f48b-1f469'
  };

  return {
    emoji: codes
  };
})());

// angular.module('vkEmojiPicker').constant('EmojiMap', (function () {
//   var codes = {
//     copyright: ['00a9', '\u00a9'],
//     registered: ['00ae', '\u00ae'],
//     bangbang: ['203c', '\u203c'],
//     interrobang: ['2049', '\u2049'],
//     tm: ['2122', '\u2122'],
//     information_source: ['2139', '\u2139'],
//     left_right_arrow: ['2194', '\u2194'],
//     arrow_up_down: ['2195', '\u2195'],
//     arrow_upper_left: ['2196', '\u2196'],
//     arrow_upper_right: ['2197', '\u2197'],
//     arrow_lower_right: ['2198', '\u2198'],
//     arrow_lower_left: ['2199', '\u2199'],
//     leftwards_arrow_with_hook: ['21a9', '\u21a9'],
//     arrow_right_hook: ['21aa', '\u21aa'],
//     watch: ['231a', '\u231a'],
//     hourglass: ['231b', '\u231b'],
//     fast_forward: ['23e9', '\u23e9'],
//     rewind: ['23ea', '\u23ea'],
//     arrow_double_up: ['23eb', '\u23eb'],
//     arrow_double_down: ['23ec', '\u23ec'],
//     alarm_clock: ['23f0', '\u23f0'],
//     hourglass_flowing_sand: ['23f3', '\u23f3'],
//     m: ['24c2', '\u24c2'],
//     black_small_square: ['25aa', '\u25aa'],
//     white_small_square: ['25ab', '\u25ab'],
//     arrow_forward: ['25b6', '\u25b6'],
//     arrow_backward: ['25c0', '\u25c0'],
//     white_medium_square: ['25fb', '\u25fb'],
//     black_medium_square: ['25fc', '\u25fc'],
//     white_medium_small_square: ['25fd', '\u25fd'],
//     black_medium_small_square: ['25fe', '\u25fe'],
//     sunny: ['2600', '\u2600'],
//     cloud: ['2601', '\u2601'],
//     phone: ['260e', '\u260e'],
//     ballot_box_with_check: ['2611', '\u2611'],
//     umbrella: ['2614', '\u2614'],
//     coffee: ['2615', '\u2615'],
//     point_up: ['261d', '\u261d'],
//     relaxed: ['263a', '\u263a'],
//     aries: ['2648', '\u2648'],
//     taurus: ['2649', '\u2649'],
//     gemini: ['264a', '\u264a'],
//     cancer: ['264b', '\u264b'],
//     leo: ['264c', '\u264c'],
//     virgo: ['264d', '\u264d'],
//     libra: ['264e', '\u264e'],
//     scorpius: ['264f', '\u264f'],
//     sagittarius: ['2650', '\u2650'],
//     capricorn: ['2651', '\u2651'],
//     aquarius: ['2652', '\u2652'],
//     pisces: ['2653', '\u2653'],
//     spades: ['2660', '\u2660'],
//     clubs: ['2663', '\u2663'],
//     hearts: ['2665', '\u2665'],
//     diamonds: ['2666', '\u2666'],
//     hotsprings: ['2668', '\u2668'],
//     recycle: ['267b', '\u267b'],
//     wheelchair: ['267f', '\u267f'],
//     anchor: ['2693', '\u2693'],
//     warning: ['26a0', '\u26a0'],
//     zap: ['26a1', '\u26a1'],
//     white_circle: ['26aa', '\u26aa'],
//     black_circle: ['26ab', '\u26ab'],
//     soccer: ['26bd', '\u26bd'],
//     baseball: ['26be', '\u26be'],
//     snowman: ['26c4', '\u26c4'],
//     partly_sunny: ['26c5', '\u26c5'],
//     ophiuchus: ['26ce', '\u26ce'],
//     no_entry: ['26d4', '\u26d4'],
//     church: ['26ea', '\u26ea'],
//     fountain: ['26f2', '\u26f2'],
//     golf: ['26f3', '\u26f3'],
//     boat: ['26f5', '\u26f5'],
//     tent: ['26fa', '\u26fa'],
//     fuelpump: ['26fd', '\u26fd'],
//     scissors: ['2702', '\u2702'],
//     white_check_mark: ['2705', '\u2705'],
//     airplane: ['2708', '\u2708'],
//     email: ['2709', '\u2709'],
//     fist: ['270a', '\u270a'],
//     hand: ['270b', '\u270b'],
//     v: ['270c', '\u270c'],
//     pencil2: ['270f', '\u270f'],
//     black_nib: ['2712', '\u2712'],
//     heavy_check_mark: ['2714', '\u2714'],
//     heavy_multiplication_x: ['2716', '\u2716'],
//     sparkles: ['2728', '\u2728'],
//     eight_spoked_asterisk: ['2733', '\u2733'],
//     eight_pointed_black_star: ['2734', '\u2734'],
//     snowflake: ['2744', '\u2744'],
//     sparkle: ['2747', '\u2747'],
//     x: ['274c', '\u274c'],
//     negative_squared_cross_mark: ['274e', '\u274e'],
//     question: ['2753', '\u2753'],
//     grey_question: ['2754', '\u2754'],
//     grey_exclamation: ['2755', '\u2755'],
//     exclamation: ['2757', '\u2757'],
//     heart: ['2764', '\u2764'],
//     heavy_plus_sign: ['2795', '\u2795'],
//     heavy_minus_sign: ['2796', '\u2796'],
//     heavy_division_sign: ['2797', '\u2797'],
//     arrow_right: ['27a1', '\u27a1'],
//     curly_loop: ['27b0', '\u27b0'],
//     loop: ['27bf', '\u27bf'],
//     arrow_heading_up: ['2934', '\u2934'],
//     arrow_heading_down: ['2935', '\u2935'],
//     arrow_left: ['2b05', '\u2b05'],
//     arrow_up: ['2b06', '\u2b06'],
//     arrow_down: ['2b07', '\u2b07'],
//     black_large_square: ['2b1b', '\u2b1b'],
//     white_large_square: ['2b1c', '\u2b1c'],
//     star: ['2b50', '\u2b50'],
//     o: ['2b55', '\u2b55'],
//     wavy_dash: ['3030', '\u3030'],
//     part_alternation_mark: ['303d', '\u303d'],
//     congratulations: ['3297', '\u3297'],
//     secret: ['3299', '\u3299'],
//     mahjong: ['1f004', '\ud83c\udc04'],
//     black_joker: ['1f0cf', '\ud83c\udccf'],
//     a: ['1f170', '\ud83c\udd70'],
//     b: ['1f171', '\ud83c\udd71'],
//     o2: ['1f17e', '\ud83c\udd7e'],
//     parking: ['1f17f', '\ud83c\udd7f'],
//     ab: ['1f18e', '\ud83c\udd8e'],
//     cl: ['1f191', '\ud83c\udd91'],
//     cool: ['1f192', '\ud83c\udd92'],
//     free: ['1f193', '\ud83c\udd93'],
//     id: ['1f194', '\ud83c\udd94'],
//     new: ['1f195', '\ud83c\udd95'],
//     ng: ['1f196', '\ud83c\udd96'],
//     ok: ['1f197', '\ud83c\udd97'],
//     sos: ['1f198', '\ud83c\udd98'],
//     up: ['1f199', '\ud83c\udd99'],
//     vs: ['1f19a', '\ud83c\udd9a'],
//     koko: ['1f201', '\ud83c\ude01'],
//     sa: ['1f202', '\ud83c\ude02'],
//     u7121: ['1f21a', '\ud83c\ude1a'],
//     u6307: ['1f22f', '\ud83c\ude2f'],
//     u7981: ['1f232', '\ud83c\ude32'],
//     u7a7a: ['1f233', '\ud83c\ude33'],
//     u5408: ['1f234', '\ud83c\ude34'],
//     u6e80: ['1f235', '\ud83c\ude35'],
//     u6709: ['1f236', '\ud83c\ude36'],
//     u6708: ['1f237', '\ud83c\ude37'],
//     u7533: ['1f238', '\ud83c\ude38'],
//     u5272: ['1f239', '\ud83c\ude39'],
//     u55b6: ['1f23a', '\ud83c\ude3a'],
//     ideograph_advantage: ['1f250', '\ud83c\ude50'],
//     accept: ['1f251', '\ud83c\ude51'],
//     cyclone: ['1f300', '\ud83c\udf00'],
//     foggy: ['1f301', '\ud83c\udf01'],
//     closed_umbrella: ['1f302', '\ud83c\udf02'],
//     night_with_stars: ['1f303', '\ud83c\udf03'],
//     sunrise_over_mountains: ['1f304', '\ud83c\udf04'],
//     sunrise: ['1f305', '\ud83c\udf05'],
//     city_sunset: ['1f306', '\ud83c\udf06'],
//     city_sunrise: ['1f307', '\ud83c\udf07'],
//     rainbow: ['1f308', '\ud83c\udf08'],
//     bridge_at_night: ['1f309', '\ud83c\udf09'],
//     ocean: ['1f30a', '\ud83c\udf0a'],
//     volcano: ['1f30b', '\ud83c\udf0b'],
//     milky_way: ['1f30c', '\ud83c\udf0c'],
//     earth_africa: ['1f30d', '\ud83c\udf0d'],
//     earth_americas: ['1f30e', '\ud83c\udf0e'],
//     earth_asia: ['1f30f', '\ud83c\udf0f'],
//     globe_with_meridians: ['1f310', '\ud83c\udf10'],
//     new_moon: ['1f311', '\ud83c\udf11'],
//     waxing_crescent_moon: ['1f312', '\ud83c\udf12'],
//     first_quarter_moon: ['1f313', '\ud83c\udf13'],
//     moon: ['1f314', '\ud83c\udf14'],
//     full_moon: ['1f315', '\ud83c\udf15'],
//     waning_gibbous_moon: ['1f316', '\ud83c\udf16'],
//     last_quarter_moon: ['1f317', '\ud83c\udf17'],
//     waning_crescent_moon: ['1f318', '\ud83c\udf18'],
//     crescent_moon: ['1f319', '\ud83c\udf19'],
//     new_moon_with_face: ['1f31a', '\ud83c\udf1a'],
//     first_quarter_moon_with_face: ['1f31b', '\ud83c\udf1b'],
//     last_quarter_moon_with_face: ['1f31c', '\ud83c\udf1c'],
//     full_moon_with_face: ['1f31d', '\ud83c\udf1d'],
//     sun_with_face: ['1f31e', '\ud83c\udf1e'],
//     star2: ['1f31f', '\ud83c\udf1f'],
//     stars: ['1f320', '\ud83c\udf20'],
//     chestnut: ['1f330', '\ud83c\udf30'],
//     seedling: ['1f331', '\ud83c\udf31'],
//     evergreen_tree: ['1f332', '\ud83c\udf32'],
//     deciduous_tree: ['1f333', '\ud83c\udf33'],
//     palm_tree: ['1f334', '\ud83c\udf34'],
//     cactus: ['1f335', '\ud83c\udf35'],
//     tulip: ['1f337', '\ud83c\udf37'],
//     cherry_blossom: ['1f338', '\ud83c\udf38'],
//     rose: ['1f339', '\ud83c\udf39'],
//     hibiscus: ['1f33a', '\ud83c\udf3a'],
//     sunflower: ['1f33b', '\ud83c\udf3b'],
//     blossom: ['1f33c', '\ud83c\udf3c'],
//     corn: ['1f33d', '\ud83c\udf3d'],
//     ear_of_rice: ['1f33e', '\ud83c\udf3e'],
//     herb: ['1f33f', '\ud83c\udf3f'],
//     four_leaf_clover: ['1f340', '\ud83c\udf40'],
//     maple_leaf: ['1f341', '\ud83c\udf41'],
//     fallen_leaf: ['1f342', '\ud83c\udf42'],
//     leaves: ['1f343', '\ud83c\udf43'],
//     mushroom: ['1f344', '\ud83c\udf44'],
//     tomato: ['1f345', '\ud83c\udf45'],
//     eggplant: ['1f346', '\ud83c\udf46'],
//     grapes: ['1f347', '\ud83c\udf47'],
//     melon: ['1f348', '\ud83c\udf48'],
//     watermelon: ['1f349', '\ud83c\udf49'],
//     tangerine: ['1f34a', '\ud83c\udf4a'],
//     lemon: ['1f34b', '\ud83c\udf4b'],
//     banana: ['1f34c', '\ud83c\udf4c'],
//     pineapple: ['1f34d', '\ud83c\udf4d'],
//     apple: ['1f34e', '\ud83c\udf4e'],
//     green_apple: ['1f34f', '\ud83c\udf4f'],
//     pear: ['1f350', '\ud83c\udf50'],
//     peach: ['1f351', '\ud83c\udf51'],
//     cherries: ['1f352', '\ud83c\udf52'],
//     strawberry: ['1f353', '\ud83c\udf53'],
//     hamburger: ['1f354', '\ud83c\udf54'],
//     pizza: ['1f355', '\ud83c\udf55'],
//     meat_on_bone: ['1f356', '\ud83c\udf56'],
//     poultry_leg: ['1f357', '\ud83c\udf57'],
//     rice_cracker: ['1f358', '\ud83c\udf58'],
//     rice_ball: ['1f359', '\ud83c\udf59'],
//     rice: ['1f35a', '\ud83c\udf5a'],
//     curry: ['1f35b', '\ud83c\udf5b'],
//     ramen: ['1f35c', '\ud83c\udf5c'],
//     spaghetti: ['1f35d', '\ud83c\udf5d'],
//     bread: ['1f35e', '\ud83c\udf5e'],
//     fries: ['1f35f', '\ud83c\udf5f'],
//     sweet_potato: ['1f360', '\ud83c\udf60'],
//     dango: ['1f361', '\ud83c\udf61'],
//     oden: ['1f362', '\ud83c\udf62'],
//     sushi: ['1f363', '\ud83c\udf63'],
//     fried_shrimp: ['1f364', '\ud83c\udf64'],
//     fish_cake: ['1f365', '\ud83c\udf65'],
//     icecream: ['1f366', '\ud83c\udf66'],
//     shaved_ice: ['1f367', '\ud83c\udf67'],
//     ice_cream: ['1f368', '\ud83c\udf68'],
//     doughnut: ['1f369', '\ud83c\udf69'],
//     cookie: ['1f36a', '\ud83c\udf6a'],
//     chocolate_bar: ['1f36b', '\ud83c\udf6b'],
//     candy: ['1f36c', '\ud83c\udf6c'],
//     lollipop: ['1f36d', '\ud83c\udf6d'],
//     custard: ['1f36e', '\ud83c\udf6e'],
//     honey_pot: ['1f36f', '\ud83c\udf6f'],
//     cake: ['1f370', '\ud83c\udf70'],
//     bento: ['1f371', '\ud83c\udf71'],
//     stew: ['1f372', '\ud83c\udf72'],
//     egg: ['1f373', '\ud83c\udf73'],
//     fork_and_knife: ['1f374', '\ud83c\udf74'],
//     tea: ['1f375', '\ud83c\udf75'],
//     sake: ['1f376', '\ud83c\udf76'],
//     wine_glass: ['1f377', '\ud83c\udf77'],
//     cocktail: ['1f378', '\ud83c\udf78'],
//     tropical_drink: ['1f379', '\ud83c\udf79'],
//     beer: ['1f37a', '\ud83c\udf7a'],
//     beers: ['1f37b', '\ud83c\udf7b'],
//     baby_bottle: ['1f37c', '\ud83c\udf7c'],
//     ribbon: ['1f380', '\ud83c\udf80'],
//     gift: ['1f381', '\ud83c\udf81'],
//     birthday: ['1f382', '\ud83c\udf82'],
//     jack_o_lantern: ['1f383', '\ud83c\udf83'],
//     christmas_tree: ['1f384', '\ud83c\udf84'],
//     santa: ['1f385', '\ud83c\udf85'],
//     fireworks: ['1f386', '\ud83c\udf86'],
//     sparkler: ['1f387', '\ud83c\udf87'],
//     balloon: ['1f388', '\ud83c\udf88'],
//     tada: ['1f389', '\ud83c\udf89'],
//     confetti_ball: ['1f38a', '\ud83c\udf8a'],
//     tanabata_tree: ['1f38b', '\ud83c\udf8b'],
//     crossed_flags: ['1f38c', '\ud83c\udf8c'],
//     bamboo: ['1f38d', '\ud83c\udf8d'],
//     dolls: ['1f38e', '\ud83c\udf8e'],
//     flags: ['1f38f', '\ud83c\udf8f'],
//     wind_chime: ['1f390', '\ud83c\udf90'],
//     rice_scene: ['1f391', '\ud83c\udf91'],
//     school_satchel: ['1f392', '\ud83c\udf92'],
//     mortar_board: ['1f393', '\ud83c\udf93'],
//     carousel_horse: ['1f3a0', '\ud83c\udfa0'],
//     ferris_wheel: ['1f3a1', '\ud83c\udfa1'],
//     roller_coaster: ['1f3a2', '\ud83c\udfa2'],
//     fishing_pole_and_fish: ['1f3a3', '\ud83c\udfa3'],
//     microphone: ['1f3a4', '\ud83c\udfa4'],
//     movie_camera: ['1f3a5', '\ud83c\udfa5'],
//     cinema: ['1f3a6', '\ud83c\udfa6'],
//     headphones: ['1f3a7', '\ud83c\udfa7'],
//     art: ['1f3a8', '\ud83c\udfa8'],
//     tophat: ['1f3a9', '\ud83c\udfa9'],
//     circus_tent: ['1f3aa', '\ud83c\udfaa'],
//     ticket: ['1f3ab', '\ud83c\udfab'],
//     clapper: ['1f3ac', '\ud83c\udfac'],
//     performing_arts: ['1f3ad', '\ud83c\udfad'],
//     video_game: ['1f3ae', '\ud83c\udfae'],
//     dart: ['1f3af', '\ud83c\udfaf'],
//     slot_machine: ['1f3b0', '\ud83c\udfb0'],
//     '8ball': ['1f3b1', '\ud83c\udfb1'],
//     game_die: ['1f3b2', '\ud83c\udfb2'],
//     bowling: ['1f3b3', '\ud83c\udfb3'],
//     flower_playing_cards: ['1f3b4', '\ud83c\udfb4'],
//     musical_note: ['1f3b5', '\ud83c\udfb5'],
//     notes: ['1f3b6', '\ud83c\udfb6'],
//     saxophone: ['1f3b7', '\ud83c\udfb7'],
//     guitar: ['1f3b8', '\ud83c\udfb8'],
//     musical_keyboard: ['1f3b9', '\ud83c\udfb9'],
//     trumpet: ['1f3ba', '\ud83c\udfba'],
//     violin: ['1f3bb', '\ud83c\udfbb'],
//     musical_score: ['1f3bc', '\ud83c\udfbc'],
//     running_shirt_with_sash: ['1f3bd', '\ud83c\udfbd'],
//     tennis: ['1f3be', '\ud83c\udfbe'],
//     ski: ['1f3bf', '\ud83c\udfbf'],
//     basketball: ['1f3c0', '\ud83c\udfc0'],
//     checkered_flag: ['1f3c1', '\ud83c\udfc1'],
//     snowboarder: ['1f3c2', '\ud83c\udfc2'],
//     runner: ['1f3c3', '\ud83c\udfc3'],
//     surfer: ['1f3c4', '\ud83c\udfc4'],
//     trophy: ['1f3c6', '\ud83c\udfc6'],
//     horse_racing: ['1f3c7', '\ud83c\udfc7'],
//     football: ['1f3c8', '\ud83c\udfc8'],
//     rugby_football: ['1f3c9', '\ud83c\udfc9'],
//     swimmer: ['1f3ca', '\ud83c\udfca'],
//     house: ['1f3e0', '\ud83c\udfe0'],
//     house_with_garden: ['1f3e1', '\ud83c\udfe1'],
//     office: ['1f3e2', '\ud83c\udfe2'],
//     post_office: ['1f3e3', '\ud83c\udfe3'],
//     european_post_office: ['1f3e4', '\ud83c\udfe4'],
//     hospital: ['1f3e5', '\ud83c\udfe5'],
//     bank: ['1f3e6', '\ud83c\udfe6'],
//     atm: ['1f3e7', '\ud83c\udfe7'],
//     hotel: ['1f3e8', '\ud83c\udfe8'],
//     love_hotel: ['1f3e9', '\ud83c\udfe9'],
//     convenience_store: ['1f3ea', '\ud83c\udfea'],
//     school: ['1f3eb', '\ud83c\udfeb'],
//     department_store: ['1f3ec', '\ud83c\udfec'],
//     factory: ['1f3ed', '\ud83c\udfed'],
//     izakaya_lantern: ['1f3ee', '\ud83c\udfee'],
//     japanese_castle: ['1f3ef', '\ud83c\udfef'],
//     european_castle: ['1f3f0', '\ud83c\udff0'],
//     'skin-tone-2': ['1f3fb', '\ud83c\udffb'],
//     'skin-tone-3': ['1f3fc', '\ud83c\udffc'],
//     'skin-tone-4': ['1f3fd', '\ud83c\udffd'],
//     'skin-tone-5': ['1f3fe', '\ud83c\udffe'],
//     'skin-tone-6': ['1f3ff', '\ud83c\udfff'],
//     rat: ['1f400', '\ud83d\udc00'],
//     mouse2: ['1f401', '\ud83d\udc01'],
//     ox: ['1f402', '\ud83d\udc02'],
//     water_buffalo: ['1f403', '\ud83d\udc03'],
//     cow2: ['1f404', '\ud83d\udc04'],
//     tiger2: ['1f405', '\ud83d\udc05'],
//     leopard: ['1f406', '\ud83d\udc06'],
//     rabbit2: ['1f407', '\ud83d\udc07'],
//     cat2: ['1f408', '\ud83d\udc08'],
//     dragon: ['1f409', '\ud83d\udc09'],
//     crocodile: ['1f40a', '\ud83d\udc0a'],
//     whale2: ['1f40b', '\ud83d\udc0b'],
//     snail: ['1f40c', '\ud83d\udc0c'],
//     snake: ['1f40d', '\ud83d\udc0d'],
//     racehorse: ['1f40e', '\ud83d\udc0e'],
//     ram: ['1f40f', '\ud83d\udc0f'],
//     goat: ['1f410', '\ud83d\udc10'],
//     sheep: ['1f411', '\ud83d\udc11'],
//     monkey: ['1f412', '\ud83d\udc12'],
//     rooster: ['1f413', '\ud83d\udc13'],
//     chicken: ['1f414', '\ud83d\udc14'],
//     dog2: ['1f415', '\ud83d\udc15'],
//     pig2: ['1f416', '\ud83d\udc16'],
//     boar: ['1f417', '\ud83d\udc17'],
//     elephant: ['1f418', '\ud83d\udc18'],
//     octopus: ['1f419', '\ud83d\udc19'],
//     shell: ['1f41a', '\ud83d\udc1a'],
//     bug: ['1f41b', '\ud83d\udc1b'],
//     ant: ['1f41c', '\ud83d\udc1c'],
//     bee: ['1f41d', '\ud83d\udc1d'],
//     beetle: ['1f41e', '\ud83d\udc1e'],
//     fish: ['1f41f', '\ud83d\udc1f'],
//     tropical_fish: ['1f420', '\ud83d\udc20'],
//     blowfish: ['1f421', '\ud83d\udc21'],
//     turtle: ['1f422', '\ud83d\udc22'],
//     hatching_chick: ['1f423', '\ud83d\udc23'],
//     baby_chick: ['1f424', '\ud83d\udc24'],
//     hatched_chick: ['1f425', '\ud83d\udc25'],
//     bird: ['1f426', '\ud83d\udc26'],
//     penguin: ['1f427', '\ud83d\udc27'],
//     koala: ['1f428', '\ud83d\udc28'],
//     poodle: ['1f429', '\ud83d\udc29'],
//     dromedary_camel: ['1f42a', '\ud83d\udc2a'],
//     camel: ['1f42b', '\ud83d\udc2b'],
//     dolphin: ['1f42c', '\ud83d\udc2c'],
//     mouse: ['1f42d', '\ud83d\udc2d'],
//     cow: ['1f42e', '\ud83d\udc2e'],
//     tiger: ['1f42f', '\ud83d\udc2f'],
//     rabbit: ['1f430', '\ud83d\udc30'],
//     cat: ['1f431', '\ud83d\udc31'],
//     dragon_face: ['1f432', '\ud83d\udc32'],
//     whale: ['1f433', '\ud83d\udc33'],
//     horse: ['1f434', '\ud83d\udc34'],
//     monkey_face: ['1f435', '\ud83d\udc35'],
//     dog: ['1f436', '\ud83d\udc36'],
//     pig: ['1f437', '\ud83d\udc37'],
//     frog: ['1f438', '\ud83d\udc38'],
//     hamster: ['1f439', '\ud83d\udc39'],
//     wolf: ['1f43a', '\ud83d\udc3a'],
//     bear: ['1f43b', '\ud83d\udc3b'],
//     panda_face: ['1f43c', '\ud83d\udc3c'],
//     pig_nose: ['1f43d', '\ud83d\udc3d'],
//     feet: ['1f43e', '\ud83d\udc3e'],
//     eyes: ['1f440', '\ud83d\udc40'],
//     ear: ['1f442', '\ud83d\udc42'],
//     nose: ['1f443', '\ud83d\udc43'],
//     lips: ['1f444', '\ud83d\udc44'],
//     tongue: ['1f445', '\ud83d\udc45'],
//     point_up_2: ['1f446', '\ud83d\udc46'],
//     point_down: ['1f447', '\ud83d\udc47'],
//     point_left: ['1f448', '\ud83d\udc48'],
//     point_right: ['1f449', '\ud83d\udc49'],
//     facepunch: ['1f44a', '\ud83d\udc4a'],
//     wave: ['1f44b', '\ud83d\udc4b'],
//     ok_hand: ['1f44c', '\ud83d\udc4c'],
//     '+1': ['1f44d', '\ud83d\udc4d'],
//     '-1': ['1f44e', '\ud83d\udc4e'],
//     clap: ['1f44f', '\ud83d\udc4f'],
//     open_hands: ['1f450', '\ud83d\udc50'],
//     crown: ['1f451', '\ud83d\udc51'],
//     womans_hat: ['1f452', '\ud83d\udc52'],
//     eyeglasses: ['1f453', '\ud83d\udc53'],
//     necktie: ['1f454', '\ud83d\udc54'],
//     shirt: ['1f455', '\ud83d\udc55'],
//     jeans: ['1f456', '\ud83d\udc56'],
//     dress: ['1f457', '\ud83d\udc57'],
//     kimono: ['1f458', '\ud83d\udc58'],
//     bikini: ['1f459', '\ud83d\udc59'],
//     womans_clothes: ['1f45a', '\ud83d\udc5a'],
//     purse: ['1f45b', '\ud83d\udc5b'],
//     handbag: ['1f45c', '\ud83d\udc5c'],
//     pouch: ['1f45d', '\ud83d\udc5d'],
//     mans_shoe: ['1f45e', '\ud83d\udc5e'],
//     athletic_shoe: ['1f45f', '\ud83d\udc5f'],
//     high_heel: ['1f460', '\ud83d\udc60'],
//     sandal: ['1f461', '\ud83d\udc61'],
//     boot: ['1f462', '\ud83d\udc62'],
//     footprints: ['1f463', '\ud83d\udc63'],
//     bust_in_silhouette: ['1f464', '\ud83d\udc64'],
//     busts_in_silhouette: ['1f465', '\ud83d\udc65'],
//     boy: ['1f466', '\ud83d\udc66'],
//     girl: ['1f467', '\ud83d\udc67'],
//     man: ['1f468', '\ud83d\udc68'],
//     woman: ['1f469', '\ud83d\udc69'],
//     family: ['1f46a', '\ud83d\udc6a'],
//     couple: ['1f46b', '\ud83d\udc6b'],
//     two_men_holding_hands: ['1f46c', '\ud83d\udc6c'],
//     two_women_holding_hands: ['1f46d', '\ud83d\udc6d'],
//     cop: ['1f46e', '\ud83d\udc6e'],
//     dancers: ['1f46f', '\ud83d\udc6f'],
//     bride_with_veil: ['1f470', '\ud83d\udc70'],
//     person_with_blond_hair: ['1f471', '\ud83d\udc71'],
//     man_with_gua_pi_mao: ['1f472', '\ud83d\udc72'],
//     man_with_turban: ['1f473', '\ud83d\udc73'],
//     older_man: ['1f474', '\ud83d\udc74'],
//     older_woman: ['1f475', '\ud83d\udc75'],
//     baby: ['1f476', '\ud83d\udc76'],
//     construction_worker: ['1f477', '\ud83d\udc77'],
//     princess: ['1f478', '\ud83d\udc78'],
//     japanese_ogre: ['1f479', '\ud83d\udc79'],
//     japanese_goblin: ['1f47a', '\ud83d\udc7a'],
//     ghost: ['1f47b', '\ud83d\udc7b'],
//     angel: ['1f47c', '\ud83d\udc7c'],
//     alien: ['1f47d', '\ud83d\udc7d'],
//     space_invader: ['1f47e', '\ud83d\udc7e'],
//     imp: ['1f47f', '\ud83d\udc7f'],
//     skull: ['1f480', '\ud83d\udc80'],
//     information_desk_person: ['1f481', '\ud83d\udc81'],
//     guardsman: ['1f482', '\ud83d\udc82'],
//     dancer: ['1f483', '\ud83d\udc83'],
//     lipstick: ['1f484', '\ud83d\udc84'],
//     nail_care: ['1f485', '\ud83d\udc85'],
//     massage: ['1f486', '\ud83d\udc86'],
//     haircut: ['1f487', '\ud83d\udc87'],
//     barber: ['1f488', '\ud83d\udc88'],
//     syringe: ['1f489', '\ud83d\udc89'],
//     pill: ['1f48a', '\ud83d\udc8a'],
//     kiss: ['1f48b', '\ud83d\udc8b'],
//     love_letter: ['1f48c', '\ud83d\udc8c'],
//     ring: ['1f48d', '\ud83d\udc8d'],
//     gem: ['1f48e', '\ud83d\udc8e'],
//     couplekiss: ['1f48f', '\ud83d\udc8f'],
//     bouquet: ['1f490', '\ud83d\udc90'],
//     couple_with_heart: ['1f491', '\ud83d\udc91'],
//     wedding: ['1f492', '\ud83d\udc92'],
//     heartbeat: ['1f493', '\ud83d\udc93'],
//     broken_heart: ['1f494', '\ud83d\udc94'],
//     two_hearts: ['1f495', '\ud83d\udc95'],
//     sparkling_heart: ['1f496', '\ud83d\udc96'],
//     heartpulse: ['1f497', '\ud83d\udc97'],
//     cupid: ['1f498', '\ud83d\udc98'],
//     blue_heart: ['1f499', '\ud83d\udc99'],
//     green_heart: ['1f49a', '\ud83d\udc9a'],
//     yellow_heart: ['1f49b', '\ud83d\udc9b'],
//     purple_heart: ['1f49c', '\ud83d\udc9c'],
//     gift_heart: ['1f49d', '\ud83d\udc9d'],
//     revolving_hearts: ['1f49e', '\ud83d\udc9e'],
//     heart_decoration: ['1f49f', '\ud83d\udc9f'],
//     diamond_shape_with_a_dot_inside: ['1f4a0', '\ud83d\udca0'],
//     bulb: ['1f4a1', '\ud83d\udca1'],
//     anger: ['1f4a2', '\ud83d\udca2'],
//     bomb: ['1f4a3', '\ud83d\udca3'],
//     zzz: ['1f4a4', '\ud83d\udca4'],
//     boom: ['1f4a5', '\ud83d\udca5'],
//     sweat_drops: ['1f4a6', '\ud83d\udca6'],
//     droplet: ['1f4a7', '\ud83d\udca7'],
//     dash: ['1f4a8', '\ud83d\udca8'],
//     poo: ['1f4a9', '\ud83d\udca9'],
//     muscle: ['1f4aa', '\ud83d\udcaa'],
//     dizzy: ['1f4ab', '\ud83d\udcab'],
//     speech_balloon: ['1f4ac', '\ud83d\udcac'],
//     thought_balloon: ['1f4ad', '\ud83d\udcad'],
//     white_flower: ['1f4ae', '\ud83d\udcae'],
//     100: ['1f4af', '\ud83d\udcaf'],
//     moneybag: ['1f4b0', '\ud83d\udcb0'],
//     currency_exchange: ['1f4b1', '\ud83d\udcb1'],
//     heavy_dollar_sign: ['1f4b2', '\ud83d\udcb2'],
//     credit_card: ['1f4b3', '\ud83d\udcb3'],
//     yen: ['1f4b4', '\ud83d\udcb4'],
//     dollar: ['1f4b5', '\ud83d\udcb5'],
//     euro: ['1f4b6', '\ud83d\udcb6'],
//     pound: ['1f4b7', '\ud83d\udcb7'],
//     money_with_wings: ['1f4b8', '\ud83d\udcb8'],
//     chart: ['1f4b9', '\ud83d\udcb9'],
//     seat: ['1f4ba', '\ud83d\udcba'],
//     computer: ['1f4bb', '\ud83d\udcbb'],
//     briefcase: ['1f4bc', '\ud83d\udcbc'],
//     minidisc: ['1f4bd', '\ud83d\udcbd'],
//     floppy_disk: ['1f4be', '\ud83d\udcbe'],
//     cd: ['1f4bf', '\ud83d\udcbf'],
//     dvd: ['1f4c0', '\ud83d\udcc0'],
//     file_folder: ['1f4c1', '\ud83d\udcc1'],
//     open_file_folder: ['1f4c2', '\ud83d\udcc2'],
//     page_with_curl: ['1f4c3', '\ud83d\udcc3'],
//     page_facing_up: ['1f4c4', '\ud83d\udcc4'],
//     date: ['1f4c5', '\ud83d\udcc5'],
//     calendar: ['1f4c6', '\ud83d\udcc6'],
//     card_index: ['1f4c7', '\ud83d\udcc7'],
//     chart_with_upwards_trend: ['1f4c8', '\ud83d\udcc8'],
//     chart_with_downwards_trend: ['1f4c9', '\ud83d\udcc9'],
//     bar_chart: ['1f4ca', '\ud83d\udcca'],
//     clipboard: ['1f4cb', '\ud83d\udccb'],
//     pushpin: ['1f4cc', '\ud83d\udccc'],
//     round_pushpin: ['1f4cd', '\ud83d\udccd'],
//     paperclip: ['1f4ce', '\ud83d\udcce'],
//     straight_ruler: ['1f4cf', '\ud83d\udccf'],
//     triangular_ruler: ['1f4d0', '\ud83d\udcd0'],
//     bookmark_tabs: ['1f4d1', '\ud83d\udcd1'],
//     ledger: ['1f4d2', '\ud83d\udcd2'],
//     notebook: ['1f4d3', '\ud83d\udcd3'],
//     notebook_with_decorative_cover: ['1f4d4', '\ud83d\udcd4'],
//     closed_book: ['1f4d5', '\ud83d\udcd5'],
//     book: ['1f4d6', '\ud83d\udcd6'],
//     green_book: ['1f4d7', '\ud83d\udcd7'],
//     blue_book: ['1f4d8', '\ud83d\udcd8'],
//     orange_book: ['1f4d9', '\ud83d\udcd9'],
//     books: ['1f4da', '\ud83d\udcda'],
//     name_badge: ['1f4db', '\ud83d\udcdb'],
//     scroll: ['1f4dc', '\ud83d\udcdc'],
//     memo: ['1f4dd', '\ud83d\udcdd'],
//     telephone_receiver: ['1f4de', '\ud83d\udcde'],
//     pager: ['1f4df', '\ud83d\udcdf'],
//     fax: ['1f4e0', '\ud83d\udce0'],
//     satellite: ['1f4e1', '\ud83d\udce1'],
//     loudspeaker: ['1f4e2', '\ud83d\udce2'],
//     mega: ['1f4e3', '\ud83d\udce3'],
//     outbox_tray: ['1f4e4', '\ud83d\udce4'],
//     inbox_tray: ['1f4e5', '\ud83d\udce5'],
//     package: ['1f4e6', '\ud83d\udce6'],
//     incoming_envelope: ['1f4e8', '\ud83d\udce8'],
//     envelope_with_arrow: ['1f4e9', '\ud83d\udce9'],
//     mailbox_closed: ['1f4ea', '\ud83d\udcea'],
//     mailbox: ['1f4eb', '\ud83d\udceb'],
//     mailbox_with_mail: ['1f4ec', '\ud83d\udcec'],
//     mailbox_with_no_mail: ['1f4ed', '\ud83d\udced'],
//     postbox: ['1f4ee', '\ud83d\udcee'],
//     postal_horn: ['1f4ef', '\ud83d\udcef'],
//     newspaper: ['1f4f0', '\ud83d\udcf0'],
//     iphone: ['1f4f1', '\ud83d\udcf1'],
//     calling: ['1f4f2', '\ud83d\udcf2'],
//     vibration_mode: ['1f4f3', '\ud83d\udcf3'],
//     mobile_phone_off: ['1f4f4', '\ud83d\udcf4'],
//     no_mobile_phones: ['1f4f5', '\ud83d\udcf5'],
//     signal_strength: ['1f4f6', '\ud83d\udcf6'],
//     camera: ['1f4f7', '\ud83d\udcf7'],
//     video_camera: ['1f4f9', '\ud83d\udcf9'],
//     tv: ['1f4fa', '\ud83d\udcfa'],
//     radio: ['1f4fb', '\ud83d\udcfb'],
//     vhs: ['1f4fc', '\ud83d\udcfc'],
//     twisted_rightwards_arrows: ['1f500', '\ud83d\udd00'],
//     repeat: ['1f501', '\ud83d\udd01'],
//     repeat_one: ['1f502', '\ud83d\udd02'],
//     arrows_clockwise: ['1f503', '\ud83d\udd03'],
//     arrows_counterclockwise: ['1f504', '\ud83d\udd04'],
//     low_brightness: ['1f505', '\ud83d\udd05'],
//     high_brightness: ['1f506', '\ud83d\udd06'],
//     mute: ['1f507', '\ud83d\udd07'],
//     speaker: ['1f508', '\ud83d\udd08'],
//     sound: ['1f509', '\ud83d\udd09'],
//     loud_sound: ['1f50a', '\ud83d\udd0a'],
//     battery: ['1f50b', '\ud83d\udd0b'],
//     electric_plug: ['1f50c', '\ud83d\udd0c'],
//     mag: ['1f50d', '\ud83d\udd0d'],
//     mag_right: ['1f50e', '\ud83d\udd0e'],
//     lock_with_ink_pen: ['1f50f', '\ud83d\udd0f'],
//     closed_lock_with_key: ['1f510', '\ud83d\udd10'],
//     key: ['1f511', '\ud83d\udd11'],
//     lock: ['1f512', '\ud83d\udd12'],
//     unlock: ['1f513', '\ud83d\udd13'],
//     bell: ['1f514', '\ud83d\udd14'],
//     no_bell: ['1f515', '\ud83d\udd15'],
//     bookmark: ['1f516', '\ud83d\udd16'],
//     link: ['1f517', '\ud83d\udd17'],
//     radio_button: ['1f518', '\ud83d\udd18'],
//     back: ['1f519', '\ud83d\udd19'],
//     end: ['1f51a', '\ud83d\udd1a'],
//     on: ['1f51b', '\ud83d\udd1b'],
//     soon: ['1f51c', '\ud83d\udd1c'],
//     top: ['1f51d', '\ud83d\udd1d'],
//     underage: ['1f51e', '\ud83d\udd1e'],
//     keycap_ten: ['1f51f', '\ud83d\udd1f'],
//     capital_abcd: ['1f520', '\ud83d\udd20'],
//     abcd: ['1f521', '\ud83d\udd21'],
//     1234: ['1f522', '\ud83d\udd22'],
//     symbols: ['1f523', '\ud83d\udd23'],
//     abc: ['1f524', '\ud83d\udd24'],
//     fire: ['1f525', '\ud83d\udd25'],
//     flashlight: ['1f526', '\ud83d\udd26'],
//     wrench: ['1f527', '\ud83d\udd27'],
//     hammer: ['1f528', '\ud83d\udd28'],
//     nut_and_bolt: ['1f529', '\ud83d\udd29'],
//     hocho: ['1f52a', '\ud83d\udd2a'],
//     gun: ['1f52b', '\ud83d\udd2b'],
//     microscope: ['1f52c', '\ud83d\udd2c'],
//     telescope: ['1f52d', '\ud83d\udd2d'],
//     crystal_ball: ['1f52e', '\ud83d\udd2e'],
//     six_pointed_star: ['1f52f', '\ud83d\udd2f'],
//     beginner: ['1f530', '\ud83d\udd30'],
//     trident: ['1f531', '\ud83d\udd31'],
//     black_square_button: ['1f532', '\ud83d\udd32'],
//     white_square_button: ['1f533', '\ud83d\udd33'],
//     red_circle: ['1f534', '\ud83d\udd34'],
//     large_blue_circle: ['1f535', '\ud83d\udd35'],
//     large_orange_diamond: ['1f536', '\ud83d\udd36'],
//     large_blue_diamond: ['1f537', '\ud83d\udd37'],
//     small_orange_diamond: ['1f538', '\ud83d\udd38'],
//     small_blue_diamond: ['1f539', '\ud83d\udd39'],
//     small_red_triangle: ['1f53a', '\ud83d\udd3a'],
//     small_red_triangle_down: ['1f53b', '\ud83d\udd3b'],
//     arrow_up_small: ['1f53c', '\ud83d\udd3c'],
//     arrow_down_small: ['1f53d', '\ud83d\udd3d'],
//     clock1: ['1f550', '\ud83d\udd50'],
//     clock2: ['1f551', '\ud83d\udd51'],
//     clock3: ['1f552', '\ud83d\udd52'],
//     clock4: ['1f553', '\ud83d\udd53'],
//     clock5: ['1f554', '\ud83d\udd54'],
//     clock6: ['1f555', '\ud83d\udd55'],
//     clock7: ['1f556', '\ud83d\udd56'],
//     clock8: ['1f557', '\ud83d\udd57'],
//     clock9: ['1f558', '\ud83d\udd58'],
//     clock10: ['1f559', '\ud83d\udd59'],
//     clock11: ['1f55a', '\ud83d\udd5a'],
//     clock12: ['1f55b', '\ud83d\udd5b'],
//     clock130: ['1f55c', '\ud83d\udd5c'],
//     clock230: ['1f55d', '\ud83d\udd5d'],
//     clock330: ['1f55e', '\ud83d\udd5e'],
//     clock430: ['1f55f', '\ud83d\udd5f'],
//     clock530: ['1f560', '\ud83d\udd60'],
//     clock630: ['1f561', '\ud83d\udd61'],
//     clock730: ['1f562', '\ud83d\udd62'],
//     clock830: ['1f563', '\ud83d\udd63'],
//     clock930: ['1f564', '\ud83d\udd64'],
//     clock1030: ['1f565', '\ud83d\udd65'],
//     clock1130: ['1f566', '\ud83d\udd66'],
//     clock1230: ['1f567', '\ud83d\udd67'],
//     mount_fuji: ['1f5fb', '\ud83d\uddfb'],
//     tokyo_tower: ['1f5fc', '\ud83d\uddfc'],
//     statue_of_liberty: ['1f5fd', '\ud83d\uddfd'],
//     japan: ['1f5fe', '\ud83d\uddfe'],
//     moyai: ['1f5ff', '\ud83d\uddff'],
//     grinning: ['1f600', '\ud83d\ude00'],
//     grin: ['1f601', '\ud83d\ude01'],
//     joy: ['1f602', '\ud83d\ude02'],
//     smiley: ['1f603', '\ud83d\ude03'],
//     smile: ['1f604', '\ud83d\ude04'],
//     sweat_smile: ['1f605', '\ud83d\ude05'],
//     laughing: ['1f606', '\ud83d\ude06'],
//     innocent: ['1f607', '\ud83d\ude07'],
//     smiling_imp: ['1f608', '\ud83d\ude08'],
//     wink: ['1f609', '\ud83d\ude09'],
//     blush: ['1f60a', '\ud83d\ude0a'],
//     yum: ['1f60b', '\ud83d\ude0b'],
//     relieved: ['1f60c', '\ud83d\ude0c'],
//     heart_eyes: ['1f60d', '\ud83d\ude0d'],
//     sunglasses: ['1f60e', '\ud83d\ude0e'],
//     smirk: ['1f60f', '\ud83d\ude0f'],
//     neutral_face: ['1f610', '\ud83d\ude10'],
//     expressionless: ['1f611', '\ud83d\ude11'],
//     unamused: ['1f612', '\ud83d\ude12'],
//     sweat: ['1f613', '\ud83d\ude13'],
//     pensive: ['1f614', '\ud83d\ude14'],
//     confused: ['1f615', '\ud83d\ude15'],
//     confounded: ['1f616', '\ud83d\ude16'],
//     kissing: ['1f617', '\ud83d\ude17'],
//     kissing_heart: ['1f618', '\ud83d\ude18'],
//     kissing_smiling_eyes: ['1f619', '\ud83d\ude19'],
//     kissing_closed_eyes: ['1f61a', '\ud83d\ude1a'],
//     stuck_out_tongue: ['1f61b', '\ud83d\ude1b'],
//     stuck_out_tongue_winking_eye: ['1f61c', '\ud83d\ude1c'],
//     stuck_out_tongue_closed_eyes: ['1f61d', '\ud83d\ude1d'],
//     disappointed: ['1f61e', '\ud83d\ude1e'],
//     worried: ['1f61f', '\ud83d\ude1f'],
//     angry: ['1f620', '\ud83d\ude20'],
//     rage: ['1f621', '\ud83d\ude21'],
//     cry: ['1f622', '\ud83d\ude22'],
//     persevere: ['1f623', '\ud83d\ude23'],
//     triumph: ['1f624', '\ud83d\ude24'],
//     disappointed_relieved: ['1f625', '\ud83d\ude25'],
//     frowning: ['1f626', '\ud83d\ude26'],
//     anguished: ['1f627', '\ud83d\ude27'],
//     fearful: ['1f628', '\ud83d\ude28'],
//     weary: ['1f629', '\ud83d\ude29'],
//     sleepy: ['1f62a', '\ud83d\ude2a'],
//     tired_face: ['1f62b', '\ud83d\ude2b'],
//     grimacing: ['1f62c', '\ud83d\ude2c'],
//     sob: ['1f62d', '\ud83d\ude2d'],
//     open_mouth: ['1f62e', '\ud83d\ude2e'],
//     hushed: ['1f62f', '\ud83d\ude2f'],
//     cold_sweat: ['1f630', '\ud83d\ude30'],
//     scream: ['1f631', '\ud83d\ude31'],
//     astonished: ['1f632', '\ud83d\ude32'],
//     flushed: ['1f633', '\ud83d\ude33'],
//     sleeping: ['1f634', '\ud83d\ude34'],
//     dizzy_face: ['1f635', '\ud83d\ude35'],
//     no_mouth: ['1f636', '\ud83d\ude36'],
//     mask: ['1f637', '\ud83d\ude37'],
//     smile_cat: ['1f638', '\ud83d\ude38'],
//     joy_cat: ['1f639', '\ud83d\ude39'],
//     smiley_cat: ['1f63a', '\ud83d\ude3a'],
//     heart_eyes_cat: ['1f63b', '\ud83d\ude3b'],
//     smirk_cat: ['1f63c', '\ud83d\ude3c'],
//     kissing_cat: ['1f63d', '\ud83d\ude3d'],
//     pouting_cat: ['1f63e', '\ud83d\ude3e'],
//     crying_cat_face: ['1f63f', '\ud83d\ude3f'],
//     scream_cat: ['1f640', '\ud83d\ude40'],
//     no_good: ['1f645', '\ud83d\ude45'],
//     ok_woman: ['1f646', '\ud83d\ude46'],
//     bow: ['1f647', '\ud83d\ude47'],
//     see_no_evil: ['1f648', '\ud83d\ude48'],
//     hear_no_evil: ['1f649', '\ud83d\ude49'],
//     speak_no_evil: ['1f64a', '\ud83d\ude4a'],
//     raising_hand: ['1f64b', '\ud83d\ude4b'],
//     raised_hands: ['1f64c', '\ud83d\ude4c'],
//     person_frowning: ['1f64d', '\ud83d\ude4d'],
//     person_with_pouting_face: ['1f64e', '\ud83d\ude4e'],
//     pray: ['1f64f', '\ud83d\ude4f'],
//     rocket: ['1f680', '\ud83d\ude80'],
//     helicopter: ['1f681', '\ud83d\ude81'],
//     steam_locomotive: ['1f682', '\ud83d\ude82'],
//     railway_car: ['1f683', '\ud83d\ude83'],
//     bullettrain_side: ['1f684', '\ud83d\ude84'],
//     bullettrain_front: ['1f685', '\ud83d\ude85'],
//     train2: ['1f686', '\ud83d\ude86'],
//     metro: ['1f687', '\ud83d\ude87'],
//     light_rail: ['1f688', '\ud83d\ude88'],
//     station: ['1f689', '\ud83d\ude89'],
//     tram: ['1f68a', '\ud83d\ude8a'],
//     train: ['1f68b', '\ud83d\ude8b'],
//     bus: ['1f68c', '\ud83d\ude8c'],
//     oncoming_bus: ['1f68d', '\ud83d\ude8d'],
//     trolleybus: ['1f68e', '\ud83d\ude8e'],
//     busstop: ['1f68f', '\ud83d\ude8f'],
//     minibus: ['1f690', '\ud83d\ude90'],
//     ambulance: ['1f691', '\ud83d\ude91'],
//     fire_engine: ['1f692', '\ud83d\ude92'],
//     police_car: ['1f693', '\ud83d\ude93'],
//     oncoming_police_car: ['1f694', '\ud83d\ude94'],
//     taxi: ['1f695', '\ud83d\ude95'],
//     oncoming_taxi: ['1f696', '\ud83d\ude96'],
//     car: ['1f697', '\ud83d\ude97'],
//     oncoming_automobile: ['1f698', '\ud83d\ude98'],
//     blue_car: ['1f699', '\ud83d\ude99'],
//     truck: ['1f69a', '\ud83d\ude9a'],
//     articulated_lorry: ['1f69b', '\ud83d\ude9b'],
//     tractor: ['1f69c', '\ud83d\ude9c'],
//     monorail: ['1f69d', '\ud83d\ude9d'],
//     mountain_railway: ['1f69e', '\ud83d\ude9e'],
//     suspension_railway: ['1f69f', '\ud83d\ude9f'],
//     mountain_cableway: ['1f6a0', '\ud83d\udea0'],
//     aerial_tramway: ['1f6a1', '\ud83d\udea1'],
//     ship: ['1f6a2', '\ud83d\udea2'],
//     rowboat: ['1f6a3', '\ud83d\udea3'],
//     speedboat: ['1f6a4', '\ud83d\udea4'],
//     traffic_light: ['1f6a5', '\ud83d\udea5'],
//     vertical_traffic_light: ['1f6a6', '\ud83d\udea6'],
//     construction: ['1f6a7', '\ud83d\udea7'],
//     rotating_light: ['1f6a8', '\ud83d\udea8'],
//     triangular_flag_on_post: ['1f6a9', '\ud83d\udea9'],
//     door: ['1f6aa', '\ud83d\udeaa'],
//     no_entry_sign: ['1f6ab', '\ud83d\udeab'],
//     smoking: ['1f6ac', '\ud83d\udeac'],
//     no_smoking: ['1f6ad', '\ud83d\udead'],
//     put_litter_in_its_place: ['1f6ae', '\ud83d\udeae'],
//     do_not_litter: ['1f6af', '\ud83d\udeaf'],
//     potable_water: ['1f6b0', '\ud83d\udeb0'],
//     'non-potable_water': ['1f6b1', '\ud83d\udeb1'],
//     bike: ['1f6b2', '\ud83d\udeb2'],
//     no_bicycles: ['1f6b3', '\ud83d\udeb3'],
//     bicyclist: ['1f6b4', '\ud83d\udeb4'],
//     mountain_bicyclist: ['1f6b5', '\ud83d\udeb5'],
//     walking: ['1f6b6', '\ud83d\udeb6'],
//     no_pedestrians: ['1f6b7', '\ud83d\udeb7'],
//     children_crossing: ['1f6b8', '\ud83d\udeb8'],
//     mens: ['1f6b9', '\ud83d\udeb9'],
//     womens: ['1f6ba', '\ud83d\udeba'],
//     restroom: ['1f6bb', '\ud83d\udebb'],
//     baby_symbol: ['1f6bc', '\ud83d\udebc'],
//     toilet: ['1f6bd', '\ud83d\udebd'],
//     wc: ['1f6be', '\ud83d\udebe'],
//     shower: ['1f6bf', '\ud83d\udebf'],
//     bath: ['1f6c0', '\ud83d\udec0'],
//     bathtub: ['1f6c1', '\ud83d\udec1'],
//     passport_control: ['1f6c2', '\ud83d\udec2'],
//     customs: ['1f6c3', '\ud83d\udec3'],
//     baggage_claim: ['1f6c4', '\ud83d\udec4'],
//     left_luggage: ['1f6c5', '\ud83d\udec5'],
//     hash: ['0023-20e3', '\u0023\u20e3'],
//     zero: ['0030-20e3', '\u0030\u20e3'],
//     one: ['0031-20e3', '\u0031\u20e3'],
//     two: ['0032-20e3', '\u0032\u20e3'],
//     three: ['0033-20e3', '\u0033\u20e3'],
//     four: ['0034-20e3', '\u0034\u20e3'],
//     five: ['0035-20e3', '\u0035\u20e3'],
//     six: ['0036-20e3', '\u0036\u20e3'],
//     seven: ['0037-20e3', '\u0037\u20e3'],
//     eight: ['0038-20e3', '\u0038\u20e3'],
//     nine: ['0039-20e3', '\u0039\u20e3'],
//     ae: ['1f1e6-1f1ea', '\ud83c\udde6\ud83c\uddea'],
//     at: ['1f1e6-1f1f9', '\ud83c\udde6\ud83c\uddf9'],
//     au: ['1f1e6-1f1fa', '\ud83c\udde6\ud83c\uddfa'],
//     be: ['1f1e7-1f1ea', '\ud83c\udde7\ud83c\uddea'],
//     br: ['1f1e7-1f1f7', '\ud83c\udde7\ud83c\uddf7'],
//     ca: ['1f1e8-1f1e6', '\ud83c\udde8\ud83c\udde6'],
//     ch: ['1f1e8-1f1ed', '\ud83c\udde8\ud83c\udded'],
//     cl: ['1f1e8-1f1f1', '\ud83c\udde8\ud83c\uddf1'],
//     cn: ['1f1e8-1f1f3', '\ud83c\udde8\ud83c\uddf3'],
//     co: ['1f1e8-1f1f4', '\ud83c\udde8\ud83c\uddf4'],
//     de: ['1f1e9-1f1ea', '\ud83c\udde9\ud83c\uddea'],
//     dk: ['1f1e9-1f1f0', '\ud83c\udde9\ud83c\uddf0'],
//     es: ['1f1ea-1f1f8', '\ud83c\uddea\ud83c\uddf8'],
//     fi: ['1f1eb-1f1ee', '\ud83c\uddeb\ud83c\uddee'],
//     fr: ['1f1eb-1f1f7', '\ud83c\uddeb\ud83c\uddf7'],
//     gb: ['1f1ec-1f1e7', '\ud83c\uddec\ud83c\udde7'],
//     hk: ['1f1ed-1f1f0', '\ud83c\udded\ud83c\uddf0'],
//     id: ['1f1ee-1f1e9', '\ud83c\uddee\ud83c\udde9'],
//     ie: ['1f1ee-1f1ea', '\ud83c\uddee\ud83c\uddea'],
//     il: ['1f1ee-1f1f1', '\ud83c\uddee\ud83c\uddf1'],
//     in: ['1f1ee-1f1f3', '\ud83c\uddee\ud83c\uddf3'],
//     it: ['1f1ee-1f1f9', '\ud83c\uddee\ud83c\uddf9'],
//     jp: ['1f1ef-1f1f5', '\ud83c\uddef\ud83c\uddf5'],
//     kr: ['1f1f0-1f1f7', '\ud83c\uddf0\ud83c\uddf7'],
//     mo: ['1f1f2-1f1f4', '\ud83c\uddf2\ud83c\uddf4'],
//     mx: ['1f1f2-1f1fd', '\ud83c\uddf2\ud83c\uddfd'],
//     my: ['1f1f2-1f1fe', '\ud83c\uddf2\ud83c\uddfe'],
//     nl: ['1f1f3-1f1f1', '\ud83c\uddf3\ud83c\uddf1'],
//     no: ['1f1f3-1f1f4', '\ud83c\uddf3\ud83c\uddf4'],
//     nz: ['1f1f3-1f1ff', '\ud83c\uddf3\ud83c\uddff'],
//     ph: ['1f1f5-1f1ed', '\ud83c\uddf5\ud83c\udded'],
//     pl: ['1f1f5-1f1f1', '\ud83c\uddf5\ud83c\uddf1'],
//     pr: ['1f1f5-1f1f7', '\ud83c\uddf5\ud83c\uddf7'],
//     pt: ['1f1f5-1f1f9', '\ud83c\uddf5\ud83c\uddf9'],
//     ru: ['1f1f7-1f1fa', '\ud83c\uddf7\ud83c\uddfa'],
//     sa: ['1f1f8-1f1e6', '\ud83c\uddf8\ud83c\udde6'],
//     se: ['1f1f8-1f1ea', '\ud83c\uddf8\ud83c\uddea'],
//     sg: ['1f1f8-1f1ec', '\ud83c\uddf8\ud83c\uddec'],
//     tr: ['1f1f9-1f1f7', '\ud83c\uddf9\ud83c\uddf7'],
//     us: ['1f1fa-1f1f8', '\ud83c\uddfa\ud83c\uddf8'],
//     vn: ['1f1fb-1f1f3', '\ud83c\uddfb\ud83c\uddf3'],
//     za: ['1f1ff-1f1e6', '\ud83c\uddff\ud83c\udde6'],
//     'man-man-boy': ['1f468-1f468-1f466', '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66'],
//     'man-man-boy-boy': [
//       '1f468-1f468-1f466-1f466',
//       '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66'
//     ],
//     'man-man-girl': ['1f468-1f468-1f467', '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67'],
//     'man-man-girl-boy': [
//       '1f468-1f468-1f467-1f466',
//       '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc66'
//     ],
//     'man-man-girl-girl': [
//       '1f468-1f468-1f467-1f467',
//       '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc67'
//     ],
//     'man-woman-boy': ['1f468-1f469-1f466', '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66'],
//     'man-woman-boy-boy': [
//       '1f468-1f469-1f466-1f466',
//       '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66'
//     ],
//     'man-woman-girl': ['1f468-1f469-1f467', '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67'],
//     'man-woman-girl-girl': [
//       '1f468-1f469-1f467-1f467',
//       '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67'
//     ],
//     'man-heart-man': ['1f468-2764-fe0f-1f468', '\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68'],
//     'man-kiss-man': [
//       '1f468-2764-fe0f-1f48b-1f468',
//       '\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68'
//     ],
//     'woman-woman-boy': ['1f469-1f469-1f466', '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66'],
//     'woman-woman-boy-boy': [
//       '1f469-1f469-1f466-1f466',
//       '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66'
//     ],
//     'woman-woman-girl': ['1f469-1f469-1f467', '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67'],
//     'woman-woman-girl-boy': [
//       '1f469-1f469-1f467-1f466',
//       '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66'
//     ],
//     'woman-woman-girl-girl': [
//       '1f469-1f469-1f467-1f467',
//       '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67'
//     ],
//     'woman-heart-woman': ['1f469-2764-fe0f-1f469', '\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc69'],
//     'woman-kiss-woman': [
//       '1f469-2764-fe0f-1f48b-1f469',
//       '\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69'
//     ]
//   };
//   var hexCodes = {};
//   var unicodeCodes = {};

//   var getHex = function () {
//     if (Object.keys(hexCodes).length > 0) {
//       return hexCodes;
//     }

//     angular.forEach(codes, function (value, key) {
//       hexCodes[key] = value[0];
//     });

//     return hexCodes;
//   };

//   var getUnicode = function () {
//     if (Object.keys(unicodeCodes).length > 0) {
//       return unicodeCodes;
//     }

//     angular.forEach(codes, function (value, key) {
//       unicodeCodes[key] = value[1];
//     });

//     return unicodeCodes;
//   };

//   return {
//     emojiHex: getHex(),
//     emojiUnicode: getUnicode()
//   };
// })());

angular.module('vkEmojiPicker').directive('emojiPicker', [
  'EmojiGroups', 'vkEmojiStorage', function (emojiGroups, storage) {
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

          $scope.model += [' :', emoji, ':'].join('');
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

// TODO: it is needed to check this directive for memory leaks.
angular.module('vkEmojiPicker').directive('emojiRemovable', function () {
  return {
    restrict: 'A',
    scope: {
      model: '=emojiRemovable'
    },
    link: function ($scope, element) {
      var createMapping = function (words, emojis) {
        var map = [];
        var offset = 0;

        angular.forEach(emojis, function (emoji) {
          var emojiElement = angular.element(emoji);
          var regexp = new RegExp('^:?' + emojiElement.attr('alt') + ':?$');

          for (var i = offset; i < words.length; i++) {
            if (regexp.test(words[i])) {
              map.push(i);
              offset = i + 1;
              break;
            }
          }
        });

        return map;
      };

      var rebindClick = function () {
        if ($scope.model == null) {
          return;
        }

        var words = $scope.model.split(/\s+/);
        var emojis = element[0].querySelectorAll('i.emoji-picker');
        var mapping = createMapping(words, emojis);

        angular.forEach(emojis, function (emoji, key) {
          var emojiElement = angular.element(emoji);
          emojiElement.off();
          emojiElement.on('click', function () {
            words.splice(mapping[key], 1);
            $scope.model = words.join(' ');
            emojiElement.off();
            emojiElement.remove();
            $scope.$apply();
          });
        });
      };

      $scope.$watch(
        function () {
          return element[0].querySelectorAll('i.emoji-picker').length;
        },
        rebindClick
      );

      $scope.$on('$destroy', function () {
        element.off();
        element.remove();
      });
    }
  };
});

angular.module('vkEmojiPicker').filter('emojify', [
  '$filter', function ($filter) {
    var hexify = $filter('hexify');
    var unicodify = $filter('unicodify');

    return function (input) {
      return unicodify(hexify(input));
    };
  }
]);

angular.module('vkEmojiPicker').filter('hexify', [
  'EmojiHex', function (EmojiHex) {
    return function (text) {
      if (text == null) {
        return '';
      }

      var emojiRegex = /\:([a-z0-9_+-]+)(?:\[((?:[^\]]|\][^:])*\]?)\])?\:/g;
      var matches = text.match(emojiRegex);

      if (matches === null) {
        return text;
      }

      for (var i = 0; i < matches.length; i++) {
        var emojiString = matches[i];
        var property = emojiString.replace(/\:/g, '');

        if (EmojiHex.emoji.hasOwnProperty(property)) {
          text = text.replace(emojiString, EmojiHex.emoji[property]);
        }
      }

      return text;
    };
  }
]);

angular.module('vkEmojiPicker').filter('imagify', [
  'EmojiGroups', function (EmojiGroups) {
    var regex = new RegExp(':(' + EmojiGroups.all.join('|') + '):', 'g');

    return function (input) {
      if (input == null) {
        return '';
      }

      return input.replace(regex, function (match, text) {
        var className = text.replace(/_/g, '-');
        var output = ['<i class="emoji-picker emoji-', className, '" alt="', text, '" title=":', text, ':"></i>'];

        return output.join('');
      });
    };
  }
]);

angular.module('vkEmojiPicker').filter('unicodify', [
  'EmojiHex', function (EmojiHex) {
    var swappedHex = {};
    var unicodes = [];

    angular.forEach(EmojiHex.emoji, function (value, key) {
      swappedHex[value] = key;
      unicodes.push(value);
    });
    unicodes = unicodes.reverse();
    var regexHex = new RegExp('(' + unicodes.join('|') + ')', 'g');

    return function (text) {
      if (text == null) {
        return '';
      }

      var matches = text.match(regexHex);

      if (matches === null) {
        return text;
      }

      for (var i = 0, len = matches.length; i < len; i++) {
        var hexString = matches[i];

        if (hexString.indexOf('-') > -1) {
          var codePoints = hexString.split('-');
          var unicode = eval('String.fromCodePoint(0x' + codePoints.join(', 0x') + ')');
        } else {
          var codePoint = ['0x', hexString].join('');
          var unicode = String.fromCodePoint(codePoint);
        }

        text = text.replace(hexString, unicode);
      }

      return text;
    };
  }
]);

angular.module('vkEmojiPicker').factory('vkEmojiLocalStorage', function () {
  var factory = {
    length: 0
  };
  var storage = {};

  var countLength = function (storageObject) {
    var length = 0;

    angular.forEach(storageObject, function () {
      length += 1;
    });

    return length;
  };

  factory.setItem = function (key, value) {
    storage[key] = value;
    factory.length = countLength(storage);
  };

  factory.getItem = function (name) {
    var value = storage[name];

    if (value == null) {
      return null;
    }

    return value;
  };

  factory.removeItem = function (key) {
    var value = factory.getItem(key);
    delete storage[key];
    factory.length = countLength(storage);

    return value;
  };

  factory.clear = function () {
    storage = {};
  };

  factory.key = function () {
    throw new Error('Realization required');
  };

  return factory;
});

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

angular.module('vkEmojiPicker').factory('vkEmojiStorage', [
  '$window', 'vkEmojiLocalStorage', function ($window, emojiStorage) {
    var factory = {};
    var storage = $window.localStorage || emojiStorage;

    factory.store = function (value) {
      var emojiString = storage.getItem('emojiPicker');

      if (emojiString == null) {
        var emojiArray = [];
      } else {
        var emojiArray = JSON.parse(emojiString);
        var emojiIndex = emojiArray.indexOf(value);

        if (emojiIndex >= 0) {
          emojiArray.splice(emojiIndex, 1);
        }
      }

      emojiArray.unshift(value);
      storage.setItem('emojiPicker', JSON.stringify(emojiArray));
    };

    factory.getFirst = function (count) {
      var count = count || 1;
      var emojiString = storage.getItem('emojiPicker');

      if (emojiString == null) {
        return [];
      }

      var emojiArray = JSON.parse(emojiString);

      return emojiArray.slice(0, count);
    };

    factory.clear = function () {
      storage.clear();
    };

    return factory;
  }
]);
