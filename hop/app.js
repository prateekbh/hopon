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
	AnimationEvent
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
const boxes=[];
const ground = Mesh.CreateGround("ground1", 12, 40, 2, scene);
const materialGround1 = new StandardMaterial("texture2", scene);
ground.receiveShadows = true;
ground.material = materialGround1;
materialGround1.diffuseTexture = new Texture("floor.jpg", scene);
materialGround1.diffuseTexture.uScale = 5.0;
materialGround1.diffuseTexture.vScale = 5.0;
const xPositions = [-3.5, -2.5, 0, 2.5, 3.5];
let startPosition = -15;
//box
for(let i=0; i<8; i++){
	const box = MeshBuilder.CreateBox('box1', {
		size: 3,
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
	startPosition += 6
}

const movingAnimation = new Animation("movingAnimation", "position.z", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
const droppingAnimation = new Animation("droppingAnimation", "position.y", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
const opacityAnimation = new Animation("opacityAnimation", "material.alpha", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
const animationEndEvent = new AnimationEvent(295, function() {
	const newPosition = xPositions[Math.floor(Math.random() * 4)];
	box.position.x = newPosition;
});
//animation keys
const movementKeys = [];
movementKeys.push({
	frame: 0,
	value: 40
});
movementKeys.push({
	frame: 20,
	value: 40
});
movementKeys.push({
	frame: 300,
	value: -40
});

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

movingAnimation.setKeys(movementKeys);
droppingAnimation.setKeys(droppingKeys);
opacityAnimation.setKeys(opacityKeys);
movingAnimation.addEvent(animationEndEvent);

// box.animations.push(movingAnimation);
// box.animations.push(droppingAnimation);
// box.animations.push(opacityAnimation);

// setup
scene.clearColor = new Color3(255,255,255);
scene.gravity = new Vector3(0, 0, 0);
scene.enablePhysics();
// scene.beginAnimation(box, 0, 300, true);
//ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

engine.runRenderLoop(function () {
	scene.render();
});