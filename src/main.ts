import { worldSize } from "./constants";
import * as player from "./player";
import * as enemies from "./enemies";
import * as bullets from "./bullets";
import * as canvas from "./engine/canvas";
import * as camera from "./engine/camera";

const el = canvas.createFullscreenCanvas();

el.style.display = "block";
document.body.appendChild(el);

document.body.style.margin = 0 + "";
document.body.style.backgroundColor = "black";

const renderHUD = () => {
  //render UI elements here
};

const renderWorld = () => {
  const { ctx } = canvas.canvas;
  ctx.fillStyle = "#7A9EAA";
  ctx.fillRect(-worldSize, -worldSize, worldSize * 2, worldSize * 2);
  ctx.fillStyle = gradient;
  ctx.fillRect(-worldSize, -worldSize, worldSize * 2, worldSize * 2);

  for (let i = 0; i < (worldSize * 2) / 150; i += 1) {
    canvas.drawRect(
      -worldSize + i * 150,
      -worldSize + i * 150,
      100,
      100,
      "#97A199"
    );
  }

  enemies.render();
  bullets.render();
  player.render();
};
const { ctx } = canvas.canvas;
const gradientRadius = Math.sqrt(2 * worldSize * worldSize);
var gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, gradientRadius);

gradient.addColorStop(0, "#7A9EAA");
gradient.addColorStop(1, "#506970");

const render = () => {
  canvas.clear();
  camera.positionCamera();
  renderWorld();

  canvas.canvas.ctx.resetTransform();
  renderHUD();
};

const onTick = (deltaTimeMs: number) => {
  const slowTime = deltaTimeMs;
  player.onTick(slowTime);
  enemies.onGameTick(slowTime);
  bullets.onGameTick(slowTime);

  camera.onTick(player.position);
};

let lastTime = 0;

const onFrame = (time: number) => {
  onTick(time - lastTime);
  render();
  lastTime = time;
  requestAnimationFrame(onFrame);
};

requestAnimationFrame(onFrame);

canvas.addEventListener("resize", () => {
  // onResize();
});

// onResize();
render();
