export interface IWeatherPayload {
  lat: number;
  lon: number;
  timestampFrom?: number;
  timestampTo?: number;
}
export interface IWeather {
  name: string;
  current: IForecast;
  forecast: IForecast[];
}

export interface IForecast {
  date: string;
  description: string;
  icon: string;
}
