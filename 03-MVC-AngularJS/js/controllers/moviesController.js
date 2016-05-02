angular.module('myApp')
  .controller('MoviesCtrl', [
    '$scope',
function ($scope) {

  $scope.yourName = "pepe";

  $scope.movies = [
    {
      title: "Pulp Fiction",
      year: 1990
    },
    {
      title: "Reservoir Dogs",
      year: 1989
    },
    {
      title: "Django Unchained",
      year: 2013
    }
  ];



}]);
