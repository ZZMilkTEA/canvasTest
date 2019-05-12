var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//粒子的创建
function createPartical(x,y,r,c) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = c;
    this.draw = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,
            Math.PI * 2,true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

//绘制
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var particals = [];
    for(var i = 0; i < 100; i++){
        particals[i] = new createPartical(randomInt(0,300), randomInt(0,600), randomInt(5,20)
        , colorRgb(randomInt(0,255), randomInt(0,255), randomInt(0,255)));
        particals[i].draw();
    }
    partical_1 = new createPartical(20,30,10,colorRgb(22,255,33));
    partical_1.draw();

    //开启循环模式用的代码
    //requestAnimationFrame(draw);
}
draw();

//定义颜色
function colorRgb(r,g,b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}
//生成随机整数函数
function randomInt(from, to){
    return parseInt(Math.random() * (to - from + 1) + from);
}