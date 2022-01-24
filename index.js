var boxes = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userChoosenPattern = [];
var started = false;
var level = 0;
$(document).keypress(function(){
  if(!started){
    $("h1").hide();
    started = true;
    nextSequence();
  }
})

$(".btn").click(function(){
  var userChoosen = $(this).attr("id");
  userChoosenPattern.push(userChoosen);
  playSound(userChoosen);
  animatePress(userChoosen);
  checkAnswer(userChoosenPattern.length-1);
})

function checkAnswer(currentLevel){
  if(userChoosenPattern[currentLevel] === gamePattern[currentLevel]){
      if(userChoosenPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $(".heading").text("Game Over, Press Any Keyboard Key to Restart");
    startOver();
  }
}

function nextSequence(){
  userChoosenPattern = [];
  level++;
  $(".heading").text("level" + level);

  var ran = Math.floor((Math.random() * 4));
  var choosenColor = boxes[ran];
  gamePattern.push(choosenColor);
  $("."+choosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(choosenColor);
}

function playSound(userChoosen){
  var audio = new Audio("Sounds/"+userChoosen+".mp3");
  audio.play();
}

function animatePress(userChoosen){
  $("#"+userChoosen).addClass("pressed");
  setTimeout(function(){
    $("#"+userChoosen).removeClass("pressed");
  }, 100);
}

function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}
