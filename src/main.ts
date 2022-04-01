import * as canvas from "./canvas";

const el = canvas.createFullscreenCanvas();

el.style.display = "block";
document.body.appendChild(el);

document.body.style.margin = 0 + "";
document.body.style.backgroundColor = "#1e1e1e";


const render = () => {
    canvas.clear();
    canvas.drawRect(20, 20, 50, 50, 'white')
    canvas.drawRect(70, 70, 50, 50, 'white')
    canvas.drawRect(220, 220, 50, 50, 'white')
    canvas.drawRect(120, 120, 100, 100, 'white')
};


canvas.addEventListener('resize', render)

render();