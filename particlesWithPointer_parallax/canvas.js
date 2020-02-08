var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//粒子分布精确度
var gridY = 8;
var gridX = 8;


//粒子的创建
function Particle(x,y,r,c,vx,vy,state){
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = c;
    this.vx = vx;
    this.vy = vy;
    this.offsetX = 0;
    this.offsetY = 0;
    switch (state) {
        case 0: this.state = "close";this.radius *= 1.5;break;
        case 1: this.state = "middle";break;
        case 2: this.state = "far";this.radius *= 0.5;
    }

    this.draw = function (){
            ctx.beginPath();
            ctx.arc(this.x + this.offsetX, this.y + this.offsetY, this.radius,0,
                Math.PI * 2,true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
    };

    this.move = function () {
        if (this.isXOutOfBorder()){
            this.vx = -this.vx;
        }
        if (this.isYOutOfBorder()){
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
    };

    this.isXOutOfBorder = function () {
        return this.x + this.vx > canvas.width || this.x + this.vx < 0
    };

    this.isYOutOfBorder = function () {
        return this.y + this.vy > canvas.height || this.y + this.vy < 0
    }
}

function mouseMoving(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left * (canvas.width / rect.width);
    let y = event.clientY - rect.top * (canvas.height / rect.height);
    let offsetX = x-canvas.width/2;
    let offsetY = y-canvas.height/2;
    for (let i = 0; i < particles.length; i++) {
        switch (particles[i].state){
            case "close":   particles[i].offsetX = offsetX*1.3;
                            particles[i].offsetY = offsetY*1.3;
                            break;
            case "middle":  particles[i].offsetX = offsetX;
                            particles[i].offsetY = offsetY;
                            break;
            case "far":     particles[i].offsetX = offsetX/2;
                            particles[i].offsetY = offsetY/2;
        }
    }
}

//粒子生成
var particles = [];
for(var i = 0; i < 40; i++){
    particles.push(new Particle(
        randomInt(0,canvas.width),
        randomInt(0,canvas.height),
        randomInt(8,12),
        colorRgb(
            randomInt(0,255),
            randomInt(0,255),
            randomInt(0,255)),
        randomFloat(-0.5,0.5),
        randomFloat(-0.5,0.5),
        2
    ));
}
for(var i = 0; i < 30; i++){
    particles.push(new Particle(
        randomInt(0,canvas.width),
        randomInt(0,canvas.height),
        randomInt(8,12),
        colorRgb(
            randomInt(0,255),
            randomInt(0,255),
            randomInt(0,255)),
        randomFloat(-0.5,0.5),
        randomFloat(-1,1),
        1
    ));
}
for(var i = 0; i < 30; i++){
    particles.push(new Particle(
        randomInt(0,canvas.width),
        randomInt(0,canvas.height),
        randomInt(8,12),
        colorRgb(
            randomInt(0,255),
            randomInt(0,255),
            randomInt(0,255)),
        randomFloat(-0.5,0.5),
        randomFloat(-0.5,0.5),
        0
    ));
}


//绘制
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    canvas.addEventListener('mousemove', mouseMoving);
    for(var i = 0; i < particles.length; i++){
        particles[i].move();
        particles[i].draw();
    }
    //开启循环动画播放模式用的代码
    requestAnimationFrame(draw);
}
draw();



//定义rgb颜色
function colorRgb(r,g,b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}
//定义argb颜色
function colorArgb(a,r,g,b) {
    return "argb("+ a + "," + r + "," + g + "," + b + ")";
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