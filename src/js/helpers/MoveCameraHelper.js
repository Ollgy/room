export function onDocumentKeyDown(event, camera) {
  const keyCode = event.keyCode;
  switch(keyCode) {
    case 39:
    case 68:
      camera.translateX(0.05);
      break;
    case 37:
    case 65:
      camera.translateX(-0.05);
      break;
    case 38:
    case 87:
      camera.translateY(-0.05);
      break;
    case 40:
    case 83:
      camera.translateY(0.05);
      break;
  }
}