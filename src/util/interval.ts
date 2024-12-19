export function setIntervalImmediately(fn: (...args: Array<unknown>) => void, interval: number, ...args: Array<unknown>) {
  fn(...args);
  return setInterval(() => fn(...args), interval);
}