AngularJS Emoji Picker
======================

[![Code Climate](https://codeclimate.com/github/terranisu/angular-emoji-picker/badges/gpa.svg)](https://codeclimate.com/github/terranisu/angular-emoji-picker)

AngularJS Emoji Picker is a simple AngularJs module which allows you to add emoji images to your model value. This project is heavily inspired by
[Angular Emoji](https://github.com/Coraza/angular-emoji-popup/), but it doesn't require external dependencies like JQuery, JQuery plugins and so forth.

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
By default Emoji Picker uses its own popover, which, to be honest, has not a very great realization. But you have an option - you can use
external dependencies: [Angular Strap](https://github.com/mgcrea/angular-strap), [Angular-UI Bootstrap](https://github.com/angular-ui/bootstrap)
and [Bootstrap](https://github.com/twbs/bootstrap). In that case you have to include additional scripts on your page:

### Emoji Picker Directive
Add the `emoji-picker` attribute to an element to drop in the emoji button and picker in your template. Clicking the element will open a popover listing the available emoji for a user to select.

#### Basic Example:
```
<input type="text" ng-model="keyword"/>
<span emoji-picker="keyword" placement="right" title="Emoji"></span>
```

#### Full Example
```
<textarea ng-model="message" ng-change="messageUpdated()">{{message}}</textarea>
<span emoji-picker="message"
      placement="right" 
      title="Emoji"
      recent-limit="10"
      output-format="unicode"
      on-change-func="messageUpdated"></span>
```

#### Options:
* **emoji-picker** - the bound property to which selected emoji should be added

* **placement** (optional) - determines where the popover shows relative to the button element
   
  `top (default), bottom, left, right, right-relative`
* **title** (optional) - the header text shown in the popover window

* **recent-limit** (optional) - the number of recently-selected emoji to show in the popover window

* **output-format** (optional) - the format to add selected emoji
  
  `alias (default), unicode`

* **on-change-func** (optional) - a function to be called when the user selects or removes an emoji


### Angular Strap
```html
<link rel="stylesheet" href="/path/to/bootstrap/dist/css/bootstrap.min.css">
<script src="/path/to/angular-strap/dist/angular-strap.min.js"></script>
<script src="/path/to/angular-strap/dist/angular-strap.tpl.min.js"></script>
```

```javascript
angular.module('myModule', ['vkEmojiPicker', 'mgcrea.ngStrap']);
```

### Angular-UI Bootstrap
**Versions 0.12.x and lower are not supported.** You need to use angular-ui-bootstrap's current `master` branch. See "Known issues" section below for more information.

```bash
$ bower install angular-ui-bootstrap#master --save
```

```html
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
<script src="bower_components/angular-ui-bootstrap/src/bindHtml/bindHtml.js"></script>
<script src="bower_components/angular-ui-bootstrap/src/position/position.js"></script>
<script src="bower_components/angular-ui-bootstrap/src/tooltip/tooltip.js"></script>
<script src="bower_components/angular-ui-bootstrap/src/popover/popover.js"></script>
```

```javascript
angular.module('myModule', ['vkEmojiPicker', 'ui.bootstrap.popover']);
```

Also Emoji Picker provides a couple handy directives:

* `emojify` - converts an emoji string into image

`<div ng-bind-html="message | emojify"></div>`

* `hexify` - converts an emoji string into UTF-8 characters

`<div ng-bind-html="message | hexify"></div>`


## Known issues and limitations

1. The picker requires AngularJS 1.3 as a minimal dependency. Didn't test on 1.4 versions, probably it's broken.
2. Angular-UI-Bootstrap is supported partially.
You have to use version >=0.13, which has not been released yet. To get the `master` branch with bower, run: 
```
$ bower install angular-ui-bootstrap#master
```
and then include only required files to your project.

### Bugs and feature requests
If you found a bug or have an idea feel free [to open a new issue](https://github.com/terranisu/angular-emoji-picker/issues/new).

Contributing
------------
Any contribution is highly appreciated especially to fix all my grammar mistakes :)

1. Fork it ( https://github.com/terranisu/angular-emoji-picker/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Create a feature and add tests if required
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create a new Pull Request

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
