'use strict';

describe('Controller: PlaylistsnewCtrl', function () {

  // load the controller's module
  beforeEach(module('spotifyClientApp'));

  var PlaylistsnewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlaylistsnewCtrl = $controller('PlaylistsnewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlaylistsnewCtrl.awesomeThings.length).toBe(3);
  });
});
