export function numberToHour(n: number) {
  if (n == 0) return "12AM";
  else if (n < 12) return n.toString() + "AM";
  else if (n == 12) return "12PM";
  else return (n - 12).toString() + "PM";
}

export const KEYS = [...Array(24).keys()];
export const HOURS = KEYS.map((num) => numberToHour(num));