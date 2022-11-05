// Neccessary Modules
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

// Import Textures
import starsTexture from 'C:/Users/Peter/JavaScriptProjects/three-js-projects/bowling/app-v1/stars.jpg';

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowmapping;
document.body.appendChild(renderer.domElement);

// Scence
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0,35,450);

// Stars Background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

// Physics World
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.81, 0)
});
const groundPhysMat = new CANNON.Material();

// Lighting
// Ambient Light - Low Intensity
const ambientLight =  new THREE.AmbientLight(0xffffff, .1);
scene.add(ambientLight);

// Point Lights
var light1 = new THREE.PointLight(0xffffff,.5);
light1.position.set(0,40,400);
light1.castShadow = true;
scene.add(light1);
const helper1 = new THREE.PointLightHelper(light1);
scene.add(helper1);

var light2 = new THREE.PointLight(0xffffff,.5);
light2.position.set(0,40,300);
light2.castShadow = true;
scene.add(light2);
const helper2 = new THREE.PointLightHelper(light2);
scene.add(helper2);

var light3 = new THREE.PointLight(0xffffff,.5);
light3.position.set(0,40,200);
light3.castShadow = true;
scene.add(light3);
const helper3 = new THREE.PointLightHelper(light3);
scene.add(helper3);

var light4 = new THREE.PointLight(0xffffff,.5);
light4.position.set(0,40,100);
light4.castShadow = true;
scene.add(light4);
const helper4 = new THREE.PointLightHelper(light4);
scene.add(helper4);

var light5 = new THREE.PointLight(0xffffff,.5);
light5.position.set(0,40,0);
light5.castShadow = true;
scene.add(light5);
const helper5 = new THREE.PointLightHelper(light5);
scene.add(helper5);

var light6 = new THREE.PointLight(0xffffff,.5);
light6.position.set(0,40,-100);
light6.castShadow = true;
scene.add(light6);
const helper6 = new THREE.PointLightHelper(light6);
scene.add(helper6);

var light7 = new THREE.PointLight(0xffffff,.5);
light7.position.set(0,40,-200);
light7.castShadow = true;
scene.add(light7);
const helper7 = new THREE.PointLightHelper(light7);
scene.add(helper7);

var light8 = new THREE.PointLight(0xffffff,.5);
light8.position.set(0,40,-300);
light8.castShadow = true;
scene.add(light8);
const helper8 = new THREE.PointLightHelper(light8);
scene.add(helper8);

// Ground - Bowling Alley
const groundGeo = new THREE.PlaneGeometry(42, 720, 100, 100);
const groundMat = new THREE.MeshPhongMaterial({ 
  color: 0x0000ff,
  side: THREE.DoubleSide,
  wireframe: false 
 });
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
scene.add(groundMesh);
groundMesh.receiveShadow = true;

const groundBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(21, 360, 0.1)),
  type: CANNON.Body.STATIC,
  material: groundPhysMat
});
world.addBody(groundBody);
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

// Sphere - Bowling Ball
const sphereGeo = new THREE.SphereGeometry(4.25);
const sphereMat = new THREE.MeshPhongMaterial({ 
  color: 0xff0000, 
  wireframe: false,
 });
const sphereMesh = new THREE.Mesh( sphereGeo, sphereMat);
scene.add(sphereMesh);
sphereMesh.castShadow = true;

const spherePhysMat = new CANNON.Material();
const sphereBody = new CANNON.Body({
    mass: 7.2,
    shape: new CANNON.Sphere(4.25),
    position: new CANNON.Vec3(0, 5, 360),
    material: spherePhysMat
});
world.addBody(sphereBody);
sphereBody.linearDamping = 0.15; 

// Sphere to Ground Contact
const groundSphereContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    spherePhysMat,
    {restitution: .3}
);
world.addContactMaterial(groundSphereContactMat);

// Bowling Pins
// Mock Bowling Pin with physics - Made in three.js
// Start with renctangular prism - ideally add sphere on top
// In future change to ammo.js for physics to allow for GLTF 3D models

// Pin 1
const boxGeo = new THREE.BoxGeometry(4.75, 15, 4.75);
const boxMat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	wireframe: false
});
const boxMesh = new THREE.Mesh(boxGeo, boxMat);
scene.add(boxMesh);
boxMesh.castShadow = true;

const boxPhysMat = new CANNON.Material();
const boxBody = new CANNON.Body({
    mass: 6.5,
    shape: new CANNON.Box(new CANNON.Vec3(2.375, 7.5, 2.375)),
    position: new CANNON.Vec3(0, 7.5, -210),
    material: boxPhysMat
});
world.addBody(boxBody);

boxBody.angularVelocity.set(0, 10, 0);
boxBody.angularDamping = 0.5; 
const groundBoxContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    boxPhysMat,
    {friction: 0.04}
);
world.addContactMaterial(groundBoxContactMat);

// Pin2
const box2Geo = new THREE.BoxGeometry(4.75, 15, 4.75);
const box2Mat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	wireframe: false
});
const box2Mesh = new THREE.Mesh(box2Geo, box2Mat);
scene.add(box2Mesh);
boxMesh.castShadow = true;

const box2PhysMat = new CANNON.Material();
const box2Body = new CANNON.Body({
    mass: 6.5,
    shape: new CANNON.Box(new CANNON.Vec3(2.375, 7.5, 2.375)),
    position: new CANNON.Vec3(4, 7.5, -225),
    material: box2PhysMat
});
world.addBody(box2Body);

box2Body.angularVelocity.set(0, 10, 0);
box2Body.angularDamping = 0.5; 
const groundBox2ContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    box2PhysMat,
    {friction: 0.04}
);
world.addContactMaterial(groundBox2ContactMat);

// Pin 3
const box3Geo = new THREE.BoxGeometry(4.75, 15, 4.75);
const box3Mat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	wireframe: false
});
const box3Mesh = new THREE.Mesh(box3Geo, box3Mat);
scene.add(box3Mesh);
box3Mesh.castShadow = true;

const box3PhysMat = new CANNON.Material();
const box3Body = new CANNON.Body({
    mass: 6.5,
    shape: new CANNON.Box(new CANNON.Vec3(2.375, 7.5, 2.375)),
    position: new CANNON.Vec3(-4, 7.5, -225),
    material: box3PhysMat
});
world.addBody(box3Body);

box3Body.angularVelocity.set(0, 10, 0);
box3Body.angularDamping = 0.5; 
const groundBox3ContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    box3PhysMat,
    {friction: 0.04}
);
world.addContactMaterial(groundBox3ContactMat);

// Pin 4
const box4Geo = new THREE.BoxGeometry(4.75, 15, 4.75);
const box4Mat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	wireframe: false
});
const box4Mesh = new THREE.Mesh(box4Geo, box4Mat);
scene.add(box4Mesh);
box4Mesh.castShadow = true;

const box4PhysMat = new CANNON.Material();
const box4Body = new CANNON.Body({
    mass: 6.5,
    shape: new CANNON.Box(new CANNON.Vec3(2.375, 7.5, 2.375)),
    position: new CANNON.Vec3(0, 7.5, -240),
    material: box4PhysMat
});
world.addBody(box4Body);

box4Body.angularVelocity.set(0, 10, 0);
box4Body.angularDamping = 0.5; 
const groundBox4ContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    box4PhysMat,
    {friction: 0.04}
);
world.addContactMaterial(groundBox4ContactMat);


// Pin 5
const box5Geo = new THREE.BoxGeometry(4.75, 15, 4.75);
const box5Mat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	wireframe: false
});
const box5Mesh = new THREE.Mesh(box5Geo, box5Mat);
scene.add(box5Mesh);
box5Mesh.castShadow = true;

const box5PhysMat = new CANNON.Material();
const box5Body = new CANNON.Body({
    mass: 6.5,
    shape: new CANNON.Box(new CANNON.Vec3(2.375, 7.5, 2.375)),
    position: new CANNON.Vec3(-9, 7.5, -240),
    material: box5PhysMat
});
world.addBody(box5Body);

box5Body.angularVelocity.set(0, 10, 0);
box5Body.angularDamping = 0.5; 
const groundBox5ContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    box5PhysMat,
    {friction: 0.04}
);
world.addContactMaterial(groundBox5ContactMat);

// Pin 6
const box6Geo = new THREE.BoxGeometry(4.75, 15, 4.75);
const box6Mat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	wireframe: false
});
const box6Mesh = new THREE.Mesh(box6Geo, box6Mat);
scene.add(box6Mesh);
box6Mesh.castShadow = true;

const box6PhysMat = new CANNON.Material();
const box6Body = new CANNON.Body({
    mass: 6.5,
    shape: new CANNON.Box(new CANNON.Vec3(2.375, 7.5, 2.375)),
    position: new CANNON.Vec3(9, 7.5, -240),
    material: box6PhysMat
});
world.addBody(box6Body);

box6Body.angularVelocity.set(0, 10, 0);
box6Body.angularDamping = 0.5; 
const groundBox6ContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    box6PhysMat,
    {friction: 0.04}
);
world.addContactMaterial(groundBox6ContactMat);

// Pin 7
const box7Geo = new THREE.BoxGeometry(4.75, 15, 4.75);
const box7Mat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	wireframe: false
});
const box7Mesh = new THREE.Mesh(box7Geo, box7Mat);
scene.add(box7Mesh);
box7Mesh.castShadow = true;

const box7PhysMat = new CANNON.Material();
const box7Body = new CANNON.Body({
    mass: 6.5,
    shape: new CANNON.Box(new CANNON.Vec3(2.375, 7.5, 2.375)),
    position: new CANNON.Vec3(-5, 7.5, -255),
    material: box7PhysMat
});
world.addBody(box7Body);

box7Body.angularVelocity.set(0, 10, 0);
box7Body.angularDamping = 0.5; 
const groundBox7ContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    box7PhysMat,
    {friction: 0.04}
);
world.addContactMaterial(groundBox7ContactMat);

// Pin 8 
const box8Geo = new THREE.BoxGeometry(4.75, 15, 4.75);
const box8Mat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	wireframe: false
});
const box8Mesh = new THREE.Mesh(box8Geo, box8Mat);
scene.add(box8Mesh);
box8Mesh.castShadow = true;

const box8PhysMat = new CANNON.Material();
const box8Body = new CANNON.Body({
    mass: 6.5,
    shape: new CANNON.Box(new CANNON.Vec3(2.375, 7.5, 2.375)),
    position: new CANNON.Vec3(5, 7.5, -255),
    material: box8PhysMat
});
world.addBody(box8Body);

box8Body.angularVelocity.set(0, 10, 0);
box8Body.angularDamping = 0.5; 
const groundBox8ContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    box8PhysMat,
    {friction: 0.04}
);
world.addContactMaterial(groundBox8ContactMat);

// Pin 9
const box9Geo = new THREE.BoxGeometry(4.75, 15, 4.75);
const box9Mat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	wireframe: false
});
const box9Mesh = new THREE.Mesh(box9Geo, box9Mat);
scene.add(box9Mesh);
box9Mesh.castShadow = true;

const box9PhysMat = new CANNON.Material();
const box9Body = new CANNON.Body({
    mass: 6.5,
    shape: new CANNON.Box(new CANNON.Vec3(2.375, 7.5, 2.375)),
    position: new CANNON.Vec3(15, 7.5, -255),
    material: box9PhysMat
});
world.addBody(box9Body);

box9Body.angularVelocity.set(0, 10, 0);
box9Body.angularDamping = 0.5; 
const groundBox9ContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    box9PhysMat,
    {friction: 0.04}
);
world.addContactMaterial(groundBox9ContactMat);

// Pin 10
const box10Geo = new THREE.BoxGeometry(4.75, 15, 4.75);
const box10Mat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	wireframe: false
});
const box10Mesh = new THREE.Mesh(box10Geo, box10Mat);
scene.add(box10Mesh);
box10Mesh.castShadow = true;

const box10PhysMat = new CANNON.Material();
const box10Body = new CANNON.Body({
    mass: 6.5,
    shape: new CANNON.Box(new CANNON.Vec3(2.375, 7.5, 2.375)),
    position: new CANNON.Vec3(-15, 7.5, -255),
    material: box10PhysMat
});
world.addBody(box10Body);

box10Body.angularVelocity.set(0, 10, 0);
box10Body.angularDamping = 0.5; 
const groundBox10ContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    box10PhysMat,
    {friction: 0.04}
);
world.addContactMaterial(groundBox10ContactMat);

// Keyboard Input for Sphere Movement
var vel_change = 7;
document.addEventListener('keydown', function(event) {
  if(event.keyCode == 39) { // Right Key & Up Key
    sphereBody.velocity.x += vel_change/2;
    sphereBody.velocity.z -= vel_change;
  }
  if(event.keyCode == 37) { // Left Key & Up Key
    sphereBody.velocity.x -= vel_change/2;
    sphereBody.velocity.z -= vel_change;
  }
  if(event.keyCode == 38) { // Up Key
    sphereBody.velocity.z -= vel_change;
  }
});

// Animate
const timeStep = 1 / 60;
function animate() {
  world.step(timeStep);

  sphereMesh.position.copy(sphereBody.position);
  sphereMesh.quaternion.copy(sphereBody.quaternion);

  groundMesh.position.copy(groundBody.position);
  groundMesh.quaternion.copy(groundBody.quaternion);

  // Pins
  boxMesh.position.copy(boxBody.position);
  boxMesh.quaternion.copy(boxBody.quaternion);

  box2Mesh.position.copy(box2Body.position);
  box2Mesh.quaternion.copy(box2Body.quaternion);

  box3Mesh.position.copy(box3Body.position);
  box3Mesh.quaternion.copy(box3Body.quaternion);

  box4Mesh.position.copy(box4Body.position);
  box4Mesh.quaternion.copy(box4Body.quaternion);

  box5Mesh.position.copy(box5Body.position);
  box5Mesh.quaternion.copy(box5Body.quaternion);

  box6Mesh.position.copy(box6Body.position);
  box6Mesh.quaternion.copy(box6Body.quaternion);

  box7Mesh.position.copy(box7Body.position);
  box7Mesh.quaternion.copy(box7Body.quaternion);

  box8Mesh.position.copy(box8Body.position);
  box8Mesh.quaternion.copy(box8Body.quaternion);

  box9Mesh.position.copy(box9Body.position);
  box9Mesh.quaternion.copy(box9Body.quaternion);

  box10Mesh.position.copy(box10Body.position);
  box10Mesh.quaternion.copy(box10Body.quaternion);

  if (sphereBody.position.z > 0){
    camera.position.z = sphereBody.position.z + 80;
  }
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Window resizing
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Disable key press scrolling
window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}, false);

// Orbit Controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
