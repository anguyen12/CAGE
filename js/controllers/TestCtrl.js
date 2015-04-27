'use strict';
//A test controller, to auto-populate the data into our forms.

var module = angular.module('tabtracker');
module.controller('TestCtrl', TestCtrl);

function TestCtrl($scope, $state){
	
	//populate the team name and team ids
	$scope.testCase1 = function() {
		//takes the numberOfTeams
		//randomly generates names for the teams
		
		//Grab every field in the form of team cards
		var teamCardsFormFields= document.getElementsById("teamCards").elements;
		
		//For every form field...
		for (int j=0; j <= teamCardsFormFields.size(); j++){
			//grab the field
			var field = teamCardsFormFields[j];
			//0=name field, 1=teamID field
			
			if (j%2 == 0){ //if it's even...
				teamName = randomTeamName();
				field.value === teamName;
			}
			else{
				uniqueID = randomUniqueID();
				field.value === uniqueID;
			}
		}
	}
	
	//'Randomizers'
	$scope.randomUniqueID = function(){
		var number1 = Math.floor((Math.random() * 100) + 1);//randomly generate a number between 1 and 100
		var number2 = Math.floor((Math.random() * 100) + 1);//randomly generate another number
		var uniqueID = number1+""+number2; //Unique ID
		return uniqueID;
	}
	
	$scope.randomTeamName = function(){
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
						'John Hopkins'];
		var colors = ['Red', 'Blue', 'Yellow', 'Orange','Green', 'Silver', 'Gold'];
		
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
		
		var randomList1 = (Math.floor(Math.random()*3));
		var randomList2 = (Math.floor(Math.random()*3));
		
		var list1 = wordLists1[randomList1];
		var list2 = wordLists2[randomList2];
		
		var word1 = Math.floor(Math.random()*list1.size());
		var word2 = Math.floor(Math.random()*list2.size());
		
		var teamName = word1+" "+word2;
		
		return teamName;
	}

}