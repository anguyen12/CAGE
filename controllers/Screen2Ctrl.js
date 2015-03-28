//The controller that sets up the tournament

var module = angular.module('tabtracker');
module.controller('Screen2Ctrl', ClassListCtrl);

var firstBuild = { tournName: "" , totalTeams: 0, };

function buildTournament(totalTeams, tournName){
		firstBuild.tournName = tournName;
		firstBUild.totalTeams = totalTeams;
}