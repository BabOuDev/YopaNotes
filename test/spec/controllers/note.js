'use strict';

describe('Controller: NoteCtrl', function () {

  // load the controller's module
  beforeEach(module('yopaNotesApp'));

  var NoteCtrl, 
    scope, cookies, location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (notesService, $controller, $cookies, $location, $rootScope) {
    scope = $rootScope.$new();
    cookies = $cookies;
    location = $location;
	scope.notesService = notesService;
    scope.notesService.list = [{
		id:0,
		createdBy:'Henry Jones',
		updatedAt:1420705920000,
		title:'This is a note',
		subnotes:[
			{
				createdBy:'Henry',
				createdAt:1420704520000,		
				content:'Lorem ipsum dolor amet, consectetur adipiscing elit. Donec augue lacus, efficitur quis pellentesque id, accumsan et tortor. Etiam a fermentum tortor. Morbi eget lectus et felis porta elementum?',
				picture:'profile-1.jpg'
			}
		]
	}];
	location.path('/notes/0');
  
	NoteCtrl = $controller('NoteCtrl', {
	  notesService: scope.notesService,
	  $cookies: cookies,
	  $location: location,
      $scope: scope,
      // place here mocked dependencies
    });
  }));

  it('should be defined', function () {
    expect(NoteCtrl).toBeDefined();
  });
  
  it('should have access to notesService', function () {
    expect(scope.notesService).toBeDefined();
  });
  
  it('should be on the page of the corresponding item', function () {
    expect(scope.notesService.list[0].id).toBe(0);
  });
  
  it('should have access to notes list with 1 items and 1 sub items', function () {
	expect(scope.notesService.list.length).toBe(1);
	expect(scope.notesService.list[0].subnotes.length).toBe(1);
  });  
  
  it('should switch between add and normal views', function () {
	expect(scope.isAdding).toBe(false);
    scope.openAddPanel();
    expect(scope.isAdding).toBe(true);
    scope.cancel();
	expect(scope.isAdding).toBe(false);
  });
  
  it('should redirect on notes page when back button is pushed', function () {
    scope.back();
    expect(location.path()).toBe('/notes');
  });
  
  it('should add a subnote correctly', function () {
	scope.content = 'This is a subnote add test';
	scope.creator = {
		id:0, 
		username:'Remy', 
		password:'Remy123', 
		firstname:'Remy', 
		lastname:'Royer-Adnot', 
		picture:'profile-default.jpg'
	};
	var len = scope.notesService.list[0].subnotes.length;
	scope.selectedNote = scope.notesService.list[0];
	scope.addSubnote();
	expect(scope.notesService.list[0].subnotes.length).toBe(len + 1);
  });
});
