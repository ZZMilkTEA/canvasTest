var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//粒子发射器
function creatEmitter(x,y,d,er,st){
    this.x = x;
    this.y = y;
    this.director = d;
    this.emissionRate = er;
    this.survivalTime = st;

    this.lauch = function (){
        createPartical(this.x ,this.y, 5, colorRgb(255,0,0), randomInt(-5,5), randomInt(-5,5)
    }
}

//粒子的创建
function createPartical(x,y,r,c,d,v,st) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = c;
    this.d = d;
    this.v = v;
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
        this.x += this.;
        this.y += this.vy;
    };

    this.changeState = function () {
        this.move();
    };

/
};



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

//勾股定理  输入直角边求斜边
function  dist(a,b) {
    return Math.sqrt(a*a + b*b);
}