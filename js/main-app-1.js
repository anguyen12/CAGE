//The controller that contains and controls all of our different states.

  var myApp = angular.module('tabtracker', ['ui.router']); //add ui.router to our dependencies
  
  //where the run block might go
  //what are run blocks: http://stackoverflow.com/questions/20663076/angularjs-app-run-documentation
  //"One place you see run blocks used is for authentication"
  
  //config block
  myApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	
	var main = {
		name: 'main',
		url: '/',
		templateUrl: 'main.html'
	},
	
	screen1 = {
		name: 'screen 1',
		url: '/s1',
		parent: main,
		templateUrl: 's1.html'
	},
	
	screen2 = {
		name: 'screen 2',
		url: '/s2',
		parent: screen1,
		templateUrl: 'temp/s2.html'
	},
	
	screen3 = {
		name: 'screen 3',
		url: '/s3',
		parent: screen2,
		templateUrl: 'temp/s3.html'
	},
	
	screen4 = {
		name: 'screen 4',
		url: '/s4',
		parent: screen3,
		templateUrl: 's4.html'
	};
	
	$stateProvider.state(main);
	$stateProvider.state(screen1);
	$stateProvider.state(screen2);
	$stateProvider.state(screen3);
	$stateProvider.state(screen4);
  })
  
  .run('$state', function ($state) {
	$state.transitionTo('main');
  })

  .controller('NavigationCtrl', function ($scope, $state) {
	$scope.content = ['screen1', 'screen2', 'screen3', 'screen4'];
	
	$scope.setPage = function (page){
		$state.transitionTo(page);
	};
})