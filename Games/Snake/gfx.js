function drawRect(x, y, w, h, color, ctx){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.ctx = ctx;
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);    
};

function drawText(str, x, y, color, ctx){
    this.str = str;
    this.x = x;
    this.y = y;
    this.color = color;
    this.ctx = ctx;
    ctx.fillStyle = color;
    ctx.fillText(str,x,y);
}