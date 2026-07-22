// Game Objects
let bird;
let floor;

//Image assets
let birdMidImg;
let background;
let base;


function preload() {
    bird = loadImage("assets/yellowbird-midflap.png");
    background = loadImag("assets/background-day.png");
    base = loadImage("assets/base.png");
}

function setup() {
    new Canvas(400, 600);
    
    // Create bird sprite
    bird = new Sprite();
    bird.img = birdMidImg;
    bird.width = 30;
    bird.height = 30;
}

function draw() {
  image(background, 0,0, width, height); // (image, x, y, height)
}