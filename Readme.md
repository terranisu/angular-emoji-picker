AngularJS Emoji Picker
======================

AngularJS Emoji Picker is a simple emoji picker for your web forms. This project heavily inspired by
[Angular Emoji](https://github.com/Coraza/angular-emoji-popup/), but it doesn't require external dependencies
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

Usage
-----

```javascript
angular.module('myModule', ['vkEmojiPicker']);
```

Known issues and limitations
----------------------------
1. **It's not ready for production yet**
2. The picker requires AngularJS 1.3. Didn't test on 1.4 version, probably it's broken.

Contributing
------------

Any contribution is highly appreciated. Especially to fix all my typos :)

1. Fork it ( https://github.com/terranisu/angular-emoji-picker/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

Also consider running any code through the code style checker `jscs` (or even better use it in your editor) with preset set to `yandex`,
but the parameter `validateIndentation` should be changed to a value `2` instead of original one `4`

### Building
The files in the `dist/` folder, plus dependencies, are all you need to use Emoji Picker. But if
you'd like to build it yourself, you have to use [grunt](http://gruntjs.com/).

First off, you need to have nodejs installed. Then install all dependencies of the
project with npm and bower, then install grunt and run the default task.

```bash
$ npm install
$ sudo npm install -g grunt-cli
$ bower install
$ grunt
```

The task compiles all source files.

You can also run `grunt watch:dev` to have it rebuild on change.

### Tests
Unit tests are run with [karma](http://karma-runner.github.io) and written using
[mocha](http://visionmedia.github.io/mocha/), [chai](http://chaijs.com/) and
[sinon](http://sinonjs.org/)

To run the tests:

1. Install all dependencies via npm
2. Install dependencies with bower.
3. Install the karma cli
4. Run the tests using karma or npm

```bash
$ npm install
$ bower install
$ sudo npm install -g karma-cli
$ karma start karma.conf.js OR npm test
```
