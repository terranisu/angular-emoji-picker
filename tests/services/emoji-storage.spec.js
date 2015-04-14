describe('vkEmojiStorage', function () {
  var storage;

  beforeEach(module('vkEmojiPicker'));

  beforeEach(inject(function ($injector) {
    storage = $injector.get('vkEmojiStorage');
  }));

  afterEach(function () {
    storage.clear();
  });

  it('should have defined interface', function () {
    expect(storage).to.respondTo('store');
    expect(storage).to.respondTo('getFirst');
    expect(storage).to.respondTo('clear');
  });

  it('should not have any values by default', function () {
    expect(storage.getFirst()).to.be.eql([]);
  });

  it('should be able to store emoji value', function () {
    storage.store('smile_value');
    expect(storage.getFirst()).to.be.eql(['smile_value']);
  });

  it('should be able to clear storage', function () {
    storage.store('smile_value');
    storage.clear();
    expect(storage.getFirst()).to.be.eql([]);
  });

  it('should have LIFO behavior', function () {
    storage.store('emoji_value1');
    storage.store('emoji_value2');
    storage.store('emoji_value3');
    expect(storage.getFirst(3)).to.be.eql(['emoji_value3', 'emoji_value2', 'emoji_value1']);
  });

  it('should store only unique values', function () {
    storage.store('value1');
    storage.store('value2');
    storage.store('value3');
    storage.store('value1');
    storage.store('value4');
    storage.store('value5');
    storage.store('value3');
    expect(storage.getFirst(10)).to.be.eql([
      'value3',
      'value5',
      'value4',
      'value1',
      'value2'
    ]);
  });

  it('should return only one item by default', function () {
    storage.store('smile_value1');
    storage.store('smile_value2');
    expect(storage.getFirst()).to.be.eql(['smile_value2']);
  });

  it('should return exact number of items', function () {
    storage.store('smile_value1');
    storage.store('smile_value2');
    storage.store('smile_value3');
    storage.store('smile_value4');
    storage.store('smile_value5');
    expect(storage.getFirst(3)).to.be.eql(['smile_value5', 'smile_value4', 'smile_value3']);
  });
});
