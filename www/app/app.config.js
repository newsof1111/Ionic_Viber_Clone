
(function () {
    "use strict";

angular.module('ViberClone')
.run(runFunction)
.config(Configuration);
Configuration.$inject = ['$stateProvider', '$urlRouterProvider'];
runFunction.$inject = ['$ionicPlatform'];

function runFunction ($ionicPlatform)
 {
    $ionicPlatform.ready(function() 
      {
      
        if (window.cordova && window.cordova.plugins.Keyboard)
         {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(false);

        }
        if (window.StatusBar)
         {
          StatusBar.styleDefault();
        }
      });
}



 function Configuration($stateProvider, $urlRouterProvider)
  {
 $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/menu/androidmenu.html',
    controller: 'MenuCtrl'
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'app/home/home.html',
		controller:'HomeCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/app/home');
}
 })();