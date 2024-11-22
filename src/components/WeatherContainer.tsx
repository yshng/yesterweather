import { useEffect, useState } from "react";
import { CurrentTemp } from "./CurrentTemp";
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

export function WeatherContainer({
  location,
  unitGroup,
}: WeatherContainerProps) {
  const [yesData, setYesData] = useState<WeatherData>();
  const [todayData, setTodayData] = useState<WeatherData>();
  const [tomData, setTomData] = useState<WeatherData>();

  function formatDate(date: Date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
  }

  // api call
  useEffect(() => {
    const key = "FQNNDH99DKU5EPWAR5GGXRSN6";

    const endpoint = (days: string) =>
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${days}?unitGroup=${unitGroup}&include=days%2Chours%2Ccurrent&key=${key}&contentType=json`;

    const now = new Date();
    //const today = formatDate(now);
    now.setDate(now.getDate() - 1);
    const yesterday = formatDate(now);
    now.setDate(now.getDate() + 2);
    const tomorrow = formatDate(now);

    fetch(endpoint(yesterday + "/" + tomorrow), {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setYesData(data.days[0]);
        setTodayData(data.days[1]);
        setTomData(data.days[2]);
        console.log("fetched");
      })
      .catch((error) => console.log(error));
  }, [unitGroup, location]);

  if (!todayData || !yesData || !tomData) {
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
    temp,
    description,
    precipprob,
    preciptype,
    precip,
  } = todayData;

  const currentFeelslikeY = yesData.hours[currentHour].feelslike;
  const currentFeelslikeT = tomData.hours[currentHour].feelslike;

  return (
    <>
      <CurrentTemp
        feelslike={feelslike}
        temp={temp}
        feelslikeY={currentFeelslikeY}
        feelslikeT={currentFeelslikeT}
      />
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
        feelslikemaxT={tomData.feelslikemax}
        feelslikeminT={tomData.feelslikemin}
      />
      <Precipitation
        precip={precip}
        precipY={yesData.precip}
        precipprob={precipprob}
        precipprobT={tomData.precipprob}
        preciptypeT={tomData.preciptype}
        preciptype={preciptype}
        preciptypeY={yesData.preciptype}
        precipT={tomData.precip}
      />
    </>
  );
}
