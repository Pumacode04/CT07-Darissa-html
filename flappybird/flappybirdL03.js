// Game objects
let bird;
let floor;
let pipeGroup;
let topPipe, bottomPipe;
let gameOverLabel;

// Image assets
let birdMidImg;
let birdUpImg;
let birdDownImg;
let background;
let base;
let pipe;
let gameOverImg;

function preload() {
    birdMidImg = loadImage("assets/yellowbird-midflap.png");
    birdUpImg = loadImage("assets/yellowbird-upflap.png");
    birdDownImg = loadImage("assets/yellowbird-downflap.png");
    background = loadImage("assets/background-day.png");
    base = loadImage("assets/base.png");
    pipe = loadImage("assets/pipe-green.png");
    gameOverImg = loadImage("assets/gameover.png")
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

function draw() {
    image(background, 0, 0, width, height); // (image, x, y, width, height)

    if (kb.presses("space" || mouse.presses("left"))) {
        bird.vel.y = -5; // Up velocity
        bird.sleeping = false; // Make sure no sprite is idle
    }

    if (bird.vel.y < -1) {
        bird.img = birdUpImg; // flying around
        bird.rotation = -30; // rotate up
    }
    else if (bird.vel.y < 1) {
        bird.img = birdDownImg; // falling
        bird.rotation = 30; // rotate down
    }
    else{
        bird.img = birdMidImg; // neutral
        bird.rotation = 0;
    }

    text("vel.y:" + bird.vel.y.toFixed(2), 10, 20); // (text, x, y)
    text("isMoving:" + bird.isMoving, 10, 40);
    text("sleeping:"+ bird.sleeping, 10, 60);

    if (frameCount === 1) {
        spawnPipePair(); // call the function
    }

    // make the bird move "forward"
    bird.x += 3; // make the bird move forward
    camera.x = bird.x; // "lock" the camera pos to the bird.x pos
    floor.x = bird.x; // "locl"the floor pos to the bird.x pos

    if (frameCount % 90 === 0){
        spawnPipePair(); // spawn pipe every 1.5 seconds
    }

    //remove off the screen pipes
    for (let pipe of pipeGroup){
        if (pipe.x < -50){
            pipe.remove();
        }
    }

    //End Game on Collision
    // note that this is checking collision against the group
    if (bird.collides(pipeGroup) || bird.collides(floor)) {
    gameOverLabel = new Sprite(width/2, hieght/2, 192, 42, 'none');
    
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