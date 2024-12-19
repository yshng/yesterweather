import {startOfHour, addDays, setHours } from "date-fns";

export function midnight(day: Date) { 
  day = startOfHour(setHours(day, 0));
  day = addDays(day, 1);
  return day;
} 

export function isDay(time: number, sunrise: number, sunset: number) {
  const trimmed = trimMS(time);
  const result = (trimmed > sunrise && trimmed < sunset);
  return result;
}

// return unix time in seconds (no milliseconds)
function trimMS(epoch: number) {
  return Number(epoch.toString().slice(0,10));
}