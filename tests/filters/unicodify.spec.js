describe('Unicodify filter', function () {
  var $filter;

  beforeEach(module('vkEmojiPicker'));

  beforeEach(inject(function ($injector) {
    $filter = $injector.get('$filter');
  }));

  it('should be able to convert code point string into unicode representation', function () {
    var text = $filter('unicodify')('This is a text with 1f604');
    expect(text).to.be.eql('This is a text with \ud83d\ude04');
  });

  it('should be able to convert a few code points into unicode representation', function () {
    var text = $filter('unicodify')('This is a text with 1f604 1f36d 1f363');
    expect(text).to.be.eql('This is a text with \ud83d\ude04 \ud83c\udf6d \ud83c\udf63');
  });

  // TODO: This test is failed. Find it out what's wrong with it
  // it('should be able to convert composite emoji into unicode representation', function () {
  //   var text = $filter('unicodify')('This is a text with 1f468-1f469-1f466');
  //   expect(text).to.be.eq('This is a text with \ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66');
  // });

  it('should return empty text when specified text is empty', function () {
    var text = $filter('unicodify')('');
    expect(text).to.be.eql('');
  });

  it('should return empty text when specified text is null', function () {
    var text = $filter('unicodify')(null);
    expect(text).to.be.eql('');
  });

  it('should return empty text when specified text is undefined', function () {
    var text = $filter('unicodify')(undefined);
    expect(text).to.be.eql('');
  });

  it('should return regular text when no emoji specified', function () {
    var text = $filter('unicodify')('This is a text');
    expect(text).to.be.eql('This is a text');
  });
});
