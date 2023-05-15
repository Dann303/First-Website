var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on the start/reset button
document.getElementById("startreset").onclick = function(){
    //if we are playing
    if(playing == true){
        location.reload(); //reloading the page
    }else{//if we are not playing
        
        //change mode to playing
        playing = true;
        
        //set time remaining to 60
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        //set score to zero
        score = 0;
        
        document.getElementById("scorevalue").innerHTML = score;
        
        //show countdown box
        show("timeremaining");
        
        //hide game over box
        hide("gameOver");
        
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //start countdown
        startCountdown();
        
        //generate a new Q&A
        generateQA();
    }
}

//clicking on an answer box
for(i=1;i<=4;i++){
        document.getElementById("box"+i).onclick = function(){
        //check if we are playing
        if(playing == true){// if we are playing
            if(this.innerHTML == correctAnswer){//correct answer
                score ++;
                document.getElementById("scorevalue").innerHTML = score;

                //hide wrong box and show correct box

                hide("wrong");
                show("correct");
                setTimeout(function(){ //hide after 1 second
                    hide("correct");
                }, 1000);

                //generate new Q&A
                generateQA()
            }else{//wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function(){ //hide after 1 second
                    hide("wrong");
                }, 1000);
            }
        }
    }
}


//functions


//start counter
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){//game over, time's up
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game"
        }
    }, 1000);
}


//stopping the counter
function stopCountdown(){
    clearInterval(action);
}


//hiding certain element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}


//showing certaing element
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate question and multiple answers;
function generateQA(){
    var x = Math.round(Math.random()*99)+1;
    var y = Math.round(Math.random()*99)+1;
    var operator; 
    var z = Math.round(Math.random()*3)+1;
    
    switch (z){
        case 1:
            operator = "+";
            correctAnswer = x+y;
            break;
        case 2:
            operator = "-";
            correctAnswer = x-y;
            break;
        case 3:
            operator = "*";
            correctAnswer = x*y;
            break;
        case 4:
            operator = "/";
            correctAnswer = (x/y).toPrecision(3);
            break;
    }
    
    document.getElementById("question").innerHTML = x + operator + y;
    var correctPosition = Math.round(Math.random()*3)+1;
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for(i=1; i<=4; i++){
        if(i !== correctPosition){
            var wrongAnswer;
            
            do{
                switch (z){
                    case 1:
                        wrongAnswer = (Math.round(Math.random()*99)+1)+(Math.round(Math.random()*99)+1);
                        break;
                    case 2:
                        wrongAnswer = (Math.round(Math.random()*99)+1)-(Math.round(Math.random()*99)+1);
                        break;
                    case 3:
                        wrongAnswer = (Math.round(Math.random()*99)+1)*(Math.round(Math.random()*99)+1);
                        break;
                    case 4:
                        wrongAnswer = ((Math.round(Math.random()*99)+1)/(Math.round(Math.random()*99)+1)).toPrecision(3);
                        break;
                }
            }while(answers.indexOf(wrongAnswer)>-1) //as long as wrong answer value generated is present in the array keep inside loop
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            
            answers.push(wrongAnswer);
        }
    }
}
