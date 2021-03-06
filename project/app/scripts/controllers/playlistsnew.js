'use strict';

/**
 * @ngdoc function
 * @name spotifyClientApp.controller:PlaylistsnewCtrl
 * @description
 * # PlaylistsnewCtrl
 * Controller of the spotifyClientApp
 */
angular.module('spotifyClientApp')
  .controller('PlaylistsNewCtrl', [
    '$scope',
    '$state',
    'SpotifyService',
    'toastr',
     function ($scope, $state, SpotifyService, toastr) {

       $scope.tracks = [];
       $scope.userData = SpotifyService.getSavedUserData();
       $scope.query = '';

       $scope.loading = false ;

       $scope.init = function(){

         if(SpotifyService.getPlaylistLocal()){
           $scope.playlist = SpotifyService.getPlaylistLocal();
         }else{
           var temp = {
             name: 'cool playlist'
           }

           SpotifyService.createPlaylistLocal($scope.userData, temp);
           $scope.playlist = SpotifyService.getPlaylistLocal();
           $scope.playlist.tracks = [];
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

       $scope.checkEmptyPlaylist = function(){
         if($scope.playlist.tracks.length == 0){
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
             $scope.loading = false;
             $scope.tracks = data.tracks.items;
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

         if($scope.verifyInput()){
           SpotifyService.createPlaylistRemote($scope.userData.id, opt)
           .then(function(data){
             if($scope.playlist.tracks.length > 0){
               SpotifyService.addTracksPlaylistRemote($scope.userData.id, data.id, $scope.playlist.tracks, opt)
               .then(function(data){
                 if(data){
                   $state.go('playlists');
                 }
               }, function(error){
                 toastr.error('Something went wrong, sorry, try again!', 'Connection Error!');
               });
             }else{
               $state.go('playlists');
             }
           }, function(error){
             toastr.error('Something went wrong, sorry, try again!', 'Connection Error!');
           });
         }else{
           toastr.error('You must add a name to the playlist!', 'Watch out!');
         }
       }

       $scope.verifyInput = function(){
         if($scope.playlist.name == '' || $scope.playlist.name === undefined){
           return false;
         }else{
           return true;
         }
       }


  }]);
