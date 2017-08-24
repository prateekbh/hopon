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
	Sound,
	SceneOptimizer,
	AssetsManager
} from 'babylonjs';
import CANNON from 'cannon';
import Ball from './Ball';
import Platform from './Platform';
class GameScene {

	constructor(canvas, {onScore, onInit}){
		window.CANNON = CANNON;
		this._engine = new Engine(canvas, true);
		this._scene = new Scene(this._engine);
		this._canvas = canvas;
		this._onScore = onScore;
		this._onInit = onInit;
		this._scene.clearColor  = new Color3(255, 255, 255);
		this._sounds = {};
		this.addPhysics();
		this.addLights();
		this.addCamera();
		this.addBall();
		this.addLoadingTasks();
		this.addPlatforms();
		this.addTouchListeners();
		//this.loadSounds();
		// allow moderate degradation
		SceneOptimizer.OptimizeAsync(this._scene)
	}

	addLoadingTasks(){
		const assetsManager = new AssetsManager(this._scene);
		const textureLoaded = false;
		const soundsLoaded = false;
		const imageTask = assetsManager.addImageTask("texture task", "/images/basketball.png");
		imageTask.onSuccess = (task) => {
			this._ball.addTexture(task.image);
		}

		const bounceSoundTask = assetsManager.addBinaryFileTask("bounce sound task", "/sounds/bounce.wav");
		bounceSoundTask.onSuccess = (task) => {
			const bouncingSound = new Sound("bounce", task.data, this._scene, ()=>{});
			this._ball.addBouncingSound(bouncingSound);
		}

		const lostSoundTask = assetsManager.addBinaryFileTask("lost sound task", "/sounds/lost.wav");
		lostSoundTask.onSuccess = (task) => {
			const losingSound = new Sound("lost", task.data, this._scene, ()=>{});
			this._ball.addLosingSound(losingSound);
		}

		assetsManager.onFinish = (tasks) => {
			this._engine.runRenderLoop(() => {
				this.preAnimationCheck();
				this._scene.render();
			});
		};

		assetsManager.load();
	}

	addLights(){
		const light = new HemisphericLight("light", new Vector3(0, 1, 0), this._scene);
		light.intensity = 1;
	}

	addCamera(){
		this._camera = new FreeCamera("FreeCamera",new Vector3(0, 4, -24), this.scene);
		this._camera.setTarget(new Vector3(0, 1, 0));
		this._camera.inputs.attached.mouse.detachControl();
		this._camera.setTarget(Vector3.Zero());
	}

	addPhysics(){
		this._scene.workerCollisions = true;
		this._scene.collisionsEnabled = true;
		this._scene.enablePhysics();
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
			if (!this._gameStarted){
				this._touchRef = e.touches[0].clientX;
				this._swipeShift = 0;
				this.beginGame();
			}
		},{passive: true});

		document.addEventListener('touchmove', e => {
			if(this._gameStarted) {
				this._swipeShift = (e.touches[0].clientX - this._touchRef)/80;
			}
		},{passive: true});
	}

	beginGame(){
		const firstZPosition = this._platform.getNextBox().position.z;
		this._gameStarted = true;
		this._ballAnimationRef = this._ball.startFreshAnimation(firstZPosition);
		this._onInit();
		((box)=>{
			setTimeout(()=>{
				this._platform.moveBox(box);
			}, 1500);
		})(this._platform._boxes[0]);
	}

	increaseGameSpeed(){
		this._ball.gameSpeed -= 3;
	}

	preAnimationCheck(){
		this._camera.position.z = this._ball.position.z - 12;
		if(this._gameStarted){
			this._ball.rotation.x += 0.05;
			this.adjustBallPosition();
			const currentBox = this._platform.getCurrentBox();
			if (this._ball.position.y < 0.8 && this._ball.sphere.intersectsMesh(currentBox, false)) {
				this._ballAnimationRef.stop();
				this._ball.position.y =0.7;
				const nextZPosition = this._platform.getNextBox().position.z;
				this._ballAnimationRef = this._ball.startFreshAnimation(nextZPosition);
				this._onScore();
				((box)=>{
					setTimeout(()=>{
						this._platform.moveBox(box);
					}, 1500);
				})(currentBox)
			}
		}
	}

	/*
	*	Function to make ball react to the swipe of the user
	*/
	adjustBallPosition(){
		const movementScale = Math.abs(this._swipeShift - this._ball.position.x)/4.5;
		if(this._swipeShift > 0) {
			if(this._ball.position.x <= this._swipeShift) {
				this._ball.position.x += movementScale;
			} else {
				this._ball.position.x -= movementScale;
			}
		} else if(this._swipeShift < 0) {
			if(this._ball.position.x >= this._swipeShift) {
				this._ball.position.x -= movementScale;
			} else {
				this._ball.position.x += movementScale;
			}
		} else {
			if(this._ball.position.x < 0) {
				this._ball.position.x += movementScale;
			} else if(this._ball.position.x > 0) {
				this._ball.position.x -= movementScale;
			}
		}
	}
}

export default GameScene;