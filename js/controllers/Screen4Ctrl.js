'use strict';
//The controller that displays team names and matchup for round one.

var module = angular.module('tabtracker');
module.controller('Screen4Ctrl', Screen4Ctrl);

function Screen4Ctrl($scope, $state){
	
	$scope.showTeams = function() {
		var thisTournament = JSON.parse(localStorage.getItem('tournament'));
		this.name = thisTournament.name;
		this.round = thisTournament.roundNumber;
		this.listAllTeams = JSON.parse(localStorage.getItem('listAllTeams'));
	}
	
	$scope.addPoints = function(team){
		if (team.temp1 > 0) {team.record+=1};
		if (team.temp2 > 0) {team.record+=1};
		if (team.temp1 == 0) {team.record+=0.5};
		if (team.temp2 == 0) {team.record+=0.5};
		team.pointDiff = team.temp1 + team.temp2;
		team.temp1 = 0;
		team.temp2 = 0;
		team.button = false;
	};
	
	$scope.saveRound = function() {
		localStorage.setItem('listAllTeams2', JSON.stringify(this.listAllTeams));
		var thisTournament = JSON.parse(localStorage.getItem('tournament'));
		thisTournament.roundNumber = 2;
		localStorage.setItem('tournament', JSON.stringify(thisTournament));
	}
	
}