import { WeatherProps } from "./WeatherContainer";
import { Card } from "./Card";

export function HourByHour({ yesterday, today, tomorrow }: WeatherProps) {
  // const units = useContext(UnitContext);

  // create hour headers
  function numberToHour(n: number) {
    if (n == 0) return "12AM";
    else if (n < 12) return n.toString() + "AM";
    else if (n == 12) return "12PM";
    else return (n - 12).toString() + "PM";
  }

  const keys = [...Array(24).keys()];
  const hours = keys.map((num) => numberToHour(num));

  return (
    <Card id="hourbyhour" header="Hour By Hour">
      <div className="table-overlay">
        <table>
          <thead>
            <tr>
              <th scope="col" className="sticky">
              </th>
              {hours.map((hour) => (
                <th key={hour} scope="col">
                  {hour}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="sticky">Yesterday</th>
              {yesterday.hours.map((hour) => (
                <td key={hour.datetime}>{hour.feelslike}</td>
              ))}
            </tr>
            <tr>
              <th className="sticky">Today</th>
              {today.hours.map((hour) => (
                <td key={hour.datetime}>{hour.feelslike}</td>
              ))}
            </tr>
            <tr>
              <th className="sticky">Tomorrow</th>
              {tomorrow.hours.map((hour) => (
                <td key={hour.datetime}>{hour.feelslike}</td>
              ))}
            </tr>


          </tbody>
        </table>
      </div>
    </Card>
  );
}
