import {
	Engine,
	Scene,
	HemisphericLight,
	Vector3,
	FreeCamera,
	ShadowGenerator,
} from 'babylonjs';

class Stage {

	constructor(canvas){
		const engine = new Engine(canvas);
		this.scene = new Scene(engine);
		this.ground = Mesh.CreateGround("ground1", 10, 30, 2, scene);
		addLights(scene);
		setCamera(scene);
	}

	addLights(){
		const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
		light.intensity = 0.5;
		const shadowGenerator = new ShadowGenerator(1024, light);
	}

	setCamera(){
		const camera = new FreeCamera("FreeCamera",new Vector3(0, 2, 10), this.scene);
		camera.setTarget(new Vector3(0, 5, -10));
		camera.attachControl(canvas, false);
		camera.setTarget(Vector3.Zero());
	}

}

export default Stage;