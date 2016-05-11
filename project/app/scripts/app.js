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

    $urlRouterProvider.otherwise('main');

    $stateProvider
      .state('main',{
        url: '/',
        templateUrl: '../views/main.html',
        controller: 'MainCtrl'
      })
      .state('about',{
        url: '/about',
        templateUrl: '../views/about.html',
        controller: 'AboutCtrl'
      });

  });
