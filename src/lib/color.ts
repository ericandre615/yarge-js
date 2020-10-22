export type RGBA = [number, number, number, number];

export const rgba = (r: number, g: number, b: number, a: number): RGBA => {
  const isInRange = [r, g, b, a].every(num => (num >= 0 && num <= 255));

  if (!isInRange) {
    throw Error('Color value not in range (0..255)');
  }

  return [r / 255, g / 255, b / 255, a / 255];
};

export default {
  rgba,
};

