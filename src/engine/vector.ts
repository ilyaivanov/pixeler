export const minus = (v1: Vector, v2: Vector) => ({
  x: v1.x - v2.x,
  y: v1.y - v2.y,
});

export const normalize = (v: Vector) => {
  const length = Math.sqrt(v.x * v.x + v.y * v.y);
  return { x: v.x / length, y: v.y / length };
};
