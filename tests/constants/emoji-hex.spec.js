describe('EmojiHex', function () {
  var mapping;

  beforeEach(module('vkEmojiPicker'));

  beforeEach(inject(function ($injector) {
    mapping = $injector.get('EmojiHex');
  }));

  it('should have defined property "emoji"', function () {
    expect(mapping).to.have.ownProperty('emoji');
  });

  it('should have correct hex mapping', function () {
    expect(mapping.emoji).to.have.ownProperty('copyright');
    expect(mapping.emoji.copyright).to.be.eql('00a9');
  });
});
