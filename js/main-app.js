//var http = require('http');

// http.createServer(function(req, res){
	// res.writeHead(200, {'Content-Type':'text/plain'});
	// res.end('Hello World\n');
	
// }).listen(1337, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:1337/');

angular.module('tabtracker', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
 	var main = {
		name: 'main',
		url: '/#',
		templateUrl: ''
	};
	
	$stateProvider.state(main);
	$stateProvider.state('screen1', {
        url: 'screen1',
        templateUrl: '/temp/screen1.html',
        controller: 'NavigationCtrl',
	});
	
	$stateProvider.state('screen2', {
        url: 'screen2',
        templateUrl: '/temp/screen2.html',
        controller: 'Screen2Ctrl',
	});
	
	$stateProvider.state('screen3', {
        url: 'screen3',
        templateUrl: 'temp/screen3.html',
        controller: 'Screen3Ctrl',
	});	
	
	$stateProvider.state('screen4', {
        url: 'screen4',
        templateUrl: 'temp/screen4.html',
        controller: 'Screen4Ctrl',
	});	
	// $stateProvider.state(screen2);
	// $stateProvider.state(screen3);
	// $stateProvider.state(screen4);

    }])
	
	
    .run(['$state', function ($state) {
       $state.transitionTo('screen1'); 
    }])

    .controller('NavigationCtrl', function ($scope, $state) {

		$scope.setPage = function (page) {
			$state.transitionTo(page);
		};
	
	});
	
