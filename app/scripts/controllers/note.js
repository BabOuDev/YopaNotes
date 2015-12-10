'use strict';

/**
 * @ngdoc function
 * @name yopaNotesApp.controller:NoteCtrl
 * @description
 * # NoteCtrl
 * Controller of the yopaNotesApp
 */
angular.module('yopaNotesApp')
  .controller('NoteCtrl', function (usersService, notesService, $routeParams, $location, $scope) {
	
	// check if the user is logged
	usersService.checkLogStatus();
	
	// variables instantiation
	$scope.selectedNote = notesService.selectNoteByIndex($routeParams.index);
	$scope.isAdding = false;
	$scope.content = '';
	$scope.creator = usersService.getCurrent();
	
	// make notes service and add note function available
	$scope.doLogout = usersService.doLogout;
	
	// add additional subnotes button method
	$scope.openAddPanel = function(){
		$scope.isAdding = true;
	};
	
	// add subnotes button method
	$scope.addSubnote = function(){
		notesService.addSubnote($scope.selectedNote.id, {	
			createdBy: $scope.creator.firstname, 
			createdAt: new Date().getTime(), 
			content: $scope.content, 
			picture: $scope.creator.picture
		});
		$scope.content = '';
		$scope.isAdding = false;
	};
	
	// cancel button method
	$scope.cancel = function(){
		$scope.isAdding = false;
	};
	
	// back button method
	$scope.back = function(){
		$location.path('/notes');
	};
	
  });
