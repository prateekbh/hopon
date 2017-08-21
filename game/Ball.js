import {
	MeshBuilder,
	PhysicsImpostor,
	Texture,
	Animation,
} from 'babylonjs';

import {jumpAnimationKeys} from './Animations';

class Ball{
	constructor(scene){
		this._scene = scene;
		this._sphere = MeshBuilder.CreateSphere("ball", {
			diameter: 0.6
		}, scene);
		this._sphere.position.z = -17;
		this._sphere.position.y = 0.7;
		this._sphere.physicsImpostor =
			new PhysicsImpostor(this._sphere, PhysicsImpostor.SphereImpostor, { mass: 0, restitution:0 }, this.scene);
		this._sphere.checkCollisions = true;
		// A jump from platform to platform is 40 frames, and will be restarted on intersection.
		// if animation is still playing on 45th frame you have lost the game.
		this._lostEvent= new AnimationEvent(45, function() { lost.play()  }, false);
	}

	// start an animation from current sphere's position to next destination
	startFreshAnimation(nextZPosition){
		const jumpAnimation = new Animation("jumpAnimation", "position.y", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
		const movingAnimation = new Animation("movingAnimation", "position.z", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
		jumpAnimation.setKeys(jumpAnimationKeys);
		jumpAnimation.addEvent(this._lostEvent);	// event listener for game lost
		movingAnimation.setKeys(this.getMovementKeys(nextZPosition));
		this._sphere.animations.push(jumpAnimation);
		this._sphere.animations.push(movingAnimation);
		return this._scene.beginAnimation(this._sphere, 0, 70, true);
	}

	startSwipeAnimation(newXPosition){
		const swipeAnimation = new Animation("swipeAnimation", "position.x", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
		const swipAnimationKeys = [];
		jumpAnimationKeys.push({
			frame: 0,
			value: this._sphere.position.x
		});
		jumpAnimationKeys.push({
			frame: 60,
			value: newXPosition
		});
		swipeAnimation.setKeys(swipAnimationKeys);
		this._sphere.animations.push(swipeAnimation);
		//return this._scene.beginAnimation(this._sphere, 0, 60, true);
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
			frame: 45,
			value: destination
		});

		return movementKeys;
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