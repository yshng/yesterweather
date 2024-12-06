import { WeatherProps } from "./WeatherContainer";
import { Card } from "./Card";
import { generateTableData } from "../api/data";
import { TableData, CellData } from "./TableData";
import { useState, useMemo } from "react";
import { Button } from "./Button";
import { HOURS } from "../util/hours";

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
    <Card id="hourbyhour" header="Hour By Hour">
      <Button
        onClick={() => setField("feelslike")}
        disabled={field == "feelslike"}
        content="Perceived"
      />
      <Button
        onClick={() => setField("temp")}
        disabled={field == "temp"}
        content="Actual"
      />

      <div className="table-overlay">
        <table>
          <thead>
            <tr>
              <th scope="col" className="sticky"></th>
              {HOURS.map((hour) => (
                <th id={hour} key={hour} scope="col">
                  {hour}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {temps.map((temp) => {
              return (
                <tr key={temp.day}>
                  <th className="sticky" id={temp.day}>
                    {temp.day}
                  </th>
                  {temp.data.map((data) => (
                    <TableData key={makeKey(data.headers)} {...tableDataProps(data)} />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
