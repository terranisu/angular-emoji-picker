describe('Emojify filter', function () {
  var $filter;

  beforeEach(module('vkEmojiPicker'));

  beforeEach(inject(function ($injector) {
    $filter = $injector.get('$filter');
  }));

  it('should be able to convert emoji string into image representation', function () {
    var text = $filter('emojify')('This is a text with :smile:');
    expect(text).to.be.eql('This is a text with \ud83d\ude04');
  });

  it('should be able to convert a few emojis into hex representation', function () {
    var text = $filter('emojify')('This is a text with :smile: :lollipop: :heart_eyes_cat:');
    expect(text).to.be.eql('This is a text with \ud83d\ude04 \ud83c\udf6d \ud83d\ude3b');
  });

  it('should return regular text when no emoji specified', function () {
    var text = $filter('emojify')('This is a text');
    expect(text).to.be.eql('This is a text');
  });

  it('should return empty text when specified text is empty', function () {
    var text = $filter('emojify')('');
    expect(text).to.be.eql('');
  });

  it('should return empty text when specified text is null', function () {
    var text = $filter('emojify')(null);
    expect(text).to.be.eql('');
  });

  it('should return empty text when specified text is undefined', function () {
    var text = $filter('emojify')(undefined);
    expect(text).to.be.eql('');
  });
});
