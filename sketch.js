var ball;
var database, ball_position, position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball_position = database.ref("ball/position");
    ball_position.on("value",readposition,show_error);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        WritePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        WritePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        WritePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        WritePosition(0,+1);
    }
    drawSprites();
}

function WritePosition(x,y){
    database.ref("ball/position").set({
        x : ball.x + x,
        y : ball.y + y
    })
}

function readposition(data)
{
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function show_error()
{
    console.log("data not received from the database");
    
}