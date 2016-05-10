describe('MoviesCtrl testing', function(){
  var MoviesService, movieCtrl, scope, store;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_MoviesService_, _store_, $rootScope, $controller){
    MoviesService = _MoviesService_;
    store = _store_;
    scope = $rootScope.$new();
    movieCtrl = $controller(MoviesListCtrl, {$scope: scope})
  }));

  it('should refresh the movie list', function(){
    
  });

});
