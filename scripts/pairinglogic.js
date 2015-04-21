//no nested views: (wait are views == contrllers?) http://jan.varwig.org/archive/how-to-do-nested-views-in-angularjs-hint-dont
//-------------------------------------------------------------unrelated content exists above---------
(function() {
  var app = angular.module('tabRunner', []);
  var firstBuild = { tournName: "" , totalTeams: 0, };
	
  function teamObject(inputnumber, name, record, pointDiff, combinedStr, teamNum) {
	this.number = inputnumber, //lets make this the one that is assigned by tabber, and uniqueID as the school's special id
	this.name= name,
	this.record= record, //ballots won
	this.pointDiff= pointDiff, //points won
	this.combinedStr= combinedStr, //combined strength
	this.rank= 0,
	this.impermissibles= [], //a list of teams (teamObjects) a team cannot face
	this.status= "", //plaintiff or defense
	this.uniqueID = teamNum,
	this.byeTeam = false
	this.enterResults = false
}

function Pairing(team1, team2) {
	this.isImpermissible = false;
	this.pTeam = team1;
	this.dTeam = team2;
}

  var teams = [
            { uniqueID: 1022, name: "Macalester A", record: 4, combinedStr: 10, pointDiff: 23, impermissibles: [1024, 2000], rank: 0 },
            { uniqueID: 1023, name: "Macalester B", record: 3, combinedStr: 11, pointDiff: 20, impermissibles: [1000, 2000], rank: 0 },
            { uniqueID: 1024, name: "Macalester C", record: 4, combinedStr: 10, pointDiff: 21, impermissibles: [1022, 2000], rank: 0 },
			{ uniqueID: 1361, name: "Macalester D", record: 2, combinedStr: 12, pointDiff: -6, impermissibles: [1000, 2000], rank: 0 },
			{ uniqueID: 1361, name: "U of M A", record: 2, combinedStr: 15, pointDiff: -6, impermissibles: [1000, 2000], rank: 0 },
			{ uniqueID: 9999, name: "Bye Team", record: 1, combinedStr: 4, pointDiff: 50, impermissibles: [1000, 2000], rank: 0 } 
        ];
		
  var pairs = [];
  
  app.controller('PairController', function(){
	
	//sort teams by appropriate values
	firstBy=(function(){function e(f){f.thenBy=t;return f}function t(y,x){x=this;return e(function(a,b){return x(a,b)||y(a,b)})}return e})();
	//ThenBy.JS microlibrary is Copyright 2013 Teun Duynstee
	//Licensed under the Apache License, Version 2.0 (the "License");
	//you may not use this file except in compliance with the License.
	//You may obtain a copy of the License at
	//http://www.apache.org/licenses/LICENSE-2.0
	
	s = firstBy(function (v1, v2) { return v2.record - v1.record; })
                    .thenBy(function (v1, v2) { return v2.combinedStr - v1.combinedStr ; })
				    .thenBy(function (v1, v2) { return v2.pointDiff - v1.pointDiff ; });
	//setup list of team for output				
	sortedTeams = teams.sort(s);
		
	for (var i = 0; i < sortedTeams.length; i+=2) {
			sortedTeams[i].rank = i+1;
			sortedTeams[i+1].rank = i+2;
			pairs.push([sortedTeams[i], sortedTeams[i+1]]);
		}
	
	this.pairings = pairs;
	
	this.isImpermissible = function(uniqueID, list) {
			for (var x = 0; x < list.length; x++){
				if (list[x] == uniqueID){
						return true;
					}
				}
			return false;
		}
	
  });


})();
