function setup() {
  // write your codes here
  new Canvas(800, 400);
  background(250);

  console.log("Hello");

  let a = 1;
  let b = 2;
  let sum = a + b;
  console.log("Sum : " + sum);

  // --- Exercise: Area of Triangle ---
  // write your codes here
  base = 10;
  height = 5;
  area = base * height / 2;
  console.log(area);
  textSize(25);
  fill("Red");
  text("(" + base + "+" + height + ")" + " = " + area, 100, 250);


  // --- Exercise: Sum of first 10 even numbers ---
  // write your codes here
  for (let i = 0; i < 10; i++){
    console.log(i);
  }
  // --- Exercise: Age category classification ---
  // write your codes here

  // --- Exercise: Display odd numbers backward using while loop ---
  // write your codes here

  // --- Exercise: Array operations (groceries) ---
  // write your codes here
}

