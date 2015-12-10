'use strict';

/**
 * @ngdoc function
 * @name yopaNotesApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the yopaNotesApp
 */
angular.module('yopaNotesApp')
  .controller('LoginCtrl', function (usersService, $cookies, $location, $scope) {
	  
	// make notes service and logout function available
	$scope.usersService = usersService;
	
	// check if the user is already logged
	if($cookies.getObject('loggedUser')){
		$location.path('/notes');
	}
	
  });
