
app.controller("MainController", ["$scope", function($scope){
	
	$scope.game = false;
	$scope.showForm = true;
	$scope.gameHere = false;
	$scope.player1 ="";
	$scope.player2 ="";
	$scope.scorePlayer1 = 0;
	$scope.scorePlayer2 = 0;
	$scope.player = 1;
	$scope.showWinner = false;
	$scope.startTime ="";
	$scope.endTime ="";
	var error = 'undefined';

	$scope.niz = {
		col0: [],
		col1: [],
		col2: [],
		col3: [],
		col4: [],
		col5: [],
		col6: [],
	};

	$scope.checkInputValues = function(){
		if(typeof this.player1===error|| typeof this.player2 === error || this.player1 == "" || this.player2 == ""){
			return;
		}
		else{
			this.wider={'height' : '900px'};
			this.showForm = false;
			this.gameHere = true;
			this.game = true;
			this.showe = true;
			$scope.startTime = new Date().getTime();
			window.scrollTo(0, 150);
		}
	}

	$scope.add = function(col, index){
		window.scrollTo(0, 150);

		if($scope.game && !this.fullColumn(col)){
		console.log(col);
		this.niz[col].push(this.player);
		//console.log(this.checkColumn(col)+" Dobio je "+((this.player===1)?this.player1:this.player2));
		if(this.checkForWinners(col, index)){
			$scope.endTime = new Date().getTime();
			$scope.endTime = Math.floor(($scope.endTime - $scope.startTime) * 0.001);
			$scope.showWinner = true;
			$scope.game = false;
			if(this.player==1){
				console.log("OVDJE");
				$scope.scorePlayer1+=1;
			}
			else{
				$scope.scorePlayer2+=1;
			}
		}

		this.switchPlayers();
	}
	};

	$scope.checkDiagonalFirst = function(col, index){
		var column = index;
		var row = $scope.niz[col].length-1;
		var moveLeft = (column>=row)?row:column;
		// console.log(column+" - kolona ,"+row+" - red");
		// console.log("Move left: "+moveLeft)
		var result = false;
		
		var getThis = (parseInt(col.substring(3,4))-moveLeft);
		var movement = "col"+getThis.toString();
		//console.log("---- "+movement);
		
		var changeable = row-moveLeft;
		var counter = 0;
		angular.forEach($scope.niz, function(value, key){
			//console.log(key+"    "+movement+"  "+(movement==key));
			//console.log("Change  "+changeable+" "+value[changeable]+" "+row);
			if(movement==key){
				//console.log("movement: "+movement+" changeable: "+changeable);
				movement = "col"+(parseInt(movement.substring(3,4))+1).toString();
				if(typeof value[changeable]=='undefined'){
					counter = 0;
					//console.log("UNDEFINED "+value[changeable]);
					//console.log(value.row);
				}
				else{
					//console.log("VALUES "+value[changeable]+" Counter "+counter);
					if(value[changeable]==$scope.player){
						counter++;
						//console.log("VALUES "+value[changeable]+" Counter "+counter);

					}
					else{
						counter = 0;
					}
					if(counter==4){
						result = true;
						//console.log("COUNTER "+counter);
					}
				}
				changeable++;
			}
		});

		return result;

	}



	$scope.checkDiagonalSecond = function(col, index){
		var column = index;
		var row = $scope.niz[col].length-1;
		
			var moveLeft = (column>=(6-row-1))?(6-row-1):column;

		//console.log("Column: "+column+" Row: "+row+"Move Left ----"+moveLeft);
		// console.log("Move left: "+moveLeft)
		var result = false;
		
		var getThis = (parseInt(col.substring(3,4))-moveLeft);
		var movement = "col"+getThis.toString();
		//console.log("---- "+movement);
		
		var changeable = row+moveLeft;
		console.log("Changeable ---- "+changeable);
		var counter = 0;
		angular.forEach($scope.niz, function(value, key){
			//console.log(key+"    "+movement+"  "+(movement==key));
			//console.log("Change  "+changeable+" "+value[changeable]+" "+row);
			if(movement==key){
				//console.log("movement: "+movement+" changeable: "+changeable);
				movement = "col"+(parseInt(movement.substring(3,4))+1).toString();
				if(typeof value[changeable]=='undefined'){
					counter = 0;
					//console.log("UNDEFINED "+value[changeable]);
					//console.log(value.row);
				}
				else{
					//console.log("VALUES "+value[changeable]+" Counter "+counter);
					if(value[changeable]==$scope.player){
						counter++;
						//console.log("VALUES "+value[changeable]+" Counter "+counter);

					}
					else{
						counter = 0;
					}
					if(counter==4){
						result = true;
						//console.log("COUNTER "+counter);
					}
				}
				changeable--;
			}
		});

		return result;

	}

	$scope.switchPlayers = function(){
		$scope.player = ($scope.player === 1)?2:1;
		console.log(this.player);
	}

	$scope.fullColumn = function(col){
		if(this.niz[col].length>=6){
			return true;
		}
		else{
			return false;
		}
	}

	$scope.currentPlayer = function(){
		var currentPlayer = (this.player===1)?this.player1:this.player2;
		return currentPlayer;
	}

	$scope.checkRows = function(col){
		var lastPoint = this.niz[col].length-1;
		var counter = 0;
		var column = this.niz[col];

		for(var i = lastPoint; i>=0; i--){
			if(column[i]==this.player){
				counter++;
			}
			if(column[i]!==this.player){
				counter=0;
			}
			if(counter==4){
				return true;
			}
		}
		return false;
	}

	$scope.checkColumn = function(col){
		var lastPoint = this.niz[col].length-1;
		var counter = 0;
		var result = false;

		angular.forEach(this.niz, function(value, key){
			var recent = value[lastPoint];
			if(typeof recent != error){
			 if (recent == $scope.player) {
          counter++;
          // console.log("Counter "+counter);
          if (counter == 4) {
          	// console.log("TRUEEEEE");
          	// return true;
          	result = true;
          }
        }
        else{
        	counter = 0;
        }
    }
    else{
  		counter = 0;
    }
		
		});
		// if (counter == 4) {
  //         	console.log("TRUEEEEE");
  //         	return true;
  //         }
  return result;
	}

	$scope.checkForWinners = function(col, index){
		var winner = false;

		if(this.checkColumn(col)){
			winner = true;
		}
		if(this.checkRows(col)){
			winner = true;
		}

		if(this.checkDiagonalFirst(col, index)){
			winner = true;
		}
		if(this.checkDiagonalSecond(col, index)){
			winner = true;
		}
		console.log("Winner je "+winner);

		return winner;
	}

	$scope.playAgain = function(){
		angular.forEach($scope.niz, function(value, key){
			value.length = 0;
			console.log(value);
		});
		this.game = true;
		this.showWinner = false;

	}

	$scope.startNew = function(){
	$scope.game = false;
	$scope.showForm = true;
	$scope.gameHere = false;
	$scope.player1 ="";
	$scope.player2 ="";
	$scope.scorePlayer1 = 0;
	$scope.scorePlayer2 = 0;
	$scope.player = 1;
	$scope.showWinner = false;

	$scope.niz = {
		col0: [],
		col1: [],
		col2: [],
		col3: [],
		col4: [],
		col5: [],
		col6: [],
	}
	window.scrollTo(0, 0);
};


}]);
