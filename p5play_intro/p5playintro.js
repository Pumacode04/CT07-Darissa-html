function setup() {
  // Set up the canvas
  new Canvas(800, 400);
  background(250); //background color

  //ball = new Sprite(400, 200, 300, 300);

  // Basic shape testing
  // write your codes here
 
  // End Basic shape testing
  fill("#fff700") //Color in shape
  stroke("black") //Outline
  strokeWeight(7) //Outline thickness

  circle(400, 200, 100) //x, y, diameter
  rect(500, 200, 100, 200) // x, y, width, height
  triangle(100, 100, 200, 50, 150, 100) // x1, y1, x2, y2, x3, y3

   // Create a bouncing ball sprite
   // write your codes here

}

function draw() {
  // write your codes here
}