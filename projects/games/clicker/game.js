//
// @author BenByford
//
// SETUP GAME
// EVENTS
// GAME OVER
// START GAME
//
$(function() {

	var stage = $('#stage');
	var gameStage = "init";
	var messageContainer = $("#messageContainer");
	var scoreContainer = $("#scores");
	var message = "Click to start";
	var playerCount = 0;
	var players = [];
	var currentPlayerNum = 0;
	var currentPlayerScore = 0;
	var topScore = 0;
	var topPlayer = 0;


	// update the messge to show game is working
	changeMessage(message);


	// EVENT LISTENER

	// stage clicked
	$(stage).click(updateStage);


	// key pressed
	//

	window.onkeyup = function (e) { // keypressed

			// get key pressed
			var code = e.key ? e.key : e.which;

			if(gameStage == "setup"){

				// Check to see if key in use already
				var keyTaken = false;
				players.forEach(function(obj){
					if(obj.key == code){
						keyTaken = true;
					}
				});
				if(!keyTaken){

					// add key to player list
					player = {
						player: playerCount,
						key: code,
						score: 0
					}
					players.push(player);

					// increment players count
					playerCount++;

					// tel user they've been added
					changeMessage("Player " + playerCount + " using key " + code);

					// add player score to html
					scoreContainer.append("<h2 class='player player"+playerCount+"'>P"+playerCount+"<span class='score'>0</span></h2>");

				}else{

					// player already using that key
					changeMessage("Player already using "+code);
				}
			}

			// player active
			if(gameStage == "playing"){

				players.forEach(function(obj){

					currentPlayerNum = obj.player;

					if(obj.key == code){
						// add 1 to score
						players[currentPlayerNum].score++;
					}

					// top player and score
					if(obj.score > topScore){
						topScore = obj.score;
						topPlayer = obj.player;
						topPlayer += 1;
						stage.removeClass();
						stage.addClass("player"+topPlayer);
					}

					currentPlayerNum = obj.player;
					playerNum = currentPlayerNum + 1;
					currentPlayerScore = obj.score;
					$('#scores .player'+playerNum+' .score').html(currentPlayerScore);
				});
			}
	};


	// update stage of game on click
	function updateStage() { // canvas has been clicked

		if(gameStage == "init"){

			changeMessage("Press key to add players or click to start");

			gameStage = "setup";

		}else if(gameStage == "setup"){

			changeMessage("Ready");

			setTimeout(startGame, 1000);

		}
	}

	// start game
	function startGame(){

		changeMessage("Go");

		// mark as game started
		gameStage = "playing";

		// 20 seconds
		gt = setTimeout(gameOver, 20000); // total game time
	}


	// game over
	function gameOver(){

		gameStage = "gameOver";

		// find winner
		//
		topPlayer++;
		changeMessage("Player " + topPlayer + " wins with " + topScore + " points!")

		// show winner
	}


	//
	// HELPER FUNCTIONS
	//

	// add messge to message container html
	function changeMessage(msg){
		messageContainer.html(msg);
	}

});
