import * as THREE from 'three';
import { ROOM_HEIGHT, ROOM_SIZE } from './room';
import { loadColorTexture } from '../helpers/Loaders';

export const DOOR_HEIGHT = 20;
export const DOOR_WIDTH = 15;
export const DOOR_SIZE_RATIO = DOOR_WIDTH / DOOR_HEIGHT;

export async function initDoor(scene) {
  const door = new THREE.Object3D();
  const panel = await createPanel(door);
  door.position.set(-ROOM_SIZE / 4, -ROOM_HEIGHT / 2 + DOOR_HEIGHT / 2, -ROOM_SIZE / 2);
  scene.add(door);
  return { door, panel };
}

export async function createPanel(parent) {
  const panelGeometry = new THREE.BoxGeometry(DOOR_WIDTH, DOOR_HEIGHT, 0.1);
  const texture = await loadColorTexture('./src/img/door.png')
  texture.repeat.set(1, 1);
  const panelMaterial = new THREE.MeshStandardMaterial({ map: texture });
  panelMaterial.map.minFilter = THREE.NearestFilter;
  const panel = new THREE.Mesh(panelGeometry, panelMaterial);
  panel.receiveShadow = true;
  parent.add(panel);

  return panel;
}

export function redrawDoor({ door, panel }, { width, height }) {
  const panelMaterial = panel.material.clone();
  panel.geometry.dispose();
  panel.material.dispose();
  door.remove(panel);
  const updatedPanel = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, 0.1),
    panelMaterial
  );
  
  door.position.y = -ROOM_HEIGHT / 2 + height / 2;
  door.add(updatedPanel);
  return { door, panel: updatedPanel };
}

export function calcDoorWidthByHeight(door, height, keepRatio) {
  return keepRatio 
    ? height * DOOR_SIZE_RATIO 
    : door.panel.geometry.parameters.width;
}

export function calcDoorHeightByWidth(door, width, keepRatio) {
  return keepRatio 
    ? width / DOOR_SIZE_RATIO 
    : door.panel.geometry.parameters.height
}