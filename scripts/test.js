(function() {
  var app = angular.module('tabRunner', []);
  var firstBuild = { tournName: "" , totalTeams: 0};

  app.controller('SetupController', function($scope){
    this.newTourn = firstBuild;
	this.hideSetupForm = false;
	this.showAllTeams = false;
	this.totalTeams = 0;
	this.list = [];
	
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
			this.totalTeams = pTotal;
			this.showAllTeams = true;
			this.hideSetupForm = true;
			//create a list of numbers (of the total teams participating)
			this.buildList(pTotal);
			//loop through that
			return true;
		}
	};
	
	this.buildList = function(number){
		for (var i = 0 ; i < number; i++) { 
			this.list.push(i+1);
		}
	};
	
	$scope.formDataTwo = {};
	$scope.formDataTwo.list = this.list;
	
  });
  
})();
