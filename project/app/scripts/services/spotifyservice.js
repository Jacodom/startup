'use strict';

/**
 * @ngdoc service
 * @name spotifyClientApp.SpotifyService
 * @description
 * # SpotifyService
 * Factory in the spotifyClientApp.
 */
angular.module('spotifyClientApp')
  .factory('SpotifyService', [
    'store',
    '$q',
    '$http',
    'store',
    function (store, $q, $http) {

    //playlist obj
    this._playlist = {};
    this._playlist.tracks = [];


    //settings for the spotifyservice
    this.settings = {};
    this.settings.clientId = null;
    this.settings.redirectUri = null;
    this.settings.scope = null;
    this.settings.authToken = null;


    //=======Getters and Setters=======//

    //clientId
    this.setClientId = function(clientId){
      this.settings.clientId = clientId;
      return this.settings.clientId;
    };

    this.getClientId = function(){
      return this.settings.clientId;
    };

    //redirectUri
    this.setRedirectUri = function(redirectUri){
      this.settings.redirectUri = redirectUri;
      return this.settings.redirectUri;
    };

    this.getRedirectUri = function(){
      return this.settings.redirectUri;
    };

    //scope
    this.setScope = function(scope){
      this.settings.scope = scope;
      return this.settings.scope;
    };

    this.getScope = function(){
      return this.settings.scope;
    };

    //API Calls

    //=======Base URL ======//
    this.settings.baseURL = 'https://api.spotify.com/v1';

    this.callAPI = function(endpoint, method, params, data, headers){
      var deferred = $q.deferred();

      $http({
        url: this.settings.baseURL + endpoint,
        method: method ? method : 'GET',
        params: params,
        headers: headers
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(data){
        deferred.reject(data);
      });

      return deferred.promise;
    };

    this.getAuthHeaders = function(json){
      var header = {
        'Authorization': 'Bearer' + this.settings.authToken
      }

      if(json){
        header['Content-Type'] = 'application/json';
      }

      return header;
    };

    //=========USER DATA ======//

    this.getUserData = function(){
      return this.callAPI('/me', 'GET', null, null, this.getAuthHeaders());
    };

    //==========PLAYLISTS=======//

    this.getUserPlaylists = function(userId){
      return this.callAPI('/users/' + userId + '/playlists', 'GET', null, null, this.getAuthHeaders());
    };

    this.getPlaylist = function(userId, playlistId){
      return this.callAPI('/users/' + userId + '/playlists', 'GET', null, null, this.getAuthHeaders());
    };

    this.getPlaylistTracks = function(userId, playlistId){
      return this.callAPI('/users/' + userId + '/playlists/' + playlistId + '/tracks', 'GET', null, null, this.getAuthHeaders());
    };

    this.createPlaylistLocal = function(userId, playlistId, options){
      this._playlist.userId = userId;
      this._playlist.id = playlistId;
      this._playlist.name = options.name;
    };

    this.createPlaylistRemote = function(userId, options){
      return this.callAPI('/users/' + userId + '/playlists', 'POST', options, null, this.getAuthHeaders(true));
    };

    this.addTrackPlaylistLocal = function(track){
      if(track){
        this._playlist.tracks.push(track);
      }
    };

    this.savePlaylistLocal = function(playlist){
      if(playlist && playlist.tracks){
        store.set('playlist', playlist);
      }
    };

    this.addTracksPlaylistRemote = function(userId, playlistId, tracks, options){
      if(tracks){
        tracks.forEach(function(track, index){
          tracks[index] = 'spotify:track:' + track.id;
        });
      }

      return this.callAPI('/users/' + userId + '/playlists/', + playlistId + '/tracks', 'POST', {
        uris: tracks.toString(),
        position: null
      }, null, this.getAuthHeaders(true));
    };

    //=======Search=======//
    this.search = function(query, type){
      var options = {};
      options.q = query;
      options.type = type;

      return this.callAPI('/search', 'GET', options);
    };

    var that = this;

    // Public API here
    return {
      getUserPlaylists: function (userId) {
        return that.getUserPlaylists(userId);
      },
      getPlaylist: function(userId, playlistId){
        return that.getPlaylist(userId, playlistId);
      },
      getPlaylistTracks: function(userId, playlistId){
        return that.getPlaylistTracks(userId, playlistId);
      },
      createPlaylistRemote: function(userId, options){
        return that.createPlaylistRemote(userId, options);
      },
      createPlaylistLocal: function(userId, playlistId, options){
        that.createPlaylistLocal(userId, playlistId, options);
      },
      addTrackPlaylistLocal: function(track){
        that.addTrackPlaylistLocal(track);
        that.savePlaylistLocal(that._playlist);
      },
      addTracksPlaylistRemote: function(userId, playlistId, tracks, options){
        return that.addTracksPlaylistRemote(userId, playlistId, tracks, options);
      },
      search: function(query, type){
        return that.search(query, type);
      },
      getUserData: function(){
        return that.getUserData();
      },
      setClientId: function(clientId){
        that.setClientId(clientId);
      },
      getClientId: function(){
        return that.getClientId();
      },
      setRedirectUri: function(redirectUri){
        that.setRedirectUri(redirectUri);
      },
      getRedirectUri: function(){
        return that.getRedirectUri();
      },
      setScope: function(scope){
        that.setScope(scope);
      },
      getScope: function(){
        return that.getScope();
      }
    };
  }]);
