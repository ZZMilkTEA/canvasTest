var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.font = "20px serif";

var ball = {
    pos_x : 150,
    pos_y : 70,
    v_y : 0,
    setBallPostion : function (x, y) {
        this.pos_x = x;
        this.pos_y = y;
        this.v_y = 0;
    },
    drawBall : function () {
        ctx.beginPath();
        ctx.arc(this.pos_x, this.pos_y, this.pos_y/20 , 0 ,2 * Math.PI , true);
        ctx.closePath();
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();
    },
    isYOutOfBorder : function () {
        return (this.pos_y - this.pos_y/20 + this.v_y < 0 || this.pos_y + this.pos_y/20 + this.v_y > canvas.height);
    }
}

function pick(event) {
    var x = event.layerX;
    var y = event.layerY;
    ball.setBallPostion(x,y);
}

canvas.addEventListener('mousedown', pick);
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var text = "x:" + ball.pos_x + "  y:" + ball.pos_y;
    ctx.fillText(text, 10, 20);
    ball.drawBall();
    ball.v_y++;
    ball.pos_y = ball.pos_y + ball.v_y;
    if (ball.isYOutOfBorder()){
        ball.pos_y  = canvas.height - ball.pos_y/20;
        ball.v_y = -ball.v_y;
    }
    requestAnimationFrame(draw);
}

draw();