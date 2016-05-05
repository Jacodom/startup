angular.module('myApp')
.factory('MoviesService', [
  'store',
function(store){

  var that = this;

  this._movies = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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


  //selected movie
  this.storeClickedMovie = function(movie){
    store.set('selectedMovie', movie);
  }

  this.getClickedMovie = function(){
    var storedMovie = store.get('selectedMovie');
    return storedMovie;
  }

  //list of movies
  this.setStoredMovies = function(){
    store.set('movies', this._movies);
  }

  this.getStoredMovies = function(){
    this._movies = store.get('movies');
  }

  this.getMovies = function(){
    return this._movies;
  }

  this.addMovie = function(movie){
    var lastMovie;
    this._movies.forEach(function(m, i){
      lastMovie = m;
    }, lastMovie);

    movie.id = lastMovie.id++;

    this._movies.push(movie);
  }

  this.deleteMovie = function(movie){
    if(this._movies){
      this._movies.forEach(function(m, i){
        if(m.id === movie.id){
          this._movies.splice(i,1);
        }
      }, this);
    }
  }

  this.editMovie = function(movie){
    if(this._movies){
      this._movies.forEach(function(m, i){
        if(m.id === movie.id){
          m.title = movie.title;
          m.year = movie.year;
          m.details.genre = movie.details.genre;
          m.details.actors = movie.details.actors;
          m.details.imdb = movie.details.imdb;
          m.details.director = movie.details.director;
        }
      });
    }
  }

  //init
  this.setStoredMovies();

  return {
    setSelectedMovie : function(movie) {
      //store the movie
      that.storeClickedMovie(movie);
    },
    getSelectedMovie: function(){
      return that.getClickedMovie();
    },
    getAllMovies: function(){
      //return all the stored movies
      that.getStoredMovies();
      return that.getMovies();
    },
    addMovie: function(movie){
      //add the movie to the array
      that.addMovie(movie);
      //save the array in the localstorage of the browser
      that.setStoredMovies();
    },
    deleteMovie: function(movie){
      //delete the movie from the array
      that.deleteMovie(movie);
      //save the array in the localstorage of the browser
      that.setStoredMovies();
    },
    editMovie: function(movie){
      //edit the movie in the array
      that.editMovie(movie);
      //save the array
      that.setStoredMovies();
    }
  }

}]);
