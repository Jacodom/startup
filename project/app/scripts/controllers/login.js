'use strict';

/**
 * @ngdoc function
 * @name spotifyClientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the spotifyClientApp
 */
angular.module('spotifyClientApp')
  .controller('LoginCtrl', [
    '$scope',
    'SpotifyService',
    '$state',
     function ($scope, SpotifyService, $state) {

        SpotifyService.setClientId('1b5a00996b474cf191f9b33cfb17e94b');
        SpotifyService.setRedirectUri('https://oauth.io/auth');
        SpotifyService.setScope('playlist-modify-public playlist-modify-private user-read-birthdate user-read-email playlist-modify-private');


        OAuth.initialize('ch7Ajd-McF3M_2SIZBX5QV7D1ZM');

        $scope.goLogin = function(){

          OAuth.popup('spotify').done(function(result) {
            SpotifyService.setAuthToken(result.access_token);
            $state.go('playlists');
    			});
        };

  }]);
