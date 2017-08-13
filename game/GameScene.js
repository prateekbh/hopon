import {
	Engine,
	Scene,
	HemisphericLight,
	Vector3,
	FreeCamera,
	ShadowGenerator,
	PhysicsImpostor
} from 'babylonjs';

class GameScene {

	constructor(canvas){
		const engine = new Engine(canvas);
		this.scene = new Scene(engine);
		this.ground = Mesh.CreateGround("ground1", 10, 30, 2, scene);
		this.scene.clearColor = new Color3(255,255,255);
		addLoadingTasks();
		addLights();
		addCamera();
		addPhysics();
		loadSounds();
	}

	addLoadingTasks(){
		// Todo: implement loading
	}

	addLights(){
		const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
		light.intensity = 0.5;
		const shadowGenerator = new ShadowGenerator(1024, light);
	}

	addCamera(){
		const camera = new FreeCamera("FreeCamera",new Vector3(0, 2, 10), this.scene);
		camera.setTarget(new Vector3(0, 5, -10));
		camera.attachControl(canvas, false);
		camera.setTarget(Vector3.Zero());
	}

	addPhysics(){
		this.scene.enablePhysics();
		this.scene.collisionsEnabled = true;
	}

	loadSounds(){
		const bounce = new Sound("sound_name", "/bounce.wav", this.scene, () => {});
		const lost = new Sound("sound_nalost_soundme", "/lost.wav", this.scene, () => {});
	}


}

export default GameScene;