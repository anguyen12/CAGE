'use strict';
//The controller that displays team results after round 4

var module = angular.module('tabtracker');
module.controller('Screen6Ctrl', Screen6Ctrl);

function Screen6Ctrl($scope, $state){
	
	$scope.undoRound = function(){
		var loadPair = "pairings" + (tournament.roundNumber - 1);
		var loadTour = "tournament" + (tournament.roundNumber - 1);
		tournament = JSON.parse(localStorage.getItem(loadTour));
		pairings = JSON.parse(localStorage.getItem(loadPair));
		window.swapList = [];
	}
	
	$scope.getWinners = function() {
		//var thisTournament = JSON.parse(localStorage.getItem('tournament'));
		this.name = tournament.name;
		this.round = tournament.roundNumber;
		//var loadedTeams = JSON.parse(localStorage.getItem('listAllTeams'));
		//var pairings = JSON.parse(localStorage.getItem('pairings'));
		
		this.finalTeams = [];
		var unsortedTeams = []; //unpair the teams
		
		for (var i = 0; i < pairings.length; i+=1){
			var thisPair = pairings[i];
			var team1 = thisPair.pTeam;
			var team2 = thisPair.dTeam;
			unsortedTeams.push(team1);
			unsortedTeams.push(team2);
		}
		
		var sortedTeams = unsortedTeams.sort(s); //sort teams by appropriate values
			
		for (var i = 0; i < sortedTeams.length; i+=2) {
			sortedTeams[i].rank = i+1;
			sortedTeams[i+1].rank = i+2;
			updateCS(sortedTeams[i], sortedTeams); // will cause bugs, needs to be done before sorting
			updateCS(sortedTeams[i+1], sortedTeams);
		}
		
		this.finalTeams = sortedTeams;
	}
}