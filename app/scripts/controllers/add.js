'use strict';

/**
 * @ngdoc function
 * @name yopaNotesApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the yopaNotesApp
 */
angular.module('yopaNotesApp')
  .controller('AddCtrl', function (usersService, notesService, $cookies, $location, $scope) {
	
	// check if the user is logged
	usersService.checkLogStatus();
	
	// variables instantiation
	$scope.note = {
		title: '', 
		content: '', 
	};
	$scope.creator = usersService.getCurrent();
	
	// add method
	$scope.addNote = function(){
		notesService.addNote($scope.creator, $scope.note);
		$location.path('/notes');
	};
	
	// cancel method
	$scope.cancel = function(){
		$location.path('/notes');
	};
	
  });
