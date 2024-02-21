import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.setZ(10);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene,camera);



//const geometry = new THREE.TorusGeometry(1, 0.3, 8, 100);
//const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
//const torus = new THREE.Mesh(geometry, material);
//
//scene.add(torus);


const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(3,5,3)
scene.add(light)
const lightHelper = new THREE.DirectionalLightHelper(light);
scene.add(lightHelper);

const gridHleper = new THREE.GridHelper(200,5);
scene.add(gridHleper)
//const plane = new THREE.Plane( new THREE.Vector3( 0, 0, 1 ), 0 );
//const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
//scene.add( helper );

function loadGLTFModel(modelPath, scene, scale, material) {
  const loader = new GLTFLoader();
  loader.load(modelPath, function(glb){
      console.log(glb);
      const root = glb.scene;
      if (scale) {
          root.scale.set(scale, scale, scale);
      }
      if (material) {
        root.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
    }
      scene.add(root);
  }, function(xhr){
      console.log((xhr.loaded/xhr.total * 100) + "% loaded");
  }, function(error){
      console.log('An error occured');
  });
}

function loadOBJModel(modelPath, scene, scale, material) {
  const objLoader = new OBJLoader();
  objLoader.load(modelPath, function(object){
      console.log(object);
      if (scale) {
        object.scale.set(scale, scale, scale);
      }
      if (material) {
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
    }
      scene.add(object);
  }, function(xhr){
      console.log((xhr.loaded/xhr.total * 100) + "% loaded");
  }, function(error){
      console.log('An error occured');
  });
}

// Load GLB:
const modelPath = 'poly.glb';
const scale = 10;
//loadGLTFModel(modelPath, scene, scale);

// Load OBJ:
const modelPathOBJ = 'faceOBJ.obj';
const scaleOBJ = 4;
const materialOBJ = new THREE.MeshStandardMaterial({ color: 0xff6347 }); // Example material
loadOBJModel(modelPathOBJ, scene, scaleOBJ);
console.log(scene)

const controls = new OrbitControls(camera,renderer.domElement);

function animate(){
  requestAnimationFrame( animate );
  renderer.render(scene,camera);

}
animate()
