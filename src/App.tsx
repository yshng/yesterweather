import { StrictMode, useState } from "react";
import "./App.css";
import { WeatherContainer } from "./components/WeatherContainer";
import { Button } from "./components/Button";
import { UnitContext } from "./components/UnitContext";

function App() {
  const [unitGroup, setUnitGroup] = useState("us");

  function toggleUnitGroup() {
    return unitGroup == "us" ? setUnitGroup("metric") : setUnitGroup("us");
  }

  const units = unitGroup == "us" ? "°F" : "°C";

  return (
    <StrictMode>
      <UnitContext.Provider value={units}>
        <h1>YesterWeather</h1>
        <Button
          type="button"
          label={units}
          id="unit-toggle-button"
          onClick={() => toggleUnitGroup()}
        />
        <div className="card-wrapper">
          <WeatherContainer unitGroup={unitGroup} location="chicago" />
        </div>
      </UnitContext.Provider>
    </StrictMode>
  );
}

export default App;
