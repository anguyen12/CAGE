'use strict';
//The controller that saves team name info

var module = angular.module('tabtracker');
module.controller('Screen3Ctrl', Screen3Ctrl);

function Screen3Ctrl($scope, $state){

	
	//populate the team name and team ids
	$scope.runAutoPop = function() {
		alert("Running auto populate...");
		//takes the numberOfTeams
		//randomly generates names for the teams
		
		//Grab every field in the form of team cards
		var teamCardsFormFields= document.getElementById("teamCards").elements;
		
		//For every form field...
		var j;
		for (j=0; j <= teamCardsFormFields.length; j++){
			//grab the field
			var field = teamCardsFormFields[j];
			//0=name field, 1=teamID field
			if (field.name == "teamName"){
				var teamName = randomTeamName();
				field.value = teamName;
			}
			else if (field.name == "teamNumber"){ 
				var uniqueID = randomUniqueID();
				field.value = uniqueID;
			}
			else{
				field.value = "Can't hit this team";
			}
		}
	}
	
	//'Randomizers'
	function randomUniqueID(){
		var number1 = Math.floor((Math.random() * 100) + 1);//randomly generate a number between 1 and 100
		var number2 = Math.floor((Math.random() * 100) + 1);//randomly generate another number
		var uniqueID = number1+""+number2; //Unique ID
		return uniqueID;
	}
	
	function randomTeamName(){
		var colleges = ['Macalester', 
						'Harvard', 
						'St. Thomas',
						'Hamline',
						'Carleton',
						'U of M',
						'Princeton',
						'Saint Paul Tech',
						'Monsters University',
						'Hogwarts',
						'University of Florida',
						'St. Cloud State',
						'Mankato State',
						'Winona State',
						'John Hopkins',
						'U W Madison',
						'Michigan State',
						'Chicago University',
						];
		var colors = ['Red', 'Blue', 'Yellow', 'Orange','Green', 'Silver', 'Gold', 'International'];
		
		var teams = ['Team', 
					'Division', 
					'Troop', 
					'Squad', 
					'Duo', 
					'Contingent', 
					'Trio', 
					'Triple', 
					'Faction', 
					'Party'];
		var etc = ['Baking Club',
				'Breakfast Club',
				'Kung Fu Fighters',
				'Knitting Club', 
				'Legal Geekery', 
				'Drama Club', 
				'Theatre Fanatics', 
				'Glee Club', 
				'Football Team', 
				'Bar Association', 
				'Republicans', 
				'Democrats', 
				'Marxists'];

		
		var wordLists1 = [colleges, colors];
		var wordLists2 = [teams, etc];
		
		var randomList1 = (Math.floor(Math.random()*2));
		var randomList2 = (Math.floor(Math.random()*2));
		
		var list1 = wordLists1[randomList1];
		var list2 = wordLists2[randomList2];
		
		var word1 = Math.floor(Math.random()*list1.length);
		var word2 = Math.floor(Math.random()*list2.length);
		
		var teamName = list1[word1]+" "+list2[word2];
		
		return teamName;
	}



		$scope.blah = function(){
			alert("Test");
		}
		

	$scope.configTeams = function() { //on load, build the empty team forms 
		//var thisTournament = JSON.parse(localStorage.getItem('tournament')); //grab tournament object
		this.name = tournament.name; //assign {{name}} to the name of the tournament
		this.round = tournament.roundNumber;
		this.pairings = pairings;
		//this is grabbing the empty placeholder of all team forms
		//[[**pairing 1**{teamObject},{teamObject}],[**pairing 2**{teamObject1},{teamObject1}], etc...]
		//this.listAllTeams = JSON.parse(localStorage.getItem('listAllTeams'));
		//this.pairings = JSON.parse(localStorage.getItem('pairings'));
	}
	
	// NEEDS EDITED TO UPDATE PAIRINGS OBJECTS
	$scope.startR1 = function($scope) { //clicking the button to start round 1
		//var tournament = JSON.parse(localStorage.getItem('tournament'));//grab the number of totals teams from local storage
		var counter = 0;
		for (var i=0; i < (parseInt(tournament.totalTeams)/2); i++){
						
			var pairing = pairings[i];//grab the pairing
			var plaintiff = pairing.pTeam;//grab the plaintiff
			var defendant = pairing.dTeam;//grab the defendant
			
			//---Update the properties of the plaintiff and defendant
			var name_label = "#teamName"+counter; // build the name of the name input box in html
			var id_label = "#teamID"+counter; //build the name of the id input box
			var imp_label = "#teamImp"+counter;
			plaintiff.name = $(name_label).val(); //update plaintiff to have value user feeds into input box
			plaintiff.uniqueID = $(id_label).val(); //update plaintiff to have value user feeds into input box
			var impList = $(imp_label).val();
			impList = impList.replace(/ /g, "");
			plaintiff.impermissibles = impList.split(",");
			
			counter +=1; //increment the counter/index of the pairing object, so we can grab the 2nd team of the pairing
			name_label = "#teamName"+counter;// similar to above--build the name of the name input box
			id_label = "#teamID"+counter; //build the name of the id input box
			imp_label = "#teamImp"+counter;
			defendant.name= $(name_label).val(); //update defendant's name and number properties
			defendant.uniqueID = $(id_label).val();
			impList = $(imp_label).val();
			impList = impList.replace(/ /g, "");
			defendant.impermissibles = impList.split(",");
			//---Insert into 
			pairing.pTeam = plaintiff;
			pairing.dTeam = defendant;
			counter +=1
			//listAllTeams[i] = "";//clear out the empty placeholder
			//listAllTeams[i] = [plaintiff, defendant]; //replace it with our new plaintiff and defendent pairing filled w/ data
		}
		//localStorage.setItem('listAllTeams', JSON.stringify(this.listAllTeams)); //store tournament teams into local storage
		//localStorage.setItem('pairings', JSON.stringify(this.pairings)); //store tournament teams into local storage
		//NEEDS EDITED UP UPDATE PAIRINGS
	}
	
}