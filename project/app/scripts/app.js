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
    'angular-storage',
    'perfect_scrollbar',
    'toastr'
  ])
  .config(function ($stateProvider, $urlRouterProvider, toastrConfig) {


      angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
      });

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
        controller: 'PlaylistsNewCtrl'
      })
      .state('playlists-edit', {
        url: '/playlists-edit',
        templateUrl: '../views/playlist-form.html',
        controller: 'PlaylistsEditCtrl'
      });
  });
