
'use strict';

//The controller that displays the winning teams [ideally after round 4].

var module = angular.module('tabtracker');
module.controller('Screen6Ctrl', Screen6Ctrl);

function Screen6Ctrl($scope, $state){

	//function to get the top teams (at least top 16)
	//for testing purposes, we are displaying the top 2 teams (i < 1)
	$scope.getWinners = function(){
		
		this.name = tournament.name;
		this.round = tournament.roundNumber;
		this.pairings = window.pairings;
		//var loadedTeams = JSON.parse(localStorage.getItem('listAllTeams'));
		//var pairings = JSON.parse(localStorage.getItem('pairings'));
		var unsortedTeams = [] //unpair the teams
		
		for (var i = 0; i < pairings.length; i+=1){
			var thisPair = pairings[i];
			var team1 = thisPair.pTeam;
			var team2 = thisPair.dTeam;
			unsortedTeams.push(team1);
			unsortedTeams.push(team2);
		}
		
		//sort teams by appropriate values
		var firstBy=(function(){function e(f){f.thenBy=t;return f}function t(y,x){x=this;return e(function(a,b){return x(a,b)||y(a,b)})}return e})();
		//ThenBy.JS microlibrary is Copyright 2013 Teun Duynstee
		//Licensed under the Apache License, Version 2.0 (the "License");
		//you may not use this file except in compliance with the License.
		//You may obtain a copy of the License at
		//http://www.apache.org/licenses/LICENSE-2.0
		
		var s = firstBy(function (v1, v2) { return v2.record - v1.record; })
                 .thenBy(function (v1, v2) { return v2.combinedStr - v1.combinedStr ; })
				 .thenBy(function (v1, v2) { return v2.pointDiff - v1.pointDiff ; });
		//setup list of team for output				

		this.sortedTeams = unsortedTeams.sort(s);
		console.log(sortedTeams);
		this.winners = sortedTeams;
		console.log(this.winners);
	}
	
}
