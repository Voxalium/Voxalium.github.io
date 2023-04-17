import * as gfx from "../../Framework/gfx.js";
import * as obj from "../../Framework/obj.js";

const cv = gfx.createCanvas(400,400);
//-----------------------------------------------------------------
//------------------------------GLOBAL-----------------------------
let speed = 7;
let tileCount= 20;
let tileSize = 18;
let isGameOver = false;
let score = 0;
//-----------------------------------------------------------------
//------------------------------SNAKE------------------------------
const snakeParts=[];
class snakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
let tailLength = 0;
let snake = {
    x: 10,
    y: 10,       
    vx: 0,
    vy: 0, 
    pressedKeys:{
        left: false,
        right: false,
        up: false,
        down: false,
        run: false,
    }
};
function drawSnake(){
    for(let i = 0; i < snakeParts.length; i++){
        let part=snakeParts[i];
        let snakeRect = new obj.rectangle(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
        gfx.drawRect(snakeRect,"green", cv.ctx);
    }
    snakeParts.push(new snakePart(snake.x, snake.y));
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }
    let snakeHead = new obj.rectangle(snake.x * tileCount, snake.y * tileCount, tileSize, tileSize);

    gfx.drawRect(snakeHead, "#082404", cv.ctx );
}
function moveSnake(){
    snake.x = snake.x + snake.vx;
    snake.y = snake.y + snake.vy;
}
//-----------------------------------------------------------------
//------------------------------FOOD-------------------------------
let food = {
    x: 5,
    y: 5
}
function drawFood(){
    let foodRect = new obj.rectangle(food.x*tileCount, food.y*tileCount, tileSize, tileSize);
    gfx.drawRect(foodRect, "red", cv.ctx);
}
//-----------------------------------------------------------------
//------------------------------SCORE------------------------------
function drawScore(){
    gfx.drawText("Score: " + score, 10, 30, 16,"black", cv.ctx);
}
//-----------------------------------------------------------------
//------------------------------GAMELOOP---------------------------
function Draw(){
    gfx.clearScreen(cv.ctx, cv.canvas);
    drawSnake();
    drawFood();
    drawScore();
}
function Update(){
    moveSnake();
    checkCol(); 
    gameOver();
}
function Game(){
    Update();
    Draw();

    if(isGameOver)
    {
        location.reload();
    }
    setTimeout(Game,1000/speed);
}
Game();    
//-----------------------------------------------------------------
//------------------------------COLLISION--------------------------
function checkCol(){
    if(food.x == snake.x && food.y == snake.y){
        food.x = Math.floor(Math.random()*tileCount);
        food.y = Math.floor(Math.random()*tileCount);
        score++;
        speed = speed + 0.5;
        tailLength++;
    }
}
function gameOver(){
    if(snake.x < 0   ||snake.x == tileCount   || snake.y < 0 || snake.y == tileCount )
    {
        alert("Game Over\nScore : " + score);
        isGameOver = true;
    }
    
    for(let i=0; i < snakeParts.length; i++){
        let part=snakeParts[i];
        if(part.x === snake.x && part.y === snake.y){
            isGameOver=true;
            alert("Eat ze tail\nScore : " + score);
        }
    }
}
//-----------------------------------------------------------------
//------------------------------INPUT------------------------------
document.body.addEventListener("keydown", (e) =>{
    if(e.defaultPrevented)  {return;}
    if(e.code == "KeyW")
    {
        if(snake.vy == 1)
        return;
        snake.vy = -1 ; snake.vx =  0 ;
    }   
    if(e.code == "KeyS"){
        if(snake.vy == -1)
        return;
        snake.vy = 1  ; snake.vx =  0 ;     
    }    
    if(e.code == "KeyA"){
        if(snake.vx == 1)
        return;
        snake.vy =  0 ; snake.vx = -1 ;
    }    
    if(e.code == "KeyD"){
        if(snake.vx == -1)
        return;
        snake.vy =  0 ; snake.vx =  1 ;   
    }   
}, false);
//-----------------------------------------------------------------
