'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('yopaNotesApp'));

  var LoginCtrl, 
    scope, cookies, location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (usersService, $controller, $cookies, $location, $rootScope) {
    scope = $rootScope.$new();
    cookies = $cookies;
    location = $location;
    scope.usersService = usersService;
	LoginCtrl = $controller('LoginCtrl', {
	  usersService: scope.usersService	,
	  $cookies: cookies,
	  $location: location,
      $scope: scope,
      // place here mocked dependencies
    });
    scope.usersService.list = [{
		id:0, 
		username:'Remy', 
		password:'Remy123', 
		firstname:'Remy', 
		lastname:'Royer-Adnot', 
		picture:'profile-default.jpg'
	}];
  }));

  it('should be defined', function () {
    expect(LoginCtrl).toBeDefined();
  });
  
  it('should have access to usersService', function () {
    expect(scope.usersService).toBeDefined();
  });
  
  it('should have access to users list with 1 items', function () {
	expect(scope.usersService.list.length).toBe(1);
  });
  
  it('should log in with a good couple of username and password', function () {
	scope.usersService.doLogin('Remy', 'Remy123');
    expect(scope.usersService.getCurrent().firstname).toBe('Remy');
  });
  
  it('should redirect on notes page if already logged in', function () {
    expect(location.path()).toBe('/notes');
  });
  
  it('should redirect on login page at logout', function () {
	scope.usersService.doLogout();
    expect(location.path()).toBe('/login');
    expect(scope.usersService.getCurrent().firstname).toBeUndefined();
  });
});
