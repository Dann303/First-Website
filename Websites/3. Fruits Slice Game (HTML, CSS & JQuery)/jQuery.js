var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for setInterval()
var fruits = ["apple", "banana", "berries", "mango", "melon", "orange", "peach", "pomegranate", "strawberry"];

$(function(){
//click on start reset button
$("#startreset").click(function(){

    //we are playing
    if(playing == true){

        //reload page
        location.reload();
    }else{

        //we are not playing
        playing = true; //game initiated

        //set score to 0
        score = 0;
        $("#scorevalue").html(score);

        //show trials left
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();

        //hide game over box
        $("#gameOver").hide();

        //change button text to reset game
        $("#startreset").html("Reset Game");

        //start sending fruits
        startAction();

    }
});
    
$("#fruit1").mouseover(function(){
    
    //increment score
    score ++;
    
    $("#scorevalue").html(score); //update score
    
    //play sound
    document.getElementById("slicesound").play();
    //$("#slicesound")[0].play(); 
    
    //stop fruit
    clearInterval(action);
    
    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit
    
    //send new fruit
    setTimeout(startAction, 500);

});




//functions

function addHearts(){
    $("#trialsLeft").empty();
    for(i=0; i<trialsLeft;i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

//start sending fruits

function startAction(){
    
    //generate a fruit
    $("#fruit1").show();
    
    chooseFruit(); //choose a random fruit
    
    $("#fruit1").css({"left" : Math.round(550*Math.random()), "top" : -50}); //random position
 
    //generate a random step
    step = 1 + Math.round(Math.random()*5); //change step
    
    action = setInterval(function(){
        //move fruit down by one step every 10ms
        $("#fruit1").css("top",$("#fruit1").position().top + step);
        
        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            if(trialsLeft > 1){
                
                //reduce number of trials by one
                trialsLeft --;
                
                //populate trialsLeft box
                addHearts();
                
                //generate a fruit
                $("#fruit1").show();
    
                chooseFruit(); //choose a random fruit
    
                $("#fruit1").css({"left" : Math.round(550*Math.random()), "top" : -50}); //random position
 
                //generate a random step
                step = 1 + Math.round(Math.random()*5); //change step
            }else{ //game over
                playing = false; //not playing anymore
                $("#startreset").html("Start Game"); //change button text
                $("#gameOver").show();
                $("#trialsLeft").hide();
                $("#gameOver").html("<p>Game Over!</p><p>Your score is " + score + "</p>");
                stopAction();
            }
        }
    }, 10);
    
}


//generates a random fruit
function chooseFruit(){
    $("#fruit1").attr("src","images/" + fruits[Math.floor(Math.random()*8)] + ".png");
}

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}

});
        //if we are not playing then
            //show trials left
            //change button text to "reset game"
            //1.create a random fruit
            //define a random step
            //2.move fruit down one step every 30 seconds
            //is fruit too low?
                //if its not then repeat 2.
                //if its too low
                    //is there any trials left?
                        //if there are then decrease by one repeat 1.
                        //if there are not then show "game over", button text: "start game"

//slice a fruit
    //play sound
    //explode fruit













//credits
//1-heart: logomakr.com/3RZ74g