'use strict';

/**
 * @ngdoc function
 * @name yopaNotesApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the yopaNotesApp
 */
angular.module('yopaNotesApp')
  .controller('NotesCtrl', function (usersService, notesService, $location, $scope) {
	
	// check if the user is logged
	usersService.checkLogStatus();
	
	// make notes service and logout function available
	$scope.notesService = notesService;
	$scope.doLogout = usersService.doLogout;
	
	// add a note method
	$scope.addNote = function(){
		$location.path('/add');
	};
	
	// read a note method
	$scope.readNote = function(index){
		$location.path('/note/' + index);
	};
	
  });
