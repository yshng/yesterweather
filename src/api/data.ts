import { WeatherProps } from "../components/WeatherContainer";
import { KEYS, HOURS } from "../constants/hours";

export function generateTableData(
  field: "feelslike" | "temp",
  { yesterday, today, tomorrow }: WeatherProps
) {
  const yesArr = [];
  const todayArr = [];
  const tomArr = [];

  let yesDatum;
  let todayDatum;
  let tomDatum;

  const maxString = field == "feelslike" ? "feelslikemax" : "tempmax";
  const minString = field == "feelslike" ? "feelslikemin" : "tempmin";

  const MAX = Math.max(
    yesterday[maxString],
    today[maxString],
    tomorrow[maxString]
  );
  const MIN = Math.min(
    yesterday[minString],
    tomorrow[minString],
    today[minString]
  );

  for (const key of KEYS) {
    yesDatum = yesterday.hours[key][field];
    todayDatum = today.hours[key][field];
    tomDatum = tomorrow.hours[key][field];

    if (
      typeof yesDatum == "number" &&
      typeof todayDatum == "number" &&
      typeof tomDatum == "number"
    ) {
      yesArr.push({
        content: yesDatum,
        headers: `yesterday ${HOURS[key]}`,
      });

      tomArr.push({
        content: tomDatum,
        headers: `tomorrow ${HOURS[key]}`,
      });

      todayArr.push({
        content: todayDatum,
        headers: `today ${HOURS[key]}`,
      });
    }
  }

  return {
    temps: [
      { day: "Yesterday", data: yesArr },
      { day: "Today", data: todayArr },
      { day: "Tomorrow", data: tomArr },
    ],
    extremes: [MIN, MAX],
  };
}


import { CurrentConditions } from "../api/api";

export function getHour(current: CurrentConditions) {
  return Number(current.datetime.slice(0, 2));
}