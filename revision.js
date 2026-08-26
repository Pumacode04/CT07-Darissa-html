//declare for loop
// (let i=0; i<5, i++)

score =95
if(score <80){
    print(fail)
}
else{
    print( pass)
}
score = 0
while(score<3){
    print(score)
    score++;
}
//create array ley arrayname = ["b","se"]

function setup(){
    console.log("hi")
}
function draw(){
    console.log("bye")
}
let floor;
//spawn sprite when click
function setup(){
  new Canvas(800,600);
  world.gravity.y = 10;
 
  floor = new Sprite(0,600,800,30,"static");

}
function draw(){
    background(0);
    if(mouse.presses()){
        let ball = new Sprite(mouse.x,mouse.y,30,"dynamic");
        ball.collider ="dynamic";
        ball.bounciness = 0.3;
    }
}