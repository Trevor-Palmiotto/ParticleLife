var slider = document.getElementById('slider');
var output = document.getElementById('val');
slider.oninput = function() {
    output.innerHTML = this.value;
    c.fillStyle = 'white';
    c.fillRect(0,0,w_, h_);
    drawBox();
    fillPartition(this.value);
    drawLattice();
}
var canvas = document.getElementById('myCanvas');
// cube size
const dMax = 200;
// canvas height and width are multiples of dMax
canvas.width = Math.floor(innerWidth / dMax) * dMax;
canvas.height = Math.floor(innerHeight / dMax) * dMax;
var c = canvas.getContext('2d');
var boxDrawn = false; // for Draw Box checkbox
const d = 1; // unitless distance from the viewport of perspective
var rubik = []; // as in 3x3x3 cube, holds values for drawing the lattice partitioning

var w_;
var h_;
var l_; 
var numW;
var numH;
var numL;
var Ws = [];
var Hs = [];
var Ls = [];

// Set dimensions based on the new innerWidth and innerHeight
function reDim(){
    canvas.width = Math.floor(innerWidth / dMax) * dMax;
    canvas.height = Math.floor(innerHeight / dMax) * dMax;
    w_ = canvas.width;
    h_ = canvas.height;
    l_ = Math.min(w_, h_); // setting for more uniform 3D environment
    // Lattice dimensions
    numW = w_ / dMax;
    numH = h_ / dMax;
    numL = l_ / dMax;
}
reDim();

// Slider info
slider.max = w_ * h_ * l_ / (dMax*dMax*dMax) - 1;
slider.value = 0;
output.innerHTML = slider.value;
// point class
const Point = function(x, y, z) {this.x = x; this.y = y; this.z = z / Math.min(h_, w_) + d};

// n is a 1D version of the 3D grid
function fillPartition(n) {
    let length = Math.floor(n / (numW * numH));
    let height = Math.floor((n % (numW * numH)) / numW);
    let width = n % numW;
    Ls = [
        ((length - 1) + numL) % numL, 
        ((length) + numL) % numL,
        ((length + 1) + numL) % numL
    ];
    Hs = [
        ((height - 1) + numH) % numH,
        ((height) + numH) % numH,
        ((height + 1) + numH) % numH
    ];
    Ws = [
        ((width - 1) + numW) % numW,
        ((width) + numW) % numW,
        ((width + 1) + numW) % numW
    ];
    // console.log(Ls[1]);
    // console.log(Ws);
    // console.log(Hs);

    rubik = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                rubik.push(Ls[i] * numH * numW + Hs[j] * numW + Ws[k])
            }
        }
    }
}

// probably doable in a loop
function cubeTop(p, length, isCenter) {
    let pt = Object.create(p);
    // drawing top face
    c.fillStyle = 'green'
    if (isCenter) {c.fillStyle = 'red';}
    c.beginPath();  
    c.moveTo(computeX(pt), computeY(pt));
    pt.z = (length * dMax + dMax) / Math.min(h_, w_) + d;
    c.lineTo(computeX(pt), computeY(pt));
    pt.x += dMax;
    c.lineTo(computeX(pt), computeY(pt));
    pt.z = (length * dMax) / Math.min(h_, w_) + d;
    c.lineTo(computeX(pt), computeY(pt));
    pt.x -= dMax;
    c.lineTo(computeX(pt), computeY(pt));
    c.fill();

}
function cubeBottom(p, length, isCenter) {
    let pt = Object.create(p);
    // drawing bottom face
    c.fillStyle = "green"
    if (isCenter) {c.fillStyle = 'red';}
    pt.y += dMax;
    c.beginPath();  
    c.moveTo(computeX(pt), computeY(pt));
    pt.z = (length * dMax + dMax) / Math.min(h_, w_) + d;
    c.lineTo(computeX(pt), computeY(pt));
    pt.x += dMax;
    c.lineTo(computeX(pt), computeY(pt));
    pt.z = (length * dMax) / Math.min(h_, w_) + d;
    c.lineTo(computeX(pt), computeY(pt));
    pt.x -= dMax;
    c.lineTo(computeX(pt), computeY(pt));
    c.fill();
}
function cubeLeft(p, length, isCenter) {
    let pt = Object.create(p);
    // // drawing left face
    c.fillStyle = "green"
    if (isCenter) {c.fillStyle = 'red';}
    c.beginPath();  
    c.moveTo(computeX(pt), computeY(pt));
    pt.z = (length * dMax + dMax) / Math.min(h_, w_) + d;
    c.lineTo(computeX(pt), computeY(pt));
    pt.y += dMax;
    c.lineTo(computeX(pt), computeY(pt));
    pt.z = (length * dMax) / Math.min(h_, w_) + d;
    c.lineTo(computeX(pt), computeY(pt));
    pt.y -= dMax;
    c.lineTo(computeX(pt), computeY(pt));
    c.fill();

}
function cubeRight(p, length, isCenter) {
    let pt = Object.create(p);
    // drawing right face
    c.fillStyle = "green"
    if (isCenter) {c.fillStyle = 'red';}
    pt.x += dMax;
    c.beginPath();  
    c.moveTo(computeX(pt), computeY(pt));
    pt.z = (length * dMax + dMax) / Math.min(h_, w_) + d;
    c.lineTo(computeX(pt), computeY(pt));
    pt.y += dMax;
    c.lineTo(computeX(pt), computeY(pt));
    pt.z = (length * dMax) / Math.min(h_, w_) + d;
    c.lineTo(computeX(pt), computeY(pt));
    pt.y -= dMax;
    c.lineTo(computeX(pt), computeY(pt));
    c.fill();
}
function cubeFront(p, isCenter) {
    let pt = Object.create(p);
    // drawing front face  
    c.fillStyle = "green";
    if (isCenter) {c.fillStyle = 'red';}
    c.beginPath();
    c.lineWidth = 0;
    c.moveTo(computeX(pt), computeY(pt));
    pt.x += dMax;
    c.lineTo(computeX(pt), computeY(pt));
    pt.y += dMax;
    c.lineTo(computeX(pt), computeY(pt));
    pt.x -= dMax;
    c.lineTo(computeX(pt), computeY(pt));
    pt.y -= dMax;
    c.lineTo(computeX(pt), computeY(pt));
    c.fill();
}
function drawCube(n) {

    // dimensions
    let length = Math.floor(n / (numW * numH));
    let height = Math.floor((n % (numW * numH)) / numW);
    let width = n % numW;

    // optimize this bit, it works but isn't perfect
    let pt = new Point(width*dMax, height*dMax, length*dMax);
    var isCenter = length == Ls[1] && height == Hs[1] && width == Ws[1];
    // console.log(length);
    // console.log(height);
    // console.log(width);
    // console.log(isCenter);
    // drawing top
    if (height > (numH - 1) / 2 && !Hs.includes(height-1)) {cubeTop(pt, length, isCenter);}

    // drawing bottom
    if (height < (numH - 1) / 2 && !Hs.includes(height+1)) {cubeBottom(pt, length, isCenter);}
    
    // drawing left
    if (width > (numW - 1) / 2 && !Ws.includes(width-1)) {cubeLeft(pt, length, isCenter);}
    
    // drawing right
    if (width < (numW - 1) / 2 && !Ws.includes(width+1)) {cubeRight(pt, length, isCenter);}
    
    // drawing front
    if (!Ls.includes(length-1)) {cubeFront(pt, isCenter);}
}

// point class
var boxPoints = [];
var boxEdges = [];
// updates box information
function updateBox() {
    boxPoints = [
        new Point(0, 0, 0),
        new Point(w_, 0, 0),
        new Point(w_, h_, 0),
        new Point(0, h_, 0),
        new Point(0, 0, l_),
        new Point(w_, 0, l_),
        new Point(w_, h_, l_),
        new Point(0, h_, l_),
    ];
    boxEdges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [0, 4], [1, 5], [2, 6], [3, 7],
        [4, 5], [5, 6], [6, 7], [7, 4]
    ];
}
updateBox();
// draws box
function drawBox() {
    c.strokeStyle = 'black';
    c.lineWidth = 1;
    for (let i = 0; i < boxEdges.length; i++) {
        c.beginPath();
        c.moveTo(computeX(boxPoints[boxEdges[i][0]]), computeY(boxPoints[boxEdges[i][0]]));
        c.lineTo(computeX(boxPoints[boxEdges[i][1]]), computeY(boxPoints[boxEdges[i][1]]));
        c.stroke();
    }
}
// draws lattice
// FIX STUFF HERE
function drawLattice() {
    c.strokeStyle = 'black';
    c.fillStyle = 'black';
    c.lineWidth = 1;
    for (let k = numL; k > -1; k--) {
        for (let i = numH-1; i > -1; i--) {
            for (let j = numW-1; j > -1; j--) {
                if (rubik.includes(j + i * numW + k * numW * numH)) {
                    drawCube(j + i * numW + k * numW * numH);
                }
            }
        }
        
        // drawing over the cube
        for (let i = numH; i > -1; i--) {
            for (let j = numW; j > -1; j--) {
                var pointActual = new Point(w_ / numW * j, h_ / numH * i, l_ / numL * (k))
                var pointW = new Point(w_ / numW * (j+1), h_ / numH * i, l_ / numL * (k))
                var pointH = new Point(w_ / numW * j, h_ / numH * (i+1), l_ / numL * (k))
                var pointL = new Point(w_ / numW * j, h_ / numH * i, l_ / numL * (k+1))
                c.strokeStyle = 'black';
                c.fillStyle = 'black';   
                c.lineWidth = 1;
                if (k < numL) {
                    if (j <= numW/2 && i <= numH/2){
                        if (!rubik.includes(j + i * numW + k * numW * numH)) {
                            c.beginPath();
                            c.moveTo(computeX(pointActual), computeY(pointActual));
                            c.lineTo(computeX(pointL), computeY(pointL));
                            c.stroke();
                        }
                    }
                    if (j > numW/2 && i <= numH/2){
                        if ((!rubik.includes((j-1) + i * numW + k * numW * numH))) {
                            c.beginPath();
                            c.moveTo(computeX(pointActual), computeY(pointActual));
                            c.lineTo(computeX(pointL), computeY(pointL));
                            c.stroke();
                        }
                    }
                    if (j <= numW/2 && i > numH/2){
                        if (!rubik.includes(j + (i-1) * numW + k * numW * numH)) {
                            c.beginPath();
                            c.moveTo(computeX(pointActual), computeY(pointActual));
                            c.lineTo(computeX(pointL), computeY(pointL));
                            c.stroke();
                        }
                    }
                    if (j > numW/2 && i > numH/2){
                        if (!rubik.includes((j-1) + (i-1) * numW + k * numW * numH)) {
                            c.beginPath();
                            c.moveTo(computeX(pointActual), computeY(pointActual));
                            c.lineTo(computeX(pointL), computeY(pointL));
                            c.stroke();
                        }
                    }
                }
                // drawing horizontal lines
                if (j < numW){
                    c.beginPath();
                    c.moveTo(computeX(pointActual), computeY(pointActual));
                    c.lineTo(computeX(pointW), computeY(pointW));
                    c.stroke();
                }
                // draw vertical lines
                if (i < numH) {
                    c.beginPath();
                    c.moveTo(computeX(pointActual), computeY(pointActual));
                    c.lineTo(computeX(pointH), computeY(pointH));
                    c.stroke();
                }
                // Drawing point - size scales based on z axis
                c.beginPath();
                c.arc(computeX(pointActual), computeY(pointActual), 2 * (1-(k/2/numL)**2), 0, 2 * Math.PI);
                c.fill();
                // draw horizontal lines

            }
        }
    }
}
// scale x between -w and w
function scaleX(x) {
    return 2 * x - w_;
}
// scale y between -h and h
function scaleY(x) {
    return 2 * x - h_;
}
// Computes X position on canvas
function computeX(Point) {
    return (scaleX(Point.x) * d) / (2 * Point.z) + w_ * 0.5;
}
// Computes Y position on canvas
function computeY(Point) {
    return (scaleY(Point.y) * d) / (2 * Point.z) + h_ * 0.5;
}
function draw() {
    c.fillStyle = "white";
    c.fillRect(0, 0, w_, h_);
    drawBox();
}
draw();
fillPartition(slider.value);
drawLattice();
// updates dimensions based on resize
window.addEventListener('resize', function() {
    reDim();
    updateBox();
    draw();
    slider.max = w_ * h_ * l_ / (dMax*dMax*dMax) - 1;
    slider.value = 0;
    output.innerHTML = slider.value;

    fillPartition(slider.value);
    numW = w_ / dMax;
    numH = h_ / dMax;
    numL = Math.min(numH, numW);
    drawLattice();
});