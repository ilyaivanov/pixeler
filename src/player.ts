import { buttons } from "./buttons";
import * as canvas from "./canvas";

const speed = 0.1;

let x = 0;
let y = 0;
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
  x += deltaTimeMs * shift.x * speed;
  y += deltaTimeMs * shift.y * speed;
};

export const render = () => {
  canvas.drawRectRounded(x, y, 50, 50, 10, "#ffffff");
};
