// ------------------------------
// 3-2に加えて、コイン・敵の追加、ゲームオーバーの追加、取得コイン枚数の追加
// ------------------------------

let x, y;  //プレイヤー（円）の中心座標
let vx, vy;  //プレイヤーの速度
let size;  //プレイヤーの現在の直径
const g = 1;  //重力加速度（y方向に加える値）

//コイン取得数 //
let score = 0;  //取ったコインの数（右上の表示）

//◆◆◆初期画面のフラグ◆◆◆//
let gameStart = false;

// 最小サイズの基準
let minSize;  //「small」状態の基準となるサイズ。再スタート時に現在の「size」を保存している
let gameOver = false;  //ゲームオーバーかどうか

// コイン
let coin = {
  x: 0,
  y: 0,
  r: 25,  //コインの直径
  visible: false,
  timer: 0,
  maxTime: 180,  //コインが出現してから消えるまでの秒数（3秒）
  used: false  //usedは、同じコインで二度増加しないようにするフラグ
};

// 敵
let enemy = {
  x: 100,
  y: 350,
  w: 40,  //敵の幅
  h: 40,  //敵の高さ
  vx: 3  //敵の左右移動
};

function setup(){
  createCanvas(windowWidth, windowHeight);
  resetGame();  //ゲーム状態を初期化
}

function resetGame(){
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 0;

  size = height * 0.1;
  minSize = size;  //minSizeに初期sizeを保存して、「small」の基準とする

  enemy.x = 100;
  enemy.y = height * 0.8 - enemy.h;  //敵を地面「height * 0.8」の位置に合わせる
  enemy.vx = 3;

  gameOver = false;
  score = 0;   //リセット時にスコアも0に戻す

  spawnCoin();  //最初のコインを出現させる
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function spawnCoin(){
  const groundY = height * 0.8;  //groundYは地面のy座標
  const maxReachY = groundY - 200;  //プレイヤーのジャンプで届く最大の高さ

  coin.x = random(50, width - 50);
  coin.y = random(maxReachY, groundY - 80);  //コインのx、yを「maxRreachY」～「groundY」の範囲にランダムで出現させる→必ずプレイヤーのジャンプで届く

  coin.visible = true;
  coin.timer = coin.maxTime;
  coin.used = false;
}

function draw(){
  if(!gameStart){
    showTitleScreen();
    return;
  }     //◆◆◆初期画面の処理◆◆◆//

  if (gameOver) {
    showGameOver();  //ゲームオーバーなら「showGameOver」を描いて以降の処理をスキップ
    return;
  }

  //背景と地面の描画
  background(160, 192, 255);
  const groundY = height * 0.8;

  // 地面
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  // --- コイン処理 ---
  if(coin.visible){
    fill(255, 204, 0);
    ellipse(coin.x, coin.y, coin.r);

    coin.timer--;
    if(coin.timer <= 0){
      coin.visible = false;
      spawnCoin();
    }

    // 当たり判定
    if(!coin.used){  //同じコインで何度もサイズ・スコアが増えるのを防止
      let d = dist(x, y, coin.x, coin.y);  //dist()は中心間の距離の計算
      if(d < size/2 + coin.r/2){
        size *= 1.2;
        score++;          //コイン取得で1加算
        coin.used = true;
        coin.visible = false;
        spawnCoin();
      }
    }
  }

  //敵描画と移動
  fill(255, 0, 0);
  rect(enemy.x, enemy.y, enemy.w, enemy.h);

  enemy.x += enemy.vx;
  if(enemy.x < 0 || enemy.x + enemy.w > width){
    enemy.vx *= -1;
  }

  // 敵との衝突
  let hit =
    x + size/2 > enemy.x &&
    x - size/2 < enemy.x + enemy.w &&
    y + size/2 > enemy.y &&
    y - size/2 < enemy.y + enemy.h;

  if(hit){
    if(size <= minSize * 1.01){
      gameOver = true;
    } else {
      size = minSize;
    }
  }

  // --- キャラの動き ---
  vx = 0;
  if(keyIsDown(LEFT_ARROW))  vx -= 5;
  if(keyIsDown(RIGHT_ARROW)) vx += 5;

  vy += g;
  if(keyIsDown(" ".charCodeAt(0)) && y >= groundY - size/2){
    vy = -20;  //ジャンプ（速度vy=-20を与える）
  }
  else if(y >= groundY - size/2){  //地面の着地の判定
    y = groundY - size/2;
    vy = 0;
  }

  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  x += vx;
  y += vy;

  size = constrain(size, minSize, height * 0.4);
  x = constrain(x, size/2, width - size/2);  //xが画面外に出ないように制約

  // プレイヤーの描画
  fill(0);
  ellipse(x, y, size, size);

  //スコア表示（右上）
  textSize(32);
  textAlign(RIGHT, TOP);
  fill(255);
  text("Coins: " + score, width - 20, 20);
}


//◆◆◆初期画面の内容◆◆◆//
function showTitleScreen() {
  background(0, 0, 0, 200);
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(255);
  text("COIN JUMP GAME", width / 2, height / 2 - 120);

  textSize(28);
  text("【操作方法】", width / 2, height / 2 - 20);
  text("← → : 移動", width / 2, height / 2 + 20);
  text("SPACE : ジャンプ", width / 2, height / 2 + 60);
  text("コインに触れると大きくなる", width / 2, height / 2 + 100);
  text("敵に当たるとゲームオーバー", width / 2, height / 2 + 140);

  textSize(30);
  fill(255, 200, 200);
  text("Press ENTER to Start", width / 2, height / 2 + 250);
}

//GAME OVER 画面//
function showGameOver() {
  background(0, 0, 0, 200);
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(255, 80, 80);
  text("GAME OVER", width/2, height/2 - 40);

  textSize(30);
  fill(255);
  text("Press ENTER to Retry", width/2, height/2 + 40);

  //ゲームオーバー時にもスコアを表示
  text("Coins: " + score, width/2, height/2 + 100);
}

// --- ゲーム再開（ENTERキー） ---
function keyPressed(){
  if(!gameStart && keyCode === ENTER){
    gameStart = true;
    return;
  }     //◆◆◆ゲーム開始処理を追加◆◆◆//

  if(gameOver && keyCode === ENTER){  //ゲームオーバー時にenterを押すとゲームを初期化
    resetGame();
  }
}