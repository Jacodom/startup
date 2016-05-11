'use strict';

describe('Controller: CallbackCtrl', function () {

  // load the controller's module
  beforeEach(module('spotifyClientApp'));

  var CallbackCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CallbackCtrl = $controller('CallbackCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CallbackCtrl.awesomeThings.length).toBe(3);
  });
});
