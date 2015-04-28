'use strict';
//The controller that displays team names and matchup for round one.

var module = angular.module('tabtracker');
module.controller('Screen4Ctrl', Screen4Ctrl);

function Screen4Ctrl($scope, $state){
	
	$scope.showTeams = function() {
		this.name = tournament.name;
		this.round = tournament.roundNumber;
		this.flip1 = "";
		this.pairings = window.pairings;
	}
	
	// $scope.addPoints = function(team){
		// team.button = false;
	// };
	
	// $scope.editPoints = function(team){
		// team.button = true;
	// };
	
	$scope.values = [0, 0.5, 1, 1.5, 2];
	
	$scope.coinflip = ["Heads", "Tails"];
	
	$scope.saveRound = function() {
		if (tournament.roundNumber == 1){tournament.rnd1Flip = this.flip1;}
		for (var i = 0; i < this.pairings.length; i++) {
			this.pairings[i].pTeam.record = pairings[i].pTeam.tempRecord + pairings[i].pTeam.record;
			this.pairings[i].pTeam.pointDiff = pairings[i].pTeam.temp1 + pairings[i].pTeam.temp2 + pairings[i].pTeam.pointDiff;
			
			this.pairings[i].dTeam.record = pairings[i].dTeam.tempRecord + pairings[i].dTeam.record;
			this.pairings[i].dTeam.pointDiff = pairings[i].dTeam.temp1 + pairings[i].dTeam.temp2 + pairings[i].dTeam.pointDiff;

			this.pairings[i].pTeam.impermissibles.push(pairings[i].dTeam.uniqueID);
			this.pairings[i].dTeam.impermissibles.push(pairings[i].pTeam.uniqueID);
			
			this.pairings[i].pTeam.opponents.push([pairings[i].dTeam.temp1, pairings[i].dTeam.temp2, pairings[i].dTeam.uniqueID]);
			this.pairings[i].dTeam.opponents.push([pairings[i].pTeam.temp1, pairings[i].pTeam.temp2, pairings[i].pTeam.uniqueID]);
		}
		tournament.roundNumber += 1;
	}
	
}