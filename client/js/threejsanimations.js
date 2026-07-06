import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';
// Import all of our manual animation values code from our threejsmanualanimationvalues file.
import { cameraPhases, cameraPhasesSecond, capsuleMachinePhases, capsulesPhases, starsPhases, starsSecondUsePhases } from './threejsmanualanimationvalues.js';
/* -------------------------------------------- */
// Reset the url back to main url after reload.
if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
};




/* -------------------------------------------- */
// Initalize the variables that will see if the screen size is mobile or no here.
const mobileSize = window.matchMedia('(max-width: 991px)');
const mobileSizeMiddleSize = window.matchMedia('(max-width: 767px)');
const mobileSizeLowestSize = window.matchMedia('(max-width: 479px)');





// Resize screen function (call to this later in our 'Scene' functions for resizing when screen changes size).
function onWindowResize(camera, renderer, container) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
};




// Create our loader
const threejsLoader = document.getElementById('threejsLoader');

const loader = new THREE.LoadingManager();

loader.onStart = function(url, loaded, total) {
    threejsLoader.classList.add('loading');
};

loader.onLoad = function() {
    threejsLoader.classList.remove('loading');
};




// Create our classes for each of our unique models (we will add these in our 'Scene' functions when they are needed).
class capsuleMachine {
    static loader = new GLTFLoader(loader); 

    constructor(scene, gravityWorld, modelLink, modelScaleYValue, physicsModelMeshName) {
        this.mesh = null;
        this.body = null;
        this.scene = scene;
        this.gravityWorld = gravityWorld;
        this.modelLink = modelLink;
        this.modelScaleYValue = modelScaleYValue;
        this.physicsModelMeshName = physicsModelMeshName;
    };

    // Create an instance of said object so we don't have to call the init function outside of the class.
    static async create(
        scene, 
        gravityWorld,
        modelLink,
        modelScaleYValue,
        physicsModelMeshName
    ) {
        const instance = new capsuleMachine(
            scene,
            gravityWorld,
            modelLink,
            modelScaleYValue,
            physicsModelMeshName
        );

        await instance.init();

        return instance;
    }

    async init() {
            const gltf = await capsuleMachine.loader.loadAsync(this.modelLink);

            // THREE.JS STUFF

            // Create a variable to use to center a new pivot to the bottom of our mesh.
            this.mesh = new THREE.Group();	
            // Put glb in here.
            let capsuleMachineMesh = gltf.scene;

            // Set the center of the model to the bottom with the pivot related variable.
            this.mesh.add(capsuleMachineMesh);
            const modelBox = new THREE.Box3().setFromObject(capsuleMachineMesh);
            const yOffset = modelBox.min.y;
            capsuleMachineMesh.position.y -= yOffset;

            // Set the scale and rotation of the model.
		    this.mesh.scale.set(10, this.modelScaleYValue, 10);
		    this.mesh.position.set(0, 0, 0);	
		    this.mesh.rotation.y += -0.25;

            // CANNON.JS STUFF (if given a physicsModelMeshName value)

            if(this.physicsModelMeshName) {

                // Inner Physics Mesh (get the dome part of the mesh here, where the capsules will be).
                const capsuleMachineBody = this.mesh.getObjectByName(this.physicsModelMeshName);

	            // Find the bottom of Y for the the dome mesh to snap it's pivot.
	            capsuleMachineBody.geometry.computeBoundingBox();
	            const capsuleMachineBodyBoundingBox = capsuleMachineBody.geometry.boundingBox;
	            const centerX = (capsuleMachineBodyBoundingBox.max.x + capsuleMachineBodyBoundingBox.min.x) / 2;
	            const centerZ = (capsuleMachineBodyBoundingBox.max.z + capsuleMachineBodyBoundingBox.min.z) / 2;
	            const centerBottomY = capsuleMachineBodyBoundingBox.min.y;

	            // Get raw vertex positions and index arrays.
	            const capsuleMachineBodyPosition = capsuleMachineBody.geometry.attributes.position;
	            const capsuleMachineBodyVertex = new Float32Array(capsuleMachineBodyPosition.array);

	            // Do the pivot shifting here for the physics mesh.
	            const capsuleMachineBodyFinalScale = 10;

	            for (let i = 0; i < capsuleMachineBodyVertex.length; i += 3) {

    	            capsuleMachineBodyVertex[i] =
        	            (capsuleMachineBodyVertex[i] - centerX) * capsuleMachineBodyFinalScale;

    	            capsuleMachineBodyVertex[i + 1] =
        	            (capsuleMachineBodyVertex[i + 1] - centerBottomY) * capsuleMachineBodyFinalScale;

    	            capsuleMachineBodyVertex[i + 2] =
        	            (capsuleMachineBodyVertex[i + 2] - centerZ) * capsuleMachineBodyFinalScale;
	            };

	            // Get the geometry index array and use that with the vertex array to create the trimesh.
	            let capsuleMachineDomeIndexArray = capsuleMachineBody.geometry.index.array;
	            const capsuleMachineDomeShape = new CANNON.Trimesh(capsuleMachineBodyVertex, capsuleMachineDomeIndexArray);

	            // Create a body for the trimesh.
	            this.body = new CANNON.Body({
		            mass: 0,
		            shape: capsuleMachineDomeShape
	            });
            };
    };
    

    // This method will set the mesh and body together if needed.
    setPositionForAll() {
        threeJsCannonEsPositionUpdate(this.mesh, this.body);
    };

    // This method will make sure the mesh and other bodies follow the main CANNON in the animation loop.
    followBody() {
        setMeshToBody(this.mesh, this.body);
    }
};

class capsule {
    static loader = new GLTFLoader(loader);
        constructor(scene, gravityWorld, modelLink, hasPhysicsModel) {
            this.mesh = null;
            this.body = null;
            this.scene = scene;
            this.gravityWorld = gravityWorld;
            this.modelLink = modelLink;
            this.hasPhysicsModel = hasPhysicsModel;
        };

        // Create an instance of said object so we don't have to call the init function outside of the class.
        static async create(
            scene, 
            gravityWorld,
            modelLink,
            hasPhysicsModel
        ) {
            const instance = new capsule(
                scene,
                gravityWorld,
                modelLink,
                hasPhysicsModel
            );

            await instance.init();

            return instance;
        }

        async init() {
            const gltf = await capsule.loader.loadAsync(this.modelLink);

            // THREE.JS STUFF

			// Put glb in here.
			this.mesh = gltf.scene;			
			
			// Set scale to zero.
			this.mesh.scale.set(0, 0, 0);
			this.mesh.position.set(0, 0, 0);

            // CANNON.JS STUFF (if given a hasPhysicsModel attribute)

            if(this.hasPhysicsModel === true) {

                // Inner Physics Mesh.
                this.body = new CANNON.Body({
                    mass: 1,
                });
                
                // Create a box for the capsule with a sphere inside so the capsule collides with the capsule machine trimesh.
                this.body.addShape(new CANNON.Box(new CANNON.Vec3(0.11, 0.11, 0.11)));
                this.body.addShape(new CANNON.Sphere(0.11));

                // Allow sleep for the physics mesh on rest.
                this.body.allowSleep = true;
                this.body.sleepSpeedLimit = 0.6;
                this.body.sleepTimeLimit = 3;

                // Stop and bouncing and jittering.
                this.body.linearDamping = 0.95;
                this.body.angularDamping = 0.95;
            };
        };
        

    // This method will set the mesh and body together if needed.
    setPositionForAll() {
        threeJsCannonEsPositionUpdate(this.mesh, this.body);
    };

    // This method will make sure the mesh and other bodies follow the main CANNON in the animation loop.
    followBody() {
        setMeshToBody(this.mesh, this.body);
    }
};

class capsuleBall {
    static loader = new GLTFLoader(loader);
    static texture = new THREE.TextureLoader(loader);
    constructor(scene, textureLink) {
        this.mesh = null;
        this.scene = scene;
        this.textureLink = textureLink;
    };

    // Create an instance of said object so we don't have to call the init function outside of the class.
    static async create(
        scene, 
        textureLink
    ) {
        const instance = new capsuleBall(
            scene,
            textureLink
        );

        await instance.init();

        return instance;
    }

    async init() {
            const texture = await capsuleBall.texture.loadAsync(this.textureLink);

            // Set the texture attributes.
            texture.flipY = false;
            texture.offset.setX(0.8);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;



            const gltf = await capsuleBall.loader.loadAsync('../three.js/models/ball_blinn.glb')

            // THREE.JS STUFF

            // Put glb in here.
			this.mesh = gltf.scene;

			// Set scale to zero.
			this.mesh.scale.set(0, 0, 0);
			this.mesh.position.set(0, 0, 0);

			// Add the ball textures to the mesh.
			this.mesh.traverse((child) => {
				if (child.isMesh) {
        			child.material.map = texture;
				}
			});
        };
};

class star {
    static loader = new GLTFLoader(loader);
    static texture = new THREE.TextureLoader(loader);
    constructor(scene, modelLink) {
        this.mesh = null;
        this.starMovingTexture = null;
        this.scene = scene;
        this.modelLink = modelLink;
    };

    // Create an instance of said object so we don't have to call the init function outside of the class.
    static async create(
        scene, 
        modelLink
    ) {
        const instance = new star(
            scene,
            modelLink
        );

        await instance.init();

        return instance;
    }

    async init() {
            const texture = await star.texture.loadAsync('../three.js/textures/stars_texture.jpg');
            this.starMovingTexture = texture;
            // Set the texture attributes.
            texture.center.set(0.5, 0.5);
            texture.repeat.set(4, 4);
            texture.offset.set(0.1, 0.1);
            texture.needsUpdate = true;

        

            const gltf = await star.loader.loadAsync(this.modelLink);

            // THREE.JS STUFF

            // Put glb in here.
            this.mesh = gltf.scene;
                        
            // Set scale and position to zero.
            this.mesh.scale.set(0, 0, 0);
            this.mesh.position.set(0, 0, 0);
            
            // Add the star texture to the mesh.
            this.mesh.traverse((child) => {
                if (child.isMesh) {
                    child.material.map = this.starMovingTexture;
                    child.material.map.wrapS = THREE.RepeatWrapping;
                    child.material.map.wrapT = THREE.RepeatWrapping;
                    child.material.map.repeat.set(4, 4);
                    child.material.map.offset.set(0.1, 0.1);
                    child.material.transparent = true;
                    child.material.opacity = 1;
                    child.material.needsUpdate = true;
                };
            });
    };
};




// Function to update the position of all the types of meshes and their bodies regardless which one it is.
const threeJsCannonEsPositionUpdate = (mesh, body) => {
    if (mesh && body) {
        body.position.copy(mesh.position);
        body.quaternion.copy(mesh.quaternion);
    };
};

const setMeshToBody = (mesh, body) => {
    if (mesh && body) {
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
    }
};




// Function to set up a basic three.js scene for any container/div element (call this inside our 'Scene' functions).
const createScene = (sceneId) => {
    // Get our element
    const container = document.getElementById(sceneId);

    // Create our scene.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.updateProjectionMatrix();
    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xffffff, 1);
    const clock = new THREE.Clock();
    
    container.appendChild(renderer.domElement);

    // Add lighting to our scene.
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(4, 5, 5);
    scene.add(directionalLight);

    // Observer the scene so that if it is off screen, we do not render it.
    let isVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        },
        {
            threshold: 0.1
        }
    );

    observer.observe(container);

    


    return {
        container, 
        scene, 
        camera, 
        renderer, 
        clock,
        ambientLight, 
        directionalLight,
        isVisible: () => isVisible
    };

};




// Code related to the CANNON.World physics
const gravityWorld = new CANNON.World();
gravityWorld.gravity.set(0, -9.82, 0);
gravityWorld.allowSleep = true;
gravityWorld.solver.iterations = 5;

// Set up the gravity related attributes.
const timeStep = 1 / 60;
let lastTime;




// Any animated scenes for any containers in our HTML.
const Scene = async(sceneId) => {

    // Run the scene setup from our createScene function.
	const { container, scene, camera, renderer, clock, ambientLight, directionalLight, isVisible } = createScene(sceneId);

    // Check what div is being targeted, as each one requires different animations.
    switch(sceneId) {
        case 'threejsIntro':
            // Change camera position to center the models visually.
	        camera.position.y = 1.35;

            // All object instances of all meshes.
            // Add the capsule machine models we will use in.
            let machine = await capsuleMachine.create(scene, gravityWorld, '../three.js/models/machine.glb', 0, false);
            let emptyMachine = await capsuleMachine.create(scene, gravityWorld, '../three.js/models/empty_machine.glb', 10, 'MachineCapsuleDome');
            scene.add(machine.mesh);

            // Add the capsules we will use inside an array.
            let capsules = [
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_1.glb', true),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_2.glb', true),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_3.glb', true),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_4.glb', true),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_5.glb', true),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_6.glb', true),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_7.glb', true),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_8.glb', true),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_9.glb', true),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_10.glb', true),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_11.glb', true),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_12.glb', true),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_13.glb', true)
            ];

            // Add all the stars we will use inside here.
            let stars = [
                await star.create(scene, '../three.js/models/star_1.glb'),
                await star.create(scene, '../three.js/models/star_2.glb'),
                await star.create(scene, '../three.js/models/star_3.glb'),
                await star.create(scene, '../three.js/models/star_4.glb'),
                await star.create(scene, '../three.js/models/star_5.glb'),
                await star.create(scene, '../three.js/models/star_6.glb')
            ];

            let starsSecondUse = [
                await star.create(scene, '../three.js/models/star_5.glb'),
                await star.create(scene, '../three.js/models/star_5.glb'),
                await star.create(scene, '../three.js/models/star_5.glb'),
                await star.create(scene, '../three.js/models/star_5.glb'),
                await star.create(scene, '../three.js/models/star_5.glb'),
                await star.create(scene, '../three.js/models/star_5.glb')
            ];

            stars.forEach((star) => {
                scene.add(star.mesh);
            });

            


            // Phases for each type of animation.
	        const overallAnimationPhases = {
		        firstIntroAnimation: {
                    status: false,
                },
                secondManualAnimation: {
                    status: true,
                    capsuleMachineAnimationFinish: false,
                    starsAnimationFinish: false
                },
                thirdCameraCapsuleBallsAndStarsAnimation: {
                    status: false,
                    cameraAnimationFinish: false,
                    supplementaryLoading1: false,
                    starsPopInFinish: false,
                    capsulesLoadedFinish: false,
                },
                fourthShakeStarsRotateAnimation: {
                    status: false,
                    secondCameraAnimationFinish: false,
                    capsuleMachineJoggleSet: false,
                    javaScriptAnimationsLoaded: false,
                }
	        };

    


            // All animation functions here.
            // Control the phases of all types of animations here.
	        const phaseOfOverallAnimations = (current, next) => {
	            current.status = false;
                next.status = true;
	        };  

            // Control the manual animation frames here.
	        const animationFrames = (current, target, speed, delta) => {
                const deltaSpeed = speed * delta;

	            if (speed === 0) return target;
		        if (current < target) return Math.min(current + deltaSpeed, target);
	            if (current > target) return Math.max(current - deltaSpeed, target);
		        return current;
	        };
            
            // Function that handles all the manual animation coordinate changes.
            const manualAnimationChange = (modelPhases, classArray, animationPhase, phaseToCheckIfFinal, delta) => {
                if(modelPhases === capsuleMachinePhases) {
                    const AnimationsPhase = modelPhases.phases[modelPhases.phase];
                    if (AnimationsPhase) {

                        // Handle any scale animations on y axis.
			            classArray.mesh.scale.y = animationFrames
			            (
			            classArray.mesh.scale.y, 
			            AnimationsPhase.scaleY, 
			            AnimationsPhase.scaleSpeedY,
                        delta
			            );

			            // Handle any rotation animations on z axis.
			            classArray.mesh.rotation.z = animationFrames
			            (
			            classArray.mesh.rotation.z, 
			            AnimationsPhase.rotationZ, 
			            AnimationsPhase.rotationSpeedZ,
                        delta
			            );

			            // Handle any position animations on y axis.
		                classArray.mesh.position.y = animationFrames
			            (
			            classArray.mesh.position.y, 
			            AnimationsPhase.positionY, 
			            AnimationsPhase.positionSpeedY,
                        delta
			            );

			            // Make sure all scalings match targets before going on to/incrementing to next phase. 
			            const scaleFinished = classArray.mesh.scale.y === AnimationsPhase.scaleY;
			            const rotationFinished = classArray.mesh.rotation.z === AnimationsPhase.rotationZ;
			            const positionFinished = classArray.mesh.position.y === AnimationsPhase.positionY;

			            if (scaleFinished && rotationFinished && positionFinished) {
				            modelPhases.phase++;
			            };
		
		            } else {
                        if(phaseToCheckIfFinal) {
                            // Check off the sub-phase of the main level animation if the entire animation is done.
                            if(!animationPhase[phaseToCheckIfFinal]) {
                                animationPhase[phaseToCheckIfFinal] = true;
                            };
                        } else {
                            return;
                        };
                    };
                } else if(modelPhases === cameraPhases || modelPhases === cameraPhasesSecond) {
                    const AnimationsPhase = modelPhases.phases[modelPhases.phase];
                        if (AnimationsPhase) {

				            // Handle all position animations.
				            camera.position.x = animationFrames
                            (
					        camera.position.x,
					        AnimationsPhase.positionX,
					        AnimationsPhase.positionSpeedX,
                            delta
				            );

				            camera.position.y = animationFrames
                            (
					        camera.position.y,
					        AnimationsPhase.positionY,
					        AnimationsPhase.positionSpeedY,
                            delta
				            );

				            camera.position.z = animationFrames
                            (
					        camera.position.z,
					        AnimationsPhase.positionZ,
					        AnimationsPhase.positionSpeedZ,
                            delta
				            );

				            // Handle all rotation animations.
				            camera.rotation.x = animationFrames
                            (
					        camera.rotation.x,
					        AnimationsPhase.rotationX,
					        AnimationsPhase.rotationSpeedX,
                            delta
				            );

				            camera.rotation.y = animationFrames
                            (
					        camera.rotation.y,
					        AnimationsPhase.rotationY,
					        AnimationsPhase.rotationSpeedY,
                            delta
				            );

				            camera.rotation.z = animationFrames
                            (
					        camera.rotation.z,
					        AnimationsPhase.rotationZ,
					        AnimationsPhase.rotationSpeedZ,
                            delta
				            );
				
				

				            // Make sure all scalings match targets before going on to/incrementing to next phase. 
				            const rotationFinished = camera.rotation.x === AnimationsPhase.rotationX && camera.rotation.y === AnimationsPhase.rotationY && camera.rotation.z === AnimationsPhase.rotationZ;
				            const positionFinished = camera.position.x === AnimationsPhase.positionX && camera.position.y === AnimationsPhase.positionY && camera.position.z === AnimationsPhase.positionZ;

				            if (rotationFinished && positionFinished) {
                                modelPhases.phase++;
                            };        
		
		                } else {
                            if(phaseToCheckIfFinal) {
                                // Check off the sub-phase of the main level animation if the entire animation is done.
                                if(!animationPhase[phaseToCheckIfFinal]) {
                                animationPhase[phaseToCheckIfFinal] = true;
                                };
                            } else {
                                return;
                            };
                         };
                } else {
                    classArray.forEach((meshIdx, idx) => {
                        const AnimationsPhase = modelPhases[idx].phases[modelPhases[idx].phase];
                        if (AnimationsPhase) {
                    
                            // Handle any scale animations.
				            meshIdx.mesh.scale.set(
					            animationFrames
                                (
						        meshIdx.mesh.scale.x,
						        AnimationsPhase.scaleXYZ,
						        AnimationsPhase.scaleSpeedXYZ,
                                delta
					            ),
					            animationFrames(
						        meshIdx.mesh.scale.y,
						        AnimationsPhase.scaleXYZ, 
						        AnimationsPhase.scaleSpeedXYZ,
                                delta
					            ),
					            animationFrames(
						        meshIdx.mesh.scale.z,
						        AnimationsPhase.scaleXYZ,
						        AnimationsPhase.scaleSpeedXYZ,
                                delta
					            ),
				            );

				            // Handle all position animations.
				            meshIdx.mesh.position.x = animationFrames
                            (
					        meshIdx.mesh.position.x,
					        AnimationsPhase.positionX,
					        AnimationsPhase.positionSpeedX,
                            delta
				            );

				            meshIdx.mesh.position.y = animationFrames
                            (
					        meshIdx.mesh.position.y,
					        AnimationsPhase.positionY,
					        AnimationsPhase.positionSpeedY,
                            delta
				            );

				            meshIdx.mesh.position.z = animationFrames
                            (
					        meshIdx.mesh.position.z,
					        AnimationsPhase.positionZ,
					        AnimationsPhase.positionSpeedZ,
                            delta
				            );

				            // Handle all rotation animations.
				            meshIdx.mesh.rotation.x = animationFrames
                            (
					        meshIdx.mesh.rotation.x,
					        AnimationsPhase.rotationX,
					        AnimationsPhase.rotationSpeedX,
                            delta
				            );

				            meshIdx.mesh.rotation.y = animationFrames
                            (
					        meshIdx.mesh.rotation.y,
					        AnimationsPhase.rotationY,
					        AnimationsPhase.rotationSpeedY,
                            delta
				            );

				            meshIdx.mesh.rotation.z = animationFrames
                            (
					        meshIdx.mesh.rotation.z,
					        AnimationsPhase.rotationZ,
					        AnimationsPhase.rotationSpeedZ,
                            delta
				            );
				
				

				            // Make sure all scalings match targets before going on to/incrementing to next phase. 
				            const scaleFinished = meshIdx.mesh.scale.x === AnimationsPhase.scaleXYZ && meshIdx.mesh.scale.y === AnimationsPhase.scaleXYZ && meshIdx.mesh.scale.z === AnimationsPhase.scaleXYZ;
				            const rotationFinished = meshIdx.mesh.rotation.x === AnimationsPhase.rotationX && meshIdx.mesh.rotation.y === AnimationsPhase.rotationY && meshIdx.mesh.rotation.z === AnimationsPhase.rotationZ;
				            const positionFinished = meshIdx.mesh.position.x === AnimationsPhase.positionX && meshIdx.mesh.position.y === AnimationsPhase.positionY && meshIdx.mesh.position.z === AnimationsPhase.positionZ;
				            if ("opacity" in AnimationsPhase) {
                                let opacityFinished = true;

                                 meshIdx.mesh.traverse((child) => {
					                if (child.isMesh) {
						                // Handle all opacity animations.
						                child.material.opacity = animationFrames(
							            child.material.opacity,
							            AnimationsPhase.opacity,
							            AnimationsPhase.opacitySpeed,
                                        delta
						                );
					                };
                                });

                                // Check if opacity animation is done.
				                meshIdx.mesh.traverse(child => {
					                if (child.isMesh) {
						                if (child.material.opacity !== AnimationsPhase.opacity) {
							                opacityFinished = false;
						                };
					                };
				                });
                                // If there is opacity values, we now have to check for that too.
                                if (scaleFinished && rotationFinished && positionFinished && opacityFinished) {
                                    modelPhases[idx].phase++;
                                };

                            } else {
                                // If there is no opacity values, disregard it entirely.
                                if (scaleFinished && rotationFinished && positionFinished) {
                                    modelPhases[idx].phase++;
                                };

                            };
				            
		
		                } else {
                            // Check if the meshes are the stars from the first manual animation phase and remove them if their animation is done.
                            if (modelPhases === starsPhases) {
                                scene.remove(meshIdx.mesh);
                            };

                            if(phaseToCheckIfFinal) {
                                // Check off the sub-phase of the main level animation if the entire animation is done.
                                if(!animationPhase[phaseToCheckIfFinal]) {
                                    animationPhase[phaseToCheckIfFinal] = true;
                                };
                            } else {
                                return;
                            };
                         };
                    });     
                          
                };
            };

            // Function that handles the second set of starts if the screen size is the smallest.
            const starDisplayChange = (starsSecondUse) => {
                // Check screen size.
                if(!mobileSizeLowestSize.matches) {
                    starsSecondUse.forEach((star) => {
                        if (!scene.children.includes(star.mesh)) {
                            scene.add(star.mesh);
                        };
                    });
                } else {
                    starsSecondUse.forEach((star) => {
                        if (scene.children.includes(star.mesh)) {
                            scene.remove(star.mesh);
                        };
                    });
                }
            };

            // Function that handles camera change if the screen is mobile or not.
            const changeCameraPosition = () => {
                if (mobileSize.matches) {
                    camera.position.x = 0;
                    camera.position.y = 2;
                    camera.position.z = 1.46;
                    camera.rotation.x = -0.1;
                    camera.rotation.y = 0;
                } else {
                    camera.position.x = -0.239;
                    camera.position.y = 1.87;
                    camera.position.z = 1.2;
                    camera.rotation.x = 0.015;
                    camera.rotation.y = 0.25;
                };
            };


            

            let animationFrameFirst;
            // Animation Area.
	        function animate(time) {
                if (!isVisible()) {
                    animationFrameFirst = requestAnimationFrame(animate);
                    return;
                };

                // Create our time-based code for animations.
                const delta = clock.getDelta();
                
                

                
                // Look through the overallAnimationPhases object to see what current animation is active.
                switch(overallAnimationPhases.firstIntroAnimation.status) {
                    case true: 
        
                        break;
            
                };
                switch (overallAnimationPhases.secondManualAnimation.status) {
                    case true:
                    
                        if(!overallAnimationPhases.secondManualAnimation.capsuleMachineAnimationFinish 
                        || !overallAnimationPhases.secondManualAnimation.starsAnimationFinish) {
                            // Animate the manual intro animation for the capsule machine and stars.
                            manualAnimationChange(capsuleMachinePhases, machine, overallAnimationPhases.secondManualAnimation, 'capsuleMachineAnimationFinish', delta);
                            manualAnimationChange(starsPhases, stars, overallAnimationPhases.secondManualAnimation, 'starsAnimationFinish', delta);
                            
                        } else {
                            // Delete the star object array.
                            stars = null;
                            phaseOfOverallAnimations(overallAnimationPhases.secondManualAnimation, overallAnimationPhases.thirdCameraCapsuleBallsAndStarsAnimation);
                        };

                        break;
    
                };
                switch (overallAnimationPhases.thirdCameraCapsuleBallsAndStarsAnimation.status) {
                    case true:

                        if(!overallAnimationPhases.thirdCameraCapsuleBallsAndStarsAnimation.cameraAnimationFinish  
                           || !overallAnimationPhases.thirdCameraCapsuleBallsAndStarsAnimation.capsulesLoadedFinish
                           || !overallAnimationPhases.thirdCameraCapsuleBallsAndStarsAnimation.starsPopInFinish) {
                            // Animate the manual camera animation.
                            manualAnimationChange(cameraPhases, camera, overallAnimationPhases.thirdCameraCapsuleBallsAndStarsAnimation, 'cameraAnimationFinish', delta);

                            // Check if the camera animation phase is on the second phase so that we can add a new empty capsule machine and capsules and balls one time.
                            if(cameraPhases.phase === 1 && !overallAnimationPhases.thirdCameraCapsuleBallsAndStarsAnimation.supplementaryLoading1) {
                                // Delete the prior model and re-add it in the empty varient now with the actual machine dome CANNON body.
                                scene.remove(machine.mesh);
                                scene.add(emptyMachine.mesh);
                                gravityWorld.addBody(emptyMachine.body);

                                // Add all the capsules and balls into the machine.
                                capsules.forEach((capsule) => {
                                    scene.add(capsule.mesh);
                                    gravityWorld.addBody(capsule.body);
                                });
                                
                                // Check the screen size to display the second set of stars or not.
                                starDisplayChange(starsSecondUse);

                                overallAnimationPhases.thirdCameraCapsuleBallsAndStarsAnimation.supplementaryLoading1 = true;

                            };

                            // Now, we need to do the animations that require them to be re-run in the animation loop (not run one time like in the statement above).
                            if (overallAnimationPhases.thirdCameraCapsuleBallsAndStarsAnimation.supplementaryLoading1) {
                                // Now, position everything.
                                manualAnimationChange(capsulesPhases, capsules, overallAnimationPhases.thirdCameraCapsuleBallsAndStarsAnimation, 'capsulesLoadedFinish', delta);
                                capsules.forEach((capsule) => {
                                    capsule.setPositionForAll();
                                });
                                emptyMachine.setPositionForAll();
                                // Position the second set of stars into our scene.
                                manualAnimationChange(starsSecondUsePhases, starsSecondUse, overallAnimationPhases.thirdCameraCapsuleBallsAndStarsAnimation, 'starsPopInFinish', delta);
                            };

                        } else {
                            // Delete the machine variable.
                            machine = null;
                            phaseOfOverallAnimations(overallAnimationPhases.thirdCameraCapsuleBallsAndStarsAnimation, overallAnimationPhases.fourthShakeStarsRotateAnimation);
                        };

                        break;

                };
                switch (overallAnimationPhases.fourthShakeStarsRotateAnimation.status) {
                    case true:

                         // Set up gravity for physics detection/collision/physics mesh positions so every frame these are updated.
		                if (lastTime !== undefined) {
       		                const deltaTime = (time - lastTime) / 1000;
       		                gravityWorld.step(timeStep, deltaTime, 1);
   		                };

                        lastTime = time;

                        // Rotate the stars in starsSecondUse and constantly move the texture on them.
                        starsSecondUse.forEach((star, idx) => {
                            star.starMovingTexture.offset.x += 0.9 * delta;
                            if (idx >= starsSecondUse.length / 2) {
                                star.mesh.rotation.z -= 0.9 * delta;
                            } else {
                                star.mesh.rotation.z += 0.9 * delta;
                            };
                        });

                        // Make sure the Three.js mesh copies the Cannon-es physics mesh for all related models follow what needs to be followed (the capsule mesh following the body and the machine mesh following the body mesh).
                        capsules.forEach((capsule) => {
                            capsule.followBody();
                         });

                        emptyMachine.followBody();

                        // Always check to see about the screen size so the stars display or not (So on the smallest screen it won't take up space and go out of the container).
                        starDisplayChange(starsSecondUse);

                        if (!overallAnimationPhases.fourthShakeStarsRotateAnimation.secondCameraAnimationFinish) {
                            // Animate the camera again if it is on desktop.
                            if (!mobileSize.matches) {
                                manualAnimationChange(cameraPhasesSecond, camera, overallAnimationPhases.fourthShakeStarsRotateAnimation, 'secondCameraAnimationFinish', delta);
                            } else {
                            // Bypass the second camera part if not on desktop size
                            overallAnimationPhases.fourthShakeStarsRotateAnimation.secondCameraAnimationFinish = true;
                            };

                        } else {
                            // Always check to see if the screen size is mobile or not to move it to the center. If not, move it to the right of the screen.
                            changeCameraPosition();
                        };
                       
                        // Add an event listener for when the mouse is moving on the header.
                        if (overallAnimationPhases.fourthShakeStarsRotateAnimation.secondCameraAnimationFinish && !overallAnimationPhases.fourthShakeStarsRotateAnimation.capsuleMachineJoggleSet) {
                            const header = document.getElementById('threejsIntro');
                        };

                        if (!overallAnimationPhases.fourthShakeStarsRotateAnimation.javaScriptAnimationsLoaded) {
                            // Create a style tag in the html code to load the jsanimations.js file.
                            const jsAnimations = document.createElement('script');
                            jsAnimations.src = 'js/jsanimations.js';
                            document.body.appendChild(jsAnimations);
                            // Scroll the page again.
                            document.body.style.overflowY = 'visible';

                            overallAnimationPhases.fourthShakeStarsRotateAnimation.javaScriptAnimationsLoaded = true;
                        };

                        break;

                };
                
                // Renderer for scene.
		        renderer.render(scene, camera);

                animationFrameFirst = requestAnimationFrame(animate);
            };
            
            animate();




            break;

        case 'threejsSecond':
            // Add the capsules we will use inside an array.
            let capsulesSecondScreen = [
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_yellow.glb', false),
                await capsule.create(scene, gravityWorld, '../three.js/models/capsule_purple.glb', false),
            ];

            capsulesSecondScreen.forEach((capsule, idx) => {
                scene.add(capsule.mesh);
            });

            // Add the capsule balls we will use inside an array.
            let capsuleBallsSecondScreen = [
                await capsuleBall.create(scene, '../three.js/textures/html5_ball_texture.jpg'),
                await capsuleBall.create(scene, '../three.js/textures/css3_ball_texture.jpg'),
                await capsuleBall.create(scene, '../three.js/textures/sass_ball_texture.jpg'),
                await capsuleBall.create(scene, '../three.js/textures/javascript_ball_texture.jpg'),
            ];

            capsuleBallsSecondScreen.forEach((ball, idx) => {
                scene.add(ball.mesh);
            });




            let animationFrameSecond;
            // Animation Area.
	        function animateSecond() {
                if (!isVisible()) {
                    animationFrameSecond = requestAnimationFrame(animateSecond);
                    return;
                };

                // Create our time-based code for animations.
                const delta = clock.getDelta();


                
                
                // Capsules rotations.
                    capsulesSecondScreen.forEach((capsule, idx) => {

                        switch(idx) {
                            case 0:
                                capsulesSecondScreen[idx].mesh.rotation.y -= 0.9 * delta;

                                break;
                            case 1:
                                capsulesSecondScreen[idx].mesh.rotation.y += 0.9 * delta;

                                break;
                        };

                    });
                
                // Balls rotations.
                    capsuleBallsSecondScreen.forEach((ball, idx) => {

                        switch(idx) {
                            case 0:
                                capsuleBallsSecondScreen[idx].mesh.rotation.y -= 0.9 * delta;
                                capsuleBallsSecondScreen[idx].mesh.rotation.z -= 0.9 * delta;

                                break;
                            case 1:
                                capsuleBallsSecondScreen[idx].mesh.rotation.y += 0.9 * delta;
                                capsuleBallsSecondScreen[idx].mesh.rotation.z += 0.9 * delta;

                                break;
                            case 2:
                                capsuleBallsSecondScreen[idx].mesh.rotation.x -= 0.9 * delta;
                                capsuleBallsSecondScreen[idx].mesh.rotation.y -= 0.9 * delta;
                                capsuleBallsSecondScreen[idx].mesh.rotation.z -= 0.9 * delta;

                                break;
                            case 3:
                                capsuleBallsSecondScreen[idx].mesh.rotation.x += 0.9 * delta;
                                capsuleBallsSecondScreen[idx].mesh.rotation.y += 0.9 * delta;
                                capsuleBallsSecondScreen[idx].mesh.rotation.z += 0.9 * delta;

                                break;
                        };

                    });




                // Check for different screen sizes to change the position of the capsules and balls or the sizes of them.
                if (!mobileSize.matches) {
                    
                    capsulesSecondScreen.forEach((capsule, idx) => {
                        capsule.mesh.scale.set(4.6, 4.6, 4.6);

                        switch(idx) {
                            case 0:
                                capsulesSecondScreen[idx].mesh.position.x = 0.87;
                                capsulesSecondScreen[idx].mesh.position.y = 0.06;
                                capsulesSecondScreen[idx].mesh.position.z = 1.5;
                                capsulesSecondScreen[idx].mesh.rotation.z = -0.6;

                                break;
                            case 1:
                                capsulesSecondScreen[idx].mesh.position.x = -0.87;
                                capsulesSecondScreen[idx].mesh.position.y = -0.2;
                                capsulesSecondScreen[idx].mesh.position.z = 1.5;
                                capsulesSecondScreen[idx].mesh.rotation.z = 0.6;

                                break;
                        };
               
                    });

                    capsuleBallsSecondScreen.forEach((ball, idx) => {
                        ball.mesh.scale.set(4.6, 4.6, 4.6);

                        switch(idx) {
                            case 0:
                                capsuleBallsSecondScreen[idx].mesh.position.x = -0.87;
                                capsuleBallsSecondScreen[idx].mesh.position.y = -0.2;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                            case 1:
                                capsuleBallsSecondScreen[idx].mesh.position.x = 0.87;
                                capsuleBallsSecondScreen[idx].mesh.position.y = 0.06;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                            case 2:
                                capsuleBallsSecondScreen[idx].mesh.scale.set(3.6, 3.6, 3.6);
                                capsuleBallsSecondScreen[idx].mesh.position.x = 0.79;
                                capsuleBallsSecondScreen[idx].mesh.position.y = 0.15;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                            case 3:
                                capsuleBallsSecondScreen[idx].mesh.scale.set(3.6, 3.6, 3.6);
                                capsuleBallsSecondScreen[idx].mesh.position.x = -0.79;
                                capsuleBallsSecondScreen[idx].mesh.position.y = -0.3;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                        };
                
                    });

                }; 
                
                if (mobileSize.matches) {
                    capsulesSecondScreen.forEach((capsule, idx) => {
                        capsule.mesh.scale.set(4.6, 4.6, 4.6);

                        switch(idx) {
                            case 0:
                                capsulesSecondScreen[idx].mesh.position.x = 0.8;
                                capsulesSecondScreen[idx].mesh.position.y = 0.06;
                                capsulesSecondScreen[idx].mesh.position.z = 1.5;
                                capsulesSecondScreen[idx].mesh.rotation.z = -0.6;

                                break;
                            case 1:
                                capsulesSecondScreen[idx].mesh.position.x = -0.8;
                                capsulesSecondScreen[idx].mesh.position.y = -0.2;
                                capsulesSecondScreen[idx].mesh.position.z = 1.5;
                                capsulesSecondScreen[idx].mesh.rotation.z = 0.6;

                                break;
                        };
               
                    });

                    capsuleBallsSecondScreen.forEach((ball, idx) => {
                        ball.mesh.scale.set(4.6, 4.6, 4.6);

                        switch(idx) {
                            case 0:
                                capsuleBallsSecondScreen[idx].mesh.position.x = -0.8;
                                capsuleBallsSecondScreen[idx].mesh.position.y = -0.2;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                            case 1:
                                capsuleBallsSecondScreen[idx].mesh.position.x = 0.8;
                                capsuleBallsSecondScreen[idx].mesh.position.y = 0.06;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                            case 2:
                                capsuleBallsSecondScreen[idx].mesh.scale.set(3.6, 3.6, 3.6);
                                capsuleBallsSecondScreen[idx].mesh.position.x = 0.7;
                                capsuleBallsSecondScreen[idx].mesh.position.y = 0.15;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                            case 3:
                                capsuleBallsSecondScreen[idx].mesh.scale.set(3.6, 3.6, 3.6);
                                capsuleBallsSecondScreen[idx].mesh.position.x = -0.7;
                                capsuleBallsSecondScreen[idx].mesh.position.y = -0.3;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                        };
                
                    });
                    
                };
                
                if (mobileSizeMiddleSize.matches) {
                    capsulesSecondScreen.forEach((capsule, idx) => {
                        capsule.mesh.scale.set(7, 7, 7);

                        switch(idx) {
                            case 0:
                                capsulesSecondScreen[idx].mesh.position.x = 0.4;
                                capsulesSecondScreen[idx].mesh.position.y = 0.12;
                                capsulesSecondScreen[idx].mesh.position.z = 1.5;
                                capsulesSecondScreen[idx].mesh.rotation.z = -0.6;

                                break;
                            case 1:
                                capsulesSecondScreen[idx].mesh.position.x = -0.4;
                                capsulesSecondScreen[idx].mesh.position.y = 0.12;
                                capsulesSecondScreen[idx].mesh.position.z = 1.5;
                                capsulesSecondScreen[idx].mesh.rotation.z = 0.6;

                                break;
                        };
               
                    });

                    capsuleBallsSecondScreen.forEach((ball, idx) => {
                        ball.mesh.scale.set(7, 7, 7);

                        switch(idx) {
                            case 0:
                                capsuleBallsSecondScreen[idx].mesh.position.x = -0.4;
                                capsuleBallsSecondScreen[idx].mesh.position.y = 0.12;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                            case 1:
                                capsuleBallsSecondScreen[idx].mesh.position.x = 0.4;
                                capsuleBallsSecondScreen[idx].mesh.position.y = 0.12;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                            case 2:
                                capsuleBallsSecondScreen[idx].mesh.scale.set(6, 6, 6);
                                capsuleBallsSecondScreen[idx].mesh.position.x = 0.3;
                                capsuleBallsSecondScreen[idx].mesh.position.y = 0.28;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                            case 3:
                                capsuleBallsSecondScreen[idx].mesh.scale.set(6, 6, 6);
                                capsuleBallsSecondScreen[idx].mesh.position.x = -0.3;
                                capsuleBallsSecondScreen[idx].mesh.position.y = 0.28;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                        };
                
                    });
                };

                if (mobileSizeLowestSize.matches) {
                    capsulesSecondScreen.forEach((capsule, idx) => {
                        capsule.mesh.scale.set(5, 5, 5);

                        switch(idx) {
                            case 0:
                                capsulesSecondScreen[idx].mesh.position.x = 0.3;
                                capsulesSecondScreen[idx].mesh.position.y = 0.12;
                                capsulesSecondScreen[idx].mesh.position.z = 1.5;
                                capsulesSecondScreen[idx].mesh.rotation.z = -0.6;

                                break;
                            case 1:
                                capsulesSecondScreen[idx].mesh.position.x = -0.3;
                                capsulesSecondScreen[idx].mesh.position.y = 0.12;
                                capsulesSecondScreen[idx].mesh.position.z = 1.5;
                                capsulesSecondScreen[idx].mesh.rotation.z = 0.6;

                                break;
                        };
               
                    });

                    capsuleBallsSecondScreen.forEach((ball, idx) => {
                        ball.mesh.scale.set(5, 5, 5);

                        switch(idx) {
                            case 0:
                                capsuleBallsSecondScreen[idx].mesh.position.x = -0.3;
                                capsuleBallsSecondScreen[idx].mesh.position.y = 0.12;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                            case 1:
                                capsuleBallsSecondScreen[idx].mesh.position.x = 0.3;
                                capsuleBallsSecondScreen[idx].mesh.position.y = 0.12;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                            case 2:
                                capsuleBallsSecondScreen[idx].mesh.scale.set(4, 4, 4);
                                capsuleBallsSecondScreen[idx].mesh.position.x = 0.27;
                                capsuleBallsSecondScreen[idx].mesh.position.y = 0.28;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                            case 3:
                                capsuleBallsSecondScreen[idx].mesh.scale.set(4, 4, 4);
                                capsuleBallsSecondScreen[idx].mesh.position.x = -0.27;
                                capsuleBallsSecondScreen[idx].mesh.position.y = 0.28;
                                capsuleBallsSecondScreen[idx].mesh.position.z = 1.5;

                                break;
                        };
                
                    });
                };
    
    

                
                // Renderer for scene.
		        renderer.render(scene, camera);

                animationFrameSecond = requestAnimationFrame(animateSecond);
            };

            animateSecond();




            break;

        case 'threejsThird':
            // Add the capsules we will use inside an array.
            let capsuleThirdScreen = await capsule.create(scene, gravityWorld, '../three.js/models/capsule_gradient.glb', false);
            capsuleThirdScreen.mesh.position.set(0, 0, 0);
            capsuleThirdScreen.mesh.rotation.z = -0.6;
            capsuleThirdScreen.mesh.scale.set(100, 100, 100);
            scene.add(capsuleThirdScreen.mesh);

            // Add the ball that we will use
            let capsuleBallThirdScreen = await capsuleBall.create(scene, '../three.js/textures/logo_ball_texture.jpg');
            capsuleBallThirdScreen.mesh.position.set(0, 0, 0);
            capsuleBallThirdScreen.mesh.scale.set(100, 100, 100);
            scene.add(capsuleBallThirdScreen.mesh);



            
            // Animation Area.
            let animationFrameThird;
	        function animateThird() {
                if (!isVisible()) {
                    animationFrameThird = requestAnimationFrame(animateThird);
                    return;
                };

                // Create our time-based code for animations.
                const delta = clock.getDelta();


                
                
                // Capsule rotations.
                    capsuleThirdScreen.mesh.rotation.y -= 0.9 * delta;
    
                
                
                
                // Renderer for scene.
		        renderer.render(scene, camera);

                animationFrameThird = requestAnimationFrame(animateThird);
            };

            animateThird();




            break;

    };




    // Resize when screen changes size on resize.
	window.addEventListener('resize', () => {
	    onWindowResize(camera, renderer, container);
    });
};



// Call all of our scene functions to launch them all in every div that needs them.
Scene('threejsIntro');
Scene('threejsSecond');
Scene('threejsThird');