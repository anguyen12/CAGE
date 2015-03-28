'use strict';
//The controller that sets up the tournament

var module = angular.module('tabtracker');
module.controller('Screen3Ctrl', Screen3Ctrl);

function Screen3Ctrl($scope, $state){
	
	$scope.configTeams = function() {
		console.log("executed correctly");
		var thisTournament = JSON.parse(localStorage.getItem('tournament'));
		this.name = thisTournament.name;
		this.listAllTeams = JSON.parse(localStorage.getItem('listAllTeams'));
		
	}
}
