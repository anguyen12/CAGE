'use strict';
//The controller that displays team names and matchup for round one.

var module = angular.module('tabtracker');
module.controller('Screen5Ctrl', Screen5Ctrl);

function Screen5Ctrl($scope, $state){
	
		
	$scope.swapTeams = function(aPairing, thesePairings) {
		var swapSide = aPairing.outTeam.status;
		var swapDestination = aPairing.outTeam.rank;
		var isSideConstrained = true;
		
		if (tournament.roundNumber == 3){isSideConstrained = false;}; //explain this
		
		if (!isSideConstrained){swapDestination=Math.floor(swapDestination/2);}
		
		console.log(swapDestination);
		console.log(swapSide);
		if (swapSide == "p"){
			thesePairings[swapDestination].pTeam = aPairing.inTeam;
			if (!isSideConstrained){
				aPairing.dTeam = aPairing.outTeam;
				console.log("executed correct logic with bad result")
			} else {
				aPairing.pTeam = aPairing.outTeam;
				console.log("executed incorrect logic")
			}

		} else {
			thesePairings[swapDestination].dTeam = aPairing.inTeam;
			if (!isSideConstrained){aPairing.pTeam = aPairing.outTeam;} else {
				aPairing.dTeam = aPairing.outTeam;
			}
		}
		aPairing.isImpermissible = false;
		thesePairings[swapDestination].isImpermissible = false;
		swapList.push([aPairing.outTeam.uniqueID, aPairing.inTeam.uniqueID])
		if (tournament.roundNumber == 3){
			checkImpermissiblesNSC(pairings, swapList);
			} else {checkImpermissiblesSC(pairings, swapList);}
		this.newPairings = pairings;
	}
	
	$scope.swapList = swapList;
	
	$scope.FlipSides = function(){
		for (var i = 0; i < pairings.length; i+=1){
			var wasP = pairings[i].pTeam;
			var wasD = pairings[i].dTeam;
			pairings[i].pTeam = wasD;
			pairings[i].dTeam = wasP;
			pairings[i].pTeam.status = "p";
			pairings[i].dTeam.status = "d";
		}
		console.log("flipped");
		if (tournament.roundNumber == 3){
			checkImpermissiblesNSC(pairings, swapList);
			} else {checkImpermissiblesSC(pairings, swapList);}
		this.newPairings = pairings;
	}
	
	$scope.coinflip = ["Heads", "Tails"];
	
	$scope.saveSwaps = function(){
		swapList = [];
		localStorage.setItem('pairings', JSON.stringify(pairings));
		localStorage.setItem('tournament', JSON.stringify(tournament));
		pairings = this.newPairings;
	}
	
	$scope.pairTeams = function() {
		//var thisTournament = JSON.parse(localStorage.getItem('tournament'));
		this.name = tournament.name;
		this.round = tournament.roundNumber;
		//var loadedTeams = JSON.parse(localStorage.getItem('listAllTeams'));
		//var pairings = JSON.parse(localStorage.getItem('pairings'));
		
		var unsortedTeams = []; //unpair the teams
		var leftColumn = []; 
		var rightColumn = [];
		
		var leftColSide = ""; //garbage
		var rightColSide = "";
		
		for (var i = 0; i < pairings.length; i+=1){
			var thisPair = pairings[i];
			var wasPTeam = thisPair.pTeam;
			var wasDTeam = thisPair.dTeam;
			
			if (tournament.roundNumber == 3){
				unsortedTeams.push(wasPTeam);
				unsortedTeams.push(wasDTeam);
			}
			if (tournament.roundNumber == 4 || tournament.roundNumber == 2){
				rightColumn.push(wasPTeam);
				leftColumn.push(wasDTeam);
			}
		}
		
		// sort and re-pair the teams
		this.newPairings = [];
		
		
		if (tournament.roundNumber == 3){ //round not side constrained
			var sortedTeams = unsortedTeams.sort(s); //sort teams by appropriate values
			
			for (var i = 0; i < sortedTeams.length; i+=2) { //pair teams
				sortedTeams[i].rank = i;
				sortedTeams[i+1].rank = i+1;
				sortedTeams[i].button = true;
				sortedTeams[i+1].button = true;
				sortedTeams[i].tempRecord = 0;
				sortedTeams[i+1].tempRecord = 0;
				sortedTeams[i].status = "p";
				sortedTeams[i+1].status = "d";
				console.log(sortedTeams[i], sortedTeams);
				updateCS(sortedTeams[i], sortedTeams);
				console.log(sortedTeams[i+1], sortedTeams);
				updateCS(sortedTeams[i+1], sortedTeams);
				var pair =  new Pairing(sortedTeams[i],sortedTeams[i+1]);
				this.newPairings.push(pair);
			}
			
			checkImpermissiblesNSC(this.newPairings); //check for impermissibles
		
		}		
		
		if (tournament.roundNumber == 4 || tournament.roundNumber == 2){ //round is side constrained
			var sortedDTeams = rightColumn.sort(s1); //sort each stack of teams
			var sortedPTeams = leftColumn.sort(s1);
			
			for (var i = 0; i < sortedPTeams.length; i+=1) { //pair teams from P and D stack
				sortedPTeams[i].rank = i;
				sortedDTeams[i].rank = i;
				sortedPTeams[i].button = true;
				sortedDTeams[i].button = true;
				sortedPTeams[i].tempRecord = 0;
				sortedDTeams[i].tempRecord = 0;
				sortedPTeams[i].status = "p";
				sortedDTeams[i].status = "d";
				updateCS(sortedDTeams[i], sortedDTeams.concat(sortedPTeams));
				updateCS(sortedPTeams[i], sortedDTeams.concat(sortedPTeams));
				var pair =  new Pairing(sortedPTeams[i],sortedDTeams[i]);
				this.newPairings.push(pair);
			}
			checkImpermissiblesSC(this.newPairings, swapList); //check for impermissibles
		}
	}
}