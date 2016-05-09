describe("Test for movies service", function(){
  var MoviesService, store;



 beforeEach(module("myApp"));

 beforeEach(inject(function (_MoviesService_, _store_) {
   MoviesService = _MoviesService_;
   store = _store_;
 }));

 describe('Initialization of the service', function(){
   it('should initiate the service', function(){
     expect(MoviesService).not.toBe(undefined);
   });

   it('should contain an array that is not empty', function(){
     expect(MoviesService.getAllMovies()).not.toBe(undefined);
   });

   it('should contain an array that has 4 movies', function(){
     expect(MoviesService.getAllMovies().length).toBe(4);
   });

 });

 describe('Public Methods', function(){
   it('should store a movie when selected to see its details', function(){
     var movieMock = {
       id: 1,
       title: "Movie Mock",
       year: 1990,
       details: {
         genre: 'Genre mock',
         actors: ['Actor1', 'Actor2', 'Actor3'],
         imdb: 6,
         director: 'Director Mock'
       }
     }

     MoviesService.setSelectedMovie(movieMock);

     expect(store.get('selectedMovie')).toEqual(movieMock);
   });

   it('should get a movie that is stored becouse it was clicked previously to see its details', function(){
     var movieMock = {
       id: 1,
       title: "Movie Mock",
       year: 1990,
       details: {
         genre: 'Genre mock',
         actors: ['Actor1', 'Actor2', 'Actor3'],
         imdb: 6,
         director: 'Director Mock'
       }
     }

     MoviesService.setSelectedMovie(movieMock);

     expect(MoviesService.getSelectedMovie()).toEqual(movieMock);
   });

   it('should get all the movies', function(){
     expect(MoviesService.getAllMovies()).not.toBe(undefined);
   });

   describe('CRUD testing', function(){

     it('should add a movie (persisted in localstorage)', function(){
       var movieMock = {
         title: "Movie Mock",
         year: 1990,
         details: {
           genre: 'Genre mock',
           actors: ['Actor1', 'Actor2', 'Actor3'],
           imdb: 6,
           director: 'Director Mock'
         }
       }

       MoviesService.addMovie(movieMock);
       expect(MoviesService.getAllMovies()).toContain(movieMock);
     });

     it('should delete a movie (change persisted in localstorage)', function(){
       var movieMock = {
         id: 1,
         title: "Movie Mock",
         year: 1990,
         details: {
           genre: 'Genre mock',
           actors: ['Actor1', 'Actor2', 'Actor3'],
           imdb: 6,
           director: 'Director Mock'
         }
       }

       MoviesService.addMovie(movieMock);
       MoviesService.deleteMovie(movieMock);

       expect(MoviesService.getAllMovies()).not.toContain(movieMock);

     });

     it('should edit a movie (changes persisted in localstorage)', function(){
       var movieMock = {
         title: "Movie Mock",
         year: 1990,
         details: {
           genre: 'Genre mock',
           actors: ['Actor1', 'Actor2', 'Actor3'],
           imdb: 6,
           director: 'Director Mock'
         }
       }

       MoviesService.addMovie(movieMock);
       console.log(MoviesService.getAllMovies());
       movieMock.id = 5;
       movieMock.title = "Movie Edited";



       MoviesService.editMovie(movieMock);

       console.log(MoviesService.findMovie(movieMock));

       expect(MoviesService.findMovie(movieMock).title).toBe('Movie Edited');

     });

   });


 });

});
