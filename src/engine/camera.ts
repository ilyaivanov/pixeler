import * as canvas from "./canvas";

const cameraOffset = { x: 0, y: 0 };

export const positionCamera = () => {
  canvas.canvas.ctx.translate(
    cameraOffset.x + canvas.canvas.width / 2,
    cameraOffset.y + canvas.canvas.height / 2
  );
};

export const onTick = (playerPosition: Vector) => {
  if (playerPosition.x - -cameraOffset.x < -100) {
    cameraOffset.x = -playerPosition.x - 100;
  }
  if (playerPosition.x - -cameraOffset.x > 100) {
    cameraOffset.x = -playerPosition.x + 100;
  }

  if (playerPosition.y - -cameraOffset.y < -100) {
    cameraOffset.y = -playerPosition.y - 100;
  }
  if (playerPosition.y - -cameraOffset.y > 100) {
    cameraOffset.y = -playerPosition.y + 100;
  }
};

export const screenToWorld = (scren: Vector) => ({
  x: scren.x - canvas.canvas.width / 2 - cameraOffset.x,
  y: scren.y - canvas.canvas.height / 2 - cameraOffset.y,
});
