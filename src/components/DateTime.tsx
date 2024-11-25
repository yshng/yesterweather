export function timestamp(date: Date) {
  return date.toISOString().split(".")[0]+"Z";
}