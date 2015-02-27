//before i forget:
//lets have the code do this...
//loop through the number list [1, 2, 3 .. n]
//pair them off [[1,2], [3,4], ... n]
//write a new function
//loop through each list in the list
//create the team object accordingly
//god gozong
//no nested views: (wait are views == contrllers?) http://jan.varwig.org/archive/how-to-do-nested-views-in-angularjs-hint-dont http://stackoverflow.com/questions/12574765/better-design-for-passing-data-to-other-ng-views-and-persisting-it-across-contr
//MIGHT ACTUALLY BE HELPFUL: http://stackoverflow.com/questions/23390752/generate-dynamic-form-input-fields-and-collect-field-data-in-an-array


/* OVERVIEW
There are 2 controllers.

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

FormController ---- not complete.
- validateForms() 
*/



(function() {
	var app = angular.module('tabRunner', []);
	var firstBuild = { tournName: "" , totalTeams: 0, };
	var teamObjectOLD = {
		number: 0, //lets make this the one that is assigned by tabber, and uniqueID as the school's special id
		name: "",
		record: 0, //ballots won
		pointDiff: 0, //points won
		combinedStr: 0, //combined strength
		rank: 0,
		impermissibles: [], //a list of teams (teamObjects) a team cannot face
		status: "", //plaintiff or defense
		uniqueID: 0
	};
	
	
	

	
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
	
//FormController : to validate the team forms on the second 'screen' -- make sure no fields are empty
//Roadblock: How do you get information out of dynamically created forms?
//
//http://stackoverflow.com/questions/12928752/validation-of-dynamic-created-form-angularjs not super helpful
//better? http://stackoverflow.com/questions/15843765/angularjs-fields-added-dynamically-are-not-registered-on-formcontroller
	app.controller('FormController', function($scope){
		this.isValid = false;
			
		this.validateForms = function(){
			alert("What up");
				//$scope.testing = "WHATSUP";
		};
			
	});

//SetupController : on the first 'screen' -- figures out what to do and display on the next 'screen' based on form input
//Poorly written and can be cleaned up.
	app.controller('SetupController', function($scope){
		this.newTourn = firstBuild;
		this.hideSetupForm = false;
		this.showAllTeams = false;
		//this.totalTeams = 0;
		this.list = [];//1,2,3,4...,n 
		this.pairings = [];//[1,2][3,4]...
		this.showChoices=false;
		this.finalList = [];
		this.halfwayList = [];
		this.listAllTeams = [];
		
		this.validate = function(pTourn, pTotal){

			if (isNaN(pTotal)){
				document.getElementById('errorMessage').innerText = "Please enter a valid number";
				return false;
			}

			if ((pTourn == "") || (pTotal == "")){
				document.getElementById('errorMessage').innerText = "Please fill out all fields";
				return false;
			}
			
			else{
				document.getElementById('errorMessage').innerText = "";
				//this.totalTeams = pTotal;
				this.showAllTeams = true;
				this.hideSetupForm = true;
				//create a list of numbers (of the total teams participating)
				this.buildList(pTotal);
				//loop through that
				this.test(this.list);
				//this.finalList = this.buildTeams(this.pairings);
				//this.test(this.list);
				return true;
			}
		};
		
		this.buildList = function(number){
		
			for (var i = 0 ; i < number; i++) { 
				this.list.push(i+1);
				//var newTeam = new teamObject(i+1);
				//this.listAllTeams.push(newTeam); //We would hope that by the end of this..
				//listAllTeams looks like this: [{number: 1}, {number: 2}, {number: 3} ... etc] 
				//a list of incomplete team info that will be retrieved later..
			}
		
		};
		
		$scope.formDataTwo = {}; 
		$scope.formDataTwo.list = this.list;
		

		
		//http://stackoverflow.com/questions/12518259/using-ng-repeat-with-table-rows
		//http://jsfiddle.net/6aqtj/1/
		
		this.test = function(listNumbers){

			for (var j=0; j < listNumbers.length; j+=2){
				if (j+1 >= listNumbers.length){
					this.pairings.push([]);
					this.pairings[this.pairings.length-1].push(listNumbers[j]);
					
					
					var newTeam = new teamObject(listNumbers[j]);
					this.listAllTeams.push([]);
					this.listAllTeams[this.listAllTeams.length-1].push(newTeam);
					
				}
				
				else{
					this.pairings.push([]);
					this.pairings[this.pairings.length-1].push(listNumbers[j]);
					this.pairings[this.pairings.length-1].push(listNumbers[j+1]);
					
					
										var newTeam = new teamObject(listNumbers[j]);
					var newTeam2 = new teamObject(listNumbers[j+1]);
					this.listAllTeams.push([]);
					this.listAllTeams[this.listAllTeams.length-1].push(newTeam);
					this.listAllTeams[this.listAllTeams.length-1].push(newTeam2);
				}
			}
		}
		//$scope.chosenPairings = this.pairings;
		
		//is it even possible? :( http://stackoverflow.com/questions/12044277/how-to-validate-inputs-dynamically-created-using-ng-repeat-ng-show-angular
		//http://stackoverflow.com/questions/12044277/how-to-validate-inputs-dynamically-created-using-ng-repeat-ng-show-angular
		this.testR1 = function(){
			this.showChoices = true;
			//$scope.testing = "WHATSUP";
			
			//for every value in list 1 through n (where value is 1, 2, 3, 4 ... n, etc)
			var something = document.getElementById("team1ID").value;
			alert("Team Name "+something);
			
			var elements = document.getElementById("allTeamForms").elements;
			
			for (var i=0; i < elements.length; i++){ //For each form field...
				if (((elements[i].value == "") || (elements[i].value == null)) || (elements[i].value ==0)) { //If it is empty
				document.getElementById("errorTeamForms").value = "Please fill out all team fields"; //Replace the error message in the document with this error message
				//reset the message after every click, run on every post back
				return false;
				}
			}
			
			
		var table = document.getElementById("allTeamForms");
		for (var i = 0, row; row = table.rows[i]; i++) {
		   //iterate through rows
			alert("Team Name "+row);
		   //rows would be accessed using the "row" variable assigned in the for loop
		   for (var j = 0, col; col = row.cells[j]; j++) {
			 //iterate through columns
			 //columns would be accessed using the "col" variable assigned in the for loop
		   }  
		}
			
		};

	  });
  
})();
