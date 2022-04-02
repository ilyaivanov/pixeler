import { distance } from "../player";

export type Square = {
  x: number;
  y: number;
  size: number;
};

export const doCollide = (s1: Square, s2: Square) =>
  distance(s1, s2) < s1.size / 2 + s2.size / 2;
