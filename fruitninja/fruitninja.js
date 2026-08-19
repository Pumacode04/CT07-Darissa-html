// Variables
let background;
let peace;
let watermeleon;

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
    peach = new Sprite;
    peach.img = peachWhole;
    peach.width = 50; // How heavy, heavier = affected by gravity more
    peach.height = 50; // Air resistance, higher = more resistance
    peach.mass = 2; 
    peach.drag = 0.02;
    peach.collider = "dynamic";
}

function draw() {
    image(background, 0, 0, width, height); // image(image, x, y, width, height)
}