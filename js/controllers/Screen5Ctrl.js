'use strict';
//The controller that displays team names and matchup for round one.

var module = angular.module('tabtracker');
module.controller('Screen5Ctrl', Screen5Ctrl);

function Screen5Ctrl($scope, $state){
	
	$scope.pairTeams = function() {
		//var thisTournament = JSON.parse(localStorage.getItem('tournament'));
		this.name = tournament.name;
		this.round = tournament.roundNumber;
		//var loadedTeams = JSON.parse(localStorage.getItem('listAllTeams'));
		//var pairings = JSON.parse(localStorage.getItem('pairings'));
		
		var unsortedTeams = []; //unpair the teams
		var unsortedNeedP = [];
		var unsortedNeedD = [];
		
		for (var i = 0; i < pairings.length; i+=1){
			var thisPair = pairings[i];
			var team1 = thisPair.pTeam;
			var team2 = thisPair.dTeam;
			
			if (tournament.roundNumber == 3){
				unsortedTeams.push(team1);
				unsortedTeams.push(team2);
				}
			if (tournament.roundNumber == 4 || tournament.roundNumber == 2){
				unsortedNeedD.push(team1);
				unsortedNeedP.push(team2);
			}
		}
		
		// sort and re-pair the teams
		this.newPairings = [];
		var swapList = [];
		
		if (tournament.roundNumber == 3){ //round not side constrained
			var sortedTeams = unsortedTeams.sort(s); //sort teams by appropriate values
			
			for (var i = 0; i < sortedTeams.length; i+=2) { //pair teams
				sortedTeams[i].rank = i+1;
				sortedTeams[i+1].rank = i+2;
				sortedTeams[i].button = true;
				sortedTeams[i+1].button = true;
				sortedTeams[i].tempRecord = 0;
				sortedTeams[i+1].tempRecord = 0;
				updateCS(sortedTeams[i], sortedTeams);
				updateCS(sortedTeams[i+1], sortedTeams);
				var pair =  new Pairing(sortedTeams[i],sortedTeams[i+1]);
				this.newPairings.push(pair);
			}
			
			checkImpermissibles(this.newPairings); //check for impermissibles
		
		}		
		
		if (tournament.roundNumber == 4 || tournament.roundNumber == 2){ //round is side constrained
			var sortedDTeams = unsortedNeedD.sort(s); //sort each stack of teams
			var sortedPTeams = unsortedNeedP.sort(s);
			
			for (var i = 0; i < sortedPTeams.length; i+=1) { //pair teams from P and D stack
				sortedPTeams[i].rank = i;
				sortedDTeams[i].rank = i;
				sortedPTeams[i].button = true;
				sortedDTeams[i].button = true;
				sortedPTeams[i].tempRecord = 0;
				sortedDTeams[i].tempRecord = 0;
				updateCS(sortedDTeams[i], sortedDTeams.concat(sortedPTeams));
				updateCS(sortedPTeams[i], sortedDTeams.concat(sortedPTeams));
				var pair =  new Pairing(sortedPTeams[i],sortedDTeams[i]);
				this.newPairings.push(pair);
			}
			
			checkImpermissibles(this.newPairings); //check for impermissibles
			
			for (var x = 0; x < this.newPairings.length; x+=1){
				console.log(this.newPairings[x], x, this.newPairings, swapList);
				if (this.newPairings[x].isImpermissible){
					resolveImpermissiblesSC(this.newPairings[x], x, this.newPairings, swapList);
				}
			}
		}
		
		pairings = this.newPairings;
		localStorage.setItem('pairings', JSON.stringify(pairings));
		localStorage.setItem('tournament', JSON.stringify(tournament));
	}
}