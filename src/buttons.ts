export const buttons: Record<string, boolean> = {};

document.addEventListener("keydown", (e) => {
  buttons[e.code] = true;
});
document.addEventListener("keyup", (e) => {
  delete buttons[e.code];
});
