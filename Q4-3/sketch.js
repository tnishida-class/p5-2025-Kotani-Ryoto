// たくさん出てくるアニメーション
let balls;
let targets; // 追加（ボールを当てる的）

function setup(){
  createCanvas(windowWidth, windowHeight);
  balls = [];
  targets = [];
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);

  // 的のアニメーション（注意：追加しないと何も起きない）
  for(let i = 0; i < targets.length; i++){
    let t = targets[i];
    fill(0);
    ellipse(t.x, t.y, t.size);
    t.x += t.vx;
    t.y += t.vy;
    t.size += 2;
  }

  // ボールのアニメーション
  for(let i = 0; i < balls.length; i++){
    let b = balls[i];
    fill(255);
    ellipse(b.x, b.y, b.size);
    b.x += b.vx;
    b.y += b.vy;
  }

  // 画面外に出たボールを配列から削除する
  const ballsInCanvas = []; // 画面内のボールを一時的に保持する配列
  for(let i = 0; i < balls.length; i++){
    let b = balls[i];
    if(b.x > 0 && b.x < width && b.y > 0 && b.y < height){ // 画面内
      ballsInCanvas.push(b);
    }
  }
  balls = ballsInCanvas; // 画面内のボールだけを残す

  // 補足：filter 関数を使うともっと簡単に書ける
  // balls = balls.filter(insideCanvas);

  if(frameCount % 20 === 0) { // 20フレームごとに新しい的を追加する
    // BLANK[1] 新しい的オブジェクトを作成して targets 配列に追加しよう
    //tの初期条件を求め、それをtarget配列に代入
    const t = {
      x: width/2,
      y: height/2,
      size: 5,
      vx: random(-6,6),
      vy: random(-6,6),
    };
    targets.push(t);
  }

  // ボールに当たった or 大きくなりすぎた的を配列から削除する
  const activeTargets = []; // 生き残った的を一時的に保持する配列
  for(let i = 0; i < targets.length; i++){
    let t = targets[i];
    if(t.size < 200){ // 大きくなりすぎていない
      let hit = false;
      for(let j = 0; j < balls.length; j++){ // すべてのボールと衝突判定
        let b = balls[j];
        // BLANK[2]
        const dx = b.x - t.x;
        const dy = b.y - t.y;
        //dは的とボールの中心間の距離の二乗（三平方の定理）
        const d = dx * dx + dy * dy;
        //radiusSumとは的とボールの半径の和（b.size,t.sizeはそれぞれの直径）
        const radiusSum = (b.size + t.size) / 2;
        if(d<radiusSum*radiusSum){
          hit = true;
          //ここでbreakを使うのは一回でも的とボールがヒットしたら消えるためこれ以上衝突を考える必要がない
          break;
        }
      }
      if(!hit) activeTargets.push(t); // 衝突していなければ生き残る
    }
  }
  targets = activeTargets; // 生き残った的だけを残す
}

function mouseDragged(){
  const dx = mouseX - pmouseX;
  const dy = mouseY - pmouseY;
  if(mag(dx, dy) > 5){
    const b = { x: mouseX, y: mouseY, size: 20, vx: dx, vy: dy };
    balls.push(b);
  }
}

function insideCanvas(b) {
  return b.x > 0 && b.x < width && b.y > 0 && b.y < height;
}