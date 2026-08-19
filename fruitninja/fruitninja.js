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
    peach.width = 50;
    peach.height = 50;
    peach.scale = peach.width / peachWhole.width;
    peach.mass = 2; // How heavy, heavier = affected by gravity more
    peach.drag = 0.02; // Air resistance, higher = more resistance
    peach.collider = "dynamic"; // Collidable, movable and affected by physics

    watermelon = new Sprite;
    watermelon.img = watermelonWhole;
    watermelon.width = 65;
    watermelon.height = 65;
    waterleon.scale = watermelon.width / watermelon.width;
    watermelon.mass = 2; // How heavy, heavier = affected by gravity more
    watermelon.drag = 0.02; // Air resistance, higher = more resistance
    watermelon.collider = "dynamic"; // Collidable, movable and affected by physics
}

function draw() {
    image(background, 0, 0, width, height); // image(image, x, y, width, height)
}