(function () {
    'use strict';

angular.module('contactsService', [])

.factory('contacts',contacts);
    contacts.$inject = [];

 function contacts() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
 var contacts = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: '123456789',
    face: '',
	time:''
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: '123456789',
    face: 'img/max.png',
	time:''
  },{
    id: 2,
    name: 'Mike Harrington',
    lastText: '123456789',
    face: '',
	time:''
  },{
    id: 3,
    name: 'Adam Bradleyson',
    lastText: '123456789',
    face: '',
	time:''
  },{
    id: 4,
    name: 'Ben Sparrow',
    lastText: '123456789',
    face: 'img/ben.png',
	time:''
  }, {
    id: 5,
    name: 'Perry Governor',
    lastText: '123456789',
    face: 'img/perry.png',
	time:''
  },  {
    id: 6,
    name: 'Mike Harrington',
    lastText: '123456789',
    face: 'img/mike.png',
	time:''
  }, {
    id: 7,
    name: 'Perry Governor',
    lastText: '123456789',
    face: '',
	time:''
  },{
    id: 8,
    name: 'Adam Bradleyson',
    lastText: '123456789',
    face: 'img/adam.jpg',
	time:''
  }];

  return {
    all: function() 
    {
      return contacts;
    }
  
  };
}
})();
