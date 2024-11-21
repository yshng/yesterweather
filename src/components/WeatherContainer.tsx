import { useEffect, useState } from "react";
import { Current } from "./Current";
import { Summary } from "./Summary";
import { HighsLows } from "./HighsLows";
import { Precipitation } from "./Precipitation";

interface WeatherContainerProps {
  location: string;
  unitGroup: string;
}

export interface WeatherData {
  datetime: string;
  conditions: string;
  description: string;
  feelslike: number;
  feelslikemax: number;
  feelslikemin: number;
  temp: number;
  tempmax: number;
  tempmin: number;
  precipprob: number;
  precip: number;
  preciptype: string[];
  icon: string;
  hours: WeatherData[];
}

export function WeatherContainer({location, unitGroup}: WeatherContainerProps) {

  const [todayData, setTodayData] = useState<WeatherData>();
  const [yesData, setYesData] = useState<WeatherData>();

  function formatDate(date: Date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
  }

  // api call
  useEffect(() => {

    const endpoint = (days: string) =>
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${days}?unitGroup=${unitGroup}&include=days%2Chours&key=66335529NH8DXDCDHH6X2KXW3&contentType=json`;

    const now = new Date();
    const today = formatDate(now);
    now.setDate(now.getDate() - 1);
    const yesterday = formatDate(now);

    fetch(endpoint(yesterday + "/" + today), {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setYesData(data.days[0]);
        setTodayData(data.days[1]);
        console.log("fetched");
      })
      .catch((error) => console.log(error));
  }, [unitGroup, location]);

  if (!todayData || !yesData) {
    return <p> Problem getting weather data. </p>;
  }
  const now = new Date();
  const currentHour = now.getHours();
  const {
    feelslike,
    feelslikemax,
    feelslikemin,
    tempmax,
    tempmin,
    description,
    precipprob,
    preciptype,
    precip
  } = todayData;

  const yesCurrentFeelslike = yesData.hours[currentHour].feelslike;

  return (
    <>
      <Current feelslike={feelslike} yesFeelslike={yesCurrentFeelslike} />
      <Summary
        description={description}
        feelslikemax={feelslikemax}
        feelslikemin={feelslikemin}
        tempmax={tempmax}
        tempmin={tempmin}
      />
      <HighsLows
        feelslikemax={feelslikemax}
        feelslikemin={feelslikemin}
        feelslikemaxY={yesData.feelslikemax}
        feelslikeminY={yesData.feelslikemin}
      />
      <Precipitation 
        precip={precip}
        precipY={yesData.precip}
        precipprob={precipprob}
        preciptype={preciptype}
        preciptypeY={yesData.preciptype}
      />
    </>
  );
}
