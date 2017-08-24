import {
	Vector3,
	Mesh,
	MeshBuilder,
	PhysicsImpostor,
	Texture,
	StandardMaterial,
	Color4,
	CSG,
	Animation,
	AnimationEvent,
} from 'babylonjs';
import {droppingAnimationKeys, opacityAnimationKeys} from './Animations';
class Platform{
	static PlatformXPositions = [-3, -2.5, 0, 2.5, 3];
	static colors = [
		new Color4(0.16, 0.36, 0.26, 1),
		new Color4(0.301, 0.815, 1, 1),
	];

	constructor(scene){
		this._scene = scene;
		this._boxes = [];
		this._currentBoxIndex = 0;
		this._startPosition = -16;
		this.addBoxes();
	}

	get boxes() {
		return this._boxes;
	}

	addBoxes(){
		let jumpAnimationRef;
		// add 10 boxes
		for(let i=0; i<10; i++){
			const box = this.createBox();
			this._boxes.push(box);
			const newXPosition = Platform.PlatformXPositions[Math.floor(Math.random() * 4)];
			if (i > 0) {
				box.position.x = newXPosition;
			}
			box.position.z = this._startPosition;
			box.material.aplha = 0;
			box.startPosition = this._startPosition;
			((index)=>{
				setTimeout(()=>{
					box.appearAnimation = this._scene.beginAnimation(box, 0, 20, false);
				}, i * 50);
			})(i);
			this._startPosition += 8;
		}
	}

	createBox() {
		const box = MeshBuilder.CreateBox('box1', {
			size: 2,
			height:0.2,
			faceColors: Color4(0.301, 0.815, 1, 1),
		}, this._scene);
		const boxMaterial = new StandardMaterial('boxMaterial', this._scene);
		box.checkCollisions = true;
		box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, this._scene);
		box.material = boxMaterial;
		box.material.alpha = 0;
		boxMaterial.diffuseColor = Platform.colors[0];
		this.addDroppingEffect(box);
		return box;
	}

	addDroppingEffect(box){
		const droppingAnimation = new Animation("droppingAnimation", "position.y", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
		const opacityAnimation = new Animation("opacityAnimation", "material.alpha", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
		droppingAnimation.setKeys(Object.assign([],droppingAnimationKeys));
		opacityAnimation.setKeys(Object.assign([],opacityAnimationKeys));
		box.animations.push(droppingAnimation);
		box.animations.push(opacityAnimation);
		box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, this._scene);
	}

	getCurrentBox() {
		return this._boxes[this._currentBoxIndex];
	}

	getNextBox() {
		if(this._currentBoxIndex <  9) {
			this._currentBoxIndex++;
		} else {
			this._currentBoxIndex = 0;
		}
		return this._boxes[this._currentBoxIndex];
	}

	moveBox(box) {
		const newXPosition = Platform.PlatformXPositions[Math.floor(Math.random() * 4)];
		box.position.x = newXPosition;
		box.position.z = this._startPosition;
		this._startPosition += 8;
		box.appearAnimation.restart();
	}
}

export default Platform;