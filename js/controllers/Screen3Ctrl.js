'use strict';
//The controller that saves team name info

var module = angular.module('tabtracker');
module.controller('Screen3Ctrl', Screen3Ctrl);

function Screen3Ctrl($scope, $state){

	$scope.configTeams = function() { //on load, build the empty team forms 
		//var thisTournament = JSON.parse(localStorage.getItem('tournament')); //grab tournament object
		this.name = tournament.name; //assign {{name}} to the name of the tournament
		this.round = tournament.roundNumber;
		this.pairings = pairings;
		//this is grabbing the empty placeholder of all team forms
		//[[**pairing 1**{teamObject},{teamObject}],[**pairing 2**{teamObject1},{teamObject1}], etc...]
		//this.listAllTeams = JSON.parse(localStorage.getItem('listAllTeams'));
		//this.pairings = JSON.parse(localStorage.getItem('pairings'));
	}
	// NEEDS EDITED TO UPDATE PAIRINGS OBJECTS
	$scope.startR1 = function($scope) { //clicking the button to start round 1
		//var tournament = JSON.parse(localStorage.getItem('tournament'));//grab the number of totals teams from local storage
		var counter = 0;
		for (var i=0; i < (parseInt(tournament.totalTeams)/2); i++){
						
			var pairing = pairings[i];//grab the pairing
			var plaintiff = pairing.pTeam;//grab the plaintiff
			var defendant = pairing.dTeam;//grab the defendant
			
			//---Update the properties of the plaintiff and defendant
			var name_label = "#teamName"+counter; // build the name of the name input box in html
			var id_label = "#teamID"+counter; //build the name of the id input box
			plaintiff.name = $(name_label).val(); //update plaintiff to have value user feeds into input box
			plaintiff.number = $(id_label).val(); //update plaintiff to have value user feeds into input box
			
			counter = counter+1; //increment the counter/index of the pairing object, so we can grab the 2nd team of the pairing
			name_label = "#teamName"+increment;// similar to above--build the name of the name input box
			id_label = "#teamID"+increment; //build the name of the id input box
			defendant.name= $(name_label).val(); //update defendant's name and number properties
			defendant.number = $(id_label).val();
			
			//---Insert into 
			pairing.pTeam = plaintiff;
			pairing.dTeam = defendant;
			//listAllTeams[i] = "";//clear out the empty placeholder
			//listAllTeams[i] = [plaintiff, defendant]; //replace it with our new plaintiff and defendent pairing filled w/ data
		}
		//localStorage.setItem('listAllTeams', JSON.stringify(this.listAllTeams)); //store tournament teams into local storage
		//localStorage.setItem('pairings', JSON.stringify(this.pairings)); //store tournament teams into local storage
		//NEEDS EDITED UP UPDATE PAIRINGS
	}
	
}