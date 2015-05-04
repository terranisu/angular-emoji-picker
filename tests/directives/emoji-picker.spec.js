describe('Emoji Picker directive', function () {
  var $compile;
  var $scope;

  beforeEach(module('vkEmojiPicker'));

  beforeEach(inject(function ($injector) {
    $compile = $injector.get('$compile');
    $scope = $injector.get('$rootScope');
  }));

  it('should been compiled successfully', function () {
    var element = angular.element(
      '<span emoji-picker="message" placement="right" title="Emoji" recent-limit="12"></span>'
    );
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    expect(compiledElement.html()).to.be.eql(
      '<i class="emoji-picker emoji-smile" bs-popover="" ' +
      'template="templates/emoji-popover-strap.html" placement="right" title="Emoji"></i>'
    );
    expect($scope.message).to.be.undefined;
  });

  it('should add emoji to model', function () {
    var element = angular.element(
      '<span emoji-picker="message" placement="right" title="Emoji" recent-limit="12"></span>'
    );
    $compile(element)($scope);
    $scope.$digest();
    $scope.$$childTail.append('smile');
    expect($scope.$$childTail.model).to.be.eql(':smile:');
  });
  
  it('should be able to output unicode emoji', function () {
    var element = angular.element(
      '<span emoji-picker="message" output="unicode" placement="right" title="Emoji" recent-limit="12"></span>'
    );
    $compile(element)($scope);
    $scope.$digest();
    $scope.$$childTail.append('smile');
    expect($scope.$$childTail.model).to.be.eql('😄');
  });
});
