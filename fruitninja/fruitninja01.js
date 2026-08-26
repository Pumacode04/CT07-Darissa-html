// Variables
let background;
let peace;
let watermelon;

let fruitGroup; // group for whole fruits
let fruitTypes  = []; // store fruit image objects

function preload() {
    // Load image
    background = loadImage("assets/dojobackground.png");
    // decalre the peach object
    let peach = {
        whole : loadImage("assets/peachwho")
    }
   
}

function setup() {
    // Create canvas
    new Canvas(800, 600);
    world.gravity.y = 10;

  
}

function draw() {
    clear();
    image(background, 0, 0, width, height); // image(image, x, y, width, height)

    // Debug text
    fill("#dadada") // Text colour
    textSize(50);
    text("frameCount:"+ frameCount, 10, 40);

    if (frameCount % 60 == 0) {
        spawnPeach();
    }
}

