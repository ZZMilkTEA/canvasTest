var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var range = 0;
var s = 0;
function draw() {
    canvas.addEventListener('mousemove', changeSpeed);

    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgb(230," + 195*s + "," + 195*s + ")";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.translate(275,75);
    range += s;
    ctx.rotate(range);
    ctx.fillStyle = "rgb(0,0,0)"
    ctx.fillRect(-50,-50,100,100);
    ctx.restore();
    requestAnimationFrame(draw);
}
function changeSpeed(event) {
    s =  event.layerX / canvas.width / 5;
}

draw();

function randomInt(from, to){
    return parseInt(Math.random() * (to - from + 1) + from);
}