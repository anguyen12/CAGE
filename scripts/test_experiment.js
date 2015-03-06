//no nested views: (wait are views == contrllers?) http://jan.varwig.org/archive/how-to-do-nested-views-in-angularjs-hint-dont
//-------------------------------------------------------------unrelated content exists above---------
(function() {
  var app = angular.module('tabRunner', []);
  var firstBuild = { tournName: "" , totalTeams: 0, };
  var teamObject = {
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
	this.totalTeams = 0;
	this.list = [];//1,2,3,4...,n 
	this.pairings = [];
	this.showChoices=false;
	this.listAllTeams = []; //to be filled with teamObjects
	
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
			return true;
		}
	};
	
	this.buildList = function(number){
		for (var i = 0 ; i < number; i++) { 
			this.list.push(i+1);
			var newTeam = new teamObject(i+1);
			this.listAllTeams.push(newTeam); //We would hope that by the end of this..
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
			}
			
			else{
				this.pairings.push([]);
				this.pairings[this.pairings.length-1].push(listNumbers[j]);
				this.pairings[this.pairings.length-1].push(listNumbers[j+1]);
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
		//create a teamObject 
		//loop through each field in the form ?? (can we just get it instead of looping???)
		//update the teamObject
		//through the teamObject into a bigger list of teamObjects
		
	};

  });
  
})();
