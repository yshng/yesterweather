interface DateTimeBlock {
  datetime: string; //"2024-11-25";
  datetimeEpoch: number; //1732514400;
}

interface CoreInfoBlock {
  temp: number;
  feelslike: number;
  dew: number;
  humidity: number;
  precip: number;
  precipprob: number;
  preciptype: string[] | null;
  snow: number;
  snowdepth: number;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  conditions: string; // "Overcast";
  icon: string; // "cloudy";
  stations: string[];
  source: string; // "obs"
}

interface Astro {
  sunrise: string; // "06:52:48";
  sunriseEpoch: number; // 1732539168;
  sunset: string; //"16:22:26";
  sunsetEpoch: number; // 1732573346;
  moonphase: number;
}

export interface Hour extends DateTimeBlock, CoreInfoBlock {}

export interface CurrentConditions extends Hour, Astro {}

export interface Day extends DateTimeBlock, CoreInfoBlock, Astro {
  precipcover: number;
  tempmax: number;
  tempmin: number;
  feelslikemax: number;
  feelslikemin: number;
  description: string; // "Cloudy skies throughout the day.";
  hours: Hour[];
}

export interface ApiResponse {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string; // "Chicago, IL, United States"
  address: string; // "chicago",
  timezone: string; // "America/Chicago"
  tzoffset: number; // -6.0
  days: Day[];
  currentConditions: CurrentConditions;
}

