import * as THREE from 'three';

export function addCube(scene, size, color, meshMaterial) {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = meshMaterial || new THREE.MeshLambertMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.receiveShadow = true;
  scene.add(cube);

  return cube;
}

export function addSphere(scene, radius, color, meshMaterial) {
  const geometry = new THREE.SphereGeometry(radius);
  const material = meshMaterial || new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide});
  material.metalness = 0.5;
  material.roughness = 0.5;
  const sphere = new THREE.Mesh(geometry, material);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  scene.add(sphere);

  return sphere;
}