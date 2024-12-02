import { Card } from "./Card";
import { CompareTemp } from "./CompareTemp";
import { useContext } from "react";
import { UnitContext } from "./UnitContext";
import { WeatherProps } from "./WeatherContainer";

export function CurrentTemp({ tomorrow, yesterday, current }: WeatherProps) {
  const units = useContext(UnitContext);

  const hour = Number(current.datetime.slice(0, 2));
  return (
    <Card header="current conditions" id="current">
      {current.feelslike && (
        <>
          <p>
            Right now, it feels like {current.feelslike}
            {units.temp} [{current.temp}],{" "}
            <CompareTemp
              difference={current.feelslike - yesterday.hours[hour].feelslike}
            />{" "}
            than approximately this time yesterday.
          </p>
          <p>
            Tommorrow, around this time, it should be
            <CompareTemp
              difference={tomorrow.hours[hour].feelslike - current.feelslike}
            />
            than today.
          </p>
        </>
      )}
    </Card>
  );
}
