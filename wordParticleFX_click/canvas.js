var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//粒子分布精确度
var gridY = 8;
var gridX = 8;


//粒子的创建
function Particle(x,y,r,c,vx,vy,origPos){
    this.x = x;
    this.y = y;
    this.originalPos = origPos;
    this.radius = r;
    this.color = c;
    this.vx = vx;
    this.vy = vy;
    this.state = 0;

    this.draw = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,
            Math.PI * 2,true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    this.move = function () {
        if (this.state === 0) {
            if (this.isXOutOfBorder()) {
                this.vx = -this.vx;
            }
            if (this.isYOutOfBorder()) {
                this.vy = -this.vy;
            }
            this.x += this.vx;
            this.y += this.vy;
        }
        else {
            this.vx = (this.originalPos.x - this.x)/80;
            this.vy = (this.originalPos.y - this.y)/80;
            this.x += this.vx;
            this.y += this.vy;
        }
    };

    this.isXOutOfBorder = function () {
        return this.x + this.vx > canvas.width || this.x + this.vx < 0
    };

    this.isYOutOfBorder = function () {
        return this.y + this.vy > canvas.height || this.y + this.vy < 0
    }
}


//文字转粒子数据的类
function Word2Particle(x , y , text) {
    this.x = x;
    this.y = y;
    this.size = 200;
    this.text = text;
    this.position = [];
}

Word2Particle.prototype.getImage = function (){
    ctx.textAlign = "center";
    ctx.font = this.size + "px arial";
    ctx.fillText(this.text, this.x, this.y);

    var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
    var buffer32 = new Uint32Array(imageData.data.buffer);
    for (var i = 0;i < canvas.width; i += gridX){
        for (var j = 0;j < canvas.height; j += gridY){
            if (buffer32[j * canvas.width + i]){
               this.position.push({posX:i,posY:j});
            }
        }
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
}


var shape = new Word2Particle(550,300,"Hello,world!")
shape.getImage();
var particles = [];
for (var i = 0; i < shape.position.length; i++){
    var particle = new Particle(randomInt(0,canvas.width), randomInt(0,canvas.height),randomInt(3,6),
        colorRgb(255,0,randomInt(0,255)),randomInt(-3,3),randomInt(-3,3),{x:shape.position[i].posX,y:shape.position[i].posY});
    particles.push(particle);
}


function changeState(event) {
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].state === 0){
            particles[i].state = 1;
        }
        else {
            particles[i].state = 0;
            particles[i].vx = randomFloat(-4,4);
            particles[i].vy = randomFloat(-4,4);
        }
    }
}

//绘制
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    canvas.addEventListener('mousedown', changeState);
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