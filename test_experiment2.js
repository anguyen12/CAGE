
/* OVERVIEW
There is 1 poorly written inefficient controllers.

SetupController
- validate(name of the tournament, number of teams)
-		this is currently a badly written method because it does more than just validating the form
- buildList(number of n teams)
-		sets the list instance variable to a list of [1, 2, ... n] (within itself)
- test(list of n numbers where n is the number of teams in the tournament)
- 		BAD NAME. should be called something like pairUpTeams. returns a list of lists, i.e. [[1,2],[3,4],[5]]
-		Resets it to finalList. (in the validate function)
- testR1()
- 		Testing.

*/

(function() {
	var app = angular.module('tabRunner', []);
	var firstSetup = { tournName: "" , totalTeams: 0, };
	
	function teamObject(number) {
		this.number= number, //lets make this the one that is assigned by tabber, and uniqueID as the school's special id
		this.name= "",
		this.record= 0, //ballots won
		this.pointDiff= 0, //points won
		this.combinedStr= 0, //combined strength
		this.rank= 0,
		this.impermissibles= [], //a list of teams (teamObjects) a team cannot face
		this.status= "", //plaintiff or defense
		this.uniqueID= 0
	}

//SetupController : on the first 'screen' -- figures out what to do and display on the next 'screen' based on form input
//Poorly written and can be cleaned up.
	app.controller('SetupController', function($scope){
		this.newTourn = firstSetup;
		this.hideSetupForm = false;
		this.showAllTeams = false;
		//this.totalTeams = 0;
		this.list = [];//ex. 1,2,3,4...,n 
		this.pairings = [];//ex. [1,2][3,4]...
		this.showChoices=false; //called 'showChoices' because I wanted to display the teamObjects (for some reason i considered teams as choices..) after the forms have been filled out
		this.listAllTeams = []; //a list containing all the teams [[TeamObject1, TeamObject2]...etc]
		
		//Validate function, returning true if the fields are filled ou
		this.validate = function(pTourn, pTotal){

			if (isNaN(pTotal)){//if the total number of teams is not a number (i.e. user inputs 'seven' instead of 7)
				document.getElementById('errorMessage').innerText = "Please enter a valid number";
				return false; //returns false, meaning don't show the other div with the team forms yet
			}

			if ((pTourn == "") || (pTotal == "")){ //if the set up fields are empty
				document.getElementById('errorMessage').innerText = "Please fill out all fields";
				return false; //returns false, meaning don't show the other div with the team forms yet
			}
			
			else{
				document.getElementById('errorMessage').innerText = ""; //clear the error message div
				this.showAllTeams = true; //Switches to show the div that will hold all the team forms
				this.hideSetupForm = true; //hides the set up form
				//create a list of numbers (of the total teams participating)
				this.buildList(pTotal); //build the number list [1,2,3... n]
				this.test(this.list); //pair up the numbers and create team objects for them -- setting 2 different lists. I'm realizing this makes no sense and is doing repetitive work so I'll fix it.
				return true;
			}
		};
		
		//buildList is a helper function -- it is never called by the controller on the html side
		//arguments: number of teams
		//output: n/a
		//Populates the list variable to [1,2,3... n]
		this.buildList = function(number){
			for (var i = 0 ; i < number; i++) { 
				this.list.push(i+1);
			}
		};
		
		//$scope.formDataTwo = {}; 
		//$scope.formDataTwo.list = this.list;

		//test is a testing function -- never called by the controller on the html side
		//arguments: list of numbers, that is [1,2,3... n]
		//output: n/a
		//Sets the list of teamObject lists (listAllTeams), and sets the pairings list.
		//Really inefficient and redundant code. Will fix.
		this.test = function(listNumbers){
			for (var j=0; j < listNumbers.length; j+=2){ //for every 2 objects in the array starting from 0, 2, 4, etc.
				if (j+1 >= listNumbers.length){ //if the odd value is the last one in the list (meaning there is no other team to go up against)
					this.pairings[this.pairings.length-1].push(listNumbers[j]);	//add the odd team to its own list
					
					//Concurrently building a list of empty team objects
					var newTeam = new teamObject(listNumbers[j]);
					this.listAllTeams.push([]);
					this.listAllTeams[this.listAllTeams.length-1].push(newTeam);
				}
				
				else{ //given the value is even and not the last one in the list
					this.pairings.push([]); //add a new list to the list
					this.pairings[this.pairings.length-1].push(listNumbers[j]); //add a new number to the list
					this.pairings[this.pairings.length-1].push(listNumbers[j+1]); //add a new number to the list
					
					//Concurrently building a list of empty team objects
					var newTeam = new teamObject(listNumbers[j]);
					var newTeam2 = new teamObject(listNumbers[j+1]);
					this.listAllTeams.push([]);
					this.listAllTeams[this.listAllTeams.length-1].push(newTeam);
					this.listAllTeams[this.listAllTeams.length-1].push(newTeam2);
				}
			}
		}
		
		//A test function to see if I can access the values in the dynamically created form. 
		this.testR1 = function(){
			this.showChoices = true;
			
			var teamName = document.getElementById("teamName1").value;
			alert("Team 1's Name : "+teamName);
			
			var teamID = document.getElementById("teamID1").value;
			alert("Team 1's ID : "+teamID);
			
			var elements = document.getElementById("allTeamForms").elements;

		};

	  });
  
})();
