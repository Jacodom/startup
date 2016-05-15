'use strict';

/**
 * @ngdoc directive
 * @name spotifyClientApp.directive:emptyList
 * @description
 * # emptyList
 */
angular.module('spotifyClientApp')
  .directive('emptyList', function () {
    return {
      template: "<div class='empty' ng-show='checkEmptyPlaylist()'>"
                +"<i class='fa fa-arrow-circle-up fa-3x'>"
                +"</i><p class='artistname'>¡Choose some music!</p>"
                +"<b><p class='albumname'>search what you like and rock on!</p></b>"
                +"</div>",
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
