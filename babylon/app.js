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
// const camera = new FreeCamera("FreeCamera",new Vector3(0, 2, 10), scene);
// camera.setTarget(new Vector3(0, 5, -10));
const camera = new ArcRotateCamera("ArcRotateCamera", Math.PI/2, Math.PI/2, 10, new Vector3(0, 4, 0), scene);
camera.attachControl(canvas, false);
camera.setTarget(Vector3.Zero());
camera.applyGravity = true;
const ground = Mesh.CreateGround("ground1", 10, 30, 2, scene);
const sphere = Mesh.CreateSphere("sphere1", 16, 1, scene);
const bin = MeshBuilder.CreateCylinder("bin", {
	diameterTop: 2,
	diameterBottom: 1,
	height: 2,
},scene);
const binInner = MeshBuilder.CreateCylinder("bin", {
	diameterTop: 1.9,
	diameterBottom: 0.9,
	height: 2,
},scene);

const outerCSG = CSG.FromMesh(bin);
const innerCSG = CSG.FromMesh(binInner);
const subCSG = outerCSG.subtract(innerCSG);
const mat0 = new StandardMaterial("mat0", scene);
const displayBin = subCSG.toMesh('displayBin', mat0, scene);

scene.removeMesh(bin);
scene.removeMesh(binInner);

const materialSphere1 = new StandardMaterial("texture1", scene);
const materialGround1 = new StandardMaterial("texture2", scene);
ground.receiveShadows = true;
shadowGenerator.getShadowMap().renderList.push(sphere);
shadowGenerator.getShadowMap().renderList.push(displayBin);
sphere.material = materialSphere1;
ground.material = materialGround1;
materialSphere1.diffuseTexture = new Texture("ball.png", scene);
materialGround1.diffuseTexture = new Texture("floor.jpg", scene);
materialGround1.diffuseTexture.uScale = 5.0;
materialGround1.diffuseTexture.vScale = 5.0;
sphere.position.y = 2.1;
displayBin.position.y =1;
displayBin.position.x = -0.3;
displayBin.position.z = -8;
scene.clearColor = new Color3(0.2, 0.2, 0.2);
scene.gravity = new Vector3(0, 0, 0);
scene.enablePhysics();
sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
displayBin.physicsImpostor = new PhysicsImpostor(displayBin, PhysicsImpostor.MeshImpostor, {mass: 0}, scene);
engine.runRenderLoop(function () {
	scene.render();
});


document.addEventListener('click',()=>{
	sphere.applyImpulse(new Vector3(0, 8, -6), sphere.getAbsolutePosition());
})