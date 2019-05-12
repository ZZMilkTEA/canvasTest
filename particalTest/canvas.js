var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var emmiter = (function () {
})();


function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    requestAnimationFrame(draw);
}
draw();




function randomInt(from, to){
    return parseInt(Math.random() * (to - from + 1) + from);
}