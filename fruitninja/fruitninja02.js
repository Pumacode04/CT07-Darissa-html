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
        fill("#25b800"); // Text colour
        stroke("#000");
        strokeWeight(20);
        textSize(50);
        textAlign(CENTER, CENTER); // (horizontal, vertical) - LEFT, RIGHT, TOP, BOTTOM, CENTER
        text("Fruit Ninja", width / 2, height / 2); // (string, xpos, ypos)
        // Change to playing state
        if (kb.presses(" ") || mouse.presses()) {
            gameState = "playing";
        }
        return;
    } else if (gameState === "playing") {
        // Gameplay
        // Debug text
        // fill("#dadada") // Text colour
        fill("#25b800");
        textSize(50);
        textAlign(LEFT, CENTER);
        strokeWeight(10); // remove outline
        // text("frameCount:"+ frameCount, 10, 40);
        text("score: " + score, 10, 40);
        fill("#fd0000");
        text("Missed: " + missed, 10, 100);

        // call spawnFruit function every x number of frames
        if (frameCount % 60 == 0) {
            // 60 frames = 1 second
            spawnFruit();
        }

        // handle slicing when mouse is pressed
        if (mouse.pressing()){
            strokeWeight(0);
            trail = new Sprite(mouse.x, mouse.y, 7);
            trail.collider = 'none';
            trail.color = 'red';
            trail.life = 10;
            sliceFruit(); // add this line to call function
        }

        // Check if fruits fall
        missedFruit();

        // Win / Lose condition
        if (score === 10) {}

        return;
    } else if (gameState === "gameOver") {
        // Game Over Screen

        return;
    }
}

// check if any fruit is sliced by the mouse
function sliceFruit(){
    for (let fruit of fruitGroup) {
        if (fruit.sliced){
            continue; // skip already sliced fruits
        }

    // calculate distance between mouse and fruit
    let d = dist(mouse.x, mouse.y, fruit.x, fruit.y);

    // fruit is sliced
    if (d < ((fruit.d / 2) + 5)) {
        fruit.sliced = true; // prevent repeat slicing
        score += 1; // increment score

        const fx = fruit.x; // x coordinate for the sliced food
        const fy = fruit.y; // y coordinate for the sliced food

        fruit.remove(); // remove whole fruit

        splitFruit(fx, fy, fruit.type); // spawn halves

        break; // only slice one fruit per frame
        }
    }
}

function spawnFruit(){
    let fruitData = random(fruitTypes); // pick one at random
    let randomX = random(300, 500); // random X to spawn. Rem that canvas width is 800
    let fruit = new fruitGroup.Sprite(randomX, height+20, 40); // spawn at bottom
    fruit.image = fruitData.whole; // load image for whole

    // Size fix - scaleMod
    fruit.scale = fruitData.scaleMod;

    fruit.type = fruitData; // store reference to its type i.e. peach or watermelon
    fruit.vel.y = random(-10, -14); // shoot upward at random velocity. Adjust to try!
    fruit.vel.x = random(-2, 2); // sideways curve. Adjust to try!
    fruit.friction = 0; // no friction
    fruit.overlaps(allSprites); // disable collision
    fruit.layer = 2; // appear on top of split halves
}

// split a fruit into two halves and animate them
function splitFruit(x, y, fruitData) {
    // create left half
    let left = new fruitHalves.Sprite(x - 10, y, 40, 40);
    left.img  = fruitData.half1;
    left.vel.x = -3; // veer left
    left.vel.y = random(-5, -2);
    left.rotationSpeed = -5;
    left.life = 60; // remove after 30 frames
    left.collider = "dynamic"; // dynamic - affected by gravity and has collision / static - not affected by gravity and has collsion / none - not affected by gravity and no collision
    left.overlaps(allSprites); // disable collision
    left.layer = 1;

    // Size fix - scaleMod
    left.scale = fruitData.scaleMod;

    // create right half
    let right = new fruitHalves.Sprite(x + 10, y, 40, 40);
    right.img = fruitData.half2;
    right.vel.x = 3; // veer right
    right.vel.y = random(-5, -2);
    right.rotationSpeed = 5;
    right.life = 60; // remove after 30 frames
    right.collider = "dynamic"; // dynamic - affected by gravity and has collision / static - not affected by gravity and has collsion / none - not affected by gravity and no collision
    right.overlaps(allSprites); // disable collision
    right.layer = 1;

    // Size fix - scaleMod
    right.scale = fruitData.scaleMod;
}

function missedFruit() {
    // Loop through spawned fruits
    for (let fruit of fruitGroup) {
        // Check if fruit fell below canvas
        if (fruit.y > height + 50) {
            // Delete and increment missed
            fruit.remove();
            missed += 1;
        }
    }
}