import { StrictMode, useState } from "react";
import "./App.css";
import { WeatherContainer } from "./components/WeatherContainer";
import { Button } from "./components/Button";
import { UnitContext } from "./components/UnitContext";
import { LocationInput } from "./components/LocationInput";

function App() {
  const initialLocation = localStorage.getItem("yesterweather_location") || "chicago";
  const initialUnitGroup = localStorage.getItem("yesterweather_unitGroup") || "us";

  const [unitGroup, setUnitGroup] = useState(initialUnitGroup);
  const [location, setLocation] = useState(initialLocation);

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

  return (
    <StrictMode>
      <UnitContext.Provider value={units}>
        <WeatherContainer unitGroup={unitGroup} location={location}>
          <h1>YesterWeather</h1>
          <LocationInput value={location} onSubmit={(x) => setLocation(x)} />
          <Button
            type="button"
            label={unitGroup}
            id="unit-toggle-button"
            onClick={() => {
              toggleUnitGroup();
            }}
          />
        </WeatherContainer>
      </UnitContext.Provider>
    </StrictMode>
  );
}

export default App;
