import {startOfHour, addDays, setHours } from "date-fns";

export function midnight(day: Date) { 
  day = startOfHour(setHours(day, 0));
  day = addDays(day, 1);
  return day;
} 

export function dayOrNight(time: number, sunrise: number, sunset: number) {
  return (time < sunset && time > sunrise)
  ?  "day"
  :  "night" 
}
