addEventListener("DOMContentLoaded", ()=>{
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    canvas.id = "canvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let speed = 7;
    let tileCount= 20;
    let tileSize = 18;
    let isGameOver = false;
    let score = 0;

    let snd = new Audio("sound/blub.wav");
    
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
            drawRect(part.x * tileCount , part.y * tileCount, tileSize, tileSize,"green",ctx);

        }
        snakeParts.push(new snakePart(snake.x, snake.y));
        if(snakeParts.length > tailLength){
            snakeParts.shift();
        }

        drawRect(snake.x*tileCount , snake.y*tileCount, tileSize, tileSize,"#082404",ctx);

    }

    
    //-----------------------------------------------------------------
    //------------------------------FOOD-------------------------------
    let food = {
        x: 5,
        y: 5
    }

    function drawFood(){
        drawRect(food.x*tileCount, food.y*tileCount, tileSize, tileSize, "red", ctx);
    }

    //------------------------------SCORE------------------------------
    function drawScore(){
        drawText("Score: " + score, 10, 10, "black", ctx);
    }
    //-----------------------------------------------------------------
    //------------------------------GAMELOOP---------------------------
    function Clear(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    function Draw(){
        moveSnake();
        checkCol();
        gameOver();

        Clear();
        drawSnake();
        drawFood();
        drawScore();

        if(isGameOver)
        {
            location.reload();
        }

        setTimeout(Draw,1000/speed);
    }

    Draw();    
    
    //------------------------------COLLISION--------------------------
    function checkCol(){
        if(food.x == snake.x && food.y == snake.y){
            food.x = Math.floor(Math.random()*tileCount);
            food.y = Math.floor(Math.random()*tileCount);
            score++;
            speed = speed + 0.5;
            tailLength++;
            snd.play();
        }

        
    }

    function gameOver(){
        if(snake.x < 0 ||snake.x == tileCount  || snake.y < 0 || snake.y == tileCount )
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
   
        
    function moveSnake(){
        snake.x = snake.x + snake.vx;
        snake.y = snake.y + snake.vy;
    }

    //-----------------------------------------------------------------
  
})
