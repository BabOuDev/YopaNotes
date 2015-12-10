'use strict';

/**
 * @ngdoc function
 * @name yopaNotesApp.services:usersService
 * @description
 * # usersService
 * Service of the yopaNotesApp
 */
angular.module('yopaNotesApp')
  .service('usersService', function ($cookies, $location, $http) {
	
	// users object instanciation
	var users = {};
	
	// users list
	users.list = [];
	
	// fill user list with dummyUsers.json file method
	users.get = function(callback){
		$http.get('/dummyUsers.json').success(function(data) {
			users.list = data.users;
			if(callback){
				callback();
			}
		});
	};
	
	// add user method
	users.add = function(user){
		users.list.push(
			{
				id: users.list.length, 
				username: user.username,
				password: user.password,
				firstname: user.firstname,
				lastname: user.lastname,
				picture: user.picture
			}
		);
	};
	
	// get the current logged user method
	users.getCurrent = function(){
		return ( $cookies.getObject( 'loggedUser' ) || 'not connected' );
	};
	
	// login method
	users.doLogin = function(username, password){
		// find the user in the list which correspond to specified username and password
		var loggedUser = users.list.filter(function(user){
			return (user.username.toLowerCase() === username.toLowerCase() && user.password === password);
		});
		// check if a user was correctly found
		if(loggedUser.length > 0){
			// log the user in by saving the user item in cookie.
			users.failAuth = false;
			$cookies.put( 'loggedUser', JSON.stringify(loggedUser[0]) );
			$location.path('/notes');
		}else{
			// cancel log
			users.failAuth = true;
			$location.path('/login');
		}
	};
	
	// logout method
	users.doLogout = function(){
		$cookies.remove( 'loggedUser' );
		$location.path('/login');
	};
	
	// check log status method
	users.checkLogStatus = function(){
		if(!$cookies.getObject('loggedUser')){
			$location.path('/login');
		}
	};
	
	// init the service by getting data from json
	users.get();
	
	// make the service accessible
	return users;
  });
