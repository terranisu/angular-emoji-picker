describe('vkEmojiLocalStorage', function () {
  var storage;

  beforeEach(module('vkEmojiPicker'));

  beforeEach(inject(function ($injector) {
    storage = $injector.get('vkEmojiLocalStorage');
  }));

  it('should have defined interface', function () {
    expect(storage).to.have.ownProperty('length');
    expect(storage).to.respondTo('setItem');
    expect(storage).to.respondTo('getItem');
    expect(storage).to.respondTo('removeItem');
    expect(storage).to.respondTo('clear');
    expect(storage).to.respondTo('key');
  });

  it('should not have any values by default', function () {
    expect(storage.getItem('value')).to.be.null;
    expect(storage.getItem('unknown')).to.be.null;
    expect(storage.getItem('strange_parameter')).to.be.null;
  });

  it('should have inserted object values', function () {
    storage.setItem('key', 'some value');
    expect(storage.getItem('key')).to.be.eql('some value');
    expect(storage.length).to.be.eql(1);
  });

  it('should be able to remove item by key', function () {
    storage.setItem('key1', 'some value');
    storage.setItem('key2', 'some value');
    storage.setItem('key3', 'some value');
    expect(storage.length).to.be.eql(3);
    expect(storage.removeItem('key1')).to.be.eql('some value');
    expect(storage.length).to.be.eql(2);
  });

  it('should have correct state when removeItem is called many times', function () {
    storage.setItem('key1', 'some value');
    expect(storage.length).to.be.eql(1);
    expect(storage.removeItem('key1')).to.be.eql('some value');
    expect(storage.removeItem('key1')).to.be.null;
    expect(storage.removeItem('key1')).to.be.null;
    expect(storage.length).to.be.eql(0);
  });
});
