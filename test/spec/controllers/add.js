'use strict';

describe('Controller: AddCtrl', function () {

  // load the controller's module
  beforeEach(module('yopaNotesApp'));

  var AddCtrl, 
    scope, location, cookies;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (usersService, notesService, $controller, $rootScope, $location, $cookies) {
    scope = $rootScope.$new();
	location = $location;
	cookies = $cookies;
	scope.usersService = usersService;
	scope.notesService = notesService;
    AddCtrl = $controller('AddCtrl', {
	  usersService: scope.usersService, 
	  notesService: scope.notesService, 
	  $cookies: cookies, 
	  $location: location,
      $scope: scope,
      // place here mocked dependencies
    });
	scope.usersService.doLogin('Remy', 'Remy123');
	
  }));

  it('should be defined', function () {
    expect(AddCtrl).toBeDefined();
  });
  
  it('should have a title and a content', function () {
    expect(scope.note.title).toBe('');
    expect(scope.note.content).toBe('');
  });
  
  it('should add a note', function () {
	scope.note = { title: 'title', content: 'content'};
	scope.creator = {firstname: 'Remy', lastname: 'Royer-Adnot', picture: 'profile-default.jpg'};
	var len = scope.notesService.list.length;
	scope.addNote();
	expect(scope.notesService.list.length).toBe(len+1);
    expect(location.path()).toBe('/notes');
  });
  
  it('should add a note correctly', function () {
	scope.note = { title: 'title', content: 'content'};
	scope.creator = {
		id:0, 
		username:'Remy', 
		password:'Remy123', 
		firstname:'Remy', 
		lastname:'Royer-Adnot', 
		picture:'profile-default.jpg'
	};
	var len = scope.notesService.list.length;
	scope.addNote();
	expect(scope.notesService.list.length).toBe(len + 1);
  });
  
  it('should go back to notes overview', function () {
	scope.cancel();
    expect(location.path()).toBe('/notes');
  });
  
});
