describe('Hexify filter', function () {
  var $filter;

  beforeEach(module('vkEmojiPicker'));

  beforeEach(inject(function ($injector) {
    $filter = $injector.get('$filter');
  }));

  it('should be able to convert emoji string into hex representation', function () {
    var text = $filter('hexify')('This is a text with :smile:');
    expect(text).to.be.eql('This is a text with 1f604');
  });

  it('should be able to convert a few emojis into hex representation', function () {
    var text = $filter('hexify')('This is a text with :smile: :lollipop: :sushi:');
    expect(text).to.be.eql('This is a text with 1f604 1f36d 1f363');
  });

  it('should return empty text when specified text is empty', function () {
    var text = $filter('hexify')('');
    expect(text).to.be.eql('');
  });

  it('should return empty text when specified text is null', function () {
    var text = $filter('hexify')(null);
    expect(text).to.be.eql('');
  });

  it('should return empty text when specified text is undefined', function () {
    var text = $filter('hexify')(undefined);
    expect(text).to.be.eql('');
  });

  it('should return regular text when no emoji specified', function () {
    var text = $filter('hexify')('This is a text');
    expect(text).to.be.eql('This is a text');
  });
});
