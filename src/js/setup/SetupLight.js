import * as THREE from 'three';

export function setupLight(scene) {
  const ambiColor = "#ebd5c2";
  const ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

	const light = new THREE.DirectionalLight(0xffffff, 8);
	light.position.set(5, 20, -20);
	light.target.position.set(30, 30, 30);
	light.castShadow = true;
	light.shadow.camera.left = -50;
	light.shadow.camera.bottom = -50;
	light.shadow.camera.right = 50;
	light.shadow.camera.top = 50;
	scene.add(light);
	// const helper = new THREE.CameraHelper( light.shadow.camera );
	// scene.add(helper);
}