'use strict';

describe('Controller: PlaylistseditCtrl', function () {

  // load the controller's module
  beforeEach(module('spotifyClientApp'));

  var PlaylistseditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlaylistseditCtrl = $controller('PlaylistseditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlaylistseditCtrl.awesomeThings.length).toBe(3);
  });
});
