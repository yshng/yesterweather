import { useState } from "react";
import { Day, CurrentConditions, ApiResponse } from "../api/api";
import { CurrentTemp } from "./CurrentTemp";
import { BackgroundImage } from "./BackgroundImage";
import { HighsLows } from "./HighsLows";
import { Summary } from "./Summary";
import { Precipitation } from "./Precipitation";
import { UnitContext } from "./UnitContext";
import { HourByHour } from "./HourbyHour";
import { Button } from "./Button";
import { LocationInput } from "./LocationInput";
import { useQuery } from "@tanstack/react-query";

export interface WeatherProps {
  today: Day;
  tomorrow: Day;
  yesterday: Day;
  current: CurrentConditions;
}

function formatDate(date: Date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
}

function generateDateString() {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const yesterday = formatDate(now);
  now.setDate(now.getDate() + 2);
  const tomorrow = formatDate(now);
  return yesterday + "/" + tomorrow;
}

export function WeatherContainer() {
  const initialLocation =
    localStorage.getItem("yesterweather_location") || "chicago";
  const initialUnitGroup =
    localStorage.getItem("yesterweather_unitGroup") || "us";

  const [location, setLocation] = useState(initialLocation);
  const [unitGroup, setUnitGroup] = useState(initialUnitGroup);

  function toggleUnitGroup() {
    if (unitGroup == "us") {
      setUnitGroup("metric");
      localStorage.setItem("yesterweather_unitGroup", "metric");
    } else {
      setUnitGroup("us");
      localStorage.setItem("yesterweather_unitGroup", "us");
    }
  }

  async function fetchWeather(): Promise<ApiResponse> {
    const key = "FQNNDH99DKU5EPWAR5GGXRSN6";

    const endpoint = (days: string) =>
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${days}?unitGroup=${unitGroup}&include=current%2Chours%2Cdays&key=${key}&contentType=json`;

    const data = await fetch(endpoint(generateDateString()), {
      mode: "cors",
    }).then((response) => {
      console.log("fetched");
      return response.json();
    });

    return data;
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["weather", unitGroup, location],
    staleTime: 30000,
    queryFn: fetchWeather,
  });

  const units =
    unitGroup == "us"
      ? { temp: "°F", depth: { unit: "inch", plural: "inches" } }
      : { temp: "°C", depth: { unit: "mm", plural: "mms" } };

  if (isPending || isError) {
    return (
      <div id="wrapper">
        {isPending && <p>Loading weather data...</p>}
        {isError && (
          <p>{"An error has occurred: " + error.name + error.message}</p>
        )}
      </div>
    );
  }

  const weatherProps = {
    yesterday: data.days[0],
    current: data.currentConditions,
    today: data.days[1],
    tomorrow: data.days[2],
  };

  return (
    <BackgroundImage current={weatherProps.current}>
      <UnitContext.Provider value={units}>
        <div id="content">
          <h1>YesterWeather</h1>
          <LocationInput value={data.resolvedAddress} onSubmit={setLocation} />
          <div id="card-wrapper">
            <Summary {...weatherProps} />
            <CurrentTemp {...weatherProps} />
            <HighsLows {...weatherProps} />
            <Precipitation {...weatherProps} />
          </div>
          <HourByHour {...weatherProps} />
          <div id="buffer">...</div>
        </div>
        <div id="units">
          <Button
            type="button"
            content={unitGroup == "us" ? "°F" : "°C"}
            id="unit-toggle-button"
            onClick={() => {
              toggleUnitGroup();
            }}
          />
        </div>
      </UnitContext.Provider>
    </BackgroundImage>
  );
}
