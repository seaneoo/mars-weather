export function convertToFahrenheit(c: number) {
  return c * (9 / 5) + 32;
}

export function convertToMph(ms: number) {
  return ms * 2.237;
}

export function convertToPsi(pa: number) {
  return pa / 6895;
}
