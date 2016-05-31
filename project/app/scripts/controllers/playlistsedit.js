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
    'toastr',
    function ($scope, $state, SpotifyService, toastr) {

      $scope.tracks = [];
      $scope.userData = SpotifyService.getSavedUserData();
      $scope.query = '';
      $scope.loading = false;


      $scope.init = function(){

        if(SpotifyService.getPlaylistLocal()){
          $scope.playlist = SpotifyService.getPlaylistLocal();
          $scope.playlist.tracks = [];
          $scope.loading = true;
          SpotifyService.getPlaylistTracks($scope.userData.id, $scope.playlist.id)
          .then(function(data){
            data.items.forEach(function(song){
              $scope.playlist.tracks.push(song.track);
            });
            SpotifyService.selectPlaylistEdit($scope.playlist);
            $scope.loading = false;
          }, function(error){
            console.log(error);
          });
        }
      }

      $scope.init();

      $scope.checkEmptyTracks = function(){
        if(!$scope.loading && $scope.tracks.length == 0){
          return true;
        }else{
          return false;
        }
      }

      $scope.search = function(){
        var query = $scope.query;
        if(query != ""){
          $scope.loading = true;
          SpotifyService.search(query, 'track')
          .then(function(data){
            $scope.tracks = data.tracks.items;
            $scope.loading = false;
          }, function(error){
            toastr.error('Something went wrong, sorry, try again!', 'Connection Error!');
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
        SpotifyService.editTracksPlaylistRemote($scope.userData.id, $scope.playlist.id, tracksToBeAdded)
        .then(function(data){
          toastr.success('all right!', 'You just edited your playlist!');
        }, function(error){
          toastr.error('Something went wrong, sorry, try again!', 'Connection Error!');
        });
      }
  }]);
