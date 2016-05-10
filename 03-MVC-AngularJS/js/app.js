angular.module('myApp', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/movies');

  $stateProvider
    .state('movies',{
      url: '/movies',
      templateUrl: './partials/movies.html'
    })
    .state('movies.list',{
      url: '/list',
      templateUrl: './partials/movies-list.html',
      controller: 'MoviesListCtrl'
    })
    .state('movies.detail', {
      url: '/detail',
      templateUrl: './partials/movies-detail.html',
      controller: 'MoviesDetailCtrl'
    })
    .state('movies.new', {
      url: '/new',
      templateUrl: './partials/movies-form.html',
      controller: 'MoviesNewCtrl'
    })
    .state('movies.edit', {
      url: '/edit',
      templateUrl: './partials/movies-form.html',
      controller: 'MoviesEditCtrl'
    });
});
