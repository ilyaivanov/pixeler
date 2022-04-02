import { screenToWorld } from "./engine/camera";
import { minus, normalize } from "./engine/vector";
import * as canvas from "./engine/canvas";
import { doCollide } from "./engine/collision";
import { enemies, Enemy, onCollide } from "./enemies";

export const onGameTick = (deltaTime: number) => {
  bullets.forEach((b) => step(b, deltaTime));

  bullets.forEach((bullet) => {
    enemies.forEach((enemy) => {
      if (doCollide(bullet, enemy)) {
        onBulletCollide(bullet, enemy);
      }
    });
  });
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
    size: bulletSize,
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
  size: number;
  direction: Vector;
};
function step(b: Bullet, deltaTime: number): void {
  b.x += b.direction.x * deltaTime * bulletSpeed;
  b.y += b.direction.y * deltaTime * bulletSpeed;
}

const onBulletCollide = (b: Bullet, e: Enemy) => {
  bullets.splice(bullets.indexOf(b), 1);
  onCollide(e);
};
