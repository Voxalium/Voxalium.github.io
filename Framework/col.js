export{name, rectCol, circleCol};

const name = "col";

function rectCol(r1, r2){
    if(
        r1.x < r2.x + r2.w &&
        r1.x + r1.w > r2.x &&
        r1.y < r2.y + r2.h &&
        r1.h + r1.y > r2.y)
        {
            return true;
        }
        else return false;
}

function circleCol(c1, c2){
    let dx = c1.x - c2.x;
    let dy = c1.y - c2.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    if( distance < c1.r + c2.r){
        return true;
    }else return false;
}