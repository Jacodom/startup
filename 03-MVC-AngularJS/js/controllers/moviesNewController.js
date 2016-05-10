angular.module('myApp')
.controller('MoviesNewCtrl', ['$scope', '$state', 'MoviesService', function($scope, $state, MoviesService){

  $scope.pageTitle = "New";

  $scope.movie = {};

  $scope.saveData = function(){
    MoviesService.addMovie($scope.movie);
    $state.go('movies.list');
  }
}]);
