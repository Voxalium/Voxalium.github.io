import * as gfx from "../../Framework/gfx.js";
import * as obj from "../../Framework/obj.js";
import * as inp from "../../Framework/inp.js";
import * as col from "../../Framework/col.js";

const cv = gfx.createCanvas(600,400);
const cursor  = new obj.circle(10,10,2);
const target  = new obj.circle(10,10,50);
let score = -1;
let lastRender = 0;
let checkCol = true;
let click = true;
let time = 15;

function Update(progress){
    checkCol = col.circleCol(cursor, target);
    if(click && checkCol){
        target.x = randomTargetPos(cv.canvas, target.r).x;
        target.y = randomTargetPos(cv.canvas, target.r).y;
        if(target.r >= 5){
            target.r--;
        }
        score++;
        time++;
    }else if(click) time -= 5;
    if(checkCol) console.log("col");

    if(time <= 0){
        location.reload();
    }
}

function Draw(){
    gfx.clearScreen(cv.ctx, cv.canvas);
    drawTarget();
    gfx.drawText("Score: " + score, 10, 20, 18, "black", cv.ctx);
    gfx.drawText("Time: " + (time - 1), 10, 40, 18, "black", cv.ctx);
    drawCursor();
}

function Event(){
    cv.canvas.addEventListener("mousedown", (e)=>{
        inp.getMousePos(cv.canvas,e);
        click = true;
    })

    cv.canvas.addEventListener("mousemove", (e)=>{
       cursor.x = inp.getMousePos(cv.canvas,e).x;
       cursor.y = inp.getMousePos(cv.canvas,e).y;
    })
}
Event();

function Game(timestamp){
    let progress = (timestamp - lastRender);
    Update(progress);
    Draw();

    lastRender = progress;
    requestAnimationFrame(Game);    
}

requestAnimationFrame(Game);

function drawCursor(){
    gfx.drawCircle(cursor.x, cursor.y, cursor.r, "red", "no-fill", cv.ctx);
}
function drawTarget(){
    click = false;
    gfx.drawCircle(target.x, target.y, target.r, "black", "fill", cv.ctx);
}

function randomTargetPos(canvas, r){
    let x = Math.floor(Math.random() * ((canvas.width-r) - r ) + r);
    let y = Math.floor(Math.random() * ((canvas.height-r) - r) + r); 
    return{
        x: x,
        y: y
    }
}

function timer(){
    time --;
}

setInterval(timer, 1000 );