
'use strict';

//The controller that displays the winning teams [ideally after round 4].

var module = angular.module('tabtracker');
module.controller('Screen6Ctrl', Screen6Ctrl);

function Screen6Ctrl($scope, $state){

	var winners = [];

	//function to get the top teams (at least top 16)
	//for testing purposes, we are displaying the top 2 teams (i < 1)
	$scope.getWinners = function(){
		var count = 0;
		for (var i = 0; i < 1; i+=1){ //for top 16: i < 8
			var thisPair = pairings[i];
			var team1 = thisPair.pTeam;
			var team2 = thisPair.dTeam;
			winners.push(team1);
			winners.push(team2);
			alert("Winners are ... "+winners[0].name+" and "+winners[1].name); // testing
		}
	}
	
}
