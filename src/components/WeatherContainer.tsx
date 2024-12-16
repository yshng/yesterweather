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
import { useQueries } from "@tanstack/react-query";
import { differenceInMilliseconds } from "date-fns";
import { midnight } from "../constants/constants";

export interface WeatherProps {
  today: Day;
  tomorrow: Day;
  yesterday: Day;
  current: CurrentConditions;
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

  async function fetchWeather(day: string): Promise<ApiResponse> {
    const key = "AD6ZKJQSYHRB39KM7DNWKBCS9";

    const forecast = 
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current%2Cdays%2Chours&key=${key}`;

    const yesterday = 
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/yesterday?unitGroup=us&include=days%2Chours&key=${key}`;
     

    const data = await fetch(day == "yesterday" ? yesterday : forecast, {
      mode: "cors",
    }).then((response) => {
      console.log("fetched");
      return response.json();
    });

    return data;
  }

  const {isPending, errors, yesterday, forecast} = useQueries({
    queries: [
      {
        queryKey: ["yesterday", unitGroup, location],
        staleTime: differenceInMilliseconds(midnight(new Date()), new Date()),
        queryFn: () => fetchWeather("yesterday"),
      },
      {
        queryKey: ["forecast", unitGroup, location],
        staleTime: 10000,
        queryFn: () => fetchWeather("forecast"),
      },
    ],
    combine: (results) => {
      return {
        isPending: results.some( (result) => result.isPending ),
        errors: results.reduce( (acc: Error[],result) => {if (result.isError) {acc.push(result.error)} return acc}, []),
        yesterday: results[0].data,
        forecast: results[1].data
      }
    }
  });

  const units =
    unitGroup == "us"
      ? { temp: "°F", depth: { unit: "inch", plural: "inches" } }
      : { temp: "°C", depth: { unit: "mm", plural: "mms" } };

  if (isPending || errors.length) {
    return (
      <div id="wrapper">
        {isPending && <p>Loading weather data...</p>}
        {errors.length && (
          errors.map( (error) => 
          <p>{"An error has occurred: " + error.name + error.message}</p>
        ))}
      </div>
    );
  }

  const weatherProps = yesterday && forecast ? {
    yesterday: yesterday.days[0],
    current: forecast.currentConditions,
    today: forecast.days[0],
    tomorrow: forecast.days[1],
  } : null;

  return ( yesterday && weatherProps &&
    <BackgroundImage current={weatherProps.current}>
      <UnitContext.Provider value={units}>
        <div id="content">
          <h1>YesterWeather</h1>
          <LocationInput value={yesterday.resolvedAddress} onSubmit={setLocation} />
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
