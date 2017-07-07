let stage;
function init() {
  stage = new createjs.Stage("myCanvas");
  const box = new createjs.Shape();
  box.graphics
  .beginLinearGradientFill(["#4A148C","#3F51B5","#00BFA5"], [0, .2, 1], 0, 0, 0, 600)
  .drawRect(0, 0, 600, 600);
	stage.addChild(box);
	stage.update();
	addBall();
	stage.addEventListener('click', ()=>{
		})
}

function addBall(){
	const circle = new createjs.Shape();
  circle.graphics.beginStroke("#787");
	circle.graphics.beginFill("red");
  circle.graphics.drawCircle(0, 0, 20);
	circle.graphics.endFill();
  circle.graphics.endStroke();
	circle.regX = 10;
	circle.x = 200;
	circle.y = 500;
  stage.addChild(circle);
  stage.update();
}