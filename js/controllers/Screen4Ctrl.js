'use strict';
//The controller that displays team names and matchup for round one.

var module = angular.module('tabtracker');
module.controller('Screen4Ctrl', Screen4Ctrl);

function Screen4Ctrl($scope, $state){

	this.hideOverlayButton = false;
	//autoPopScores: function triggers when user clicks on auto populate button.
	$scope.autoPopScores = function() {
		//alert("Auto-populating scores..");
		var teamCardsFormFields= document.getElementById("teamCards").elements; //Grab every field in the form of team cards
		var numOfEmptyCardFields= teamCardsFormFields.length; 
		var j; 
		for (j=0; j < numOfEmptyCardFields; j++){ //For every form field...
			var field = teamCardsFormFields[j]; //grab the field
			//4 branches of if and else statements. the logic here is BAD and probably redundant -Gozong
			if (field.name == "dropDownRecord"){ //if the field is for team names...
				//var randomRecord = randomRecord(); //generate a random team name
				var randomIndex = Math.floor((Math.random() * 4) + 0);//randomly generate a number between 0 and 4
				var values = [0, 0.5, 1, 1.5, 2];
				var randomRecord = values[randomIndex];
				//SelectElement(randomIndex);
				//field.val(randomRecord);
				//alert("asdhasda");
				$("#dropDownRecord").val(randomRecord);
				var fieldName= field.name;
				
				if (fieldName == "ballot1pd"){
					$scope.pair.pTeam.temp1 = randomRecord;
				}
				else if (fieldName == "ballot1pd"){
					$scope.pair.dTeam.temp1 = randomRecord;
				}
				else if (fieldName == "ballot2pd"){
					$scope.pair.pTeam.temp2 = randomRecord;

				}
				else{
					$scope.pair.dTeam.temp2 = randomRecord;

				}
				field.value = randomRecord; //update the form field value
				//alert("Completed");
				//GL: The reason why originally, after autopop was called and each field appeared to be properly set with a random value, there were NULL values in the next round: http://stackoverflow.com/questions/11873627/angularjs-ng-model-binding-not-updating-with-dynamic-values
			}
			else if (field.id == "startR_button" || field.id == "startFinalButton"){
				field.disabled = false; //in that case, reenable the button so its clickable.
			}
			else {  //if the field is for team number..
				//var randomScore = randomScore(); //generate a random id..
				var score = Math.floor((Math.random() * 5) + 0);//randomly generate a number between 0 and 4
				field.value = score; //update the form field value
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
	
	$scope.saveRound = function() {
	//check if the form is valid
		var classes = document.getElementById("teamCards").className;
		var classesList = classes.split(" ");
		if (classesList.indexOf("ng-valid") == -1){
			//Alert the user of their mistake
			//alert("Please fill out every team card.");
			//this.showActiveNext = true;
			return;
		}
		this.hideOverlayButton = true;
		
		//save the round without latest entries
		var savePair = "pairings" + tournament.roundNumber;
		var saveTour = "tournament" + tournament.roundNumber;
		localStorage.setItem(savePair, JSON.stringify(pairings));
		localStorage.setItem(saveTour, JSON.stringify(tournament));
		
		//save the round
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
		//Save the round for the back button
		tournament.roundNumber += 1;
	}
	
}