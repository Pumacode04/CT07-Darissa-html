// Variables
let background;
let peachWhole;
let watermelonWhole;


function preload() {
    // Load image
    background = loadImage("assets/dojobackground.png");
    peachWhole = loadImage("assets/peachwhole.png");
    watermelonWhole = loadImage("assets/watermelonwhole.png");
}

function setup() {
    // Create canvas
    new Canvas(800, 600);
    world.gravity.y = 10;

    // Sprites

}

function draw() {
    image(background, 0, 0, width, height); // image(image, x, y, width, height)
}