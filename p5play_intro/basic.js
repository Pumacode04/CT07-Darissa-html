function setup() {
  // write your codes here
  new Canvas(800, 400);
  background(250);

  // console.log("Hello");

  // let a = 1;
  // let b = 2;
  // let sum = a + b;
  // console.log("Sum : " + sum);

  // --- Exercise: Area of Triangle ---
  // write your codes here
  // base = 10;
  // height = 5;
  // area = base * height / 2;
  // console.log(area);
  // textSize(25);
  // fill("Red");
  // text("(" + base + "+" + height + ")" + " = " + area, 100, 250);


  // --- Exercise: Sum of first 10 even numbers ---
  // write your codes here
  // let sum = 0
  // let yPos = 50;
  // for (let i = 2; i <= 20; i += 2){
  //   console.log(i);
  //   sum = sum + i;
  //   text(i, 400, yPos);
  // yPos += 20;
  // }
  // console.log(sum);
  // text("Sum : " + sum, 400, yPos);
  // yPos += 20;

  // --- Exercise: Age category classification ---
  // write your codes here
  // age = 16
  // if (age <= 2) {
  //   console.log("Baby")
  // } else if (age <= 4) {
  //   console.log("Nursery")
  // } else if (age <= 6) {
  //   console.log("Kindergarten")
  // } else if (age <= 9) {
  //   console.log("Lower Primary")
  // } else if (age <= 12) {
  //   console.log("Upper Primary")
  // } else if (age <= 16) {
  //   console.log("Secondary")
  // } else {
  //   console.log("Out of secondary!")
  // }

  // --- Exercise: Display odd numbers backward using while loop ---
  // write your codes here
  // num = 19;
  // while (num >= 1) {
  //   console.log(num);
  //   num = num - 2;
  // }
  // --- Exercise: Array operations (groceries) ---
  // write your codes here
  let groceries = ["Cheese Cake", "Burnsun Burner", "Rasberry"];
  groceries.push("Cookies");
  groceries.push("Ice cream");
  groceries.shift(); // remove first item
  groceries.pop(); // remove last item
 // groceries.splice(1, 1); // (num of items to remove, index of that number)
  groceries.splice(1, 1, "Water");

  console.log(groceries);
}

