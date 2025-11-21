// 小手調べ
function setup(){
  createCanvas(100, 100);
  for(let i = 0; i < 10; i++){
    let size = (i + 1) * 10;
    noFill();
    if(i < 5){
      stroke(0, 0, 255); // 青
    } else {
      stroke(255, 0, 0); // 赤
    }
    ellipse(50, 50, size, size);
  }
}

