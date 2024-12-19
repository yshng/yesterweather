import { useState, useEffect, useMemo } from "react";
import { Day, CurrentConditions, ApiResponse } from "../api/api";
import { CurrentTemp } from "./CurrentTemp";
import { HighsLows } from "./HighsLows";
import { Summary } from "./Summary";
import { Precipitation } from "./Precipitation";
import { UnitContext } from "./UnitContext";
import { HourByHour } from "./HourbyHour";
import { Button } from "./Button";
import { LocationInput } from "./LocationInput";
import { useQueries } from "@tanstack/react-query";
import { differenceInMilliseconds } from "date-fns";
import { midnight, isDay } from "../util/time";
import { BackgroundImage } from "./BackgroundImage";
import { setIntervalImmediately } from "../util/interval";

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
  const [daytime, setDaytime] = useState(true); //is it daytime
  const [hour, setHour] = useState<number | null>(null);

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

    const forecast = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current%2Cdays%2Chours&key=${key}`;

    const precast = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/yesterday?unitGroup=us&include=days%2Chours&key=${key}`;

    const data = await fetch(day == "yesterday" ? precast : forecast, {
      mode: "cors",
    }).then((response) => {
      console.log("fetched");
      return response.json();
    });

    return data;
  }

  const { isPending, errors, precast, forecast } = useQueries({
    queries: [
      {
        queryKey: ["yesterday", unitGroup, location],
        staleTime: differenceInMilliseconds(midnight(new Date()), new Date()),
        queryFn: () => fetchWeather("yesterday"),
      },
      {
        queryKey: ["forecast", unitGroup, location, daytime, hour],
        staleTime: 15 * 60 * 1000,
        queryFn: () => fetchWeather("forecast"),
      },
    ],
    combine: (results) => {
      return {
        isPending: results.some((result) => result.isPending),
        errors: results.reduce((acc: Error[], result) => {
          if (result.isError) {
            acc.push(result.error);
          }
          return acc;
        }, []),
        precast: results[0].data,
        forecast: results[1].data,
      };
    },
  });

  const weatherProps = useMemo(() => {
    if (precast && forecast) {
      return {
        yesterday: precast.days[0],
        current: forecast.currentConditions,
        today: forecast.days[0],
        tomorrow: forecast.days[1],
      };
    }
  }, [precast, forecast]);

  useEffect(() => {
    if (weatherProps) {
      const { current } = weatherProps;
      const interval = setIntervalImmediately(() => {
        if (
          isDay(Date.now(), current.sunriseEpoch, current.sunsetEpoch) !=
          daytime
        )
          setDaytime(!daytime);
      }, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [daytime, weatherProps]);

  useEffect(() => {
    if (precast) {
      const offset = precast.tzoffset;
      const interval = setIntervalImmediately(() => {
        const now = new Date();
        const hr = now.getUTCHours() + offset;
        if (hr != hour) setHour(hr);
      }, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [precast, hour]);

  useEffect(() => {
    if (!daytime) document.documentElement.classList.add("night");
    else document.documentElement.classList.remove("night");
  }, [daytime]);

  if (isPending || errors.length) {
    return (
      <div id="wrapper">
        {isPending && <p>Loading weather data...</p>}
        {errors.length &&
          errors.map((error) => (
            <p>{"An error has occurred: " + error.name + error.message}</p>
          ))}
      </div>
    );
  }

  const units =
    unitGroup == "us"
      ? { temp: "°F", depth: { unit: "inch", plural: "inches" } }
      : { temp: "°C", depth: { unit: "mm", plural: "mms" } };

  return (
    precast &&
    weatherProps && (
      <BackgroundImage {...weatherProps}>
        <UnitContext.Provider value={units}>
          <div id="content">
            <h1>YesterWeather</h1>
            <LocationInput
              value={precast.resolvedAddress}
              onSubmit={setLocation}
            />
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
    )
  );
}
