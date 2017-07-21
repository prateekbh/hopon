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
const camera = new FreeCamera("FreeCamera",new Vector3(0, 2, 10), scene);
camera.setTarget(new Vector3(0, 5, -10));
// const camera = new ArcRotateCamera("ArcRotateCamera", Math.PI/2, Math.PI/0.15, 10, new Vector3(0, 4, 0), scene);
// camera.attachControl(canvas, false);
// camera.setTarget(Vector3.Zero());
// camera.applyGravity = true;
const ground = Mesh.CreateGround("ground1", 10, 30, 2, scene);
const pillar = MeshBuilder.CreateBox("pillar", {size: 0.5, height: 6}, scene);
const sphere = Mesh.CreateSphere("sphere1", 16, 1, scene);
const backboard = MeshBuilder.CreateBox("backboard", {size: 0.1, height: 2, width: 3}, scene);

const ring = MeshBuilder.CreateTorus("ring", {
	diameter: 1.6,
	thickness: 0.1,
	tessellation: 16
}, scene);
const ringFabric = MeshBuilder.CreateCylinder("ringFabric", {
	height: 1,
	diameterTop: 1.4,
	diameterBottom: 0.9,
	diameter:0,
	enclose: false,
	faceColors: new Color4(255,255,0,0)
}, scene)
const materialSphere1 = new StandardMaterial("texture1", scene);
const materialGround1 = new StandardMaterial("texture2", scene);
const backboardMaterial = new StandardMaterial("backboardTexture", scene);
const ringMaterial = new StandardMaterial("ringTexture", scene);
ground.receiveShadows = true;
shadowGenerator.getShadowMap().renderList.push(sphere);
sphere.material = materialSphere1;
ground.material = materialGround1;
ringFabric.material = ringMaterial;
backboard.material = backboardMaterial;
backboard.rotation.z = Math.PI;
materialSphere1.diffuseTexture = new Texture("ball.png", scene);
materialGround1.diffuseTexture = new Texture("floor.jpg", scene);
backboardMaterial.diffuseTexture = new Texture("backboard.jpg", scene);
ringMaterial.diffuseTexture = new Texture("net.png", scene);
ringMaterial.diffuseTexture.hasAlpha = true;
materialGround1.diffuseTexture.uScale = 5.0;
materialGround1.diffuseTexture.vScale = 5.0;
sphere.position.y = 6.2;
sphere.position.z = -8.6;
pillar.position.y = 3;
pillar.position.z = -10;
backboard.position.y = 6;
backboard.position.z = -9.5;
ring.position.y = 5.3;
ring.position.z = -8.6;
ringFabric.position.y = 4.8;
ringFabric.position.z = -8.6;
scene.clearColor = new Color3(0.2, 0.2, 0.2);
scene.gravity = new Vector3(0, 0, 0);
scene.enablePhysics();
sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
backboard.physicsImpostor = new PhysicsImpostor(backboard, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
pillar.physicsImpostor = new PhysicsImpostor(pillar, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.4 }, scene);
ring.physicsImpostor = new PhysicsImpostor(ring, PhysicsImpostor.ParticleImpostor, { mass: 0, restitution: 0 }, scene);
//ringFabric.physicsImpostor = new PhysicsImpostor(ringFabric, PhysicsImpostor.MeshImpostor, { mass: 0, restitution: 0.4 }, scene);
engine.runRenderLoop(function () {
	scene.render();
});


document.addEventListener('click',()=>{
	sphere.applyImpulse(new Vector3(0, 11.5, -6), sphere.getAbsolutePosition());
})