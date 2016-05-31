# Playlister - Spotify Web Client
## Introduction
Playlister is the final project from the [Web-UI Globant's Bootcamp](https://github.com/globant-ui/html5bootcamp). It tries to accomplish the requirements proposed in the [project's guide](https://github.com/globant-ui-rosario/ui-bootcamp-projects/tree/master/spotity-web-application).

## Description
Playlister is a simple Spotify client, which consumes information provided by the [Spotify API](https://developer.spotify.com/) and lets the user view, create and edit his personal playlists. The application provides a simple experience with a minimal design and different functionality.

## Technology
This project uses a variated set of frontend technologies including the web standards: HTML5, CSS3 and Javascript. The stack used:

- [Angularjs](https://angularjs.org/)
- [Bootstrap](http://getbootstrap.com/)
- [Animate.css](https://daneden.github.io/animate.css/)
- [Yeoman](http://yeoman.io/)
	- [Angular Generator](https://github.com/yeoman/generator-angular) 
- [Angular ui.router](https://github.com/angular-ui/ui-router)
- [Auth0 Angular Storage](https://github.com/auth0/angular-storage)
- [Fontawesome](http://fontawesome.io/)
- [Normalize.css](https://necolas.github.io/normalize.css/)
- [Perfect Scrollbar](https://noraesae.github.io/perfect-scrollbar/)
- [Angular-toastr](https://github.com/Foxandxss/angular-toastr)
- [Grunt](http://gruntjs.com/)
- [Jasmine](http://jasmine.github.io/)
- [Karma](https://karma-runner.github.io/0.13/index.html)

### oAuth
In order to acces to the Spotify API, Playlister makes use of the services provided by [oAuth.io](https://oauth.io/) avoiding the complete implementation of the authentication procces proposed by Spotify.

## Installation
If you want to try out Playlister, you only have to follow this steps:

1. clone the repo

	```bash
	$ git clone https://github.com/Jacodom/startup
	```
2. go to the project folder and install al the required dependencies (node modules and frontend packages)
	
	```bash
	$ cd startup/project
	$ npm install && bower install
	```

3. run the application (you need to have grunt installed globally on your machine)
	
	```bash
	$ grunt serve
	```
4. a browser window will prompt and you can start using the app


## Testing

Running `grunt test` will run the unit tests with karma.
