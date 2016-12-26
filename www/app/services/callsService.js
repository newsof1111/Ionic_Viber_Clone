(function () {
    'use strict';

angular.module('callsService', [])

.factory('calls',calls);
    calls.$inject = [];

 function calls() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
 var calls = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'Outgoing Call',
    face: '',
	time:'Yesterday'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png',
	time:'25/12/2015'
  },{
    id: 2,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: '',
	time:'Yesterday'
  },{
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: '',
	time:'25/12/2015'
  },{
    id: 4,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png',
	time:'Yesterday'
  }, {
    id: 5,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png',
	time:'25/12/2015'
  },  {
    id: 6,
    name: 'Mike Harrington',
    lastText: 'Outgoing Call',
    face: 'img/mike.png',
	time:'Yesterday'
  }, {
    id: 7,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: '',
	time:'25/12/2015'
  },{
    id: 8,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
	time:'25/12/2015'
  }];

  return {
    all: function() 
    {
      return calls;
    }
  
  };
}
})();
