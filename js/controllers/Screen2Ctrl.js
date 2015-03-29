'use strict';
//The controller that sets up the tournament

var module = angular.module('tabtracker');
module.controller('Screen2Ctrl', Screen2Ctrl);

var tournament = { name: "" , totalTeams: 0 };
var listAllTeams = [];
//gozong comment
function teamObject(inputnumber) {
	this.number = inputnumber, //lets make this the one that is assigned by tabber, and uniqueID as the school's special id
	this.name= "",
	this.record= 0, //ballots won
	this.pointDiff= 0, //points won
	this.combinedStr= 0, //combined strength
	this.rank= 0,
	this.impermissibles= [], //a list of teams (teamObjects) a team cannot face
	this.status= "", //plaintiff or defense
	this.uniqueID,
	this.byeTeam = false,
	this.temp1 = 0,
	this.temp2 = 0
	this.button = true;
}

function Screen2Ctrl($scope, $state){
		
		$scope.initTour = function(){
			tournament.name = $('#tourName').val();
			tournament.totalTeams = $('#totalTeams').val();
			localStorage.setItem('tournament', JSON.stringify(tournament));
			
			for (var j=0; j < tournament.totalTeams; j+=2) {
				if (j+1 >= tournament.totalTeams){
					var newTeam = new teamObject(j);
					var byeTeam = new teamObject(j+1); //create a bye team when there is odd number of teams - EA
					byeTeam.byeTeam = true;
					byeTeam.name = "Bye Team";
					byeTeam.uniqueID = 9999;
					listAllTeams.push([newTeam,byeTeam]); //I'm pretty sure this conditional is handling an odd number of teams - EA
				}	
				else {			
					var newTeam = new teamObject(j);
					var newTeam2 = new teamObject(j+1);
					newTeam.status = "p";
					newTeam2.status = "d"; 
					listAllTeams.push([newTeam, newTeam2]);
				}
			}
			localStorage.setItem('listAllTeams', JSON.stringify(listAllTeams));
		}
}