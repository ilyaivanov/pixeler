import * as canvas from "./canvas";
import * as player from "./player";

const el = canvas.createFullscreenCanvas();

el.style.display = "block";
document.body.appendChild(el);

document.body.style.margin = 0 + "";
document.body.style.backgroundColor = "#7A9EAA";

const render = () => {
  canvas.clear();

  for (let i = 0; i < 10; i += 1) {
    canvas.drawRectRounded(
      -700 + i * 150,
      -700 + i * 150,
      100,
      100,
      10,
      "#A4B6A8"
    );
  }

  player.render();
};

const onTick = (deltaTimeMs: number) => {
  player.onTick(deltaTimeMs);
};

let lastTime = 0;

const onFrame = (time: number) => {
  onTick(time - lastTime);
  render();
  lastTime = time;
  requestAnimationFrame(onFrame);
};

requestAnimationFrame(onFrame);

canvas.addEventListener("resize", render);

render();
