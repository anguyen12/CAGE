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
		
		if (tournament.roundNumber == 3){ //round not side constrained
			var sortedTeams = unsortedTeams.sort(s); //sort teams by appropriate values
			
			for (var i = 0; i < sortedTeams.length; i+=2) { //pair teams
				console.log("round is NOT side constrained")
				sortedTeams[i].rank = i+1;
				sortedTeams[i+1].rank = i+2;
				sortedTeams[i].button = true;
				sortedTeams[i+1].button = true;
				sortedTeams[i].tempRecord = 0;
				sortedTeams[i+1].tempRecord = 0;
				var pair =  new Pairing(sortedTeams[i],sortedTeams[i+1]);
				this.newPairings.push(pair);
			}
		}		
		
		if (tournament.roundNumber == 4 || tournament.roundNumber == 2){ //round is side constrained
			console.log("round is side constrained")
			var sortedDTeams = unsortedNeedD.sort(s); //sort each stack of teams
			var sortedPTeams = unsortedNeedP.sort(s);
			
			for (var i = 0; i < sortedPTeams.length; i+=1) { //pair teams from P and D stack
				sortedPTeams[i].rank = i+1;
				sortedDTeams[i].rank = i+2;
				sortedPTeams[i].button = true;
				sortedDTeams[i].button = true;
				sortedPTeams[i].tempRecord = 0;
				sortedDTeams[i].tempRecord = 0;
				var pair =  new Pairing(sortedPTeams[i],sortedDTeams[i]);
				this.newPairings.push(pair);
			}
		}
		
		for (i = 0; i < this.newPairings.length; i++){
			this.list = this.newPairings[i].pTeam.impermissibles;
			this.ID = this.newPairings[i].dTeam.uniqueID;
			
			for (var x = 0; x < this.list.length; x++){
				if (this.list[x] == this.ID){
					this.newPairings[i].isImpermissible = true;
				}
			}
		}
		
		pairings = this.newPairings;
		localStorage.setItem('pairings', JSON.stringify(pairings));
		localStorage.setItem('tournament', JSON.stringify(tournament));
	}
}