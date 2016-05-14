'use strict';

/**
 * @ngdoc directive
 * @name spotifyClientApp.directive:loader
 * @description
 * # loader
 */
angular.module('spotifyClientApp')
  .directive('loader', function () {
    return {
      template: "<div ng-show='loading'><span class='fa fa-circle-o-notch fa-spin fa-3x fa-fw loading'></span></div>",
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
