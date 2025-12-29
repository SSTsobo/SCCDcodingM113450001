let z = [];
let x = [];
let y = [];
let dep = 50;

let gifTex;

function preload() {
  gifTex = loadImage("./assets/img/orga.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  for (let i = 0; i < 10; i++) {
    z[i] = random(-1000, 1000);
    x[i] = random(-width / 2, width / 2);
    y[i] = random(-height / 2, height / 2);
  }
}

function draw() {
  background(255);
  lights();
  ambientLight(0, 0, 0);
  orbitControl();

  for (let i = 0; i < 10; i++) {
    z[i] += 10;
    if (z[i] > 1000) {
      z[i] = -1000;
    }

    push();
    translate(x[i], 0, z[i]);

    texture(gifTex);
    noStroke();

    plane(400, 400);

    pop();
  }
}
