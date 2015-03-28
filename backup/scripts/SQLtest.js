//DATABASE CODE
var db =  openDatabase('mytestdb', '1.0', 'My First Web Database', 2 * 1024 *1024);
		//run a transaction
		db.transaction(function(tx) { 
			//execute a query to create a new table called "user" with two fields (id and name)
			tx.executeSql("CREATE TABLE IF NOT EXISTS teams (id INTEGER UNIQUE, name TEXT(100))");
			tx.executeSql("INSERT INTO teams (id, name) VALUES (5, 'team 5');");
		},error_log);
		
		//execute other transaction to get users
		db.transaction(function(tx) { 
			//execute a query to create a new table called "user" with two fields (id and name)
			tx.executeSql("SELECT * FROM teams ", [], function(tx, results){
				var n_rows = results.rows.length;//number of results
				var rows = null;
				console.log("Number of teams: "+n_rows);
				for (var i = 0; i < n_rows; i++){
					row  = results.rows.item(i);
					console.log("Team: "+row.id+" - "+row.name);
				}
			});
		},error_log);
		
		// function to show all errors that can occur during execution
		function error_log(error){
			console.log(error.message);
		}
		
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
  var firstBuild = { tournName: "" , totalTeams: 0, };

function teamObject(number) { //sjjasdksajdsaljdla
	this.number= 0, //lets make this the one that is assigned by tabber, and uniqueID as the school's special id
	this.name= "",
	this.record= 0, //ballots won
	this.pointDiff= 0, //points won
	this.combinedStr= 0, //combined strength
	this.rank= 0,
	this.impermissibles= [], //a list of teams (teamObjects) a team cannot face
	this.status= "", //plaintiff or defense
	this.uniqueID= 0
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
	//this.totalTeams = 0;
	this.list = [];//1,2,3,4...,n 
	this.pairings = [];
	this.showChoices=false;
	
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
				this.listAllTeams.push(newTeam);
			}
			
			else{
				this.pairings.push([]);
				
				this.pairings[this.pairings.length-1].push(listNumbers[j]);
				var newTeam = new teamObject(j);
				this.listAllTeams.push(newTeam);
				
				this.pairings[this.pairings.length-1].push(listNumbers[j+1]);
				var newTeam2 = new teamObject(j+1);
				this.listAllTeams.push(newTeam2);
			}
		}
		return this.listAllTeams;
	}
	

	this.testR1 = function(){
		this.showChoices = true;
		alert("First team name: "+document.getElementById("teamName1").value);
		
		//run a transaction
		db.transaction(function(tx) { 
			//execute a query to create a new table called "user" with two fields (id and name)
			tx.executeSql("CREATE TABLE IF NOT EXISTS teams (id INTEGER UNIQUE, name TEXT(100))");
			tx.executeSql("INSERT INTO teams (id, name) VALUES (3, 'team awesome cheese');");
		},error_log);
		alert("Yayay");
	};

  });
  
})();
