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
		var sortedTeams = unsortedTeams.sort(s);
		this.newPairings = [];
		
		for (var i = 0; i < sortedTeams.length; i+=2) {
			sortedTeams[i].rank = i+1;
			sortedTeams[i+1].rank = i+2;
			sortedTeams[i].button = true;
			sortedTeams[i+1].button = true;
			sortedTeams[i].tempRecord = true;
			sortedTeams[i+1].tempRecord = true;
			var pair =  new Pairing(sortedTeams[i],sortedTeams[i+1]);
			this.newPairings.push(pair);
		}
		pairings = this.newPairings;
		localStorage.setItem('pairings', JSON.stringify(pairings));
		localStorage.setItem('tournament', JSON.stringify(tournament));
	}
}