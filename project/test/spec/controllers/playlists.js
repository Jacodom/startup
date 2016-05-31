'use strict';

describe('Controller: PlaylistsCtrl', function () {

  // load the controller's module
  beforeEach(module('spotifyClientApp'));

  var PlaylistsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlaylistsCtrl = $controller('PlaylistsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlaylistsCtrl.awesomeThings.length).toBe(3);
  });
});
