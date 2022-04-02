import { buttons } from "./buttons";
import * as canvas from "./engine/canvas";
import * as bullets from "./bullets";
import { worldSize } from "./constants";

const speed = 0.3;
const playerSize = 25;

export let position = {
  x: 0,
  y: 0,
};
let shift = {
  x: 0,
  y: 0,
};

export const onTick = (deltaTimeMs: number) => {
  if (buttons["KeyD"]) shift.x = 1;
  else if (buttons["KeyA"]) shift.x = -1;
  else shift.x = 0;

  if (buttons["KeyW"]) shift.y = -1;
  else if (buttons["KeyS"]) shift.y = 1;
  else shift.y = 0;

  const length = Math.sqrt(shift.x * shift.x + shift.y * shift.y);
  if (length > 1) {
    shift.x /= length;
    shift.y /= length;
  }

  position.x += deltaTimeMs * shift.x * speed;
  position.y += deltaTimeMs * shift.y * speed;

  if (position.x > worldSize - playerSize / 2) {
    position.x = worldSize - playerSize / 2;
  } else if (position.x < -worldSize + playerSize / 2) {
    position.x = -worldSize + playerSize / 2;
  }
  if (position.y > worldSize - playerSize / 2) {
    position.y = worldSize - playerSize / 2;
  } else if (position.y < -worldSize + playerSize / 2) {
    position.y = -worldSize + playerSize / 2;
  }
};

export const render = () => {
  canvas.drawSquareAtCenter(position.x, position.y, playerSize, "#F6EBAB");
};

type Vector = {
  x: number;
  y: number;
};

export const distance = (v: Vector, w: Vector) =>
  Math.sqrt(Math.pow(v.x - w.x, 2) + Math.pow(v.y - w.y, 2));

document.addEventListener("mousedown", (e) => {
  bullets.fire(position, e);
});
