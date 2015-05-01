'use strict';
//The controller that displays team names and matchup for round one.

var module = angular.module('tabtracker');
module.controller('Screen4Ctrl', Screen4Ctrl);

function Screen4Ctrl($scope, $state){

	//autoPopScores: function triggers when user clicks on auto populate button.
	$scope.autoPopScores = function() {
		var teamCardsFormFields= document.getElementById("teamCards").elements; //Grab every field in the form of team cards
		var numOfEmptyCardFields= teamCardsFormFields.length; 
		var j; 
		for (j=0; j < numOfEmptyCardFields; j++){ //For every form field...
			var field = teamCardsFormFields[j]; //grab the field
			//4 branches of if and else statements. the logic here is BAD and probably redundant -Gozong
			if (field.name == "dropDownRecord"){ //if the field is for team names...
				var randomRecord = randomRecord(); //generate a random team name
				field.value = randomRecord; //update the form field value
			}
			else if (field.id == "startR_button" || field.id == "startFinalButton"){
				field.disabled = false; //in that case, reenable the button so its clickable.
			}
			else {  //if the field is for team number..
				var randomScore = randomScore(); //generate a random id..
				field.value = randomScore; //update the form field value
			}
		}
	}
	
	$scope.showTeams = function() {
		this.name = tournament.name;
		this.round = tournament.roundNumber;
		this.flip1 = tournament.rnd1Flip;
		this.pairings = window.pairings;
	}
	
	$scope.values = [0, 0.5, 1, 1.5, 2];
	
	$scope.coinflip = ["Heads", "Tails"];
	
	$scope.undoRound = function(){
		var loadPair = "pairings" + (tournament.roundNumber - 1);
		var loadTour = "tournament" + (tournament.roundNumber - 1);
		tournament = JSON.parse(localStorage.getItem(loadTour));
		pairings = JSON.parse(localStorage.getItem(loadPair));
	}
	
	//record randomizer
	$scope.randomRecord = function(){
		var randomIndex = Math.floor((Math.random() * 4) + 0);//randomly generate a number between 0 and 4
		return values[randomIndex];
	}
	
	//score randomizer
	$scope.randomScore = function(){
		var score = Math.floor((Math.random() * 5) + 0);//randomly generate a number between 0 and 4
		return score;
	}
	
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