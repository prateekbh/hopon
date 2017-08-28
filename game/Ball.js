import {
	MeshBuilder,
	PhysicsImpostor,
	Texture,
	Animation,
	StandardMaterial,
	AnimationEvent,
} from 'babylonjs';

import {getJumpAnimationKeys} from './Animations';

class Ball{
	constructor(scene){
		this._scene = scene;
		this._sphere = MeshBuilder.CreateSphere("ball", {
			diameter: 0.6
		}, scene);
		this._sphere.position.z = -17;
		this._sphere.position.y = 0.7;
		this._sphere.rotation.z = Math.PI/2;
		// Setup physics
		this._sphere.physicsImpostor =
			new PhysicsImpostor(this._sphere, PhysicsImpostor.SphereImpostor, { mass: 0, restitution:0 }, this.scene);
		this._sphere.checkCollisions = true;
		this.gameSpeed = 30;
	}

	addTexture(image){
		// Get base 64 string
		const dummyCanvas = document.createElement('canvas');
		dummyCanvas.width = image.width;
		dummyCanvas.height = image.height;
		const ctx = dummyCanvas.getContext('2d');
		ctx.drawImage(image, 0, 0);
		const base64String = dummyCanvas.toDataURL();
		const materialSphere1 = new StandardMaterial("texture1", this._scene);
		materialSphere1.diffuseTexture =
			Texture.CreateFromBase64String(base64String, "texture name", this._scene);
		this._sphere.material = materialSphere1;
	}

	// start an animation from current sphere's position to next destination
	startFreshAnimation(nextZPosition){
		const lostEvent= new AnimationEvent(this.gameSpeed + 10, () => {
			this._losingSound && this._losingSound.play();
			this._losingSound = null;
			this._finishCallback && this._finishCallback();
			this._finishCallback = null;
		}, false);
		const jumpAnimation = new Animation("jumpAnimation", "position.y", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
		const movingAnimation = new Animation("movingAnimation", "position.z", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
		jumpAnimation.setKeys(getJumpAnimationKeys(this.gameSpeed));
		jumpAnimation.addEvent(lostEvent);	// event listener for game lost
		movingAnimation.setKeys(this.getMovementKeys(nextZPosition));
		this._sphere.animations.push(jumpAnimation);
		this._sphere.animations.push(movingAnimation);
		this._bounceSound.play();
		return this._scene.beginAnimation(this._sphere, 0, 100, true);
	}

	getMovementKeys(destination){
		//animation keys
		const currentPoint = this._sphere.position.z;
		const movementKeys = [];
		movementKeys.push({
			frame: 0,
			value: currentPoint
		});
		movementKeys.push({
			frame: this.gameSpeed + 5,
			value: destination
		});
		return movementKeys;
	}

	addBouncingSound(sound) {
		this._bounceSound = sound;
	}

	addLosingSound(sound) {
		this._losingSound = sound;
	}

	registerOnFinishCallback(finishCallback) {
		this._finishCallback = finishCallback;
	}
	get position() {
		return this._sphere.position;
	}

	get rotation() {
		return this._sphere.rotation;
	}

	get sphere() {
		return this._sphere;
	}
}

export default Ball;