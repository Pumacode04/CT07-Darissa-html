// Variables
let background;
let fruitGroup; // group for whole fruits
let fruitTypes  = []; // store fruit image objects
let trail;
let fruitHalves; // new group 

function preload() {
    // Load image
    background = loadImage("assets/dojobackground.png");
    // decalre the peach object
    let peach = {
        whole: loadImage("assets/peachwhole.png"),
        half1: loadImage("assets/peachhalf.png"),
        half2: loadImage("assets/peachhalf2.png"),
    }

    // declare the watermelon object
    let watermelon = {
        whole: loadImage("assets/watermelonwhole.png"),
        half1: loadImage("assets/watermelonhalf.png"),
        half2: loadImage("assets/watermelonhalf.png"),
    }
   
    // store the fruit objects into an array
    fruitTypes = [peach, watermelon];

}

function setup() {
    // Create canvas
    new Canvas(800, 600);
    world.gravity.y = 10;
    fruitGroup = new Group();
  
}

function draw() {
    clear();
    image(background, 0, 0, width, height); // image(image, x, y, width, height)

    // Debug text
    fill("#dadada") // Text colour
    textSize(50);
    text("frameCount:"+ frameCount, 10, 40);

    // call spawnFruit function
    if (frameCount % 120 == 0) {
        spawnFruit();
    }

    // handle slicing when mouse is pressed
    if (mouse.pressing()){
        trail = new Sprite(mouse.x, mouse.y, 7);
        trail.collider = 'none';
        trail.color = 'red';
        trail.life = 10;
    }

    sliceFruit(); // add this line to call function

    // check if any fruit is sliced by the mouse
    function sliceFruit(){
        for (let fruit of fruitGroup) {
            if (fruit.sliced){
                continue; // skip already sliced fruits
            }

            // calculate distance between mouse and fruit
            let d = dist(mouse.x, mouse.y, fruit.x, fruit.y);

            if (d < ((fruit.d / 2) + 5)) {
                fruit.sliced = true; // prevent repeat slicing

                fruit.remove(); // remove whole fruit

                break; // only slice one fruit per frame
            }
        }
    }
}

function spawnFruit(){
        let fruitData = random(fruitTypes); // pick one at random
        let randomX = random(300, 500); // random X to spawn. Rem that canvas width is 800
        let fruit = new fruitGroup.Sprite(randomX, height+20, 40); // spawn at bottom
        fruit.image = fruitData.whole; // load image for whole
        fruit.type = fruitData; // store reference to its type i.e. peach or watermelon
        fruit.vel.y = random(-10, -14); // shoot upward at random velocity. Adjust to try!
        fruit.vel.x = random(-2, 2); // sideways curve. Adjust to try!
        fruit.friction = 0; // no friction
    }

