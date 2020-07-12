export function convertCelsius(c: number) {
  return c * (9 / 5) + 32;
}

export function convertFahrenheit(f: number) {
  return (f - 32) * (5 / 9);
}
