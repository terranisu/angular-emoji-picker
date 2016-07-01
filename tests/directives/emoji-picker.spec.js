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
      'template="templates/emoji-popover-strap.html" placement="right" title="Emoji"></i>\n'
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

  it('should remove emoji from the model', function () {
    var element = angular.element(
      '<span emoji-picker="message" placement="right" title="Emoji" recent-limit="12"></span>'
    );
    $compile(element)($scope);
    $scope.$digest();
    $scope.$$childTail.append('smile');
    $scope.$$childTail.remove();
    expect($scope.$$childTail.model).to.be.eql('');
  });

  it('should do nothing when calling remove() and the bound property is undefined', function () {
    var element = angular.element(
      '<span emoji-picker="message" placement="right" title="Emoji" recent-limit="12"></span>'
    );
    $compile(element)($scope);
    $scope.$digest();
    $scope.$$childTail.remove();
    expect($scope.$$childTail.model).to.be.eql(undefined);
  });

  it('should insert the unicode emoji symbol when unicode format is specified', function () {
    var element = angular.element(
      '<span emoji-picker="message" placement="right" output-format="unicode" title="Emoji" recent-limit="12"></span>'
    );
    $compile(element)($scope);
    $scope.$digest();
    $scope.$$childTail.append('smile');
    expect($scope.$$childTail.model).to.be.eql('😄');
  });

  it('should call onChangeFunc when the user picks an emoji', function () {
    var callCounter = 0;
    $scope.spyFunc = function() {
      callCounter++;
    };
    var element = angular.element(
      '<span emoji-picker="message" placement="right" title="Emoji" recent-limit="12" on-change-func="spyFunc"></span>'
    );
    $compile(element)($scope);
    $scope.$digest();
    $scope.$$childTail.append('smile');
    
    setTimeout(function() {
      expect(callCounter).to.be.eql(1);
    })
  });

  it('should call onChangeFunc when the user removes an emoji', function () {
    var callCounter = 0;
    $scope.spyFunc = function() {
      callCounter++;
    };
    var element = angular.element(
      '<span emoji-picker="message" placement="right" title="Emoji" recent-limit="12" on-change-func="spyFunc"></span>'
    );
    $compile(element)($scope);
    $scope.$digest();
    $scope.$$childTail.append('smile');
    $scope.$$childTail.remove();
    
    setTimeout(function() {
      expect(callCounter).to.be.eql(1);
    })
  });
});
