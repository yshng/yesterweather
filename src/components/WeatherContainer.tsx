import { useEffect, useState, useRef } from "react";
import { CurrentTemp } from "./CurrentTemp";
import { Summary } from "./Summary";
import { HighsLows } from "./HighsLows";
import { Precipitation } from "./Precipitation";

interface WeatherContainerProps {
  location: string;
  unitGroup: string;
  children: React.ReactNode;
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

export interface WeatherCardProps {
    yesterday: WeatherData;
    today: WeatherData;
    tomorrow: WeatherData;
    current: WeatherData;
}

export function WeatherContainer({
  location,
  unitGroup,
  children,
}: WeatherContainerProps) {
  const [yesData, setYesData] = useState<WeatherData>();
  const [todayData, setTodayData] = useState<WeatherData>();
  const [tomData, setTomData] = useState<WeatherData>();
  const [currentData, setCurrentData] = useState<WeatherData>();

  function formatDate(date: Date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
  }

  const effectRan = useRef(false);

  // api call
  useEffect(() => {

    if (effectRan.current || process.env.NODE_ENV !== "development") {

      const key = "FQNNDH99DKU5EPWAR5GGXRSN6";

      const endpoint = (days: string) =>
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${days}?unitGroup=${unitGroup}&include=current%2Chours%2Cdays&key=${key}&contentType=json`;

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
          setCurrentData(data.currentConditions);
          console.log("fetched");
        })
        .catch((error) => console.log(error));
      } 

      effectRan.current = true;
  }, [unitGroup, location]);

  if (!todayData || !yesData || !tomData || !currentData) {
    return <p> Problem getting weather data. </p>;
  }

  const weather = {current: currentData, yesterday: yesData, today: todayData, tomorrow: tomData};

  return (
    <div id="weather-container">
        {children}
        <CurrentTemp {...weather} />
        <HighsLows {...weather} />
        <Summary {...weather} />
        <Precipitation {...weather} />
    </div>
  );
}
