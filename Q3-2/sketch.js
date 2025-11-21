// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
const g = 1;

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  vx = 0
    // キャラクターの左右移動
  if(keyIsDown(LEFT_ARROW)){ vx -= 5; }
  if(keyIsDown(SHIFT) && keyIsDown(LEFT_ARROW)){vx -= 5}  //上のifと両方が適用される
  if(keyIsDown(RIGHT_ARROW)){ vx += 5; }
  if(keyIsDown(SHIFT) && keyIsDown(RIGHT_ARROW)){vx += 5}  //上のifと両方が適用される


    // 重力とジャンプ
  vy += g;

  if(keyIsDown(" ".charCodeAt(0)) && y >= groundY - size/2){
    vy = -20;   //下向きが正
  }

  else if(y >=groundY - size/2){
    y = groundY - size/2
    vy = 0;
  }

    // 速くなりすぎないように制限
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

    // 位置を更新
  x += vx;
  y += vy;

    // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
}
