const cycle = 100; // 1周期のフレーム数（定数）
let count = 0; // 現在のフレーム数（変数）
let size = 50;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(160, 192, 255);
  count = (count + 1) % cycle;
  if (keyIsPressed) {
    count = (count + 2) % cycle;
  }
  if (count < cycle / 2) {
    size = 50 + cycle - count;
  } else {
    size = 50 + count;
  }
  ellipse(width / 2, height / 2, size, size);
}
