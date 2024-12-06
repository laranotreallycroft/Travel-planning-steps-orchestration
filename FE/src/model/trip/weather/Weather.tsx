export interface IWeatherPayload {
  lat: number;
  lon: number;
  timestamp?: number;
}
export interface IWeather {
  name: string;
  current: ICurrentWeather;
  forecast: IForecast[];
}
export interface ICurrentWeather {
  date: string;
  description: string;
  icon: string;
  temperature: ITemperature;
  wind: number;
  humidity: number;
}

export interface IForecast {
  date: string;
  description: string;
  icon: string;
}

export interface ITemperature {
  current?: number;
  min?: number;
  max?: number;
}
