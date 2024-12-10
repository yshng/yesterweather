import { WeatherProps } from "./WeatherContainer";
import { generateTableData } from "../api/data";
import { TableData, CellData } from "./TableData";
import { useState, useMemo } from "react";
import { Button } from "./Button";
import { HOURS } from "../constants/hours";
import { TempRange } from "./TempRange";


type temps = "feelslike" | "temp";

export function HourByHour(weather: WeatherProps) {
  // const units = useContext(UnitContext);

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
                <th id={"h" + hour} key={hour} scope="col">
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
