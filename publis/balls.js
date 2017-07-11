let stage;
let tween;
const circle = new createjs.Shape();
const arc1 = new createjs.Shape();
const rect1 = new createjs.Shape();
const tri1 = new createjs.Shape();
const cross = new createjs.Shape();
const ctx = document.getElementById('myCanvas').getContext('2d');
var container = new createjs.Container();
const canvas = document.querySelector('#myCanvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
function init() {
  stage = new createjs.Stage("myCanvas");
  const box = new createjs.Shape();
  box.graphics
  .beginLinearGradientFill(["#333","#333"], [0, 1], 0, 0, 0, canvas.height)
  .drawRect(0, 0, canvas.width, canvas.height);
	stage.addChild(box);
	stage.addChild(container);
	stage.update();
	addBall();
	//addArc();
	addRect();
	addTri();
	createjs.Ticker.setFPS(60);
	stage.addEventListener('click', () => {
		if (circle.y < canvas.height / 3) {
			createjs.Tween.get(container).to({y: container.y + 50}, 300, createjs.Ease.easeOut)
		} else {
			if (tween) {
				tween.setPaused(true);
			}
			tween = createjs.Tween.get(circle).to({y: circle.y - 50}, 300, createjs.Ease.easeOut).to({y: 500}, (600 - circle.y) * 4.5, createjs.Ease.easeIn);
		}

	});
	createjs.Ticker.addEventListener('tick', () => {
		stage.setChildIndex( circle, stage.getNumChildren()-1);
		tri1.rotation += 1;
		rect1.rotation += 1;
		const pt = circle.localToLocal(4, 4, tri1);
		if (tri1.hitTest(pt.x, pt.y)) {
			console.log(pt);
		}
		stage.update();
	});
}

function addBall() {
  circle.graphics.beginStroke("#f00");
	circle.graphics.beginFill("red");
  circle.graphics.drawCircle(0, 0, 8);
	circle.graphics.endFill();
  circle.graphics.endStroke();
	circle.regX = 4;
	circle.x = canvas.width / 2;
	circle.y = 500;
  stage.addChild(circle);
}

function addArc() {
	arc1.x = 200;
	arc1.y = 200;
	arc1.graphics.setStrokeStyle(15);
	arc1.graphics.beginStroke("#f00");
	arc1.graphics.arc(0, 0, 80, 0, 90* Math.PI/180);
	arc1.graphics.endStroke();
	arc1.graphics.setStrokeStyle(15);
	arc1.graphics.beginStroke("#0F0");
	arc1.graphics.arc(0, 0, 80, 90 * Math.PI/180, 180 * Math.PI/ 180);
	arc1.graphics.endStroke();
	arc1.graphics.setStrokeStyle(15);
	arc1.graphics.beginStroke("#00F");
	arc1.graphics.arc(0, 0, 80, 180 * Math.PI/180, 270 * Math.PI/ 180);
	arc1.graphics.endStroke();
	arc1.graphics.setStrokeStyle(15);
	arc1.graphics.beginStroke("#FFF");
	arc1.graphics.arc(0, 0, 80, 270 * Math.PI/180, 360 * Math.PI/ 180);
	arc1.graphics.endStroke();
	container.addChild(arc1);
}

function addRect() {
	rect1.x = canvas.width/2;
	rect1.y = -200;
	rect1.graphics.setStrokeStyle(15, 'round');
	rect1.graphics.beginStroke("#f00");
	rect1.graphics.moveTo(0, -100);
	rect1.graphics.lineTo(100, 0);
	rect1.graphics.beginStroke("#0f0");
	rect1.graphics.moveTo(100, 0);
	rect1.graphics.lineTo(0, 100);
	rect1.graphics.beginStroke("#00f");
	rect1.graphics.moveTo(0, 100);
	rect1.graphics.lineTo(-100, 0);
	rect1.graphics.beginStroke("#fff");
	rect1.graphics.moveTo(-100, 0);
	rect1.graphics.lineTo(0, -100);
	container.addChild(rect1);
}

function addTri() {
	tri1.x = canvas.width/2;
	tri1.y = 200;
	tri1.graphics.setStrokeStyle(15, 'round');
	tri1.graphics.beginStroke("#f00");
	tri1.graphics.moveTo(0,-140);
	tri1.graphics.lineTo(100,0);
	tri1.graphics.beginStroke("#0f0");
	tri1.graphics.moveTo(100,0);
	tri1.graphics.lineTo(-100,0);
	tri1.graphics.beginStroke("#00f");
	tri1.graphics.moveTo(-100,0);
	tri1.graphics.lineTo(0,-140);
	tri1.regY = -70;
	container.addChild(tri1);
}