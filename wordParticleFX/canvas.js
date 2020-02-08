var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//粒子分布精确度
var gridY = 7;
var gridX = 7;


//粒子的创建
function Particle(x, y, r, c,vx, vy, seed) {
    this.x = x ;
    this.y = y ;
    this.radius = r;
    this.color = c;
    this.velocityX = vx;
    this.velocityY = vy;
    this.seed = seed;
    this.offset = seed;

    this.draw = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,
            Math.PI * 2,true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    //粒子的移动
    this.move = function () {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.offset += 0.01;
        if (this.offset > 360) this.offset = 0;
        this.velocityX = 0.05 * Math.sin(this.offset);
        this.velocityY = 0.05 * Math.cos(this.offset);
    };
}


//文字转粒子数据的类
function Shape(x ,y ,text) {
    this.x = x;
    this.y = y;
    this.size = 200;
    this.text = text;
    this.placement = [];
}

Shape.prototype.getImage = function (){
    ctx.textAlign = "center";
    ctx.font = this.size + "px arial";
    ctx.fillText(this.text, this.x, this.y);

    var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
    var buffer32 = new Uint32Array(imageData.data.buffer);

    for (var i = 0;i < canvas.width; i += gridX){
        for (var j = 0;j < canvas.height; j += gridY){
            if (buffer32[j * canvas.width + i]){
                var particle = new Particle(i, j, 3,colorRgb(0,randomInt(0,200),randomInt(0,230)), 0, 0,randomInt(0,360));
                this.placement.push(particle);
            }
        }
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
}



var shape = new Shape(550,300,"Hello,world!")
shape.getImage();

var offset = 0;
//绘制
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(var i = 0; i < shape.placement.length; i++){
        shape.placement[i].move();
        shape.placement[i].draw();
    }

    //开启循环动画播放模式用的代码
    requestAnimationFrame(draw);
}
draw();







//


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