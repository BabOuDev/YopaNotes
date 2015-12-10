'use strict';

/**
 * @ngdoc overview
 * @name yopaNotesApp
 * @description
 * # yopaNotesApp
 *
 * Main module of the application.
 */
angular
  .module('yopaNotesApp', [
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngCookies',
	'angularMoment'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/notes', {
        templateUrl: 'views/notes.html',
        controller: 'NotesCtrl',
        controllerAs: 'notes'
      })
      .when('/note/:index', {
        templateUrl: 'views/note.html',
        controller: 'NoteCtrl',
        controllerAs: 'note'
      })
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl',
        controllerAs: 'add'
      })
      .otherwise({
        redirectTo: '/notes'
      });
	moment().calendar(null, {
		sameDay: '[Today]',
		nextDay: '[Tomorrow]',
		nextWeek: 'dddd',
		lastDay: '[Yesterday]',
		lastWeek: '[Last] dddd',
		lastWeek: '[Last] dddd'
	});
  });
