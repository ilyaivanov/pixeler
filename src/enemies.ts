import * as canvas from "./canvas";
import { worldSize } from "./constants";
import { distance } from "./player";

let timeSinceLastSpawn = 0;
let timeToNextSpawn = 0;

const minTimeToNextSpawn = 500;
const maxTimeToNextSpawn = 1500;

export const onGameTick = (deltaTime: number) => {
  timeSinceLastSpawn += deltaTime;
  if (timeSinceLastSpawn > timeToNextSpawn) {
    timeToNextSpawn = getRandomNumber(minTimeToNextSpawn, maxTimeToNextSpawn);
    timeSinceLastSpawn = 0;
    spawnEnemy();
  }

  enemies.forEach((e) => step(e, deltaTime));
};

const enemySize = 24;
export const render = () => {
  enemies.forEach((enemy) => {
    canvas.drawSquareAtCenter(enemy.x, enemy.y, enemySize, "#df445c");
  });
};

const enemies: Enemy[] = [
  { type: "straight", direction: "right", x: 0, y: 0 },
  { type: "straight", direction: "left", x: 40, y: 40 },
  { type: "straight", direction: "top", x: 70, y: -20 },
  { type: "straight", direction: "bottom", x: 0, y: 20 },
];

type Direction = "right" | "left" | "top" | "bottom";
type Enemy = {
  type: "straight";
  direction: Direction;
  x: number;
  y: number;
};

const speed = 0.1;

const step = (enemy: Enemy, deltaTime: number) => {
  if (enemy.type === "straight") {
    if (enemy.direction === "right") {
      enemy.x += 1 * deltaTime * speed;
    } else if (enemy.direction === "left") {
      enemy.x -= 1 * deltaTime * speed;
    } else if (enemy.direction === "top") {
      enemy.y -= 1 * deltaTime * speed;
    } else if (enemy.direction === "bottom") {
      enemy.y += 1 * deltaTime * speed;
    }

    if (distance(enemy, { x: 0, y: 0 }) >= worldSize) {
      //move enemy to the pool
      enemies.splice(enemies.indexOf(enemy), 1);
    }
  }
};

const directions: Direction[] = ["right", "left", "top", "bottom"];
const getRandomDirection = () =>
  directions[Math.floor(Math.random() * directions.length)];

const spawnEnemy = () => {
  //take from the pool
  const enemy: Enemy = {
    type: "straight",
    direction: getRandomDirection(),
    x: 0,
    y: 0,
  };
  enemies.push(enemy);
};

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
