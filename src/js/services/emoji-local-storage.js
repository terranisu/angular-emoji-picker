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
