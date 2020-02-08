var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var particleMaxNumber = 20000;
var particles = [];

//粒子发射器
function Emitter(x,y,d,er,st){
    this.x = x;
    this.y = y;
    this.director = d;
    this.emissionRate = er;
    this.survivalTime = st;

    this.lauch = function (){
        particle = new Particle(this.x ,this.y, 5, colorRgb(255,0,0), randomFloat(-5,5), randomFloat(-5,5),this.survivalTime);
        particles.push(particle);
    }
}

//粒子的创建
function Particle(x, y, r, c,vx, vy, st) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = c;
    this.velocityX = vx;
    this.velocityY = vy;
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
        this.x += this.velocityX;
        this.y += this.velocityY;
    };

    this.changeState = function () {
        this.move();
    };
};

var emitter = new Emitter(200,150,0,20 ,100);

//绘制
function draw() {
    emitter.lauch();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i = 0; i < particles.length;){
        particles[i].survivalTime--;
        if (particles[i].survivalTime <= 0){
            particles.splice(i,1);
        }
        else {
            i++;
        }
    }
    for(var i = 0; i < particles.length; i++){
        particles[i].move();
        particles[i].draw();
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

//勾股定理  输入直角边求斜边
function  dist(a,b) {
    return Math.sqrt(a*a + b*b);
}