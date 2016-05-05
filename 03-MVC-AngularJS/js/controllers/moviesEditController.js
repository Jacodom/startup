angular.module('myApp')
.controller('MoviesEditCtrl', ['$scope', '$state', 'MoviesService', function($scope, $state, MoviesService){

  $scope.pageTitle = "Edit";

  $scope.movie = MoviesService.getSelectedMovie();

  $scope.saveData = function(){
    MoviesService.editMovie($scope.movie);
    $state.go('movies.list');
  }
}]);
