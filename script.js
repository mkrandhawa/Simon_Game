var buttonColors=["blue", "yellow", "green", "red"];
var randomChosenColor;
var gamePattern=[];
var userClickedPattern=[];
var level = 0;
var started=false;
//FUNCTION TO START THE GAME WHEN A KEYBOARD KEY IS PRESSED (first time)
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level).css("font-size", "");
      nextSequence();
      started = true;
    }
  });

  
//FUNCTION FOR THE SEQUENCE
function nextSequence(){
    level++;

    $("#level-title").text("Level "+level);

    var randomNum= Math.floor(Math.random()*4);
    randomChosenColor=buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    //Adding the fading effect
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //Playing the sound 
    playSound(randomChosenColor)
    
    
    

}

//CLICK EVENT LISTENER
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //Playing the sound
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    

});

//SOUND PLAYER FUNCTION
function playSound(name){
    //new audio object for the sound
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}

//FUNCTION FOR ANIMATION
function animatePress(currentColor){
   var pressedButton =  $("#"+currentColor).addClass("pressed");
   setTimeout(function (){
    $(pressedButton).removeClass("pressed");
    }, 100);


}

//FUNCTION TO CHECK THE ANSWER
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if (userClickedPattern.length===gamePattern.length){
            console.log("Success");
            setTimeout(function (){
                nextSequence();
            },1000);
            userClickedPattern=[];
        }
    }
    else{
        console.log("Worng");

        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over! Press Any Key to Start").css("font-size", "1.5rem");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();

    }
}

//FUNCTION TO START THE GAME AGAIN
function startOver(){
    level = 0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
    

}

