//no nested views: (wait are views == contrllers?) http://jan.varwig.org/archive/how-to-do-nested-views-in-angularjs-hint-dont
//-------------------------------------------------------------unrelated content exists above---------
(function() {
  var app = angular.module('tabRunner', []);
  var firstBuild = { tournName: "" , totalTeams: 0, };
	
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
	this.byeTeam = false
}
	
//http://stackoverflow.com/questions/12928752/validation-of-dynamic-created-form-angularjs not super helpful
//better???: http://stackoverflow.com/questions/15843765/angularjs-fields-added-dynamically-are-not-registered-on-formcontroller
  app.controller('FormController', function($scope){
	this.isValid = false;
	
	this.validateForms = function(){
		alert("What up");
		//$scope.testing = "WHATSUP";
	};
	
  });

  app.controller('SetupController', function($scope){
    this.newTourn = firstBuild;
	this.hideSetupForm = false;
	this.showAllTeams = false;
	//this.totalTeams = 0;
	this.list = [];//1,2,3,4...,n 
	this.pairings = [];
	this.showChoices=false;
	this.pairedTeams = [];
	this.teamList = [];
	
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
			var finalList = this.test(this.list);
			return true;
		}
		
		return this.finalList;
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
		this.listAllTeams = []; //to be filled with teamObjects

		for (var j=0; j < listNumbers.length; j+=2){
			if (j+1 >= listNumbers.length){
				this.pairings.push([]);
				this.pairings[this.pairings.length-1].push(listNumbers[j]);
				var newTeam = new teamObject(j);
				var byeTeam = new teamObject(j+1); //create a bye team when there is odd number of teams - EA
				byeTeam.byeTeam = true;
				byeTeam.name = "Bye Team";
				byeTeam.uniqueID = 9999;
				this.listAllTeams.push([newTeam,byeTeam]); //I'm pretty sure this conditional is handling an odd number of teams - EA
			}
			
			else{
				this.pairings.push([]);
				
				this.pairings[this.pairings.length-1].push(listNumbers[j]);
				var newTeam = new teamObject(j);
				//this.listAllTeams.push(newTeam);
				this.pairings[this.pairings.length-1].push(listNumbers[j+1]);
				var newTeam2 = new teamObject(j+1);
				
				newTeam.status = "p";
				newTeam2.status = "d"; 
				this.listAllTeams.push([newTeam, newTeam2]);
			}
		}
		return this.listAllTeams;
	}
	//$scope.chosenPairings = this.pairings;
	
	//is it even possible? :( http://stackoverflow.com/questions/12044277/how-to-validate-inputs-dynamically-created-using-ng-repeat-ng-show-angular
	//http://stackoverflow.com/questions/12044277/how-to-validate-inputs-dynamically-created-using-ng-repeat-ng-show-angular
	
	this.submitTeams = function(teamList){
		this.showChoices = true;
		this.showAllTeams = false;
		//this.showAllTeams = false;
		//$scope.testing = "WHATSUP";
		
		//for every value in list 1 through n (where value is 1, 2, 3, 4 ... n, etc)
		//create a teamObject 
		//loop through each field in the form ?? (can we just get it instead of looping???)
		//update the teamObject
		//through the teamObject into a bigger list of teamObjects
		
	};

  });
  
})();