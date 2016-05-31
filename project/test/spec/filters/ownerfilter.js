'use strict';

describe('Filter: ownerFilter', function () {

  // load the filter's module
  beforeEach(module('spotifyClientApp'));

  // initialize a new instance of the filter before each test
  var ownerFilter;
  beforeEach(inject(function ($filter) {
    ownerFilter = $filter('ownerFilter');
  }));

  it('should return the input prefixed with "ownerFilter filter:"', function () {
    var text = 'angularjs';
    expect(ownerFilter(text)).toBe('ownerFilter filter: ' + text);
  });

});
