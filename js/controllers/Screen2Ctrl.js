'use strict';
//The controller that sets up the tournament

var module = angular.module('tabtracker');
module.controller('Screen2Ctrl', Screen2Ctrl);

//var tournament = { name: "" , totalTeams: 0, roundNumber: 1 };
//var listAllTeams = [];
//var pairings = [];

function Screen2Ctrl($scope, $state){
		
		$scope.initTour = function(){
			tournament.name = $('#tourName').val();
			tournament.totalTeams = $('#totalTeams').val();
			//localStorage.setItem('tournament', JSON.stringify(tournament));
			
			for (var j=0; j < tournament.totalTeams; j+=2) {
				if (j+1 >= tournament.totalTeams){
					var newTeam = new teamObject(j);
					newTeam.status = "p";
					var byeTeam = new teamObject(j+1); //create a bye team when there is odd number of teams - EA
					byeTeam.byeTeam = true;
					byeTeam.name = "Bye Team";
					byeTeam.uniqueID = 9999;
					byeTeam.status = "d";
					//listAllTeams.push([newTeam,byeTeam]); //I'm pretty sure this conditional is handling an odd number of teams - EA
					var thisPair = new pairing(newTeam, byeTeam);
					pairings.push(thisPair);
				}	
				else {			
					var newTeam = new teamObject(j);
					var newTeam2 = new teamObject(j+1);
					newTeam.status = "p";
					newTeam2.status = "d"; 
					//listAllTeams.push([newTeam, newTeam2]);
					var thisPair = new pairing(newTeam, newTeam2);
					pairings.push(thisPair);					
				}
			}
			//localStorage.setItem('listAllTeams', JSON.stringify(listAllTeams));
			//localStorage.setItem('pairings', JSON.stringify(pairings));
		}
}