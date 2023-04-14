//--------------HTML STRUCTURE--------------

//Title-------------------------------------
const title = document.createElement("h1");
title.innerText = "Rock Paper Scissors";
document.body.appendChild(title);
//------------------------------------------

//Selection---------------------------------
const select = document.createElement("p");
select.innerText = "Select your option : ";
document.body.appendChild(select);

const rockButton = document.createElement("img");
rockButton.id = "rock"; 
rockButton.src = "Rock.png";
document.body.appendChild(rockButton);

const paperButton = document.createElement("img");
paperButton.id = "paper"; 
paperButton.src = "Paper.png";
document.body.appendChild(paperButton);

const scissorButton = document.createElement("img");
scissorButton.id = "scissor";
scissorButton.src = "Scissor.png";
document.body.appendChild(scissorButton);
//-------------------------------------------


//--------------LOGIC------------------------

    //RNG
let rng = Math.floor(Math.random()*10 % 3+1);
console.log(rng);

    //Selection
mySelection = 0;

rockButton.onclick    = () => check(1, rng);
paperButton.onclick   = () => check(2, rng);
scissorButton.onclick = () => check(3, rng);

function check(s, rng)
{
    if(rng == 1) alert("Computer play Rock");
    if(rng == 2) alert("Computer play Paper");
    if(rng == 3) alert("Computer play Scissor");  
    
    switch(s)
    {
        case 1:
            if(rng == 1) alert("Draw");
            if(rng == 2) alert("You lose !");
            if(rng == 3) alert("You win !");            
        break;

        case 2:
            if(rng == 1) alert("You win !");    
            if(rng == 2) alert("Draw");
            if(rng == 3) alert("You lose !");
        break;

        case 3:
            if(rng == 1) alert("You lose !");
            if(rng == 2) alert("You win !");    
            if(rng == 3) alert("Draw");
        break;
    }

    location.reload();
}
//-------------------------------------------


