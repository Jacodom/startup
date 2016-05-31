'use strict';

/**
 * @ngdoc directive
 * @name spotifyClientApp.directive:emptySearch
 * @description
 * # emptySearch
 */
angular.module('spotifyClientApp')
  .directive('emptySearch', function () {
    return {
      template: "<div class='empty' ng-show='checkEmptyTracks()'>"
                +"<i class='fa fa-arrow-circle-up fa-3x animated infinite slideOutUp'>"
                +"</i><p class='artistname'>¡Choose some music!</p>"
                +"<b><p class='albumname'>search what you like and rock on!</p></b>"
                +"</div>",
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
