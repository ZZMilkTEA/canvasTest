var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
function draw() {
    ctx.fillRect(0,0,150,150);   // 使用默认设置绘制一个矩形
    ctx.save();                  // 保存默认状态

    ctx.fillStyle = '#09F'       // 在原有配置基础上对颜色做改变
    ctx.fillRect(15,15,120,120); // 使用新的设置绘制一个矩形

    ctx.save();                  // 保存当前状态
    ctx.fillStyle = '#FFF'       // 再次改变颜色配置
    ctx.globalAlpha = 0.5;
    ctx.fillRect(30,30,90,90);   // 使用新的配置绘制一个矩形

    ctx.restore();               // 重新加载之前的颜色状态
    ctx.fillRect(45,45,60,60);   // 使用上一次的配置绘制一个矩形

    ctx.restore();               // 加载默认颜色配置
    ctx.fillRect(60,60,30,30);   // 使用加载的配置绘制一个矩形

    ctx.translate(250,75);

    for (var i=1;i<6;i++){ // Loop through rings (from inside to out)
        ctx.save();
        ctx.fillStyle = 'rgb('+(51*i)+','+(255-51*i)+',255)';

        for (var j=0;j<i*6;j++){ // draw individual dots
            ctx.rotate(Math.PI*2/(i*6));
            ctx.beginPath();
            ctx.arc(0,i*12.5,5,0,Math.PI*2,true);
            ctx.fill();
        }

        ctx.restore();
    }
}
draw();


function randomInt(from, to){
    return parseInt(Math.random() * (to - from + 1) + from);
}