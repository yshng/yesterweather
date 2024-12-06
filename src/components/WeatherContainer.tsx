import { useEffect, useState, useRef } from "react";
import { Day, CurrentConditions, ApiResponse } from "../api/api";
import { CurrentTemp } from "./CurrentTemp";
import { BackgroundImage } from "./BackgroundImage";
import { HighsLows } from "./HighsLows";
import { Summary } from "./Summary";
import { Precipitation } from "./Precipitation";
import { UnitContext } from "./UnitContext";
import { HourByHour } from "./HourbyHour";
import { Panel } from "./Panel";

export interface WeatherProps {
  today: Day;
  tomorrow: Day;
  yesterday: Day;
  current: CurrentConditions;
}

// function formatDate(date: Date) {
//   return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
// }

// function generateDateString() {
//   const now = new Date();
//   now.setDate(now.getDate() - 1);
//   const yesterday = formatDate(now);
//   now.setDate(now.getDate() + 2);
//   const tomorrow = formatDate(now);
//   return yesterday + "/" + tomorrow;
// }

export function WeatherContainer() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<ApiResponse>();
  const [error, setError] = useState("");
  const [fullLocation, setFullLocation] = useState("");

  const initialLocation =
    localStorage.getItem("yesterweather_location") || "chicago";
  const [location, setLocation] = useState(initialLocation);
  const initialUnitGroup =
    localStorage.getItem("yesterweather_unitGroup") || "us";

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

  const units =
    unitGroup == "us"
      ? { temp: "°F", depth: { unit: "inch", plural: "inches" } }
      : { temp: "°C", depth: { unit: "mm", plural: "mms" } };

  const effectRan = useRef(false);

  // api call
  useEffect(() => {
    if (effectRan.current || process.env.NODE_ENV !== "development") {
        //   const key = "FQNNDH99DKU5EPWAR5GGXRSN6";

        //   const endpoint = (days: string) =>
        //     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${days}?unitGroup=${unitGroup}&include=current%2Chours%2Cdays&key=${key}&contentType=json`;

        //   fetch(endpoint(generateDateString()), {
        //     mode: "cors",
        //   })
        //     .then((response) => response.json())
        //     .then((data: ApiResponse) => {
        //       setWeather(data);
        //       setFullLocation(data.resolvedAddress);
        //       console.log("fetched");
        //       setLoading(false);
        //     })
        //     .catch(() => setError("Unable to retrieve weather data."));
        // }

      fetch('sampleResponse.json')
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          setWeather(data);
          setFullLocation(data.resolvedAddress);
          console.log("fetched");
          setLoading(false);
        })
        .catch(() => setError("Unable to retrieve weather data."));
    }

    effectRan.current = true;
  }, [unitGroup, location]);

  const weatherProps = weather
    ? {
        yesterday: weather.days[0],
        current: weather.currentConditions,
        today: weather.days[1],
        tomorrow: weather.days[2],
      }
    : null;

  return weatherProps ? (
    <BackgroundImage current={weatherProps.current}>
      <UnitContext.Provider value={units}>
        <div id="content">
          <h1>YesterWeather</h1>
          <Panel
            location={fullLocation}
            unitGroup={unitGroup}
            onClick={toggleUnitGroup}
            onSubmit={setLocation}
          />
          <div id="card-wrapper">
            <Summary {...weatherProps} />
            <CurrentTemp {...weatherProps} />
            <HighsLows {...weatherProps} />
            <Precipitation {...weatherProps} />
            <HourByHour {...weatherProps} />
          </div>
        </div>
      </UnitContext.Provider>
    </BackgroundImage>
  ) : (
    <div id="wrapper">
      {loading && <p>Loading weather data...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
