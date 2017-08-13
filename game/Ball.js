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
} from 'babylonjs';

class Ball{
	constructor(scene){
		this.sphere = MeshBuilder.CreateSphere("ball", {
			diameter: 0.6
		}, scene);
		this.sphere.position.z = -17;
		this.sphere.position.y = 0.7;
		this.sphere.physicsImpostor =
			new PhysicsImpostor(this.sphere, PhysicsImpostor.SphereImpostor, { mass: 0, restitution:0 }, this.scene);
		this.sphere.checkCollisions = true;
	}
}

export default Ball;