function setup(){
    createCanvas(600, 400);
    background(220);
}

function draw(){
    fill(255, 0, 0);
    ellipse(300,200,200,200);

    for (let i = 0; i < 5; i++) {
        console.log(i)
    }
}

// green : 4efc03. Red : fc0000. Yellow : ffcc000. Blue: 00ccff