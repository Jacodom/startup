'use strict';

/**
 * @ngdoc overview
 * @name spotifyClientApp
 * @description
 * # spotifyClientApp
 *
 * Main module of the application.
 */
angular
  .module('spotifyClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'angular-storage'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '../views/login.html',
        controller: 'LoginCtrl'
      })
      .state('playlists', {
        url: '/playlists',
        templateUrl: '../views/playlists.html',
        controller: 'PlaylistsCtrl'
      })
      .state('playlist-details', {
        url: '/playlist-details',
        templateUrl: '../views/playlist-details.html',
        controller: 'PlaylistsCtrl'
      })
      .state('playlists-new', {
        url: '/playlists-new',
        templateUrl: '../views/playlist-form.html',
        controller: 'PlaylistsCtrl'
      })
      .state('playlists-edit', {
        url: '/playlists-edit',
        templateUrl: '../views/playlist-form.html',
        controller: 'PlaylistEditCtrl'
      });
  });
