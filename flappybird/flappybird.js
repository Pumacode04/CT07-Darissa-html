// Game Objects
let bird;
let floor;

//Image assets


function preload() {
    let bird = loadImage("assets/yellowbird-midflap - midflap.png");
let background = loadImgae("assets/background-day.png");
let base = loadImage("flappybird/assets/base.png");
}

function setup() {
    new Canvas(400, 600);
    
    bird = new Sprite();
}

function draw() {

}