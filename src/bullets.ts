import { screenToWorld } from "./camera";
import { minus, normalize } from "./vector";
import * as canvas from "./canvas";

export const onGameTick = (deltaTime: number) => {
  bullets.forEach((b) => step(b, deltaTime));
};

const bulletSize = 8;
const bulletSpeed = 0.5;
export const render = () => {
  bullets.forEach((bullet) => {
    canvas.drawSquareAtCenter(bullet.x, bullet.y, bulletSize, "white");
  });
};

export const fire = (playerPosition: Vector, e: MouseEvent) => {
  bullets.push({
    x: playerPosition.x,
    y: playerPosition.y,
    direction: normalize(
      minus(screenToWorld({ x: e.clientX, y: e.clientY }), {
        x: playerPosition.x,
        y: playerPosition.y,
      })
    ),
  });
};

const bullets: Bullet[] = [];

type Bullet = {
  x: number;
  y: number;
  direction: Vector;
};
function step(b: Bullet, deltaTime: number): void {
  b.x += b.direction.x * deltaTime * bulletSpeed;
  b.y += b.direction.y * deltaTime * bulletSpeed;
}
