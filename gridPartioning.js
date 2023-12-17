var canvas = document.getElementById("myCanvas");
var dMax = 200;
canvas.width = Math.floor(innerWidth / dMax) * dMax;
canvas.height = Math.floor(innerHeight / dMax) * dMax;
var c = canvas.getContext('2d');
// scaled
var numW = canvas.width / dMax;
var numH = canvas.height / dMax;

function drawGrid(){
    for (let i = 0; i < numW*numH; i++) {
        let wd = i % numW;
        let ht = Math.floor(i / numW);
        c.beginPath();
        c.rect(wd * dMax, ht * dMax, (wd + 1) * dMax, (ht+1) * dMax);
        c.stroke();
    }
}
drawGrid();
var mouse = {
    x: undefined,
    y: undefined
}
// updating based on click
window.addEventListener('click', function(event){
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    mouse.x = event.x;
    mouse.y = event.y;
    let wd = Math.floor(mouse.x / dMax);
    let ht = Math.floor(mouse.y / dMax);
    c.beginPath();
    c.fillStyle = "red";
    c.fillRect(wd * dMax, ht * dMax, dMax, dMax);
    c.fill();
    var Hs = [
        ((ht - 1) + numH) % numH,
        ht,
        ((ht + 1) + numH) % numH
    ];
    var Ws = [
        ((wd - 1) + numW) % numW,
        wd,
        ((wd + 1) + numW) % numW
    ];
    c.fillStyle = 'green';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (Ws[i] == wd && Hs[j] == ht) continue;
            c.beginPath();
            c.fillRect(Ws[i] * dMax, Hs[j] * dMax, dMax, dMax);
            c.fill();
            c.beginPath();
            c.rect(Ws[i] * dMax, Hs[j] * dMax, dMax, dMax);
            c.stroke();
        }
    }
});