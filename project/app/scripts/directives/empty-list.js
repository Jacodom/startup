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
      template: "<div class='empty-list' ng-show='checkEmptyPlaylist()'>"
                +"<i class='fa fa-frown-o fa-3x'>"
                +"</i><p class='artistname'>¡Empty playlist!</p>"
                +"<b><p class='albumname'>add some tracks!</p></b>"
                +"</div>",
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
