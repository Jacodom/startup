'use strict';

describe('Controller: PlaylistsdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('spotifyClientApp'));

  var PlaylistsdetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlaylistsdetailsCtrl = $controller('PlaylistsdetailsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlaylistsdetailsCtrl.awesomeThings.length).toBe(3);
  });
});
