import * as canvas from "./canvas";
import { worldSize } from "./constants";
import * as player from "./player";

const el = canvas.createFullscreenCanvas();

el.style.display = "block";
document.body.appendChild(el);

document.body.style.margin = 0 + "";
document.body.style.backgroundColor = "black";

const cameraOffset = { x: 0, y: 0 };

const positionCamera = () => {
  canvas.canvas.ctx.translate(
    cameraOffset.x + canvas.canvas.width / 2,
    cameraOffset.y + canvas.canvas.height / 2
  );
};

const renderHUD = () => {
  player.renderUI();
};

const renderWorld = () => {
  const { ctx } = canvas.canvas;
  ctx.fillStyle = "#7A9EAA";
  ctx.fillRect(-worldSize, -worldSize, worldSize * 2, worldSize * 2);
  for (let i = 0; i < (worldSize * 2) / 150; i += 1) {
    canvas.drawRect(
      -worldSize + i * 150,
      -worldSize + i * 150,
      100,
      100,
      "#A4B6A8"
    );
  }

  canvas.drawRect(-20, -20, 40, 40, "#40C040");
  player.render();
};

const render = () => {
  canvas.clear();

  positionCamera();
  renderWorld();

  canvas.canvas.ctx.resetTransform();
  renderHUD();
};

const onTick = (deltaTimeMs: number) => {
  player.onTick(deltaTimeMs);

  if (player.position.x - -cameraOffset.x < -100) {
    cameraOffset.x = -player.position.x - 100;
  }
  if (player.position.x - -cameraOffset.x > 100) {
    cameraOffset.x = -player.position.x + 100;
  }

  if (player.position.y - -cameraOffset.y < -100) {
    cameraOffset.y = -player.position.y - 100;
  }
  if (player.position.y - -cameraOffset.y > 100) {
    cameraOffset.y = -player.position.y + 100;
  }
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
