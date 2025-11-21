// 折れ線グラフ
function setup(){
  createCanvas(400, 400);
  background(240);

  // 配列をランダムに初期化する
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }

  // 横線を引く
  const n = 10;
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }

  // ここからが本番
  fill(0);
  const dx = width / scores.length;
  let px, py; // 線を引くために一つ前の点を覚えておく変数
  for(let i = 0; i < scores.length; i++){
    px = i * dx + 15;
    py = height - (height*scores[i]/100);
      // pxとpy：一個前の点
    x = (i+1) * dx + 15;
    y = height - (height*scores[i+1]/100);
      // xとy：現在の点

    stroke(0);   // 点の色：黒
    strokeWeight(8);   // 点の大きさ
    point(px,py);
    point(x,y);

    stroke(0);   // 黒色の線
    strokeWeight(2);   // 線の太さ
    line(px,py,x,y);
  }
}
