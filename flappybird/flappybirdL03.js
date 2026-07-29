// Game objects
let bird;
let floor;
let pipeGroup;
let topPipe, bottomPipe;
let gameoverLabel;
let startScreenLabel;

// Image assets
let birdMidImg;
let birdUpImg;
let birdDownImg;
let background;
let base;
let pipe;
let gameoverImg;
let startScreenImg;

function preload() {
    birdMidImg = loadImage("assets/yellowbird-midflap.png");
    birdUpImg = loadImage("assets/yellowbird-upflap.png");
    birdDownImg = loadImage("assets/yellowbird-downflap.png");
    background = loadImage("assets/background-day.png");
    base = loadImage("assets/base.png");
    pipe = loadImage("assets/pipe-green.png");
    gameoverImg = loadImage("assets/gameover.png")
    startScreenImg = loadImage("assets/message.png");
}

function setup() {
    new Canvas(400, 600);

    world.gravity.y = 10;

    // Debug text
    fill("#fc0303") //Text colour
    textSize(14);


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
    floor.collider = "static" // Colliadble but will not move

    pipeGroup = new Group(); // new group for pipes
}

let startGame = false; // flag is false at the start

function draw() {
    image(background, 0, 0, width, height); // (image, x, y, width, height)

    //at start of game, press space or mouse to start
    if (kb.presses("space") || mouse.presses())
        startGame = true;
    startScreenLabel.visible = false;

    //of startGame flag is true, then run all the other code
    if (startGame){
        
    }

    
    
}

function spawnPipePair() {
  let gap = 50;
  let midY = random(250, height - 250); // random(min, max);

  // create the bottom pipe sprite
  bottomPipe = new Sprite(bird.x + 400, midY + gap / 2 + 200, 52, 320, 'static')
  bottomPipe.img = pipe;

  pipeGroup.add(bottomPipe);
  pipeGroup.layer = 0; // go behind other sprites

  topPipe = new Sprite(bird.x + 400, midY - gap / 2 - 200, 52, 320, 'static');
  topPipe.img = pipe;
  topPipe.rotation = 180;

  pipeGroup.add(topPipe);
}