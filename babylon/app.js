import {
	Plane,
	Engine,
	Scene,
	HemisphericLight,
	Vector3,
	Color3,
	ArcRotateCamera,
	Mesh,
	MeshBuilder,
	PhysicsImpostor,
	CannonJSPlugin,
	Texture,
	StandardMaterial,
	ShadowGenerator,
	DirectionalLight
} from 'babylonjs';

import CANNON from 'cannon';
window.CANNON = CANNON;

const canvas = document.getElementById("stage");
const engine = new Engine(canvas);
const scene = new Scene(engine);
const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
light.intensity = 0.5;
const pointLight = new DirectionalLight("dir01", new Vector3(0, -2, -3), scene);
const shadowGenerator = new ShadowGenerator(1024, pointLight);
const camera = new ArcRotateCamera("ArcRotateCamera", Math.PI/2, Math.PI/2.5, 10, new Vector3(0, 0, 0), scene);
camera.attachControl(canvas, false);
camera.setTarget(Vector3.Zero());
camera.applyGravity = true;
const ground = Mesh.CreateGround("ground1", 10, 30, 2, scene);
const pillar = MeshBuilder.CreateBox("pillar", {size: 0.5, height: 6}, scene);
const sphere = Mesh.CreateSphere("sphere1", 16, 1, scene);
const backboard = MeshBuilder.CreateBox("backboard", {size: 0.1, height: 2, width: 3}, scene);
const materialSphere1 = new StandardMaterial("texture1", scene);
const materialGround1 = new StandardMaterial("texture2", scene);
const backboardMaterial = new StandardMaterial("backboardTexture", scene);
ground.receiveShadows = true;
shadowGenerator.getShadowMap().renderList.push(sphere);
sphere.material = materialSphere1;
ground.material = materialGround1;
backboard.material = backboardMaterial;
backboard.rotation.z = Math.PI;
materialSphere1.diffuseTexture = new Texture("ball.png", scene);
materialGround1.diffuseTexture = new Texture("floor.jpg", scene);
backboardMaterial.diffuseTexture = new Texture("backboard.jpg", scene);
materialGround1.diffuseTexture.uScale = 5.0;
materialGround1.diffuseTexture.vScale = 5.0;
sphere.position.y = 3;
pillar.position.y = 3;
pillar.position.z = -10;
backboard.position.y = 6;
backboard.position.z = -9.5;
scene.clearColor = new Color3(0.2, 0.2, 0.2);
scene.gravity = new Vector3(0, -9.81, 0);
scene.enablePhysics();
sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
engine.runRenderLoop(function () {
	scene.render();
});