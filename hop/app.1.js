import {
	Plane,
	Engine,
	Scene,
	HemisphericLight,
	Vector3,
	Color3,
	FreeCamera,
	ArcRotateCamera,
	Mesh,
	MeshBuilder,
	PhysicsImpostor,
	CannonJSPlugin,
	Texture,
	StandardMaterial,
	ShadowGenerator,
	DirectionalLight,
	Color4,
	CSG,
	Animation,
	AnimationEvent,
	FxaaPostProcess
} from 'babylonjs';

import CANNON from 'cannon';
window.CANNON = CANNON;

const canvas = document.getElementById("stage");
const engine = new Engine(canvas);
const scene = new Scene(engine);
const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
light.intensity = 0.5;
const camera = new ArcRotateCamera("ArcRotateCamera", Math.PI/2, Math.PI/2, 10, new Vector3(0, 4, -40), scene);
camera.attachControl(canvas, false);
camera.setTarget(Vector3.Zero());
camera.applyGravity = true;
const postProcess = new FxaaPostProcess("fxaa", 1.0, camera);
const boxes=[];
const ground = Mesh.CreateGround("ground1", 12, 40, 2, scene);
const materialGround1 = new StandardMaterial("texture2", scene);
ground.receiveShadows = true;
ground.material = materialGround1;
materialGround1.emissiveColor = new Color3(0.5,0.2,1);

// droping animation
const droppingKeys = [];
droppingKeys.push({
	frame: 0,
	value: 3
});
droppingKeys.push({
	frame: 20,
	value: 0
});
droppingKeys.push({
	frame: 300,
	value: 0
});

// opacity animation
const opacityKeys = [];
opacityKeys.push({
	frame: 0,
	value: 0
});
opacityKeys.push({
	frame: 20,
	value: 1
});
opacityKeys.push({
	frame: 300,
	value: 1
});

const xPositions = [-3.5, -2.5, 0, 2.5, 3.5];
let startPosition = -16;
//box
for(let i=0; i<10; i++){
	const box = MeshBuilder.CreateBox('box1', {
		size: 2,
		height:0.4,
		faceColors: new Color4(0,0,1,0.8),
	},scene);
	const boxMaterial = new StandardMaterial('boxMaterial', scene);
	boxes.push(box);
	box.material = boxMaterial;
	boxMaterial.diffuseColor = new Color3(0.301, 0.815, 1);
	boxMaterial.ambientColor = new Color3(0.101, 0.715, 1);
	const newXPosition = xPositions[Math.floor(Math.random() * 4)];
	box.position.x = i===0?0:newXPosition;
	box.position.z = startPosition;
	box.startPosition = startPosition;
	console.log(box.startPosition);
	startPosition += 4;
	if (i > 0) {
		box.material.alpha = 0;
		const droppingAnimation = new Animation("droppingAnimation", "position.y", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
		const opacityAnimation = new Animation("opacityAnimation", "material.alpha", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);

		droppingAnimation.setKeys(Object.assign([],droppingKeys));
		opacityAnimation.setKeys(Object.assign([],opacityKeys));

		box.animations.push(droppingAnimation);
		box.animations.push(opacityAnimation);
		setTimeout(()=>{
			scene.beginAnimation(box, 0, 300, false);
		}, i * 120);
	}
}


// setup
scene.clearColor = new Color3(255,255,255);
scene.gravity = new Vector3(0, 0, 0);
scene.enablePhysics();

//ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

engine.runRenderLoop(function () {
	scene.render();
});

document.addEventListener('click', ()=>{
	boxes.forEach((box)=>{
		const movingAnimation = new Animation("movingAnimation", "position.z", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
		const animationKeys = getMovementKeys(box.position.z, true);
		const travelTime = getTravelTime(box.position.z);
		const animationEndEvent = new AnimationEvent(travelTime, function(e) {
			addLoopedAnimation(box);
		}, true);

		movingAnimation.setKeys(animationKeys);
		movingAnimation.addEvent(animationEndEvent);
		box.animations = [];
		box.animations.push(movingAnimation);
		scene.beginAnimation(box, 0, travelTime, false);
	});
});

function getMovementKeys (startPoint, skipFade = false) {
	//animation keys
	const time = getTravelTime(startPoint);
	const movementKeys = [];
	movementKeys.push({
		frame: 0,
		value: startPoint
	});
	if (!skipFade) {
		movementKeys.push({
			frame: time<20?0:20,
			value: startPoint
		});
	}
	movementKeys.push({
		frame: time,
		value: -20
	});

	return movementKeys;
}

function getTravelTime(startPoint) {
	const speed = 280/ 40;
	const distance = startPoint - -20;
	return distance * speed;
}

function addLoopedAnimation(box) {
	const movingAnimation = new Animation("movingAnimation", "position.z", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
	const droppingAnimation = new Animation("droppingAnimation", "position.y", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
	const opacityAnimation = new Animation("opacityAnimation", "material.alpha", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
	box.position.z = 20;
	movingAnimation.setKeys(getMovementKeys(box.position.z));
	droppingAnimation.setKeys(Object.assign([],droppingKeys));
	opacityAnimation.setKeys(Object.assign([],opacityKeys));

	const animationEndEvent = new AnimationEvent(280, function(e) {
		console.log('endded');
		const newXPosition = xPositions[Math.floor(Math.random() * 4)];
		box.position.x = newXPosition;
	});

	movingAnimation.addEvent(animationEndEvent);

	box.animations = [];
	box.animations.push(movingAnimation);
	box.animations.push(droppingAnimation);
	box.animations.push(opacityAnimation);
	scene.beginAnimation(box, 0, 300, true);
}
