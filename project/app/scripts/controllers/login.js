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
    '$window',
     function ($scope, SpotifyService, $window) {

    SpotifyService.setClientId('1b5a00996b474cf191f9b33cfb17e94b');
    SpotifyService.setRedirectUri('http://localhost:9000/#/callback');
    SpotifyService.setScope('playlist-modify-public playlist-modify-private user-read-birthdate user-read-email playlist-modify-private');


    OAuth.initialize('ch7Ajd-McF3M_2SIZBX5QV7D1ZM');

    $scope.goLogin = function(){

      OAuth.popup('spotify').done(function(result) {
			//RESULTS from the Oauth
		    console.log(result.access_token);
        SpotifyService.setAuthToken(result.access_token);
        SpotifyService.getUserData().then(function(data){
          console.log(data);
        });
			});

      // $window.location.href = 'https://accounts.spotify.com/authorize?' +
      // 'client_id=' + SpotifyService.getClientId() + '&' +
      // 'response_type=code&' +
      // 'redirect_uri=' + encodeURIComponent(SpotifyService.getRedirectUri()) + '&' +
      // 'scope=' + encodeURIComponent(SpotifyService.getScope());
    }

  }]);
