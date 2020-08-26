var gamePattern = [];
var userPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var counter = 0;
var winner = false;
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + counter);
    gameStart();
    started = true;
  }

});

function gameStart() {
  userPattern = [];
  counter++;
  randomChosenColor = buttonColors[nextRand()];
  $("#" + randomChosenColor).fadeOut(150);
  $("#" + randomChosenColor).fadeIn(150);
  $("#level-title").text("Level " + counter);
  soundToPlay(randomChosenColor);
  gamePattern.push(randomChosenColor);

}

$(".btn").click(function(event) {
  var userChosenColour = event.target.id;
  userPattern.push(userChosenColour);
  console.log(userPattern);

  soundToPlay(userChosenColour);
  animatePress(userChosenColour);

  check(userPattern.length-1);
  console.log(userPattern.length-1);

});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function check(lvl){
  if( gamePattern[lvl]=== userPattern[lvl]){
    if(gamePattern.length=== userPattern.length){
      setTimeout(function(){
        gameStart();
      },1000);
    }
  }else{
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    again();

  }
}

function again(){
  counter = 0;
  gamePattern = [];
  started = false;
}

function soundToPlay(randomChosenColor) {
  switch (randomChosenColor) {
    case 'blue':
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case 'red':
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case 'yellow':
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
    case 'green':
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    default:
      console.log(randomChosenColor);
  }
}

function nextRand() {
  return Math.floor(Math.random() * 4);

}
