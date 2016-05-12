'use strict';

/**
 * @ngdoc function
 * @name spotifyClientApp.controller:PlaylistsCtrl
 * @description
 * # PlaylistsCtrl
 * Controller of the spotifyClientApp
 */
angular.module('spotifyClientApp')
  .controller('PlaylistsCtrl', [
    '$scope',
    '$state',
    'SpotifyService',
    function ($scope, $state, SpotifyService) {

      $scope.token = SpotifyService.getAuthToken();
      $scope.userData = {};
      $scope.error = false;
      $scope.playlists = [];
      $scope.playlist = {};


      // ====== user data ==== //
      $scope.loadUserData = function(){
        SpotifyService.getUserData()
        .then(function(data){
          $scope.userData = data;
          SpotifyService.saveUserData(data);
          $scope.loadPlaylistsUser();
        }, function(error){
          $scope.error = true;
        });
      };

      $scope.loadPlaylistsUser = function(){
        SpotifyService.getUserPlaylists($scope.userData.id)
        .then(function(data){
          $scope.playlists = data.items;
        }, function(error){
          $scope.error = true;
        });
      };

      $scope.loadUserData();

      // ====== user interaction ==== //
      $scope.goNew = function(){
        var temp = {
          name: 'cool playlist'
        }
        SpotifyService.createPlaylistLocal($scope.userData.id, temp);
        $state.go('playlists-new');
      }

  }]);
