var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//粒子的创建
function createPartical(x,y,r,c,vx,vy,st) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = c;
    this.vx = vx;
    this.vy = vy;
    this.survivalTime = st;

    this.draw = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,
            Math.PI * 2,true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    //粒子的移动
    this.move = function () {
        if (this.isOutOfLeft()){
            this.x = 0;
            this.vx = -this.vx;
        }
        if (this.isOutOfRight()){
            this.x = canvas.width;
            this.vx = -this.vx;
        }
        if (this.isOutOfTop()){
            this.y = 0;
            this.vy = -this.vy;
        }
        if (this.isOutOfBottom()){
            this.y = canvas.height;
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
    };

    this.changeState = function () {
        this.move();
    };

//越界判断
    this.isOutOfRight = function () {
        return this.x + this.vx > canvas.width ;
    };
    this.isOutOfLeft = function () {
        return  this.x + this.vx < 0;
    };

    this.isOutOfTop = function () {
        return this.y + this.vy < 0;
    };
    this.isOutOfBottom = function () {
        return this.y + this.vy > canvas.height;
    }
    this.isAlive = function () {
        return this.survivalTime > 0;
    }
};

//粒子发射器
function creatEmitter(x,y,d,er,st){
    this.x = x;
    this.y = y;
    this.director = d;
    this.emissionRate = er;
    this.survivalTime = st;

    this.
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