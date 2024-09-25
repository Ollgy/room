import * as THREE from 'three';
import { loadColorTexture } from '../helpers/Loaders';

export const ROOM_HEIGHT = 30;
export const ROOM_SIZE = 50;

export function initRoom(scene, materials) {
  const walls = createWalls(scene, materials?.walls);
  const ceiling = createCeiling(scene, materials?.ceiling);
  const floor = createFloor(scene, materials?.floor);
  return { walls, floor, ceiling };
}

export async function createWalls(scene, material) {
  const wallGroup = new THREE.Group(scene);
  scene.add(wallGroup);
  const texture = await loadColorTexture('./src/img/wall.jpeg')
  texture.repeat.set(5, 5);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  const wallMaterial = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide});
  wallMaterial.map.minFilter = THREE.NearestFilter;
  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM_SIZE, ROOM_HEIGHT, 0.01),
    wallMaterial
  );
  frontWall.position.z = -ROOM_SIZE / 2;

  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM_SIZE, ROOM_HEIGHT, 0.01),
    wallMaterial
  );
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.x = - ROOM_SIZE / 2;

  const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM_SIZE, ROOM_HEIGHT, 0.01),
    wallMaterial
  );
  rightWall.rotation.y = - Math.PI / 2;
  rightWall.position.x = ROOM_SIZE / 2;
  [frontWall, leftWall, rightWall].forEach(wall => wall.receiveShadow = true);

  wallGroup.add(frontWall, leftWall, rightWall);
  return wallGroup;
}

async function createCeiling(scene, material) {
  const planeGeometry = new THREE.PlaneGeometry(ROOM_SIZE, ROOM_SIZE);
  const ceilingMaterial = material || new THREE.MeshBasicMaterial({ color: "#f1f1f1", side: THREE.DoubleSide});
  const ceiling = new THREE.Mesh(planeGeometry, ceilingMaterial);
  ceiling.rotation.x = - Math.PI / 2; 
  ceiling.position.y = ROOM_HEIGHT /2; 
  ceiling.receiveShadow = true;
  scene.add(ceiling);

  return ceiling;
}

async function createFloor(scene, material) {
  const boxGeometry = new THREE.BoxGeometry(ROOM_SIZE, ROOM_SIZE, 0.1);
  const texture = await loadColorTexture('./src/img/floor.jpg')
  texture.repeat.set(2, 2);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  const floorMaterial = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide});
  floorMaterial.map.minFilter = THREE.NearestFilter;
  const floor = new THREE.Mesh(boxGeometry, floorMaterial);
  floor.rotation.x = Math.PI / 2; 
  floor.position.y = -ROOM_HEIGHT / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  return floor;
}