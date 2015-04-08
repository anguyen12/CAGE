window.tournament = { name: "" , totalTeams: 0, roundNumber: 1 };
window.pairings = [];

function TeamObject(inputnumber) {
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
	this.temp2 = 0,
	this.tempRecord = 0,
	this.tempCS = 0,
	this.button = true;
}

function Pairing(team1, team2) {
	this.isImpermissible = false;
	this.pTeam = team1;
	this.dTeam = team2;
}