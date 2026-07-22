// Game objects
let bird;
let floor;

// Image assets
let birdMidImg;
let background;
let base;

function preload() {
    birdMidImg = loadImage("assets/yellowbird-midflap.png");
    background = loadImage("assets/background-day.png");
    base = loadImage("assets/base.png");
}

function setup() {
    new Canvas(400, 600);

    world.gravity.y = 10;


    // Create bird sprite
    bird = new Sprite();
    bird.img = birdMidImg;
    bird.width = 30;
    bird.height = 30;
    bird.mass = 2;
    bird.drag = 0.02;
    bird.bounciness = 0.5;
    bird.collider = "dynamic";

    // Create floor sprite
    floor = new Sprite();
    floor.img = base;
    floor.width = width;
    floor.height = 125;
    

}

function draw() {
    image(background, 0, 0, width, height); // (image, x, y, width, height)
}