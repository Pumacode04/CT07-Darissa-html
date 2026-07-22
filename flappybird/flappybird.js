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
    bird.mass = 2; // How heavy, heavier = affected ny gravity more
    bird.drag = 0.02; // Air resistance, higher = more resistance
    bird.bounciness = 0.5; // Higher = bouncier
    bird.collider = "dynamic"; // Collidable, movable and affected by physics

    // Create floor sprite
    floor = new Sprite();
    floor.img = base;
    floor.width = width;
    floor.height = 125;
    floor.x = width / 2;
    floor.y = height - 20;
    floor.collider = "static" // Coll

}

function draw() {
    image(background, 0, 0, width, height); // (image, x, y, width, height)
}