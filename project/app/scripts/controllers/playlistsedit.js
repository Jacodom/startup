'use strict';

/**
 * @ngdoc function
 * @name spotifyClientApp.controller:PlaylistseditCtrl
 * @description
 * # PlaylistseditCtrl
 * Controller of the spotifyClientApp
 */
angular.module('spotifyClientApp')
  .controller('PlaylistsEditCtrl', [
    '$scope',
    '$state',
    'SpotifyService',
    function ($scope, $state, SpotifyService) {

      $scope.tracks = [];
      $scope.userData = SpotifyService.getSavedUserData();
      $scope.query = '';


      $scope.init = function(){

        if(SpotifyService.getPlaylistLocal()){
          $scope.playlist = SpotifyService.getPlaylistLocal();
          $scope.playlist.tracks = [];
          SpotifyService.getPlaylistTracks($scope.userData.id, $scope.playlist.id)
          .then(function(data){
            data.items.forEach(function(song){
              $scope.playlist.tracks.push(song.track);
            });
            SpotifyService.selectPlaylistEdit($scope.playlist);
          }, function(error){
            console.log(error);
          });
        }
      }

      $scope.init();

      $scope.search = function(){
        var query = $scope.query;
        if(query != ""){
          SpotifyService.search(query, 'track')
          .then(function(data){
            $scope.tracks = data.tracks.items;
          }, function(error){
            console.log(error);
          });
        }else{
          $scope.tracks = [];
        }
      };

      $scope.addTrackToPlaylist = function(track){
        if($scope.playlist.tracks.length > 0){
          var flag = false;
          $scope.playlist.tracks.forEach(function(value){
            if(value.id == track.id){
              flag = true;
            }
          }, flag);
          if(!flag){
            SpotifyService.addTrackPlaylistLocal(track);
            $scope.playlist.tracks = SpotifyService.getPlaylistLocal().tracks;
          }
        }else{
          SpotifyService.addTrackPlaylistLocal(track);
          $scope.playlist.tracks = SpotifyService.getPlaylistLocal().tracks;
        }
      };

      $scope.uploadPlaylist = function(){
        var opt = {
          name: $scope.playlist.name
        }
        var tracksToBeAdded = $scope.playlist.tracks;
        console.log(tracksToBeAdded);
        SpotifyService.editTracksPlaylistRemote($scope.userData.id, $scope.playlist.id, tracksToBeAdded)
        .then(function(data){
          console.log('se guardoo');
        }, function(error){
          console.log(error);;
        });
      }
  }]);
