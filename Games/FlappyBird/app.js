//------------------------CANVAS-----------------------
const canvas = document.createElement("canvas");    
const ctx = canvas.getContext("2d");
canvas.style.backgroundColor = "grey";
canvas.width = 600;
canvas.height = 400;
document.body.appendChild(canvas);
//-----------------------------------------------------
//------------------------GAMELOOP---------------------

function Update(){
    checkCol();
    pipeCol();
    moveBird();
    if(isGameOver){
        window.location.reload();
    }
    
    pipe.x = pipe.x - pipe.vx;
    if(pipe.x <= 0){
        pipe.x = canvas.width - pipe.w;
        pipe.h = rdmPipeY();
        pipe.vx += 0.3;
        snd.play();
        score++;
    }

}
 
function Draw(){
    clearScreen(ctx, canvas);
    drawRect(bird.x, bird.y, bird.w, bird.h, "black", ctx);
    drawPipes();
    drawScore();
}

function Game(){
    Update()
    Draw()
    requestAnimationFrame(Game);
}
requestAnimationFrame(Game);

//------------------------GLOBAL-----------------------
let isGameOver = false;
let isCollided = false;
let score = 0;
const snd = new Audio("fx1.wav"); 

//-----------------------------------------------------
//------------------------BIRD-------------------------

const bird = {
    x: 92 ,
    y: 100,
    vy: 3,
    w: 32,
    h: 32,
    flap: false
}

//------------------------PIPE-------------------------

const pipe = {
    x: canvas.width,
    y: 0,
    vx: 3,
    w: 32,
    h: 100,
    gap: 92,
    out: false
}

function rdmPipeY(){
    return Math.random() * ((canvas.height - pipe.gap) - (0 + pipe.gap) + (0 + pipe.gap));
} 
function drawPipes(){

    //top
    drawRect(pipe.x, pipe.y            , pipe.w, pipe.h, "green", ctx);

    //bot
    drawRect(pipe.x, pipe.h + pipe.gap , pipe.w, canvas.height, "green", ctx);

}
//-----------------------------------------------------
//------------------------SCORE------------------------
function drawScore(){
    drawText("SCORE: " + score, 10, 10, "black", ctx );
}

//-----------------------------------------------------

//------------------------CONTROL----------------------

document.body.addEventListener("keydown", (e)=>{
    if(e.code == "Space") bird.flap = true;
}, false);

document.body.addEventListener("keyup", (e)=>{
    if(e.code == "Space") bird.flap = false; 
}, false);

function moveBird(){
    bird.y = bird.y + bird.vy;

    if(bird.flap){
        bird.vy = -1
        bird.y = bird.y + bird.vy;
    }
    else{
        bird.vy = 1
        bird.y = bird.y + bird.vy;
       bird.vy += 0.5;
    }
}

function checkCol(){
    if(bird.y + bird.h >= canvas.height || bird.y <= 0 )   isGameOver = true;
}

function pipeCol(){
    if(rectCol(bird.x, bird.y, bird.w, bird.h, pipe.x, pipe.y, pipe.w, pipe.h) || rectCol(bird.x, bird.y, bird.w, bird.h, pipe.x, pipe.h + pipe.gap, pipe.w, canvas.height)){
        isGameOver = true;
    } 
}
