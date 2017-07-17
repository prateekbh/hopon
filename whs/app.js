import { Vector3, MeshPhongMaterial, Color, PCFSoftShadowMap } from "three";
import {
  App,
  ElementModule,
  SceneModule,
  DefineModule,
  PerspectiveCamera,
  RenderingModule,
  ResizeModule,
  Sphere,
  Plane,
  CameraModule,
  OrbitControlsModule,
  AmbientLight,
  PointLight
} from "whs";
import {
  SphereModule,
  WorldModule,
  PlaneModule
} from "physics-module-ammonext";

let app;
function init() {
  app = new App([
    new ElementModule(),
    new SceneModule(),
    new CameraModule({
      position: {
        y: 10,
        z: 110
      }
    }),
    new RenderingModule(
      {
        bgColor: 0x162129,

        renderer: {
          antialias: true,
          shadowmap: {
            type: PCFSoftShadowMap
          }
        }
      },
      { shadow: true }
    ),
    new ResizeModule(),
    new OrbitControlsModule(),
    new WorldModule({
      ammo: "http://localhost:8080/ammo.js",
      gravity: new Vector3(0, -100, 0)
    })
  ]);

  addSphere();
  addPlane();

  // point light
  // Lights
  new PointLight({
    light: {
      intensity: 0.5,
      distance: 100
    },

    shadow: {
      fov: 90
    },

    position: new Vector3(0, 10, 10)
  }).addTo(app);

  // add light
  new AmbientLight({
    light: {
      intensity: 0.4
    }
  }).addTo(app);

  app.start(); // Run app.
}

function addSphere() {
  const sphere = new Sphere({
    // Create sphere comonent.
    geometry: {
      radius: 5,
      widthSegments: 32,
      heightSegments: 32
    },

    material: new MeshPhongMaterial({
      color: 0xf2f2f2
    }),

    modules: [
      new SphereModule({
        mass: 10,
        restitution: 1
      })
    ],

    position: new Vector3(0, 20, 80)
  });
  sphere.addTo(app);
}

function addPlane() {
  const ground = new Plane({
    geometry: {
      width: 400,
      height: 400
    },

    modules: [
      new PlaneModule({
        mass: 0
      })
    ],

    material: new MeshPhongMaterial({ color: 0x447f8b }),

    rotation: {
      x: -Math.PI / 2
    }
  });

  const wall = ground.clone();
  //wall.rotation.y = 180;
  wall.rotation.x = 0;
  wall.position.z = -200;
  ground.addTo(app);
  wall.addTo(app);
}

init();
