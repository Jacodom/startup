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
      .state('login',{
        url: '/login',
        templateUrl: '../views/login.html',
        controller: 'LoginCtrl'
      })
      .state('callback',{
        url: '/callback',
        templateUrl: '../views/callback.html',
        controller: 'CallbackCtrl'
      });

  });
