angular.module('myApp')
  .controller('MoviesCtrl', [
    '$scope',
    '$state',
    'store',
function ($scope, $state, store) {

  if(store.get('movie')){
    $scope.movie = store.get('movie');
  }

  $scope.movies = [
    {
      title: "Pulp Fiction",
      year: 1990,
      details: {
        genre: 'Thriller',
        actors: ['John Travolta', 'Uma Thurman', 'Samuel Jackson'],
        imdb: 9.7,
        director: 'Quentin Tarantino'
      }
    },
    {
      title: "Reservoir Dogs",
      year: 1989,
      details: {
        genre: 'Action',
        actors: ['Steve Buscemi', 'Tim Roth', 'Harvey Keitel'],
        imdb: 7.7,
        director: 'Quentin Tarantino'
      }
    },
    {
      title: "Django Unchained",
      year: 2013,
      details: {
        genre: 'Thriller',
        actors: ['Lonardo DiCaprio', 'Samuel Jackson', 'Jamie Foxx'],
        imdb: 8.1,
        director: 'Quentin Tarantino'
      }
    },
    {
      title: "A clockwork orange",
      year: 1985,
      details: {
        genre: 'Drama',
        actors: ['Malcolm McDowell', 'Patrick Magee', 'Michael Bates'],
        imdb: 8.5,
        director: 'Stanley Kubrick'
      }
    }
  ];

  $scope.seeDetails = function(movie){
    store.set('movie', movie);
    $state.go('movies.detail');
  }
}]);
