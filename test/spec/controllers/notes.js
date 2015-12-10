'use strict';

describe('Controller: NotesCtrl', function () {

  // load the controller's module
  beforeEach(module('yopaNotesApp'));

  var NotesCtrl, 
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
	NotesCtrl = $controller('NotesCtrl', {
	  notesService: scope.notesService,
	  $cookies: cookies,
	  $location: location,
      $scope: scope,
      // place here mocked dependencies
    });
  }));

  it('should be defined', function () {
    expect(NotesCtrl).toBeDefined();
  });
  
  it('should have access to notesService', function () {
    expect(scope.notesService).toBeDefined();
  });
  
  it('should have access to notes list with 1 items and 1 sub items', function () {
	expect(scope.notesService.list.length).toBe(1);
	expect(scope.notesService.list[0].subnotes.length).toBe(1);
  });  
  
  it('should redirect on note/index page when click on a table row ', function () {
    scope.readNote(0);
    expect(location.path()).toBe('/note/0');
  });
  
  it('should redirect on add page when add note button is pushed', function () {
	scope.addNote();
    expect(location.path()).toBe('/add');
  });
  
});
