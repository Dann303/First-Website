$(function(){
    //variables
    var mode = 0; //App mode
    var timeCounter = 0;//Time counter
    var lapCounter = 0;//Lap counter
    var action;//Variable for setInterval
    var lapNumber = 0;//Number of laps
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;//Minutes, seconds, centisecond variables for time and lap

    
    
    //On app load show start and lap buttons
    hideshowButtons("#startButton","#lapButton");
    
    //Click on startButton 
    $("#startButton").click(function(){
        //Mode on
        mode = 1;
        //Show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //Start counter
        startAction();
    });
        
    //Click on stopButton
    $("#stopButton").click(function(){
        //Show resume and reset buttons
        hideshowButtons("#resumeButton","#resetButton")
        //Stop counter
        clearInterval(action);
    });
        
    //Click on resumeButton
    $("#resumeButton").click(function(){
        //Show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start action
        startAction();
    });
        

    //Click on resetButton
    $("#resetButton").click(function(){
        //Reload the page
        location.reload();
    });

    
    //Click on lapButton
    $("#lapButton").click(function(){
        //If mode is ON
        if(mode){//true   
            //Stop action
            clearInterval(action);
            //Reset lap and print lap details
            lapCounter = 0;
            addLap();
            //Start action
            startAction();
        }
    });
       
    
    //Functions
    
    //hideshowButtons function shows two buttons
    function hideshowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    //start the counter
    function startAction(){
        action = setInterval(function(){
            timeCounter++
            if(timeCounter == 100*60*100){
                timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;
            }
            updateTime();
        },10);
    }
    
    //updateTime function converts counters to min,sec,centiseconds
    function updateTime(){
        //1 min = 60 * 100 centiseconds = 6000 centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        //1 sec = 100 centiseconds
        timeSeconds = Math.floor((timeCounter%6000)/100);
        //1 centisec = 1 centiseconds
        timeCentiseconds = (timeCounter%6000)%100;
        $("#timeMinute").text(format(timeMinutes));
        $("#timeSecond").text(format(timeSeconds));
        $("#timeCentiSecond").text(format(timeCentiseconds));
        
        //1 min = 60 * 100 centiseconds = 6000 centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        //1 sec = 100 centiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        //1 centisec = 1 centiseconds
        lapCentiseconds = (lapCounter%6000)%100;
        $("#lapMinute").text(format(timeMinutes));
        $("#lapSecond").text(format(timeSeconds));
        $("#lapCentiSecond").text(format(timeCentiseconds));
    }
    
    //Format numbers
    function format(number){
        if(number<10){
            return "0" + number;
        }else{
            return number;
        }
    }
    
    //addLap function prints lap details inside the lap box
    function addLap(){
        lapNumber++;
        var myLapDetails = "<div class='lap'>" + 
                                "<div class='lapTimeTitle'>" +
                                    "Lap " + lapNumber +
                                "</div>" +
                                "<div class='lapTime'>" +
                                    "<span>" + format(lapMinutes) + "</span>" +
                                    ":<span>" + format(lapSeconds) + "</span>" +
                                    ":<span>" + format(lapCentiseconds) + "</span>" +
                                "</div>" +
                            "</div>";
        $(myLapDetails).prependTo("#laps");
    }
});