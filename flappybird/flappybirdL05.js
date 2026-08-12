// Game objects
let bird;
let floor;
let pipeGroup;
let topPipe, bottomPipe;
let gameoverLabel;
let startScreenLabel;

// scoring
let score = 0;
let numberImages = []; // store number/score images
let scoreDigits; // group for storing the different numbers

// Image assets
let birdMidImg;
let birdUpImg;
let birdDownImg;
let background;
let base;
let pipe;
let gameoverImg;
let startScreenImg;
let startGame = false; // flag is false at the start

// Sound assets
let flapSound, pointSound, failSound; // Declare audio assets

function preload() {
    birdMidImg = loadImage("assets/yellowbird-midflap.png");
    birdUpImg = loadImage("assets/yellowbird-upflap.png");
    birdDownImg = loadImage("assets/yellowbird-downflap.png");
    background = loadImage("assets/background-day.png");
    base = loadImage("assets/base.png");
    pipe = loadImage("assets/pipe-green.png");
    gameoverImg = loadImage("assets/gameover.png")
    startScreenImg = loadImage("assets/message.png");

    // use a loop to load assets into the array
    for (let i = 0; i < 10; i++){
        numberImages[i] = loadImage('assets/'+ i + '.png');

    flapSound = createAudio("assets/sfx_wing.mp3");
    pointSound = createAudio("assets/sfx_point.mp3");
    failSound = createAudio("assets/sfx_die.mp3");
    }
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
    bird.collider = "static"; // Collidable, movable and affected by physics
    bird.visible = false;
    // Create floor sprite
    floor = new Sprite();
    floor.img = base;
    floor.width = width;
    floor.height = 125;
    floor.x = width / 2;
    floor.y = height - 20;
    floor.collider = "static" // Colliadble but will not move

    pipeGroup = new Group(); // new group for pipes
      startScreenLabel = new Sprite(width/2, height/2, 50, 50, 'none');
    startScreenLabel.img = startScreenImg; 

    //setup group for score
    scoreDigits = new Group();
    scoreDigits.collider = 'none';
    scoreDigits.layer = 1000;
}



function draw() {
    image(background, 0, 0, width, height); // (image, x, y, width, height)

        //set up the start message and display
  

    //at start of game, press space or mouse to start
    if (kb.presses("space") || mouse.presses()){
        startGame = true;
        startScreenLabel.visible = false;
        bird.visible = true;
        bird.collider = 'dynamic';
    }
    //of startGame flag is true, then run all the other code
    if (startGame){
        if (kb.presses("space") || mouse.presses("left")) {
        bird.vel.y = -5; // Up velocity
        bird.sleeping = false; // Make sure no sprite is idle
        flapSound.play();
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

        // increase score if pipe passed
        for (let pipe of pipeGroup) {
            // center pos + half pipe width = right edge pos
            let pipeRightEdge = pipe.x + pipe.w / 2;

            // centre pos - half of bird width = left edge pos
            let birdLeftEdge = bird.x - bird.w / 2;

            // compare x-coordinates of player and pipes
            if (pipe.passed == false && pipeRightEdge < birdLeftEdge) {
                pipe.passed = true;
                pointSound.play();
                score++;
            }
        }

        //End Game on Collision
        // note that this is checking collision against the group
        if (bird.collides(pipeGroup) || bird.collides(floor) || bird.y < -30) {
        failSound.play();
        gameoverLabel = new Sprite(width/2, height/2, 192, 42, 'none');
        gameoverLabel.img = gameoverImg;
        gameoverLabel.layer = 100; // make the game over text come to front
        gameoverLabel.x = camera.x;

        noLoop(); // Take note of the case!

        //Use setTimeout to wait 3 seconds before restarting
        setTimeout(() => {
            score = 0;
            startGame = false;

            pipes.removeAll();
            bird.vel.x = 0;
            bird.vel.y = 0;
            bird.rotation = 0;
            bird.collider = 'static';
            bird.y = 200;

            gameoverLabel.remove();
            startMessageLabel.visible = true;
            

        },3000)
        }
    }

    // call drawScore function. scoreWidth = 24, scoreHeight = 46
    drawScore(width/2, 20, score, 24, 36);

}

function drawScore(x, y, score, digitWidth, digitHeight) {
    // Clear old digit sprites
    scoreDigits.removeAll();

    // make it a string so we can get each digits indivisually rather than a value
    let scoreStr = str(score);

    // let total width taken up by all digits
    let totalWidth = scoreStr.length * digitWidth;

    // starting x coordinates
    let startX = x - totalWidth / 2;

    //loop through each digit
    for (let i = 0; i < scoreStr.length; i++) {
        
        // gets number digit from the score string (e.g. "4" or "2")
        let digit = int(scoreStr[i]);

        //x-position of this digit, next character will move to right..
        let xPos = startX + i * digitWidth;

        // create a sprite the size of the digit image
        let digitSprite = new scoreDigits.Sprite(xPos, y, digitWidth, digitHeight);

        // get the digit image fromthe array based on placement order which corresponds to the digit
        digitSprite.img = numberImages[digit];
    }

    // call function to keep score centered oon camera
    moveGroup(scoreDigits, camera.x, 24);
}

function moveGroup(group, targetX, spacing) {
    // E.g. 3 digits -> 2 gaps -> (3 - 1) * 24 = 48px
    let totalWidth = (group.length -1) * spacing;

    // Find Left-most X position
    // Shifts the stariing point left, so the entire group has been centered
    let startX = (targetX - totalWidth/2);

    // Place each sprite in the group
    for (let i = 0; i < group.length; i++) {
        group[i].x = startX + i * spacing;
    }
}

function spawnPipePair() {
  let gap = 50;
  let midY = random(250, height - 250); // random(min, max);

  // create the bottom pipe sprite
  bottomPipe = new Sprite(bird.x + 400, midY + gap / 2 + 200, 52, 320, 'static');
  bottomPipe.img = pipe;

  pipeGroup.add(bottomPipe);
  pipeGroup.layer = 0; // go behind other sprites

  // create the top pipe sprite
  topPipe = new Sprite(bird.x + 400, midY - gap / 2 - 200, 52, 320, 'static');
  topPipe.img = pipe;
  topPipe.rotation = 180;

  // Add to one pipe per pair (top or bottom)
  topPipe.passed = false; // Add this property to topPipe

  pipeGroup.add(topPipe);
}

//good job :3