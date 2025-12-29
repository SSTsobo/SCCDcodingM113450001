function setup() {
  createCanvas(1800, 500);
  background(0);
  noCursor();
}

function draw() {}

function mouseMoved() {
  let count = int(random(5, 10));

  let spread = 180;

  for (let i = 0; i < count; i++) {
    let x = mouseX + random(-spread, spread);
    let y = mouseY + random(-spread, spread);

    let outerR = random(6 * 1.8, 32 * 1.8);
    let innerR = outerR * random(0.3, 0.6);

    fill(random(100, 255), random(100, 255), random(100, 255), 220);
    stroke(255);
    strokeWeight(0.6);

    drawStar(
      x + random(-100, 100),
      y + random(-100, 100),
      innerR + random(-20, 10),
      outerR + random(-20, 10),
      4
    );
  }
}

function drawStar(cx, cy, innerRadius, outerRadius, npoints) {
  push();
  translate(cx, cy);
  beginShape();

  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;

  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = cos(a) * outerRadius;
    let sy = sin(a) * outerRadius;
    vertex(sx, sy);

    sx = cos(a + halfAngle) * innerRadius;
    sy = sin(a + halfAngle) * innerRadius;
    vertex(sx, sy);
  }

  endShape(CLOSE);
  pop();
}
