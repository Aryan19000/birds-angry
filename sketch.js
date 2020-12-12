const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, ground1, ground2, log1, log2, log3, log4;
var box1, box2, box3, box4, box5, pig1, pig2;
var back, slingShot;
var backgroundImg;
var score=0;
var gameState="onSling";

//this is an array holding the same datatype
var array1=[1, 20, 50, -10];
console.log(array1[1]);
//this is an array holding different datatype
var array2=["aryan", 99, false, null];
console.log(array2);
//this an array holding a list of different arrays 
var array3=[[1, 2], [12, 35], [45, 123]];
console.log(array3[2][1]);

function preload(){
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground1 = new Ground(600,height,1200,20);
    ground2 = new Ground(150, 305, 300, 170)

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig2 = new Pig(810, 220);

    log2 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log3 = new Log(760,120,150, PI/7);
    log4 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    slingShot = new SlingShot(bird.body,{x:200, y:66.73});
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    noStroke();
    textSize(30);
    fill("white");
    text("score: "+score, width-300, 50);
    Engine.update(engine);
    //console.log(box2.body.position.x);
    //console.log(box2.body.position.y);
    //console.log(box2.body.angle);
    box1.display();
    box2.display();
    ground1.display();
    ground2.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    pig2.score();
    log2.display();

    box5.display();
    log3.display();
    log4.display();

    bird.display();
    slingShot.display();

    console.log(bird.body.speed);
    //getTime();
}

function mouseDragged(){
    if(gameState!="launched"){
        Matter.Body.setPosition(bird.body, {x:mouseX, y:mouseY}); 
    }
}

function mouseReleased(){
    slingShot.fly();
    gameState="launched";
}

function keyPressed(){
    if(keyCode===32 && bird.body.speed<1 || bird.body.position.x>1200 || bird.body.position.x<0 ||  bird.body.position.y>400 ){
        bird.trajectory=[];
        Matter.Body.setPosition(bird.body, {x:200, y:66.73});
        bird.body.speed<=0;
        slingShot.attach(bird.body);
        gameState="onSling";
    }
}

async function getBackgroundImg(){
    var response=await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON=await response.json();
    var datetime=responseJSON.datetime;
    var hour=datetime.slice(11,13);
    if(hour>=05 && hour<=15){
        bg="sprites/bg.png";
    }else{
        bg="sprites/bg2.jpg";
    } 
    backgroundImg=loadImage(bg);
    //console.log(backgroundImg);
}

/*async function getTime(){
    var response=await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON=await response.json();
    var datetime=responseJSON.datetime;
    var time=datetime.slice(11, 19);
    console.log(time);
    //2020-12-09T17:24:29.730235+05:30
}*/