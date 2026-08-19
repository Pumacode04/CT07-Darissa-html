// Variables
let background;


function preload() {
    // Load image
    background = loadImage("assets/dojobackground.png");
}

function setup() {
    // Create canvas
    new.Canvas(800, 600);
}

function draw() {
    image(background)
}