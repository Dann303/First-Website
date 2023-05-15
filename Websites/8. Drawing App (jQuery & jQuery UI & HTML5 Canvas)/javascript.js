$(function(){
     
//Declare Variables
    //Painting / erasing or not
    var paint = false;
    //Painting or erasing
    var paint_erase = "paint";
    //Get the canvas and context
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");
    //Get the canvas container
    var container = $("#container");
    //Mouse position
    var mouse = {x: 0, y: 0}; //x and y are coords initiated to 0 (top-left)
    
//Onload load saved work from localStorage
    if(localStorage.getItem("imgCanvas") != null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    };
    
//Set drawing parameters (lineWidth, lineJoin, lineCap)
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    
//Click inside container
    container.mousedown(function(e){
        paint = true;
        ctx.beginPath();
        
        mouse.x = e.pageX - this.offsetLeft; 
        mouse.y = e.pageY - this.offsetTop;
            
        ctx.moveTo(mouse.x,mouse.y);
    });
    
//Move the mouse while holding mouse key
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
                
        if(paint == true){
            if(paint_erase == "paint"){
                //Get color input
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                //Erasing thus color is white
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
    
//Mouse up -> we are not painting / erasing anymore
    container.mouseup(function(){
        paint = false; 
    });
    
//If we leave the container we are not painting / erasing anymore
    container.mouseleave(function(){
       paint = false; 
    });
    
//Click on the reset button
    $("#reset").click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        $("#erase").removeClass("eraseMode");
    });
    
//Click on save button
    $("#save").click(function(){
        if(typeof(localStorage) !== null){
            localStorage.setItem("imgCanvas", canvas.toDataURL());
        }else{
            window.alert("Your browser does not support local storage!");
        }     
    });
    
//Click on the erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }else{
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });
    
//Change color input
    $("#paintColor").change(function(){
        $("#circle").css("background-color", $(this).val()) 
    });
    
//Change lineWidth using slider
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });
    
//Functions
   //none needed 
    
});









////Tutorial to learn Canvas
//    
//    var context = canvas.getContext("2d");
//    var canvas = document.getElementById("paint");
//
// //Draw a line
//    //Declare a new path
//    context.beginPath();
//    
//    //Set line width
//    context.lineWidth = 40; //40 is in px
//    //Set line color
//    context.strokeStyle = "#42E565";
//    //Set cap to the line (round, butt, square)
//    context.lineCap = "round";
//    //Set line join style (bevel, round, miter)
//    context.lineJoin = "round";
//    
//    //Position the context point (start point)
//    context.moveTo(50,50);
//    
//    //Draw a straight line from starting point to a new position
//    context.lineTo(200,200);
//    
//    //Draw another line
//    context.lineTo(400,100);
//    
//    //Make line visible
//    context.stroke();
