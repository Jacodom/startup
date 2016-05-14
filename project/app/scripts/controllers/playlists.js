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
      $scope.playlist.tracks = [];

      if(SpotifyService.getPlaylistLocal()){
        SpotifyService.selectPlaylistEdit($scope.playlist);
      }


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
          data.items.forEach(function(v){
            if(v.owner.id == $scope.userData.id){
              $scope.playlists.push(v);
            }
          });
        }, function(error){
          $scope.error = true;
        });
      };

      $scope.loadUserData();

      // ====== user interaction ==== //
      $scope.goNew = function(){
        var temp = {
          name: ''
        }
        SpotifyService.createPlaylistLocal($scope.userData.id, temp);
        $state.go('playlists-new');
      }

      $scope.goEdit = function(playlist){
        SpotifyService.selectPlaylistEdit(playlist);
        $state.go('playlists-edit');
      }

  }]);
