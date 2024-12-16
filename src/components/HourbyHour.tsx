import { WeatherProps } from "./WeatherContainer";
import { generateTableData } from "../api/data";
import { TableData, CellData } from "./TableData";
import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "./Button";
import { HOURS, numberToHour } from "../constants/constants";
import { TempRange } from "./TempRange";

type temps = "feelslike" | "temp";

export function HourByHour(weather: WeatherProps) {
  const [field, setField] = useState<temps>("feelslike");
  const {
    temps,
    extremes: [MIN, MAX],
  } = useMemo(() => generateTableData(field, weather), [field, weather]);

  function makeKey(headers: string) {
    return headers.slice(0, 3) + headers.split(" ")[1];
  }
  function tableDataProps(data: CellData) {
    return { ...data, min: MIN, max: MAX };
  }

  const scrollRef = useRef<HTMLTableCellElement>(null);
  const now = numberToHour(new Date().getHours());

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ inline: "center" });
    }
  });

  return (
    <div id="hourbyhour">
      <div className="row space-between">
        <h1 className="card-head">Hour by hour</h1>
        <div className="toggle-buttons">
          <Button
            className="toggle-hour-field"
            onClick={() => setField("feelslike")}
            disabled={field === "feelslike"}
            content="Perceived"
          />
          <Button
            className="toggle-hour-field"
            onClick={() => setField("temp")}
            disabled={field === "temp"}
            content="Actual"
          />
        </div>
      </div>
      <TempRange min={MIN} max={MAX} />

      <div className="table-overlay">
        <table>
          <thead>
            <tr>
              <th scope="col" className="sticky"></th>
              {HOURS.map((hour) => (
                <th key={hour} ref={hour == now ? scrollRef : null} scope="col">
                  {hour}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {temps.map((temp) => {
              return (
                <tr key={temp.day}>
                  <th className="sticky" id={temp.day} scope="row">
                    {temp.day}
                  </th>
                  {temp.data.map((data) => (
                    <TableData
                      key={makeKey(data.headers)}
                      {...tableDataProps(data)}
                    />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
