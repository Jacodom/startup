angular.module('myApp')
  .controller('MoviesListCtrl', [
    '$scope',
    '$state',
    'MoviesService',
function ($scope, $state, MoviesService) {



  $scope.refreshMovieList = function(){
    $scope.movies = MoviesService.getAllMovies();
  }

  $scope.refreshMovieList();

  $scope.seeDetails = function(movie){
    MoviesService.setSelectedMovie(movie);
    $state.go('movies.detail');
  }

  $scope.goEdit = function(movie){
    MoviesService.setSelectedMovie(movie);
    $state.go('movies.edit');
  }

  $scope.goRemove = function(movie){
    MoviesService.deleteMovie(movie);
    $scope.refreshMovieList();
  }


}]);
