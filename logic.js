/*---------------------------------------------------
* Access DOM elements: *
-----------------------------------------------------*/
var playerScore = document.querySelector(".playerScore");
var compScore = document.querySelector(".compScore");
var playerGesture = document.querySelector(".playerGesture");
var compGesture = document.querySelector(".compGesture");
var message1 = document.querySelector("#text1");
var message2 = document.querySelector("#text2");
var message3 = document.querySelector("#text3");
var weaponButtons = document.querySelectorAll(".weapon");
var resetButton = document.querySelector(".resetButton");
var rulesButton = document.querySelector(".rulesButton");
var container = document.querySelector(".container");
var rules = document.querySelector(".rules");

/*---------------------------------------------------
* Define variables: *
---------------------------------------------------*/
var gameOn = true;
var playerScoreCount = 0;
var compScoreCount = 0;

/*---------------------------------------------------
* Define event listeners: *
---------------------------------------------------*/
weaponButtons.forEach(function(button){
  button.addEventListener("click", playRound);
});

resetButton.addEventListener("click", function() {
  gameOn = true;
  playerGesture.className = "";
  compGesture.className = "";
  playerScoreCount = 0;
  compScoreCount = 0;
  playerScore.textContent = playerScoreCount;
  compScore.textContent = compScoreCount;
  message1.textContent = "Race to 5!"
  message2.textContent = "";
  message3.style.color = "black";
});

rulesButton.addEventListener("click", function() {
  container.classList.toggle("align");
  rules.classList.toggle("show");
  toggleText();
});

/*---------------------------------------------------
//* Main function (for playing one round): *
---------------------------------------------------*/
function playRound() {
  var playerSelect = this.className.split(" ")[1];
  if (gameOn) {
    //---set the hand gesture icons-----------------
    playerGesture.className = "far fa-hand-" + playerSelect + " fa-6x";
    if (playerSelect=="lizard" || playerSelect=="scissors") {
      playerGesture.className += " flip";
    } else {
      playerGesture.className += " rotateRight";
    }
    var compSelect = computerPlay();
    setCompGesture(compSelect);
    //---Decide who wins and what happens----------
    whoWins(playerSelect,compSelect);
  }
}

/*---------------------------------------------------
* Auxiliary functions: *
---------------------------------------------------*/
function computerPlay(){ //---Randomly generate computer's choice
      var roll = Math.floor(Math.random()*5);
      return ["rock", "paper", "scissors", "lizard", "spock"][roll];
    }

function setCompGesture(compSelect) {
  if (compSelect=="rock") compGesture.className = "far fa-hand-rock fa-6x rotateLeftFlip";
    else if (compSelect=="paper") compGesture.className = "far fa-hand-paper fa-6x rotateLeftFlip";
    else if (compSelect=="scissors") compGesture.className = "far fa-hand-scissors fa-6x";
    else if (compSelect=="lizard") compGesture.className = "far fa-hand-lizard fa-6x";
    else compGesture.className = "far fa-hand-spock fa-6x rotateLeftFlip";
}

function whoWins(playerSelect,compSelect) { //---Calculates who wins the game
  if (playerSelect=="rock" && (compSelect=="lizard" || compSelect=="scissors") 
    || playerSelect=="paper" && (compSelect=="spock" || compSelect=="rock")
    || playerSelect=="scissors" && (compSelect=="paper" || compSelect=="lizard")
    || playerSelect=="lizard" && (compSelect=="paper" || compSelect=="spock")
    || playerSelect=="spock" && (compSelect=="rock" || compSelect=="scissors")){
    playerWins(playerSelect, compSelect);
  } else if (playerSelect==compSelect) {
      message1.textContent = "It's a draw!";
      message2.textContent = "";
  } else {
    computerWins(playerSelect, compSelect);
  }
}

function playerWins(playerSelect, compSelect) { //---What happens when player wins a round
  playerScoreCount++;
  playerScore.textContent = playerScoreCount;
  if (playerScoreCount==5) {
    gameOn = false;
    message1.textContent = "Congratulations! You win the game! :)";
    message2.textContent = "";
    message3.style.color = "white";
  } else {
    message1.textContent  = "You win!";
    message2.textContent  = playerSelect.toUpperCase() + " beats " + compSelect.toUpperCase();
  }
}

function computerWins(playerSelect, compSelect) { //---What happens when computer wins a round
  compScoreCount++;
  compScore.textContent = compScoreCount;
  if (compScoreCount==5) {
    gameOn = false;
    message1.textContent = "You lost! Better luck next time!";
    message2.textContent = "";
    message3.style.color = "white";
  } else {
    message1.textContent = "You lose!"
    message2.textContent = compSelect.toUpperCase() + " beats " + playerSelect.toUpperCase();
  }
}

function toggleText() { //Change the text on the "Show Rules" to "Hide Rules"
  if (rulesButton.textContent=="Show Rules") {
    rulesButton.textContent="Hide Rules";
  } else {
    rulesButton.textContent="Show Rules"; 
  }
 }