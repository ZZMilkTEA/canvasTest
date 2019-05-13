var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//粒子的创建
function createPartical(x,y,r,c,vx,vy) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = c;
    this.vx = vx;
    this.vy = vy;

    this.draw = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,
            Math.PI * 2,true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.move = function () {
        if (this.isXOutOfBorder()){
            this.vx = -this.vx;
        }
        if (this.isYOutOfBorder()){
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
    }

    this.isXOutOfBorder = function () {
        return this.x + this.vx > canvas.width || this.x + this.vx < 0
    }

    this.isYOutOfBorder = function () {
        return this.y + this.vy > canvas.height || this.y + this.vy < 0
    }
};

//粒子生成
var particals = [];
for(var i = 0; i < 100; i++){
    particals[i] = new createPartical(randomInt(0,canvas.width), randomInt(0,canvas.height), randomInt(5,20)
        , colorRgb(randomInt(0,255), randomInt(0,255), randomInt(0,255)), randomFloat(-3,3), randomFloat(-3,3));
}

//绘制
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i = 0; i < particals.length; i++){
        particals[i].move();
        particals[i].draw();
    }

    //开启循环动画播放模式用的代码
    requestAnimationFrame(draw);
}
draw();

//


//定义颜色
function colorRgb(r,g,b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}
//生成随机整数函数
function randomInt(from, to){
    return parseInt(Math.random() * (to - from + 1) + from);
}
//生成随机浮点数函数
function randomFloat(from, to){
    return Math.random() * (to - from + 1) + from;
}