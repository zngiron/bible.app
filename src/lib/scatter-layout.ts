const maxRotation = 4;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function seededRange(seed: number, min: number, max: number) {
  return min + seededRandom(seed) * (max - min);
}

export function getScatterRotation(index: number, salt = 0) {
  return seededRange(index * 3 + salt, -maxRotation, maxRotation);
}
