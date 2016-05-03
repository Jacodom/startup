angular.module('myApp', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/movies');

  $stateProvider
    .state('movies',{
      url: '/movies',
      templateUrl: '../partials/movies.html'
    })
    .state('movies.list',{
      url: '/list',
      templateUrl: '../partials/movies-list.html',
      controller: 'MoviesCtrl'
    })
    .state('movies.detail', {
      url: '/detail',
      templateUrl: '../partials/movies-detail.html',
      controller: 'MoviesCtrl'
    });
});
