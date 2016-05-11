'use strict';

/**
 * @ngdoc function
 * @name spotifyClientApp.controller:CallbackCtrl
 * @description
 * # CallbackCtrl
 * Controller of the spotifyClientApp
 */
angular.module('spotifyClientApp')
  .controller('CallbackCtrl',[
    '$scope',
    '$window',
    'SpotifyService',
     function ($scope, $window, SpotifyService) {

       $scope.getCode = function(){
         var code = $window.location.href.substring(28,344);
         console.log(code);
         SpotifyService.getTokenRemote(code).then(function(data){
           $scope.token = data.access_token;
         });
         console.log($scope.token);
       }

       $scope.getCode();


  }]);
