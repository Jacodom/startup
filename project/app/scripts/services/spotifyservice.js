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

    if(store.get('playlist')){
      this._playlist = store.get('playlist');
    }else{
      this._playlist = {};
      this._playlist.tracks = [];
    }



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

    this.setAuthToken = function(token){
      if(token){
        store.set('authToken', token);
        this.settings.authToken = token;
        return this.settings.authToken;
      }
    };

    this.getAuthToken = function(token){
      if(store.get('authToken')){
        this.settings.authToken = store.get('authToken');
        return this.settings.authToken;
      }
    };

    //API Calls

    //=======Base URL ======//
    this.settings.baseURL = 'https://api.spotify.com/v1';

    this.callAPI = function(endpoint, method, params, data, headers){
      var deferred = $q.defer();

      $http({
        url: this.settings.baseURL + endpoint,
        method: method ? method : 'GET',
        params: params,
        data: data,
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
        'Authorization': 'Bearer' + ' ' + this.getAuthToken()
      };

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
      return this.callAPI('/users/' + userId + '/playlists/' + playlistId , 'GET', null, null, this.getAuthHeaders());
    };

    this.getPlaylistTracks = function(userId, playlistId){
      return this.callAPI('/users/' + userId + '/playlists/' + playlistId + '/tracks', 'GET', null, null, this.getAuthHeaders());
    };

    this.createPlaylistLocal = function(userId, options){
      this._playlist.userId = userId;
      this._playlist.name = options.name;
      this._playlist.tracks = [];
    };

    this.createPlaylistRemote = function(userId, data){
      return this.callAPI('/users/' + userId + '/playlists', 'POST', null, data, this.getAuthHeaders(true));
    };

    this.addTrackPlaylistLocal = function(track){
      if(track){
        this._playlist.tracks.push(track);
      }
    };

    this.savePlaylistLocal = function(playlist){
      if(playlist && playlist.tracks){
        store.set('playlist', playlist);
        this._playlist = playlist;
      }
    };

    this.getPlaylistLocal = function(){
      return store.get('playlist');
    }

    this.addTracksPlaylistRemote = function(userId, playlistId, tracks, options){
      if(tracks){
        tracks.forEach(function(track, index){
          tracks[index] = 'spotify:track:' + track.id;
        });
      }

      return this.callAPI('/users/' + userId + '/playlists/'+ playlistId + '/tracks', 'POST', {
        uris: tracks.toString(),
        position: null
      }, null, this.getAuthHeaders(true));
    };

    this.editTracksPlaylistRemote = function(userId, playlistId, tracks){
      var tracksToBeAdded = [];
      tracks.forEach(function(t){
        tracksToBeAdded.push(t);
      }, tracksToBeAdded);
      if(tracksToBeAdded){
        tracksToBeAdded.forEach(function(track, index){
          tracksToBeAdded[index] = 'spotify:track:' + track.id;
        });
      }

      return this.callAPI('/users/' + userId + '/playlists/'+ playlistId + '/tracks', 'PUT', {
        uris: tracksToBeAdded.toString(),
        position: null
      }, null, this.getAuthHeaders(true));
    }

    //=======Search=======//
    this.search = function(query, type){
      var options = {};
      options.q = query;
      options.type = type;

      return this.callAPI('/search', 'GET', options);
    };

    //===== store =====//
    this.saveUserData = function(userData){
      if(userData){
        store.set('userData', userData);
      }
    };

    this.getSavedUserData = function(){
      if(store.get('userData')){
        return store.get('userData');
      }
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
      createPlaylistRemote: function(userId, data){
        return that.createPlaylistRemote(userId, data);
      },
      createPlaylistLocal: function(userId, data){
        that.createPlaylistLocal(userId, data);
        that.savePlaylistLocal(that._playlist);
      },
      getPlaylistLocal: function(){
        return that.getPlaylistLocal();
      },
      selectPlaylistEdit: function(playlist){
        that.savePlaylistLocal(playlist);
      },
      addTrackPlaylistLocal: function(track){
        that.addTrackPlaylistLocal(track);
        that.savePlaylistLocal(that._playlist);
      },
      addTracksPlaylistRemote: function(userId, playlistId, tracks, options){
        return that.addTracksPlaylistRemote(userId, playlistId, tracks, options);
      },
      editTracksPlaylistRemote: function(userId, playlistId, tracks, options){
        return that.editTracksPlaylistRemote(userId, playlistId, tracks);
      },
      search: function(query, type){
        return that.search(query, type);
      },
      getUserData: function(){
        return that.getUserData();
      },
      setClientId: function(clientId){
        return that.setClientId(clientId);
      },
      getClientId: function(){
        return that.getClientId();
      },
      setRedirectUri: function(redirectUri){
        return that.setRedirectUri(redirectUri);
      },
      getRedirectUri: function(){
        return that.getRedirectUri();
      },
      setScope: function(scope){
        return that.setScope(scope);
      },
      getScope: function(){
        return that.getScope();
      },
      setAuthToken: function(token){
        return that.setAuthToken(token);
      },
      getAuthToken: function(){
        return that.getAuthToken();
      },
      saveUserData: function(userData){
        that.saveUserData(userData);
      },
      getSavedUserData: function(){
        return that.getSavedUserData();
      }
    };
  }]);
