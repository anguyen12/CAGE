'use strict';
//The controller that displays team names and matchup for round one.

var module = angular.module('tabtracker');
module.controller('Screen5Ctrl', Screen5Ctrl);

function Screen5Ctrl($scope, $state){
	
		
	$scope.swapTeams = function(aPairing, thesePairings) {
		$('#startR_button').removeAttr('disabled');
		var swapSide = aPairing.outTeam.status;
		var swapDestination = aPairing.outTeam.rank;
		
		if (!tournament.isSideConstrained){swapDestination=Math.floor(swapDestination/2);}
		
		console.log(swapDestination);
		console.log(swapSide);
		if (swapSide == "p"){
			thesePairings[swapDestination].pTeam = aPairing.inTeam;
			console.log("sent", aPairing.inTeam," to ", swapDestination, " on the ", swapSide);
			if (!tournament.isSideConstrained){
				console.log("executed NSC swap logic");
				console.log("sent", aPairing.outTeam," to the place of ", aPairing.dTeam.uniqueID, " on the ", aPairing.dTeam.status);
				aPairing.dTeam = aPairing.outTeam;

			} else {
				console.log("executed SC swap logic");
				console.log("sent", aPairing.outTeam," to the place of ", aPairing.pTeam.uniqueID, " on the ", aPairing.pTeam.status);
				aPairing.pTeam = aPairing.outTeam;
			}

		} else {
			thesePairings[swapDestination].dTeam = aPairing.inTeam;
			console.log("sent", aPairing.inTeam," to ", swapDestination, " on the ", swapSide);
			if (!tournament.isSideConstrained){
				console.log("executed NSC swap logic");
				console.log("sent", aPairing.outTeam," to the place of ", aPairing.pTeam.uniqueID, " on the ", aPairing.pTeam.status);
				aPairing.pTeam = aPairing.outTeam;
				

				} else {
				console.log("executed SC swap logic");
				console.log("sent", aPairing.outTeam," to the place of ", aPairing.dTeam.uniqueID, " on the ", aPairing.dTeam.status);
				aPairing.dTeam = aPairing.outTeam;
			}
		}
		aPairing.isImpermissible = false;
		thesePairings[swapDestination].isImpermissible = false;
		swapList.push(aPairing.outTeam.uniqueID + "-" + aPairing.inTeam.uniqueID);
		pairings = thesePairings;
		updateRanks();
		checkImpermissibles(pairings, swapList);
		this.newPairings = pairings;
	}
	
	$scope.swapList = swapList;
	
	$scope.flip = tournament.rnd3Flip;
	
	$scope.flipSides = function(){
		for (var i = 0; i < pairings.length; i+=1){
			var wasP = pairings[i].pTeam;
			var wasD = pairings[i].dTeam;
			console.log("switched sides:", pairings[i].pTeam, " plaintiff is now: ", wasD);
			pairings[i].pTeam = wasD;
			console.log("switched sides: ", pairings[i].dTeam, " defense is now: ", wasP);
			pairings[i].dTeam = wasP;
			pairings[i].pTeam.status = "p";
			pairings[i].dTeam.status = "d";
		}
		if (tournament.rnd3Flip == "Heads") { //change coin flip result on click
			tournament.rnd3Flip = "Tails";
		} else {
				tournament.rnd3Flip = "Heads";
		} 
		this.flip = tournament.rnd3Flip;
		updateRanks();
		console.log("flipped");
		checkImpermissibles(pairings, swapList);
		this.newPairings = pairings;
	}
	
	$scope.coinflip = ["Heads", "Tails"]; //unused??
	
	$scope.saveSwaps = function(){
		swapList = [];
		pairings = this.newPairings;
		var savePair = "pairings" + tournament.roundNumber;
		var saveTour = "tournament" + tournament.roundNumber;
		localStorage.setItem(savePair, JSON.stringify(pairings));
		localStorage.setItem(saveTour, JSON.stringify(tournament));
	}
	
	$scope.undoRound = function(){
		var loadPair = "pairings" + (tournament.roundNumber - 1);
		var loadTour = "tournament" + (tournament.roundNumber - 1);
		tournament = JSON.parse(localStorage.getItem(loadTour));
		pairings = JSON.parse(localStorage.getItem(loadPair));
	}
	
	$scope.pairTeams = function() {
		//var thisTournament = JSON.parse(localStorage.getItem('tournament'));
		this.name = tournament.name;
		this.round = tournament.roundNumber;
		
		var unsortedTeams = []; //unpair the teams
		var leftColumn = []; 
		var rightColumn = [];

		if (tournament.roundNumber == 3) {
			tournament.isSideConstrained = false;
			} else {
				tournament.isSideConstrained = true;
			} //explain this
		console.log("round is side constrained:", tournament.isSideConstrained);
		
		for (var i = 0; i < pairings.length; i+=1){
			var thisPair = pairings[i];
			var wasPTeam = thisPair.pTeam;
			var wasDTeam = thisPair.dTeam;
			
			if (!tournament.isSideConstrained){
				unsortedTeams.push(wasPTeam);
				unsortedTeams.push(wasDTeam);
			}
			if (tournament.isSideConstrained){
				rightColumn.push(wasPTeam);
				leftColumn.push(wasDTeam);
			}
		}
		
		// sort and re-pair the teams
		this.newPairings = [];
		var sortingAlgorithm = pickSortAlg(tournament.roundNumber); //picks the appropriate sorting algorithm, which varies by round
		
		if (!tournament.isSideConstrained){ //round not side constrained
			
			var sortedTeams = unsortedTeams.sort(sortingAlgorithm); //sort teams by appropriate values
			
			for (var i = 0; i < sortedTeams.length; i+=2) { //pair teams
				sortedTeams[i].rank = i;
				sortedTeams[i+1].rank = i+1;
				sortedTeams[i].tempRecord = 0;
				sortedTeams[i+1].tempRecord = 0;
				sortedTeams[i].status = "p";
				sortedTeams[i+1].status = "d";
				//console.log(sortedTeams[i], sortedTeams);
				updateCS(sortedTeams[i], sortedTeams); // needs to be moved someplace more appropriate
				//console.log(sortedTeams[i+1], sortedTeams);
				updateCS(sortedTeams[i+1], sortedTeams);
				var pair =  new Pairing(sortedTeams[i],sortedTeams[i+1]);
				this.newPairings.push(pair);
			}
		}		
		
		if (tournament.isSideConstrained){ //round is side constrained
			var sortedDTeams = rightColumn.sort(sortingAlgorithm); //sort each stack of teams
			var sortedPTeams = leftColumn.sort(sortingAlgorithm);
			
			for (var i = 0; i < sortedPTeams.length; i+=1) { //pair teams from P and D stack
				sortedPTeams[i].rank = i;
				sortedDTeams[i].rank = i;
				sortedPTeams[i].tempRecord = 0;
				sortedDTeams[i].tempRecord = 0;
				sortedPTeams[i].status = "p";
				sortedDTeams[i].status = "d";
				updateCS(sortedDTeams[i], sortedDTeams.concat(sortedPTeams));
				updateCS(sortedPTeams[i], sortedDTeams.concat(sortedPTeams));
				var pair =  new Pairing(sortedPTeams[i],sortedDTeams[i]);
				this.newPairings.push(pair);
			}
		}
		pairings = this.newPairings;
		checkImpermissibles(this.newPairings, swapList); //check for impermissibles
	}
}