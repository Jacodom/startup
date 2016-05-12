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
     function ($scope, $state, SpotifyService) {

       $scope.tracks = [];
       $scope.userData = SpotifyService.getSavedUserData();
       $scope.query = '';

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

       $scope.search = function(){
         var query = $scope.query;
         console.log(query);
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


  }]);
