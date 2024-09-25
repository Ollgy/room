import WebGL from 'three/addons/capabilities/WebGL.js';
import { ROOM_SIZE, initRoom } from './components/room';
import { initDoor, redrawDoor, calcDoorWidthByHeight, calcDoorHeightByWidth } from './components/door';
import { DOOR_SIZE_RATIO } from './components/door';
import { setupLight } from './setup/SetupLight';
import { addCube, addSphere } from './helpers/AddMesh';
import { setupScene } from './setup/SetupScene';
import * as THREE from 'three';
import { initDoorSizeHelper } from './helpers/DoorSizeHelper';
import { onDocumentKeyDown } from './helpers/MoveCameraHelper';

const { camera, scene, renderer } = setupScene();
camera.position.z = 50;
setupLight(scene);


initRoom(scene);

let door;
initDoor(scene).then(res => {
	door = res;
	const updateDoor = (updatedDoor) => door = updatedDoor;
	initDoorSizeHelper(scene, door, updateDoor);
});

const cube = addCube(scene, 5, "red");
cube.position.set(0, -10, 14);

const sphere = addSphere(scene, 8, "blue");
sphere.position.set(ROOM_SIZE / 2 - 9, -5, 0);

document.addEventListener('keydown', ev => onDocumentKeyDown(ev, camera));

function animate(time) {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById("messages").appendChild(warning);
}

