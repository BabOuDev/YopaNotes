'use strict';

/**
 * @ngdoc function
 * @name yopaNotesApp.services:notesService
 * @description
 * # notesService
 * Service of the yopaNotesApp
 */
angular.module('yopaNotesApp')
  .service('notesService', function ($http) {
	
	// notes object instanciation
	var notes = {};
	
	// notes list
	notes.list = [];
	
	// fill notes list with dummyNotes.json file method
	notes.get = function(callback){
		$http.get('/dummyNotes.json').success(function(data) {
			notes.list = data.notes;
			if(callback){
				callback();
			}
		});
	};
	
	// add notes method
	notes.addNote = function(user, note){
		var date = new Date().getTime();
		notes.list.push(
			{
				id: notes.list.length, 
				createdBy: user.firstname + ' ' + user.lastname,
				updatedAt: date,
				title: note.title,
				subnotes: [
					{
						createdBy: user.firstname,
						createdAt: date,
						content: note.content,
						picture: user.picture
					}
				],
			}
		);
	};
	
	// add sub notes method
	notes.addSubnote = function(id, sub){
		notes.list[id].subnotes.push(
			{
				id: notes.list[id].subnotes.length, 
				createdBy: sub.createdBy,
				createdAt: sub.createdAt,
				content: sub.content,
				picture: sub.picture,
			}
		);
	};
	
	// select note by index method
	notes.selectNoteByIndex = function(index){
		// return the note in the list which correspond to specified id
		return notes.list[index];
	};
	
	// init the service by getting data from json
	notes.get();
	
	// make the service accessible
	return notes;
  });
