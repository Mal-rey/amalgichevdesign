import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera, scene, renderer, cube, capsule;
let loadedCapsules = [];
const capsulesBehavior = [];

let loadedBalls = [];
let ballsBehavior = [];

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 30;

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
  	renderer.setClearColor( 0xffffff, 0);
	document.body.appendChild(renderer.domElement);

  	const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  	scene.add(ambientLight);

  	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  	directionalLight.position.set(4, 5, 5);
  	scene.add(directionalLight);

	//const geometry = new THREE.BoxGeometry(1, 1, 1);
	//const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
	//cube = new THREE.Mesh(geometry, material);
	//scene.add(cube);

  	const loader = new GLTFLoader();

	loader.load( '../three.js/models/capsule_main_machine.glb', function ( gltf ) {
  	capsule = gltf.scene;
  	capsule.scale.set(150, 150, 150);
	scene.add(capsule);
}, undefined, function ( error ) {
	console.error( error );
} );

let capsulesFiles = [
    '../three.js/models/capsule_1.glb',
    '../three.js/models/capsule_2.glb',
	'../three.js/models/capsule_3.glb',
	'../three.js/models/capsule_4.glb',
]	
	
}


function animate() {
	requestAnimationFrame(animate);
  
	capsule.rotation.x += 0.03;
	capsule.rotation.y += 0.03;
	capsule.rotation.z += 0.03;
	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();