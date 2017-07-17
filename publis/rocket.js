// Code goes here
let stage;
let bitmap;
function init() {
	createjs.MotionGuidePlugin.install();
  stage = new createjs.Stage("myCanvas");
  var circle = new createjs.Shape();
	trail = new createjs.Shape();
  circle.graphics
  .beginLinearGradientFill(["#4A148C","#3F51B5","#00BFA5"], [0, .2, 1], 0, 0, 0, 600)
  .drawRect(0, 0, 600, 600);
  addRocket();
	stage.addChild(circle);
	stage.update();
	createjs.Ticker.setFPS(60);
  addRocket();
  createjs.Ticker.addEventListener("tick", ()=>{
		stage.update();
	});
	createjs.Tween.get(bitmap)
	.to({rotation: 45},0)
	.to({x:200, y:200,},250)
	.to({guide:{ path:[200,200, 250,150, 250,100] }, rotation: 0},300);
}

function addRocket(){
  var doge = new Image();
  doge.src = "/rocket.png";
  bitmap = new createjs.Bitmap(doge);
  bitmap.y = 300;
  bitmap.x = 100;
	bitmap.regX = 15;
	bitmap.regY = 5;
  stage.addChild(bitmap);
}
