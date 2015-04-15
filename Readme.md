AngularJS Emoji Picker
======================

AngularJS Emoji Picker is a simple emoji picker for your web forms. This project heavily inspired by
[Angular Emoji](https://github.com/Coraza/angular-emoji-popup/), but it does not required external dependencies
like JQuery, etc.

Installation
------------

### Bower

The simplest way to install Emoji Picker is use [Bower](http://bower.io/).

```bash
bower install angular-emoji-picker --save
```

This will install the latest release.

### Manual

You can also just download the contents of the `dist/` folder and add dependencies manually.

### Module loading
Don't forget to load the `vkEmojiPicker` module or nothing will happen.

```javascript
angular.module('myModule', ['vkEmojiPicker']);
```

Known issues and limitations
----------------------------
**It's not ready for production yet :)**

Contributing
------------

1. Fork it ( https://github.com/terranisu/angular-emoji-picker/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
