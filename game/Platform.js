import {
	Vector3,
	Color3,
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
	static PlatformXPositions = [-3.5, -2.5, 0, 2.5, 3];
	static colors = [
		new Color3(0.16, 0.36, 0.26),
		new Color3(0.301, 0.815, 1)
	];

	constructor(scene){
		this._scene = scene;
		this._boxes = [];
		this.currentBox = null;
		this.addBoxes();
	}

	addBoxes(){
		let startPosition = -16;
		let jumpAnimationRef;
		// add 10 boxes
		for(let i=0; i<10; i++){
			const box = this.createBox();
			this._boxes.push(box);
			const newXPosition = Platform.PlatformXPositions[Math.floor(Math.random() * 4)];
			if (i > 0) {
				box.position.x = newXPosition;
			}
			box.position.z = startPosition;
			box.material.aplha = 0;
			box.startPosition = startPosition;
			((index)=>{
				setTimeout(()=>{
					box.appearAnimation = this._scene.beginAnimation(box, 0, 20, false);
				}, i * 50);
			})(i);
			startPosition += 8;
		}
	}

	createBox() {
		const box = MeshBuilder.CreateBox('box1', {
			size: 2,
			height:0.2,
			faceColors: new Color4(0,0,1,0.8),
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
}

export default Platform;