angular.module('myApp')
  .controller('MoviesDetailCtrl', [
    '$scope',
    '$state',
    'MoviesService',
  function($scope, $state, MoviesService){

    $scope.selectedMovie = MoviesService.getSelectedMovie();


  }
]);
