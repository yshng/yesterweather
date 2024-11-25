import { useEffect, useState, useRef } from "react";
import { timestamp } from "./DateTime";
import { DailyEntry, getHourlyData, HourlyEntry } from "../api/api";
import { CurrentTemp } from "./CurrentTemp";
import { addDays, roundToNearestHours } from "date-fns";
import { Summary } from "./Summary";
//import { HighsLows } from "./HighsLows";
//import { Precipitation } from "./Precipitation";

interface WeatherContainerProps {
  location: string;
  unitGroup: string;
}

export function WeatherContainer({
  location,
  unitGroup,
}: WeatherContainerProps) {
  const [dailyY, setDailyY] = useState<DailyEntry>();
  const [dailyToday, setDailyToday] = useState<DailyEntry>();
  const [dailyT, setDailyT] = useState<DailyEntry>();
  const [hourlyNowAndFuture, setHourlyNowAndFuture] = useState<HourlyEntry[]>();
  const [hourlyPast24, setHourlyPast24] = useState<HourlyEntry[]>();


  const effectRan = useRef(false);

  // api call
  useEffect(() => {

    if (effectRan.current || process.env.NODE_ENV !== "development") {
      console.log("effect applied only on REmount");

      const options = {method: 'GET', headers: {accept: 'application/json'}};

      //weather recent history API call for yesterday's data

      fetch(`https://api.tomorrow.io/v4/weather/history/recent?location=${location}&timesteps=1d&timesteps=1h&units=${unitGroup}&apikey=hhiYAnl3OSZAtRCty853300PftrNwH9v`, options)
        .then(res => res.json())
        .then(res => {
          setDailyY(res["timelines"]["daily"][0]);
          setHourlyPast24(res["timelines"]["hourly"]);
        })
        .catch(err => console.error(err));

      //weather forecast call for today and future data

      fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1d&timesteps=1h&units=${unitGroup}&apikey=hhiYAnl3OSZAtRCty853300PftrNwH9v`, options)
        .then(res => res.json())
        .then(res => {
          setDailyToday(res["timelines"]["daily"][0]);
          setDailyT(res["timelines"]["daily"][1]);
          setHourlyNowAndFuture(res["timelines"]["hourly"]);
        })
        .catch(err => console.error(err));

      }
    
      effectRan.current = true;

  }, [location, unitGroup])

  if (!dailyToday || !dailyY || !dailyT || !hourlyNowAndFuture || !hourlyPast24) {
    return <p> Problem getting weather data. </p>;
  }
  
  const now = new Date();
  const nearestHour = roundToNearestHours(now);
  const timeString = timestamp(nearestHour);
  const timeStringT = timestamp(addDays(nearestHour,1));
  const today = dailyToday.values;

  return (
    <>
      <CurrentTemp
        feelslike={getHourlyData(hourlyNowAndFuture,timeString,"temperatureApparent")}
        temp={getHourlyData(hourlyNowAndFuture,timeString,"temperature")}
        feelslikeY={hourlyPast24[0]["values"]["temperatureApparent"]}
        feelslikeT={getHourlyData(hourlyNowAndFuture,timeStringT, "temperatureApparent")}
      />
      <Summary
        feelslikemax={today.temperatureApparentMax}
        feelslikemin={today.temperatureApparentMin}
        tempmax={today.temperatureMax}
        tempmin={today.temperatureMin}
      />{/*
      <HighsLows
        feelslikemax={feelslikemax}
        feelslikemin={feelslikemin}
        feelslikemaxY={DailyY.feelslikemax}
        feelslikeminY={DailyY.feelslikemin}
        feelslikemaxT={tomData.feelslikemax}
        feelslikeminT={tomData.feelslikemin}
      />
      <Precipitation
        precip={precip}
        precipY={DailyY.precip}
        precipprob={precipprob}
        precipprobT={tomData.precipprob}
        preciptypeT={tomData.preciptype}
        preciptype={preciptype}
        preciptypeY={DailyY.preciptype}
        precipT={tomData.precip}
      />*/}
    </>
  );
}
