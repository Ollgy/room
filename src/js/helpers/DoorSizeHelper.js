import GUI from 'lil-gui';
import { DOOR_HEIGHT, DOOR_WIDTH, DOOR_SIZE_RATIO,  redrawDoor, calcDoorHeightByWidth, calcDoorWidthByHeight } from '../components/door';

export const DOOR_MIN_HEIGHT = 10;
export const DOOR_MAX_HEIGHT = 25;
export const DOOR_MIN_WIDTH = 8;
export const DOOR_MAX_WIDTH = 20;
export const SIZE_STEP = 1;

export function initDoorSizeHelper(scene, door, doorUpdater) {
  const gui = new GUI();
  const helper = new DoorSizeHelper(door, doorUpdater);
	const controllers = {
		width: {},
		height: {}
	}
	gui
		.add(helper, "keepRatio")
		.setValue(true)
		.name("Сохранять исходную пропорцию")
		.onChange(v => helper.handleKeepRatioChange(v, controllers))
	controllers.height = gui
		.add(helper, 'height', DOOR_MIN_HEIGHT, DOOR_MAX_HEIGHT, SIZE_STEP)
		.name('Высота двери')
		.onChange(v => helper.handleHeightChange(v, controllers));
	controllers.width = gui
		.add(helper, 'width', DOOR_MIN_WIDTH, DOOR_MAX_WIDTH, SIZE_STEP)
		.name('Ширина двери')
		.onChange(v => helper.handleWidthChange(v, controllers))
		.hide();
  scene.add(gui);
  return { gui, helper };
}

class DoorSizeHelper {
	door;
	doorUpdater;
	width;
	height;
	keepRatio;
	constructor(door, doorUpdater) {
		this.door = door;
		this.doorUpdater = doorUpdater;
		this.height = DOOR_HEIGHT;
		this.width = DOOR_WIDTH;
		this.keepRatio = true;
	}

	handleKeepRatioChange(v, controllers) {
		this.keepRatio = v;
		const height = controllers.height.getValue();
		controllers.width.setValue(Math.floor(height * DOOR_SIZE_RATIO));
		if (this.keepRatio) {
			controllers.width.hide();
		} else {
			controllers.width.show();
		}
	}

	handleWidthChange(width, controllers) {
		this.door = redrawDoor(this.door, { height: calcDoorHeightByWidth(this.door, width, this.keepRatio), width });
		this.doorUpdater(this.door);
	}

	handleHeightChange(height, controllers) {
		this.door = redrawDoor(this.door, { height, width: calcDoorWidthByHeight(this.door, height, this.keepRatio) });
		this.doorUpdater(this.door); 
	}
}
