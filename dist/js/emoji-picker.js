angular.module('templates-dist', ['templates/emoji-button-bootstrap.html', 'templates/emoji-button-strap.html', 'templates/emoji-button.html', 'templates/emoji-popover-bootstrap.html', 'templates/emoji-popover-strap.html', 'templates/emoji-popover.html']);

angular.module("templates/emoji-button-bootstrap.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/emoji-button-bootstrap.html",
    "<i class=\"emoji-picker emoji-smile\"\n" +
    "   popover-template=\"'templates/emoji-popover-bootstrap.html'\"\n" +
    "   popover-placement=\"{{ !placement && 'left' || placement }}\"\n" +
    "   popover-title=\"{{ title }}\"></i>\n" +
    "");
}]);

angular.module("templates/emoji-button-strap.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/emoji-button-strap.html",
    "<i class=\"emoji-picker emoji-smile\"\n" +
    "   bs-popover\n" +
    "   template=\"templates/emoji-popover-strap.html\"\n" +
    "   placement=\"{{ !placement && 'left' || placement }}\"\n" +
    "   title=\"{{ title }}\"></i>\n" +
    "");
}]);

angular.module("templates/emoji-button.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/emoji-button.html",
    "<i class=\"emoji-picker emoji-smile\"\n" +
    "   emoji-popover template=\"templates/emoji-popover.html\"\n" +
    "   placement=\"{{ ::placement }}\"\n" +
    "   title=\"{{ ::title }}\"></i>\n" +
    "");
}]);

angular.module("templates/emoji-popover-bootstrap.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/emoji-popover-bootstrap.html",
    "<div class=\"emoji-container\">\n" +
    "  <div class=\"emoji-groups\">\n" +
    "    <i class=\"emoji-group {{ ::group.icon.name }}\"\n" +
    "       ng-class=\"(group.icon.selected === selectedGroup.icon.selected) ? selectedGroup.icon.selected : ''\"\n" +
    "       ng-repeat=\"group in ::groups\"\n" +
    "       ng-click=\"changeGroup(group)\">\n" +
    "    </i>\n" +
    "    <span class=\"btn-backspace\" ng-click=\"remove()\">&#x232B;</span>\n" +
    "  </div>\n" +
    "  <i class=\"emoji-picker emoji-{{ ::toClassName(emoji) }}\"\n" +
    "     ng-repeat=\"emoji in selectedGroup.emoji\"\n" +
    "     ng-click=\"append(emoji)\">\n" +
    "  </i>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/emoji-popover-strap.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/emoji-popover-strap.html",
    "<div class=\"popover\" tabindex=\"-1\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "  <div class=\"close-button-holder\">\n" +
    "    <i class=\"close-button\" ng-click=\"$hide()\">&times;</i>\n" +
    "  </div>\n" +
    "  <h3 class=\"popover-title\" ng-bind-html=\"title\" ng-show=\"title\"></h3>\n" +
    "  <div class=\"popover-content\">\n" +
    "    <div class=\"emoji-container\">\n" +
    "      <div class=\"emoji-groups\">\n" +
    "        <i class=\"emoji-group {{ ::group.icon.name }}\"\n" +
    "           ng-class=\"(group.icon.selected === selectedGroup.icon.selected) ? selectedGroup.icon.selected : ''\"\n" +
    "           ng-repeat=\"group in ::groups\"\n" +
    "           ng-click=\"changeGroup(group)\">\n" +
    "        </i>\n" +
    "        <span class=\"btn-backspace\" ng-click=\"remove()\">&#x232B;</span>\n" +
    "      </div>\n" +
    "      <i class=\"emoji-picker emoji-{{ ::toClassName(emoji) }}\"\n" +
    "         ng-repeat=\"emoji in selectedGroup.emoji\"\n" +
    "         ng-click=\"append(emoji)\">\n" +
    "      </i>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
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
    "           ng-repeat=\"group in ::groups\"\n" +
    "           ng-click=\"changeGroup(group)\">\n" +
    "        </i>\n" +
    "        <span class=\"btn-backspace\" ng-click=\"remove()\">&#x232B;</span>\n" +
    "      </div>\n" +
    "      <i class=\"emoji-picker emoji-{{ ::toClassName(emoji) }}\"\n" +
    "         ng-repeat=\"emoji in selectedGroup.emoji\"\n" +
    "         ng-click=\"emojiClicked(emoji)\">\n" +
    "      </i>\n" +
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
});

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

angular.module('vkEmojiPicker').directive('emojiPicker', [
  'EmojiGroups', 'EmojiHex', 'vkEmojiStorage', 'vkEmojiTransforms', function (emojiGroups, emojiHex, storage, vkEmojiTransforms) {
    var RECENT_LIMIT = 54;
    var DEFAULT_OUTPUT_FORMAT = '';
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
        title: '@',
        onChangeFunc: '='
      },
      link: function ($scope, element, attrs) {
        var recentLimit = parseInt(attrs.recentLimit, 10) || RECENT_LIMIT;
        var outputFormat = attrs.outputFormat || DEFAULT_OUTPUT_FORMAT;

        $scope.groups = emojiGroups.groups;
        $scope.selectedGroup = emojiGroups.groups[0];
        $scope.selectedGroup.emoji = storage.getFirst(recentLimit);

        $scope.append = function (emoji) {
          if ($scope.model == null) {
            $scope.model = '';
          }

          $scope.model += formatSelectedEmoji(emoji, outputFormat);
          $scope.model = $scope.model.trim();
          storage.store(emoji);

          fireOnChangeFunc();
        };

        $scope.remove = function () {
          if (angular.isDefined($scope.model)) {
            var words = $scope.model.split(' ');
            words.pop();
            $scope.model = words.join(' ').trim();

            fireOnChangeFunc();
          }
        };

        $scope.toClassName = function (emoji) {
          return emoji.replace(/_/g, '-');
        };

        $scope.changeGroup = function (group) {
          // Don't let the user pick non-unicode emoji (there are 7) when output format is unicode
          if(outputFormat == 'unicode') {
            group.emoji = group.emoji.filter(function(value) {
              return emojiHex.emoji.hasOwnProperty(value);
            });
          }
          $scope.selectedGroup = group;

          if ($scope.selectedGroup.name === 'recent') {
            $scope.selectedGroup.emoji = storage.getFirst(recentLimit);
          }
        };

        $scope.$on('$destroy', function () {
          element.remove();
        });

        function formatSelectedEmoji(emoji, type) {
          emoji = [' :', emoji, ':'].join('');
          if (type == 'unicode') {
            return vkEmojiTransforms.emojify(emoji);
          } else {
            return emoji;
          }
        }

        function fireOnChangeFunc() {
          if ($scope.onChangeFunc && typeof $scope.onChangeFunc === 'function') {
            setTimeout($scope.onChangeFunc);
          }
        }
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
  'vkEmojiTransforms', function (vkEmojiTransforms) {
    return vkEmojiTransforms.emojify;
  }
]);

angular.module('vkEmojiPicker').filter('hexify', [
  'vkEmojiTransforms', function (vkEmojiTransforms) {
    return vkEmojiTransforms.hexify;
  }
]);

angular.module('vkEmojiPicker').filter('imagify', [
  'vkEmojiTransforms', function (vkEmojiTransforms) {
    return vkEmojiTransforms.imagify;
  }
]);

angular.module('vkEmojiPicker').filter('unicodify', [
  'vkEmojiTransforms', function (vkEmojiTransforms) {
    return vkEmojiTransforms.unicodify;
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

angular.module('vkEmojiPicker').factory('vkEmojiTransforms', [
  'EmojiHex', 'EmojiGroups', function (EmojiHex, EmojiGroups) {
    var transforms = {
      hexify: hexify,
      imagify: imagify,
      unicodify: unicodify,
      emojify: emojify
    };

    var regex = new RegExp(':(' + EmojiGroups.all.join('|') + '):', 'g');
    var regexHex = new RegExp('(' + getUnicodes().join('|') + ')', 'g');

    function getUnicodes() {
      var swappedHex = {};
      var unicodes = [];

      angular.forEach(EmojiHex.emoji, function (value, key) {
        swappedHex[value] = key;
        unicodes.push(value);
      });

      return unicodes.reverse();
    }

    function hexify(text) {
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
    }

    function imagify(input) {
      if (input == null) {
        return '';
      }

      return input.replace(regex, function (match, text) {
        var className = text.replace(/_/g, '-');
        var output = ['<i class="emoji-picker emoji-', className, '" alt="', text, '" title=":', text, ':"></i>'];

        return output.join('');
      });
    }

    function unicodify(text) {
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
    }

    function emojify(input) {
      return unicodify(hexify(input));
    }

    return transforms;
  }
]);
