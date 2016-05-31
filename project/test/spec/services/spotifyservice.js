'use strict';

describe('Service: SpotifyService', function () {

  // load the service's module
  beforeEach(module('spotifyClientApp'));

  // instantiate service
  var SpotifyService;
  beforeEach(inject(function (_SpotifyService_) {
    SpotifyService = _SpotifyService_;
  }));

  it('should do something', function () {
    expect(!!SpotifyService).toBe(true);
  });

});
