'use strict';

describe('Directive: emptySearch', function () {

  // load the directive's module
  beforeEach(module('spotifyClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<empty-search></empty-search>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the emptySearch directive');
  }));
});
