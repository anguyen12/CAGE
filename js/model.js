window.tournament = { name: "" , totalTeams: 0, roundNumber: 1 };
window.pairings = [];

//ThenBy.JS microlibrary is Copyright 2013 Teun Duynstee
//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at
//http://www.apache.org/licenses/LICENSE-2.0
window.firstBy=(function(){function e(f){f.thenBy=t;return f}function t(y,x){x=this;return e(function(a,b){return x(a,b)||y(a,b)})}return e})();
window.s = firstBy(function (v1, v2) { return v2.record - v1.record; })
			.thenBy(function (v1, v2) { return v2.combinedStr - v1.combinedStr ; })
			.thenBy(function (v1, v2) { return v2.pointDiff - v1.pointDiff ; });			

window.updateCS = function(team, allTeams){	
		team.combinedStr = 0;
		
		var opponents = team.opponents;
		for (var i =0; i < opponents.length; i++){
			var opponent = opponents[i];
			var oppID = opponent[2];
			var oppRecord = -1;
			var counter = 0
			while (oppRecord == -1){
				checkTeam = allTeams[counter];
				if (checkTeam.uniqueID == oppID){
					oppRecord = checkTeam.record;
				}
				counter+=1;
			}
			team.combinedStr+=oppRecord;
		}
}

window.checkImpermissibles = function(pairedTeams){
		for (i = 0; i < pairedTeams.length; i++){
			var list = pairedTeams[i].pTeam.impermissibles;
			var ID = pairedTeams[i].dTeam.uniqueID;
			
			for (var x = 0; x < list.length; x++){
				if (list[x] == ID){
					pairedTeams[i].isImpermissible = true;
				}
			}
		}
}	

function TeamObject(inputnumber) {
	this.name= "",
	this.record= 0, //ballots won
	this.pointDiff= 0, //points won
	this.combinedStr= 0, //combined strength
	this.rank= inputnumber, //lets make this the one that is assigned by tabber, and uniqueID as the school's special id
	this.impermissibles= [], //a list of teams (teamObjects) a team cannot face
	this.status= "", //plaintiff or defense
	this.uniqueID,
	this.byeTeam = false,
	this.temp1 = 0,
	this.temp2 = 0,
	this.tempRecord = 0,
	this.tempCS = 0,
	this.button = true,
	this.opponents = [];
}

function Pairing(team1, team2) {
	this.isImpermissible = false;
	this.pTeam = team1;
	this.dTeam = team2;
}