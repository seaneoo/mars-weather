export function convertToFahrenheit(c: number) {
  return c * (9 / 5) + 32;
}

export function convertToCelsius(f: number) {
  return (f - 32) * (5 / 9);
}

export function convertToMph(m: number) {
  return m * 2.237;
}

export function convertToMs(m: number) {
  return m / 2.237;
}
