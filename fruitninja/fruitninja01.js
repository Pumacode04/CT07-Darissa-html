// Variables
let background;
let peace;
let watermelon;

let peachWhole;
let watermelonWhole;

function preload() {
    // Load image
    background = loadImage("assets/dojobackground.png");
   
}

function setup() {
    // Create canvas
    new Canvas(800, 600);
    world.gravity.y = 10;

    // Sprites
    watermelon = new Sprite;
    watermelon.img = watermelonWhole;
    watermelon.width = 115;
    watermelon.height = 115;
    watermelon.scale = watermelon.width / watermelon.width;
    watermelon.mass = 2; // How heavy, heavier = affected by gravity more
    watermelon.drag = 0.02; // Air resistance, higher = more resistance
    watermelon.collider = "dynamic"; // Collidable, movable and affected by physics

    // Group
    peachGroup = new Group();
}

function draw() {
    image(background, 0, 0, width, height); // image(image, x, y, width, height)

    // Debug text
    fill("#dadada") // Text colour
    textSize(50);
    text("frameCount:"+ frameCount, 10, 40);

    if (frameCount % 60 == 0) {
        spawnPeach();
    }
}

function spawnPeach() {
    // Create peach sprite
    peach =  new peachGroup.Sprite();
    peach.img = peachWhole;
    peach.width = 100;
    peach.height = 100;
    peach.scale = peach.width / peachWhole.width;
    peach.mass = 2; // How heavy, heavier = affected by gravity more
    peach.drag = 0.02; // Air resistance, higher = more resistance
    peach.collider = "dynamic"; // Collidable, movable and affected by physics
}