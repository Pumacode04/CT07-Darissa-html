// Variables
let background;
let fruitGroup; // group for whole fruits
let fruitTypes  = []; // store fruit image objects
let trail;
let fruitHalves; // new group for sliced halves
let score = 0; // player's score
let missed = 0;
let gameState = "start"; // "start", "playing", "gameOver"

function preload() {
    // Load image
    background = loadImage("assets/dojobackground.png");
    // decalre the peach object
    let peach = {
        whole: loadImage("assets/peachwhole.png"),
        half1: loadImage("assets/peachhalf.png"),
        half2: loadImage("assets/peachhalf2.png"),

        //Add scaleMod
        scaleMod: 1,
    }

    // declare the watermelon object
    let watermelon = {
        whole: loadImage("assets/watermelonwhole.png"),
        half1: loadImage("assets/watermelonhalf.png"),
        half2: loadImage("assets/watermelonhalf.png"),

        //Add scaleMod
        scaleMod: 1,
    }

    // declare the kiwi object
    let kiwi = {
        whole: loadImage("assets/kiwi1.png"),
        half1: loadImage("assets/kiwi4.png"),
        half2: loadImage("assets/kiwi4.png"),

        //Add scaleMod
        scaleMod: 2,
    }

    // declare the kiwi object
    let orange = {
        whole: loadImage("assets/orange1.png"),
        half1: loadImage("assets/orange2.png"),
        half2: loadImage("assets/orange2.png"),

        //Add scaleMod
        scaleMod: 2,
    }

    // declare the kiwi object
    let strawberry = {
        whole: loadImage("assets/strawberry1.png"),
        half1: loadImage("assets/strawberry3.png"),
        half2: loadImage("assets/strawberry3.png"),

        //Add scaleMod
        scaleMod: 2,
    }
    
    // store the fruit objects into an array
    fruitTypes = [peach, watermelon, kiwi, orange, strawberry];
}

function setup() {
    // Create canvas
    new Canvas(800, 600);
    world.gravity.y = 10;
    fruitGroup = new Group();
  
    fruitHalves = new Group(); // group for fruit halves
}

function draw() {
    clear();
    image(background, 0, 0, width, height); // image(image, x, y, width, height)

    // Draw depending on gameState\
    if (gameState === "start") {
        // Start Menu

        return;
    } else if (gameState === "playing") {
        // Gameplay
        

        return;
    } else if (gameState === "gameOver") {
        // Game Over Screen

        return;
    }
}