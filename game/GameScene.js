import {
	Engine,
	Scene,
	HemisphericLight,
	Vector3,
	FreeCamera,
	ShadowGenerator,
	PhysicsImpostor,
	CannonJSPlugin,
	Mesh,
	Color3,
	Sound
} from 'babylonjs';
import CANNON from 'cannon';
import Ball from './Ball';
import Platform from './Platform';
class GameScene {

	constructor(canvas){
		window.CANNON = CANNON;
		const engine = new Engine(canvas);
		this._scene = new Scene(engine);
		this._canvas = canvas;
		this._scene.clearColor  = new Color3(255, 255, 255);
		this.addPhysics();
		this.addLoadingTasks();
		this.addLights();
		this.addCamera();
		this.addBall();
		this.addPlatforms();
		this.addTouchListeners();
		//this.loadSounds();
		this._scene.registerBeforeRender(this.preAnimationCheck.bind(this));
		engine.runRenderLoop(() => {
			this._scene.render();
		});
	}

	addLoadingTasks(){
		// Todo: implement loading
	}

	addLights(){
		const light = new HemisphericLight("light", new Vector3(0, 1, 0), this._scene);
		light.intensity = 0.5;
	}

	addCamera(){
		this._camera = new FreeCamera("FreeCamera",new Vector3(0, 4, -24), this.scene);
		this._camera.setTarget(new Vector3(0, 1, 0));
		this._camera.inputs.attached.mouse.detachControl();
		this._camera.setTarget(Vector3.Zero());
	}

	addPhysics(){
		this._scene.workerCollisions = true;
		this._scene.enablePhysics();
		this._scene.enablePhysics();
		this._scene.collisionsEnabled = true;
	}

	loadSounds(){
		const bounce = new Sound("sound_name", "/bounce.wav", this._scene, () => {});
		const lost = new Sound("sound_nalost_soundme", "/lost.wav", this._scene, () => {});
	}

	addBall(){
		this._ball = new Ball(this._scene);
	}

	addPlatforms(){
		this._platform = new Platform(this._scene);
	}

	addTouchListeners(){
		document.addEventListener('touchstart', e => {
			this.beginGame();
		},{passive: true});
	}

	beginGame(){
		const firstZPosition = this._platform.getNextBox().position.z;
		this._gameStarted = true;
		this._ballAnimationRef = this._ball.startFreshAnimation(firstZPosition);
	}

	preAnimationCheck(){
		this._camera.position.z = this._ball.position.z - 12;
		if(this._gameStarted){
			this._ball.rotation.x += 0.1;
		}
		// if (currentBox && sphere.intersectsMesh(currentBox, false)) {
		// 	this._ballAnimationRef.pause();
		// 	this._ball.position.y =0.7;
		// 	// const jumpAnimation = new Animation("jumpAnimation", "position.y", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
		// 	// const movingAnimation = new Animation("movingAnimation", "position.z", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
		// 	// jumpAnimation.setKeys(jumpKeys);
		// 	// currentBox = getNextIntersectingBox();
		// 	// const nextZPosition = currentBox.position.z;
		// 	// movingAnimation.setKeys(getMovementKeys(sphere.position.z, nextZPosition));
		// 	// sphere.animations.push(jumpAnimation);
		// 	// sphere.animations.push(movingAnimation);
		// 	// jumpAnimationRef = scene.beginAnimation(sphere, 0, 70, false);
		// 	// jumpAnimation.addEvent(lostEvent);
		// 	// bounce.play();
		// 	// ((box)=>{
		// 	// 	setTimeout(()=>{
		// 	// 		moveBox(box);
		// 	// 	}, 1500);
		// 	// })(currentBox)
		// }
	}
}

export default GameScene;