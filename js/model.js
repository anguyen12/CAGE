window.tournament = { 
	name: "", 
	totalTeams: 0, 
	roundNumber: 1, 
	rnd1Flip: "Heads", 
	rnd3Flip: "Heads", 
	isSideConstrained: false, 
	byeTeam: false, 
	impRemain: false
	};
window.pairings = [];
window.swapList = [];

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

window.updateRanks = function(){
	if(!tournament.isSideConstrained){
		var rank = 0
		for(var i = 0; i< pairings.length; i+=1){
			pairings[i].pTeam.rank = rank;
			rank +=1;
			pairings[i].dTeam.rank = rank;
			rank +=1;
			pairings[i].pTeam.status = "p";
			pairings[i].dTeam.status = "d";
		}
	}
	if(tournament.isSideConstrained){
		for(var i = 0; i< pairings.length; i+=1){
			pairings[i].pTeam.rank = i;
			pairings[i].dTeam.rank = i;
			pairings[i].pTeam.status = "p";
			pairings[i].dTeam.status = "d";
		}
	}
	console.log("ranks updated:", pairings);
}

window.pickSwapAlg = function(round){
	var result;
	if (round >= 3){
		result = window.leastDiff = firstBy(function (v1, v2) { return v1.recordDiff - v2.recordDiff; })
			.thenBy(function (v1, v2) { return v1.CSdiff - v2.CSdiff ; })
			.thenBy(function (v1, v2) { return v1.PDdiff - v2.PDdiff ; })
			.thenBy(function (v1, v2) { return v2.rankSum - v1.rankSum ; });
	} else {
		result = window.leastDiff = firstBy(function (v1, v2) { return v1.recordDiff - v2.recordDiff; })
			.thenBy(function (v1, v2) { return v1.PDdiff - v2.PDdiff ; })
			.thenBy(function (v1, v2) { return v2.rankSum - v1.rankSum ; });
	}
	return result;
}

window.pickSortAlg = function(round){
	var result;
	
	if(round == 2){
		if (tournament.rnd1Flip == "Heads"){
			result = firstBy(function (v1, v2) { return v2.record - v1.record; })
				.thenBy(function (v1, v2) { return v2.pointDiff - v1.pointDiff ; })
				.thenBy(function (v1, v2) { return v2.uniqueID - v1.uniqueID ; });
		}
		if (tournament.rnd1Flip == "Tails"){
			result = firstBy(function (v1, v2) { return v2.record - v1.record; })
				.thenBy(function (v1, v2) { return v2.pointDiff - v1.pointDiff ; })
				.thenBy(function (v1, v2) { return v1.uniqueID - v2.uniqueID ; });
		}
	} else {
		if (tournament.rnd1Flip == "Heads"){
			result = firstBy(function (v1, v2) { return v2.record - v1.record; })
				.thenBy(function (v1, v2) { return v2.combinedStr - v1.combinedStr ; })
				.thenBy(function (v1, v2) { return v2.pointDiff - v1.pointDiff ; })
				.thenBy(function (v1, v2) { return v2.uniqueID - v1.uniqueID ; });
		}
		if (tournament.rnd1Flip == "Tails"){
			result = firstBy(function (v1, v2) { return v2.record - v1.record; })
				.thenBy(function (v1, v2) { return v2.combinedStr - v1.combinedStr ; })
				.thenBy(function (v1, v2) { return v2.pointDiff - v1.pointDiff ; })
				.thenBy(function (v1, v2) { return v1.uniqueID - v2.uniqueID ; });
		}
	}
	return result;
}

window.checkImpermissibles = function(pairedTeams, swapped){
		for (i = 0; i < pairedTeams.length; i++){
			var list = pairedTeams[i].pTeam.impermissibles;
			var ID = pairedTeams[i].dTeam.uniqueID;
			
			//can use _.contains here
			for (var x = 0; x < list.length; x++){
				if (list[x] == ID){
					pairedTeams[i].isImpermissible = true;
					tournament.impRemain = true;
				}
			}
		}
		
		for (var x = 0; x < pairedTeams.length; x+=1){
			//console.log(pairedTeams[x], x, pairedTeams, swapList);
			if (pairedTeams[x].isImpermissible){ //need to merge the logic here
				if (!tournament.isSideConstrained){
					console.log("checking NSC imper");
					proposeSwapNSC(pairedTeams[x], x, pairedTeams, swapped);
					} //NSC swaps
				if (tournament.isSideConstrained){
					console.log("checking SC imper");
					proposeSwapSC(pairedTeams[x], x, pairedTeams, swapped);
					} //SC swaps
			}
	}
}

window.proposeSwapNSC = function(impMatch, location, pairs, swapped){
	p = impMatch.pTeam;
	d = impMatch.dTeam;
	swOptions = [];

	if (location > 0){
		swap = new ProposedSwap(p, pairs[location-1].dTeam);
		var teamIDa = swap.outTeam.uniqueID + "-" + swap.inTeam.uniqueID;
		var teamIDb = swap.inTeam.uniqueID + "-" + swap.outTeam.uniqueID;
		if (!_.contains(swapped, teamIDa) && !_.contains(swapped, teamIDb)){
			console.log("legal swap proposed");
			swOptions.push(swap);
		}
	}
	if (location < (pairs.length-1)){
		swap2 = new ProposedSwap(d, pairs[location+1].pTeam);
		var teamIDa = swap2.outTeam.uniqueID + "-" + swap2.inTeam.uniqueID;
		var teamIDb = swap2.inTeam.uniqueID + "-" + swap2.outTeam.uniqueID;
		if (!_.contains(swapped, teamIDa) && !_.contains(swapped, teamIDb)){
			console.log("legal swap proposed");
			swOptions.push(swap2);
		}
	}
	var leastDiff = pickSwapAlg(tournament.roundNumber);
	swOptions.sort(leastDiff);
	console.log(swOptions);
	pairs[location].inTeam = swOptions[0].inTeam;
	pairs[location].outTeam = swOptions[0].outTeam;
}	

window.proposeSwapSC = function(impMatch, location, pairs, swapped){
	p = impMatch.pTeam;
	d = impMatch.dTeam;
	pSwaps = [];
	dSwaps = [];
	swOptions = [];
	//turn location into radius?
	
	if (location > 0){
		pSwaps.push(pairs[location-1].pTeam)
		dSwaps.push(pairs[location-1].dTeam)
	}
	if (location < (pairs.length-1)){
		pSwaps.push(pairs[location+1].pTeam)
		dSwaps.push(pairs[location+1].dTeam)
	}
	
	for (var a = 0; a<pSwaps.length; a++){
		swap = new ProposedSwap(p, pSwaps[a])
		var teamIDa = swap.outTeam.uniqueID + "-" + swap.inTeam.uniqueID;
		var teamIDb = swap.inTeam.uniqueID + "-" + swap.outTeam.uniqueID;
		if (!_.contains(swapped, teamIDa) && !_.contains(swapped, teamIDb)){
			swOptions.push(swap);
			console.log("legal swap proposed");
		}
		
		swap2 = new ProposedSwap(d, dSwaps[a])
		var teamIDa = swap2.outTeam.uniqueID + "-" + swap2.inTeam.uniqueID;
		var teamIDb = swap2.inTeam.uniqueID + "-" + swap2.outTeam.uniqueID;
		if (!_.contains(swapped, teamIDa) && !_.contains(swapped, teamIDb)){
			swOptions.push(swap2);
			console.log("legal swap proposed");
		}
	}
	var leastDiff = pickSwapAlg(tournament.round);
	swOptions.sort(leastDiff);
	console.log(swOptions);
	console.log(swOptions[0]);
	pairs[location].inTeam = swOptions[0].inTeam;
	pairs[location].outTeam = swOptions[0].outTeam;
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
	this.temp1, //GL - Originally = 0. Uninstantiated for field validation.
	this.temp2, //GL - Originally = 0. Uninstantiated for field validation.
	this.tempRecord, //GL - Originally = 0. Uninstantiated for field validation.
	this.tempCS = 0; 
	this.opponents = [];
}

function Pairing(team1, team2) {
	this.isImpermissible = false;
	this.pTeam = team1;
	this.dTeam = team2;
	this.inTeamSwap;
	this.outTeamSwap;
}

function ProposedSwap(inTeam, outTeam) {
	this.inTeam = inTeam;
	this.outTeam = outTeam;
	this.recordDiff = Math.abs(inTeam.record - outTeam.record);
	this.CSdiff = Math.abs(inTeam.combinedStr - outTeam.combinedStr);
	this.PDdiff = Math.abs(inTeam.pointDiff - outTeam.pointDiff);
	this.rankSum = inTeam.rank + outTeam.rank;
}
