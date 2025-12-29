const MAX_PARTICLES = 1800;
let particles = [];

function setup() {
  createCanvas(500, 1000);
  for (let i = 0; i < MAX_PARTICLES; i++) {
    particles.push(new Particle(i));
  }
}

function draw() {
  background(100);
  for (const p of particles) p.update();
}

class Particle {
  constructor(id) {
    this.id = id;
    this.r = random(0.8, 2.8);
    this.m = this.r * 0.1;
    this.driftSeed = random(1000);

    this.resetToTop(random(width), random(-height, 0));
  }

  resetToTop(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-0.2, 0.2), random(0.2, 1.2));
    this.accel = createVector(0, 0);
  }

  update() {
    this.accel.set(0, 0);

    this.applyGravity();
    this.applyDrift();
    this.repelFromMouse();
    this.applyFriction();
    this.velocity.add(this.accel);
    this.position.add(this.velocity);

    this.wrapOrRespawn();
    this.display();
  }

  applyGravity() {
    this.accel.y += 0.015 + this.m * 0.002;
  }

  applyDrift() {
    const t = frameCount * 0.01;
    const wind = (noise(this.driftSeed + t) - 0.5) * 0.06;
    this.accel.x += wind;
  }

  repelFromMouse() {
    const mouse = createVector(mouseX, mouseY);
    const dir = p5.Vector.sub(this.position, mouse);
    const d = dir.mag();

    const influence = 100;
    if (d < influence && d > 0.0001) {
      dir.normalize();

      let strength = 1.0 - d / influence;
      strength *= strength;

      dir.mult(strength * 0.25);
      this.accel.add(dir);
    }
  }

  applyFriction() {
    this.velocity.mult(0.995);
  }

  wrapOrRespawn() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;

    if (this.position.y > height + this.r) {
      this.resetToTop(random(width), random(-20, -2));
    }
  }

  display() {
    noStroke();
    fill(220);
    circle(this.position.x, this.position.y, this.r * 2);
  }
}
