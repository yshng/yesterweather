import { useState } from "react";

interface InputProps {
  value: string;
  onSubmit: (string: string) => void;
}

export function LocationInput({ value, onSubmit }: InputProps) {
  const [input, setInput] = useState(value);

  return (
    <form
      id="location-form"
      onSubmit={(e) => {
        e.preventDefault();
        localStorage.setItem("yesterweather_location",input);
        onSubmit(input);
      }}
    >
      <label>
        City:
        <input
          id="location-input"
          name="location"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </label>
      <button type="submit">Go</button>
    </form>
  );
}
